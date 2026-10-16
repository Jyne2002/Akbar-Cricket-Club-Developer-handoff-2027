const mongoose = require('mongoose');
const { loadStore, isEmbeddedActive, setEmbeddedActive } = require('./embeddedDb');

async function connectDB() {
  const primaryUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/akbar_cricket';

  try {
    console.log(`Connecting to MongoDB at ${primaryUri}...`);
    await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000
    });
    setEmbeddedActive(false);
    console.log(' Connected to primary MongoDB database.');
  } catch (err) {
    console.warn(`Primary MongoDB connection unavailable (${err.message}).`);
    console.log(' Activating zero-dependency embedded database engine with persistence at ./data/store.json.');
    loadStore();
    setEmbeddedActive(true);
    console.log(' Embedded database engine ready. All operations will persist to disk.');
  }

  mongoose.connection.on('error', (err) => {
    if (!isEmbeddedActive()) {
      console.error('MongoDB connection error:', err);
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
