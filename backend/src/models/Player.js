const mongoose = require('mongoose');
const { encryptField, decryptField } = require('../config/security');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const playerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  company: {
    type: String,
    required: true,
    trim: true,
    default: 'Other'
  },
  cricketRole: {
    type: String,
    enum: [
      'Not set',
      'Batsman',
      'Bowler',
      'Batting allrounder',
      'Bowling allrounder',
      'Wicketkeeper batsman'
    ],
    default: 'Not set'
  },
  battingHand: {
    type: String,
    enum: ['Not set', 'Right hand', 'Left hand'],
    default: 'Not set'
  },
  bowlingArm: {
    type: String,
    enum: ['Not set', 'Right arm', 'Left arm'],
    default: 'Not set'
  },
  bowlingStyle: {
    type: String,
    default: 'Not set'
  },
  jerseyNumber: {
    type: Number,
    default: null
  },
  photo: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // CONFIDENTIAL FIELDS (Admin & Manager Only)
  phone: { type: String, default: '' },
  workEmail: { type: String, default: '', trim: true, lowercase: true },
  epfNumber: { type: String, default: '' },
  joiningDate: { type: String, default: '' },
  nic: { type: String, default: '' },
  worksite: { type: String, default: '' },
  reportingManager: { type: String, default: '' },
  emergencyContact: {
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    relationship: { type: String, default: '' }
  },

  // VERIFIED OFFICIAL STATS
  stats: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    notOuts: { type: Number, default: 0 },
    dismissals: { type: Number, default: 0 },
    ballsBowled: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    catches: { type: Number, default: 0 },
    stumpings: { type: Number, default: 0 },
    runOuts: { type: Number, default: 0 },
    fieldingPoints: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

playerSchema.pre('save', function (next) {
  if (this.isModified('nic') && this.nic && !this.nic.includes(':')) {
    this.nic = encryptField(this.nic);
  }
  next();
});

playerSchema.methods.toPublicJSON = function (canViewConfidential = false) {
  const obj = this.toObject();
  if (canViewConfidential) {
    if (obj.nic) {
      obj.nic = decryptField(obj.nic);
    }
  } else {
    delete obj.phone;
    delete obj.workEmail;
    delete obj.epfNumber;
    delete obj.joiningDate;
    delete obj.nic;
    delete obj.worksite;
    delete obj.reportingManager;
    delete obj.emergencyContact;
  }
  return obj;
};

const mongooseModel = mongoose.model('Player', playerSchema);
const embeddedModel = createModelInterface('players');

module.exports = new Proxy(mongooseModel, {
  get(target, prop) {
    if (isEmbeddedActive() && embeddedModel[prop]) {
      return embeddedModel[prop];
    }
    return target[prop];
  }
});
