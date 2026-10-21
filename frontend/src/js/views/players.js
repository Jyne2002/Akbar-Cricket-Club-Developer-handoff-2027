/**
 * Akbar Cricket Club — Player Profiles View
 * 2027 Selected Squad with 4-column responsive grid, search/filter, profile modal, and CSV import.
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';
import { escapeHtml } from '../utils/html.js';

const companies = [
  'Akbar Brothers (Pvt) Ltd',
  'Quick Tea (Pvt) Ltd',
  'Falcon Trading (Pvt) Ltd',
  'Land and Building (Pvt) Ltd',
  'Ceylon Coffeeworks (Pvt) Ltd',
  'Colombo Coffee Company (Pvt) Ltd',
  'Glowbal Retails (Pvt) Ltd',
  'Coffee Collective (Pvt) Ltd'
];

let currentPlayersList = [];
let currentUserProfile = null;

export async function renderPlayers(container, currentUser) {
  currentUserProfile = currentUser;
  const isPrivileged = ['Administrator', 'Manager'].includes(currentUser?.role);
  const canEditCricket = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">2027 Selected Squad</h2>
        <div class="small text-muted" id="player-count-label">Loading squad register...</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        ${isPrivileged ? `
          <button class="btn btn-outline-burgundy" id="btn-import-squad-csv">
            <i class="bi bi-file-earmark-spreadsheet me-1"></i>Import Squad CSV
          </button>
          <button class="btn btn-burgundy" id="btn-add-player-manual">
            <i class="bi bi-person-plus me-1"></i>Add Player
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center register-filters">
        <div class="col-md-5">
          <div class="input-group register-search">
            <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" id="player-search-input" class="form-control-custom border-start-0" placeholder="Search by player name...">
          </div>
        </div>
        <div class="col-6 col-md-3">
          <select id="player-company-filter" class="form-select-custom">
            <option value="All">All Companies</option>
            <option value="Akbar Brothers (Pvt) Ltd">Akbar Brothers (Pvt) Ltd</option>
            <option value="Quick Tea (Pvt) Ltd">Quick Tea (Pvt) Ltd</option>
            <option value="Falcon Trading (Pvt) Ltd">Falcon Trading (Pvt) Ltd</option>
            <option value="Land and Building (Pvt) Ltd">Land and Building (Pvt) Ltd</option>
            <option value="Ceylon Coffeeworks (Pvt) Ltd">Ceylon Coffeeworks (Pvt) Ltd</option>
            <option value="Colombo Coffee Company (Pvt) Ltd">Colombo Coffee Company (Pvt) Ltd</option>
            <option value="Glowbal Retails (Pvt) Ltd">Glowbal Retails (Pvt) Ltd</option>
            <option value="Coffee Collective (Pvt) Ltd">Coffee Collective (Pvt) Ltd</option>
          </select>
        </div>
        <div class="col-6 col-md-4">
          <select id="player-role-filter" class="form-select-custom">
            <option value="All">All Cricket Roles</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="Batting allrounder">Batting allrounder</option>
            <option value="Bowling allrounder">Bowling allrounder</option>
            <option value="Wicketkeeper batsman">Wicketkeeper batsman</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 4-Column Player Cards Grid -->
    <div class="row g-3" id="players-grid-container">
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-danger" role="status"></div>
      </div>
    </div>
  `;

  // Fetch players from API
  await loadAndRenderPlayersGrid();

  // Attach filter listeners
  document.getElementById('player-search-input')?.addEventListener('input', debounce(loadAndRenderPlayersGrid, 300));
  document.getElementById('player-company-filter')?.addEventListener('change', loadAndRenderPlayersGrid);
  document.getElementById('player-role-filter')?.addEventListener('change', loadAndRenderPlayersGrid);

  // Privileged actions
  if (isPrivileged) {
    document.getElementById('btn-import-squad-csv')?.addEventListener('click', openCsvImportModal);
    document.getElementById('btn-add-player-manual')?.addEventListener('click', () => openPlayerEditModal(null));
  }
}

async function loadAndRenderPlayersGrid() {
  const isPrivileged = ['Administrator', 'Manager'].includes(currentUserProfile?.role);
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUserProfile?.role);
  const search = document.getElementById('player-search-input')?.value || '';
  const company = document.getElementById('player-company-filter')?.value || 'All';
  const cricketRole = document.getElementById('player-role-filter')?.value || 'All';

  const gridContainer = document.getElementById('players-grid-container');
  const countLabel = document.getElementById('player-count-label');

  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (company !== 'All') params.append('company', company);
    if (cricketRole !== 'All') params.append('cricketRole', cricketRole);

    const res = await api.get(`/api/players?${params.toString()}`);
    currentPlayersList = res.players;

    if (countLabel) {
      countLabel.textContent = `Displaying ${res.totalCount} active squad members`;
    }

    if (!res.players || res.players.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-12 text-center py-5 text-muted">
          <i class="bi bi-people fs-2 d-block mb-2"></i>
          No squad players match your search or filter criteria.
        </div>
      `;
      return;
    }

    // Render 4 columns on large screens
    gridContainer.innerHTML = res.players.map(p => {
      const initials = p.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      const s = p.stats || {};
      const roleBadgeClass = p.cricketRole === 'Batsman' ? 'badge-batsman' :
                             p.cricketRole === 'Bowler' ? 'badge-bowler' :
                             p.cricketRole.includes('allrounder') ? 'badge-allrounder' : 'badge-role';

      return `
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card-custom h-100 p-3 d-flex flex-column justify-content-between player-clickable-card" data-player-id="${p._id}" style="cursor: pointer;">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="d-flex align-items-center gap-2">
                  <div class="user-avatar-initials" style="width: 40px; height: 40px; font-size: 14px;">
                    ${initials}
                  </div>
                  <div>
                    <div class="fw-bold text-main" style="font-size: 13.5px; line-height: 1.2;">${escapeHtml(p.fullName)}</div>
                    <div class="small text-muted" style="font-size: 11px;">${escapeHtml(p.company)}</div>
                  </div>
                </div>
                ${p.jerseyNumber !== null && p.jerseyNumber !== undefined ? `
                  <span class="badge border" style="background: rgba(22, 36, 58, 0.05); color: var(--text-main); font-weight: 800; font-size: 12px;">
                    #${p.jerseyNumber}
                  </span>
                ` : ''}
              </div>

              <div class="d-flex flex-wrap gap-1 mb-3">
                <span class="badge-role ${roleBadgeClass}">${p.cricketRole}</span>
                <span class="badge-role" style="font-size: 9.5px;">${p.battingHand}</span>
              </div>
            </div>

            <!-- Season Stats Pill -->
            <div class="p-2 rounded border" style="background-color: var(--body-bg); border-color: var(--border-color) !important;">
              <div class="row text-center g-0">
                <div class="col-4 border-end" style="border-color: var(--border-color) !important;">
                  <div class="stat-label" style="font-size: 9.5px;">Matches</div>
                  <div class="fw-bold text-main" style="font-size: 14px;">${s.matches || 0}</div>
                </div>
                <div class="col-4 border-end" style="border-color: var(--border-color) !important;">
                  <div class="stat-label" style="font-size: 9.5px;">Runs</div>
                  <div class="fw-bold text-danger" style="font-size: 14px;">${s.runs || 0}</div>
                </div>
                <div class="col-4">
                  <div class="stat-label" style="font-size: 9.5px;">Wickets</div>
                  <div class="fw-bold text-main" style="font-size: 14px;">${s.wickets || 0}</div>
                </div>
              </div>
            </div>
            ${canEdit ? `
              <div class="d-flex gap-2 mt-3">
                <button type="button" class="btn btn-sm btn-outline-burgundy btn-edit-player" data-player-id="${p._id}">
                  <i class="bi bi-pencil me-1"></i>Edit
                </button>
                ${isPrivileged ? `
                  <button type="button" class="btn btn-sm btn-outline-danger btn-delete-player" data-player-id="${p._id}">
                    <i class="bi bi-trash me-1"></i>Delete
                  </button>
                ` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Attach card click handlers
    document.querySelectorAll('.player-clickable-card').forEach(card => {
      card.addEventListener('click', () => {
        const pid = card.getAttribute('data-player-id');
        openPlayerProfileModal(pid);
      });
    });
    document.querySelectorAll('.btn-edit-player, .btn-delete-player').forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        const player = currentPlayersList.find(p => p._id === button.dataset.playerId);
        if (!player) return;
        if (button.classList.contains('btn-edit-player')) openPlayerEditModal(player);
        else openPlayerDeleteModal(player);
      });
    });
  } catch (err) {
    gridContainer.innerHTML = `<div class="col-12 alert alert-danger">${err.message}</div>`;
  }
}

/**
 * Open Player Full Profile Modal
 */
