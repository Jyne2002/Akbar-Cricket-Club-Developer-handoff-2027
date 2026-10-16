# Akbar Cricket Club — Team Management Suite (Season 2026–2027)

A corporate sports management dashboard and operational platform engineered for Akbar Cricket Club's 2026–2027 MCA league campaign.

---

## 🏏 System Architecture & Tech Stack

- **Frontend**: Single-Page Application built with Vanilla JavaScript (ES Modules), HTML5, CSS3, and Bootstrap 5.3. Styled according to ACC Corporate Sports Design guidelines (Dark Navy `#16243a`, Burgundy `#9e2332`, Gold `#dcaf65`, DM Sans & Manrope typography).
- **Frontend Dev Server**: Vite with built-in proxy forwarding `/api` requests to backend port 3000.
- **Backend**: Node.js & Express REST API with security middleware (Helmet, CORS, Cookie-Parser, Express Rate-Limit).
- **Database Layer**: MongoDB via Mongoose ODM with dual-mode zero-dependency fallback engine.
  - Connects to primary `MONGODB_URI` when MongoDB is running.
  - Automatically activates the embedded file-backed database engine at `./data/store.json` if local MongoDB is offline, guaranteeing immediate out-of-the-box operation without external dependencies.
- **Security & Privacy**:
  - Passwords hashed using `bcryptjs` (salt rounds: 12).
  - Sessions managed via secure `HttpOnly` JWT cookies (`acc_token`) with server-side revocation.
  - National Identity Card (NIC) numbers encrypted at rest using **AES-256-GCM** with a 32-byte secret key and 16-byte random IV.
  - Role-based access control (RBAC) masks confidential HR fields (`phone`, `workEmail`, `epfNumber`, `nic`, `joiningDate`, `worksite`, `reportingManager`, `emergencyContact`) from Coach and Viewer roles.
  - All CSV exports are protected against spreadsheet-formula injection (`=`, `+`, `-`, `@`, `\t`, `\r` escaped).
  - Multer upload subsystem with 10MB limit and safe randomized disk naming.

---

## 🚀 Quick Start & Run Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24+ supported)
- **npm**: v9.0.0 or higher
- **MongoDB** (Optional): MongoDB service or Atlas URI. If omitted or not running, the application runs on its embedded persistent database engine.

---

### 2. Backend Setup & Startup
```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configuration: A pre-configured .env with strong local keys is included
# If configuring manually, copy .env.example to .env
# cp .env.example .env

# Run automated verification test suite
npm test

# Start the backend server
npm start
```
The backend starts at: **`http://localhost:3000/api`**

---

### 3. Frontend Setup & Startup
```powershell
# In a separate terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Launch Vite development server with proxy to port 3000
npm run dev
```
The application opens at: **`http://localhost:5173/`**

---

## 🔐 Default Personnel Credentials

