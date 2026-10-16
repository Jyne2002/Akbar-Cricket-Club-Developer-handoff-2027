const express = require('express');
const router = express.Router();
const DamageReport = require('../models/DamageReport');
const Equipment = require('../models/Equipment');
const { authenticate, requireRoles } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * GET /api/damage-reports
 * List all damage reports
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const reports = await DamageReport.find({})
      .populate('equipment', 'assetId name category condition quantity countVerified')
      .sort({ date: -1, createdAt: -1 });

    return res.json({ success: true, reports });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve damage reports.' });
  }
});

/**
 * POST /api/damage-reports
 * File a damage report with incident details and optional photo
 */
router.post('/', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), upload.single('incidentPhoto'), async (req, res) => {
  try {
    const { equipmentId, date, severity, incidentDetails, correctiveAction } = req.body;

    if (!equipmentId || !date || !incidentDetails) {
      return res.status(400).json({ success: false, message: 'Equipment, date, and incident details are required.' });
    }

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment item not found.' });
    }

    let photoPath = null;
    if (req.file) {
      photoPath = req.file.filename;
    }

    const report = await DamageReport.create({
      equipment: equipment._id,
      date,
      reporter: req.user.name,
      severity: severity || 'Medium',
      incidentDetails: incidentDetails.trim(),
      correctiveAction: correctiveAction || '',
      photo: photoPath,
      status: 'Open'
    });

    // Mark equipment condition as Damaged if severity is high/unsafe/medium
    equipment.condition = 'Damaged';
    await equipment.save();

    return res.status(201).json({
      success: true,
      message: `Damage report recorded for ${equipment.name} (${equipment.assetId}).`,
      report
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to record damage report.' });
  }
});

/**
 * POST /api/damage-reports/:id/follow-up
 * Add a follow-up action and optionally update status (Open, In progress, Resolved)
 * NOTE: Resolving a report does NOT automatically certify equipment safe!
 */
router.post('/:id/follow-up', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const { status, note } = req.body;
    const report = await DamageReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Damage report not found.' });
    }

    if (note && note.trim()) {
      report.followUps.push({
        date: new Date().toISOString().split('T')[0],
        note: note.trim(),
        author: req.user.name
      });
    }

    if (status && ['Open', 'In progress', 'Resolved'].includes(status)) {
      report.status = status;
    }

    await report.save();

    return res.json({
      success: true,
      message: 'Damage report updated with follow-up action.',
      report
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update damage report.' });
  }
});

module.exports = router;