async function openPlayerProfileModal(playerId) {
  try {
    const data = await api.get(`/api/players/${playerId}`);
    const { player, assignedEquipment, attendanceHistory } = data;
    const isPrivileged = ['Administrator', 'Manager'].includes(currentUserProfile?.role);
    const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUserProfile?.role);
    const s = player.stats || {};

    const contentHtml = `
      <div class="row g-4">
        <!-- Cricket & Employment Overview -->
        <div class="col-md-6 border-end" style="border-color: var(--border-color) !important;">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="user-avatar-initials" style="width: 52px; height: 52px; font-size: 18px;">
              ${player.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 class="mb-0 text-main">${escapeHtml(player.fullName)}</h4>
              <div class="text-muted small">${escapeHtml(player.company)}</div>
              ${player.jerseyNumber ? `<span class="badge bg-danger mt-1">Jersey #${player.jerseyNumber}</span>` : ''}
            </div>
          </div>

          <h6 class="stat-label mt-3 mb-2 text-gold">Cricket Technical Profile</h6>
          <table class="table table-sm table-borderless small mb-3">
            <tr><td class="text-muted w-50">Cricket Role:</td><td class="fw-bold text-main">${player.cricketRole}</td></tr>
            <tr><td class="text-muted">Batting Hand:</td><td class="fw-bold text-main">${player.battingHand}</td></tr>
            <tr><td class="text-muted">Bowling Arm:</td><td class="fw-bold text-main">${player.bowlingArm}</td></tr>
            <tr><td class="text-muted">Bowling Style:</td><td class="fw-bold text-main">${player.bowlingStyle || 'N/A'}</td></tr>
            <tr><td class="text-muted">Notes:</td><td>${player.notes || 'None'}</td></tr>
          </table>

          <!-- Confidential Information (Admin & Manager only) -->
          ${isPrivileged ? `
            <div class="p-3 rounded border mt-3" style="background: rgba(158, 35, 50, 0.04); border-color: rgba(158, 35, 50, 0.2) !important;">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="stat-label text-danger"><i class="bi bi-shield-lock-fill me-1"></i>Confidential Employment Details</span>
                <span class="badge bg-secondary" style="font-size: 9px;">Privileged</span>
              </div>
              <table class="table table-sm table-borderless small mb-0">
                <tr><td class="text-muted w-50">Work Email:</td><td class="fw-bold text-main">${player.workEmail || '—'}</td></tr>
                <tr><td class="text-muted">Phone Number:</td><td class="fw-bold text-main">${player.phone || '—'}</td></tr>
                <tr><td class="text-muted">EPF / Employee No:</td><td class="fw-bold text-main">${player.epfNumber || '—'}</td></tr>
                <tr><td class="text-muted">National Identity (NIC):</td><td class="fw-bold text-main font-monospace">${player.nic || '—'}</td></tr>
                <tr><td class="text-muted">Joining Date:</td><td class="fw-bold text-main">${player.joiningDate || '—'}</td></tr>
                <tr><td class="text-muted">Worksite Location:</td><td class="fw-bold text-main">${player.worksite || '—'}</td></tr>
                <tr><td class="text-muted">HOD / Reporting Manager:</td><td class="fw-bold text-main">${player.reportingManager || '—'}</td></tr>
                ${player.emergencyContact && player.emergencyContact.name ? `
                  <tr><td class="text-muted">Emergency Contact:</td><td class="fw-bold text-main">${player.emergencyContact.name} (${player.emergencyContact.phone} - ${player.emergencyContact.relationship})</td></tr>
                ` : ''}
              </table>
            </div>
          ` : `
            <div class="p-2 rounded bg-light border text-muted small mt-3">
              <i class="bi bi-lock-fill me-1"></i>Confidential HR records restricted to Administrators & Managers.
            </div>
          `}
        </div>

        <!-- Verified Season Statistics & Club Operations -->
        <div class="col-md-6">
          <h6 class="stat-label mb-2 text-gold">2026–2027 Verified Match Statistics</h6>
          <div class="row g-2 text-center mb-3">
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Matches</div><div class="fw-bold text-main">${s.matches || 0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Runs</div><div class="fw-bold text-danger">${s.runs || 0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Wickets</div><div class="fw-bold text-main">${s.wickets || 0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Field Pts</div><div class="fw-bold text-gold">${s.fieldingPoints || 0}</div></div></div>
          </div>

          <table class="table table-sm small mb-3">
            <tr><td class="text-muted">Balls Faced:</td><td class="fw-bold">${s.ballsFaced || 0}</td><td class="text-muted">Fours / Sixes:</td><td class="fw-bold">${s.fours || 0} / ${s.sixes || 0}</td></tr>
            <tr><td class="text-muted">Balls Bowled:</td><td class="fw-bold">${s.ballsBowled || 0}</td><td class="text-muted">Runs Conceded:</td><td class="fw-bold">${s.runsConceded || 0}</td></tr>
            <tr><td class="text-muted">Catches:</td><td class="fw-bold">${s.catches || 0}</td><td class="text-muted">Stump / Run-out:</td><td class="fw-bold">${s.stumpings || 0} / ${s.runOuts || 0}</td></tr>
          </table>

          <h6 class="stat-label mb-2 text-gold">Assigned Club Equipment</h6>
          ${assignedEquipment && assignedEquipment.length > 0 ? `
            <ul class="list-group list-group-flush small mb-3">
              ${assignedEquipment.map(eq => `
                <li class="list-group-item d-flex justify-content-between px-0 py-1 bg-transparent">
                  <span><strong>${eq.assetId}</strong> — ${eq.name}</span>
                  <span class="badge-role">${eq.condition}</span>
                </li>
              `).join('')}
            </ul>
          ` : `
            <div class="text-muted small mb-3">No club gear currently assigned to this player.</div>
          `}

          <h6 class="stat-label mb-2 text-gold">Recent Session Attendance</h6>
          ${attendanceHistory && attendanceHistory.length > 0 ? `
            <div class="d-flex flex-column gap-1 small">
              ${attendanceHistory.slice(0, 5).map(att => `
                <div class="d-flex justify-content-between align-items-center py-1 border-bottom" style="border-color: var(--border-color) !important;">
                  <span>${att.date} &bull; ${att.sessionTitle}</span>
                  <span class="badge-status badge-status-${att.status.toLowerCase().replace(/\s+/g, '')}">${att.status}</span>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-muted small">No session records logged.</div>
          `}
        </div>
      </div>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      ${isPrivileged ? `
        <button type="button" class="btn btn-outline-danger" id="btn-delete-player-profile">
          <i class="bi bi-trash me-1"></i>Delete Player
        </button>
      ` : ''}
      ${canEdit ? `
        <button type="button" class="btn btn-burgundy" id="btn-edit-player-profile">
          <i class="bi bi-pencil me-1"></i>Edit Profile
        </button>
      ` : ''}
    `;

    openModal({
      title: `${escapeHtml(player.fullName)} — Squad Record`,
      contentHtml,
      footerHtml,
      onOpen: (modalEl) => {
        document.getElementById('btn-delete-player-profile')?.addEventListener('click', () => openPlayerDeleteModal(player));
        document.getElementById('btn-edit-player-profile')?.addEventListener('click', () => {
          closeModal();
          openPlayerEditModal(player);
        });
      }
    });
  } catch (err) {
    showToast(`Failed to load player details: ${err.message}`, 'error');
  }
}

/**
 * Open Player Edit / Add Modal
 */
function openPlayerEditModal(player = null) {
  const isEditing = !!player;
  const isPrivileged = ['Administrator', 'Manager'].includes(currentUserProfile?.role);
  const isCustomCompany = !!player?.company && !companies.includes(player.company);

  const contentHtml = `
    <form id="player-form-dialog">
      <div class="row g-3">
        <!-- 2 Columns on desktop, 1 on mobile -->
        <div class="col-md-6">
          <label class="form-label-custom">Full Name *</label>
          <input type="text" id="p-fullName" class="form-control-custom" value="${escapeHtml(player?.fullName)}" required ${!isPrivileged && isEditing ? 'readonly' : ''}>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Company *</label>
          <select id="p-company" class="form-select-custom" ${!isPrivileged && isEditing ? 'disabled' : ''}>
            ${companies.map(company => `<option value="${company}" ${player?.company === company ? 'selected' : ''}>${company}</option>`).join('')}
            <option value="Other" ${isCustomCompany ? 'selected' : ''}>Other</option>
          </select>
          <div id="p-company-other-group" class="mt-2 ${isCustomCompany ? '' : 'd-none'}">
            <label for="p-company-other" class="form-label-custom">Company Name *</label>
            <input type="text" id="p-company-other" class="form-control-custom" placeholder="Enter company name" value="${escapeHtml(isCustomCompany && player.company !== 'Other' ? player.company : '')}" ${!isPrivileged && isEditing ? 'disabled' : ''}>
          </div>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Cricket Role</label>
          <select id="p-cricketRole" class="form-select-custom">
            <option value="Not set" ${player?.cricketRole === 'Not set' ? 'selected' : ''}>Not set</option>
            <option value="Batsman" ${player?.cricketRole === 'Batsman' ? 'selected' : ''}>Batsman</option>
            <option value="Bowler" ${player?.cricketRole === 'Bowler' ? 'selected' : ''}>Bowler</option>
            <option value="Batting allrounder" ${player?.cricketRole === 'Batting allrounder' ? 'selected' : ''}>Batting allrounder</option>
            <option value="Bowling allrounder" ${player?.cricketRole === 'Bowling allrounder' ? 'selected' : ''}>Bowling allrounder</option>
            <option value="Wicketkeeper batsman" ${player?.cricketRole === 'Wicketkeeper batsman' ? 'selected' : ''}>Wicketkeeper batsman</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Batting Hand</label>
          <select id="p-battingHand" class="form-select-custom">
            <option value="Not set" ${player?.battingHand === 'Not set' ? 'selected' : ''}>Not set</option>
            <option value="Right hand" ${player?.battingHand === 'Right hand' ? 'selected' : ''}>Right hand</option>
            <option value="Left hand" ${player?.battingHand === 'Left hand' ? 'selected' : ''}>Left hand</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Bowling Arm</label>
          <select id="p-bowlingArm" class="form-select-custom">
            <option value="Not set" ${player?.bowlingArm === 'Not set' ? 'selected' : ''}>Not set</option>
            <option value="Right arm" ${player?.bowlingArm === 'Right arm' ? 'selected' : ''}>Right arm</option>
            <option value="Left arm" ${player?.bowlingArm === 'Left arm' ? 'selected' : ''}>Left arm</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Bowling Style</label>
          <input type="text" id="p-bowlingStyle" class="form-control-custom" placeholder="e.g. Off spin, Fast, Orthodox" value="${escapeHtml(player?.bowlingStyle)}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Jersey Number</label>
          <input type="number" id="p-jerseyNumber" class="form-control-custom" placeholder="e.g. 7" value="${player?.jerseyNumber ?? ''}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Technical Notes</label>
          <input type="text" id="p-notes" class="form-control-custom" placeholder="Coaching or matchday notes" value="${escapeHtml(player?.notes)}">
        </div>

        ${isPrivileged ? `
          <div class="col-12 mt-3 pt-3 border-top" style="border-color: var(--border-color) !important;">
            <div class="fw-bold text-danger small mb-2"><i class="bi bi-lock-fill me-1"></i>Confidential Employment & Contact Data</div>
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Phone Number</label>
            <input type="text" id="p-phone" class="form-control-custom" value="${escapeHtml(player?.phone)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Work Email</label>
            <input type="email" id="p-workEmail" class="form-control-custom" value="${escapeHtml(player?.workEmail)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">EPF / Employee Number (Preserves leading 0s)</label>
            <input type="text" id="p-epfNumber" class="form-control-custom" value="${escapeHtml(player?.epfNumber)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">National Identity Card (NIC - Encrypted)</label>
            <input type="text" id="p-nic" class="form-control-custom" placeholder="NIC number will be encrypted at rest" value="${escapeHtml(player?.nic)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Joining Date</label>
            <input type="date" id="p-joiningDate" class="form-control-custom" value="${escapeHtml(player?.joiningDate)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Worksite Location</label>
            <input type="text" id="p-worksite" class="form-control-custom" value="${escapeHtml(player?.worksite)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">HOD / Reporting Manager</label>
            <input type="text" id="p-reportingManager" class="form-control-custom" value="${escapeHtml(player?.reportingManager)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Name</label>
            <input type="text" id="p-emergencyContactName" class="form-control-custom" value="${escapeHtml(player?.emergencyContact?.name)}">
          </div>
          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Phone</label>
            <input type="text" id="p-emergencyContactPhone" class="form-control-custom" value="${escapeHtml(player?.emergencyContact?.phone)}">
          </div>
          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Relationship</label>
            <input type="text" id="p-emergencyContactRelationship" class="form-control-custom" value="${escapeHtml(player?.emergencyContact?.relationship)}">
          </div>
        ` : ''}
      </div>
    </form>
  `;

  openModal({
    title: isEditing ? `Edit ${escapeHtml(player.fullName)}` : 'Add Squad Member',
    contentHtml,
    onOpen: (modalEl) => {
      const companySelect = modalEl.querySelector('#p-company');
      const customCompanyInput = modalEl.querySelector('#p-company-other');
      const updateCompanyInput = () => {
        const showCustomCompany = companySelect.value === 'Other';
        modalEl.querySelector('#p-company-other-group').classList.toggle('d-none', !showCustomCompany);
        customCompanyInput.required = showCustomCompany && isPrivileged;
        customCompanyInput.disabled = !showCustomCompany || !isPrivileged;
      };
      companySelect.addEventListener('change', updateCompanyInput);
      updateCompanyInput();

      const saveButton = modalEl.querySelector('#modal-btn-save');
      saveButton?.addEventListener('click', async () => {
        const fullName = document.getElementById('p-fullName')?.value;
        if (!fullName || !fullName.trim()) {
          showToast('Full name is required.', 'error');
          return;
        }

        const company = companySelect.value === 'Other'
          ? (isPrivileged ? customCompanyInput.value.trim() : player.company)
          : companySelect.value;
        if (isPrivileged && !company) {
          showToast('Please enter the company name.', 'error');
          customCompanyInput.focus();
          return;
        }
        if (!modalEl.querySelector('#player-form-dialog').reportValidity()) return;

        const bodyData = {
          fullName,
          company,
          cricketRole: document.getElementById('p-cricketRole')?.value,
          battingHand: document.getElementById('p-battingHand')?.value,
          bowlingArm: document.getElementById('p-bowlingArm')?.value,
          bowlingStyle: document.getElementById('p-bowlingStyle')?.value,
          jerseyNumber: document.getElementById('p-jerseyNumber')?.value,
          notes: document.getElementById('p-notes')?.value
        };

        if (isPrivileged) {
          bodyData.phone = document.getElementById('p-phone')?.value;
          bodyData.workEmail = document.getElementById('p-workEmail')?.value;
          bodyData.epfNumber = document.getElementById('p-epfNumber')?.value;
          bodyData.nic = document.getElementById('p-nic')?.value;
          bodyData.joiningDate = document.getElementById('p-joiningDate')?.value;
          bodyData.worksite = document.getElementById('p-worksite')?.value;
          bodyData.reportingManager = document.getElementById('p-reportingManager')?.value;
          bodyData.emergencyContact = {
            name: document.getElementById('p-emergencyContactName')?.value,
            phone: document.getElementById('p-emergencyContactPhone')?.value,
            relationship: document.getElementById('p-emergencyContactRelationship')?.value
          };
        }

        saveButton.disabled = true;
        try {
          if (isEditing) {
            await api.put(`/api/players/${player._id}`, bodyData);
            showToast(`Updated profile for ${fullName}.`, 'success');
          } else {
            await api.post('/api/players', bodyData);
            showToast(`Player ${fullName} registered to 2027 squad.`, 'success');
          }
          closeModal();
          loadAndRenderPlayersGrid();
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        } finally {
          saveButton.disabled = false;
        }
      });
    }
  });
}

/**
 * Confirm removal from the active squad without erasing attendance or match history.
 */
function openPlayerDeleteModal(player) {
  openModal({
    title: 'Delete Player',
    contentHtml: `<p>Delete <strong>${escapeHtml(player.fullName)}</strong> from the active squad?</p>
      <p class="small text-muted mb-0">Existing attendance, match, and equipment records will be retained.</p>`,
    footerHtml: `
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-danger" id="btn-confirm-delete-player">Delete Player</button>
    `,
    onOpen: modalEl => {
      const deleteButton = modalEl.querySelector('#btn-confirm-delete-player');
      deleteButton.addEventListener('click', async () => {
        deleteButton.disabled = true;
        try {
          await api.delete(`/api/players/${player._id}`);
          showToast(`Player ${player.fullName} removed from the active squad.`, 'success');
          closeModal();
          await loadAndRenderPlayersGrid();
        } catch (err) {
          showToast(`Failed to delete player: ${err.message}`, 'error');
          deleteButton.disabled = false;
        }
      });
    }
  });
}

/**
 * Open CSV Import Modal
 */
function openCsvImportModal() {
  const contentHtml = `
    <div>
      <p class="small text-muted mb-3">
        Upload a squad CSV file. Existing players are matched by full name and their records updated without erasing existing details. New players are automatically created. Leading zeros in EPF/employee numbers are strictly preserved.
      </p>

      <div class="mb-3">
        <label class="form-label-custom">Select CSV File</label>
        <input type="file" id="csv-import-file-input" class="form-control-custom" accept=".csv">
      </div>

      <div class="p-3 rounded bg-light border small text-muted">
        <div class="fw-bold text-main mb-1">Expected CSV Columns:</div>
        <code>Full Name, Company, Cricket Role, Batting Hand, Bowling Arm, Bowling Style, Jersey Number, Phone, Work Email, EPF Number, Joining Date, NIC, Worksite, Reporting Manager</code>
        <div class="mt-2">
          <a href="/templates/sample_players_import.csv" download class="text-danger fw-bold text-decoration-none">
            <i class="bi bi-download me-1"></i>Download Sample CSV Template
          </a>
        </div>
      </div>

      <div id="import-results-box" class="mt-3 d-none"></div>
    </div>
  `;

  openModal({
    title: 'Import Squad Register (CSV)',
    contentHtml,
    footerHtml: `
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-csv-import">Start Import</button>
    `,
    onOpen: (modalEl) => {
      document.getElementById('btn-submit-csv-import')?.addEventListener('click', async () => {
        const fileInput = document.getElementById('csv-import-file-input');
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
          showToast('Please select a CSV file to upload.', 'error');
          return;
        }

        const formData = new FormData();
        formData.append('csvFile', fileInput.files[0]);

        const btn = document.getElementById('btn-submit-csv-import');
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Processing...`;

        const resultsBox = document.getElementById('import-results-box');

        try {
          const res = await api.upload('/api/players/import-csv', formData);
          resultsBox.className = 'mt-3 p-3 rounded bg-success bg-opacity-10 border border-success small';
          resultsBox.innerHTML = `
            <div class="fw-bold text-success mb-1"><i class="bi bi-check-circle-fill me-1"></i>${res.message}</div>
            <div>New players created: <strong>${res.createdCount}</strong></div>
            <div>Existing players updated: <strong>${res.updatedCount}</strong></div>
            ${res.errors && res.errors.length > 0 ? `<div class="text-danger mt-1">Warnings: ${res.errors.join('; ')}</div>` : ''}
          `;
          resultsBox.classList.remove('d-none');
          showToast('CSV squad import successful!', 'success');
          loadAndRenderPlayersGrid();
        } catch (err) {
          resultsBox.className = 'mt-3 p-3 rounded bg-danger bg-opacity-10 border border-danger small text-danger';
          resultsBox.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-1"></i>${err.message}`;
          resultsBox.classList.remove('d-none');
          showToast(`Import error: ${err.message}`, 'error');
        } finally {
          btn.disabled = false;
          btn.innerHTML = 'Start Import';
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