The database automatically provisions the following default credentials on first launch:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@akbarcricket.lk` | `AkbarCricket@2026!` | Full administrative access, confidential records, user account creation, system settings. |
| **Manager** | `manager@akbarcricket.lk` | `Manager@2026!` | Confidential player records, squad CSV imports, match score verification, club operations. |
| **Coach** | `coach@akbarcricket.lk` | `Coach@2026!` | Cricket profiles, attendance roll calls, match Playing XI, gear inspections, Kanban tasks. Confidential HR data redacted. |
| **Viewer** | *(Create via Settings)* | *(Assigned by Admin)* | Read-only operational access to rosters, fixtures, and leaderboards. |

---

## 📋 Workspace Modules (11 Navigation Sections)

### WORKSPACE
1. **Command Centre**:
   - Navy gradient banner with watermark and circular ACC crest.
   - 4 Top Metric Cards: Active Squad, MCA Matches, Attendance Rate %, Stock Checks Awaiting.
   - Upcoming MCA Fixtures and Management Attention Panel (unverified stock, open damage reports, low stock, unmarked attendance).
   - Season 2026–27 Top Performers: Best Batsman, Best Bowler, Best Fielder (top-3 contenders each).
   - Recent open tasks table.
2. **Player Profiles**:
   - Page heading: “2027 Selected Squad”.
   - 4-column responsive grid on large screens displaying player initials/photo, jersey number, name, employer company, cricket role, batting hand badges, and verified season matches, runs, and wickets.
   - Search by name, filter by corporate company and cricket role.
   - Modal drawer with full technical profile, assigned club equipment, and recent attendance.
   - Confidential employment/contact details visible only to Administrator and Manager.
   - Squad CSV import matching existing players by name without erasing fields, adding new players, and strictly preserving leading zeros in EPF numbers.
3. **Practice & Attendance**:
   - Sessions history table with Date, Session, Type (Practice / Match), Attendance Rate %, and Completion.
   - Roll call modal with dropdown statuses: `Not marked`, `Attended`, `Late`, `Absent`, `Excused`, plus notes.
   - "Set all Attended" quick-action button.
   - **Calculation Rule**: Attendance rate = `(Attended + Late) / (Marked entries)`. `Not marked` is excluded from denominator. Displays a dash (`—`) when no attendance is marked.
4. **MCA Match Centre**:
   - Official MCA fixtures table (format, result, scores, scorecard count).
   - Playing XI selector allowing at most 11 players in the starting lineup (kept strictly separate from attendance).
   - Scorecard upload accepting PDF and CSV up to 10MB.
   - Real-time score review table with player inclusion, batting/bowling/fielding values, Batted and Not Out checkboxes.
   - Bowling conversion: 3 overs and 4 balls stored as 22 balls bowled.
   - Verification: Uploading or previewing does NOT mutate official statistics; only clicking "Confirm verified scores" commits official scores and recalculates leaderboards idempotently.
5. **Player Leaderboards**:
   - Filters for season, competition, format, match, and date range.
   - Top 5 performer cards for Best Batsman, Best Bowler, and Best Fielder.
   - Full squad verified performance register.
   - **Formulas**:
     - $\text{Batting SR} = \frac{\text{Runs}}{\text{Balls}} \times 100$
     - $\text{Batting Avg} = \frac{\text{Runs}}{\text{Dismissals}}$ (dash if 0 dismissals)
     - $\text{Bowling Econ} = \frac{\text{Runs Conceded}}{\text{Balls Bowled}} \times 6$ (dash if 0 balls bowled)
     - $\text{Fielding Points} = \text{Catches} + 1.5 \times \text{Stumpings} + 1.5 \times \text{Run-outs}$ (Club scoring rule)
   - Rankings: Batsmen by Runs then SR; Bowlers by Wickets then Economy; Fielders by Points then Catches.

### CLUB OPERATIONS
6. **Gear & Inventory**:
   - 4 Stat Cards: Item records (58 opening), Count pending, Damaged/Lost, Low stock.
   - **Strict Low Stock Rule**: Applies ONLY to items where `countVerified === true` and `quantity < minimumStock`.
   - Physical count verification dialog.
   - Connects assigned gear to player profiles and tracks inspection and expiry dates.
7. **Weekly Inspections**:
   - Weekly gear safety audit log with inspector, evaluated condition, corrective action, and evidence photo.
   - Updates equipment condition and last inspection date while retaining history; does NOT auto-verify quantity.
8. **Damage Reports**:
   - Incident tracking with severity levels (`Low`, `Medium`, `High`, `Unsafe`) and follow-up status (`Open`, `In progress`, `Resolved`).
   - Resolving a report does NOT automatically certify equipment safe.
9. **Tasks & AI Operations Assistant**:
   - 4 Kanban columns: `To do`, `In progress`, `Blocked`, `Done` with task counts.
   - Task modal with title, category, priority, status, owner, due date, details.
   - "Suggest management actions": scans unverified stock, low stock, open damage, overdue inspections, missing attendance, and pending fixtures.
   - Rule-based engine works 100% offline without API key; optionally calls OpenAI if `OPENAI_API_KEY` is configured in `.env`.
   - Strict privacy: only aggregate operational stats sent to AI; never personal employee data.
   - Explicit `+ Add` button creates task on Kanban board.

### MANAGEMENT
10. **Reports & Exports**:
    - 6 Official Report Cards with CSV download and clean browser Print/PDF layout:
      1. 2027 Player Register
      2. Attendance Register
      3. MCA Match History
      4. Equipment Stock Register
      5. Management Action List
      6. Performance Leaderboard
    - CSV formula injection protection applied across all reports.
11. **Settings & Users**:
    - User account credentials, session details, and password updater.
    - Dark mode appearance toggle (saved in browser `localStorage`).
    - Database engine status and encryption indicator.
    - User provisioning modal (Administrator only) with strong password enforcement.

---

## 📦 Opening Data Included

1. **20 Squad Players** (Confidential fields left blank):
   - *Akbar Brothers (Pvt) Ltd*: Sahan Sankalpa, Salman Akbarally, Vikum Tharusha Ramanayake, Chathura Devinda Silva, Sithika Sanketh Peiris, Mopun Madhawa, S.Nalankan.
   - *Quick Tea (Pvt) Ltd*: Kusal Athapaththu, Ramakrishnan Urendran, Tharanga Kumara, Pasindu Lakshitha Botheju.
   - *Falcon Trading (Pvt) Ltd*: Nipuna Tharusha.
   - *Land and Building (Pvt) Ltd*: Roshen Mikaela Perera.
   - *Ceylon Coffeeworks (Pvt) Ltd*: Malith De Silva, Mohomed Rifaz Mourose, Ruveen Kavindra Fonseka, Biyanka Perera.
   - *Colombo Coffee Company (Pvt) Ltd*: Kemendra Vitharana.
   - *Glowbal Retails (Pvt) Ltd*: Vidusanka Nethsara.
   - *Coffee Collective (Pvt) Ltd*: Tharusha Nimshara Gunathunga.
2. **58 Equipment Records**:
   - 18 numbered cricket assets (3 helmets, 4 RH glove pairs, 2 LH glove pairs, 6 RH thigh guards, 3 LH thigh guards).
   - 18 First Aid supplies (quantities set to minimum stock targets, unverified counts, condition: Inspect).
   - 10 Consumables supplies.
   - 12 Shared Equipment supplies (Cooler box marked Damaged with replacement proposed).
3. **4 Practice / Match Sessions**:
   - 06 Oct 2026: Oval Indoor Nets · Two nets (Practice)
   - 08 Oct 2026: NCC Indoor Practice (Practice)
   - 13 Oct 2026: NCC Indoor · Machine Bowling (Practice)
   - 18 Oct 2026: Team Practice Match (planned, venue TBC) (Match)
   - Initialized with unmarked roll calls.

---

## 📂 CSV Import & Scorecard Templates

Sample templates are available in the `templates/` directory:
- `templates/sample_players_import.csv`: Sample CSV for importing squad members with preserved leading zeros in EPF numbers (`004281`).
- `templates/sample_scorecard.csv`: Sample match scorecard with authentic squad players, runs, balls, 4s, 6s, wickets, bowling balls, and fielding catches.

---

## 🧪 Verification & Testing

To run the automated verification suite:
```powershell
cd backend
npm test
```
The test suite validates:
- [x] AES-256-GCM encryption and decryption of NIC numbers
- [x] CSV formula injection sanitization (`=`, `+`, `-`, `@`)
- [x] Overs to balls conversion (3.4 overs = 22 balls)
- [x] Attendance rate calculations excluding unmarked entries
- [x] Strike rate, average, economy, and fielding points ($1.0\times\text{C} + 1.5\times\text{St} + 1.5\times\text{RO}$)
- [x] Low stock alert condition (verified count < minimum)
- [x] Live API authentication, RBAC confidential field redaction, and database counts
