/**
 * Akbar Cricket Club — Damage Reports View
 * Incident tracking with severity levels, photographic evidence, and follow-up resolution notes.
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';

let reportsList = [];
let currentUser = null;

export async function renderDamage(container, user) {
  currentUser = user;
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Damage Reports</h2>
        <div class="small text-muted">Incident Logging, Equipment Safety Hazards & Follow-up Actions</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-light-custom" id="btn-print-damage">
          <i class="bi bi-printer me-1"></i>Print Report
        </button>
        ${canEdit ? `
          <button class="btn btn-burgundy" id="btn-file-damage">
            <i class="bi bi-exclamation-triangle me-1"></i>Report Damaged Asset
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Damage Reports Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-exclamation-octagon me-2 text-danger"></i>Damage Incidents Register
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="damage-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Asset / Equipment</th>
                <th>Severity</th>
                <th>Incident Details</th>
                <th>Reporter</th>
                <th>Follow-up Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody id="damage-tbody">
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

  await loadDamageReports();

  document.getElementById('btn-print-damage')?.addEventListener('click', () => {
    window.print();
  });

  if (canEdit) {
    document.getElementById('btn-file-damage')?.addEventListener('click', openFileDamageModal);
  }
}

async function loadDamageReports() {
  const tbody = document.getElementById('damage-tbody');
  try {
    const res = await api.get('/api/damage-reports');
    reportsList = res.reports;

    if (!reportsList || reportsList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No active damage incidents recorded. All club assets operational.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = reportsList.map(rep => {
      const eq = rep.equipment || {};
      const sevBadge = rep.severity === 'Unsafe' ? 'badge bg-danger' :
                       rep.severity === 'High' ? 'badge bg-warning text-dark' :
                       rep.severity === 'Medium' ? 'badge bg-info text-dark' : 'badge bg-secondary';

      const statusBadge = rep.status === 'Open' ? 'badge bg-danger' :
                          rep.status === 'In progress' ? 'badge bg-warning text-dark' : 'badge bg-success';

      const photoBtn = rep.photo ? `
        <a href="/api/uploads/${rep.photo}" target="_blank" class="small text-decoration-none text-danger d-inline-block mt-1">
          <i class="bi bi-image me-1"></i>Incident Photo
        </a>
      ` : '';

      return `
        <tr>
          <td class="fw-bold">${rep.date}</td>
          <td>
            <div class="fw-bold text-main">${eq.name || 'Equipment'}</div>
            <div class="small font-monospace text-muted">${eq.assetId || ''}</div>
          </td>
          <td><span class="${sevBadge}">${rep.severity}</span></td>
          <td class="small" style="max-width: 300px;">
            <div class="fw-bold">${rep.incidentDetails}</div>
            ${rep.correctiveAction ? `<div class="text-muted mt-1">Action: ${rep.correctiveAction}</div>` : ''}
            ${photoBtn}
          </td>
          <td>${rep.reporter}</td>
          <td>
            <span class="${statusBadge}">${rep.status}</span>
            ${rep.followUps && rep.followUps.length > 0 ? `<div class="small text-muted mt-1">${rep.followUps.length} follow-up(s)</div>` : ''}
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-burgundy py-1 px-2 btn-followup-damage" data-report-id="${rep._id}">
              Follow-up &rarr;
            </button>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll('.btn-followup-damage').forEach(btn => {
      btn.addEventListener('click', () => {
        const rid = btn.getAttribute('data-report-id');
        openFollowUpModal(rid);
      });
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" class="alert alert-danger">${err.message}</td></tr>`;
  }
}

/**
 * Open File Damage Report Modal
 */
