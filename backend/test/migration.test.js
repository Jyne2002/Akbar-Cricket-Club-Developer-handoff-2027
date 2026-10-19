const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { test, before } = require('node:test');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { prepareMigration, ensureDestinationEmpty, canonicalDocument } = require('../scripts/migrateLocalStore');

const playerId = '111111111111111111111111';
const sessionId = '222222222222222222222222';
const userId = '333333333333333333333333';
const createdAt = '2026-10-01T12:00:00.000Z';
let safePasswordHash;
let demoPasswordHash;

before(async () => {
  safePasswordHash = await bcrypt.hash(crypto.randomBytes(24).toString('hex'), 4);
  demoPasswordHash = await bcrypt.hash('Coach@2026!', 4);
});

function sourceStore(password = safePasswordHash) {
  return {
    users: [{ _id: userId, name: 'Migration Account', email: 'migration@example.test', password, role: 'Administrator', createdAt }],
    players: [{ _id: playerId, fullName: 'Migration Player', company: 'Other', epfNumber: '004281', createdAt }],
    sessions: [{ _id: sessionId, title: 'Migration Practice', type: 'Practice', date: '2026-10-01', rollCall: [{ player: playerId, status: 'Attended' }] }]
  };
}

test('migration preserves identifiers, references, dates, safe password hashes, and leading zeros', async () => {
  const original = sourceStore();
  const snapshot = JSON.stringify(original);
  const { documents, credentials } = await prepareMigration(original);
  assert.equal(String(documents.users[0]._id), userId);
  assert.equal(documents.users[0].password, safePasswordHash);
  assert.equal(documents.users[0].createdAt.toISOString(), createdAt);
  assert.equal(String(documents.sessions[0].rollCall[0].player), playerId);
  assert.ok(documents.sessions[0].rollCall[0].player instanceof mongoose.Types.ObjectId);
  assert.equal(documents.players[0].epfNumber, '004281');
  assert.equal(documents.players[0].isActive, true);
  assert.equal(documents.players[0].stats.runs, 0);
  assert.deepEqual(credentials, []);
  assert.equal(JSON.stringify(original), snapshot);
});

test('migration reports published demo passwords without altering them in a dry run', async () => {
  const { documents, unsafeAccounts, credentials } = await prepareMigration(sourceStore(demoPasswordHash));
  assert.equal(unsafeAccounts, 1);
  assert.equal(documents.users[0].password, demoPasswordHash);
  assert.deepEqual(credentials, []);
});

test('migration replaces published demo passwords and preserves the source account', async () => {
  const original = sourceStore(demoPasswordHash);
  const { documents, unsafeAccounts, credentials } = await prepareMigration(original, { rotateUnsafePasswords: true });
  assert.equal(unsafeAccounts, 1);
  assert.equal(credentials.length, 1);
  assert.equal(credentials[0].email, original.users[0].email);
  assert.equal(await bcrypt.compare(credentials[0].password, documents.users[0].password), true);
  assert.equal(await bcrypt.compare('Coach@2026!', documents.users[0].password), false);
  assert.equal(original.users[0].password, demoPasswordHash);
});

test('migration rejects missing references, duplicate identifiers, and invalid schemas before writing', async () => {
  const missingReference = sourceStore();
  missingReference.sessions[0].rollCall[0].player = '444444444444444444444444';
  await assert.rejects(prepareMigration(missingReference), /missing players reference/);
  const duplicateIdentifier = sourceStore();
  duplicateIdentifier.players.push({ ...duplicateIdentifier.players[0] });
  await assert.rejects(prepareMigration(duplicateIdentifier), /duplicate identifiers/);
  const invalidRecord = sourceStore();
  invalidRecord.users[0].role = 'Invalid';
  await assert.rejects(prepareMigration(invalidRecord), /failed validation/);
  const missingIdentifier = sourceStore();
  delete missingIdentifier.players[0]._id;
  await assert.rejects(prepareMigration(missingIdentifier), /invalid identifier/);
});

test('migration rejects duplicate normalized emails and plaintext passwords', async () => {
  const duplicateEmail = sourceStore();
  duplicateEmail.users.push({ ...duplicateEmail.users[0], _id: '555555555555555555555555', email: 'MIGRATION@example.test' });
  await assert.rejects(prepareMigration(duplicateEmail), /duplicate email/);
  await assert.rejects(prepareMigration(sourceStore('plaintext-password')), /valid bcrypt password hash/);
});

test('migration preserves encrypted values and encrypts legacy plaintext using the existing key', async () => {
  const previousKey = process.env.FIELD_ENCRYPTION_KEY;
  process.env.FIELD_ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');
  try {
    const { encryptField, decryptField } = require('../src/config/security');
    const original = sourceStore();
    const ciphertext = encryptField('test-sensitive-value');
    original.players[0].nic = ciphertext;
    const encrypted = await prepareMigration(original);
    assert.equal(encrypted.documents.players[0].nic, ciphertext);
    original.players[0].nic = 'test-sensitive-value';
    const plaintext = await prepareMigration(original);
    assert.notEqual(plaintext.documents.players[0].nic, original.players[0].nic);
    assert.equal(decryptField(plaintext.documents.players[0].nic), original.players[0].nic);
  } finally {
    if (previousKey === undefined) delete process.env.FIELD_ENCRYPTION_KEY;
    else process.env.FIELD_ENCRYPTION_KEY = previousKey;
  }
});

test('migration refuses a destination containing records and permits an empty destination', async () => {
  const database = {
    listCollections: () => ({ toArray: async () => [{ name: 'users' }] }),
    collection: () => ({ countDocuments: async () => 1 })
  };
  await assert.rejects(ensureDestinationEmpty(database), /will not overwrite existing records/);
  database.collection = () => ({ countDocuments: async () => 0 });
  await ensureDestinationEmpty(database);
});

test('document verification ignores key order while preserving BSON types', () => {
  const identifier = new mongoose.Types.ObjectId(playerId);
  const document = { _id: identifier, createdAt: new Date(createdAt), stats: { runs: 2, matches: 1 } };
  const reordered = { stats: { matches: 1, runs: 2 }, createdAt: new Date(createdAt), _id: identifier };
  assert.equal(canonicalDocument(document), canonicalDocument(reordered));
  assert.notEqual(canonicalDocument(document), canonicalDocument({ ...document, _id: playerId }));
});
