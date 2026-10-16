/**
 * Akbar Cricket Club — Top Header Component
 * ~106px height with breadcrumb, title, date, theme toggle, refresh, and contextual actions.
 */

export function renderHeader({ title, breadcrumb = 'Workspace', actionButton = null }) {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return `
    <header class="app-header">
      <div class="d-flex align-items-center gap-3">
        <!-- Mobile Hamburger Toggle -->
        <button class="icon-btn-header d-md-none" id="mobile-menu-toggle" aria-label="Toggle navigation menu">
          <i class="bi bi-list fs-5"></i>
        </button>

        <div>
          <div class="breadcrumb-small">${breadcrumb}</div>
          <div class="page-title">${title}</div>
        </div>
      </div>

      <div class="header-action-group">
        <!-- Current Date Badge -->
        <div class="date-display-badge d-none d-lg-flex">
          <i class="bi bi-calendar3 text-muted"></i>
          <span>${currentDate}</span>
        </div>

        <!-- Refresh Button -->
        <button class="icon-btn-header" id="header-refresh-btn" title="Refresh current view">
          <i class="bi bi-arrow-clockwise"></i>
        </button>

        <!-- Theme Toggle (Dark / Light) -->
        <button class="icon-btn-header" id="header-theme-toggle" title="Toggle dark/light appearance">
          <i class="bi bi-moon-stars" id="theme-toggle-icon"></i>
        </button>

        <!-- Contextual Action Button -->
        ${actionButton ? `
          <button class="btn btn-burgundy" id="${actionButton.id}">
            <i class="bi ${actionButton.icon || 'bi-plus-lg'}"></i>
            <span>${actionButton.label}</span>
          </button>
        ` : ''}
      </div>
    </header>
  `;
}
