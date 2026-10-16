const express = require('express');
const router = express.Router();
const Inspection = require('../models/Inspection');
const Equipment = require('../models/Equipment');
const { authenticate, requireRoles } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * GET /api/inspections
 * List inspection log with populated equipment
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const inspections = await Inspection.find({})
      .populate('equipment', 'assetId name category condition')
      .sort({ date: -1, createdAt: -1 });

    return res.json({ success: true, inspections });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve inspections.' });
  }
});

/**
 * POST /api/inspections
 * Record weekly inspection with optional photographic evidence.
 * Updates equipment condition and last inspection date while retaining inspection history.
 * NOTE: An inspection does NOT automatically verify stock quantity.
 */
router.post('/', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), upload.single('evidencePhoto'), async (req, res) => {
  try {
    const { equipmentId, date, condition, notes, correctiveAction } = req.body;

    if (!equipmentId || !date || !condition) {
      return res.status(400).json({ success: false, message: 'Equipment, date, and condition are required.' });
    }

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment item not found.' });
    }

    let photoPath = null;
    if (req.file) {
      photoPath = req.file.filename;
    }

    const inspection = await Inspection.create({
      equipment: equipment._id,
      date,
      inspector: req.user.name,
      condition,
      notes: notes || '',
      correctiveAction: correctiveAction || '',
      photo: photoPath
    });

    // Update equipment condition and last inspection date
    // NOTE: Leaves countVerified untouched!
    equipment.condition = condition;
    equipment.lastInspectedDate = date;
    if (photoPath) {
      equipment.photo = photoPath;
    }
    await equipment.save();

    return res.status(201).json({
      success: true,
      message: `Weekly inspection logged for ${equipment.name} (${equipment.assetId}).`,
      inspection
    });
  } catch (err) {
    console.error('Inspection log error:', err);
    return res.status(500).json({ success: false, message: 'Failed to record inspection.' });
  }
});

module.exports = router;
