const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { connectDB } = require('./src/config/db');
const { seedDatabase } = require('./src/services/seedService');
const { apiLimiter, sanitizeInput } = require('./src/middleware/security');
const { authenticate } = require('./src/middleware/auth');

// Models for Command Centre dashboard aggregation
const Player = require('./src/models/Player');
const Match = require('./src/models/Match');
const Session = require('./src/models/Session');
const Equipment = require('./src/models/Equipment');
const DamageReport = require('./src/models/DamageReport');
const Task = require('./src/models/Task');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:5173';

// 1. Security Headers
app.use(helmet({
  contentSecurityPolicy: false, // Allows Vite dev scripts & assets
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// 2. CORS configuration
app.use(cors({
  origin: [APP_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 3. Parsers & Sanitizers
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);

// 4. Rate Limiting for API
app.use('/api/', apiLimiter);

// 5. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Akbar Cricket Club API',
    season: '2026-2027',
    timestamp: new Date().toISOString()
  });
});

// 6. Command Centre Dashboard Overview Route
app.get('/api/command-centre', authenticate, async (req, res) => {
  try {
    // 1. 4 Stat Cards
    const activeSquadCount = await Player.countDocuments({ isActive: true });
    const mcaMatchesCount = await Match.countDocuments({});
    
    // Overall attendance rate across marked sessions
    const sessions = await Session.find({});
    let totalMarked = 0;
    let totalAttendedOrLate = 0;
    let unmarkedSessionCount = 0;

    sessions.forEach(s => {
      const stats = s.calculateAttendance();
      totalMarked += stats.markedCount;
      totalAttendedOrLate += (stats.attended + stats.late);
      if (stats.notMarked > 0) unmarkedSessionCount++;
    });

    const attendanceRate = totalMarked > 0 ? Math.round((totalAttendedOrLate / totalMarked) * 1000) / 10 : null;
    const countPending = await Equipment.countDocuments({ countVerified: false });

    // 2. Upcoming MCA Fixtures
    const upcomingFixtures = await Match.find({ result: 'Pending' })
      .sort({ date: 1 })
      .limit(3);

    // 3. Management-Attention Panel
    const openDamageCount = await DamageReport.countDocuments({ status: { $in: ['Open', 'In progress'] } });
    const lowStockCount = await Equipment.countDocuments({
      countVerified: true,
      $expr: { $lt: ['$quantity', '$minimumStock'] }
    });

    // 4. Top Performers (Top 3 for batsmen, bowlers, fielders)
    const players = await Player.find({ isActive: true });
    
    // Batsmen: runs DESC, then SR DESC
    const topBatsmen = [...players]
      .filter(p => (p.stats?.runs || 0) > 0 || (p.stats?.ballsFaced || 0) > 0)
      .sort((a, b) => {
        const runsA = a.stats?.runs || 0;
        const runsB = b.stats?.runs || 0;
        if (runsB !== runsA) return runsB - runsA;
        const srA = (a.stats?.ballsFaced || 0) > 0 ? (runsA / a.stats.ballsFaced) * 100 : 0;
        const srB = (b.stats?.ballsFaced || 0) > 0 ? (runsB / b.stats.ballsFaced) * 100 : 0;
        return srB - srA;
      })
      .slice(0, 3)
      .map(p => ({
        id: p._id,
        name: p.fullName,
        company: p.company,
        runs: p.stats?.runs || 0,
        matches: p.stats?.matches || 0
      }));

    // Bowlers: wickets DESC, then economy ASC
    const topBowlers = [...players]
      .filter(p => (p.stats?.wickets || 0) > 0 || (p.stats?.ballsBowled || 0) > 0)
      .sort((a, b) => {
        const wA = a.stats?.wickets || 0;
        const wB = b.stats?.wickets || 0;
        if (wB !== wA) return wB - wA;
        const econA = (a.stats?.ballsBowled || 0) > 0 ? (a.stats.runsConceded / a.stats.ballsBowled) * 6 : 999;
        const econB = (b.stats?.ballsBowled || 0) > 0 ? (b.stats.runsConceded / b.stats.ballsBowled) * 6 : 999;
        return econA - econB;
      })
      .slice(0, 3)
      .map(p => ({
        id: p._id,
        name: p.fullName,
        company: p.company,
        wickets: p.stats?.wickets || 0,
        ballsBowled: p.stats?.ballsBowled || 0
      }));

    // Fielders: fieldingPoints DESC, then catches DESC
    const topFielders = [...players]
      .filter(p => (p.stats?.fieldingPoints || 0) > 0)
      .sort((a, b) => {
        const fpA = a.stats?.fieldingPoints || 0;
        const fpB = b.stats?.fieldingPoints || 0;
        if (fpB !== fpA) return fpB - fpA;
        return (b.stats?.catches || 0) - (a.stats?.catches || 0);
      })
      .slice(0, 3)
      .map(p => ({
        id: p._id,
        name: p.fullName,
        company: p.company,
        fieldingPoints: p.stats?.fieldingPoints || 0,
        catches: p.stats?.catches || 0
      }));

    // 5. Recent Open Tasks
    const recentTasks = await Task.find({ status: { $in: ['To do', 'In progress'] } })
      .sort({ createdAt: -1 })
      .limit(4);

    return res.json({
      success: true,
      stats: {
        activeSquad: activeSquadCount,
        mcaMatches: mcaMatchesCount,
        attendanceRate: attendanceRate !== null ? `${attendanceRate}%` : '—',
        unverifiedEquipment: countPending
      },
      attentionPanel: {
        unverifiedStock: countPending,
        openDamageReports: openDamageCount,
        lowStockItems: lowStockCount,
        unmarkedAttendanceSessions: unmarkedSessionCount
      },
      upcomingFixtures,
      topPerformers: {
        bestBatsmen: topBatsmen,
        bestBowlers: topBowlers,
        bestFielders: topFielders
      },
      recentTasks
    });
  } catch (err) {
    console.error('Command centre error:', err);
    return res.status(500).json({ success: false, message: 'Failed to aggregate command centre data.' });
  }
});

// 7. Mount Routers
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/players', require('./src/routes/players'));
app.use('/api/sessions', require('./src/routes/sessions'));
app.use('/api/matches', require('./src/routes/matches'));
app.use('/api/leaderboards', require('./src/routes/leaderboards'));
app.use('/api/equipment', require('./src/routes/equipment'));
app.use('/api/inspections', require('./src/routes/inspections'));
app.use('/api/damage-reports', require('./src/routes/damageReports'));
app.use('/api/tasks', require('./src/routes/tasks'));
app.use('/api/reports', require('./src/routes/reports'));
app.use('/api/uploads', require('./src/routes/uploads'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled API Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected internal server error occurred.'
  });
});

// Start Server
async function startServer() {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(` Akbar Cricket Club — Team Management Suite v2.0`);
      console.log(` Season 2026–2027 Backend Server Running`);
      console.log(` API Endpoint: http://localhost:${PORT}/api`);
      console.log(` CORS Allowed: ${APP_ORIGIN}`);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

module.exports = app;
