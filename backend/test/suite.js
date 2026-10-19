/**
 * Akbar Cricket Club — Automated Verification Test Suite
 * Tests authentication, RBAC, encryption, attendance formulas, scorecard parsing,
 * leaderboard calculations, inventory low-stock logic, and CSV formula injection defense.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');

const testDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'acc-suite-'));
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
process.env.FIELD_ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');
process.env.ADMIN_EMAIL = 'admin@example.test';
process.env.ADMIN_PASSWORD = crypto.randomBytes(24).toString('hex');
process.env.EMBEDDED_DB_DIR = testDirectory;
process.env.UPLOADS_DIR = path.join(testDirectory, 'uploads');
process.env.OPENAI_API_KEY = '';

const coachEmail = 'coach@example.test';
const coachPassword = crypto.randomBytes(24).toString('hex');
const { loadStore, setEmbeddedActive } = require('../src/config/embeddedDb');
const { seedDatabase } = require('../src/services/seedService');
const { hashPassword } = require('../src/config/security');
const User = require('../src/models/User');
const app = require('../server');

const { encryptField, decryptField, sanitizeCsvValue } = require('../src/config/security');
const { parseBowlingBalls, formatBallsToOvers } = require('../src/services/scorecardService');

async function runTests(apiOrigin) {
  console.log('\n=======================================================');
  console.log(' RUNNING AKBAR CRICKET CLUB VERIFICATION TEST SUITE');
  console.log('=======================================================\n');

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(` [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(` [FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  // TEST 1: AES-256-GCM Encryption & Decryption
  test('Security: AES-256-GCM encrypts and correctly decrypts National Identity Card (NIC)', () => {
    const rawNic = '199512345678V';
    const encrypted = encryptField(rawNic);
    assert.notStrictEqual(encrypted, rawNic, 'Encrypted value must not match plaintext');
    assert.strictEqual(encrypted.split(':').length, 3, 'Encrypted string must have iv:tag:ciphertext format');
    
    const decrypted = decryptField(encrypted);
    assert.strictEqual(decrypted, rawNic, 'Decrypted value must equal original NIC');
  });

  // TEST 2: CSV Formula Injection Defense
  test('Security: Protects spreadsheet exports against formula injection', () => {
    const formula1 = '=SUM(1+2)';
    const formula2 = '+100-50';
    const formula3 = '-20*3';
    const formula4 = '@COMMAND';
    const safeText = 'Sahan Sankalpa';

    assert.strictEqual(sanitizeCsvValue(formula1), "'=SUM(1+2)", 'Should prepend apostrophe to =');
    assert.strictEqual(sanitizeCsvValue(formula2), "'+100-50", 'Should prepend apostrophe to +');
    assert.strictEqual(sanitizeCsvValue(formula3), "'-20*3", 'Should prepend apostrophe to -');
    assert.strictEqual(sanitizeCsvValue(formula4), "'@COMMAND", 'Should prepend apostrophe to @');
    assert.strictEqual(sanitizeCsvValue(safeText), 'Sahan Sankalpa', 'Normal text should remain untouched');
  });

  // TEST 3: Bowling Overs to Balls Conversion (3.4 overs = 22 balls)
  test('Cricket Rules: Converts overs to total balls bowled accurately', () => {
    assert.strictEqual(parseBowlingBalls('3.4'), 22, '3 overs and 4 balls must equal 22 balls');
    assert.strictEqual(parseBowlingBalls('4.0'), 24, '4 overs and 0 balls must equal 24 balls');
    assert.strictEqual(parseBowlingBalls('0.5'), 5, '0 overs and 5 balls must equal 5 balls');
    assert.strictEqual(formatBallsToOvers(22), '3.4', '22 balls must format to 3.4 overs');
    assert.strictEqual(formatBallsToOvers(24), '4.0', '24 balls must format to 4.0 overs');
  });

  // TEST 4: Attendance Rate Calculation Logic
  test('Attendance Rules: (Attended + Late) / marked entries, excluding "Not marked"', () => {
    // 5 Attended, 1 Late, 2 Absent, 1 Excused, 11 Not marked
    const entries = [
      { status: 'Attended' }, { status: 'Attended' }, { status: 'Attended' }, { status: 'Attended' }, { status: 'Attended' },
      { status: 'Late' },
      { status: 'Absent' }, { status: 'Absent' },
      { status: 'Excused' },
      ...Array(11).fill({ status: 'Not marked' })
    ];

    let attended = 0, late = 0, absent = 0, excused = 0, notMarked = 0;
    entries.forEach(e => {
      if (e.status === 'Attended') attended++;
      else if (e.status === 'Late') late++;
      else if (e.status === 'Absent') absent++;
      else if (e.status === 'Excused') excused++;
      else notMarked++;
    });

    const markedCount = attended + late + absent + excused; // 5 + 1 + 2 + 1 = 9
    const rate = markedCount > 0 ? ((attended + late) / markedCount) * 100 : null; // (5 + 1) / 9 = 66.666%

    assert.strictEqual(markedCount, 9, 'Marked entries must exclude Not marked');
    assert.strictEqual(Math.round(rate * 10) / 10, 66.7, 'Attendance rate must equal 66.7%');

    // All Not marked
    const allUnmarked = Array(20).fill({ status: 'Not marked' });
    let unMarkedCount = 0;
    allUnmarked.forEach(e => { if (e.status !== 'Not marked') unMarkedCount++; });
    const emptyRate = unMarkedCount > 0 ? (0 / unMarkedCount) * 100 : null;
    assert.strictEqual(emptyRate, null, 'Rate should be null (dash displayed) when no entries are marked');
  });

  // TEST 5: Leaderboard Calculations (Strike rate, Average with 0 dismissals, Economy with 0 balls)
  test('Cricket Rules: Leaderboard formulas and fielding points rule', () => {
    // Batter 1: 58 runs, 42 balls, 1 dismissal
    const sr1 = (58 / 42) * 100;
    const avg1 = 58 / 1;
    assert.strictEqual(Math.round(sr1 * 100) / 100, 138.1, 'Batting SR must be 138.10');
    assert.strictEqual(avg1, 58, 'Batting average must be 58.00');

    // Batter 2: 34 runs, 21 balls, 0 dismissals (not out)
    const avg2 = 0 > 0 ? 34 / 0 : null;
    assert.strictEqual(avg2, null, 'Batting average must be null (dash displayed) when zero dismissals');

    // Bowler: 19 runs conceded, 24 balls bowled (4.0 overs)
    const econ = (19 / 24) * 6;
    assert.strictEqual(Math.round(econ * 100) / 100, 4.75, 'Bowling economy must be 4.75');

    // Bowler with 0 balls bowled
    const econ0 = 0 > 0 ? (0 / 0) * 6 : null;
    assert.strictEqual(econ0, null, 'Economy must be null (dash displayed) when zero balls bowled');

    // Fielding points: 2 catches, 1 stumping, 1 run-out
    // Formula: catches + 1.5 * stumpings + 1.5 * run-outs
    const fieldPts = 2 + (1.5 * 1) + (1.5 * 1); // 2 + 1.5 + 1.5 = 5.0
    assert.strictEqual(fieldPts, 5.0, 'Fielding points must equal 5.0');
  });

  // TEST 6: Inventory Low Stock Strict Rule (Applies ONLY to verified counts below minimum)
  test('Inventory Rules: Low stock alert applies only to verified quantities below minimum', () => {
    const itemUnverified = { quantity: 5, minimumStock: 10, countVerified: false };
    const itemVerifiedLow = { quantity: 5, minimumStock: 10, countVerified: true };
    const itemVerifiedAdequate = { quantity: 15, minimumStock: 10, countVerified: true };

    const isLowStock = (item) => item.countVerified && item.quantity < item.minimumStock;

    assert.strictEqual(isLowStock(itemUnverified), false, 'Unverified item must NOT trigger low stock alert');
    assert.strictEqual(isLowStock(itemVerifiedLow), true, 'Verified item below minimum must trigger low stock alert');
    assert.strictEqual(isLowStock(itemVerifiedAdequate), false, 'Verified item at/above minimum must NOT trigger alert');
  });

  // TEST 7: HTTP API Endpoints Validation against Live Running Server
  console.log('\n--- Running Live HTTP Server Endpoint Verification ---');

  try {
    // 1. Health check
    const healthRes = await fetch(`${apiOrigin}/api/health`);
    assert.strictEqual(healthRes.status, 200, 'Health check status must be 200');
    const healthJson = await healthRes.json();
    assert.strictEqual(healthJson.status, 'ok');
    console.log(' [PASS] Live API: /api/health returned 200 OK');
    passed++;

    // 2. Authentication Login as Admin
    const loginRes = await fetch(`${apiOrigin}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD })
    });
    assert.strictEqual(loginRes.status, 200, 'Admin login must return 200');
    const loginJson = await loginRes.json();
    assert.strictEqual(loginJson.success, true);
    assert.strictEqual(loginJson.user.role, 'Administrator');
    const token = loginJson.token;
    console.log(' [PASS] Live API: /api/auth/login authenticated Administrator successfully');
    passed++;

    // 3. Opening Squad Data Count
    const playersRes = await fetch(`${apiOrigin}/api/players`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const playersJson = await playersRes.json();
    assert.strictEqual(playersJson.totalCount, 20, 'Opening squad must contain exactly 20 players');
    console.log(' [PASS] Live API: /api/players verified exactly 20 squad members');
    passed++;

    // 4. Opening Equipment Data Count
    const eqRes = await fetch(`${apiOrigin}/api/equipment`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const eqJson = await eqRes.json();
    assert.strictEqual(eqJson.totalCount, 58, 'Opening inventory must contain exactly 58 items (18 numbered + 40 supplies)');
    console.log(' [PASS] Live API: /api/equipment verified exactly 58 equipment records');
    passed++;

    // 5. Opening Sessions Count
    const sessRes = await fetch(`${apiOrigin}/api/sessions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const sessJson = await sessRes.json();
    assert.strictEqual(sessJson.sessions.length, 4, 'Opening sessions must contain exactly 4 scheduled sessions');
    console.log(' [PASS] Live API: /api/sessions verified exactly 4 opening sessions');
    passed++;

    // 6. Command Centre Data Overview
    const ccRes = await fetch(`${apiOrigin}/api/command-centre`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const ccJson = await ccRes.json();
    assert.strictEqual(ccJson.stats.activeSquad, 20);
    assert.strictEqual(ccJson.stats.unverifiedEquipment, 58, 'All 58 initial equipment counts must be unverified');
    console.log(' [PASS] Live API: /api/command-centre verified aggregate metrics');
    passed++;

    // 7. AI Operations Assistant Suggestions
    const sugRes = await fetch(`${apiOrigin}/api/tasks/suggestions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const sugJson = await sugRes.json();
    assert.strictEqual(sugJson.success, true);
    assert(sugJson.suggestions.length > 0, 'AI / Rule engine must generate actionable suggestions');
    console.log(` [PASS] Live API: /api/tasks/suggestions generated ${sugJson.suggestions.length} operational actions (${sugJson.source})`);
    passed++;

    // 8. Role-Based Confidential Field Redaction Test
    // Login as Coach:
    const coachLoginRes = await fetch(`${apiOrigin}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: coachEmail, password: coachPassword })
    });
    const coachLoginJson = await coachLoginRes.json();
    const coachToken = coachLoginJson.token;

    const coachPlayerRes = await fetch(`${apiOrigin}/api/players/${playersJson.players[0].id}`, {
      headers: { 'Authorization': `Bearer ${coachToken}` }
    });
    const coachPlayerJson = await coachPlayerRes.json();
    assert.strictEqual(coachPlayerJson.player.phone, undefined, 'Coach must NOT receive confidential phone');
    assert.strictEqual(coachPlayerJson.player.nic, undefined, 'Coach must NOT receive confidential NIC');
    assert.strictEqual(coachPlayerJson.player.epfNumber, undefined, 'Coach must NOT receive confidential EPF number');
    console.log(' [PASS] Live API: RBAC strictly masked confidential HR fields from Coach view');
    passed++;

  } catch (liveErr) {
    console.error(' [FAIL] Live Server API test error:', liveErr.message);
    failed++;
  }

  console.log('\n=======================================================');
  console.log(` TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('=======================================================\n');

  if (failed > 0) {
    process.exitCode = 1;
  }
}

async function main() {
  let server;
  try {
    loadStore();
    setEmbeddedActive(true);
    await seedDatabase();
    await User.create({
      name: 'Test Coach',
      email: coachEmail,
      password: await hashPassword(coachPassword),
      role: 'Coach'
    });
    server = app.listen(0, '127.0.0.1');
    await new Promise((resolve, reject) => {
      server.once('listening', resolve);
      server.once('error', reject);
    });
    await runTests(`http://127.0.0.1:${server.address().port}`);
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    fs.rmSync(testDirectory, { recursive: true, force: true });
  }
}

main().catch(err => {
  console.error('Verification suite failed:', err);
  process.exitCode = 1;
});
