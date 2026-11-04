const Player = require('../models/Player');
const Session = require('../models/Session');
const Match = require('../models/Match');
const PaymentRule = require('../models/PaymentRule');
const PaymentAdjustment = require('../models/PaymentAdjustment');

const metrics = {
  Allowance: ['monthly', 'attended', 'practiceAttended', 'matchAttended'],
  Deduction: ['monthly', 'absent', 'late'],
  Reward: ['runs', 'wickets', 'catches', 'stumpings', 'runOuts', 'fieldingPoints', 'verifiedMatches']
};
const id = value => String(value?._id || value);
const cents = value => Math.round((Number(value) + Number.EPSILON) * 100);
const money = value => value / 100;
const currentMonth = () => {
  const parts = new Intl.DateTimeFormat('en', { timeZone: 'Asia/Colombo', year: 'numeric', month: '2-digit' }).formatToParts(new Date());
  return `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}`;
};
function validateMonth(month) {
  if (typeof month !== 'string' || !/^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(month)) throw new Error('Select a valid month (YYYY-MM).');
  return month;
}

function monthlyAttendance(player, sessions) {
  const counts = { attended: 0, late: 0, absent: 0, excused: 0, notMarked: 0, practiceAttended: 0, matchAttended: 0 };
  for (const session of sessions) {
    const entry = (session.rollCall || []).find(e => id(e.player) === id(player));
    // Only sessions with this player in the roll call apply to that player.
    if (!entry) continue;
    const status = { Attended: 'attended', Late: 'late', Absent: 'absent', Excused: 'excused' }[entry.status] || 'notMarked';
    counts[status]++;
    if (['Attended', 'Late'].includes(entry.status)) {
      if (session.type === 'Practice') counts.practiceAttended++;
      if (session.type === 'Match') counts.matchAttended++;
    }
  }
  const marked = counts.attended + counts.late + counts.absent + counts.excused;
  return { ...counts, marked, total: marked + counts.notMarked, attendedTotal: counts.attended + counts.late,
    rate: marked ? (counts.attended + counts.late) / marked * 100 : null };
}

function performance(stats) {
  const value = key => Math.max(0, Number(stats[key]) || 0);
  return { runs: value('runs'), wickets: value('wickets'), catches: value('catches'), stumpings: value('stumpings'), runOuts: value('runOuts'),
    fieldingPoints: value('catches') + 1.5 * value('stumpings') + 1.5 * value('runOuts'), verifiedMatches: 1 };
}

