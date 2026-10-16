/**
 * Akbar Cricket Club — Player Leaderboards View
 * Official statistics engine with Top 5 cards, comprehensive table, filters, and club scoring rule documentation.
 */

import { api } from '../api.js';

export async function renderLeaderboards(container) {
  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Player Leaderboards</h2>
        <div class="small text-muted">Official Confirmed Season Performance & Rankings</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-export-leaderboard-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download Filtered CSV
        </button>
        <button class="btn btn-light-custom" id="btn-print-leaderboard">
          <i class="bi bi-printer me-1"></i>Print Leaderboard
        </button>
      </div>
    </div>

    <!-- Filters Toolbar -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center">
        <div class="col-6 col-md-3">
          <label class="form-label-custom">Season</label>
          <select id="lead-season-filter" class="form-select-custom">
            <option value="All">All Seasons</option>
            <option value="2026-2027" selected>2026–2027</option>
          </select>
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label-custom">Competition</label>
          <select id="lead-comp-filter" class="form-select-custom">
            <option value="All">All Competitions</option>
            <option value="MCA League 2026/27">MCA League 2026/27</option>
          </select>
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label-custom">Format</label>
          <select id="lead-format-filter" class="form-select-custom">
            <option value="All">All Formats</option>
            <option value="T20">T20</option>
            <option value="T10">T10</option>
            <option value="50 Overs">50 Overs</option>
          </select>
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label-custom">Action</label>
          <button class="btn btn-burgundy w-100" id="btn-apply-lead-filters">Apply Filters</button>
        </div>
      </div>
    </div>

    <!-- Top 5 Performer Cards (Batsman, Bowler, Fielder) -->
    <div class="row g-3 mb-4" id="leaderboard-cards-container">
      <div class="col-12 text-center py-4">
        <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
      </div>
    </div>

    <!-- Explanation Banner on Fielding Points Rule -->
    <div class="p-3 rounded mb-4 border d-flex align-items-center gap-3" style="background: rgba(220, 175, 101, 0.08); border-color: rgba(220, 175, 101, 0.3) !important;">
      <i class="bi bi-info-circle-fill text-gold fs-4 flex-shrink-0"></i>
      <div style="font-size: 12.5px; line-height: 1.4;">
        <strong>Akbar Cricket Club Scoring Rule:</strong> Fielding Points are computed as:
        <code>Fielding Points = Catches (1.0 pt) + 1.5 × Stumpings + 1.5 × Run-outs</code>.
        Batting average shows a dash (—) when a player has zero dismissals. Bowling economy shows a dash (—) when zero balls have been bowled.
      </div>
    </div>

    <!-- Full Stats Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-table me-2 text-danger"></i>Full Squad Verified Performance Register
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="leaderboard-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Company</th>
                <th class="text-center">Matches</th>
                <th class="text-center">Runs</th>
                <th class="text-center">Bat SR</th>
                <th class="text-center">Bat Avg.</th>
                <th class="text-center">Wickets</th>
                <th class="text-center">Economy</th>
                <th class="text-center">Catches</th>
                <th class="text-center">Stumpings</th>
                <th class="text-center">Run-outs</th>
                <th class="text-center">Field Points</th>
              </tr>
            </thead>
            <tbody id="leaderboard-tbody">
              <tr>
                <td colspan="12" class="text-center py-4">
                  <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  await loadLeaderboards();

  document.getElementById('btn-apply-lead-filters')?.addEventListener('click', loadLeaderboards);
  document.getElementById('btn-export-leaderboard-csv')?.addEventListener('click', () => {
    window.location.href = '/api/leaderboards/export-csv';
  });
  document.getElementById('btn-print-leaderboard')?.addEventListener('click', () => {
    window.print();
  });
}

