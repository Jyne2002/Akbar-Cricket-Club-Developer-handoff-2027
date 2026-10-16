const express = require('express');
const router = express.Router();
const fs = require('fs');
const Match = require('../models/Match');
const Session = require('../models/Session');
const Player = require('../models/Player');
const { authenticate, requireRoles } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  parseCsvScorecard,
  parsePdfScorecard,
  matchPlayersToRoster,
  recalculateSeasonStats,
  formatBallsToOvers
} = require('../services/scorecardService');

/**
 * GET /api/matches
 * List all MCA fixtures
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, format } = req.query;
    const query = {};

    if (search && search.trim()) {
      query.$or = [
        { opponent: { $regex: search.trim(), $options: 'i' } },
        { competition: { $regex: search.trim(), $options: 'i' } },
        { venue: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    if (format && format !== 'All') {
      query.format = format;
    }

    const matches = await Match.find(query).sort({ date: -1 });

    const formatted = matches.map(m => {
      const playingCount = (m.playingXI || []).filter(p => p.status === 'Playing XI').length;
      return {
        id: m._id,
        opponent: m.opponent,
        date: m.date,
        venue: m.venue,
        competition: m.competition,
        season: m.season,
        format: m.format,
        result: m.result,
        ourScore: m.ourScore,
        oppositionScore: m.oppositionScore,
        scorecardCount: (m.scorecards || []).length,
        scoresVerified: m.scoresVerified,
        playingXICount: playingCount,
        linkedSessionId: m.linkedSessionId
      };
    });

    return res.json({
      success: true,
      matches: formatted
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve match fixtures.' });
  }
});

/**
 * GET /api/matches/:id
 * Retrieve fixture detail with Playing XI, attachments, and stats
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('playingXI.player', 'fullName company cricketRole jerseyNumber')
      .populate('playerStats.player', 'fullName company cricketRole');

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match fixture not found.' });
    }

    // Check attendance completion if linked session exists
    let attendanceSummary = 'No linked attendance';
    if (match.linkedSessionId) {
      const linkedSession = await Session.findById(match.linkedSessionId);
      if (linkedSession) {
        const stats = linkedSession.calculateAttendance();
        attendanceSummary = `${stats.markedCount}/${stats.total} marked (${stats.rate !== null ? stats.rate + '%' : '—'})`;
      }
    }

    return res.json({
      success: true,
      match,
      attendanceSummary
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve match details.' });
  }
});

/**
 * POST /api/matches
 * Create MCA fixture and automatically create linked Session for match attendance
 */
router.post('/', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const {
      opponent,
      date,
      venue,
      competition,
      season,
      format,
      result,
      ourScore,
      oppositionScore,
      notes
    } = req.body;

    if (!opponent || !date) {
      return res.status(400).json({ success: false, message: 'Opponent and date are required.' });
    }

    // Initialize playing XI from all active squad players (all set to Unavailable)
    const players = await Player.find({ isActive: true });
    const playingXI = players.map(p => ({
      player: p._id,
      status: 'Unavailable'
    }));

    // Create linked match attendance session
    const rollCall = players.map(p => ({
      player: p._id,
      status: 'Not marked',
      note: ''
    }));

    const session = await Session.create({
      title: `Match vs ${opponent.trim()}`,
      type: 'Match',
      date,
      venue: venue || '',
      notes: `Official match attendance for ${competition || 'MCA League'} fixture.`,
      rollCall
    });

    const match = await Match.create({
      opponent: opponent.trim(),
      date,
      venue: venue || '',
      competition: competition || 'MCA League 2026/27',
      season: season || '2026-2027',
      format: format || 'T20',
      result: result || 'Pending',
      ourScore: ourScore || '',
      oppositionScore: oppositionScore || '',
      notes: notes || '',
      playingXI,
      linkedSessionId: session._id
    });

    // Link back to match in session
    session.matchId = match._id;
    await session.save();

    return res.status(201).json({
      success: true,
      message: `MCA fixture vs ${match.opponent} created.`,
      match
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create match fixture.' });
  }
});

/**
 * PUT /api/matches/:id
 * Edit fixture details
 */
router.put('/:id', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found.' });
    }

    const {
      opponent,
      date,
      venue,
      competition,
      season,
      format,
      result,
      ourScore,
      oppositionScore,
      notes
    } = req.body;

    if (opponent) match.opponent = opponent.trim();
    if (date) match.date = date;
    if (venue !== undefined) match.venue = venue;
    if (competition !== undefined) match.competition = competition;
    if (season !== undefined) match.season = season;
    if (format !== undefined) match.format = format;
    if (result !== undefined) match.result = result;
    if (ourScore !== undefined) match.ourScore = ourScore;
    if (oppositionScore !== undefined) match.oppositionScore = oppositionScore;
    if (notes !== undefined) match.notes = notes;

    await match.save();
    return res.json({ success: true, message: 'Match fixture updated.', match });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update fixture.' });
  }
});

