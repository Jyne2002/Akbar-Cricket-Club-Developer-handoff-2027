const assert = require('node:assert/strict');
const { test, before, after } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'acc-payments-'));
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
process.env.FIELD_ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');
process.env.EMBEDDED_DB_DIR = directory;
process.env.UPLOADS_DIR = path.join(directory, 'uploads');
const { loadStore, setEmbeddedActive } = require('../src/config/embeddedDb');
const Player = require('../src/models/Player');
const User = require('../src/models/User');
const Session = require('../src/models/Session');
const Match = require('../src/models/Match');
const PaymentAdjustment = require('../src/models/PaymentAdjustment');
const { calculatePlayerPayment, validateMonth } = require('../src/services/paymentService');
const { prepareMigration } = require('../scripts/migrateLocalStore');
const jwt = require('jsonwebtoken');
const app = require('../app');

const playerId = '111111111111111111111111';
const player = { _id: playerId, fullName: 'Test Player', company: 'Club' };
const session = (status, type = 'Practice') => ({ type, rollCall: [{ player: playerId, status }] });
const rule = overrides => ({ _id: crypto.randomBytes(12).toString('hex'), name: 'Rule', kind: 'Allowance', metric: 'monthly', amount: 1000, calculation: 'Fixed', threshold: 1, period: 'Month', minAttendanceRate: 75, minimumMarkedSessions: 1, requireCompleteAttendance: true, players: [], ...overrides });
const match = (runs, verified = true) => ({ date: '2027-01-10', opponent: 'Test XI', scoresVerified: verified, playerStats: [{ player: playerId, playerName: 'Test Player', runs, wickets: 3, catches: 1, stumpings: 1, runOuts: 1 }] });

test('monthly eligibility uses unrounded attendance, late attendance, and excludes unmarked entries', () => {
  const sessions = [session('Attended'), session('Late', 'Match'), session('Absent'), session('Excused'), session('Not marked')];
  let row = calculatePlayerPayment(player, sessions, [], [rule({ minAttendanceRate: 50 })], []);
  assert.equal(row.attendance.rate, 50);
  assert.equal(row.attendance.marked, 4);
  assert.equal(row.attendance.practiceAttended, 1);
  assert.equal(row.attendance.matchAttended, 1);
  assert.equal(row.allowances, 0);
  assert.match(row.excluded[0].reason, /unmarked/);
  row = calculatePlayerPayment(player, sessions, [], [rule({ minAttendanceRate: 50, requireCompleteAttendance: false })], []);
  assert.equal(row.allowances, 1000);
  row = calculatePlayerPayment(player, sessions, [], [rule({ minAttendanceRate: 50.01, requireCompleteAttendance: false })], []);
  assert.equal(row.allowances, 0);
  row = calculatePlayerPayment(player, [session('Not marked')], [], [rule({ minAttendanceRate: 0, requireCompleteAttendance: false })], []);
  assert.equal(row.attendance.rate, null);
  assert.equal(row.allowances, 0);
});

test('deductions charge only matching absence and late statuses and cap payable at zero', () => {
  const sessions = [session('Attended'), session('Late'), session('Absent'), session('Excused'), session('Not marked')];
  const rules = [rule({ kind: 'Deduction', metric: 'absent', calculation: 'Per unit', amount: 200 }), rule({ kind: 'Deduction', metric: 'late', calculation: 'Per unit', amount: 50 })];
  const row = calculatePlayerPayment(player, sessions, [], rules, []);
  assert.equal(row.deductions, 250);
  assert.equal(row.netPayable, 0);
  assert.equal(row.excessDeductions, 250);
  assert.equal(calculatePlayerPayment(player, sessions, [], rules, []).deductions, 250);
});

