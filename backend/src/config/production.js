function validateProductionConfig() {
  if (process.env.NODE_ENV !== 'production') return;

  if (!/^mongodb(?:\+srv)?:\/\//.test(process.env.MONGODB_URI || '')) {
    throw new Error('Production requires MONGODB_URI pointing to the existing MongoDB database.');
  }
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32 || /replace_with/i.test(process.env.JWT_SECRET)) {
    throw new Error('Production requires a secure JWT_SECRET of at least 32 characters.');
  }
  if (!/^[a-f\d]{64}$/i.test(process.env.FIELD_ENCRYPTION_KEY || '')) {
    throw new Error('Production requires FIELD_ENCRYPTION_KEY as 64 hexadecimal characters. Preserve the existing key.');
  }
}

module.exports = { validateProductionConfig };
