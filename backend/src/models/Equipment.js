const mongoose = require('mongoose');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const equipmentSchema = new mongoose.Schema({
  assetId: { type: String, required: true, unique: true, trim: true, index: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Cricket Gear', 'First Aid', 'Shared Equipment', 'Consumables'], required: true },
  quantity: { type: Number, required: true, default: 0 },
  countVerified: { type: Boolean, default: false },
  unit: { type: String, default: 'units' },
  condition: { type: String, enum: ['Good', 'Fair', 'Inspect', 'Damaged', 'Retired', 'Lost'], default: 'Inspect' },
  minimumStock: { type: Number, default: 0 },
  expiryDate: { type: String, default: null },
  location: { type: String, default: 'Clubhouse Store' },
  assignedPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', default: null },
  supplier: { type: String, default: '' },
  purchaseDate: { type: String, default: '' },
  costLKR: { type: Number, default: 0 },
  photo: { type: String, default: null },
  notes: { type: String, default: '' },
  lastInspectedDate: { type: String, default: null }
}, {
  timestamps: true
});

equipmentSchema.methods.isLowStock = function () {
  if (!this.countVerified) return false;
  return this.quantity < this.minimumStock;
};

const mongooseModel = mongoose.model('Equipment', equipmentSchema);
const embeddedModel = createModelInterface('equipment');

module.exports = new Proxy(mongooseModel, {
  get(target, prop) {
    if (isEmbeddedActive() && embeddedModel[prop]) {
      return embeddedModel[prop];
    }
    return target[prop];
  }
});
