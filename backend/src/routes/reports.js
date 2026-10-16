const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Session = require('../models/Session');
const Match = require('../models/Match');
const Equipment = require('../models/Equipment');
const Task = require('../models/Task');
const { authenticate } = require('../middleware/auth');
const { sanitizeCsvValue } = require('../config/security');

/**
 * Report 1: 2027 Player Register CSV
 * Respects confidential field permissions
 */
router.get('/players/csv', authenticate, async (req, res) => {
  try {
    const players = await Player.find({ isActive: true }).sort({ fullName: 1 });
    const canViewConfidential = req.canViewConfidential;

    let headers = ['Full Name', 'Company', 'Cricket Role', 'Batting Hand', 'Bowling Arm', 'Jersey Number', 'Matches', 'Runs', 'Wickets'];
    if (canViewConfidential) {
      headers = headers.concat(['Phone', 'Work Email', 'EPF / Employee Number', 'Joining Date', 'NIC Number', 'Worksite', 'Reporting Manager', 'Emergency Contact']);
    }

    const rows = players.map(p => {
      const publicData = p.toPublicJSON(canViewConfidential);
      const s = p.stats || {};
      let row = [
        sanitizeCsvValue(publicData.fullName),
        sanitizeCsvValue(publicData.company),
        sanitizeCsvValue(publicData.cricketRole),
        sanitizeCsvValue(publicData.battingHand),
        sanitizeCsvValue(publicData.bowlingArm),
        sanitizeCsvValue(publicData.jerseyNumber || ''),
        sanitizeCsvValue(s.matches || 0),
        sanitizeCsvValue(s.runs || 0),
        sanitizeCsvValue(s.wickets || 0)
      ];

      if (canViewConfidential) {
        row = row.concat([
          sanitizeCsvValue(publicData.phone || ''),
          sanitizeCsvValue(publicData.workEmail || ''),
          sanitizeCsvValue(publicData.epfNumber || ''),
          sanitizeCsvValue(publicData.joiningDate || ''),
          sanitizeCsvValue(publicData.nic || ''),
          sanitizeCsvValue(publicData.worksite || ''),
          sanitizeCsvValue(publicData.reportingManager || ''),
          sanitizeCsvValue(publicData.emergencyContact ? `${publicData.emergencyContact.name} (${publicData.emergencyContact.phone} - ${publicData.emergencyContact.relationship})` : '')
        ]);
      }
      return row.join(',');
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="acc_2027_player_register.csv"');
    return res.send(`${headers.join(',')}\n${rows.join('\n')}`);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to export player register.' });
  }
});

/**
 * Report 2: Attendance Register CSV
 */
router.get('/attendance/csv', authenticate, async (req, res) => {
  try {
    const sessions = await Session.find({}).sort({ date: -1 }).populate('rollCall.player', 'fullName');
    const headers = ['Session Title', 'Type', 'Date', 'Venue', 'Attended', 'Late', 'Absent', 'Excused', 'Unmarked', 'Total Squad', 'Attendance Rate'];

    const rows = sessions.map(s => {
      const stats = s.calculateAttendance();
      return [
        sanitizeCsvValue(s.title),
        sanitizeCsvValue(s.type),
        sanitizeCsvValue(s.date),
        sanitizeCsvValue(s.venue || 'N/A'),
        sanitizeCsvValue(stats.attended),
        sanitizeCsvValue(stats.late),
        sanitizeCsvValue(stats.absent),
        sanitizeCsvValue(stats.excused),
        sanitizeCsvValue(stats.notMarked),
        sanitizeCsvValue(stats.total),
        sanitizeCsvValue(stats.rate !== null ? `${stats.rate}%` : 'N/A')
      ].join(',');
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="acc_attendance_register_2026_27.csv"');
    return res.send(`${headers.join(',')}\n${rows.join('\n')}`);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to export attendance register.' });
  }
});

/**
 * Report 3: MCA Match History CSV
 */
router.get('/matches/csv', authenticate, async (req, res) => {
  try {
    const matches = await Match.find({}).sort({ date: -1 });
    const headers = ['Date', 'Opponent', 'Competition', 'Season', 'Format', 'Result', 'Our Score', 'Opposition Score', 'Scores Verified', 'Venue'];

    const rows = matches.map(m => [
      sanitizeCsvValue(m.date),
      sanitizeCsvValue(m.opponent),
      sanitizeCsvValue(m.competition),
      sanitizeCsvValue(m.season),
      sanitizeCsvValue(m.format),
      sanitizeCsvValue(m.result),
      sanitizeCsvValue(m.ourScore || ''),
      sanitizeCsvValue(m.oppositionScore || ''),
      sanitizeCsvValue(m.scoresVerified ? 'Yes' : 'No'),
      sanitizeCsvValue(m.venue || '')
    ].join(','));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="acc_mca_match_history.csv"');
    return res.send(`${headers.join(',')}\n${rows.join('\n')}`);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to export match history.' });
  }
});

/**
 * Report 4: Equipment Stock Register CSV
 */
router.get('/equipment/csv', authenticate, async (req, res) => {
  try {
    const items = await Equipment.find({}).sort({ assetId: 1 }).populate('assignedPlayer', 'fullName');
    const headers = ['Asset ID', 'Item Name', 'Category', 'Quantity', 'Count Verified', 'Unit', 'Condition', 'Min Stock Target', 'Location', 'Assigned Player', 'Last Inspection'];

    const rows = items.map(i => [
      sanitizeCsvValue(i.assetId),
      sanitizeCsvValue(i.name),
      sanitizeCsvValue(i.category),
      sanitizeCsvValue(i.quantity),
      sanitizeCsvValue(i.countVerified ? 'Verified' : 'Pending Verification'),
      sanitizeCsvValue(i.unit),
      sanitizeCsvValue(i.condition),
      sanitizeCsvValue(i.minimumStock),
      sanitizeCsvValue(i.location),
      sanitizeCsvValue(i.assignedPlayer ? i.assignedPlayer.fullName : 'Clubhouse'),
      sanitizeCsvValue(i.lastInspectedDate || 'Awaiting Check')
    ].join(','));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="acc_equipment_stock_register.csv"');
    return res.send(`${headers.join(',')}\n${rows.join('\n')}`);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to export equipment register.' });
  }
});

/**
 * Report 5: Management Action List CSV
 */
router.get('/tasks/csv', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    const headers = ['Title', 'Category', 'Priority', 'Status', 'Owner', 'Due Date', 'Source', 'Details'];

    const rows = tasks.map(t => [
      sanitizeCsvValue(t.title),
      sanitizeCsvValue(t.category),
      sanitizeCsvValue(t.priority),
      sanitizeCsvValue(t.status),
      sanitizeCsvValue(t.owner),
      sanitizeCsvValue(t.dueDate || 'N/A'),
      sanitizeCsvValue(t.source),
      sanitizeCsvValue(t.details)
    ].join(','));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="acc_management_action_list.csv"');
    return res.send(`${headers.join(',')}\n${rows.join('\n')}`);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to export task list.' });
  }
});

/**
 * Report 6: Performance Leaderboard CSV (Delegates to leaderboards export logic)
 */
router.get('/leaderboard/csv', authenticate, async (req, res) => {
  res.redirect('/api/leaderboards/export-csv');
});

/**
 * GET /api/reports/summary
 * Provides overview metrics for the Reports & Exports dashboard
 */
router.get('/summary', authenticate, async (req, res) => {
  try {
    const playerCount = await Player.countDocuments({ isActive: true });
    const sessionCount = await Session.countDocuments({});
    const matchCount = await Match.countDocuments({});
    const equipmentCount = await Equipment.countDocuments({});
    const taskCount = await Task.countDocuments({});
    const verifiedMatches = await Match.countDocuments({ scoresVerified: true });

    return res.json({
      success: true,
      counts: {
        players: playerCount,
        sessions: sessionCount,
        matches: matchCount,
        verifiedMatches,
        equipment: equipmentCount,
        tasks: taskCount
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to load reports summary.' });
  }
});

module.exports = router;
