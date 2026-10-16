const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Get the 32-byte field encryption key from process.env.FIELD_ENCRYPTION_KEY
 */
function getEncryptionKey() {
  const hexKey = process.env.FIELD_ENCRYPTION_KEY;
  if (!hexKey) {
    throw new Error('FIELD_ENCRYPTION_KEY is not defined in environment variables');
  }
  const keyBuffer = Buffer.from(hexKey, 'hex');
  if (keyBuffer.length !== 32) {
    throw new Error('FIELD_ENCRYPTION_KEY must be exactly 32 bytes (64 hex characters)');
  }
  return keyBuffer;
}

/**
 * Encrypt a text string (e.g. NIC) using AES-256-GCM
 * @param {string} text - Plaintext to encrypt
 * @returns {string|null} - Formatted as iv:tag:ciphertext
 */
function encryptField(text) {
  if (text === undefined || text === null || text === '') return text;
  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(String(text), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  } catch (err) {
    console.error('Encryption error:', err.message);
    throw new Error('Failed to encrypt sensitive field');
  }
}

/**
 * Decrypt a ciphertext string using AES-256-GCM
 * @param {string} cipherString - Formatted as iv:tag:ciphertext
 * @returns {string} - Decrypted plaintext
 */
function decryptField(cipherString) {
  if (!cipherString || typeof cipherString !== 'string') return cipherString;
  const parts = cipherString.split(':');
  if (parts.length !== 3) {
    // If not in encrypted format (e.g. legacy plain text), return as-is
    return cipherString;
  }

  try {
    const key = getEncryptionKey();
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedText = Buffer.from(parts[2], 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, undefined, 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Decryption error:', err.message);
    return '[Decryption Error]';
  }
}

/**
 * Hash password securely with bcryptjs
 */
async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Compare plain password with hash
 */
async function comparePassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

/**
 * Sanitize strings for CSV export to prevent spreadsheet formula injection attacks
 * Prevents execution of formulas starting with =, +, -, @, tab, carriage return
 */
function sanitizeCsvValue(val) {
  if (val === null || val === undefined) return '';
  let str = String(val);
  // If string begins with formula triggers, prepend single apostrophe
  if (/^[=\+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  // Escape double quotes and enclose in quotes if comma, newline, or quote exists
  if (/[",\n\r]/.test(str)) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

module.exports = {
  encryptField,
  decryptField,
  hashPassword,
  comparePassword,
  sanitizeCsvValue
};
