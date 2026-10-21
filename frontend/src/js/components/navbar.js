/**
 * Akbar Cricket Club — Sidebar Navigation Component
 * Fixed 251px sidebar with corporate groups and active highlighting
 */

import clubLogoUrl from '../../assets/akbar-cricket-logo.png';

export function renderSidebar(currentUser, activeSection = 'command-centre') {
  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AC';

  return `
    <aside class="app-sidebar" id="app-sidebar">
      <!-- Brand & Crest -->
      <div class="sidebar-brand-box">
        <div class="brand-crest brand-crest-image">
          <img src="${clubLogoUrl}" alt="Akbar Cricket Club — 1 Team 1 Dream">
        </div>
        <div class="brand-club-name">AKBAR CRICKET</div>
        <div class="brand-suite-name">TEAM MANAGEMENT SUITE</div>
        <span class="season-badge">SEASON 2026–2027</span>
      </div>

      <!-- Navigation Links -->
      <div class="sidebar-nav-container">
        <!-- GROUP 1: WORKSPACE -->
        <div class="nav-group-label">WORKSPACE</div>
        <a href="#/command-centre" class="sidebar-nav-link ${activeSection === 'command-centre' ? 'active' : ''}" data-nav="command-centre">
          <i class="bi bi-grid-1x2-fill"></i>
          <span>Command centre</span>
        </a>
        <a href="#/players" class="sidebar-nav-link ${activeSection === 'players' ? 'active' : ''}" data-nav="players">
          <i class="bi bi-people-fill"></i>
          <span>Player profiles</span>
        </a>
        <a href="#/attendance" class="sidebar-nav-link ${activeSection === 'attendance' ? 'active' : ''}" data-nav="attendance">
          <i class="bi bi-calendar-check-fill"></i>
          <span>Practice & attendance</span>
        </a>
        <a href="#/matches" class="sidebar-nav-link ${activeSection === 'matches' ? 'active' : ''}" data-nav="matches">
          <i class="bi bi-trophy-fill"></i>
          <span>MCA match centre</span>
        </a>
        <a href="#/leaderboards" class="sidebar-nav-link ${activeSection === 'leaderboards' ? 'active' : ''}" data-nav="leaderboards">
          <i class="bi bi-bar-chart-line-fill"></i>
          <span>Player leaderboards</span>
        </a>

        <!-- GROUP 2: CLUB OPERATIONS -->
        <div class="nav-group-label mt-2">CLUB OPERATIONS</div>
        <a href="#/inventory" class="sidebar-nav-link ${activeSection === 'inventory' ? 'active' : ''}" data-nav="inventory">
          <i class="bi bi-box-seam-fill"></i>
          <span>Gear & inventory</span>
        </a>
        <a href="#/inspections" class="sidebar-nav-link ${activeSection === 'inspections' ? 'active' : ''}" data-nav="inspections">
          <i class="bi bi-shield-check"></i>
          <span>Weekly inspections</span>
        </a>
        <a href="#/damage-reports" class="sidebar-nav-link ${activeSection === 'damage-reports' ? 'active' : ''}" data-nav="damage-reports">
          <i class="bi bi-exclamation-octagon-fill"></i>
          <span>Damage reports</span>
        </a>
        <a href="#/tasks" class="sidebar-nav-link ${activeSection === 'tasks' ? 'active' : ''}" data-nav="tasks">
          <i class="bi bi-kanban-fill"></i>
          <span>Tasks & AI assistant</span>
        </a>

        <!-- GROUP 3: MANAGEMENT -->
        <div class="nav-group-label mt-2">MANAGEMENT</div>
        <a href="#/reports" class="sidebar-nav-link ${activeSection === 'reports' ? 'active' : ''}" data-nav="reports">
          <i class="bi bi-file-earmark-text-fill"></i>
          <span>Reports & exports</span>
        </a>
        <a href="#/settings" class="sidebar-nav-link ${activeSection === 'settings' ? 'active' : ''}" data-nav="settings">
          <i class="bi bi-gear-fill"></i>
          <span>Settings & users</span>
        </a>
      </div>

      <!-- Signed-in User Details & Logout -->
      <div class="sidebar-user-footer">
        <div class="user-info-brief">
          <div class="user-avatar-initials">${userInitials}</div>
          <div class="user-text-meta">
            <div class="user-display-name">${currentUser?.name || 'Administrator'}</div>
            <div class="user-display-role">${currentUser?.role || 'Administrator'}</div>
          </div>
        </div>
        <button class="logout-btn-icon" id="sidebar-logout-btn" title="Sign out of workspace">
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </aside>
  `;
}
