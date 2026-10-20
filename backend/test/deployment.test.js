const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const dns = require('node:dns');
const { once } = require('node:events');
const { test, before, after, mock } = require('node:test');

const testDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'acc-deployment-'));
process.env.NODE_ENV = 'production';
process.env.PORT = '0';
process.env.APP_ORIGIN = 'https://cricket.akbar.com';
process.env.MONGODB_URI = 'mongodb://127.0.0.1:1/acc_deployment_test';
process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
process.env.FIELD_ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');
process.env.ADMIN_EMAIL = 'unused-admin@example.test';
process.env.ADMIN_PASSWORD = crypto.randomBytes(24).toString('hex');
process.env.SEED_ON_STARTUP = 'true';
process.env.ALLOW_EMBEDDED_DB = 'false';
process.env.MONGODB_DNS_SERVERS = '';
process.env.EMBEDDED_DB_DIR = testDirectory;
process.env.UPLOADS_DIR = path.join(testDirectory, 'uploads');

const mongoose = require('mongoose');
const User = require('../src/models/User');
const { connectDB } = require('../src/config/db');
const { isEmbeddedActive } = require('../src/config/embeddedDb');
const { validateProductionConfig } = require('../src/config/production');
const { seedDatabase } = require('../src/services/seedService');
const app = require('../server');
const frontendDist = path.resolve(__dirname, '../hostinger-static');
let server;
let apiOrigin;

before(async () => {
  assert.ok(fs.existsSync(path.join(frontendDist, 'index.html')), 'Run npm run build:hostinger before npm test.');
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  apiOrigin = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise(resolve => server.close(resolve));
  mock.restoreAll();
  fs.rmSync(testDirectory, { recursive: true, force: true });
});

test('serves the built frontend at /, /index.html, and nested SPA routes', async () => {
  const expectedHtml = fs.readFileSync(path.join(frontendDist, 'index.html'), 'utf8');
  for (const route of ['/', '/index.html', '/players', '/players/nested/profile']) {
    const response = await fetch(`${apiOrigin}${route}`, { headers: { Accept: 'text/html' } });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.equal(await response.text(), expectedHtml);
  }
});

test('serves production JavaScript and CSS assets without SPA fallback', async () => {
  const html = fs.readFileSync(path.join(frontendDist, 'index.html'), 'utf8');
  const assetPaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(match => match[1]);
  assert.ok(assetPaths.some(assetPath => assetPath.endsWith('.js')));
  assert.ok(assetPaths.some(assetPath => assetPath.endsWith('.css')));
  for (const assetPath of assetPaths) {
    const response = await fetch(`${apiOrigin}${assetPath}`);
    assert.equal(response.status, 200);
    assert.doesNotMatch(response.headers.get('content-type'), /text\/html/);
  }
  const missingAsset = await fetch(`${apiOrigin}/assets/missing.js`);
  assert.equal(missingAsset.status, 404);
});

test('preserves /api/health and authenticated API routing', async () => {
  const health = await fetch(`${apiOrigin}/api/health`);
  assert.equal(health.status, 200);
  assert.equal((await health.json()).status, 'ok');
  const profile = await fetch(`${apiOrigin}/api/auth/me`);
  assert.equal(profile.status, 401);
  assert.equal((await profile.json()).success, false);
});

test('missing API routes return JSON errors for all request methods', async () => {
  for (const route of ['/api', '/api/', '/api/does-not-exist', '/api/does-not-exist/nested']) {
    for (const method of ['GET', 'POST', 'PUT', 'DELETE']) {
      const response = await fetch(`${apiOrigin}${route}`, { method, headers: { Accept: 'text/html' } });
      assert.equal(response.status, 404);
      assert.match(response.headers.get('content-type'), /application\/json/);
      assert.deepEqual(await response.json(), { success: false, message: 'API route not found.' });
    }
  }
});