async function openFileDamageModal() {
  let equipmentItems = [];
  try {
    const res = await api.get('/api/equipment');
    equipmentItems = res.equipment || [];
  } catch (e) {}

  const contentHtml = `
    <form id="damage-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Damaged Equipment *</label>
          <select id="dmg-equipmentId" class="form-select-custom" required>
            <option value="">Select equipment...</option>
            ${equipmentItems.map(item => `
              <option value="${item.id}">${item.assetId} — ${item.name} (${item.location})</option>
            `).join('')}
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Incident Date *</label>
          <input type="date" id="dmg-date" class="form-control-custom" value="${new Date().toISOString().split('T')[0]}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Severity Level *</label>
          <select id="dmg-severity" class="form-select-custom" required>
            <option value="Low">Low (Cosmetic wear, operational)</option>
            <option value="Medium" selected>Medium (Impaired functionality)</option>
            <option value="High">High (Severe structural defect)</option>
            <option value="Unsafe">Unsafe (Hazardous - mandatory decommission)</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Incident Evidence Photo (optional)</label>
          <input type="file" id="dmg-photo" class="form-control-custom" accept="image/*">
        </div>
        <div class="col-12">
          <label class="form-label-custom">Incident Details *</label>
          <textarea id="dmg-details" class="form-control-custom" rows="2" placeholder="Describe how damage occurred, affected components, broken seams..." required></textarea>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Corrective Action Taken</label>
          <input type="text" id="dmg-action" class="form-control-custom" placeholder="e.g. Quarantined in Clubhouse back room, sent to supplier for repair">
        </div>
      </div>
    </form>
  `;

  openModal({
    title: 'File Equipment Damage Report',
    contentHtml,
    footerHtml: `
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-damage">File Report</button>
    `,
    onOpen: (modalEl) => {
      document.getElementById('btn-submit-damage')?.addEventListener('click', async () => {
        const equipmentId = document.getElementById('dmg-equipmentId')?.value;
        const date = document.getElementById('dmg-date')?.value;
        const severity = document.getElementById('dmg-severity')?.value;
        const incidentDetails = document.getElementById('dmg-details')?.value;
        const correctiveAction = document.getElementById('dmg-action')?.value;
        const photoFile = document.getElementById('dmg-photo')?.files[0];

        if (!equipmentId || !date || !incidentDetails) {
          showToast('Equipment, date, and incident details are required.', 'error');
          return;
        }

        const formData = new FormData();
        formData.append('equipmentId', equipmentId);
        formData.append('date', date);
        formData.append('severity', severity);
        formData.append('incidentDetails', incidentDetails);
        formData.append('correctiveAction', correctiveAction);
        if (photoFile) {
          formData.append('incidentPhoto', photoFile);
        }

        const submitBtn = document.getElementById('btn-submit-damage');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Filing...`;

        try {
          await api.upload('/api/damage-reports', formData);
          showToast('Damage report filed and asset condition updated.', 'success');
          closeModal();
          loadDamageReports();
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'File Report';
        }
      });
    }
  });
}

/**
 * Open Follow-up & Resolution Modal
 */
function openFollowUpModal(reportId) {
  const report = reportsList.find(r => r._id === reportId);
  if (!report) return;

  const contentHtml = `
    <div>
      <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
        <div class="fw-bold text-main fs-6">${report.equipment?.name || 'Asset'} (${report.equipment?.assetId || ''})</div>
        <div class="small text-danger fw-bold mt-1">Severity: ${report.severity} &bull; Filed by ${report.reporter} on ${report.date}</div>
        <div class="small text-muted mt-2">${report.incidentDetails}</div>
      </div>

      <div class="mb-3">
        <div class="stat-label mb-2">Follow-up History</div>
        ${report.followUps && report.followUps.length > 0 ? `
          <ul class="list-group list-group-flush small mb-3">
            ${report.followUps.map(f => `
              <li class="list-group-item bg-transparent px-0 py-2 border-bottom">
                <div class="d-flex justify-content-between text-muted" style="font-size: 11px;">
                  <span>${f.date} &bull; ${f.author}</span>
                </div>
                <div class="fw-bold text-main mt-1">${f.note}</div>
              </li>
            `).join('')}
          </ul>
        ` : `
          <div class="text-muted small mb-3">No follow-ups recorded yet.</div>
        `}
      </div>

      <div class="row g-3 pt-3 border-top" style="border-color: var(--border-color) !important;">
        <div class="col-md-6">
          <label class="form-label-custom">Update Report Status</label>
          <select id="fu-status" class="form-select-custom">
            <option value="Open" ${report.status === 'Open' ? 'selected' : ''}>Open</option>
            <option value="In progress" ${report.status === 'In progress' ? 'selected' : ''}>In progress</option>
            <option value="Resolved" ${report.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Add Follow-up Note / Repair Action Taken</label>
          <textarea id="fu-note" class="form-control-custom" rows="2" placeholder="Replacement latch received, sent to technician, or tested..."></textarea>
        </div>
        <div class="col-12">
          <div class="small text-muted">
            <i class="bi bi-shield-exclamation me-1 text-warning"></i><strong>Important Rule:</strong> Resolving a damage report records completion of administrative follow-up, but does NOT automatically certify equipment safe. Equipment must undergo a formal weekly inspection before returning to active play.
          </div>
        </div>
      </div>
    </div>
  `;

  openModal({
    title: 'Damage Incident Follow-up',
    contentHtml,
    footerHtml: `
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      <button type="button" class="btn btn-burgundy" id="btn-save-follow-up">Save Follow-up</button>
    `,
    onOpen: (modalEl) => {
      document.getElementById('btn-save-follow-up')?.addEventListener('click', async () => {
        const status = document.getElementById('fu-status')?.value;
        const note = document.getElementById('fu-note')?.value;

        if (!note && !status) {
          showToast('Please enter a note or status change.', 'error');
          return;
        }

        try {
          await api.post(`/api/damage-reports/${report._id}/follow-up`, { status, note });
          showToast('Follow-up record saved.', 'success');
          closeModal();
          loadDamageReports();
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        }
      });
    }
  });
}
