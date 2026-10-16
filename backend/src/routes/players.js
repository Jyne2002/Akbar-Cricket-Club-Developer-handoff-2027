const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Equipment = require('../models/Equipment');
const Session = require('../models/Session');
const { authenticate, requireRoles } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { encryptField } = require('../config/security');

/**
 * GET /api/players
 * List players with optional filters. Masks confidential fields if unauthorized.
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, company, cricketRole } = req.query;
    const query = { isActive: true };

    if (search && search.trim()) {
      query.fullName = { $regex: search.trim(), $options: 'i' };
    }

    if (company && company !== 'All') {
      query.company = company;
    }

    if (cricketRole && cricketRole !== 'All') {
      query.cricketRole = cricketRole;
    }

    const players = await Player.find(query).sort({ fullName: 1 });
    const canViewConfidential = req.canViewConfidential;

    const sanitizedPlayers = players.map(p => p.toPublicJSON(canViewConfidential));

    return res.json({
      success: true,
      totalCount: sanitizedPlayers.length,
      players: sanitizedPlayers
    });
  } catch (err) {
    console.error('Fetch players error:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve players.' });
  }
});

/**
 * GET /api/players/:id
 * Retrieve player profile, recent attendance, and assigned gear.
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found.' });
    }

    const canViewConfidential = req.canViewConfidential;
    const playerJson = player.toPublicJSON(canViewConfidential);

    // Fetch assigned equipment
    const assignedEquipment = await Equipment.find({ assignedPlayer: player._id })
      .select('assetId name category condition quantity countVerified');

    // Fetch recent session attendance
    const recentSessions = await Session.find({ 'rollCall.player': player._id })
      .sort({ date: -1 })
      .limit(10)
      .select('title type date venue rollCall');

    const attendanceHistory = recentSessions.map(s => {
      const entry = (s.rollCall || []).find(e => e.player.toString() === player._id.toString());
      return {
        sessionId: s._id,
        sessionTitle: s.title,
        type: s.type,
        date: s.date,
        venue: s.venue,
        status: entry ? entry.status : 'Not marked',
        note: entry ? entry.note : ''
      };
    });

    return res.json({
      success: true,
      player: playerJson,
      assignedEquipment,
      attendanceHistory
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve player profile.' });
  }
});

/**
 * POST /api/players
 * Create new player (Administrator & Manager only)
 */
router.post('/', authenticate, requireRoles('Administrator', 'Manager'), async (req, res) => {
  try {
    const {
      fullName,
      company,
      cricketRole,
      battingHand,
      bowlingArm,
      bowlingStyle,
      jerseyNumber,
      notes,
      phone,
      workEmail,
      epfNumber,
      joiningDate,
      nic,
      worksite,
      reportingManager,
      emergencyContact
    } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }

    const newPlayerData = {
      fullName: fullName.trim(),
      company: company || 'Other',
      cricketRole: cricketRole || 'Not set',
      battingHand: battingHand || 'Not set',
      bowlingArm: bowlingArm || 'Not set',
      bowlingStyle: bowlingStyle || 'Not set',
      jerseyNumber: jerseyNumber ? parseInt(jerseyNumber, 10) : null,
      notes: notes || '',
      phone: phone || '',
      workEmail: workEmail || '',
      epfNumber: epfNumber ? String(epfNumber) : '',
      joiningDate: joiningDate || '',
      nic: nic ? encryptField(nic) : '',
      worksite: worksite || '',
      reportingManager: reportingManager || '',
      emergencyContact: emergencyContact || { name: '', phone: '', relationship: '' }
    };

    const player = await Player.create(newPlayerData);
    return res.status(201).json({
      success: true,
      message: `Player ${player.fullName} added successfully.`,
      player: player.toPublicJSON(true)
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create player.' });
  }
});

/**
 * PUT /api/players/:id
 * Update player details
 * - Coaches can edit permitted cricket details.
 * - Administrators & Managers can edit all fields including confidential ones.
 */
router.put('/:id', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found.' });
    }

    const isPrivileged = ['Administrator', 'Manager'].includes(req.user.role);

    // Allowed cricket fields for Coach, Admin, and Manager
    if (req.body.cricketRole !== undefined) player.cricketRole = req.body.cricketRole;
    if (req.body.battingHand !== undefined) player.battingHand = req.body.battingHand;
    if (req.body.bowlingArm !== undefined) player.bowlingArm = req.body.bowlingArm;
    if (req.body.bowlingStyle !== undefined) player.bowlingStyle = req.body.bowlingStyle;
    if (req.body.jerseyNumber !== undefined) player.jerseyNumber = req.body.jerseyNumber ? parseInt(req.body.jerseyNumber, 10) : null;
    if (req.body.notes !== undefined) player.notes = req.body.notes;
    if (req.body.photo !== undefined) player.photo = req.body.photo;

    // Privileged fields
    if (isPrivileged) {
      if (req.body.fullName) player.fullName = req.body.fullName.trim();
      if (req.body.company) player.company = req.body.company;
      if (req.body.phone !== undefined) player.phone = req.body.phone;
      if (req.body.workEmail !== undefined) player.workEmail = req.body.workEmail;
      if (req.body.epfNumber !== undefined) player.epfNumber = String(req.body.epfNumber);
      if (req.body.joiningDate !== undefined) player.joiningDate = req.body.joiningDate;
      if (req.body.nic !== undefined && req.body.nic.trim()) {
        player.nic = encryptField(req.body.nic.trim());
      }
      if (req.body.worksite !== undefined) player.worksite = req.body.worksite;
      if (req.body.reportingManager !== undefined) player.reportingManager = req.body.reportingManager;
      if (req.body.emergencyContact !== undefined) player.emergencyContact = req.body.emergencyContact;
    }

    await player.save();

    return res.json({
      success: true,
      message: `Updated profile for ${player.fullName}.`,
      player: player.toPublicJSON(isPrivileged)
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update player.' });
  }
});

