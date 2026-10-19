const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
process.env.NODE_ENV = 'production';

const mongoose = require('mongoose');
const { connectDB, closeDB } = require('../src/config/db');

async function checkDatabase() {
  try {
    await connectDB();
    const database = mongoose.connection.db;
    await database.command({ ping: 1 });
    const collections = await database.listCollections({}, { nameOnly: true }).toArray();
    console.log(`MongoDB connection verified. Database: ${database.databaseName}`);
    console.log(`Existing collections: ${collections.length}`);
    if (collections.length === 0) {
      console.log('This database is empty. Existing local data has not been migrated.');
    }
    console.log('No records, collections, or indexes were changed.');
  } catch (err) {
    console.error('Database check failed:', err.message);
    process.exitCode = 1;
  } finally {
    await closeDB();
  }
}

checkDatabase();
