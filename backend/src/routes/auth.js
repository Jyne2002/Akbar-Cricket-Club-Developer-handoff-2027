const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { comparePassword, hashPassword } = require('../config/security');
const { authenticate, revokeToken } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/security');

/**
 * POST /api/auth/login
 * Rate limited to prevent brute-force attacks
 */
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Work email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your work email and password.' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your work email and password.' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Sign JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Set HttpOnly cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('acc_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    return res.json({
      success: true,
      message: 'Sign in successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      },
      token // Provided for non-cookie API clients
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
  }
});

/**
 * POST /api/auth/logout
 */
router.post('/logout', authenticate, (req, res) => {
  try {
    if (req.token) {
      revokeToken(req.token);
    }
    res.clearCookie('acc_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    return res.json({ success: true, message: 'Signed out successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error signing out.' });
  }
});

/**
 * GET /api/auth/me
 */
router.get('/me', authenticate, (req, res) => {
  return res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      lastLogin: req.user.lastLogin
    },
    permissions: {
      canViewConfidential: req.canViewConfidential,
      canManageUsers: req.user.role === 'Administrator',
      canEditCricket: ['Administrator', 'Manager', 'Coach'].includes(req.user.role),
      canImportSquad: ['Administrator', 'Manager'].includes(req.user.role),
      canVerifyScores: ['Administrator', 'Manager', 'Coach'].includes(req.user.role)
    }
  });
});

/**
 * PUT /api/auth/change-password
 */
router.put('/change-password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current password and new password are required.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters long.' });
    }

    const isMatch = await comparePassword(currentPassword, req.user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    req.user.password = await hashPassword(newPassword);
    await req.user.save();

    return res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update password.' });
  }
});

module.exports = router;
