const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { hashPassword, comparePassword, encryptField, decryptField } = require('../src/config/security');
const { connectDB, closeDB } = require('../src/config/db');

const models = {
  users: require('../src/models/User'),
  players: require('../src/models/Player'),
  sessions: require('../src/models/Session'),
  matches: require('../src/models/Match'),
  equipment: require('../src/models/Equipment'),
  inspections: require('../src/models/Inspection'),
  damageReports: require('../src/models/DamageReport'),
  tasks: require('../src/models/Task')
};

const referencePaths = {
  sessions: [['matchId', 'matches'], ['rollCall.*.player', 'players']],
  matches: [['linkedSessionId', 'sessions'], ['playingXI.*.player', 'players'], ['playerStats.*.player', 'players']],
  equipment: [['assignedPlayer', 'players']],
  inspections: [['equipment', 'equipment']],
  damageReports: [['equipment', 'equipment']]
};

const publishedDemoPasswords = ['AkbarCricket@2026!', 'Manager@2026!', 'Coach@2026!'];

function sourceHash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function getReferences(value, segments) {
  if (value == null) return [];
  if (segments.length === 0) return [value];
  const [segment, ...remaining] = segments;
  if (segment === '*') return (value || []).flatMap(entry => getReferences(entry, remaining));
  return getReferences(value[segment], remaining);
}

function validateReferences(documents) {
  for (const [collection, paths] of Object.entries(referencePaths)) {
    for (const [field, target] of paths) {
      const targetIds = new Set(documents[target].map(record => String(record._id)));
      for (const record of documents[collection]) {
        for (const reference of getReferences(record, field.split('.'))) {
          if (!targetIds.has(String(reference))) {
            throw new Error(`Local ${collection} has a missing ${target} reference in ${field}.`);
          }
        }
      }
    }
  }
}

async function prepareMigration(store, { rotateUnsafePasswords = false } = {}) {
  if (!store || typeof store !== 'object' || Array.isArray(store)) {
    throw new Error('Local store must be a JSON object.');
  }
  for (const collection of Object.keys(store)) {
    if (!models[collection]) throw new Error('Local store contains an unrecognized collection.');
  }

  const documents = {};
  const credentials = [];
  let unsafeAccounts = 0;

  for (const [collection, model] of Object.entries(models)) {
    const records = store[collection] || [];
    if (!Array.isArray(records)) throw new Error(`Local ${collection} must be an array.`);
    const identifiers = new Set();
    documents[collection] = [];

    for (const [recordIndex, record] of records.entries()) {
      if (!record || !/^[a-f\d]{24}$/i.test(record._id || '')) {
        throw new Error(`Local ${collection} record ${recordIndex + 1} has an invalid identifier.`);
      }
      if (identifiers.has(record._id)) throw new Error(`Local ${collection} contains duplicate identifiers.`);
      identifiers.add(record._id);

      const document = new model(JSON.parse(JSON.stringify(record)), null, { strict: false });
      try {
        await document.validate();
      } catch (err) {
        const fields = Object.keys(err.errors || {}).join(', ');
        throw new Error(`Local ${collection} record ${recordIndex + 1} failed validation for fields: ${fields}.`);
      }

      if (collection === 'users') {
        if (!/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(document.password)) {
          throw new Error('A local account does not contain a valid bcrypt password hash.');
        }
        for (const password of publishedDemoPasswords) {
          if (await comparePassword(password, document.password)) {
            unsafeAccounts++;
            if (rotateUnsafePasswords) {
              const replacement = crypto.randomBytes(24).toString('base64url');
              document.password = await hashPassword(replacement);
              credentials.push({ email: document.email, role: document.role, password: replacement });
            }
            break;
          }
        }
      }

      if (collection === 'players' && document.nic) {
        if (document.nic.includes(':')) {
          if (decryptField(document.nic) === '[Decryption Error]') {
            throw new Error('The current encryption key cannot decrypt existing player records.');
          }
        } else {
          document.nic = encryptField(document.nic);
        }
      }

      documents[collection].push(document.toObject({
        depopulate: true,
        getters: false,
        virtuals: false,
        transform: false,
        minimize: false
      }));
    }
  }

  for (const [collection, field] of [['users', 'email'], ['equipment', 'assetId']]) {
    const values = documents[collection].map(record => record[field]);
    if (new Set(values).size !== values.length) {
      throw new Error(`Local ${collection} contains duplicate ${field} values.`);
    }
  }
  validateReferences(documents);
  return { documents, credentials, unsafeAccounts };
}

async function ensureDestinationEmpty(database) {
  const collections = await database.listCollections({}, { nameOnly: true }).toArray();
  for (const collection of collections) {
    if (await database.collection(collection.name).countDocuments({}) > 0) {
      throw new Error('Destination database is not empty. Migration will not overwrite existing records.');
    }
  }
}

function canonicalDocument(document) {
  function sortKeys(value) {
    if (Array.isArray(value)) return value.map(sortKeys);
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, sortKeys(value[key])]));
  }
  return JSON.stringify(sortKeys(mongoose.mongo.BSON.EJSON.serialize(document, { relaxed: false })));
}

