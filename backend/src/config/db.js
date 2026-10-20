const mongoose = require('mongoose');
const dns = require('dns');
const { loadStore, isEmbeddedActive, setEmbeddedActive } = require('./embeddedDb');

async function connectDB() {
  const isProduction = process.env.NODE_ENV === 'production';
  const allowEmbeddedDb = !isProduction && process.env.ALLOW_EMBEDDED_DB !== 'false';
  if (!allowEmbeddedDb && !process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required when the embedded database is disabled.');
  }
  const primaryUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/akbar_cricket';

  try {
    if (process.env.MONGODB_DNS_SERVERS) {
      dns.setServers(process.env.MONGODB_DNS_SERVERS.split(',').map(server => server.trim()).filter(Boolean));
    }
    console.log('Connecting to MongoDB...');
    await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: allowEmbeddedDb ? 2000 : 30000,
      connectTimeoutMS: allowEmbeddedDb ? 2000 : 30000,
      bufferCommands: allowEmbeddedDb,
      autoIndex: allowEmbeddedDb,
      autoCreate: allowEmbeddedDb
    });
    setEmbeddedActive(false);
    console.log(' Connected to primary MongoDB database.');
  } catch (err) {
    if (!allowEmbeddedDb) {
      throw new Error('MongoDB connection failed. Check MONGODB_URI, Atlas network access, and database credentials.', { cause: err });
    }
    console.warn(`Primary MongoDB connection unavailable (${err.message}).`);
    console.log(' Activating zero-dependency embedded database engine with persistence at ./data/store.json.');
    loadStore();
    setEmbeddedActive(true);
    console.log(' Embedded database engine ready. All operations will persist to disk.');
  }

  mongoose.connection.on('error', (err) => {
    if (!isEmbeddedActive()) {
      console.error('MongoDB connection error:', allowEmbeddedDb ? err : 'Check Atlas connectivity and credentials.');
    }
  });
}

async function closeDB() {
  if (!isEmbeddedActive()) {
    await mongoose.disconnect();
  }
}

module.exports = {
  connectDB,
  closeDB
};
