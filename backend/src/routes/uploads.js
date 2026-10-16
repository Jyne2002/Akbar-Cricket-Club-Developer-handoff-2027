const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { authenticate } = require('../middleware/auth');

const uploadDir = path.resolve(process.env.UPLOADS_DIR || path.join(__dirname, '../../uploads'));

/**
 * GET /api/uploads/:filename
 * Secure file retrieval requiring authenticated session.
 * Protects against directory traversal attacks.
 */
router.get('/:filename', authenticate, (req, res) => {
  const { filename } = req.params;

  // Validate filename contains only safe characters
  if (!/^[a-zA-Z0-9_\-\.]+$/.test(filename) || filename.includes('..')) {
    return res.status(400).json({ success: false, message: 'Invalid filename requested.' });
  }

  const filePath = path.join(uploadDir, filename);

  // Verify file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'Requested file does not exist.' });
  }

  // Ensure path is strictly within uploadDir
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(uploadDir)) {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  return res.sendFile(resolvedPath);
});

module.exports = router;
