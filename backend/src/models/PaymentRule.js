const mongoose = require('mongoose');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const paymentRuleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  kind: { type: String, enum: ['Allowance', 'Deduction', 'Reward'], required: true },
  metric: { type: String, enum: ['monthly', 'attended', 'practiceAttended', 'matchAttended', 'absent', 'late', 'runs', 'wickets', 'catches', 'stumpings', 'runOuts', 'fieldingPoints', 'verifiedMatches'], required: true },
  calculation: { type: String, enum: ['Fixed', 'Per unit', 'Per milestone'], default: 'Fixed' },
  period: { type: String, enum: ['Month', 'Match'], default: 'Month' },
  amount: { type: Number, required: true, min: 0, max: 1000000000 },
  threshold: { type: Number, default: 1, min: 0.5, max: 1000000000 },
  minAttendanceRate: { type: Number, default: 75, min: 0, max: 100 },
  minimumMarkedSessions: { type: Number, default: 1, min: 1, max: 10000, validate: Number.isInteger },
  requireCompleteAttendance: { type: Boolean, default: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  effectiveFrom: { type: String, required: true, match: /^[1-9]\d{3}-(0[1-9]|1[0-2])$/ },
  effectiveTo: { type: String, default: '', validate: value => value === '' || /^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(value) },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

const model = mongoose.model('PaymentRule', paymentRuleSchema);
const embedded = createModelInterface('paymentRules');
module.exports = new Proxy(model, {
  get(target, prop) { return isEmbeddedActive() && embedded[prop] ? embedded[prop] : target[prop]; }
});
