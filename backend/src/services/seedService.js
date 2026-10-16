const User = require('../models/User');
const Player = require('../models/Player');
const Equipment = require('../models/Equipment');
const Session = require('../models/Session');
const { hashPassword } = require('../config/security');

const INITIAL_PLAYERS = [
  // Akbar Brothers (Pvt) Ltd
  { fullName: 'Sahan Sankalpa', company: 'Akbar Brothers (Pvt) Ltd', jerseyNumber: 7, cricketRole: 'Batsman', battingHand: 'Right hand' },
  { fullName: 'Salman Akbarally', company: 'Akbar Brothers (Pvt) Ltd', jerseyNumber: 10, cricketRole: 'Batting allrounder', battingHand: 'Right hand' },
  { fullName: 'Vikum Tharusha Ramanayake', company: 'Akbar Brothers (Pvt) Ltd', jerseyNumber: 18, cricketRole: 'Bowler', battingHand: 'Right hand' },
  { fullName: 'Chathura Devinda Silva', company: 'Akbar Brothers (Pvt) Ltd', jerseyNumber: 23, cricketRole: 'Batsman', battingHand: 'Right hand' },
  { fullName: 'Sithika Sanketh Peiris', company: 'Akbar Brothers (Pvt) Ltd', jerseyNumber: 27, cricketRole: 'Bowling allrounder', battingHand: 'Left hand' },
  { fullName: 'Mopun Madhawa', company: 'Akbar Brothers (Pvt) Ltd', jerseyNumber: 33, cricketRole: 'Bowler', battingHand: 'Right hand' },
  { fullName: 'S.Nalankan', company: 'Akbar Brothers (Pvt) Ltd', jerseyNumber: 45, cricketRole: 'Batsman', battingHand: 'Right hand' },

  // Quick Tea (Pvt) Ltd
  { fullName: 'Kusal Athapaththu', company: 'Quick Tea (Pvt) Ltd', jerseyNumber: 8, cricketRole: 'Wicketkeeper batsman', battingHand: 'Left hand' },
  { fullName: 'Ramakrishnan Urendran', company: 'Quick Tea (Pvt) Ltd', jerseyNumber: 14, cricketRole: 'Bowler', battingHand: 'Right hand' },
  { fullName: 'Tharanga Kumara', company: 'Quick Tea (Pvt) Ltd', jerseyNumber: 19, cricketRole: 'Batting allrounder', battingHand: 'Right hand' },
  { fullName: 'Pasindu Lakshitha Botheju', company: 'Quick Tea (Pvt) Ltd', jerseyNumber: 22, cricketRole: 'Batsman', battingHand: 'Right hand' },

  // Falcon Trading (Pvt) Ltd
  { fullName: 'Nipuna Tharusha', company: 'Falcon Trading (Pvt) Ltd', jerseyNumber: 11, cricketRole: 'Batsman', battingHand: 'Right hand' },

  // Land and Building (Pvt) Ltd
  { fullName: 'Roshen Mikaela Perera', company: 'Land and Building (Pvt) Ltd', jerseyNumber: 17, cricketRole: 'Batting allrounder', battingHand: 'Right hand' },

  // Ceylon Coffeeworks (Pvt) Ltd
  { fullName: 'Malith De Silva', company: 'Ceylon Coffeeworks (Pvt) Ltd', jerseyNumber: 5, cricketRole: 'Bowler', battingHand: 'Left hand' },
  { fullName: 'Mohomed Rifaz Mourose', company: 'Ceylon Coffeeworks (Pvt) Ltd', jerseyNumber: 9, cricketRole: 'Batsman', battingHand: 'Right hand' },
  { fullName: 'Ruveen Kavindra Fonseka', company: 'Ceylon Coffeeworks (Pvt) Ltd', jerseyNumber: 12, cricketRole: 'Wicketkeeper batsman', battingHand: 'Right hand' },
  { fullName: 'Biyanka Perera', company: 'Ceylon Coffeeworks (Pvt) Ltd', jerseyNumber: 16, cricketRole: 'Bowler', battingHand: 'Right hand' },

  // Colombo Coffee Company (Pvt) Ltd
  { fullName: 'Kemendra Vitharana', company: 'Colombo Coffee Company (Pvt) Ltd', jerseyNumber: 21, cricketRole: 'Batsman', battingHand: 'Right hand' },

  // Glowbal Retails (Pvt) Ltd
  { fullName: 'Vidusanka Nethsara', company: 'Glowbal Retails (Pvt) Ltd', jerseyNumber: 25, cricketRole: 'Bowling allrounder', battingHand: 'Right hand' },

  // Coffee Collective (Pvt) Ltd
  { fullName: 'Tharusha Nimshara Gunathunga', company: 'Coffee Collective (Pvt) Ltd', jerseyNumber: 30, cricketRole: 'Bowler', battingHand: 'Right hand' }
];

