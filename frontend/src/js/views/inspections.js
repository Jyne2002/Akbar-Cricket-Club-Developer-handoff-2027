/**
 * Akbar Cricket Club — Weekly Inspections View
 * Log weekly gear checks with condition assessments, photographic evidence, and historical audit trail.
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';

let inspectionsList = [];
let currentUser = null;

export async function renderInspections(container, user) {
  currentUser = user;
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Weekly Inspections</h2>
        <div class="small text-muted">Safety Audits, Protective Gear Inspections & Evidence Records</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-light-custom" id="btn-print-inspections">
          <i class="bi bi-printer me-1"></i>Print Audit Log
        </button>
        ${canEdit ? `
          <button class="btn btn-burgundy" id="btn-new-inspection">
            <i class="bi bi-shield-plus me-1"></i>Log Inspection Check
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Inspections Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-shield-check me-2 text-danger"></i>Weekly Inspection Log & Evidence
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="inspections-table">
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Asset / Equipment</th>
                <th>Inspector</th>
                <th>Condition Evaluated</th>
                <th>Notes / Corrective Action</th>
                <th>Photo Evidence</th>
              </tr>
            </thead>
            <tbody id="inspections-tbody">
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

  await loadInspections();

  document.getElementById('btn-print-inspections')?.addEventListener('click', () => {
    window.print();
  });

  if (canEdit) {
    document.getElementById('btn-new-inspection')?.addEventListener('click', openNewInspectionModal);
  }
}

async function loadInspections() {
  const tbody = document.getElementById('inspections-tbody');
  try {
    const res = await api.get('/api/inspections');
    inspectionsList = res.inspections;

    if (!inspectionsList || inspectionsList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No inspection records logged yet. Click "Log Inspection Check" to conduct a weekly gear check.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = inspectionsList.map(ins => {
      const eq = ins.equipment || {};
      const condBadge = ins.condition === 'Good' ? 'badge bg-success' :
                        ins.condition === 'Fair' ? 'badge bg-info text-dark' :
                        ins.condition === 'Inspect' ? 'badge bg-warning text-dark' :
                        ins.condition === 'Damaged' ? 'badge bg-danger' : 'badge bg-secondary';

      const photoDisplay = ins.photo ? `
        <a href="/api/uploads/${ins.photo}" target="_blank" class="btn btn-sm btn-light-custom py-0 px-2" style="font-size: 11px;">
          <i class="bi bi-image me-1"></i>View Evidence
        </a>
      ` : '<span class="text-muted small">No photo</span>';

      return `
        <tr>
          <td class="fw-bold">${ins.date}</td>
          <td>
            <div class="fw-bold text-main">${eq.name || 'Unknown Item'}</div>
            <div class="small font-monospace text-muted">${eq.assetId || ''} (${eq.category || ''})</div>
          </td>
          <td>${ins.inspector}</td>
          <td><span class="${condBadge}">${ins.condition}</span></td>
          <td class="small">
            <div>${ins.notes || 'Routine check completed.'}</div>
            ${ins.correctiveAction ? `<div class="text-danger mt-1"><strong>Action:</strong> ${ins.correctiveAction}</div>` : ''}
          </td>
          <td>${photoDisplay}</td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6" class="alert alert-danger">${err.message}</td></tr>`;
  }
}

/**
 * Log Weekly Inspection Modal
 */
async function openNewInspectionModal() {
  let equipmentItems = [];
  try {
    const res = await api.get('/api/equipment');
    equipmentItems = res.equipment || [];
  } catch (e) {}

  const contentHtml = `
    <form id="inspection-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Asset / Equipment *</label>
          <select id="ins-equipmentId" class="form-select-custom" required>
            <option value="">Select equipment to inspect...</option>
            ${equipmentItems.map(item => `
              <option value="${item.id}">
                ${item.assetId} — ${item.name} (${item.condition})
              </option>
            `).join('')}
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Inspection Date *</label>
          <input type="date" id="ins-date" class="form-control-custom" value="${new Date().toISOString().split('T')[0]}" required>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Condition Evaluated *</label>
          <select id="ins-condition" class="form-select-custom" required>
            <option value="Good">Good (Safe for training & matches)</option>
            <option value="Fair">Fair (Operational with minor wear)</option>
            <option value="Inspect">Inspect (Requires further testing)</option>
            <option value="Damaged">Damaged (Unsafe - remove from play)</option>
            <option value="Retired">Retired</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Upload Evidence Photo (optional)</label>
          <input type="file" id="ins-photo" class="form-control-custom" accept="image/*">
        </div>

        <div class="col-12">
          <label class="form-label-custom">Inspection Observations / Notes</label>
          <textarea id="ins-notes" class="form-control-custom" rows="2" placeholder="Wear patterns, strap integrity, helmet shell check..."></textarea>
        </div>

        <div class="col-12">
          <label class="form-label-custom">Corrective Action Taken or Recommended</label>
          <input type="text" id="ins-action" class="form-control-custom" placeholder="e.g. Cleaned and returned to kit bag, or quarantined for repair">
        </div>

        <div class="col-12">
          <div class="p-2 rounded bg-light border small text-muted">
            <i class="bi bi-info-circle me-1"></i>Logging an inspection updates the equipment condition and last inspection date while retaining full history. An inspection does not alter stock quantity.
          </div>
        </div>
      </div>
    </form>
  `;

  openModal({
    title: 'Conduct Weekly Gear Inspection',
    contentHtml,
    footerHtml: `
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-inspection">Save Inspection</button>
    `,
    onOpen: (modalEl) => {
      document.getElementById('btn-submit-inspection')?.addEventListener('click', async () => {
        const equipmentId = document.getElementById('ins-equipmentId')?.value;
        const date = document.getElementById('ins-date')?.value;
        const condition = document.getElementById('ins-condition')?.value;
        const notes = document.getElementById('ins-notes')?.value;
        const correctiveAction = document.getElementById('ins-action')?.value;
        const photoFile = document.getElementById('ins-photo')?.files[0];

        if (!equipmentId || !date || !condition) {
          showToast('Equipment, date, and condition are required.', 'error');
          return;
        }

        const formData = new FormData();
        formData.append('equipmentId', equipmentId);
        formData.append('date', date);
        formData.append('condition', condition);
        formData.append('notes', notes);
        formData.append('correctiveAction', correctiveAction);
        if (photoFile) {
          formData.append('evidencePhoto', photoFile);
        }

        const submitBtn = document.getElementById('btn-submit-inspection');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Saving...`;

        try {
          await api.upload('/api/inspections', formData);
          showToast('Weekly inspection logged successfully!', 'success');
          closeModal();
          loadInspections();
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Save Inspection';
        }
      });
    }
  });
}
