/**
 * Akbar Cricket Club — Gear & Inventory View
 * Inventory cards, physical count verification dialog, low-stock threshold rules, and player assignment.
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';

let inventoryList = [];
let currentUser = null;

export async function renderInventory(container, user) {
  currentUser = user;
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Gear & Inventory</h2>
        <div class="small text-muted">Equipment Assets, First Aid Medical Stock & Consumables</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-export-inventory-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Export Register
        </button>
        ${canEdit ? `
          <button class="btn btn-burgundy" id="btn-add-inventory-item">
            <i class="bi bi-plus-lg me-1"></i>New Equipment Record
          </button>
        ` : ''}
      </div>
    </div>

    <!-- 4 Primary Inventory Stat Cards -->
    <div class="row g-3 mb-4" id="inventory-stats-row">
      <div class="col-6 col-lg-3">
        <div class="card-custom p-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="stat-label">Item Records</span>
            <i class="bi bi-box-seam text-muted fs-5"></i>
          </div>
          <div class="stat-value" id="stat-total-items">—</div>
          <div class="small text-muted mt-1">Total catalogued assets</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card-custom p-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="stat-label">Count Pending</span>
            <i class="bi bi-hourglass text-muted fs-5"></i>
          </div>
          <div class="stat-value text-gold" id="stat-count-pending">—</div>
          <div class="small text-muted mt-1">Unverified stock counts</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card-custom p-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="stat-label">Damaged / Lost</span>
            <i class="bi bi-exclamation-octagon text-muted fs-5"></i>
          </div>
          <div class="stat-value text-danger" id="stat-damaged-lost">—</div>
          <div class="small text-muted mt-1">Requires repair / replacement</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card-custom p-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="stat-label">Low Stock (Verified)</span>
            <i class="bi bi-graph-down-arrow text-muted fs-5"></i>
          </div>
          <div class="stat-value text-danger" id="stat-low-stock">—</div>
          <div class="small text-muted mt-1">Below minimum target</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center">
        <div class="col-md-5">
          <div class="input-group">
            <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" id="inventory-search" class="form-control-custom border-start-0" placeholder="Search by asset ID, item name, or location...">
          </div>
        </div>
        <div class="col-6 col-md-3">
          <select id="inventory-category-filter" class="form-select-custom">
            <option value="All">All Categories</option>
            <option value="Cricket Gear">Cricket Gear</option>
            <option value="First Aid">First Aid</option>
            <option value="Shared Equipment">Shared Equipment</option>
            <option value="Consumables">Consumables</option>
          </select>
        </div>
        <div class="col-6 col-md-4">
          <select id="inventory-condition-filter" class="form-select-custom">
            <option value="All">All Conditions</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Inspect">Inspect</option>
            <option value="Damaged">Damaged</option>
            <option value="Retired">Retired</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Inventory Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-list-check me-2 text-danger"></i>Equipment & Supplies Register
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="inventory-table">
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Equipment</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>Inspection / Expiry</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody id="inventory-tbody">
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

  await Promise.all([loadInventoryMetrics(), loadInventoryTable()]);

  document.getElementById('inventory-search')?.addEventListener('input', debounce(loadInventoryTable, 300));
  document.getElementById('inventory-category-filter')?.addEventListener('change', loadInventoryTable);
  document.getElementById('inventory-condition-filter')?.addEventListener('change', loadInventoryTable);

  document.getElementById('btn-export-inventory-csv')?.addEventListener('click', () => {
    window.location.href = '/api/reports/equipment/csv';
  });

  if (canEdit) {
    document.getElementById('btn-add-inventory-item')?.addEventListener('click', () => openEquipmentFormModal(null));
  }
}

async function loadInventoryMetrics() {
  try {
    const data = await api.get('/api/equipment/stats');
    const { stats } = data;
    document.getElementById('stat-total-items').textContent = stats.totalRecords;
    document.getElementById('stat-count-pending').textContent = stats.countPending;
    document.getElementById('stat-damaged-lost').textContent = stats.damagedOrLost;
    document.getElementById('stat-low-stock').textContent = stats.lowStock;
  } catch (err) {
    console.error('Failed to load inventory metrics:', err);
  }
}

async function loadInventoryTable() {
  const search = document.getElementById('inventory-search')?.value || '';
  const category = document.getElementById('inventory-category-filter')?.value || 'All';
  const condition = document.getElementById('inventory-condition-filter')?.value || 'All';
  const tbody = document.getElementById('inventory-tbody');

  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category !== 'All') params.append('category', category);
    if (condition !== 'All') params.append('condition', condition);

    const res = await api.get(`/api/equipment?${params.toString()}`);
    inventoryList = res.equipment;

    if (!inventoryList || inventoryList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No equipment items found.</td></tr>`;
      return;
    }

    const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

    tbody.innerHTML = inventoryList.map(item => {
      const conditionBadgeClass = item.condition === 'Good' ? 'badge bg-success' :
                                  item.condition === 'Fair' ? 'badge bg-info text-dark' :
                                  item.condition === 'Inspect' ? 'badge bg-warning text-dark' :
                                  item.condition === 'Damaged' ? 'badge bg-danger' : 'badge bg-secondary';

      const verificationDisplay = item.countVerified
        ? `<span class="badge bg-success bg-opacity-10 text-success border border-success" style="font-size: 9px;"><i class="bi bi-check2"></i> Verified</span>`
        : `<span class="badge bg-warning bg-opacity-10 text-dark border border-warning" style="font-size: 9px;"><i class="bi bi-hourglass-split"></i> Count pending</span>`;

      const lowStockBadge = item.isLowStock
        ? `<span class="badge bg-danger ms-1" style="font-size: 9px;">Low Stock (Min: ${item.minimumStock})</span>`
        : '';

      const assignedDisplay = item.assignedPlayer
        ? `<div class="small text-muted"><i class="bi bi-person me-1"></i>Assigned: ${item.assignedPlayer.fullName}</div>`
        : '';

      return `
        <tr>
          <td class="fw-bold font-monospace text-main">${item.assetId}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${item.name}</div>
            <div class="small text-muted">${item.location}</div>
            ${assignedDisplay}
          </td>
          <td><span class="badge-role">${item.category}</span></td>
          <td>
            <div class="fw-bold fs-6">${item.quantity} <span class="small text-muted fw-normal">${item.unit}</span></div>
            <div>${verificationDisplay} ${lowStockBadge}</div>
          </td>
          <td><span class="${conditionBadgeClass}">${item.condition}</span></td>
          <td class="small">
            <div>Insp: ${item.lastInspectedDate || 'Awaiting check'}</div>
            ${item.expiryDate ? `<div class="text-muted">Exp: ${item.expiryDate}</div>` : ''}
          </td>
          <td class="text-end text-nowrap">
            ${canEdit ? `
              <button class="btn btn-sm btn-outline-burgundy py-1 px-2 btn-verify-stock" data-item-id="${item.id}" title="Physically verify stock count">
                <i class="bi bi-check2-square me-1"></i>Verify
              </button>
              <button class="btn btn-sm btn-light-custom py-1 px-2 btn-edit-equipment" data-item-id="${item.id}" title="Edit asset details">
                <i class="bi bi-pencil"></i>
              </button>
            ` : `
              <button class="btn btn-sm btn-light-custom py-1 px-2 btn-view-equipment" data-item-id="${item.id}">
                View
              </button>
            `}
          </td>
        </tr>
      `;
    }).join('');

    // Attach verify button handlers
    document.querySelectorAll('.btn-verify-stock').forEach(btn => {
      btn.addEventListener('click', () => {
        const iid = btn.getAttribute('data-item-id');
        openVerifyCountModal(iid);
      });
    });

    // Attach edit button handlers
    document.querySelectorAll('.btn-edit-equipment, .btn-view-equipment').forEach(btn => {
      btn.addEventListener('click', () => {
        const iid = btn.getAttribute('data-item-id');
        const item = inventoryList.find(i => i.id === iid);
        openEquipmentFormModal(item);
      });
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" class="alert alert-danger">${err.message}</td></tr>`;
  }
}

/**
 * Physical Stock Verification Modal
 */