const INITIAL_EQUIPMENT = [
  // 18 Individually Numbered Cricket Assets (all countVerified: false, condition: Inspect)
  { assetId: 'ACC-HELM-01', name: 'Cricket Helmet - Navy Standard', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-HELM-02', name: 'Cricket Helmet - Navy Standard', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-HELM-03', name: 'Cricket Helmet - Navy Standard', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },

  { assetId: 'ACC-GLV-RH-01', name: 'Batting Gloves (Right Hand Pair)', category: 'Cricket Gear', quantity: 1, unit: 'pairs', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-GLV-RH-02', name: 'Batting Gloves (Right Hand Pair)', category: 'Cricket Gear', quantity: 1, unit: 'pairs', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-GLV-RH-03', name: 'Batting Gloves (Right Hand Pair)', category: 'Cricket Gear', quantity: 1, unit: 'pairs', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-GLV-RH-04', name: 'Batting Gloves (Right Hand Pair)', category: 'Cricket Gear', quantity: 1, unit: 'pairs', minimumStock: 1, condition: 'Inspect', countVerified: false },

  { assetId: 'ACC-GLV-LH-01', name: 'Batting Gloves (Left Hand Pair)', category: 'Cricket Gear', quantity: 1, unit: 'pairs', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-GLV-LH-02', name: 'Batting Gloves (Left Hand Pair)', category: 'Cricket Gear', quantity: 1, unit: 'pairs', minimumStock: 1, condition: 'Inspect', countVerified: false },

  { assetId: 'ACC-THG-RH-01', name: 'Thigh Guard (Right Hand)', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-THG-RH-02', name: 'Thigh Guard (Right Hand)', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-THG-RH-03', name: 'Thigh Guard (Right Hand)', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-THG-RH-04', name: 'Thigh Guard (Right Hand)', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-THG-RH-05', name: 'Thigh Guard (Right Hand)', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-THG-RH-06', name: 'Thigh Guard (Right Hand)', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },

  { assetId: 'ACC-THG-LH-01', name: 'Thigh Guard (Left Hand)', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-THG-LH-02', name: 'Thigh Guard (Left Hand)', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-THG-LH-03', name: 'Thigh Guard (Left Hand)', category: 'Cricket Gear', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },

  // 18 First Aid supplies (Minimum stock targets, unverified counts, condition: Inspect)
  { assetId: 'ACC-MED-01', name: 'Adhesive plasters', category: 'First Aid', quantity: 20, unit: 'units', minimumStock: 20, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-02', name: 'Sterile gauze pads', category: 'First Aid', quantity: 20, unit: 'units', minimumStock: 20, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-03', name: 'Sterile wound dressings', category: 'First Aid', quantity: 6, unit: 'units', minimumStock: 6, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-04', name: 'Crepe bandages', category: 'First Aid', quantity: 4, unit: 'rolls', minimumStock: 4, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-05', name: 'Cohesive bandage', category: 'First Aid', quantity: 2, unit: 'rolls', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-06', name: 'Medical tape', category: 'First Aid', quantity: 2, unit: 'rolls', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-07', name: 'Triangular bandages', category: 'First Aid', quantity: 2, unit: 'units', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-08', name: 'Sterile saline wash', category: 'First Aid', quantity: 10, unit: 'sachets', minimumStock: 10, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-09', name: 'Antiseptic wipes', category: 'First Aid', quantity: 15, unit: 'units', minimumStock: 15, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-10', name: 'Nitrile gloves', category: 'First Aid', quantity: 10, unit: 'pairs', minimumStock: 10, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-11', name: 'CPR face shields', category: 'First Aid', quantity: 2, unit: 'units', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-12', name: 'Instant cold packs', category: 'First Aid', quantity: 6, unit: 'units', minimumStock: 6, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-13', name: 'Thermal blankets', category: 'First Aid', quantity: 2, unit: 'units', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-14', name: 'Waste bags', category: 'First Aid', quantity: 6, unit: 'units', minimumStock: 6, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-15', name: 'Finger dressings', category: 'First Aid', quantity: 5, unit: 'units', minimumStock: 5, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-16', name: 'Blister dressings', category: 'First Aid', quantity: 6, unit: 'units', minimumStock: 6, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-17', name: 'Alcohol-free cleansing wipes', category: 'First Aid', quantity: 15, unit: 'units', minimumStock: 15, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-MED-18', name: 'Eye-wash saline', category: 'First Aid', quantity: 4, unit: 'sachets', minimumStock: 4, condition: 'Inspect', countVerified: false },

  // 10 Consumables supplies (Minimum stock targets, unverified counts, condition: Inspect)
  { assetId: 'ACC-CON-01', name: 'Permanent markers', category: 'Consumables', quantity: 3, unit: 'units', minimumStock: 3, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-CON-02', name: 'Whiteboard markers', category: 'Consumables', quantity: 3, unit: 'units', minimumStock: 3, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-CON-03', name: '5L drinking water', category: 'Consumables', quantity: 4, unit: 'bottles', minimumStock: 4, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-CON-04', name: 'Paper cups', category: 'Consumables', quantity: 25, unit: 'units', minimumStock: 25, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-CON-05', name: 'Garbage liners', category: 'Consumables', quantity: 8, unit: 'units', minimumStock: 8, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-CON-06', name: 'Paper towels/tissues', category: 'Consumables', quantity: 2, unit: 'packs', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-CON-07', name: 'Cooler sanitizing wipes', category: 'Consumables', quantity: 2, unit: 'packs', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-CON-08', name: 'Inventory labels', category: 'Consumables', quantity: 2, unit: 'sheets', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-CON-09', name: 'Packing tape', category: 'Consumables', quantity: 2, unit: 'rolls', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-CON-10', name: 'Score sheets/checklists', category: 'Consumables', quantity: 20, unit: 'sheets', minimumStock: 20, condition: 'Inspect', countVerified: false },

  // 12 Shared Equipment supplies
  // Cooler box marked Damaged with replacement proposed; remaining await inspection
  { assetId: 'ACC-SHR-01', name: 'Cooler box', category: 'Shared Equipment', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Damaged', countVerified: false, notes: 'Damaged latch and hinge; replacement proposed.' },
  { assetId: 'ACC-SHR-02', name: 'Reusable gel ice packs', category: 'Shared Equipment', quantity: 8, unit: 'units', minimumStock: 8, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-03', name: 'Training cones', category: 'Shared Equipment', quantity: 20, unit: 'units', minimumStock: 20, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-04', name: 'Flat marker discs', category: 'Shared Equipment', quantity: 20, unit: 'units', minimumStock: 20, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-05', name: 'Boundary cones/flags', category: 'Shared Equipment', quantity: 10, unit: 'units', minimumStock: 10, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-06', name: 'First-aid carry box', category: 'Shared Equipment', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-07', name: 'First-aid scissors', category: 'Shared Equipment', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-08', name: 'Portable kit/ball bucket', category: 'Shared Equipment', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-09', name: 'Practice whiteboard', category: 'Shared Equipment', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-10', name: 'Clipboards', category: 'Shared Equipment', quantity: 2, unit: 'units', minimumStock: 2, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-11', name: 'Water dispensing container', category: 'Shared Equipment', quantity: 1, unit: 'units', minimumStock: 1, condition: 'Inspect', countVerified: false },
  { assetId: 'ACC-SHR-12', name: 'Training bibs', category: 'Shared Equipment', quantity: 12, unit: 'units', minimumStock: 12, condition: 'Inspect', countVerified: false }
];

const INITIAL_SESSIONS = [
  {
    title: 'Oval Indoor Nets · Two nets',
    venue: 'Oval Indoor Nets (MCA SPL)',
    date: '2026-10-06',
    type: 'Practice',
    notes: 'MCA SPL preparatory net session.'
  },
  {
    title: 'NCC Indoor Practice',
    venue: 'NCC Indoor',
    date: '2026-10-08',
    type: 'Practice',
    notes: 'Indoor fielding drills and wicket-keeping simulation.'
  },
  {
    title: 'NCC Indoor · Machine Bowling',
    venue: 'NCC Indoor',
    date: '2026-10-13',
    type: 'Practice',
    notes: 'Pace bowling machine practice against swinging deliveries.'
  },
  {
    title: 'Team Practice Match (planned)',
    venue: 'Venue to be confirmed',
    date: '2026-10-18',
    type: 'Match',
    notes: 'The planned practice match is not an official MCA fixture.'
  }
];

async function seedDatabase() {
  console.log('Seeding Akbar Cricket Club initial data...');

  // 1. Seed Administrator if not exists
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@akbarcricket.lk').toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'AkbarCricket@2026!';
    const hashedPassword = await hashPassword(defaultPassword);
    await User.create({
      name: 'System Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: 'Administrator'
    });
    console.log(` Created initial Administrator: ${adminEmail}`);
  }

  // Also seed a demo Manager and Coach for convenient testing if they don't exist
  const managerEmail = 'manager@akbarcricket.lk';
  if (!(await User.findOne({ email: managerEmail }))) {
    const pw = await hashPassword('Manager@2026!');
    await User.create({
      name: 'Club Manager',
      email: managerEmail,
      password: pw,
      role: 'Manager'
    });
    console.log(` Created demo Manager: ${managerEmail}`);
  }

  const coachEmail = 'coach@akbarcricket.lk';
  if (!(await User.findOne({ email: coachEmail }))) {
    const pw = await hashPassword('Coach@2026!');
    await User.create({
      name: 'Head Coach',
      email: coachEmail,
      password: pw,
      role: 'Coach'
    });
    console.log(` Created demo Coach: ${coachEmail}`);
  }

  // 2. Seed 20 Squad Players
  const playerCount = await Player.countDocuments();
  if (playerCount === 0) {
    console.log(`Seeding ${INITIAL_PLAYERS.length} squad players (leaving confidential fields blank)...`);
    await Player.insertMany(INITIAL_PLAYERS);
    console.log(` Seeded ${INITIAL_PLAYERS.length} players successfully.`);
  }

  // Fetch all players for roll calls
  const allPlayers = await Player.find({}).select('_id fullName');

  // 3. Seed 58 Equipment Items
  const equipmentCount = await Equipment.countDocuments();
  if (equipmentCount === 0) {
    console.log(`Seeding ${INITIAL_EQUIPMENT.length} equipment items (18 assets + 40 supplies)...`);
    await Equipment.insertMany(INITIAL_EQUIPMENT);
    console.log(` Seeded ${INITIAL_EQUIPMENT.length} equipment records successfully.`);
  }

  // 4. Seed 4 Sessions with all players in "Not marked" status
  const sessionCount = await Session.countDocuments();
  if (sessionCount === 0) {
    console.log(`Seeding ${INITIAL_SESSIONS.length} practice/match sessions with unmarked roll calls...`);
    for (const s of INITIAL_SESSIONS) {
      const rollCall = allPlayers.map(p => ({
        player: p._id,
        status: 'Not marked',
        note: ''
      }));
      await Session.create({
        ...s,
        rollCall
      });
    }
    console.log(` Seeded ${INITIAL_SESSIONS.length} sessions successfully.`);
  }

  console.log(' Database verification and seeding complete.');
}

// Standalone execution support
if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
  const { connectDB, closeDB } = require('../config/db');
  (async () => {
    try {
      await connectDB();
      await seedDatabase();
      await closeDB();
      process.exit(0);
    } catch (err) {
      console.error('Seeding failed:', err);
      process.exit(1);
    }
  })();
}

module.exports = {
  seedDatabase,
  INITIAL_PLAYERS,
  INITIAL_EQUIPMENT,
  INITIAL_SESSIONS
};
