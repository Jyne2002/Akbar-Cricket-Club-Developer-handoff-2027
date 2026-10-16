/**
 * Akbar Cricket Club — Toast Notification Service
 */

export function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-root');
  if (!container) return;

  const toastId = 'toast-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  
  let bgClass = 'bg-primary text-white';
  let icon = 'bi-info-circle-fill';

  if (type === 'success') {
    bgClass = 'text-white';
    icon = 'bi-check-circle-fill';
  } else if (type === 'danger' || type === 'error') {
    bgClass = 'text-white';
    icon = 'bi-exclamation-triangle-fill';
  } else if (type === 'warning') {
    bgClass = 'text-dark';
    icon = 'bi-exclamation-circle-fill';
  }

  const bgStyle = type === 'success' ? 'background-color: var(--success-green);' :
                  (type === 'danger' || type === 'error') ? 'background-color: var(--burgundy);' :
                  type === 'warning' ? 'background-color: var(--warning-amber); color: #fff;' :
                  'background-color: #16243a; color: #fff;';

  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center shadow-lg border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true" style="${bgStyle} border-radius: 8px;">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2 py-2 px-3" style="font-size: 13px; font-weight: 500;">
          <i class="bi ${icon} fs-6"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" onclick="document.getElementById('${toastId}').remove()"></button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', toastHtml);
  const element = document.getElementById(toastId);

  // Auto remove after duration
  setTimeout(() => {
    if (element && element.parentNode) {
      element.classList.add('fade');
      setTimeout(() => element.remove(), 250);
    }
  }, duration);
}