async function verifyMigration(database, documents) {
  const summary = {};
  for (const [collection, model] of Object.entries(models)) {
    const actual = await database.collection(model.collection.collectionName).find({}).toArray();
    assert.equal(actual.length, documents[collection].length, `${collection} count differs from the migration snapshot.`);
    const expectedById = new Map(documents[collection].map(document => [String(document._id), canonicalDocument(document)]));
    for (const document of actual) {
      if (canonicalDocument(document) !== expectedById.get(String(document._id))) {
        throw new Error(`${collection} content differs from the migration snapshot.`);
      }
    }
    summary[collection] = actual.length;
  }
  return summary;
}

async function runMigration(args = process.argv.slice(2)) {
  if (args.some(argument => !['--apply', '--dry-run'].includes(argument)) || args.length > 1) {
    throw new Error('Usage: npm run db:migrate -- [--dry-run|--apply]');
  }
  const apply = args.includes('--apply');
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
  process.env.NODE_ENV = 'production';

  const sourcePath = path.resolve(__dirname, '../data/store.json');
  const credentialsPath = path.resolve(__dirname, '../.env.migration-credentials');
  const original = fs.readFileSync(sourcePath);
  const digest = sourceHash(original);
  const prepared = await prepareMigration(JSON.parse(original), { rotateUnsafePasswords: apply });
  const counts = Object.fromEntries(Object.entries(prepared.documents).map(([collection, records]) => [collection, records.length]));

  try {
    await connectDB();
    const database = mongoose.connection.db;
    await ensureDestinationEmpty(database);
    console.log(`Destination database: ${database.databaseName}`);
    console.log(`Migration record counts: ${JSON.stringify(counts)}`);
    console.log(`Accounts requiring replacement of published demo passwords: ${prepared.unsafeAccounts}`);

    if (!apply) {
      console.log('Dry run passed. No database records or source files were changed.');
      return;
    }

    if (prepared.credentials.length > 0 && fs.existsSync(credentialsPath)) {
      throw new Error('A migration credentials file already exists. Review the previous migration before retrying.');
    }
    if (sourceHash(fs.readFileSync(sourcePath)) !== digest) {
      throw new Error('Local source changed during preparation. Migration stopped before database writes.');
    }

    const backupDirectory = path.resolve(__dirname, '../data/migration-backups', new Date().toISOString().replace(/[:.]/g, '-'));
    fs.mkdirSync(backupDirectory, { recursive: true });
    fs.writeFileSync(path.join(backupDirectory, 'source-store.json'), original, { flag: 'wx', mode: 0o600 });
    fs.writeFileSync(path.join(backupDirectory, 'prepared-records.json'), mongoose.mongo.BSON.EJSON.stringify(prepared.documents, null, 2, { relaxed: false }), { flag: 'wx', mode: 0o600 });
    fs.writeFileSync(path.join(backupDirectory, 'manifest.json'), JSON.stringify({ database: database.databaseName, sourceSha256: digest, counts, rotatedAccounts: prepared.credentials.length }, null, 2), { flag: 'wx', mode: 0o600 });

    if (prepared.credentials.length > 0) {
      const lines = prepared.credentials.flatMap((account, accountIndex) => {
        const prefix = `ACCOUNT_${accountIndex + 1}`;
        return [`${prefix}_ROLE=${JSON.stringify(account.role)}`, `${prefix}_EMAIL=${JSON.stringify(account.email)}`, `${prefix}_PASSWORD=${JSON.stringify(account.password)}`];
      });
      fs.writeFileSync(credentialsPath, `${lines.join('\n')}\n`, { flag: 'wx', mode: 0o600 });
    }

    const existingCollections = new Set((await database.listCollections({}, { nameOnly: true }).toArray()).map(collection => collection.name));
    for (const model of Object.values(models)) {
      const collectionName = model.collection.collectionName;
      if (!existingCollections.has(collectionName)) await database.createCollection(collectionName);
      const indexes = model.schema.indexes().map(([key, options]) => ({ key, ...options }));
      if (indexes.length > 0) await database.collection(collectionName).createIndexes(indexes);
    }

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        for (const [collection, model] of Object.entries(models)) {
          const target = database.collection(model.collection.collectionName);
          if (await target.countDocuments({}, { session }) > 0) {
            throw new Error('Destination records changed before migration. Transaction aborted.');
          }
          if (prepared.documents[collection].length > 0) {
            await target.insertMany(prepared.documents[collection], { session, ordered: true });
          }
        }
      }, { readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' } });
    } finally {
      await session.endSession();
    }

    const verified = await verifyMigration(database, prepared.documents);
    assert.equal(sourceHash(fs.readFileSync(sourcePath)), digest, 'Local source changed during migration.');
    console.log(`Migration committed and every imported document verified: ${JSON.stringify(verified)}`);
    console.log(`Local backup and verification snapshot: ${path.relative(path.resolve(__dirname, '../..'), backupDirectory)}`);
    if (prepared.credentials.length > 0) console.log('Replacement logins saved in backend/.env.migration-credentials (Git-ignored).');
    console.log('The original local store and encryption key were preserved.');
  } finally {
    await closeDB();
  }
}

if (require.main === module) {
  runMigration().catch(error => {
    if (error.code) {
      console.error(`Migration failed with database or filesystem error code ${error.code}. Review the retained backup before retrying.`);
    } else {
      console.error('Migration failed:', error.message);
    }
    process.exitCode = 1;
  });
}

module.exports = { prepareMigration, ensureDestinationEmpty, canonicalDocument, verifyMigration };
