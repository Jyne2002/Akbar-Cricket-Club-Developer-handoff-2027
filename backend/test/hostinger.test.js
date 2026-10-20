const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { fork } = require('node:child_process');
const { once } = require('node:events');
const { test } = require('node:test');

test('backend initializes MongoDB for direct startup and hosting module loading without the frontend directory', { timeout: 60000 }, async () => {
  const testDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'acc-backend-only-'));
  const backendDirectory = path.resolve(__dirname, '..');
  const isolatedBackend = path.join(testDirectory, 'backend');
  const includedEntries = new Set(['server.js', 'app.js', 'package.json', 'package-lock.json', 'src', 'node_modules', 'hostinger-static']);
  let child;
  let output = '';

  try {
    fs.cpSync(backendDirectory, isolatedBackend, {
      recursive: true,
      filter(sourcePath) {
        const relativePath = path.relative(backendDirectory, sourcePath);
        return !relativePath || includedEntries.has(relativePath.split(path.sep)[0]);
      }
    });
    assert.equal(fs.existsSync(path.join(testDirectory, 'frontend')), false);
    assert.equal(fs.existsSync(path.join(isolatedBackend, '.env')), false);
    assert.equal(fs.existsSync(path.join(isolatedBackend, 'data')), false);

    const preloadPath = path.join(testDirectory, 'database-stub.cjs');
    fs.writeFileSync(preloadPath, [
      "const path = require('node:path');",
      "const mongoose = require(path.join(process.cwd(), 'node_modules', 'mongoose'));",
      'let databaseInitialized = false;',
      'mongoose.connect = async () => {',
      '  await new Promise(resolve => setTimeout(resolve, 80));',
      '  databaseInitialized = true;',
      '  return mongoose;',
      '};',
      "const User = require(path.join(process.cwd(), 'src', 'models', 'User'));",
      'User.findOne = async () => {',
      "  if (!databaseInitialized) throw new Error('Database initialization was skipped.');",
      '  return null;',
      '};',
      "const http = require('node:http');",
      'const listen = http.Server.prototype.listen;',
      'http.Server.prototype.listen = function (...args) {',
      "  this.once('listening', () => process.send({ port: this.address().port }));",
      '  return listen.apply(this, args);',
      '};'
    ].join('\n'));

    fs.writeFileSync(path.join(isolatedBackend, 'hosting-runner.cjs'), "const app = require('./server.js');\napp.listen(process.env.PORT, '0.0.0.0');\n");

    for (const entry of ['server.js', 'hosting-runner.cjs']) {
      output = '';
      child = fork(path.join(isolatedBackend, entry), [], {
        cwd: isolatedBackend,
        execArgv: ['--require', preloadPath],
        stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
        env: {
          ...process.env,
          NODE_ENV: 'production',
          PORT: '0',
          APP_ORIGIN: 'https://cricket.akbar.com',
          MONGODB_URI: 'mongodb://127.0.0.1:1/acc_backend_only_test',
          JWT_SECRET: crypto.randomBytes(32).toString('hex'),
          FIELD_ENCRYPTION_KEY: crypto.randomBytes(32).toString('hex'),
          ALLOW_EMBEDDED_DB: 'false',
          SEED_ON_STARTUP: 'false',
          MONGODB_DNS_SERVERS: '',
          UPLOADS_DIR: path.join(testDirectory, 'uploads'),
          EMBEDDED_DB_DIR: path.join(testDirectory, 'data')
        }
      });
      child.stdout.on('data', chunk => { output += chunk; });
      child.stderr.on('data', chunk => { output += chunk; });

      const port = await new Promise((resolve, reject) => {
        child.once('message', message => resolve(message.port));
        child.once('error', reject);
        child.once('exit', code => reject(new Error(`Isolated backend exited with code ${code}: ${output}`)));
      });
      const origin = `http://127.0.0.1:${port}`;
      const expectedHtml = fs.readFileSync(path.join(isolatedBackend, 'hostinger-static', 'index.html'), 'utf8');
      for (const route of ['/', '/players', '/players/nested/profile']) {
        const response = await fetch(`${origin}${route}`, { headers: { Accept: 'text/html' } });
        assert.equal(response.status, 200);
        assert.equal(await response.text(), expectedHtml);
      }

      const assetPaths = [...expectedHtml.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(match => match[1]);
      assert.ok(assetPaths.some(assetPath => assetPath.endsWith('.js')));
      assert.ok(assetPaths.some(assetPath => assetPath.endsWith('.css')));
      for (const assetPath of assetPaths) {
        const response = await fetch(`${origin}${assetPath}`);
        assert.equal(response.status, 200);
        assert.doesNotMatch(response.headers.get('content-type'), /text\/html/);
        const expected = fs.readFileSync(path.join(isolatedBackend, 'hostinger-static', assetPath.slice(1)));
        assert.deepEqual(Buffer.from(await response.arrayBuffer()), expected);
        if (assetPath.endsWith('.js')) {
          assert.doesNotMatch(expected.toString('utf8'), /<input\b[^>]*\btype=["']password["'][^>]*\bvalue=["'][^"']+["']/i);
        }
      }

      const health = await fetch(`${origin}/api/health`);
      assert.equal(health.status, 200);
      assert.equal((await health.json()).status, 'ok');
      const missingApi = await fetch(`${origin}/api/does-not-exist`, { headers: { Accept: 'text/html' } });
      assert.equal(missingApi.status, 404);
      assert.equal((await missingApi.json()).success, false);
      const profile = await fetch(`${origin}/api/auth/me`);
      assert.equal(profile.status, 401);
      assert.equal((await profile.json()).success, false);
      const invalidLogin = await fetch(`${origin}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'startup-check@example.invalid', password: crypto.randomBytes(24).toString('hex') })
      });
      assert.equal(invalidLogin.status, 401, `Database initialization failed for ${entry}.`);
      assert.equal((await invalidLogin.json()).success, false);
      const exited = once(child, 'exit');
      child.kill();
      await exited;
      child = null;
    }
  } finally {
    if (child && child.exitCode === null && child.signalCode === null) {
      const exited = once(child, 'exit');
      child.kill();
      await exited;
    }
    if (path.dirname(testDirectory) !== path.resolve(os.tmpdir()) || !path.basename(testDirectory).startsWith('acc-backend-only-')) {
      throw new Error('Refusing to remove an unexpected test directory.');
    }
    fs.rmSync(testDirectory, { recursive: true, force: true });
  }
});
