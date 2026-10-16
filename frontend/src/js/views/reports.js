/**
 * Akbar Cricket Club — Reports & Exports View
 * 6 Official Club Reports with CSV exports and clean printable layouts.
 */

import { api } from '../api.js';

export async function renderReports(container) {
  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Reports & Exports</h2>
        <div class="small text-muted">Official Club Registers, Season Records, CSV Exports & Printable Documents</div>
      </div>
    </div>

    <!-- 6 Report Cards Grid -->
    <div class="row g-4">
      <!-- 1. 2027 Player Register -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-person-lines-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">2027 Player Register</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Complete official squad roster including corporate entities, technical cricket roles, batting hands, and verified match tallies. Privileged fields included for authorized management.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/players/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="players">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Attendance Register -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-calendar-check-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">Attendance Register</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Session-by-session training and match attendance history, completed roll calls, marked counts, and calculated season attendance percentages.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/attendance/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="attendance">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 3. MCA Match History -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-trophy-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">MCA Match History</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Complete record of 2026/27 MCA league fixtures, opponents, tournament stages, innings scores, results, and scorecard attachment counts.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/matches/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="matches">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Equipment Stock Register -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-box-seam-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">Equipment Stock Register</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Inventory audit log of all 58 equipment assets, medical supplies, consumables, physical count verification status, conditions, and minimum target thresholds.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/equipment/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="equipment">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 5. Management Action List -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-kanban-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">Management Action List</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Audit register of operational tasks, AI diagnostics recommendations, equipment replenishment orders, assignment deadlines, and Kanban progress.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/tasks/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="tasks">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 6. Performance Leaderboard -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-bar-chart-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">Performance Leaderboard</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Verified season statistics including batting strike rates, averages, bowling economy, wickets, and club-rule fielding points tallies.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/leaderboards/export-csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="leaderboards">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Print / PDF trigger
  document.querySelectorAll('.btn-print-report').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-report-type');
      window.location.hash = `#/${type}`;
      setTimeout(() => window.print(), 500);
    });
  });
}
