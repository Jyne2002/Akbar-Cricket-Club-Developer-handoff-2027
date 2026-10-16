const rateLimit = require('express-rate-limit');

// Rate limiting for login attempts: 10 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.'
  }
});

// General API rate limiter: 300 requests per 5 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please slow down.'
  }
});

/**
 * Sanitize request objects against NoSQL injection (preventing keys starting with $)
 */
function sanitizeInput(req, res, next) {
  function clean(obj) {
    if (obj && typeof obj === 'object') {
      for (const key of Object.keys(obj)) {
        if (key.startsWith('$')) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          clean(obj[key]);
        }
      }
    }
  }

  clean(req.body);
  clean(req.query);
  clean(req.params);
  next();
}

module.exports = {
  loginLimiter,
  apiLimiter,
  sanitizeInput
};
