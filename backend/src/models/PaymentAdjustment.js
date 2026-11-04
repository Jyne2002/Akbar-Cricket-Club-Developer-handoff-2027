const mongoose = require('mongoose');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const schema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  month: { type: String, required: true, match: /^[1-9]\d{3}-(0[1-9]|1[0-2])$/ },
  kind: { type: String, enum: ['Allowance', 'Deduction', 'Reward'], required: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  amount: { type: Number, required: true, min: 0.01, max: 1000000000 },
  note: { type: String, default: '', maxlength: 1000 }
}, { timestamps: true });

const model = mongoose.model('PaymentAdjustment', schema);
const embedded = createModelInterface('paymentAdjustments');
module.exports = new Proxy(model, {
  get(target, prop) { return isEmbeddedActive() && embedded[prop] ? embedded[prop] : target[prop]; }
});
