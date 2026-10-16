const fs = require('fs');
const pdfParse = require('pdf-parse');
const Player = require('../models/Player');
const Match = require('../models/Match');

/**
 * Convert overs representation (e.g. 3.4 overs) to total balls bowled (22 balls)
 * @param {string|number} oversOrBalls
 * @returns {number}
 */
function parseBowlingBalls(oversOrBalls) {
  if (oversOrBalls === null || oversOrBalls === undefined || oversOrBalls === '') return 0;
  const str = String(oversOrBalls).trim();
  if (str.includes('.')) {
    const parts = str.split('.');
    const completedOvers = parseInt(parts[0], 10) || 0;
    const additionalBalls = parseInt(parts[1], 10) || 0;
    return (completedOvers * 6) + additionalBalls;
  }
  const num = parseInt(str, 10);
  return isNaN(num) ? 0 : num;
}

/**
 * Convert total balls bowled back to standard overs string (e.g. 22 balls -> "3.4")
 * @param {number} totalBalls
 * @returns {string}
 */
function formatBallsToOvers(totalBalls) {
  const balls = parseInt(totalBalls, 10) || 0;
  const overs = Math.floor(balls / 6);
  const rem = balls % 6;
  return `${overs}.${rem}`;
}

/**
 * Parse CSV scorecard text into structured rows
 */
function parseCsvScorecard(csvContent) {
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) {
    throw new Error('CSV scorecard must contain a header row and at least one player row.');
  }

  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[\s_-]+/g, ''));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',').map(p => p.trim());
    if (parts.length === 0 || !parts[0]) continue;

    const rowObj = {};
    headers.forEach((header, index) => {
      rowObj[header] = parts[index] !== undefined ? parts[index] : '';
    });

    const playerName = rowObj['player'] || rowObj['playername'] || rowObj['name'] || parts[0];
    const runs = parseInt(rowObj['runs'] || '0', 10) || 0;
    const balls = parseInt(rowObj['balls'] || '0', 10) || 0;
    const fours = parseInt(rowObj['4s'] || rowObj['fours'] || '0', 10) || 0;
    const sixes = parseInt(rowObj['6s'] || rowObj['sixes'] || '0', 10) || 0;
    
    // Batted boolean
    const battedVal = (rowObj['batted'] || '').toLowerCase();
    const batted = battedVal === 'yes' || battedVal === 'true' || battedVal === '1' || balls > 0 || runs > 0;

    // Not out boolean
    const notOutVal = (rowObj['notout'] || rowObj['notout'] || '').toLowerCase();
    const notOut = notOutVal === 'yes' || notOutVal === 'true' || notOutVal === '1' || notOutVal === 'no' ? (notOutVal !== 'no') : (battedVal === 'no' ? false : (notOutVal === 'true' || notOutVal === '1'));

    // Bowling
    const oversBowledInput = rowObj['ballsbowled'] || rowObj['overs'] || rowObj['oversbowled'] || '0';
    const ballsBowled = parseBowlingBalls(oversBowledInput);
    const runsConceded = parseInt(rowObj['runsconceded'] || '0', 10) || 0;
    const wickets = parseInt(rowObj['wickets'] || '0', 10) || 0;

    // Fielding
    const catches = parseInt(rowObj['catches'] || '0', 10) || 0;
    const stumpings = parseInt(rowObj['stumpings'] || '0', 10) || 0;
    const runOuts = parseInt(rowObj['runouts'] || '0', 10) || 0;

    rows.push({
      playerName,
      runs,
      balls,
      fours,
      sixes,
      batted,
      notOut: notOutVal === 'yes' || notOutVal === 'true' || notOutVal === '1' || notOutVal === 'not out',
      ballsBowled,
      runsConceded,
      wickets,
      catches,
      stumpings,
      runOuts
    });
  }

  return rows;
}

/**
 * Extract plain text from PDF file for manual review
 */
async function parsePdfScorecard(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  return {
    numPages: pdfData.numpages,
    text: pdfData.text || ''
  };
}

