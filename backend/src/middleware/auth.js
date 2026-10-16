const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Blacklist/revoked token cache for session invalidation on logout
const revokedTokens = new Set();

function revokeToken(token) {
  if (token) {
    revokedTokens.add(token);
    // Cleanup old revoked tokens periodically
    if (revokedTokens.size > 10000) {
      revokedTokens.clear();
    }
  }
}

/**
 * Middleware to authenticate requests via JWT cookie or Authorization header
 */
async function authenticate(req, res, next) {
  try {
    let token = null;

    // Check cookie first (preferred HttpOnly cookie)
    if (req.cookies && req.cookies.acc_token) {
      token = req.cookies.acc_token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required. Please sign in.' });
    }

    if (revokedTokens.has(token)) {
      return res.status(401).json({ success: false, message: 'Session has been revoked. Please sign in again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User account no longer exists.' });
    }

    req.user = user;
    req.token = token;
    req.canViewConfidential = (user.role === 'Administrator' || user.role === 'Manager');
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session. Please sign in again.' });
  }
}

/**
 * Middleware to restrict route to specific roles
 */
function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of: ${roles.join(', ')}. Your role is: ${req.user.role}.`
      });
    }
    next();
  };
}

module.exports = {
  authenticate,
  requireRoles,
  revokeToken
};
