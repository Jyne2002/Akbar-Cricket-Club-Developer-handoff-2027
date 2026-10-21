/**
 * Akbar Cricket Club — Practice & Attendance View
 * Sessions management, roll call entry with status dropdowns, rate calculations, and export.
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';
import { escapeHtml } from '../utils/html.js';

let sessionsList = [];
let currentUser = null;

export async function renderAttendance(container, user) {
  currentUser = user;
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Practice & Attendance</h2>
        <div class="small text-muted">2026–2027 Season Sessions and Roll Call Register</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-export-attendance-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Export CSV
        </button>
        <button class="btn btn-light-custom" id="btn-print-attendance">
          <i class="bi bi-printer me-1"></i>Print Register
        </button>
        ${canEdit ? `
          <button class="btn btn-burgundy" id="btn-create-session">
            <i class="bi bi-plus-lg me-1"></i>Schedule Session
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Filter Toolbar -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center register-filters">
        <div class="col-md-6">
          <div class="input-group register-search">
            <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" id="attendance-search" class="form-control-custom border-start-0" placeholder="Search sessions by title...">
          </div>
        </div>
        <div class="col-md-4">
          <select id="attendance-type-filter" class="form-select-custom">
            <option value="All">All Types (Practice & Match)</option>
            <option value="Practice">Practice Sessions</option>
            <option value="Match">Official Match Attendances</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Sessions Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-calendar3 me-2 text-danger"></i>Session Attendance History
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="sessions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Session</th>
                <th>Type</th>
                <th>Attendance Rate</th>
                <th>Completion</th>
                <th class="text-end">Action</th>
              </tr>
            </thead>
            <tbody id="sessions-tbody">
              <tr>
                <td colspan="6" class="text-center py-4">
                  <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  await loadSessions();

  // Attach search and filter events
  document.getElementById('attendance-search')?.addEventListener('input', debounce(loadSessions, 300));
  document.getElementById('attendance-type-filter')?.addEventListener('change', loadSessions);

  // Actions
  document.getElementById('btn-export-attendance-csv')?.addEventListener('click', () => {
    window.location.href = '/api/reports/attendance/csv';
  });

  document.getElementById('btn-print-attendance')?.addEventListener('click', () => {
    window.print();
  });

  if (canEdit) {
    document.getElementById('btn-create-session')?.addEventListener('click', () => openSessionEditModal());
  }
}

async function loadSessions() {
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);
  const canDelete = ['Administrator', 'Manager'].includes(currentUser?.role);
  const search = document.getElementById('attendance-search')?.value || '';
  const type = document.getElementById('attendance-type-filter')?.value || 'All';
  const tbody = document.getElementById('sessions-tbody');

  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (type !== 'All') params.append('type', type);

    const res = await api.get(`/api/sessions?${params.toString()}`);
    sessionsList = res.sessions;

    if (!sessionsList || sessionsList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No training or match sessions found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = sessionsList.map(s => {
      const typeBadge = s.type === 'Match' ? 'badge-bowler' : 'badge-batsman';
      const rateColor = s.rateDisplay !== '—' ? 'color: var(--success-green); font-weight: 700;' : 'color: var(--text-muted);';

      return `
        <tr>
          <td class="text-nowrap fw-bold">${s.date}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${escapeHtml(s.title)}</div>
            <div class="small text-muted">${escapeHtml(s.venue || 'No venue specified')}</div>
          </td>
          <td><span class="badge-role ${typeBadge}">${s.type}</span></td>
          <td style="${rateColor}; font-size: 14px;">${s.rateDisplay}</td>
          <td><span class="badge-role">${s.completionText}</span></td>
          <td class="text-end">
            ${canEdit ? `
              <button type="button" class="btn btn-sm btn-outline-burgundy py-1 px-3 btn-edit-session" data-session-id="${s.id}">
                <i class="bi bi-pencil me-1"></i>Edit Session
              </button>
            ` : ''}
            <button class="btn btn-sm btn-burgundy py-1 px-3 btn-open-rollcall" data-session-id="${s.id}">
              <i class="bi bi-person-check me-1"></i>Roll Call
            </button>
            ${canDelete ? `
              <button type="button" class="btn btn-sm btn-outline-danger py-1 px-3 btn-delete-session" data-session-id="${s.id}">
                <i class="bi bi-trash me-1"></i>Delete
              </button>
            ` : ''}
          </td>
        </tr>
      `;
    }).join('');

    // Attach roll call click listeners
    document.querySelectorAll('.btn-open-rollcall').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-session-id');
        openRollCallModal(sid);
      });
    });
    document.querySelectorAll('.btn-edit-session').forEach(button => {
      button.addEventListener('click', () => {
        const session = sessionsList.find(s => s.id === button.dataset.sessionId);
        if (session) openSessionEditModal(session);
      });
    });
    document.querySelectorAll('.btn-delete-session').forEach(button => {
      button.addEventListener('click', () => {
        const session = sessionsList.find(s => s.id === button.dataset.sessionId);
        if (session) openSessionDeleteModal(session);
      });
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6" class="alert alert-danger">${err.message}</td></tr>`;
  }
}

function openSessionDeleteModal(session) {
  openModal({
    title: 'Delete Session',
    contentHtml: `<p>Delete <strong>${escapeHtml(session.title)}</strong> (${escapeHtml(session.date)})?</p>
      <p class="small text-muted mb-0">This permanently deletes the session and its saved roll call. This cannot be undone.</p>`,
    footerHtml: `
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-danger" id="btn-confirm-delete-session">Delete Session</button>
    `,
    onOpen: modalEl => {
      const deleteButton = modalEl.querySelector('#btn-confirm-delete-session');
      deleteButton.addEventListener('click', async () => {
        deleteButton.disabled = true;
        try {
          await api.delete(`/api/sessions/${session.id}`);
          showToast('Session deleted successfully.', 'success');
          closeModal();
          await loadSessions();
        } catch (err) {
          showToast(`Failed to delete session: ${err.message}`, 'error');
          deleteButton.disabled = false;
        }
      });
    }
  });
}

/**
 * Roll Call Modal
 * Allows marking individual players with: Not marked, Attended, Late, Absent, Excused.
 * Includes "Set all Attended" and calculates rate live without treating unmarked as absent.
 */