test('performance rewards use only verified scores and distinguish monthly and per-match milestones', () => {
  const matches = [match(60), match(110), match(500, false)];
  const reward = rule({ kind: 'Reward', metric: 'runs', threshold: 50, period: 'Match', amount: 500 });
  let row = calculatePlayerPayment(player, [], matches, [reward], []);
  assert.equal(row.rewards, 1000);
  assert.equal(row.performance.runs, 170);
  assert.equal(row.performance.fieldingPoints, 8);
  row = calculatePlayerPayment(player, [], matches, [{ ...reward, calculation: 'Per milestone' }], []);
  assert.equal(row.rewards, 1500);
  row = calculatePlayerPayment(player, [], matches, [{ ...reward, period: 'Month' }], []);
  assert.equal(row.rewards, 500);
  row = calculatePlayerPayment(player, [], [match(1)], [rule({ kind: 'Reward', metric: 'fieldingPoints', calculation: 'Per unit', amount: 0.1 })], []);
  assert.equal(row.rewards, 0.4);
});

test('player eligibility blocks automatic and manual allowances while preserving rewards and deductions', () => {
  const adjustments = ['Allowance', 'Deduction', 'Reward'].map(kind => ({ player: playerId, kind, name: kind, amount: 100 }));
  const row = calculatePlayerPayment({ ...player, allowanceEligible: false, allowanceEligibilityNote: 'Not approved' }, [session('Attended')], [], [rule({})], adjustments);
  assert.equal(row.eligibility, 'Ineligible');
  assert.equal(row.allowances, 0);
  assert.equal(row.deductions, 100);
  assert.equal(row.rewards, 100);
  assert.equal(row.excluded.length, 2);
  assert.equal(row.excluded[0].reason, 'Not approved');
  assert.equal(calculatePlayerPayment(player, [session('Attended')], [], [rule({ players: ['222222222222222222222222'] })], []).allowances, 0);
  assert.throws(() => validateMonth('2027-13'));
  assert.throws(() => validateMonth({ $gte: '' }));
});