test('malformed API JSON returns a JSON error', async () => {
  const response = await fetch(`${apiOrigin}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{'
  });
  assert.equal(response.status, 400);
  assert.match(response.headers.get('content-type'), /application\/json/);
  assert.equal((await response.json()).success, false);
});

test('supports the production origin and Hostinger proxy headers', async () => {
  const response = await fetch(`${apiOrigin}/api/health`, {
    headers: { Origin: 'https://cricket.akbar.com', 'X-Forwarded-For': '192.0.2.10', 'X-Forwarded-Proto': 'https' }
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://cricket.akbar.com');
  assert.equal(response.headers.get('access-control-allow-credentials'), 'true');
  assert.equal(app.get('trust proxy'), 1);
});

test('production seeding performs no database operations even with administrator variables set', async () => {
  const findUser = mock.method(User, 'findOne', () => {
    throw new Error('Production must not seed accounts.');
  });
  try {
    await seedDatabase();
    assert.equal(findUser.mock.callCount(), 0);
    assert.equal(fs.existsSync(path.join(testDirectory, 'store.json')), false);
  } finally {
    findUser.mock.restore();
  }
});

test('production requires secrets and a MongoDB URI', () => {
  validateProductionConfig();
  for (const variable of ['MONGODB_URI', 'JWT_SECRET', 'FIELD_ENCRYPTION_KEY']) {
    const originalValue = process.env[variable];
    try {
      delete process.env[variable];
      assert.throws(validateProductionConfig, new RegExp(variable));
    } finally {
      process.env[variable] = originalValue;
    }
  }
});

test('MongoDB failure in production never activates the embedded database or exposes its URI', async () => {
  const connection = mock.method(mongoose, 'connect', async () => {
    throw new Error('mongodb+srv://private-user:private-password@example.test/club');
  });
  try {
    await assert.rejects(connectDB, error => {
      assert.match(error.message, /MongoDB connection failed/);
      assert.doesNotMatch(error.message, /private-user|private-password/);
      return true;
    });
    assert.equal(isEmbeddedActive(), false);
    assert.equal(fs.existsSync(path.join(testDirectory, 'store.json')), false);
  } finally {
    connection.mock.restore();
  }
});

test('Atlas connection failure never falls back to local data when embedded mode is disabled in development', async () => {
  const originalMode = process.env.NODE_ENV;
  const connection = mock.method(mongoose, 'connect', async () => {
    throw new Error('Connection unavailable.');
  });
  try {
    process.env.NODE_ENV = 'development';
    await assert.rejects(connectDB, /MongoDB connection failed/);
    assert.equal(isEmbeddedActive(), false);
    assert.equal(fs.existsSync(path.join(testDirectory, 'store.json')), false);
    const connectionOptions = connection.mock.calls[0].arguments[1];
    assert.equal(connectionOptions.serverSelectionTimeoutMS, 30000);
    assert.equal(connectionOptions.autoIndex, false);
    assert.equal(connectionOptions.autoCreate, false);
  } finally {
    process.env.NODE_ENV = originalMode;
    connection.mock.restore();
  }
});

test('applies an explicitly configured Atlas DNS resolver', async () => {
  const originalServers = process.env.MONGODB_DNS_SERVERS;
  const setServers = mock.method(dns, 'setServers', () => {});
  const connection = mock.method(mongoose, 'connect', async () => mongoose);
  try {
    process.env.MONGODB_DNS_SERVERS = '1.1.1.1, 8.8.8.8';
    await connectDB();
    assert.deepEqual(setServers.mock.calls[0].arguments[0], ['1.1.1.1', '8.8.8.8']);
  } finally {
    process.env.MONGODB_DNS_SERVERS = originalServers;
    setServers.mock.restore();
    connection.mock.restore();
  }
});

test('startup seeding can be disabled before the seed service runs', async () => {
  const originalMode = process.env.NODE_ENV;
  const originalSeedFlag = process.env.SEED_ON_STARTUP;
  const originalAdminPassword = process.env.ADMIN_PASSWORD;
  const connection = mock.method(mongoose, 'connect', async () => mongoose);
  const findUser = mock.method(User, 'findOne', () => {
    throw new Error('Startup must not seed accounts.');
  });
  let developmentServer;
  try {
    process.env.NODE_ENV = 'development';
    process.env.SEED_ON_STARTUP = 'false';
    delete process.env.ADMIN_PASSWORD;
    developmentServer = await app.startServer();
    await once(developmentServer, 'listening');
    assert.equal(findUser.mock.callCount(), 0);
  } finally {
    if (developmentServer) await new Promise(resolve => developmentServer.close(resolve));
    process.env.NODE_ENV = originalMode;
    process.env.SEED_ON_STARTUP = originalSeedFlag;
    process.env.ADMIN_PASSWORD = originalAdminPassword;
    connection.mock.restore();
    findUser.mock.restore();
  }
});

test('production startup uses PORT and connects without creating indexes or collections', async () => {
  const connection = mock.method(mongoose, 'connect', async () => mongoose);
  const listen = mock.method(app, 'listen');
  let productionServer;
  try {
    productionServer = await app.startServer();
    await once(productionServer, 'listening');
    assert.equal(listen.mock.calls[0].arguments[0], process.env.PORT);
    assert.equal(listen.mock.calls[0].arguments[1], '0.0.0.0');
    assert.ok(productionServer.address().port > 0);
    const connectionOptions = connection.mock.calls[0].arguments[1];
    assert.equal(connectionOptions.autoIndex, false);
    assert.equal(connectionOptions.autoCreate, false);
    const health = await fetch(`http://127.0.0.1:${productionServer.address().port}/api/health`);
    assert.equal(health.status, 200);
  } finally {
    if (productionServer) await new Promise(resolve => productionServer.close(resolve));
    connection.mock.restore();
    listen.mock.restore();
  }
});
