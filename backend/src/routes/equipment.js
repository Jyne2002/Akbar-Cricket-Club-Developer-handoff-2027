const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const { authenticate, requireRoles } = require('../middleware/auth');
const { sanitizeCsvValue } = require('../config/security');

/**
 * GET /api/equipment/stats
 * Compute the 4 primary inventory metrics:
 * 1. Total item records
 * 2. Count pending (items where countVerified is false)
 * 3. Damaged / Lost items
 * 4. Low stock (STRICT RULE: applies ONLY to items with verified count below minimumStock)
 */
router.get('/stats', authenticate, async (req, res) => {
  try {
    const totalRecords = await Equipment.countDocuments({});
    const countPending = await Equipment.countDocuments({ countVerified: false });
    const damagedOrLost = await Equipment.countDocuments({ condition: { $in: ['Damaged', 'Lost'] } });
    
    // Low stock: countVerified === true AND quantity < minimumStock
    const lowStock = await Equipment.countDocuments({
      countVerified: true,
      $expr: { $lt: ['$quantity', '$minimumStock'] }
    });

    return res.json({
      success: true,
      stats: {
        totalRecords,
        countPending,
        damagedOrLost,
        lowStock
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve inventory metrics.' });
  }
});

/**
 * GET /api/equipment
 * List equipment items with filters
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, category, condition } = req.query;
    const query = {};

    if (search && search.trim()) {
      query.$or = [
        { assetId: { $regex: search.trim(), $options: 'i' } },
        { name: { $regex: search.trim(), $options: 'i' } },
        { location: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (condition && condition !== 'All') {
      query.condition = condition;
    }

    const items = await Equipment.find(query)
      .populate('assignedPlayer', 'fullName company cricketRole')
      .sort({ assetId: 1 });

    const formatted = items.map(item => ({
      id: item._id,
      assetId: item.assetId,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      countVerified: item.countVerified,
      unit: item.unit,
      condition: item.condition,
      minimumStock: item.minimumStock,
      expiryDate: item.expiryDate,
      location: item.location,
      assignedPlayer: item.assignedPlayer,
      supplier: item.supplier,
      purchaseDate: item.purchaseDate,
      costLKR: item.costLKR,
      photo: item.photo,
      notes: item.notes,
      lastInspectedDate: item.lastInspectedDate,
      isLowStock: item.isLowStock()
    }));

    return res.json({
      success: true,
      totalCount: formatted.length,
      equipment: formatted
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve equipment.' });
  }
});

/**
 * GET /api/equipment/:id
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const item = await Equipment.findById(req.params.id).populate('assignedPlayer', 'fullName company cricketRole');
    if (!item) {
      return res.status(404).json({ success: false, message: 'Equipment item not found.' });
    }
    return res.json({ success: true, item, isLowStock: item.isLowStock() });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve item.' });
  }
});

/**
 * POST /api/equipment
 * Create new equipment item
 */
router.post('/', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const {
      assetId,
      name,
      category,
      quantity,
      countVerified,
      unit,
      condition,
      minimumStock,
      expiryDate,
      location,
      assignedPlayer,
      supplier,
      purchaseDate,
      costLKR,
      notes
    } = req.body;

    if (!assetId || !name || !category) {
      return res.status(400).json({ success: false, message: 'Asset ID, name, and category are required.' });
    }

    const existing = await Equipment.findOne({ assetId: assetId.trim() });
    if (existing) {
      return res.status(400).json({ success: false, message: `Asset ID ${assetId} already exists.` });
    }

    const item = await Equipment.create({
      assetId: assetId.trim().toUpperCase(),
      name: name.trim(),
      category,
      quantity: parseInt(quantity || 0, 10),
      countVerified: !!countVerified,
      unit: unit || 'units',
      condition: condition || 'Inspect',
      minimumStock: parseInt(minimumStock || 0, 10),
      expiryDate: expiryDate || null,
      location: location || 'Clubhouse Store',
      assignedPlayer: assignedPlayer || null,
      supplier: supplier || '',
      purchaseDate: purchaseDate || '',
      costLKR: parseFloat(costLKR || 0),
      notes: notes || ''
    });

    return res.status(201).json({ success: true, message: `Item ${item.name} (${item.assetId}) created.`, item });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create equipment item.' });
  }
});

/**
 * PUT /api/equipment/:id
 * Edit equipment details
 */
router.put('/:id', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const item = await Equipment.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Equipment item not found.' });
    }

    const fields = [
      'name', 'category', 'unit', 'condition', 'expiryDate', 'location',
      'assignedPlayer', 'supplier', 'purchaseDate', 'costLKR', 'notes'
    ];

    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        item[f] = req.body[f] === '' && f === 'assignedPlayer' ? null : req.body[f];
      }
    });

    if (req.body.minimumStock !== undefined) item.minimumStock = parseInt(req.body.minimumStock, 10);
    if (req.body.quantity !== undefined) item.quantity = parseInt(req.body.quantity, 10);
    if (req.body.countVerified !== undefined) item.countVerified = !!req.body.countVerified;

    await item.save();
    return res.json({ success: true, message: `Equipment ${item.assetId} updated.`, item });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update equipment item.' });
  }
});

/**
 * PUT /api/equipment/:id/verify-count
 * Physical stock verification action
 */
router.put('/:id/verify-count', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const { verifiedQuantity, notes } = req.body;
    const item = await Equipment.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Equipment item not found.' });
    }

    item.quantity = parseInt(verifiedQuantity, 10);
    item.countVerified = true;
    if (notes) {
      item.notes = `${item.notes ? item.notes + ' | ' : ''}Verified count by ${req.user.name}: ${notes}`;
    }

    await item.save();

    return res.json({
      success: true,
      message: `Stock verified for ${item.name}: ${item.quantity} ${item.unit}.`,
      item,
      isLowStock: item.isLowStock()
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to verify stock count.' });
  }
});

/**
 * DELETE /api/equipment/:id
 */
router.delete('/:id', authenticate, requireRoles('Administrator', 'Manager'), async (req, res) => {
  try {
    const item = await Equipment.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Equipment item not found.' });
    }
    return res.json({ success: true, message: `Equipment ${item.assetId} deleted.` });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete equipment item.' });
  }
});

module.exports = router;
