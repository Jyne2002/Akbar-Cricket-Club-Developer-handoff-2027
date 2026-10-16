/**
 * Akbar Cricket Club — Settings & Users View
 * User account details, database status, dark mode toggle, role explanations, and admin user creation.
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';

let currentUser = null;

export async function renderSettings(container, user) {
  currentUser = user;
  const isAdmin = currentUser?.role === 'Administrator';
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Settings & User Administration</h2>
        <div class="small text-muted">System Configuration, Security Credentials & Role-Based Access Control</div>
      </div>

      ${isAdmin ? `
        <button class="btn btn-burgundy" id="btn-create-user-modal">
          <i class="bi bi-person-plus-fill me-1"></i>Provision User Account
        </button>
      ` : ''}
    </div>

    <div class="row g-4">
      <!-- Left Column: User Profile & Security -->
      <div class="col-lg-6">
        <!-- Profile Card -->
        <div class="card-custom p-4 mb-4">
          <h5 class="fw-bold text-main fs-6 mb-3">
            <i class="bi bi-person-badge text-danger me-2"></i>Signed-in Personnel Profile
          </h5>
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="user-avatar-initials" style="width: 52px; height: 52px; font-size: 18px;">
              ${currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AC'}
            </div>
            <div>
              <div class="fw-bold fs-6 text-main">${currentUser?.name || 'Administrator'}</div>
              <div class="small text-muted">${currentUser?.email || 'admin@akbarcricket.lk'}</div>
              <span class="badge bg-danger mt-1">${currentUser?.role || 'Administrator'}</span>
            </div>
          </div>

          <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
            <div class="stat-label mb-1">Last Workspace Session</div>
            <div class="small text-muted">${currentUser?.lastLogin ? new Date(currentUser.lastLogin).toLocaleString() : 'Active session'}</div>
          </div>

          <!-- Change Password Form -->
          <h6 class="stat-label text-gold mb-2 mt-4">Update Workspace Password</h6>
          <form id="change-password-form">
            <div class="mb-2">
              <label class="form-label-custom">Current Password</label>
              <input type="password" id="pw-current" class="form-control-custom" placeholder="••••••••••••" required>
            </div>
            <div class="mb-3">
              <label class="form-label-custom">New Password (minimum 8 characters)</label>
              <input type="password" id="pw-new" class="form-control-custom" placeholder="••••••••••••" required>
            </div>
            <button type="submit" class="btn btn-outline-burgundy btn-sm" id="btn-submit-change-password">
              Update Password
            </button>
          </form>
        </div>

        <!-- Appearance & Environment -->
        <div class="card-custom p-4">
          <h5 class="fw-bold text-main fs-6 mb-3">
            <i class="bi bi-palette text-danger me-2"></i>Workspace Appearance & Environment
          </h5>
          <div class="d-flex justify-content-between align-items-center py-2 border-bottom" style="border-color: var(--border-color) !important;">
            <div>
              <div class="fw-bold text-main" style="font-size: 13px;">Interface Theme</div>
              <div class="small text-muted">Switch between Corporate Navy Light and Dark modes</div>
            </div>
            <div class="form-check form-switch fs-5">
              <input class="form-check-input" type="checkbox" id="settings-theme-switch" ${currentTheme === 'dark' ? 'checked' : ''}>
            </div>
          </div>

          <div class="mt-3">
            <div class="stat-label mb-1">Database Connectivity & Storage</div>
            <div class="small text-muted">
              Connected Engine: <strong class="text-main">MongoDB (Mongoose ODM)</strong><br>
              Field Encryption: <strong class="text-main">AES-256-GCM (National Identity Cards)</strong><br>
              Uploads Directory: <strong class="text-main">/uploads (Protected stream delivery)</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: RBAC Descriptions & Provisioned Accounts -->
      <div class="col-lg-6">
        <!-- RBAC Role Capabilities Guide -->
        <div class="card-custom p-4 mb-4">
          <h5 class="fw-bold text-main fs-6 mb-3">
            <i class="bi bi-shield-shaded text-gold me-2"></i>Role-Based Access Matrix
          </h5>
          <ul class="list-group list-group-flush small">
            <li class="list-group-item bg-transparent px-0 py-2 border-bottom" style="border-color: var(--border-color) !important;">
              <span class="badge bg-danger me-2">Administrator</span>
              <div class="text-muted mt-1">
                Full system control, confidential employment records, user account provisioning, system settings, and record deletion.
              </div>
            </li>
            <li class="list-group-item bg-transparent px-0 py-2 border-bottom" style="border-color: var(--border-color) !important;">
              <span class="badge bg-warning text-dark me-2">Manager</span>
              <div class="text-muted mt-1">
                Access to confidential player records, squad CSV imports, match score verification, and club operations.
              </div>
            </li>
            <li class="list-group-item bg-transparent px-0 py-2 border-bottom" style="border-color: var(--border-color) !important;">
              <span class="badge bg-info text-dark me-2">Coach</span>
              <div class="text-muted mt-1">
                Access to technical cricket details, attendance roll calls, match lineups, gear inspections, and task boards. Private HR/contact fields strictly redacted.
              </div>
            </li>
            <li class="list-group-item bg-transparent px-0 py-2">
              <span class="badge bg-secondary me-2">Viewer</span>
              <div class="text-muted mt-1">
                Read-only operational access to squad cards, leaderboards, match fixtures, and public reports.
              </div>
            </li>
          </ul>
        </div>

        <!-- System User List (Administrator Only) -->
        ${isAdmin ? `
          <div class="card-custom p-4">
            <h5 class="fw-bold text-main fs-6 mb-3">
              <i class="bi bi-people-fill text-danger me-2"></i>Provisioned System Accounts
            </h5>
            <div id="users-list-container">
              <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Attach change password handler
  document.getElementById('change-password-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('pw-current')?.value;
    const newPassword = document.getElementById('pw-new')?.value;

    try {
      await api.put('/api/auth/change-password', { currentPassword, newPassword });
      showToast('Password updated successfully.', 'success');
      document.getElementById('change-password-form').reset();
    } catch (err) {
      showToast(`Password update failed: ${err.message}`, 'error');
    }
  });

  // Attach Theme switch listener
  document.getElementById('settings-theme-switch')?.addEventListener('change', (e) => {
    const isDark = e.target.checked;
    const newTheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('acc_theme', newTheme);
    showToast(`Switched to ${newTheme} mode.`, 'info');
  });

  // Load user accounts if Admin
  if (isAdmin) {
    loadUserAccounts();
    document.getElementById('btn-create-user-modal')?.addEventListener('click', openCreateUserModal);
  }
}

async function loadUserAccounts() {
  const container = document.getElementById('users-list-container');
  if (!container) return;

  try {
    const res = await api.get('/api/users');
    const users = res.users || [];

    container.innerHTML = `
      <ul class="list-group list-group-flush small">
        ${users.map(u => `
          <li class="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0 py-2 border-bottom" style="border-color: var(--border-color) !important;">
            <div>
              <div class="fw-bold text-main">${u.name}</div>
              <div class="text-muted" style="font-size: 11px;">${u.email}</div>
            </div>
            <span class="badge ${u.role === 'Administrator' ? 'bg-danger' : u.role === 'Manager' ? 'bg-warning text-dark' : 'badge-role'}">
              ${u.role}
            </span>
          </li>
        `).join('')}
      </ul>
    `;
  } catch (err) {
    container.innerHTML = `<div class="text-danger small">${err.message}</div>`;
  }
}

/**
 * Provision User Account Modal (Administrator only)
 */
