/**
 * Akbar Cricket Club — Team Management Suite v2.0
 * Season 2026–2027 Main Application Orchestrator
 */

import { api } from './api.js';
import { renderSidebar } from './components/navbar.js';
import { renderHeader } from './components/header.js';
import { showToast } from './components/toast.js';

import { renderLogin } from './views/login.js';
import { renderCommandCentre } from './views/commandCentre.js';
import { renderPlayers } from './views/players.js';
import { renderAttendance } from './views/attendance.js';
import { renderMatches } from './views/matches.js';
import { renderLeaderboards } from './views/leaderboards.js';
import { renderInventory } from './views/inventory.js';
import { renderInspections } from './views/inspections.js';
import { renderDamage } from './views/damage.js';
import { renderTasks } from './views/tasks.js';
import { renderReports } from './views/reports.js';
import { renderSettings } from './views/settings.js';

let currentUser = null;

// Routing Configuration Mapping
const ROUTES = {
  'command-centre': {
    title: 'Command Centre',
    breadcrumb: 'Workspace / Operations',
    render: renderCommandCentre,
    actionButton: { id: 'hdr-action-btn', label: 'Explore Matches', icon: 'bi-trophy' }
  },
  'players': {
    title: 'Player Profiles',
    breadcrumb: 'Workspace / Roster',
    render: renderPlayers,
    actionButton: null
  },
  'attendance': {
    title: 'Practice & Attendance',
    breadcrumb: 'Workspace / Training',
    render: renderAttendance,
    actionButton: null
  },
  'matches': {
    title: 'MCA Match Centre',
    breadcrumb: 'Workspace / League Fixtures',
    render: renderMatches,
    actionButton: null
  },
  'leaderboards': {
    title: 'Player Leaderboards',
    breadcrumb: 'Workspace / Performance',
    render: renderLeaderboards,
    actionButton: null
  },
  'inventory': {
    title: 'Gear & Inventory',
    breadcrumb: 'Club Operations / Assets',
    render: renderInventory,
    actionButton: null
  },
  'inspections': {
    title: 'Weekly Inspections',
    breadcrumb: 'Club Operations / Safety',
    render: renderInspections,
    actionButton: null
  },
  'damage-reports': {
    title: 'Damage Reports',
    breadcrumb: 'Club Operations / Incidents',
    render: renderDamage,
    actionButton: null
  },
  'tasks': {
    title: 'Tasks & AI Assistant',
    breadcrumb: 'Club Operations / Kanban',
    render: renderTasks,
    actionButton: null
  },
  'reports': {
    title: 'Reports & Exports',
    breadcrumb: 'Management / Registers',
    render: renderReports,
    actionButton: null
  },
  'settings': {
    title: 'Settings & Users',
    breadcrumb: 'Management / Administration',
    render: renderSettings,
    actionButton: null
  }
};

/**
 * Initialize theme from localStorage
 */
function initTheme() {
  const savedTheme = localStorage.getItem('acc_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

/**
 * Toggle theme between light and dark
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('acc_theme', newTheme);
  
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.className = newTheme === 'dark' ? 'bi bi-sun-fill text-gold' : 'bi bi-moon-stars';
  }
  showToast(`Switched to ${newTheme} mode.`, 'info');
}

/**
 * Render the full authenticated dashboard shell
 */
function renderAppShell(activeSection = 'command-centre') {
  const appRoot = document.getElementById('app');
  const route = ROUTES[activeSection] || ROUTES['command-centre'];

  appRoot.innerHTML = `
    <div id="app-layout">
      <!-- Sidebar -->
      ${renderSidebar(currentUser, activeSection)}

      <!-- Main Content Area -->
      <div class="app-main-wrapper">
        <!-- Header -->
        ${renderHeader({
          title: route.title,
          breadcrumb: route.breadcrumb,
          actionButton: route.actionButton
        })}

        <!-- Active View Body -->
        <main class="app-content-body" id="main-view-container">
          <!-- View will be injected here -->
        </main>

        <!-- Footer -->
        <footer class="app-footer">
          &copy; 2026 Akbar Cricket Club &bull; Management Suite v2.0 &bull; Authorized personnel only
        </footer>
      </div>
    </div>
  `;

  // Attach Header Controls
  document.getElementById('header-theme-toggle')?.addEventListener('click', toggleTheme);
  document.getElementById('header-refresh-btn')?.addEventListener('click', () => {
    navigate(getActiveSection());
    showToast('View refreshed.', 'info');
  });

  // Mobile Hamburger Toggle
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('mobile-backdrop');
  const mobileToggle = document.getElementById('mobile-menu-toggle');

  const openMobileMenu = () => {
    sidebar?.classList.add('show-mobile');
    backdrop?.classList.add('show');
  };

  const closeMobileMenu = () => {
    sidebar?.classList.remove('show-mobile');
    backdrop?.classList.remove('show');
  };

  mobileToggle?.addEventListener('click', openMobileMenu);
  backdrop?.addEventListener('click', closeMobileMenu);

  // Close mobile sidebar upon clicking navigation link
  sidebar?.querySelectorAll('.sidebar-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Logout button in sidebar
  document.getElementById('sidebar-logout-btn')?.addEventListener('click', async () => {
    try {
      await api.post('/api/auth/logout');
      currentUser = null;
      showToast('Signed out of workspace.', 'info');
      renderLogin(document.getElementById('app'), onLoginSuccess);
    } catch (err) {
      currentUser = null;
      renderLogin(document.getElementById('app'), onLoginSuccess);
    }
  });

  // Contextual Action Button if applicable
  if (route.actionButton) {
    document.getElementById(route.actionButton.id)?.addEventListener('click', () => {
      window.location.hash = '#/matches';
    });
  }

  // Update theme toggle icon
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.className = currentTheme === 'dark' ? 'bi bi-sun-fill text-gold' : 'bi bi-moon-stars';
  }

  // Execute the view renderer
  const viewContainer = document.getElementById('main-view-container');
  route.render(viewContainer, currentUser);
}

/**
 * Determine active section from window.location.hash
 */
function getActiveSection() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES[hash] ? hash : 'command-centre';
}

/**
 * Navigate to a specific section
 */
function navigate(section) {
  if (!currentUser) return;
  renderAppShell(section);
}

/**
 * Login success callback
 */
function onLoginSuccess(user) {
  currentUser = user;
  const initialSection = getActiveSection();
  renderAppShell(initialSection);
}

// Global session expiry listener
window.addEventListener('auth:expired', () => {
  if (currentUser) {
    currentUser = null;
    showToast('Your session has expired. Please sign in again.', 'warning');
    renderLogin(document.getElementById('app'), onLoginSuccess);
  }
});

// Hashchange router
window.addEventListener('hashchange', () => {
  if (currentUser) {
    navigate(getActiveSection());
  }
});

// App Bootstrap
async function bootstrapApp() {
  initTheme();
  const appRoot = document.getElementById('app');

  try {
    const authData = await api.get('/api/auth/me');
    currentUser = authData.user;
    renderAppShell(getActiveSection());
  } catch (err) {
    // Unauthenticated, render split-screen login
    currentUser = null;
    renderLogin(appRoot, onLoginSuccess);
  }
}

bootstrapApp();