/**
 * POST /api/players/import-csv
 * CSV Import for squad players (Admin and Manager only)
 * Rules:
 * - Match existing players by name
 * - Update supplied details
 * - Add new players
 * - Preserve leading zeros in employee/EPF numbers
 * - Do NOT erase existing values when imported fields are blank
 * - Report summary results
 */
router.post('/import-csv', authenticate, requireRoles('Administrator', 'Manager'), upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a CSV file.' });
    }

    const fs = require('fs');
    const content = fs.readFileSync(req.file.path, 'utf8');
    const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);

    if (lines.length < 2) {
      return res.status(400).json({ success: false, message: 'CSV file must have headers and at least one data row.' });
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[\s_/-]+/g, ''));
    let updatedCount = 0;
    let createdCount = 0;
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      // Basic CSV cell extraction handling quotes
      const row = lines[i];
      const cells = row.split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
      if (cells.length === 0 || !cells[0]) continue;

      const rowMap = {};
      headers.forEach((h, idx) => {
        rowMap[h] = cells[idx] !== undefined ? cells[idx] : '';
      });

      const fullName = rowMap['fullname'] || rowMap['name'] || rowMap['playername'] || cells[0];
      if (!fullName) continue;

      try {
        let player = await Player.findOne({ fullName: { $regex: `^${fullName.trim()}$`, $options: 'i' } });

        if (player) {
          // Update supplied non-blank fields without erasing existing ones
          if (rowMap['company']) player.company = rowMap['company'];
          if (rowMap['cricketrole'] || rowMap['role']) player.cricketRole = rowMap['cricketrole'] || rowMap['role'];
          if (rowMap['battinghand'] || rowMap['batting']) player.battingHand = rowMap['battinghand'] || rowMap['batting'];
          if (rowMap['bowlingarm'] || rowMap['bowling']) player.bowlingArm = rowMap['bowlingarm'] || rowMap['bowling'];
          if (rowMap['bowlingstyle']) player.bowlingStyle = rowMap['bowlingstyle'];
          if (rowMap['jerseynumber'] || rowMap['jersey']) {
            const num = parseInt(rowMap['jerseynumber'] || rowMap['jersey'], 10);
            if (!isNaN(num)) player.jerseyNumber = num;
          }
          if (rowMap['phone']) player.phone = rowMap['phone'];
          if (rowMap['workemail'] || rowMap['email']) player.workEmail = rowMap['workemail'] || rowMap['email'];
          // Preserve leading zeros
          if (rowMap['epfnumber'] || rowMap['epf'] || rowMap['employeenumber']) {
            player.epfNumber = String(rowMap['epfnumber'] || rowMap['epf'] || rowMap['employeenumber']);
          }
          if (rowMap['joiningdate']) player.joiningDate = rowMap['joiningdate'];
          if (rowMap['nic']) player.nic = encryptField(rowMap['nic']);
          if (rowMap['worksite']) player.worksite = rowMap['worksite'];
          if (rowMap['reportingmanager'] || rowMap['hod']) player.reportingManager = rowMap['reportingmanager'] || rowMap['hod'];

          await player.save();
          updatedCount++;
        } else {
          // Create new player
          const newPlayer = new Player({
            fullName: fullName.trim(),
            company: rowMap['company'] || 'Other',
            cricketRole: rowMap['cricketrole'] || rowMap['role'] || 'Not set',
            battingHand: rowMap['battinghand'] || rowMap['batting'] || 'Not set',
            bowlingArm: rowMap['bowlingarm'] || rowMap['bowling'] || 'Not set',
            bowlingStyle: rowMap['bowlingstyle'] || 'Not set',
            jerseyNumber: rowMap['jerseynumber'] ? parseInt(rowMap['jerseynumber'], 10) : null,
            phone: rowMap['phone'] || '',
            workEmail: rowMap['workemail'] || rowMap['email'] || '',
            epfNumber: rowMap['epfnumber'] || rowMap['epf'] || rowMap['employeenumber'] ? String(rowMap['epfnumber'] || rowMap['epf'] || rowMap['employeenumber']) : '',
            joiningDate: rowMap['joiningdate'] || '',
            nic: rowMap['nic'] ? encryptField(rowMap['nic']) : '',
            worksite: rowMap['worksite'] || '',
            reportingManager: rowMap['reportingmanager'] || rowMap['hod'] || ''
          });
          await newPlayer.save();
          createdCount++;
        }
      } catch (rowErr) {
        errors.push(`Row ${i + 1} (${fullName}): ${rowErr.message}`);
      }
    }

    return res.json({
      success: true,
      message: `CSV import completed: ${createdCount} created, ${updatedCount} updated.`,
      createdCount,
      updatedCount,
      errors
    });
  } catch (err) {
    console.error('CSV import error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process CSV import.' });
  }
});

module.exports = router;