/**
 * PUT /api/matches/:id/playing-xi
 * Update Playing XI selection (Strict Rule: at most 11 Playing XI players)
 */
router.put('/:id/playing-xi', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const { selections } = req.body;
    if (!Array.isArray(selections)) {
      return res.status(400).json({ success: false, message: 'Selections must be an array.' });
    }

    const playingXICount = selections.filter(s => s.status === 'Playing XI').length;
    if (playingXICount > 11) {
      return res.status(400).json({
        success: false,
        message: `Playing XI exceeds limits: selected ${playingXICount} players. Exactly or at most 11 players allowed in the Playing XI.`
      });
    }

    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found.' });
    }

    match.playingXI = selections.map(s => ({
      player: s.playerId || s.player,
      status: s.status || 'Unavailable'
    }));

    await match.save();

    return res.json({
      success: true,
      message: `Playing XI updated (${playingXICount} selected in XI).`,
      playingXI: match.playingXI
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update Playing XI.' });
  }
});

/**
 * POST /api/matches/:id/scorecard
 * Upload PDF or CSV scorecard (up to 10MB)
 * Preserves the original attachment and extracts preview text or rows.
 * NOTE: Uploading or previewing a scorecard does NOT mutate official statistics!
 */
router.post('/:id/scorecard', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), upload.single('scorecardFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No scorecard file uploaded.' });
    }

    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match fixture not found.' });
    }

    // Attach to match scorecard history
    match.scorecards.push({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user.name
    });

    await match.save();

    const ext = req.file.originalname.toLowerCase();
    if (ext.endsWith('.csv')) {
      const csvData = fs.readFileSync(req.file.path, 'utf8');
      const parsedRows = parseCsvScorecard(csvData);
      const matchResult = await matchPlayersToRoster(parsedRows);

      return res.json({
        success: true,
        fileType: 'csv',
        filename: req.file.originalname,
        message: 'CSV Scorecard parsed for review. Official stats will only update when confirmed.',
        matched: matchResult.matched,
        unmatched: matchResult.unmatched,
        duplicates: matchResult.duplicates,
        totalRows: matchResult.totalRows
      });
    } else if (ext.endsWith('.pdf')) {
      const pdfResult = await parsePdfScorecard(req.file.path);
      return res.json({
        success: true,
        fileType: 'pdf',
        filename: req.file.originalname,
        message: 'PDF Scorecard uploaded. Text extracted for verification.',
        extractedText: pdfResult.text,
        numPages: pdfResult.numPages
      });
    }

    return res.json({
      success: true,
      fileType: 'other',
      filename: req.file.originalname,
      message: 'Attachment saved.'
    });
  } catch (err) {
    console.error('Scorecard upload error:', err);
    return res.status(500).json({ success: false, message: `Failed to process scorecard: ${err.message}` });
  }
});

/**
 * POST /api/matches/:id/verify-scores
 * Save reviewed official scores, mark match verified, and recalculate player leaderboards.
 * 100% idempotent: replacing stats does not double-count!
 */
router.post('/:id/verify-scores', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const { playerStats, ourScore, oppositionScore, result } = req.body;

    if (!Array.isArray(playerStats)) {
      return res.status(400).json({ success: false, message: 'playerStats must be an array.' });
    }

    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match fixture not found.' });
    }

    // Update match scores & result if supplied
    if (ourScore !== undefined) match.ourScore = ourScore;
    if (oppositionScore !== undefined) match.oppositionScore = oppositionScore;
    if (result !== undefined) match.result = result;

    // Format player stats
    match.playerStats = playerStats.map(stat => ({
      player: stat.player || stat.playerId,
      playerName: stat.playerName || 'Player',
      batted: !!stat.batted,
      runs: parseInt(stat.runs || 0, 10),
      balls: parseInt(stat.balls || 0, 10),
      fours: parseInt(stat.fours || 0, 10),
      sixes: parseInt(stat.sixes || 0, 10),
      notOut: !!stat.notOut,
      ballsBowled: parseInt(stat.ballsBowled || 0, 10),
      runsConceded: parseInt(stat.runsConceded || 0, 10),
      wickets: parseInt(stat.wickets || 0, 10),
      catches: parseInt(stat.catches || 0, 10),
      stumpings: parseInt(stat.stumpings || 0, 10),
      runOuts: parseInt(stat.runOuts || 0, 10)
    }));

    match.scoresVerified = true;
    match.scoresVerifiedAt = new Date();
    await match.save();

    // Recalculate confirmed season stats across all verified matches
    await recalculateSeasonStats();

    return res.json({
      success: true,
      message: 'Official match scores verified and season leaderboards updated.',
      match
    });
  } catch (err) {
    console.error('Verify scores error:', err);
    return res.status(500).json({ success: false, message: 'Failed to verify scores.' });
  }
});

module.exports = router;