function openVerifyCountModal(itemId) {
  const item = inventoryList.find(i => i.id === itemId);
  if (!item) return;

  const contentHtml = `
    <div>
      <p class="small text-muted mb-3">
        Physically count and verify inventory reserves for <strong>${item.name} (${item.assetId})</strong>.
      </p>

      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Current System Quantity</label>
          <input type="text" class="form-control-custom" value="${item.quantity} ${item.unit}" disabled>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Minimum Stock Target</label>
          <input type="text" class="form-control-custom" value="${item.minimumStock} ${item.unit}" disabled>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Physically Verified Quantity *</label>
          <input type="number" id="v-quantity" class="form-control-custom" value="${item.quantity}" min="0" required>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Verification Notes / Storage Location Audit</label>
          <textarea id="v-notes" class="form-control-custom" rows="2" placeholder="Audit conducted by team official..."></textarea>
        </div>
      </div>
    </div>
  `;

  openModal({
    title: `Verify Physical Stock: ${item.assetId}`,
    contentHtml,
    footerHtml: `
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-verify-stock">Confirm Verification</button>
    `,
    onOpen: (modalEl) => {
      document.getElementById('btn-submit-verify-stock')?.addEventListener('click', async () => {
        const verifiedQuantity = document.getElementById('v-quantity')?.value;
        const notes = document.getElementById('v-notes')?.value;

        if (verifiedQuantity === '' || isNaN(parseInt(verifiedQuantity, 10))) {
          showToast('Please enter a valid count number.', 'error');
          return;
        }

        try {
          await api.put(`/api/equipment/${item.id}/verify-count`, {
            verifiedQuantity: parseInt(verifiedQuantity, 10),
            notes
          });
          showToast(`Physical count verified for ${item.name}.`, 'success');
          closeModal();
          await Promise.all([loadInventoryMetrics(), loadInventoryTable()]);
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        }
      });
    }
  });
}