/**
 * Match parsed rows against the registered Squad in the database
 */
async function matchPlayersToRoster(parsedRows) {
  const players = await Player.find({ isActive: true });
  const matched = [];
  const unmatched = [];
  const seenPlayerIds = new Set();
  const duplicates = [];

  for (const row of parsedRows) {
    const rawName = (row.playerName || '').toLowerCase().trim();
    // Match exact or contains
    const match = players.find(p => {
      const pName = p.fullName.toLowerCase().trim();
      return pName === rawName || pName.includes(rawName) || rawName.includes(pName);
    });

    if (match) {
      if (seenPlayerIds.has(match._id.toString())) {
        duplicates.push(match.fullName);
      } else {
        seenPlayerIds.add(match._id.toString());
      }

      matched.push({
        ...row,
        player: match._id,
        playerName: match.fullName,
        company: match.company,
        cricketRole: match.cricketRole,
        isMatched: true
      });
    } else {
      unmatched.push({
        ...row,
        player: null,
        isMatched: false
      });
    }
  }

  return {
    matched,
    unmatched,
    duplicates,
    totalRows: parsedRows.length
  };
}

/**
 * Recalculate official verified season statistics for all players.
 * This runs across all verified matches to guarantee perfect idempotency.
 */
async function recalculateSeasonStats() {
  const players = await Player.find({});
  const verifiedMatches = await Match.find({ scoresVerified: true });

  const statsMap = {};
  for (const p of players) {
    statsMap[p._id.toString()] = {
      matches: 0,
      runs: 0,
      ballsFaced: 0,
      fours: 0,
      sixes: 0,
      notOuts: 0,
      dismissals: 0,
      ballsBowled: 0,
      runsConceded: 0,
      wickets: 0,
      catches: 0,
      stumpings: 0,
      runOuts: 0,
      fieldingPoints: 0
    };
  }

  for (const match of verifiedMatches) {
    const playingXIIds = new Set(
      (match.playingXI || [])
        .filter(px => px.status === 'Playing XI')
        .map(px => px.player.toString())
    );

    for (const stat of (match.playerStats || [])) {
      const pid = stat.player ? stat.player.toString() : null;
      if (!pid || !statsMap[pid]) continue;

      const pStat = statsMap[pid];

      // Mark match participation
      playingXIIds.add(pid);

      pStat.runs += stat.runs || 0;
      pStat.ballsFaced += stat.balls || 0;
      pStat.fours += stat.fours || 0;
      pStat.sixes += stat.sixes || 0;

      if (stat.batted) {
        if (stat.notOut) {
          pStat.notOuts += 1;
        } else {
          pStat.dismissals += 1;
        }
      }

      pStat.ballsBowled += stat.ballsBowled || 0;
      pStat.runsConceded += stat.runsConceded || 0;
      pStat.wickets += stat.wickets || 0;

      pStat.catches += stat.catches || 0;
      pStat.stumpings += stat.stumpings || 0;
      pStat.runOuts += stat.runOuts || 0;
      // Club scoring rule: catches + 1.5 * stumpings + 1.5 * run-outs
      pStat.fieldingPoints += (stat.catches || 0) + (1.5 * (stat.stumpings || 0)) + (1.5 * (stat.runOuts || 0));
    }

    // Increment matches played for all participants in Playing XI
    for (const pid of playingXIIds) {
      if (statsMap[pid]) {
        statsMap[pid].matches += 1;
      }
    }
  }

  // Update all players in database
  for (const p of players) {
    const s = statsMap[p._id.toString()];
    if (s) {
      s.fieldingPoints = Math.round(s.fieldingPoints * 10) / 10;
      p.stats = s;
      await p.save();
    }
  }

  return statsMap;
}

module.exports = {
  parseBowlingBalls,
  formatBallsToOvers,
  parseCsvScorecard,
  parsePdfScorecard,
  matchPlayersToRoster,
  recalculateSeasonStats
};
