const mongoose = require('mongoose');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const inspectionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  inspector: { type: String, required: true, trim: true },
  condition: { type: String, enum: ['Good', 'Fair', 'Inspect', 'Damaged', 'Retired', 'Lost'], required: true },
  notes: { type: String, default: '' },
  correctiveAction: { type: String, default: '' },
  photo: { type: String, default: null }
}, {
  timestamps: true
});

const mongooseModel = mongoose.model('Inspection', inspectionSchema);
const embeddedModel = createModelInterface('inspections');

module.exports = new Proxy(mongooseModel, {
  get(target, prop) {
    if (isEmbeddedActive() && embeddedModel[prop]) {
      return embeddedModel[prop];
    }
    return target[prop];
  }
});
