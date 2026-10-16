const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate, requireRoles } = require('../middleware/auth');
const { hashPassword } = require('../config/security');

// All routes require Administrator role
router.use(authenticate, requireRoles('Administrator'));

/**
 * GET /api/users - List all users
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve users.' });
  }
});

/**
 * POST /api/users - Create new user account (Administrator only)
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Name, email, password, and role are required.' });
    }

    const validRoles = ['Administrator', 'Manager', 'Coach', 'Viewer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: `Role must be one of: ${validRoles.join(', ')}` });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A user account with this email already exists.' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role
    });

    return res.status(201).json({
      success: true,
      message: `Account created for ${newUser.name} with role ${newUser.role}.`,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create user account.' });
  }
});

module.exports = router;