let server, origin, tokens = {}, testPlayer;
before(async () => {
  loadStore(); setEmbeddedActive(true);
  for (const role of ['Administrator', 'Manager', 'Coach', 'Viewer']) {
    const user = await User.create({ name: role, role, email: `${role}@example.test`, password: 'unused-test-password-hash' });
    tokens[role] = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  }
  testPlayer = await Player.create({ ...player, fullName: '=SUM(1+2)', company: 'Tea, "Club"', cricketRole: 'Batsman', allowanceEligible: true });
  await Session.create({ title: 'Practice', date: '2027-01-04', ...session('Attended') });
  await Session.create({ title: 'Other month', date: '2027-02-04', ...session('Absent') });
  await Match.create({ ...match(60), date: '2027-01-20' });
  await Match.create({ ...match(999), date: '2027-02-20' });
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  if (server) await new Promise(resolve => server.close(resolve));
  fs.rmSync(directory, { recursive: true, force: true });
});
async function request(endpoint, method = 'GET', body, role = 'Administrator') {
  return fetch(`${origin}/api${endpoint}`, { method, headers: { 'Content-Type': 'application/json', ...(role ? { Authorization: `Bearer ${tokens[role]}` } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
}

test('payments API enforces read/write roles and validates rules, amounts, dates and identifiers', async () => {
  for (const role of ['Coach', 'Viewer', null]) {
    for (const [url, method, body] of [['/payments/monthly', 'GET'], ['/payments/monthly/csv', 'GET'], ['/payments/rules', 'GET'], ['/payments/rules', 'POST', {}], ['/payments/rules/111111111111111111111111', 'PUT', {}], ['/payments/adjustments', 'POST', {}], ['/payments/adjustments/111111111111111111111111', 'DELETE']]) {
      assert.equal((await request(url, method, body, role)).status, role ? 403 : 401);
    }
  }
  assert.equal((await request('/payments/monthly?month=2027-13')).status, 400);
  assert.equal((await request('/payments/rules/not-an-id', 'DELETE')).status, 400);
  for (const data of [{ amount: -1 }, { amount: 1.234 }, { metric: 'runs' }, { effectiveTo: '2026-01' }, { players: ['000000000000000000000000'] }, { requireCompleteAttendance: 'false' }, { minimumMarkedSessions: 1.5 }]) {
    assert.equal((await request('/payments/rules', 'POST', { ...rule({}), effectiveFrom: '2027-01', ...data })).status, 400);
  }
  assert.equal((await request('/payments/adjustments', 'POST', { player: playerId, month: '2027-01', kind: 'Reward', name: 'Bad amount', amount: 0.001 })).status, 400);
});

test('API stores editable player kits and eligibility without changing attendance or cricket fields', async () => {
  const kit = { printedName: 'TEST', shirtSize: 'L', trouserSize: '32', status: 'Issued', quantity: 2, issuedDate: '2027-01-03', notes: 'Two complete sets' };
  const endpoint = `/players/${playerId}`;
  let response = await request(endpoint, 'PUT', { jerseyKit: kit, allowanceEligible: false, allowanceEligibilityNote: 'Pending approval' }, 'Manager');
  assert.equal(response.status, 200);
  let data = await response.json();
  assert.deepEqual(data.player.jerseyKit, kit);
  assert.equal(data.player.cricketRole, 'Batsman');
  assert.equal(data.player.allowanceEligible, false);
  assert.equal((await request(endpoint, 'PUT', { jerseyKit: { quantity: -1 }, fullName: 'Should not change' })).status, 400);
  assert.equal((await request(endpoint, 'PUT', { jerseyKit: { ...kit, issuedDate: '2027-02-30' } })).status, 400);
  await request(endpoint, 'PUT', { jerseyKit: { ...kit, quantity: 10 }, allowanceEligible: true }, 'Coach');
  data = await (await request(endpoint)).json();
  assert.equal(data.player.jerseyKit.quantity, 2);
  assert.equal(data.player.allowanceEligible, false);
  const coach = await (await request(endpoint, 'GET', undefined, 'Coach')).json();
  assert.equal(coach.player.allowanceEligible, undefined);
  assert.equal(coach.player.allowanceEligibilityNote, undefined);
  assert.equal(coach.player.jerseyKit.shirtSize, 'L');
  assert.equal(data.attendanceHistory.length, 2);
  assert.equal(data.player.fullName, '=SUM(1+2)');
  await request(endpoint, 'PUT', { allowanceEligible: true });
  const created = await request('/players', 'POST', { fullName: 'Kit player', jerseyKit: kit, allowanceEligible: false });
  assert.equal(created.status, 201);
  assert.equal((await created.json()).player.jerseyKit.status, 'Issued');
});

test('monthly API isolates months and supports rule and adjustment CRUD, exports, and local persistence', async () => {
  const createRule = await request('/payments/rules', 'POST', { ...rule({ name: 'Monthly allowance' }), effectiveFrom: '2027-01', effectiveTo: '2027-01' }, 'Manager');
  assert.equal(createRule.status, 201);
  const savedRule = (await createRule.json()).rule;
  const reward = await request('/payments/rules', 'POST', { ...rule({ kind: 'Reward', metric: 'runs', name: 'Fifty reward', threshold: 50, amount: 500, period: 'Match' }), effectiveFrom: '2027-01', effectiveTo: '2027-01' });
  assert.equal(reward.status, 201);
  const getReport = async month => (await (await request(`/payments/monthly?month=${month}`)).json());
  const row = async () => (await getReport('2027-01')).rows.find(r => r.playerId === playerId);
  assert.equal((await row()).netPayable, 1500);
  assert.equal((await row()).performance.runs, 60);
  assert.equal((await row()).attendance.rate, 100);
  assert.equal((await getReport('2027-02')).summary.netPayable, 0);
  const update = { ...savedRule, amount: 1500 };
  assert.equal((await request(`/payments/rules/${savedRule._id}`, 'PUT', update)).status, 200);
  assert.equal((await row()).netPayable, 2000);
  const body = { player: playerId, month: '2027-01', kind: 'Deduction', name: 'Kit contribution', amount: 100.25, note: 'Approved contribution' };
  const createAdjustment = await request('/payments/adjustments', 'POST', body);
  assert.equal(createAdjustment.status, 201);
  const adjustment = (await createAdjustment.json()).adjustment;
  assert.equal((await row()).netPayable, 1899.75);
  assert.equal((await request(`/payments/adjustments/${adjustment._id}`, 'PUT', { ...body, amount: 50.1 })).status, 200);
  assert.equal((await row()).netPayable, 1949.9);
  const csvResponse = await request('/payments/monthly/csv?month=2027-01');
  assert.equal(csvResponse.status, 200);
  const csv = await csvResponse.text();
  assert.match(csv, /'=SUM\(1\+2\)/);
  assert.ok(csv.includes('"Tea, ""Club"""'));
  assert.ok(!csv.includes('"""Tea'));
  loadStore();
  assert.equal((await row()).netPayable, 1949.9);
  assert.equal((await PaymentAdjustment.find({ month: '2027-01' })).length, 1);
  const snapshot = JSON.parse(fs.readFileSync(path.join(directory, 'store.json'), 'utf8'));
  // Migration validates the new collections and references too.
  snapshot.users = [];
  const migrated = await prepareMigration(snapshot);
  assert.equal(migrated.documents.paymentRules.length, 2);
  assert.equal(String(migrated.documents.paymentAdjustments[0].player), playerId);
  assert.equal(migrated.documents.players.find(p => String(p._id) === playerId).jerseyKit.quantity, 2);
  assert.equal((await request(`/payments/adjustments/${adjustment._id}`, 'DELETE')).status, 200);
  assert.equal((await row()).netPayable, 2000);
  assert.equal((await request(`/payments/rules/${savedRule._id}`, 'DELETE')).status, 200);
  assert.equal((await row()).netPayable, 500);
  assert.equal((await request(`/payments/rules/${savedRule._id}`, 'DELETE')).status, 404);
});

test('player-specific attendance allowances and performance rewards apply only to their assigned players', async () => {
  const first = await Player.create({ fullName: 'First assigned player', company: 'Club', allowanceEligible: true });
  const second = await Player.create({ fullName: 'Second assigned player', company: 'Club', allowanceEligible: true });
  await Session.create({ title: 'Assigned players practice', type: 'Practice', date: '2027-03-05', rollCall: [first, second].map(p => ({ player: p._id, status: 'Attended' })) });
  await Match.create({ opponent: 'Test XI', date: '2027-03-10', scoresVerified: true, playerStats: [first, second].map(p => ({ player: p._id, playerName: p.fullName, runs: 60 })) });
  const add = async data => {
    const response = await request('/payments/rules', 'POST', { ...rule({}), effectiveFrom: '2027-03', effectiveTo: '2027-03', ...data }, 'Manager');
    assert.equal(response.status, 201);
    return (await response.json()).rule;
  };
  await add({ name: 'Shared allowance', amount: 100 });
  await add({ name: 'First player attendance allowance', players: [first._id], amount: 1000 });
  await add({ name: 'Second player attendance allowance', players: [second._id], amount: 750 });
  const rewardRule = await add({ name: 'First player fifty reward', kind: 'Reward', metric: 'runs', threshold: 50, period: 'Match', amount: 500, players: [first._id] });
  const report = await (await request('/payments/monthly?month=2027-03')).json();
  const firstRow = report.rows.find(r => r.playerId === first._id);
  const secondRow = report.rows.find(r => r.playerId === second._id);
  assert.equal(firstRow.allowances, 1100);
  assert.equal(firstRow.rewards, 500);
  assert.equal(firstRow.netPayable, 1600);
  assert.equal(secondRow.allowances, 850);
  assert.equal(secondRow.rewards, 0);
  assert.equal(secondRow.netPayable, 850);
  assert.equal((await request(`/payments/rules/${rewardRule._id}`, 'PUT', { ...rewardRule, players: [second._id] })).status, 200);
  const updated = await (await request('/payments/monthly?month=2027-03')).json();
  assert.equal(updated.rows.find(r => r.playerId === first._id).rewards, 0);
  assert.equal(updated.rows.find(r => r.playerId === second._id).rewards, 500);
});
