const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const PaymentRule = require('../models/PaymentRule');
const PaymentAdjustment = require('../models/PaymentAdjustment');
const { authenticate, requireRoles } = require('../middleware/auth');
const { sanitizeCsvValue } = require('../config/security');
const { metrics, currentMonth, validateMonth, monthlyPayments } = require('../services/paymentService');

router.use(authenticate, requireRoles('Administrator', 'Manager'));
const idPattern = /^[a-f\d]{24}$/i;
router.param('id', (req, res, next, value) => idPattern.test(value) ? next() : res.status(400).json({ success: false, message: 'Invalid record identifier.' }));
const handle = fn => async (req, res) => {
  try { await fn(req, res); }
  catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError' || err.status === 400) return res.status(400).json({ success: false, message: err.message });
    console.error('Payments error:', err);
    return res.status(500).json({ success: false, message: 'Unable to process player payments.' });
  }
};
function invalid(message) { const error = new Error(message); error.status = 400; throw error; }
function monthFor(req) {
  try { return validateMonth(req.query.month === undefined ? currentMonth() : req.query.month); }
  catch (err) { invalid(err.message); }
}

router.get('/monthly', handle(async (req, res) => res.json(await monthlyPayments(monthFor(req)))));
router.get('/monthly/csv', handle(async (req, res) => {
  const report = await monthlyPayments(monthFor(req));
  const headers = ['Month', 'Player', 'Company', 'Allowance eligibility', 'Attendance %', 'Attended', 'Late', 'Absent', 'Excused', 'Unmarked', 'Allowances (LKR)', 'Deductions (LKR)', 'Rewards (LKR)', 'Net payable (LKR)', 'Excess deductions (LKR)'];
  const rows = report.rows.map(r => [report.month, r.fullName, r.company, r.eligibility, r.attendance.rate === null ? '' : r.attendance.rate.toFixed(1), r.attendance.attended, r.attendance.late, r.attendance.absent, r.attendance.excused, r.attendance.notMarked, r.allowances, r.deductions, r.rewards, r.netPayable, r.excessDeductions]);
  const cell = value => String(sanitizeCsvValue(value));
  res.type('text/csv').attachment(`acc_player_payments_${report.month}.csv`).send('\uFEFF' + [headers, ...rows].map(row => row.map(cell).join(',')).join('\r\n'));
}));
router.get('/rules', handle(async (req, res) => res.json({ success: true, rules: await PaymentRule.find({}).sort({ name: 1 }) })));

async function ruleData(body) {
  const fields = ['name', 'kind', 'metric', 'calculation', 'period', 'amount', 'threshold', 'minAttendanceRate', 'minimumMarkedSessions', 'requireCompleteAttendance', 'players', 'effectiveFrom', 'effectiveTo', 'enabled'];
  const data = Object.fromEntries(fields.filter(k => body[k] !== undefined).map(k => [k, body[k]]));
  for (const key of ['amount', 'threshold', 'minAttendanceRate', 'minimumMarkedSessions']) if (data[key] !== undefined && (typeof data[key] !== 'number' || !Number.isFinite(data[key]))) invalid(`Enter a valid ${key}.`);
  if (data.amount !== undefined && Math.abs(Math.round(data.amount * 100) - data.amount * 100) > 0.00001) invalid('Enter an amount with up to two decimal places.');
  for (const key of ['enabled', 'requireCompleteAttendance']) if (data[key] !== undefined && typeof data[key] !== 'boolean') invalid(`Invalid ${key}.`);
  if (!metrics[data.kind]?.includes(data.metric)) invalid('Select a valid metric for this rule type.');
  if (data.period === 'Match' && data.kind !== 'Reward') invalid('Only performance rewards can be calculated per verified match.');
  if (data.metric === 'monthly' && ((data.calculation || 'Fixed') !== 'Fixed' || (data.threshold ?? 1) !== 1)) invalid('Monthly rules must use a fixed amount and a threshold of 1.');
  if (data.effectiveTo && data.effectiveTo < data.effectiveFrom) invalid('End month must be on or after the start month.');
  if (data.players !== undefined && (!Array.isArray(data.players) || data.players.some(p => typeof p !== 'string' || !idPattern.test(p)))) invalid('Select valid players.');
  const document = new PaymentRule(data);
  await document.validate();
  for (const playerId of data.players || []) if (!await Player.findById(playerId)) invalid('A selected player no longer exists.');
  const validated = document.toObject();
  delete validated._id;
  return validated;
}
router.post('/rules', handle(async (req, res) => res.status(201).json({ success: true, rule: await PaymentRule.create(await ruleData(req.body)) })));
router.put('/rules/:id', handle(async (req, res) => {
  const rule = await PaymentRule.findById(req.params.id);
  if (!rule) return res.status(404).json({ success: false, message: 'Rule not found.' });
  Object.assign(rule, await ruleData(req.body));
  await rule.save();
  res.json({ success: true, rule });
}));
router.delete('/rules/:id', handle(async (req, res) => {
  const removed = await PaymentRule.findByIdAndDelete(req.params.id);
  res.status(removed ? 200 : 404).json({ success: !!removed, message: removed ? 'Rule deleted.' : 'Rule not found.' });
}));

async function adjustmentData(body) {
  const fields = ['player', 'month', 'name', 'kind', 'amount', 'note'];
  const data = Object.fromEntries(fields.filter(k => body[k] !== undefined).map(k => [k, body[k]]));
  if (typeof data.player !== 'string' || !idPattern.test(data.player) || !await Player.findById(data.player)) invalid('Select an existing player.');
  if (typeof data.amount !== 'number' || !Number.isFinite(data.amount) || Math.abs(Math.round(data.amount * 100) - data.amount * 100) > 0.00001) invalid('Enter an amount with up to two decimal places.');
  const document = new PaymentAdjustment(data);
  await document.validate();
  const validated = document.toObject();
  delete validated._id;
  return validated;
}
router.post('/adjustments', handle(async (req, res) => res.status(201).json({ success: true, adjustment: await PaymentAdjustment.create(await adjustmentData(req.body)) })));
router.put('/adjustments/:id', handle(async (req, res) => {
  const adjustment = await PaymentAdjustment.findById(req.params.id);
  if (!adjustment) return res.status(404).json({ success: false, message: 'Adjustment not found.' });
  Object.assign(adjustment, await adjustmentData(req.body));
  await adjustment.save();
  res.json({ success: true, adjustment });
}));
router.delete('/adjustments/:id', handle(async (req, res) => {
  const removed = await PaymentAdjustment.findByIdAndDelete(req.params.id);
  res.status(removed ? 200 : 404).json({ success: !!removed, message: removed ? 'Adjustment deleted.' : 'Adjustment not found.' });
}));

module.exports = router;
