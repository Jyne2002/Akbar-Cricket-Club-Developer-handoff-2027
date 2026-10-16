/**
 * Akbar Cricket Club — MCA Match Centre View
 * Fixtures table, match details, Playing XI selection (max 11), PDF/CSV scorecard upload preview,
 * balls conversion (3.4 overs = 22 balls), and verified scores confirmation.
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';

let matchesList = [];
let currentUser = null;

export async function renderMatches(container, user) {
  currentUser = user;
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">MCA Match Centre</h2>
        <div class="small text-muted">Official MCA League Fixtures, Playing XI Lineups & Verified Scorecards</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-export-matches-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Export Fixtures
        </button>
        <button class="btn btn-light-custom" id="btn-print-matches">
          <i class="bi bi-printer me-1"></i>Print Match Schedule
        </button>
        ${canEdit ? `
          <button class="btn btn-burgundy" id="btn-create-fixture">
            <i class="bi bi-plus-lg me-1"></i>Log MCA Fixture
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Filters -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" id="match-search" class="form-control-custom border-start-0" placeholder="Search by opponent or competition...">
          </div>
        </div>
        <div class="col-md-4">
          <select id="match-format-filter" class="form-select-custom">
            <option value="All">All Formats</option>
            <option value="T20">T20</option>
            <option value="T10">T10</option>
            <option value="50 Overs">50 Overs</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Fixtures Table -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-trophy me-2 text-danger"></i>MCA League 2026/27 Fixtures
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="matches-table">
            <thead>
              <tr>
                <th>Opposition & Competition</th>
                <th>Date & Venue</th>
                <th>Format</th>
                <th>Result</th>
                <th>Scores</th>
                <th>Scorecards</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody id="matches-tbody">
              <tr>
                <td colspan="7" class="text-center py-4">
                  <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  await loadMatches();

  document.getElementById('match-search')?.addEventListener('input', debounce(loadMatches, 300));
  document.getElementById('match-format-filter')?.addEventListener('change', loadMatches);

  document.getElementById('btn-export-matches-csv')?.addEventListener('click', () => {
    window.location.href = '/api/reports/matches/csv';
  });

  document.getElementById('btn-print-matches')?.addEventListener('click', () => {
    window.print();
  });

  if (canEdit) {
    document.getElementById('btn-create-fixture')?.addEventListener('click', openCreateFixtureModal);
  }

  // Check if a specific match ID is in the URL query string
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const targetMatchId = urlParams.get('id');
  if (targetMatchId) {
    openMatchDetailModal(targetMatchId);
  }
}

async function loadMatches() {
  const search = document.getElementById('match-search')?.value || '';
  const format = document.getElementById('match-format-filter')?.value || 'All';
  const tbody = document.getElementById('matches-tbody');

  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (format !== 'All') params.append('format', format);

    const res = await api.get(`/api/matches?${params.toString()}`);
    matchesList = res.matches;

    if (!matchesList || matchesList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No MCA fixtures logged. Click "Log MCA Fixture" to add scheduled matches.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = matchesList.map(m => {
      const resultBadge = m.result === 'Win' ? 'badge bg-success' :
                          m.result === 'Loss' ? 'badge bg-danger' :
                          m.result === 'Pending' ? 'badge bg-warning text-dark' : 'badge bg-secondary';

      const scoresDisplay = m.ourScore || m.oppositionScore
        ? `<div class="fw-bold">${m.ourScore || '—'}</div><div class="small text-muted">Opp: ${m.oppositionScore || '—'}</div>`
        : '<span class="text-muted small">Scores pending</span>';

      return `
        <tr>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">vs ${m.opponent}</div>
            <div class="small text-muted">${m.competition}</div>
          </td>
          <td>
            <div class="fw-bold">${m.date}</div>
            <div class="small text-muted">${m.venue || 'Venue TBD'}</div>
          </td>
          <td><span class="badge-role badge-batsman">${m.format}</span></td>
          <td><span class="${resultBadge}">${m.result}</span></td>
          <td>${scoresDisplay}</td>
          <td>
            <span class="badge-role ${m.scorecardCount > 0 ? 'bg-info bg-opacity-10 text-primary border' : ''}">
              <i class="bi bi-paperclip me-1"></i>${m.scorecardCount} file(s)
            </span>
            ${m.scoresVerified ? `<span class="badge bg-success ms-1" style="font-size: 9px;"><i class="bi bi-check2"></i> Verified</span>` : ''}
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-burgundy py-1 px-3 btn-open-match" data-match-id="${m.id}">
              <span>Open match</span> &rarr;
            </button>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll('.btn-open-match').forEach(btn => {
      btn.addEventListener('click', () => {
        const mid = btn.getAttribute('data-match-id');
        openMatchDetailModal(mid);
      });
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" class="alert alert-danger">${err.message}</td></tr>`;
  }
}

/**
 * Open Match Detail Modal with Playing XI, Attendance, Scorecards & Verification
 */
