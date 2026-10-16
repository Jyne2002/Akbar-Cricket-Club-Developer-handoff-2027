const mongoose = require('mongoose');
const { isEmbeddedActive, createModelInterface } = require('../config/embeddedDb');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Administrator', 'Manager', 'Coach', 'Viewer'],
    default: 'Viewer',
    required: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const mongooseModel = mongoose.model('User', userSchema);
const embeddedModel = createModelInterface('users');

module.exports = new Proxy(mongooseModel, {
  get(target, prop) {
    if (isEmbeddedActive() && embeddedModel[prop]) {
      return embeddedModel[prop];
    }
    return target[prop];
  }
});