/**
 * Edit / Create Equipment Modal
 */
async function openEquipmentFormModal(item = null) {
  const isEditing = !!item;
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

  // Fetch squad players for assignment dropdown
  let players = [];
  try {
    const pData = await api.get('/api/players');
    players = pData.players || [];
  } catch (e) {}

  const contentHtml = `
    <form id="equipment-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Asset ID *</label>
          <input type="text" id="eq-assetId" class="form-control-custom font-monospace" placeholder="e.g. ACC-HELM-04" value="${item?.assetId || ''}" required ${isEditing ? 'disabled' : ''}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Item Name *</label>
          <input type="text" id="eq-name" class="form-control-custom" placeholder="e.g. Cricket Helmet - Navy Standard" value="${item?.name || ''}" required ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Category *</label>
          <select id="eq-category" class="form-select-custom" ${!canEdit ? 'disabled' : ''}>
            <option value="Cricket Gear" ${item?.category === 'Cricket Gear' ? 'selected' : ''}>Cricket Gear</option>
            <option value="First Aid" ${item?.category === 'First Aid' ? 'selected' : ''}>First Aid</option>
            <option value="Shared Equipment" ${item?.category === 'Shared Equipment' ? 'selected' : ''}>Shared Equipment</option>
            <option value="Consumables" ${item?.category === 'Consumables' ? 'selected' : ''}>Consumables</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Condition *</label>
          <select id="eq-condition" class="form-select-custom" ${!canEdit ? 'disabled' : ''}>
            <option value="Good" ${item?.condition === 'Good' ? 'selected' : ''}>Good</option>
            <option value="Fair" ${item?.condition === 'Fair' ? 'selected' : ''}>Fair</option>
            <option value="Inspect" ${item?.condition === 'Inspect' ? 'selected' : ''}>Inspect</option>
            <option value="Damaged" ${item?.condition === 'Damaged' ? 'selected' : ''}>Damaged</option>
            <option value="Retired" ${item?.condition === 'Retired' ? 'selected' : ''}>Retired</option>
            <option value="Lost" ${item?.condition === 'Lost' ? 'selected' : ''}>Lost</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Quantity *</label>
          <input type="number" id="eq-quantity" class="form-control-custom" value="${item?.quantity || 1}" min="0" required ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Unit</label>
          <input type="text" id="eq-unit" class="form-control-custom" placeholder="units, pairs, rolls, packs" value="${item?.unit || 'units'}" ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Minimum Target *</label>
          <input type="number" id="eq-minStock" class="form-control-custom" value="${item?.minimumStock || 1}" min="0" required ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Storage Location</label>
          <input type="text" id="eq-location" class="form-control-custom" value="${item?.location || 'Clubhouse Store'}" ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Assigned Squad Member</label>
          <select id="eq-assignedPlayer" class="form-select-custom" ${!canEdit ? 'disabled' : ''}>
            <option value="">None (Clubhouse General Stock)</option>
            ${players.map(p => `
              <option value="${p._id}" ${item?.assignedPlayer?._id === p._id || item?.assignedPlayer === p._id ? 'selected' : ''}>
                ${p.fullName} (${p.company})
              </option>
            `).join('')}
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Expiry Date (if applicable)</label>
          <input type="date" id="eq-expiryDate" class="form-control-custom" value="${item?.expiryDate || ''}" ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Purchase Cost (LKR)</label>
          <input type="number" id="eq-cost" class="form-control-custom" value="${item?.costLKR || 0}" min="0" ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Notes & Observations</label>
          <textarea id="eq-notes" class="form-control-custom" rows="2" ${!canEdit ? 'disabled' : ''}>${item?.notes || ''}</textarea>
        </div>
      </div>
    </form>
  `;

  openModal({
    title: isEditing ? `Edit Asset: ${item.assetId}` : 'Add New Equipment Record',
    contentHtml,
    footerHtml: canEdit ? undefined : `<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>`,
    onOpen: (modalEl) => {
      if (!canEdit) return;

      document.getElementById('modal-btn-save')?.addEventListener('click', async () => {
        const assetId = document.getElementById('eq-assetId')?.value;
        const name = document.getElementById('eq-name')?.value;
        const category = document.getElementById('eq-category')?.value;
        const condition = document.getElementById('eq-condition')?.value;
        const quantity = document.getElementById('eq-quantity')?.value;
        const unit = document.getElementById('eq-unit')?.value;
        const minimumStock = document.getElementById('eq-minStock')?.value;
        const location = document.getElementById('eq-location')?.value;
        const assignedPlayer = document.getElementById('eq-assignedPlayer')?.value;
        const expiryDate = document.getElementById('eq-expiryDate')?.value;
        const costLKR = document.getElementById('eq-cost')?.value;
        const notes = document.getElementById('eq-notes')?.value;

        if (!name || !assetId) {
          showToast('Asset ID and Name are required.', 'error');
          return;
        }

        const bodyData = {
          assetId,
          name,
          category,
          condition,
          quantity: parseInt(quantity, 10),
          unit,
          minimumStock: parseInt(minimumStock, 10),
          location,
          assignedPlayer: assignedPlayer || null,
          expiryDate: expiryDate || null,
          costLKR: parseFloat(costLKR || 0),
          notes
        };

        try {
          if (isEditing) {
            await api.put(`/api/equipment/${item.id}`, bodyData);
            showToast(`Asset ${assetId} updated.`, 'success');
          } else {
            await api.post('/api/equipment', bodyData);
            showToast(`Asset ${assetId} created.`, 'success');
          }
          closeModal();
          await Promise.all([loadInventoryMetrics(), loadInventoryTable()]);
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