async function loadLeaderboards() {
  const season = document.getElementById('lead-season-filter')?.value || 'All';
  const competition = document.getElementById('lead-comp-filter')?.value || 'All';
  const format = document.getElementById('lead-format-filter')?.value || 'All';

  const cardsContainer = document.getElementById('leaderboard-cards-container');
  const tbody = document.getElementById('leaderboard-tbody');

  try {
    const params = new URLSearchParams();
    if (season !== 'All') params.append('season', season);
    if (competition !== 'All') params.append('competition', competition);
    if (format !== 'All') params.append('format', format);

    const data = await api.get(`/api/leaderboards?${params.toString()}`);
    const { topBatsmen, topBowlers, topFielders, tableData } = data;

    // Render 3 Top Cards (Best batsman, bowler, fielder with top 5 lists)
    cardsContainer.innerHTML = `
      <!-- Best Batsmen Card -->
      <div class="col-md-4">
        <div class="card-custom h-100 p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="stat-label">Best Batsman</span>
            <span class="badge-role badge-batsman">Runs & SR</span>
          </div>
          ${topBatsmen && topBatsmen.length > 0 ? `
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${topBatsmen[0].playerName}</div>
              <div class="stat-value text-danger my-1">${topBatsmen[0].runs} <span class="small text-muted fs-6">runs</span></div>
              <div class="small text-muted">SR: ${topBatsmen[0].batSR} &bull; Avg: ${topBatsmen[0].batAvg !== null ? topBatsmen[0].batAvg : '—'}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Batsmen</div>
              ${topBatsmen.map((b, i) => `
                <div class="d-flex justify-content-between align-items-center small py-1 ${i === 0 ? 'fw-bold' : ''}">
                  <span>${i + 1}. ${b.playerName}</span>
                  <span>${b.runs} r <span class="text-muted" style="font-size: 10px;">(SR ${b.batSR})</span></span>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-muted small py-4">No verified batting statistics recorded for this filter selection.</div>
          `}
        </div>
      </div>

      <!-- Best Bowlers Card -->
      <div class="col-md-4">
        <div class="card-custom h-100 p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="stat-label">Best Bowler</span>
            <span class="badge-role badge-bowler">Wickets & Econ</span>
          </div>
          ${topBowlers && topBowlers.length > 0 ? `
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${topBowlers[0].playerName}</div>
              <div class="stat-value text-danger my-1">${topBowlers[0].wickets} <span class="small text-muted fs-6">wickets</span></div>
              <div class="small text-muted">Econ: ${topBowlers[0].economy !== null ? topBowlers[0].economy : '—'} &bull; Balls: ${topBowlers[0].ballsBowled}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Bowlers</div>
              ${topBowlers.map((b, i) => `
                <div class="d-flex justify-content-between align-items-center small py-1 ${i === 0 ? 'fw-bold' : ''}">
                  <span>${i + 1}. ${b.playerName}</span>
                  <span>${b.wickets} w <span class="text-muted" style="font-size: 10px;">(E ${b.economy !== null ? b.economy : '—'})</span></span>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-muted small py-4">No verified bowling statistics recorded for this filter selection.</div>
          `}
        </div>
      </div>

      <!-- Best Fielders Card -->
      <div class="col-md-4">
        <div class="card-custom h-100 p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="stat-label">Best Fielder</span>
            <span class="badge-role badge-allrounder">Points & Catches</span>
          </div>
          ${topFielders && topFielders.length > 0 ? `
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${topFielders[0].playerName}</div>
              <div class="stat-value text-gold my-1">${topFielders[0].fieldingPoints} <span class="small text-muted fs-6">points</span></div>
              <div class="small text-muted">Catches: ${topFielders[0].catches} &bull; Stump: ${topFielders[0].stumpings} &bull; RO: ${topFielders[0].runOuts}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Fielders</div>
              ${topFielders.map((f, i) => `
                <div class="d-flex justify-content-between align-items-center small py-1 ${i === 0 ? 'fw-bold' : ''}">
                  <span>${i + 1}. ${f.playerName}</span>
                  <span>${f.fieldingPoints} pts <span class="text-muted" style="font-size: 10px;">(${f.catches} c)</span></span>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-muted small py-4">No verified fielding statistics recorded for this filter selection.</div>
          `}
        </div>
      </div>
    `;

    // Render Table
    if (!tableData || tableData.length === 0) {
      tbody.innerHTML = `<tr><td colspan="12" class="text-center py-4 text-muted">No squad statistics found.</td></tr>`;
      return;
    }

    tbody.innerHTML = tableData.map(p => `
      <tr>
        <td class="fw-bold text-main">${p.playerName}</td>
        <td class="small text-muted">${p.company}</td>
        <td class="text-center">${p.matches}</td>
        <td class="text-center fw-bold text-danger">${p.runs}</td>
        <td class="text-center">${p.batSR.toFixed(2)}</td>
        <td class="text-center">${p.batAvg !== null ? p.batAvg.toFixed(2) : '—'}</td>
        <td class="text-center fw-bold text-main">${p.wickets}</td>
        <td class="text-center">${p.economy !== null ? p.economy.toFixed(2) : '—'}</td>
        <td class="text-center">${p.catches}</td>
        <td class="text-center">${p.stumpings}</td>
        <td class="text-center">${p.runOuts}</td>
        <td class="text-center fw-bold text-gold">${p.fieldingPoints}</td>
      </tr>
    `).join('');
  } catch (err) {
    cardsContainer.innerHTML = `<div class="col-12 alert alert-danger">${err.message}</div>`;
  }
}
