const mongoose = require('mongoose');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  details: { type: String, default: '' },
  owner: { type: String, default: 'Unassigned', trim: true },
  dueDate: { type: String, default: '' },
  category: {
    type: String,
    enum: ['Operations', 'Match Prep', 'Inventory', 'Medical/Safety', 'Administration', 'General'],
    default: 'Operations'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['To do', 'In progress', 'Blocked', 'Done'],
    default: 'To do'
  },
  source: {
    type: String,
    enum: ['Manual', 'Rule Engine', 'AI Assistant'],
    default: 'Manual'
  }
}, {
  timestamps: true
});

const mongooseModel = mongoose.model('Task', taskSchema);
const embeddedModel = createModelInterface('tasks');

module.exports = new Proxy(mongooseModel, {
  get(target, prop) {
    if (isEmbeddedActive() && embeddedModel[prop]) {
      return embeddedModel[prop];
    }
    return target[prop];
  }
});
