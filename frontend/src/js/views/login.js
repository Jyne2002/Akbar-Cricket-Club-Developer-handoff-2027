/**
 * Akbar Cricket Club — Login View
 * Split-screen corporate login page (53% branding / 47% login form)
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';

export function renderLogin(container, onLoginSuccess) {
  container.innerHTML = `
    <div class="login-split-page">
      <!-- Left Branding Panel (53% width on desktop) -->
      <div class="login-brand-panel">
        <div class="login-top-strip"></div>
        <div class="login-circles-decor"></div>

        <div>
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="brand-crest mb-0" style="width: 50px; height: 50px;">
              <span class="brand-crest-gold fs-4">ACC</span>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: var(--gold);">AKBAR BROTHERS</div>
              <div style="font-size: 13px; font-weight: 700; color: #ffffff; letter-spacing: 0.8px;">SPORTS MANAGEMENT</div>
            </div>
          </div>
        </div>

        <div style="position: relative; z-index: 2; margin: 40px 0;">
          <h1 style="font-size: 38px; font-weight: 900; line-height: 1.15; color: #ffffff; margin-bottom: 6px;">
            Built for the team.
          </h1>
          <h2 style="font-size: 38px; font-weight: 900; line-height: 1.15; color: var(--gold); margin-bottom: 24px;">
            Ready for every innings.
          </h2>
          <p style="font-size: 14.5px; color: rgba(233, 239, 246, 0.85); max-width: 480px; line-height: 1.6; margin-bottom: 32px;">
            One secure home for MCA match records, player profiles, practice attendance and club equipment.
          </p>

          <div class="d-flex flex-wrap gap-2">
            <span class="season-badge" style="background: rgba(255,255,255,0.08); border-color: rgba(220,175,101,0.3); padding: 6px 12px; font-size: 11px;">
              <i class="bi bi-shield-shaded text-gold me-1"></i> Team operations
            </span>
            <span class="season-badge" style="background: rgba(255,255,255,0.08); border-color: rgba(220,175,101,0.3); padding: 6px 12px; font-size: 11px;">
              <i class="bi bi-graph-up text-gold me-1"></i> Live leaderboards
            </span>
            <span class="season-badge" style="background: rgba(255,255,255,0.08); border-color: rgba(220,175,101,0.3); padding: 6px 12px; font-size: 11px;">
              <i class="bi bi-box-seam text-gold me-1"></i> Inventory controls
            </span>
          </div>
        </div>

        <div style="position: relative; z-index: 2;">
          <div style="font-size: 11px; color: rgba(233, 239, 246, 0.5);">
            © 2026 Akbar Cricket Club • Official Management System • All rights reserved
          </div>
        </div>
      </div>

      <!-- Right Form Panel (47% width on desktop) -->
      <div class="login-form-panel">
        <div class="login-form-card">
          <div class="mb-4">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: var(--burgundy); margin-bottom: 6px;">
              ADMINISTRATION PORTAL • 2026/27
            </div>
            <h3 style="font-size: 26px; font-weight: 800; margin-bottom: 6px;">Welcome back</h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 0;">
              Sign in to your secure Akbar Cricket Club workspace.
            </p>
          </div>

          <!-- Inline error alert -->
          <div id="login-error-alert" class="alert alert-danger d-none py-2 px-3" style="font-size: 12.5px; border-radius: 8px;">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <span id="login-error-text"></span>
          </div>

          <form id="login-form">
            <div class="mb-3">
              <label class="form-label-custom" for="login-email">Work email</label>
              <div class="input-group">
                <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
                  <i class="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  id="login-email"
                  class="form-control-custom border-start-0"
                  placeholder="admin@akbarcricket.lk"
                  value="admin@akbarcricket.lk"
                  required
                  autocomplete="username"
                >
              </div>
            </div>

            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <label class="form-label-custom mb-0" for="login-password">Password</label>
              </div>
              <div class="input-group">
                <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
                  <i class="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  id="login-password"
                  class="form-control-custom border-start-0"
                  placeholder="••••••••••••"
                  required
                  autocomplete="current-password"
                >
              </div>
            </div>

            <button type="submit" id="login-submit-btn" class="btn btn-burgundy w-100 py-2 justify-content-center" style="font-size: 13.5px;">
              <span>Sign in to workspace</span>
              <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </form>

          <div class="mt-4 pt-3 border-top text-center" style="border-color: var(--border-color) !important;">
            <div style="font-size: 11px; color: var(--text-muted);">
              <i class="bi bi-shield-lock-fill text-muted me-1"></i>
              Protected records • Role-based access • MongoDB
            </div>
            <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 4px;">
              Authorized team officials only. Contact Club Administration for access.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach submission handler
  const form = document.getElementById('login-form');
  const errorAlert = document.getElementById('login-error-alert');
  const errorText = document.getElementById('login-error-text');
  const submitBtn = document.getElementById('login-submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorAlert.classList.add('d-none');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Authenticating...`;

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const data = await api.post('/api/auth/login', { email, password });
      showToast(`Welcome back, ${data.user.name}!`, 'success');
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      errorText.textContent = err.message || 'Authentication failed. Please verify your credentials.';
      errorAlert.classList.remove('d-none');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Sign in to workspace</span><i class="bi bi-arrow-right ms-1"></i>`;
    }
  });
}
