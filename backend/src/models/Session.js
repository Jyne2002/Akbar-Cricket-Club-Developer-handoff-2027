const mongoose = require('mongoose');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const rollCallEntrySchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  status: {
    type: String,
    enum: ['Not marked', 'Attended', 'Late', 'Absent', 'Excused'],
    default: 'Not marked'
  },
  note: {
    type: String,
    default: ''
  }
}, { _id: false });

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Practice', 'Match'],
    required: true,
    default: 'Practice'
  },
  date: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    default: null
  },
  rollCall: [rollCallEntrySchema]
}, {
  timestamps: true
});

sessionSchema.methods.calculateAttendance = function () {
  const entries = this.rollCall || [];
  if (entries.length === 0) {
    return { attended: 0, late: 0, absent: 0, excused: 0, notMarked: 0, total: 0, markedCount: 0, rate: null };
  }

  let attended = 0, late = 0, absent = 0, excused = 0, notMarked = 0;
  for (const entry of entries) {
    switch (entry.status) {
      case 'Attended': attended++; break;
      case 'Late': late++; break;
      case 'Absent': absent++; break;
      case 'Excused': excused++; break;
      default: notMarked++; break;
    }
  }

  const markedCount = attended + late + absent + excused;
  const rate = markedCount > 0 ? ((attended + late) / markedCount) * 100 : null;

  return {
    attended, late, absent, excused, notMarked,
    total: entries.length,
    markedCount,
    rate: rate !== null ? Math.round(rate * 10) / 10 : null
  };
};

const mongooseModel = mongoose.model('Session', sessionSchema);
const embeddedModel = createModelInterface('sessions');

module.exports = new Proxy(mongooseModel, {
  get(target, prop) {
    if (isEmbeddedActive() && embeddedModel[prop]) {
      return embeddedModel[prop];
    }
    return target[prop];
  }
});
