const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const Player = require('../models/Player');
const { authenticate, requireRoles } = require('../middleware/auth');

/**
 * GET /api/sessions
 * List all sessions with attendance statistics
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, type } = req.query;
    const query = {};

    if (search && search.trim()) {
      query.title = { $regex: search.trim(), $options: 'i' };
    }

    if (type && type !== 'All') {
      query.type = type;
    }

    const sessions = await Session.find(query).sort({ date: -1 });

    const formattedSessions = sessions.map(s => {
      const stats = s.calculateAttendance();
      return {
        id: s._id,
        title: s.title,
        type: s.type,
        date: s.date,
        venue: s.venue,
        notes: s.notes,
        matchId: s.matchId,
        attendanceStats: stats,
        completionText: `${stats.markedCount}/${stats.total} marked`,
        rateDisplay: stats.rate !== null ? `${stats.rate}%` : '—'
      };
    });

    return res.json({
      success: true,
      sessions: formattedSessions
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve sessions.' });
  }
});

/**
 * GET /api/sessions/:id
 * Retrieve session detail including full player roll call list
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate('rollCall.player', 'fullName company cricketRole jerseyNumber');
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    // Ensure all active players exist in roll call
    const allPlayers = await Player.find({ isActive: true }).select('fullName company cricketRole jerseyNumber');
    const existingPlayerIds = new Set((session.rollCall || []).map(r => r.player ? r.player._id.toString() : ''));

    let changed = false;
    for (const p of allPlayers) {
      if (!existingPlayerIds.has(p._id.toString())) {
        session.rollCall.push({
          player: p._id,
          status: 'Not marked',
          note: ''
        });
        changed = true;
      }
    }

    if (changed) {
      await session.save();
      await session.populate('rollCall.player', 'fullName company cricketRole jerseyNumber');
    }

    const stats = session.calculateAttendance();

    return res.json({
      success: true,
      session,
      stats
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve session roll call.' });
  }
});

/**
 * POST /api/sessions
 * Create a new practice or match attendance session
 */
router.post('/', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const { title, type, date, venue, notes } = req.body;

    if (!title || !date) {
      return res.status(400).json({ success: false, message: 'Title and date are required.' });
    }

    const players = await Player.find({ isActive: true });
    const rollCall = players.map(p => ({
      player: p._id,
      status: 'Not marked',
      note: ''
    }));

    const session = await Session.create({
      title: title.trim(),
      type: type || 'Practice',
      date,
      venue: venue || '',
      notes: notes || '',
      rollCall
    });

    return res.status(201).json({
      success: true,
      message: `Session "${session.title}" created.`,
      session
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create session.' });
  }
});

/**
 * PUT /api/sessions/:id/roll-call
 * Save roll call updates
 */
router.put('/:id/roll-call', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const { rollCall } = req.body;
    if (!Array.isArray(rollCall)) {
      return res.status(400).json({ success: false, message: 'Invalid roll call data format.' });
    }

    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    // Update roll call items
    session.rollCall = rollCall.map(item => ({
      player: item.player || item.playerId,
      status: item.status || 'Not marked',
      note: item.note || ''
    }));

    await session.save();
    const stats = session.calculateAttendance();

    return res.json({
      success: true,
      message: 'Roll call saved successfully.',
      stats
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to save roll call.' });
  }
});

/**
 * PUT /api/sessions/:id
 * Edit session metadata
 */
router.put('/:id', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const { title, type, date, venue, notes } = req.body;
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    if (title) session.title = title.trim();
    if (type) session.type = type;
    if (date) session.date = date;
    if (venue !== undefined) session.venue = venue;
    if (notes !== undefined) session.notes = notes;

    await session.save();
    return res.json({ success: true, message: 'Session details updated.', session });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update session.' });
  }
});

/**
 * DELETE /api/sessions/:id
 */
router.delete('/:id', authenticate, requireRoles('Administrator', 'Manager'), async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }
    return res.json({ success: true, message: 'Session deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete session.' });
  }
});

module.exports = router;
