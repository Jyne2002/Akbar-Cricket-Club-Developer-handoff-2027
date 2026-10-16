/**
 * Akbar Cricket Club — Command Centre View
 * Primary operational dashboard with gradient banner, stats, attention panel, top performers & tasks.
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';

export async function renderCommandCentre(container) {
  container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading Command Centre...</span>
      </div>
    </div>
  `;

  try {
    const data = await api.get('/api/command-centre');
    const { stats, attentionPanel, upcomingFixtures, topPerformers, recentTasks } = data;

    const leaderBatsman = topPerformers.bestBatsmen[0];
    const leaderBowler = topPerformers.bestBowlers[0];
    const leaderFielder = topPerformers.bestFielders[0];

    container.innerHTML = `
      <!-- Wide Navy Gradient Banner -->
      <div class="command-banner">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center position-relative" style="z-index: 2;">
          <div class="d-flex align-items-start gap-3 mb-3 mb-md-0">
            <div class="brand-crest" style="width: 54px; height: 54px; flex-shrink: 0;">
              <span class="brand-crest-gold fs-4">ACC</span>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: var(--gold); margin-bottom: 4px;">
                TEAM AKBAR / 2026–27 CLUB OPERATIONS
              </div>
              <h2 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 6px;">
                Every player. Every innings.
              </h2>
              <p style="font-size: 13px; color: rgba(233, 239, 246, 0.82); margin-bottom: 0; max-width: 650px; line-height: 1.5;">
                One connected workspace for team management, MCA fixtures, player performance, attendance and equipment readiness.
              </p>
            </div>
          </div>
          <div>
            <a href="#/matches" class="btn btn-gold text-nowrap">
              <span>Explore match centre</span>
              <i class="bi bi-arrow-up-right ms-1"></i>
            </a>
          </div>
        </div>
        <div class="banner-watermark">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6">
            <circle cx="50" cy="50" r="45" />
            <text x="50" y="58" font-size="28" font-weight="900" text-anchor="middle" fill="currentColor">ACC</text>
          </svg>
        </div>
      </div>

      <!-- 4 Top Metric Cards -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-lg-3">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Active Squad</span>
              <i class="bi bi-people text-muted fs-5"></i>
            </div>
            <div class="stat-value">${stats.activeSquad}</div>
            <div class="small text-muted mt-1">Selected 2027 players</div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">MCA Matches</span>
              <i class="bi bi-trophy text-muted fs-5"></i>
            </div>
            <div class="stat-value">${stats.mcaMatches}</div>
            <div class="small text-muted mt-1">Official league fixtures</div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Attendance Rate</span>
              <i class="bi bi-calendar-check text-muted fs-5"></i>
            </div>
            <div class="stat-value" style="color: var(--success-green);">${stats.attendanceRate}</div>
            <div class="small text-muted mt-1">Marked practice & match roll calls</div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Stock Checks Awaiting</span>
              <i class="bi bi-hourglass-split text-muted fs-5"></i>
            </div>
            <div class="stat-value" style="color: var(--warning-amber);">${stats.unverifiedEquipment}</div>
            <div class="small text-muted mt-1">Unverified inventory counts</div>
          </div>
        </div>
      </div>

      <!-- Mid Section: Upcoming MCA Fixtures & Management Attention Panel -->
      <div class="row g-4 mb-4">
        <!-- Upcoming MCA Fixtures -->
        <div class="col-lg-7">
          <div class="card-custom h-100">
            <div class="card-header-clean">
              <h3 class="card-title-clean">
                <i class="bi bi-calendar-event me-2 text-danger"></i>Upcoming MCA Fixtures
              </h3>
              <a href="#/matches" class="btn btn-outline-burgundy btn-sm py-1 px-2" style="font-size: 11px;">View All</a>
            </div>
            <div class="p-3">
              ${upcomingFixtures && upcomingFixtures.length > 0 ? `
                <div class="d-flex flex-column gap-2">
                  ${upcomingFixtures.map(f => `
                    <div class="p-3 rounded border d-flex justify-content-between align-items-center" style="background-color: var(--body-bg); border-color: var(--border-color) !important;">
                      <div>
                        <div class="fw-bold" style="font-size: 13.5px; color: var(--text-main);">
                          vs ${f.opponent}
                        </div>
                        <div class="small text-muted mt-1">
                          <i class="bi bi-calendar3 me-1"></i>${f.date} &bull; <i class="bi bi-geo-alt me-1"></i>${f.venue || 'Venue TBD'}
                        </div>
                      </div>
                      <div class="text-end">
                        <span class="badge-role badge-batsman">${f.format}</span>
                        <div class="mt-1">
                          <a href="#/matches?id=${f._id}" class="small text-danger text-decoration-none fw-bold">Match Centre &rarr;</a>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="text-center py-4 text-muted">
                  <i class="bi bi-calendar-x fs-3 d-block mb-2"></i>
                  No upcoming pending fixtures scheduled.
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Management-Attention Panel -->
        <div class="col-lg-5">
          <div class="card-custom h-100">
            <div class="card-header-clean">
              <h3 class="card-title-clean">
                <i class="bi bi-shield-exclamation me-2 text-warning"></i>Management Attention Required
              </h3>
            </div>
            <div class="p-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Unverified Stock Quantities</div>
                    <div class="small text-muted">Awaiting physical store verification</div>
                  </div>
                  <span class="badge bg-light text-dark border px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${attentionPanel.unverifiedStock}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Open Damage Reports</div>
                    <div class="small text-muted">Gear requiring repair or decommissioning</div>
                  </div>
                  <span class="badge ${attentionPanel.openDamageReports > 0 ? 'bg-danger text-white' : 'bg-light text-dark border'} px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${attentionPanel.openDamageReports}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Low Stock (Verified)</div>
                    <div class="small text-muted">Verified quantities below minimum reserves</div>
                  </div>
                  <span class="badge ${attentionPanel.lowStockItems > 0 ? 'bg-warning text-dark' : 'bg-light text-dark border'} px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${attentionPanel.lowStockItems}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Unmarked Attendance Sessions</div>
                    <div class="small text-muted">Practice or match roll calls pending</div>
                  </div>
                  <span class="badge bg-light text-dark border px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${attentionPanel.unmarkedAttendanceSessions}
                  </span>
                </li>
              </ul>
              <div class="mt-3">
                <a href="#/tasks" class="btn btn-outline-burgundy w-100 py-1" style="font-size: 12px;">
                  <i class="bi bi-robot me-1"></i>Open AI Operations Assistant
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Performers: Best Batsman, Best Bowler, Best Fielder -->
      <h4 class="heading-font mb-3" style="font-size: 16px; font-weight: 800;">Season 2026–27 Top Performers</h4>
      <div class="row g-3 mb-4">
        <!-- Best Batsman -->
        <div class="col-md-4">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Best Batsman</span>
              <span class="badge-role badge-batsman">Runs</span>
            </div>
            ${leaderBatsman ? `
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${leaderBatsman.name}</div>
              <div class="stat-value text-danger my-1">${leaderBatsman.runs} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">runs</span></div>
              <div class="small text-muted mb-2">${leaderBatsman.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${topPerformers.bestBatsmen.map((b, i) => `
                  <div class="d-flex justify-content-between small py-1">
                    <span>${i + 1}. ${b.name}</span>
                    <span class="fw-bold">${b.runs} r</span>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="text-muted small py-3">No verified batting statistics recorded yet. Scores will appear once MCA scorecards are confirmed.</div>
            `}
          </div>
        </div>

        <!-- Best Bowler -->
        <div class="col-md-4">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Best Bowler</span>
              <span class="badge-role badge-bowler">Wickets</span>
            </div>
            ${leaderBowler ? `
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${leaderBowler.name}</div>
              <div class="stat-value text-danger my-1">${leaderBowler.wickets} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">wickets</span></div>
              <div class="small text-muted mb-2">${leaderBowler.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${topPerformers.bestBowlers.map((b, i) => `
                  <div class="d-flex justify-content-between small py-1">
                    <span>${i + 1}. ${b.name}</span>
                    <span class="fw-bold">${b.wickets} w</span>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="text-muted small py-3">No verified bowling statistics recorded yet. Scores will appear once MCA scorecards are confirmed.</div>
            `}
          </div>
        </div>

        <!-- Best Fielder -->
        <div class="col-md-4">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Best Fielder</span>
              <span class="badge-role badge-allrounder">Points</span>
            </div>
            ${leaderFielder ? `
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${leaderFielder.name}</div>
              <div class="stat-value text-gold my-1">${leaderFielder.fieldingPoints} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">pts</span></div>
              <div class="small text-muted mb-2">${leaderFielder.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${topPerformers.bestFielders.map((b, i) => `
                  <div class="d-flex justify-content-between small py-1">
                    <span>${i + 1}. ${b.name}</span>
                    <span class="fw-bold">${b.fieldingPoints} pts</span>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="text-muted small py-3">No verified fielding statistics recorded yet. Fielding points: Catches + 1.5×Stumpings + 1.5×Run-outs.</div>
            `}
          </div>
        </div>
      </div>

      <!-- Recent Open Tasks -->
      <div class="card-custom">
        <div class="card-header-clean">
          <h3 class="card-title-clean">
            <i class="bi bi-check2-circle me-2 text-danger"></i>Recent Operational Tasks
          </h3>
          <a href="#/tasks" class="btn btn-outline-burgundy btn-sm py-1 px-2" style="font-size: 11px;">View Kanban Board</a>
        </div>
        <div class="p-0">
          <div class="table-responsive">
            <table class="table-custom mb-0">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Priority</th>
                  <th>Owner</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${recentTasks && recentTasks.length > 0 ? recentTasks.map(t => {
                  const priorityClass = t.priority === 'Critical' ? 'badge bg-danger' :
                                        t.priority === 'High' ? 'badge bg-warning text-dark' : 'badge bg-secondary';
                  return `
                    <tr>
                      <td class="fw-bold">${t.title}</td>
                      <td><span class="${priorityClass}">${t.priority}</span></td>
                      <td>${t.owner}</td>
                      <td>${t.dueDate || 'No deadline'}</td>
                      <td><span class="badge-role">${t.status}</span></td>
                    </tr>
                  `;
                }).join('') : `
                  <tr>
                    <td colspan="5" class="text-center py-4 text-muted">
                      No active open tasks. Use the Tasks & AI Assistant to generate or create operational actions.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `
      <div class="alert alert-danger">
        <h5>Failed to load Command Centre</h5>
        <p>${err.message}</p>
        <button class="btn btn-burgundy btn-sm" onclick="window.location.reload()">Retry</button>
      </div>
    `;
  }
}