function openCreateUserModal() {
  const contentHtml = `
    <form id="create-user-form">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-custom">Full Name *</label>
          <input type="text" id="u-name" class="form-control-custom" placeholder="e.g. Aslam Rizvi" required>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Work Email *</label>
          <input type="email" id="u-email" class="form-control-custom" placeholder="e.g. aslam.r@akbar.com" required>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Account Role *</label>
          <select id="u-role" class="form-select-custom" required>
            <option value="Viewer">Viewer (Read-only operational)</option>
            <option value="Coach">Coach (Lineups, attendance, gear)</option>
            <option value="Manager">Manager (Confidential records, imports)</option>
            <option value="Administrator">Administrator (Full security control)</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Temporary Password *</label>
          <input type="password" id="u-password" class="form-control-custom" placeholder="Minimum 8 characters" required>
        </div>
      </div>
    </form>
  `;

  openModal({
    title: 'Provision New User Account',
    contentHtml,
    footerHtml: `
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-create-user">Create Account</button>
    `,
    onOpen: (modalEl) => {
      document.getElementById('btn-submit-create-user')?.addEventListener('click', async () => {
        const name = document.getElementById('u-name')?.value;
        const email = document.getElementById('u-email')?.value;
        const role = document.getElementById('u-role')?.value;
        const password = document.getElementById('u-password')?.value;

        if (!name || !email || !password || !role) {
          showToast('All fields are required.', 'error');
          return;
        }

        if (password.length < 8) {
          showToast('Password must be at least 8 characters.', 'error');
          return;
        }

        try {
          await api.post('/api/users', { name, email, role, password });
          showToast(`Account created for ${name} (${role}).`, 'success');
          closeModal();
          loadUserAccounts();
        } catch (err) {
          showToast(`Failed to create user: ${err.message}`, 'error');
        }
      });
    }
  });
}
