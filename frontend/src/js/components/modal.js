/**
 * Akbar Cricket Club — Modal Controller
 * Centered modal dialog with dark translucent backdrop, ~820px max width.
 */

let activeModal = null;

export function openModal({ title, contentHtml, footerHtml, onOpen, onClose }) {
  closeModal();

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const modalHtml = `
    <div id="active-custom-modal" class="modal-backdrop-custom">
      <div class="modal-dialog-custom" role="dialog" aria-modal="true">
        <div class="modal-header-custom">
          <h5 class="modal-title-custom">${title}</h5>
          <button type="button" class="btn-close" id="modal-close-x" aria-label="Close"></button>
        </div>
        <div class="modal-body-custom" id="modal-body-content">
          ${contentHtml}
        </div>
        ${footerHtml !== false ? `
          <div class="modal-footer-custom" id="modal-footer-content">
            ${footerHtml || `
              <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
              <button type="button" class="btn btn-burgundy" id="modal-btn-save">Save Changes</button>
            `}
          </div>
        ` : ''}
      </div>
    </div>
  `;

  modalRoot.innerHTML = modalHtml;
  const modalEl = document.getElementById('active-custom-modal');

  // Event handlers
  const handleClose = () => {
    closeModal();
    if (typeof onClose === 'function') onClose();
  };

  document.getElementById('modal-close-x')?.addEventListener('click', handleClose);
  document.getElementById('modal-btn-cancel')?.addEventListener('click', handleClose);

  // Click outside to close
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      handleClose();
    }
  });

  // ESC key to close
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      handleClose();
      window.removeEventListener('keydown', escHandler);
    }
  };
  window.addEventListener('keydown', escHandler);

  activeModal = {
    element: modalEl,
    escHandler,
    onClose
  };

  if (typeof onOpen === 'function') {
    onOpen(modalEl);
  }

  return modalEl;
}

export function closeModal() {
  if (activeModal) {
    window.removeEventListener('keydown', activeModal.escHandler);
    if (activeModal.element && activeModal.element.parentNode) {
      activeModal.element.remove();
    }
    activeModal = null;
  }
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}
