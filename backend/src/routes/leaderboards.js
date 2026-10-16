const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Player = require('../models/Player');
const { authenticate } = require('../middleware/auth');
const { sanitizeCsvValue } = require('../config/security');

/**
 * GET /api/leaderboards
 * Returns calculated performance statistics filtered by season, competition, format, match, and date range.
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { season, competition, format, matchId, dateFrom, dateTo } = req.query;

    const matchQuery = { scoresVerified: true };
    if (season && season !== 'All') matchQuery.season = season;
    if (competition && competition !== 'All') matchQuery.competition = competition;
    if (format && format !== 'All') matchQuery.format = format;
    if (matchId && matchId !== 'All') matchQuery._id = matchId;
    if (dateFrom || dateTo) {
      matchQuery.date = {};
      if (dateFrom) matchQuery.date.$gte = dateFrom;
      if (dateTo) matchQuery.date.$lte = dateTo;
    }

    const matches = await Match.find(matchQuery);
    const players = await Player.find({ isActive: true });

    // Aggregate stats per player
    const statsMap = {};
    for (const p of players) {
      statsMap[p._id.toString()] = {
        playerId: p._id,
        playerName: p.fullName,
        company: p.company,
        cricketRole: p.cricketRole,
        jerseyNumber: p.jerseyNumber,
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

    for (const match of matches) {
      const matchParticipants = new Set(
        (match.playingXI || [])
          .filter(px => px.status === 'Playing XI')
          .map(px => px.player.toString())
      );

      for (const stat of (match.playerStats || [])) {
        const pid = stat.player ? stat.player.toString() : null;
        if (!pid || !statsMap[pid]) continue;

        matchParticipants.add(pid);
        const p = statsMap[pid];

        p.runs += stat.runs || 0;
        p.ballsFaced += stat.balls || 0;
        p.fours += stat.fours || 0;
        p.sixes += stat.sixes || 0;

        if (stat.batted) {
          if (stat.notOut) {
            p.notOuts += 1;
          } else {
            p.dismissals += 1;
          }
        }

        p.ballsBowled += stat.ballsBowled || 0;
        p.runsConceded += stat.runsConceded || 0;
        p.wickets += stat.wickets || 0;

        p.catches += stat.catches || 0;
        p.stumpings += stat.stumpings || 0;
        p.runOuts += stat.runOuts || 0;
        p.fieldingPoints += (stat.catches || 0) + 1.5 * (stat.stumpings || 0) + 1.5 * (stat.runOuts || 0);
      }

      for (const pid of matchParticipants) {
        if (statsMap[pid]) {
          statsMap[pid].matches += 1;
        }
      }
    }

    // Calculate derived rates
    const tableData = Object.values(statsMap).map(p => {
      // Strike rate = runs / balls * 100
      const batSR = p.ballsFaced > 0 ? (p.runs / p.ballsFaced) * 100 : 0;
      
      // Average = runs / dismissals (dash if 0 dismissals)
      const batAvg = p.dismissals > 0 ? p.runs / p.dismissals : null;
      
      // Economy = runs conceded / balls bowled * 6 (dash if 0 balls bowled)
      const economy = p.ballsBowled > 0 ? (p.runsConceded / p.ballsBowled) * 6 : null;

      return {
        ...p,
        batSR: Math.round(batSR * 100) / 100,
        batAvg: batAvg !== null ? Math.round(batAvg * 100) / 100 : null,
        economy: economy !== null ? Math.round(economy * 100) / 100 : null,
        fieldingPoints: Math.round(p.fieldingPoints * 10) / 10
      };
    });

    // 1. Best Batsmen: ranked by runs DESC, then higher strike rate
    const topBatsmen = [...tableData]
      .filter(p => p.runs > 0 || p.ballsFaced > 0)
      .sort((a, b) => {
        if (b.runs !== a.runs) return b.runs - a.runs;
        return b.batSR - a.batSR;
      })
      .slice(0, 5);

    // 2. Best Bowlers: ranked by wickets DESC, then lower economy
    const topBowlers = [...tableData]
      .filter(p => p.wickets > 0 || p.ballsBowled > 0)
      .sort((a, b) => {
        if (b.wickets !== a.wickets) return b.wickets - a.wickets;
        const econA = a.economy !== null ? a.economy : 999;
        const econB = b.economy !== null ? b.economy : 999;
        return econA - econB;
      })
      .slice(0, 5);

    // 3. Best Fielders: ranked by fielding points DESC, then catches
    const topFielders = [...tableData]
      .filter(p => p.fieldingPoints > 0)
      .sort((a, b) => {
        if (b.fieldingPoints !== a.fieldingPoints) return b.fieldingPoints - a.fieldingPoints;
        return b.catches - a.catches;
      })
      .slice(0, 5);

    return res.json({
      success: true,
      scoringRuleNote: 'Fielding points = Catches (1.0 pt) + Stumpings (1.5 pts) + Run-outs (1.5 pts) per Akbar Cricket Club scoring rules.',
      topBatsmen,
      topBowlers,
      topFielders,
      tableData: tableData.sort((a, b) => b.runs - a.runs || b.wickets - a.wickets)
    });
  } catch (err) {
    console.error('Leaderboard error:', err);
    return res.status(500).json({ success: false, message: 'Failed to compute leaderboards.' });
  }
});

/**
 * GET /api/leaderboards/export-csv
 * Export filtered leaderboard to CSV with formula injection defense
 */
router.get('/export-csv', authenticate, async (req, res) => {
  try {
    const players = await Player.find({ isActive: true });
    const matches = await Match.find({ scoresVerified: true });

    // Aggregate similarly
    const rows = players.map(p => {
      const s = p.stats || {};
      const batSR = s.ballsFaced > 0 ? ((s.runs / s.ballsFaced) * 100).toFixed(2) : '0.00';
      const batAvg = s.dismissals > 0 ? (s.runs / s.dismissals).toFixed(2) : '—';
      const econ = s.ballsBowled > 0 ? ((s.runsConceded / s.ballsBowled) * 6).toFixed(2) : '—';

      return [
        sanitizeCsvValue(p.fullName),
        sanitizeCsvValue(p.company),
        sanitizeCsvValue(p.cricketRole),
        sanitizeCsvValue(s.matches || 0),
        sanitizeCsvValue(s.runs || 0),
        sanitizeCsvValue(batSR),
        sanitizeCsvValue(batAvg),
        sanitizeCsvValue(s.wickets || 0),
        sanitizeCsvValue(econ),
        sanitizeCsvValue(s.catches || 0),
        sanitizeCsvValue(s.stumpings || 0),
        sanitizeCsvValue(s.runOuts || 0),
        sanitizeCsvValue(s.fieldingPoints || 0)
      ].join(',');
    });

    const csvHeader = 'Player,Company,Role,Matches,Runs,Bat SR,Bat Avg,Wickets,Economy,Catches,Stumpings,Run Outs,Fielding Points';
    const csvContent = `${csvHeader}\n${rows.join('\n')}`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="acc_season_leaderboard_2026_27.csv"');
    return res.send(csvContent);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to export leaderboard CSV.' });
  }
});

module.exports = router;