function calculatePlayerPayment(player, sessions, matches, rules, adjustments) {
  const attendance = monthlyAttendance(player, sessions);
  const performances = matches.filter(m => m.scoresVerified === true).flatMap(match => {
    const stat = (match.playerStats || []).find(s => id(s.player) === id(player));
    return stat ? [{ ...performance(stat), label: `${match.date} vs ${match.opponent}` }] : [];
  });
  const totals = Object.fromEntries(metrics.Reward.map(metric => [metric, performances.reduce((sum, p) => sum + p[metric], 0)]));
  const lines = [], excluded = [];
  let hasEligibleAllowance = false;
  const allowanceEligible = player.allowanceEligible !== false;
  for (const rule of rules) {
    if (rule.players?.length && !rule.players.some(p => id(p) === id(player))) continue;
    let reason = '';
    if (rule.kind === 'Allowance') {
      if (!allowanceEligible) reason = player.allowanceEligibilityNote || 'Player is not eligible for allowances.';
      else if (attendance.marked < rule.minimumMarkedSessions) reason = `Needs ${rule.minimumMarkedSessions} marked session(s).`;
      else if (rule.requireCompleteAttendance && attendance.notMarked > 0) reason = `${attendance.notMarked} session(s) still unmarked.`;
      else if (attendance.rate < rule.minAttendanceRate) reason = `Attendance is below ${rule.minAttendanceRate}%.`;
    }
    if (reason) { excluded.push({ name: rule.name, reason }); continue; }
    if (rule.kind === 'Allowance') hasEligibleAllowance = true;
    const attendanceValues = { monthly: 1, attended: attendance.attendedTotal, practiceAttended: attendance.practiceAttended, matchAttended: attendance.matchAttended, absent: attendance.absent, late: attendance.late };
    const values = rule.kind === 'Reward'
      ? (rule.period === 'Match' ? performances : [{ ...totals, label: 'Monthly verified totals' }])
      : [{ ...attendanceValues, label: 'Monthly attendance' }];
    for (const valuesRow of values) {
      const value = valuesRow[rule.metric] || 0;
      if (value < rule.threshold) continue;
      const units = rule.calculation === 'Per unit' ? value : rule.calculation === 'Per milestone' ? Math.floor(value / rule.threshold) : 1;
      const amountCents = Math.round(cents(rule.amount) * units);
      if (amountCents) lines.push({ name: rule.name, kind: rule.kind, source: 'Rule', ruleId: id(rule), basis: valuesRow.label, metric: rule.metric, value, units, amount: money(amountCents) });
    }
  }
  for (const adjustment of adjustments.filter(a => id(a.player) === id(player))) {
    if (adjustment.kind === 'Allowance' && !allowanceEligible) {
      excluded.push({ name: adjustment.name, reason: player.allowanceEligibilityNote || 'Player is not eligible for allowances.' });
    } else {
      lines.push({ name: adjustment.name, kind: adjustment.kind, source: 'Adjustment', adjustmentId: id(adjustment), basis: adjustment.note || 'Monthly adjustment', units: 1, amount: money(cents(adjustment.amount)) });
    }
  }
  const total = kind => lines.filter(l => l.kind === kind).reduce((sum, line) => sum + cents(line.amount), 0);
  const allowances = total('Allowance'), deductions = total('Deduction'), rewards = total('Reward');
  const balance = allowances + rewards - deductions;
  return { playerId: id(player), fullName: player.fullName, company: player.company, isActive: player.isActive !== false,
    allowanceEligible, allowanceEligibilityNote: player.allowanceEligibilityNote || '',
    eligibility: !allowanceEligible ? 'Ineligible' : hasEligibleAllowance || lines.some(l => l.kind === 'Allowance') ? 'Eligible' : excluded.length ? 'Not qualified' : 'No allowance rule',
    attendance, performance: totals, lines, excluded, allowances: money(allowances), deductions: money(deductions), rewards: money(rewards),
    netPayable: money(Math.max(0, balance)), excessDeductions: money(Math.max(0, -balance)) };
}

async function monthlyPayments(month) {
  validateMonth(month);
  const range = { $gte: `${month}-01`, $lte: `${month}-31` };
  const [players, sessions, matches, allRules, adjustments] = await Promise.all([
    Player.find({}).sort({ fullName: 1 }), Session.find({ date: range }), Match.find({ date: range, scoresVerified: true }),
    PaymentRule.find({}), PaymentAdjustment.find({ month })
  ]);
  const rules = allRules.filter(r => r.enabled && r.effectiveFrom <= month && (!r.effectiveTo || r.effectiveTo >= month));
  const rows = players.filter(p => p.isActive !== false || sessions.some(s => (s.rollCall || []).some(e => id(e.player) === id(p))) || matches.some(m => (m.playerStats || []).some(s => id(s.player) === id(p))) || adjustments.some(a => id(a.player) === id(p)))
    .map(p => calculatePlayerPayment(p, sessions, matches, rules, adjustments));
  const summary = Object.fromEntries(['allowances', 'deductions', 'rewards', 'netPayable', 'excessDeductions'].map(key => [key, money(rows.reduce((sum, row) => sum + cents(row[key]), 0))]));
  return { success: true, month, currency: 'LKR', rows, summary, ruleCount: rules.length, adjustments };
}

module.exports = { metrics, currentMonth, validateMonth, calculatePlayerPayment, monthlyPayments };
