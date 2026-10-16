const mongoose = require('mongoose');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const playingXIEntrySchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  status: {
    type: String,
    enum: ['Playing XI', 'Reserve', 'Unavailable'],
    default: 'Unavailable'
  }
}, { _id: false });

const scorecardAttachmentSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: { type: String, default: 'Admin' }
}, { _id: true });

const matchPlayerStatSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  playerName: { type: String, required: true },
  batted: { type: Boolean, default: false },
  runs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  notOut: { type: Boolean, default: false },
  ballsBowled: { type: Number, default: 0 },
  runsConceded: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  catches: { type: Number, default: 0 },
  stumpings: { type: Number, default: 0 },
  runOuts: { type: Number, default: 0 }
}, { _id: false });

const matchSchema = new mongoose.Schema({
  opponent: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  venue: { type: String, default: '' },
  competition: { type: String, default: 'MCA League 2026/27' },
  season: { type: String, default: '2026-2027' },
  format: { type: String, enum: ['T20', 'T10', '50 Overs', 'Other'], default: 'T20' },
  result: { type: String, enum: ['Pending', 'Win', 'Loss', 'Tie', 'No result'], default: 'Pending' },
  ourScore: { type: String, default: '' },
  oppositionScore: { type: String, default: '' },
  notes: { type: String, default: '' },
  linkedSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', default: null },
  playingXI: [playingXIEntrySchema],
  scorecards: [scorecardAttachmentSchema],
  playerStats: [matchPlayerStatSchema],
  scoresVerified: { type: Boolean, default: false },
  scoresVerifiedAt: { type: Date, default: null }
}, {
  timestamps: true
});

const mongooseModel = mongoose.model('Match', matchSchema);
const embeddedModel = createModelInterface('matches');

module.exports = new Proxy(mongooseModel, {
  get(target, prop) {
    if (isEmbeddedActive() && embeddedModel[prop]) {
      return embeddedModel[prop];
    }
    return target[prop];
  }
});
