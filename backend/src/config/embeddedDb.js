/**
 * Akbar Cricket Club — Embedded Database Engine & File-Backed Store
 * Provides zero-dependency MongoDB-like operational resilience when local MongoDB daemon is not running.
 * Persists collections to disk in ./data/store.json.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.resolve(__dirname, '../../data');
const storeFilePath = path.join(dataDir, 'store.json');

let store = {
  users: [],
  players: [],
  sessions: [],
  matches: [],
  equipment: [],
  inspections: [],
  damageReports: [],
  tasks: []
};

let isEmbeddedActive = false;

function generateId() {
  return crypto.randomBytes(12).toString('hex');
}

function loadStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (fs.existsSync(storeFilePath)) {
    try {
      const raw = fs.readFileSync(storeFilePath, 'utf8');
      store = { ...store, ...JSON.parse(raw) };
    } catch (e) {
      console.warn('Failed to parse existing store.json, initializing fresh store.');
    }
  } else {
    saveStore();
  }
}

function saveStore() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(storeFilePath, JSON.stringify(store, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save store.json:', e.message);
  }
}

function matchesFilter(item, query = {}) {
  if (!query || Object.keys(query).length === 0) return true;

  for (const [key, val] of Object.entries(query)) {
    if (key === '$or' && Array.isArray(val)) {
      const orMatched = val.some(subQ => matchesFilter(item, subQ));
      if (!orMatched) return false;
      continue;
    }
    if (key === '$expr') {
      // Handle $lt inside $expr: e.g. { $lt: ['$quantity', '$minimumStock'] }
      if (val.$lt && val.$lt[0] === '$quantity' && val.$lt[1] === '$minimumStock') {
        if (!(item.quantity < item.minimumStock)) return false;
      }
      continue;
    }

    let itemVal = item[key];
    if (key === 'isActive' && itemVal === undefined) {
      itemVal = true;
    }

    if (val && typeof val === 'object' && !Array.isArray(val)) {
      if (val.$regex) {
        const regex = new RegExp(val.$regex, val.$options || '');
        if (!regex.test(String(itemVal || ''))) return false;
      } else if (val.$in) {
        if (!val.$in.includes(itemVal)) return false;
      } else if (val.$gte !== undefined || val.$lte !== undefined) {
        if (val.$gte !== undefined && itemVal < val.$gte) return false;
        if (val.$lte !== undefined && itemVal > val.$lte) return false;
      }
    } else if (key === 'rollCall.player') {
      const hasPlayer = (item.rollCall || []).some(rc => String(rc.player) === String(val) || (rc.player && String(rc.player._id) === String(val)));
      if (!hasPlayer) return false;
    } else {
      if (String(itemVal) !== String(val)) return false;
    }
  }
  return true;
}

class EmbeddedQuery {
  constructor(collectionName, query = {}) {
    this.collectionName = collectionName;
    this.query = query;
    this._sortField = null;
    this._sortDir = 1;
    this._limit = null;
    this._populateFields = [];
    this._selectFields = null;
  }

  sort(sortObj) {
    if (sortObj) {
      const [field, dir] = Object.entries(sortObj)[0];
      this._sortField = field;
      this._sortDir = dir;
    }
    return this;
  }

  limit(num) {
    this._limit = num;
    return this;
  }

  select(fieldsStr) {
    this._selectFields = fieldsStr;
    return this;
  }

  populate(field, selectStr) {
    this._populateFields.push({ field, select: selectStr });
    return this;
  }

  then(resolve, reject) {
    try {
      const results = this.exec();
      resolve(results);
    } catch (err) {
      reject(err);
    }
  }

  exec() {
    const coll = store[this.collectionName] || [];
    let items = coll.filter(item => matchesFilter(item, this.query));

    if (this._sortField) {
      items.sort((a, b) => {
        const valA = a[this._sortField] || '';
        const valB = b[this._sortField] || '';
        if (valA < valB) return -1 * this._sortDir;
        if (valA > valB) return 1 * this._sortDir;
        return 0;
      });
    }

    if (this._limit) {
      items = items.slice(0, this._limit);
    }

    // Clone items and attach model methods
    return items.map(raw => wrapDocument(this.collectionName, raw, this._populateFields));
  }
}

function wrapDocument(collectionName, raw, populateFields = []) {
  if (!raw) return null;
  const doc = JSON.parse(JSON.stringify(raw));
  doc._id = doc._id || doc.id;
  doc.id = doc._id;

  // Add specific model methods
  if (collectionName === 'users') {
    doc.toJSON = function () {
      const copy = { ...this };
      delete copy.password;
      return copy;
    };
  } else if (collectionName === 'players') {
    if (doc.isActive === undefined) doc.isActive = true;
    if (!doc.stats) {
      doc.stats = { matches: 0, runs: 0, ballsFaced: 0, fours: 0, sixes: 0, notOuts: 0, dismissals: 0, ballsBowled: 0, runsConceded: 0, wickets: 0, catches: 0, stumpings: 0, runOuts: 0, fieldingPoints: 0 };
    }
    doc.toPublicJSON = function (canViewConfidential = false) {
      const { decryptField } = require('./security');
      const copy = { ...this };
      if (canViewConfidential) {
        if (copy.nic) copy.nic = decryptField(copy.nic);
      } else {
        delete copy.phone;
        delete copy.workEmail;
        delete copy.epfNumber;
        delete copy.joiningDate;
        delete copy.nic;
        delete copy.worksite;
        delete copy.reportingManager;
        delete copy.emergencyContact;
      }
      return copy;
    };
  } else if (collectionName === 'sessions') {
    doc.calculateAttendance = function () {
      const entries = this.rollCall || [];
      let attended = 0, late = 0, absent = 0, excused = 0, notMarked = 0;
      for (const e of entries) {
        if (e.status === 'Attended') attended++;
        else if (e.status === 'Late') late++;
        else if (e.status === 'Absent') absent++;
        else if (e.status === 'Excused') excused++;
        else notMarked++;
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
  } else if (collectionName === 'equipment') {
    doc.isLowStock = function () {
      if (!this.countVerified) return false;
      return this.quantity < this.minimumStock;
    };
  }

  // Populate references
  for (const pop of populateFields) {
    if (pop.field === 'assignedPlayer' && doc.assignedPlayer) {
      const pid = doc.assignedPlayer._id || doc.assignedPlayer;
      const p = store.players.find(x => String(x._id) === String(pid));
      if (p) doc.assignedPlayer = { _id: p._id, fullName: p.fullName, company: p.company, cricketRole: p.cricketRole };
    } else if (pop.field === 'equipment' && doc.equipment) {
      const eid = doc.equipment._id || doc.equipment;
      const eq = store.equipment.find(x => String(x._id) === String(eid));
      if (eq) doc.equipment = { _id: eq._id, assetId: eq.assetId, name: eq.name, category: eq.category, condition: eq.condition, quantity: eq.quantity, countVerified: eq.countVerified };
    } else if (pop.field === 'rollCall.player' && Array.isArray(doc.rollCall)) {
      doc.rollCall.forEach(rc => {
        const pid = rc.player?._id || rc.player;
        const p = store.players.find(x => String(x._id) === String(pid));
        if (p) rc.player = { _id: p._id, fullName: p.fullName, company: p.company, cricketRole: p.cricketRole, jerseyNumber: p.jerseyNumber };
      });
    } else if (pop.field === 'playingXI.player' && Array.isArray(doc.playingXI)) {
      doc.playingXI.forEach(px => {
        const pid = px.player?._id || px.player;
        const p = store.players.find(x => String(x._id) === String(pid));
        if (p) px.player = { _id: p._id, fullName: p.fullName, company: p.company, cricketRole: p.cricketRole, jerseyNumber: p.jerseyNumber };
      });
    }
  }

  // Save method
  doc.save = async function () {
    const coll = store[collectionName];
    const idx = coll.findIndex(x => String(x._id) === String(this._id));
    const rawToSave = { ...this };
    delete rawToSave.toJSON;
    delete rawToSave.toPublicJSON;
    delete rawToSave.calculateAttendance;
    delete rawToSave.isLowStock;
    delete rawToSave.save;
    delete rawToSave.populate;

    // Handle nested unpopulate
    if (collectionName === 'sessions' && Array.isArray(rawToSave.rollCall)) {
      rawToSave.rollCall = rawToSave.rollCall.map(r => ({
        player: r.player?._id || r.player,
        status: r.status,
        note: r.note
      }));
    }

    if (idx >= 0) {
      coll[idx] = rawToSave;
    } else {
      coll.push(rawToSave);
    }
    saveStore();
    return this;
  };

  doc.populate = async function (field, select) {
    const wrapped = wrapDocument(collectionName, this, [{ field, select }]);
    Object.assign(this, wrapped);
    return this;
  };

  return doc;
}

function createModelInterface(collectionName) {
  return {
    find(query = {}) {
      return new EmbeddedQuery(collectionName, query);
    },
    async findOne(query = {}) {
      const items = store[collectionName] || [];
      const item = items.find(x => matchesFilter(x, query));
      return item ? wrapDocument(collectionName, item) : null;
    },
    async findById(id) {
      const items = store[collectionName] || [];
      const item = items.find(x => String(x._id) === String(id) || String(x.id) === String(id));
      return item ? wrapDocument(collectionName, item) : null;
    },
    async countDocuments(query = {}) {
      const items = store[collectionName] || [];
      return items.filter(x => matchesFilter(x, query)).length;
    },
    async create(data) {
      const doc = {
        _id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data
      };
      // Encrypt NIC if player
      if (collectionName === 'players' && doc.nic && !doc.nic.includes(':')) {
        const { encryptField } = require('./security');
        doc.nic = encryptField(doc.nic);
      }
      store[collectionName].push(doc);
      saveStore();
      return wrapDocument(collectionName, doc);
    },
    async insertMany(array) {
      const created = [];
      for (const item of array) {
        const doc = {
          _id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          ...item
        };
        store[collectionName].push(doc);
        created.push(wrapDocument(collectionName, doc));
      }
      saveStore();
      return created;
    },
    async findByIdAndDelete(id) {
      const coll = store[collectionName];
      const idx = coll.findIndex(x => String(x._id) === String(id));
      if (idx >= 0) {
        const [removed] = coll.splice(idx, 1);
        saveStore();
        return wrapDocument(collectionName, removed);
      }
      return null;
    }
  };
}

module.exports = {
  loadStore,
  saveStore,
  createModelInterface,
  isEmbeddedActive: () => isEmbeddedActive,
  setEmbeddedActive: (val) => { isEmbeddedActive = val; }
};