async function openRollCallModal(sessionId) {
  try {
    const data = await api.get(`/api/sessions/${sessionId}`);
    const { session, stats } = data;
    const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

    const statuses = ['Not marked', 'Attended', 'Late', 'Absent', 'Excused'];

    const contentHtml = `
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style="background: var(--body-bg); border: 1px solid var(--border-color);">
          <div>
            <h5 class="mb-1 text-main fw-bold">${escapeHtml(session.title)}</h5>
            <div class="small text-muted"><i class="bi bi-calendar3 me-1"></i>${session.date} &bull; <i class="bi bi-geo-alt me-1"></i>${escapeHtml(session.venue || 'Venue TBD')}</div>
          </div>
          <div class="text-end">
            <div class="stat-label">Current Attendance Rate</div>
            <div class="stat-value" id="modal-attendance-rate" style="color: var(--success-green); font-size: 24px;">
              ${stats.rate !== null ? stats.rate + '%' : '—'}
            </div>
            <div class="small text-muted" id="modal-marked-summary">${stats.markedCount}/${stats.total} players marked</div>
          </div>
        </div>

        ${canEdit ? `
          <div class="d-flex justify-content-between align-items-center mb-3">
            <button type="button" class="btn btn-outline-burgundy btn-sm" id="btn-set-all-attended">
              <i class="bi bi-check-all me-1"></i>Set all Attended
            </button>
            <div class="small text-muted">
              <i class="bi bi-info-circle me-1"></i>Unmarked entries are excluded from attendance rate denominator.
            </div>
          </div>
        ` : ''}

        <div style="max-height: 480px; overflow-y: auto;">
          <table class="table-custom mb-0">
            <thead>
              <tr>
                <th>Player</th>
                <th>Company</th>
                <th>Status</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody id="rollcall-table-body">
              ${(session.rollCall || []).map(r => {
                const p = r.player || {};
                return `
                  <tr data-player-id="${p._id}">
                    <td class="fw-bold text-main">${escapeHtml(p.fullName || 'Unknown')}</td>
                    <td class="small text-muted">${escapeHtml(p.company || '—')}</td>
                    <td style="width: 170px;">
                      <select class="form-select-custom rollcall-status-select" ${!canEdit ? 'disabled' : ''}>
                        ${statuses.map(st => `
                          <option value="${st}" ${r.status === st ? 'selected' : ''}>${st}</option>
                        `).join('')}
                      </select>
                    </td>
                    <td>
                      <input type="text" class="form-control-custom rollcall-note-input" placeholder="Optional note..." value="${escapeHtml(r.note)}" ${!canEdit ? 'readonly' : ''}>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    openModal({
      title: 'Session Roll Call',
      contentHtml,
      footerHtml: `
        <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
        ${canEdit ? `<button type="button" class="btn btn-burgundy" id="btn-save-roll-call">Save Roll Call</button>` : ''}
      `,
      onOpen: (modalEl) => {
        // Quick update rate calculation in modal
        const updateModalRate = () => {
          const selects = modalEl.querySelectorAll('.rollcall-status-select');
          let attended = 0, late = 0, absent = 0, excused = 0, notMarked = 0;
          selects.forEach(s => {
            if (s.value === 'Attended') attended++;
            else if (s.value === 'Late') late++;
            else if (s.value === 'Absent') absent++;
            else if (s.value === 'Excused') excused++;
            else notMarked++;
          });
          const marked = attended + late + absent + excused;
          const rate = marked > 0 ? Math.round(((attended + late) / marked) * 1000) / 10 : null;

          const rateEl = document.getElementById('modal-attendance-rate');
          const summEl = document.getElementById('modal-marked-summary');
          if (rateEl) rateEl.textContent = rate !== null ? `${rate}%` : '—';
          if (summEl) summEl.textContent = `${marked}/${selects.length} players marked`;
        };

        modalEl.querySelectorAll('.rollcall-status-select').forEach(sel => {
          sel.addEventListener('change', updateModalRate);
        });

        // Set all Attended action
        document.getElementById('btn-set-all-attended')?.addEventListener('click', () => {
          modalEl.querySelectorAll('.rollcall-status-select').forEach(sel => {
            sel.value = 'Attended';
          });
          updateModalRate();
          showToast('All squad players set to Attended.', 'info');
        });

        // Save Roll Call
        document.getElementById('btn-save-roll-call')?.addEventListener('click', async () => {
          const rows = modalEl.querySelectorAll('#rollcall-table-body tr');
          const rollCallData = [];
          rows.forEach(r => {
            const playerId = r.getAttribute('data-player-id');
            const status = r.querySelector('.rollcall-status-select')?.value || 'Not marked';
            const note = r.querySelector('.rollcall-note-input')?.value || '';
            rollCallData.push({ player: playerId, status, note });
          });

          try {
            await api.put(`/api/sessions/${session._id}/roll-call`, { rollCall: rollCallData });
            showToast('Roll call saved successfully!', 'success');
            closeModal();
            loadSessions();
          } catch (err) {
            showToast(`Failed to save roll call: ${err.message}`, 'error');
          }
        });
      }
    });
  } catch (err) {
    showToast(`Error: ${err.message}`, 'error');
  }
}

