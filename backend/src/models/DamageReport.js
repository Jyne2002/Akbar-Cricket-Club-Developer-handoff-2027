const mongoose = require('mongoose');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const followUpSchema = new mongoose.Schema({
  date: { type: String, required: true },
  note: { type: String, required: true },
  author: { type: String, required: true }
}, { timestamps: true });

const damageReportSchema = new mongoose.Schema({
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  date: { type: String, required: true },
  reporter: { type: String, required: true, trim: true },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Unsafe'], default: 'Medium', required: true },
  incidentDetails: { type: String, required: true },
  correctiveAction: { type: String, default: '' },
  photo: { type: String, default: null },
  status: { type: String, enum: ['Open', 'In progress', 'Resolved'], default: 'Open', required: true },
  followUps: [followUpSchema]
}, {
  timestamps: true
});

const mongooseModel = mongoose.model('DamageReport', damageReportSchema);
const embeddedModel = createModelInterface('damageReports');

module.exports = new Proxy(mongooseModel, {
  get(target, prop) {
    if (isEmbeddedActive() && embeddedModel[prop]) {
      return embeddedModel[prop];
    }
    return target[prop];
  }
});