async function openMatchDetailModal(matchId) {
  try {
    const res = await api.get(`/api/matches/${matchId}`);
    const { match, attendanceSummary } = res;
    const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

    const playingXI = match.playingXI || [];
    const selectedCount = playingXI.filter(p => p.status === 'Playing XI').length;

    const contentHtml = `
      <div>
        <!-- Match Header Info Card -->
        <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
          <div class="row g-2 align-items-center">
            <div class="col-md-7">
              <span class="badge-role badge-batsman mb-1">${match.format} &bull; ${match.competition}</span>
              <h4 class="fw-bold text-main mb-1">Akbar CC vs ${match.opponent}</h4>
              <div class="small text-muted">
                <i class="bi bi-calendar3 me-1"></i>${match.date} &bull; <i class="bi bi-geo-alt me-1"></i>${match.venue || 'Venue TBD'}
              </div>
            </div>
            <div class="col-md-5 text-md-end">
              <div class="stat-label">Result & Scores</div>
              <div class="fw-bold fs-5 text-main">${match.ourScore || '—'} <span class="text-muted fs-6">vs</span> ${match.oppositionScore || '—'}</div>
              <span class="badge ${match.result === 'Win' ? 'bg-success' : match.result === 'Loss' ? 'bg-danger' : 'bg-warning text-dark'}">
                ${match.result}
              </span>
              ${match.scoresVerified ? `<span class="badge bg-success ms-1"><i class="bi bi-shield-check"></i> Verified Scores</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Tabbed Operations Navigation -->
        <ul class="nav nav-pills mb-3 border-bottom pb-2" id="matchTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active py-1 px-3 small fw-bold" id="tab-lineup-btn" data-bs-toggle="pill" data-bs-target="#tab-lineup" type="button">
              Playing XI (${selectedCount}/11)
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link py-1 px-3 small fw-bold" id="tab-scorecard-btn" data-bs-toggle="pill" data-bs-target="#tab-scorecard" type="button">
              Scorecards & Verification
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link py-1 px-3 small fw-bold" id="tab-attendance-btn" data-bs-toggle="pill" data-bs-target="#tab-attendance" type="button">
              Match Attendance
            </button>
          </li>
        </ul>

        <div class="tab-content" id="matchTabContent">
          <!-- TAB 1: Playing XI Selection -->
          <div class="tab-pane fade show active" id="tab-lineup" role="tabpanel">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="small text-muted">
                Select at most <strong>11 players</strong> for the official Playing XI. Keep selection separate from attendance.
              </div>
              <span class="badge bg-danger" id="playing-xi-counter">${selectedCount} / 11 Selected</span>
            </div>

            <div style="max-height: 380px; overflow-y: auto;">
              <table class="table-custom mb-0">
                <thead>
                  <tr>
                    <th>Squad Member</th>
                    <th>Role</th>
                    <th>Company</th>
                    <th style="width: 170px;">Selection Status</th>
                  </tr>
                </thead>
                <tbody id="playing-xi-tbody">
                  ${playingXI.map(px => {
                    const p = px.player || {};
                    return `
                      <tr data-px-player-id="${p._id}">
                        <td class="fw-bold">${p.fullName || 'Unknown'}</td>
                        <td><span class="badge-role">${p.cricketRole || 'Not set'}</span></td>
                        <td class="small text-muted">${p.company || '—'}</td>
                        <td>
                          <select class="form-select-custom px-status-select" ${!canEdit ? 'disabled' : ''}>
                            <option value="Playing XI" ${px.status === 'Playing XI' ? 'selected' : ''}>Playing XI</option>
                            <option value="Reserve" ${px.status === 'Reserve' ? 'selected' : ''}>Reserve</option>
                            <option value="Unavailable" ${px.status === 'Unavailable' ? 'selected' : ''}>Unavailable</option>
                          </select>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

            ${canEdit ? `
              <div class="mt-3 text-end">
                <button type="button" class="btn btn-burgundy btn-sm" id="btn-save-playing-xi">
                  Save Playing XI
                </button>
              </div>
            ` : ''}
          </div>

          <!-- TAB 2: Scorecard Upload & Verification Review Table -->
          <div class="tab-pane fade" id="tab-scorecard" role="tabpanel">
            <div class="p-3 rounded border mb-3" style="background: var(--body-bg); border-color: var(--border-color) !important;">
              <h6 class="stat-label mb-2 text-danger">Upload Match Scorecard (PDF or CSV up to 10MB)</h6>
              <div class="d-flex flex-wrap gap-2 align-items-center">
                <input type="file" id="scorecard-file-input" class="form-control-custom" style="max-width: 380px;" accept=".csv,.pdf">
                <button type="button" class="btn btn-burgundy btn-sm" id="btn-upload-scorecard-action">
                  <i class="bi bi-cloud-arrow-up me-1"></i>Upload & Preview
                </button>
                <a href="/templates/sample_scorecard.csv" download class="btn btn-light-custom btn-sm ms-auto">
                  <i class="bi bi-download me-1"></i>Sample CSV
                </a>
              </div>
              <div class="small text-muted mt-2">
                <i class="bi bi-shield-check text-success me-1"></i>Uploading or previewing will NOT change official statistics. Official player statistics and leaderboards update ONLY when "Confirm verified scores" is executed.
              </div>
            </div>

            <!-- Upload Attachments History -->
            ${(match.scorecards || []).length > 0 ? `
              <div class="mb-3">
                <div class="stat-label mb-1">Attached Scorecard Documents</div>
                <div class="d-flex flex-wrap gap-2">
                  ${match.scorecards.map(sc => `
                    <a href="/api/uploads/${sc.filename}" target="_blank" class="badge bg-light text-dark border p-2 text-decoration-none">
                      <i class="bi bi-file-earmark-text me-1 text-danger"></i>${sc.originalName} (${Math.round(sc.size / 1024)} KB)
                    </a>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Extracted PDF Text Box (if PDF was reviewed) -->
            <div id="pdf-extracted-box" class="d-none mb-3 p-3 rounded bg-light border small">
              <div class="fw-bold text-main mb-1">Extracted PDF Text Preview:</div>
              <pre id="pdf-text-content" style="max-height: 180px; overflow-y: auto; white-space: pre-wrap; font-size: 11px;"></pre>
            </div>

            <!-- Score Review & Verification Table -->
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="stat-label">Official Match Scoring Review Table</span>
              <button type="button" class="btn btn-sm btn-outline-burgundy" id="btn-populate-from-xi">
                Load Playing XI into Score Table
              </button>
            </div>

            <div style="max-height: 380px; overflow-y: auto;">
              <table class="table-custom mb-0 small" id="score-review-table">
                <thead>
                  <tr>
                    <th>Include</th>
                    <th>Player</th>
                    <th>Runs</th>
                    <th>Balls</th>
                    <th>4s / 6s</th>
                    <th>Batted / NO</th>
                    <th>Balls Bowled</th>
                    <th>Runs Conceded</th>
                    <th>Wkts</th>
                    <th>Catches</th>
                    <th>Stump</th>
                    <th>Run-out</th>
                  </tr>
                </thead>
                <tbody id="score-review-tbody">
                  ${(match.playerStats && match.playerStats.length > 0 ? match.playerStats : playingXI.filter(p => p.status === 'Playing XI').map(p => ({
                    player: p.player,
                    playerName: p.player?.fullName || 'Player',
                    batted: true,
                    runs: 0,
                    balls: 0,
                    fours: 0,
                    sixes: 0,
                    notOut: false,
                    ballsBowled: 0,
                    runsConceded: 0,
                    wickets: 0,
                    catches: 0,
                    stumpings: 0,
                    runOuts: 0
                  }))).map((st, i) => {
                    const pid = st.player?._id || st.player;
                    const pName = st.playerName || st.player?.fullName || 'Player';
                    return `
                      <tr data-stat-player-id="${pid}">
                        <td><input type="checkbox" class="form-check-input stat-include" checked></td>
                        <td class="fw-bold">${pName}</td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runs" style="width: 50px;" value="${st.runs || 0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-balls" style="width: 50px;" value="${st.balls || 0}"></td>
                        <td>
                          <div class="d-flex gap-1">
                            <input type="number" class="form-control-custom py-1 px-1 text-center stat-4s" style="width: 35px;" value="${st.fours || 0}">
                            <input type="number" class="form-control-custom py-1 px-1 text-center stat-6s" style="width: 35px;" value="${st.sixes || 0}">
                          </div>
                        </td>
                        <td>
                          <div class="d-flex gap-2">
                            <label><input type="checkbox" class="form-check-input stat-batted" ${st.batted ? 'checked' : ''}> Bat</label>
                            <label><input type="checkbox" class="form-check-input stat-notout" ${st.notOut ? 'checked' : ''}> NO</label>
                          </div>
                        </td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-ballsbowled" title="Total balls bowled (e.g. 24 balls = 4.0 overs)" style="width: 55px;" value="${st.ballsBowled || 0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runsconceded" style="width: 50px;" value="${st.runsConceded || 0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-wickets" style="width: 45px;" value="${st.wickets || 0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-catches" style="width: 40px;" value="${st.catches || 0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-stumpings" style="width: 40px;" value="${st.stumpings || 0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runouts" style="width: 40px;" value="${st.runOuts || 0}"></td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <!-- Match Score and Result Inputs -->
            <div class="row g-2 mt-3 pt-3 border-top" style="border-color: var(--border-color) !important;">
              <div class="col-md-3">
                <label class="form-label-custom">Our Final Score</label>
                <input type="text" id="m-ourScore" class="form-control-custom" placeholder="e.g. 182/6 (20.0)" value="${match.ourScore || ''}">
              </div>
              <div class="col-md-3">
                <label class="form-label-custom">Opponent Final Score</label>
                <input type="text" id="m-oppScore" class="form-control-custom" placeholder="e.g. 175/9 (20.0)" value="${match.oppositionScore || ''}">
              </div>
              <div class="col-md-3">
                <label class="form-label-custom">Match Result</label>
                <select id="m-result" class="form-select-custom">
                  <option value="Pending" ${match.result === 'Pending' ? 'selected' : ''}>Pending</option>
                  <option value="Win" ${match.result === 'Win' ? 'selected' : ''}>Win</option>
                  <option value="Loss" ${match.result === 'Loss' ? 'selected' : ''}>Loss</option>
                  <option value="Tie" ${match.result === 'Tie' ? 'selected' : ''}>Tie</option>
                  <option value="No result" ${match.result === 'No result' ? 'selected' : ''}>No result</option>
                </select>
              </div>
              <div class="col-md-3 d-flex align-items-end">
                ${canEdit ? `
                  <button type="button" class="btn btn-burgundy w-100" id="btn-confirm-verified-scores">
                    <i class="bi bi-shield-check me-1"></i>Confirm Verified Scores
                  </button>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- TAB 3: Linked Attendance -->
          <div class="tab-pane fade" id="tab-attendance" role="tabpanel">
            <div class="p-3 rounded border" style="background: var(--body-bg); border-color: var(--border-color) !important;">
              <h6 class="stat-label mb-1 text-danger">Linked Match Attendance</h6>
              <p class="small text-muted mb-3">Attendance summary: <strong>${attendanceSummary}</strong></p>
              ${match.linkedSessionId ? `
                <a href="#/attendance" class="btn btn-outline-burgundy btn-sm" onclick="closeModal()">
                  <i class="bi bi-box-arrow-up-right me-1"></i>Open Match Attendance Register
                </a>
              ` : `
                <div class="small text-muted">No linked attendance session found for this match.</div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    openModal({
      title: `Match Control: vs ${match.opponent}`,
      contentHtml,
      footerHtml: `<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>`,
      onOpen: (modalEl) => {
        // Tab switching bootstrap integration
        const tabBtns = modalEl.querySelectorAll('[data-bs-toggle="pill"]');
        tabBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            modalEl.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('show', 'active'));
            btn.classList.add('active');
            const target = modalEl.querySelector(btn.getAttribute('data-bs-target'));
            if (target) target.classList.add('show', 'active');
          });
        });

        // Dynamic Playing XI counter
        const updatePICounter = () => {
          const selects = modalEl.querySelectorAll('.px-status-select');
          let count = 0;
          selects.forEach(s => { if (s.value === 'Playing XI') count++; });
          const counterEl = document.getElementById('playing-xi-counter');
          if (counterEl) {
            counterEl.textContent = `${count} / 11 Selected`;
            counterEl.className = count > 11 ? 'badge bg-danger' : count === 11 ? 'badge bg-success' : 'badge bg-warning text-dark';
          }
        };

        modalEl.querySelectorAll('.px-status-select').forEach(s => {
          s.addEventListener('change', updatePICounter);
        });

        // Save Playing XI
        document.getElementById('btn-save-playing-xi')?.addEventListener('click', async () => {
          const rows = modalEl.querySelectorAll('#playing-xi-tbody tr');
          const selections = [];
          let count = 0;
          rows.forEach(r => {
            const pid = r.getAttribute('data-px-player-id');
            const status = r.querySelector('.px-status-select')?.value || 'Unavailable';
            if (status === 'Playing XI') count++;
            selections.push({ playerId: pid, status });
          });

          if (count > 11) {
            showToast(`At most 11 players allowed in Playing XI. Selected ${count}.`, 'error');
            return;
          }

          try {
            await api.put(`/api/matches/${match._id}/playing-xi`, { selections });
            showToast(`Playing XI saved (${count} selected in starting XI).`, 'success');
            loadMatches();
          } catch (err) {
            showToast(`Error: ${err.message}`, 'error');
          }
        });

        // Upload Scorecard Button
        document.getElementById('btn-upload-scorecard-action')?.addEventListener('click', async () => {
          const fileInput = document.getElementById('scorecard-file-input');
          if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            showToast('Please select a PDF or CSV scorecard file to upload.', 'error');
            return;
          }

          const formData = new FormData();
          formData.append('scorecardFile', fileInput.files[0]);

          const uploadBtn = document.getElementById('btn-upload-scorecard-action');
          uploadBtn.disabled = true;
          uploadBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Parsing...`;

          try {
            const uploadRes = await api.upload(`/api/matches/${match._id}/scorecard`, formData);
            showToast(uploadRes.message, 'success');

            if (uploadRes.fileType === 'csv' && uploadRes.matched) {
              // Populate score-review-tbody with matched rows!
              const tbody = document.getElementById('score-review-tbody');
              if (tbody) {
                tbody.innerHTML = uploadRes.matched.map(r => `
                  <tr data-stat-player-id="${r.player}">
                    <td><input type="checkbox" class="form-check-input stat-include" checked></td>
                    <td class="fw-bold">${r.playerName}</td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runs" style="width: 50px;" value="${r.runs}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-balls" style="width: 50px;" value="${r.balls}"></td>
                    <td>
                      <div class="d-flex gap-1">
                        <input type="number" class="form-control-custom py-1 px-1 text-center stat-4s" style="width: 35px;" value="${r.fours}">
                        <input type="number" class="form-control-custom py-1 px-1 text-center stat-6s" style="width: 35px;" value="${r.sixes}">
                      </div>
                    </td>
                    <td>
                      <div class="d-flex gap-2">
                        <label><input type="checkbox" class="form-check-input stat-batted" ${r.batted ? 'checked' : ''}> Bat</label>
                        <label><input type="checkbox" class="form-check-input stat-notout" ${r.notOut ? 'checked' : ''}> NO</label>
                      </div>
                    </td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-ballsbowled" style="width: 55px;" value="${r.ballsBowled}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runsconceded" style="width: 50px;" value="${r.runsConceded}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-wickets" style="width: 45px;" value="${r.wickets}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-catches" style="width: 40px;" value="${r.catches}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-stumpings" style="width: 40px;" value="${r.stumpings}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runouts" style="width: 40px;" value="${r.runOuts}"></td>
                  </tr>
                `).join('');
              }
              if (uploadRes.unmatched && uploadRes.unmatched.length > 0) {
                showToast(`Warning: ${uploadRes.unmatched.length} player(s) in CSV could not be matched to squad register.`, 'warning');
              }
            } else if (uploadRes.fileType === 'pdf') {
              const pdfBox = document.getElementById('pdf-extracted-box');
              const pdfText = document.getElementById('pdf-text-content');
              if (pdfBox && pdfText) {
                pdfText.textContent = uploadRes.extractedText || 'No plain text found (scanned image PDF).';
                pdfBox.classList.remove('d-none');
              }
            }
          } catch (err) {
            showToast(`Upload failed: ${err.message}`, 'error');
          } finally {
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = `<i class="bi bi-cloud-arrow-up me-1"></i>Upload & Preview`;
          }
        });

        // Confirm Verified Scores
        document.getElementById('btn-confirm-verified-scores')?.addEventListener('click', async () => {
          const rows = modalEl.querySelectorAll('#score-review-tbody tr');
          const playerStats = [];

          rows.forEach(r => {
            const isIncluded = r.querySelector('.stat-include')?.checked;
            if (!isIncluded) return;

            const playerId = r.getAttribute('data-stat-player-id');
            const playerName = r.querySelector('td:nth-child(2)')?.textContent.trim();
            const runs = parseInt(r.querySelector('.stat-runs')?.value || 0, 10);
            const balls = parseInt(r.querySelector('.stat-balls')?.value || 0, 10);
            const fours = parseInt(r.querySelector('.stat-4s')?.value || 0, 10);
            const sixes = parseInt(r.querySelector('.stat-6s')?.value || 0, 10);
            const batted = r.querySelector('.stat-batted')?.checked;
            const notOut = r.querySelector('.stat-notout')?.checked;
            const ballsBowled = parseInt(r.querySelector('.stat-ballsbowled')?.value || 0, 10);
            const runsConceded = parseInt(r.querySelector('.stat-runsconceded')?.value || 0, 10);
            const wickets = parseInt(r.querySelector('.stat-wickets')?.value || 0, 10);
            const catches = parseInt(r.querySelector('.stat-catches')?.value || 0, 10);
            const stumpings = parseInt(r.querySelector('.stat-stumpings')?.value || 0, 10);
            const runOuts = parseInt(r.querySelector('.stat-runouts')?.value || 0, 10);

            playerStats.push({
              player: playerId,
              playerName,
              batted,
              notOut,
              runs,
              balls,
              fours,
              sixes,
              ballsBowled,
              runsConceded,
              wickets,
              catches,
              stumpings,
              runOuts
            });
          });

          const ourScore = document.getElementById('m-ourScore')?.value;
          const oppositionScore = document.getElementById('m-oppScore')?.value;
          const result = document.getElementById('m-result')?.value;

          try {
            await api.post(`/api/matches/${match._id}/verify-scores`, {
              playerStats,
              ourScore,
              oppositionScore,
              result
            });
            showToast('Official match scores confirmed and season leaderboards updated!', 'success');
            closeModal();
            loadMatches();
          } catch (err) {
            showToast(`Verification failed: ${err.message}`, 'error');
          }
        });
      }
    });
  } catch (err) {
    showToast(`Failed to open match details: ${err.message}`, 'error');
  }
}

/**
 * Log New MCA Fixture Modal
 */
function openCreateFixtureModal() {
  const contentHtml = `
    <form id="create-fixture-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Opponent *</label>
          <input type="text" id="m-opponent" class="form-control-custom" placeholder="e.g. Colombo Colts CC" required>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Competition</label>
          <input type="text" id="m-competition" class="form-control-custom" value="MCA League 2026/27">
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Date *</label>
          <input type="date" id="m-date" class="form-control-custom" value="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Format *</label>
          <select id="m-format" class="form-select-custom">
            <option value="T20">T20</option>
            <option value="T10">T10</option>
            <option value="50 Overs">50 Overs</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Initial Result Status</label>
          <select id="m-result-init" class="form-select-custom">
            <option value="Pending">Pending</option>
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
            <option value="Tie">Tie</option>
            <option value="No result">No result</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Match Venue</label>
          <input type="text" id="m-venue" class="form-control-custom" placeholder="e.g. MCA Grounds, Colombo">
        </div>
        <div class="col-12">
          <label class="form-label-custom">Operational Notes</label>
          <textarea id="m-notes" class="form-control-custom" rows="2" placeholder="Match referee, pitch conditions, team logistics..."></textarea>
        </div>
      </div>
    </form>
  `;

  openModal({
    title: 'Log Official MCA League Fixture',
    contentHtml,
    onOpen: (modalEl) => {
      document.getElementById('modal-btn-save')?.addEventListener('click', async () => {
        const opponent = document.getElementById('m-opponent')?.value;
        const competition = document.getElementById('m-competition')?.value;
        const date = document.getElementById('m-date')?.value;
        const format = document.getElementById('m-format')?.value;
        const result = document.getElementById('m-result-init')?.value;
        const venue = document.getElementById('m-venue')?.value;
        const notes = document.getElementById('m-notes')?.value;

        if (!opponent || !date) {
          showToast('Opponent and date are required.', 'error');
          return;
        }

        try {
          await api.post('/api/matches', {
            opponent,
            competition,
            date,
            format,
            result,
            venue,
            notes
          });
          showToast(`Fixture vs ${opponent} created with linked attendance session.`, 'success');
          closeModal();
          loadMatches();
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        }
      });
    }
  });
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