/**
 * Schedule or edit session details without changing the saved roll call.
 */
function openSessionEditModal(session = null) {
  const isEditing = !!session;
  const contentHtml = `
    <form id="create-session-form">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-custom">Session Title *</label>
          <input type="text" id="s-title" class="form-control-custom" placeholder="e.g. NCC Indoor Practice - Nets" value="${escapeHtml(session?.title)}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Session Type *</label>
          <select id="s-type" class="form-select-custom">
            <option value="Practice" ${session?.type === 'Practice' ? 'selected' : ''}>Practice</option>
            <option value="Match" ${session?.type === 'Match' ? 'selected' : ''}>Match Attendance</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Date *</label>
          <input type="date" id="s-date" class="form-control-custom" value="${escapeHtml(session?.date || new Date().toISOString().split('T')[0])}" required>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Venue</label>
          <input type="text" id="s-venue" class="form-control-custom" placeholder="e.g. Oval Indoor Nets (MCA SPL)" value="${escapeHtml(session?.venue)}">
        </div>
        <div class="col-12">
          <label class="form-label-custom">Operational Notes</label>
          <textarea id="s-notes" class="form-control-custom" rows="2" placeholder="Specific training drills, equipment requirements...">${escapeHtml(session?.notes)}</textarea>
        </div>
      </div>
    </form>
  `;

  openModal({
    title: isEditing ? 'Edit Session Details' : 'Schedule Practice or Match Attendance',
    contentHtml,
    onOpen: (modalEl) => {
      const saveButton = modalEl.querySelector('#modal-btn-save');
      saveButton?.addEventListener('click', async () => {
        const title = document.getElementById('s-title')?.value.trim();
        const type = document.getElementById('s-type')?.value;
        const date = document.getElementById('s-date')?.value;
        const venue = document.getElementById('s-venue')?.value;
        const notes = document.getElementById('s-notes')?.value;

        if (!title || !date) {
          showToast('Title and date are required.', 'error');
          return;
        }
        if (!modalEl.querySelector('#create-session-form').reportValidity()) return;

        saveButton.disabled = true;
        try {
          if (isEditing) {
            await api.put(`/api/sessions/${session.id}`, { title, type, date, venue, notes });
          } else {
            await api.post('/api/sessions', { title, type, date, venue, notes });
          }
          showToast(`Session "${title}" ${isEditing ? 'updated' : 'scheduled'}.`, 'success');
          closeModal();
          loadSessions();
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        } finally {
          saveButton.disabled = false;
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
