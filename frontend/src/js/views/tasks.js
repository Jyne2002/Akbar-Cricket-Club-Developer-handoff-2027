/**
 * Akbar Cricket Club — Tasks & AI Operations Assistant View
 * Kanban board (To do, In progress, Blocked, Done), task CRUD, and rule-based / AI suggestions modal.
 */

import { api } from '../api.js';
import { showToast } from '../components/toast.js';
import { openModal, closeModal } from '../components/modal.js';

let boardData = null;
let currentUser = null;

export async function renderTasks(container, user) {
  currentUser = user;
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Tasks & AI Operations Assistant</h2>
        <div class="small text-muted">Operations Kanban Board & Automated Operational Diagnostics</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-suggest-actions">
          <i class="bi bi-robot me-1"></i>Suggest Management Actions
        </button>
        <button class="btn btn-outline-burgundy" id="btn-export-tasks-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Export CSV
        </button>
        <button class="btn btn-light-custom" id="btn-print-tasks">
          <i class="bi bi-printer me-1"></i>Print Board
        </button>
        ${canEdit ? `
          <button class="btn btn-burgundy" id="btn-create-task">
            <i class="bi bi-plus-lg me-1"></i>Create Task
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Kanban Board Container -->
    <div class="kanban-board" id="kanban-columns-container">
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-danger" role="status"></div>
      </div>
    </div>
  `;

  await loadKanbanBoard();

  document.getElementById('btn-suggest-actions')?.addEventListener('click', openAiSuggestionsModal);
  document.getElementById('btn-export-tasks-csv')?.addEventListener('click', () => {
    window.location.href = '/api/reports/tasks/csv';
  });
  document.getElementById('btn-print-tasks')?.addEventListener('click', () => {
    window.print();
  });

  if (canEdit) {
    document.getElementById('btn-create-task')?.addEventListener('click', () => openTaskFormModal(null));
  }
}

async function loadKanbanBoard() {
  const container = document.getElementById('kanban-columns-container');
  try {
    const res = await api.get('/api/tasks');
    boardData = res.board;

    const columns = [
      { key: 'todo', label: 'To do', count: boardData.counts.todo, items: boardData.todo },
      { key: 'inProgress', label: 'In progress', count: boardData.counts.inProgress, items: boardData.inProgress },
      { key: 'blocked', label: 'Blocked', count: boardData.counts.blocked, items: boardData.blocked },
      { key: 'done', label: 'Done', count: boardData.counts.done, items: boardData.done }
    ];

    container.innerHTML = columns.map(col => `
      <div class="kanban-column">
        <div class="kanban-column-header">
          <span class="stat-label text-main">${col.label}</span>
          <span class="badge rounded-pill bg-light text-dark border px-2 py-1" style="font-size: 11px;">${col.count}</span>
        </div>

        <div class="kanban-column-body flex-1" style="min-height: 200px;">
          ${col.items.map(task => {
            const priorityBadge = task.priority === 'Critical' ? 'badge bg-danger' :
                                  task.priority === 'High' ? 'badge bg-warning text-dark' :
                                  task.priority === 'Medium' ? 'badge bg-info text-dark' : 'badge bg-secondary';

            return `
              <div class="kanban-task-card" data-task-id="${task._id}">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="${priorityBadge}" style="font-size: 9.5px;">${task.priority}</span>
                  <span class="badge-role" style="font-size: 9px;">${task.category}</span>
                </div>
                <div class="fw-bold text-main mb-1" style="font-size: 13px;">${task.title}</div>
                ${task.details ? `<div class="small text-muted mb-2 text-truncate">${task.details}</div>` : ''}
                <div class="d-flex justify-content-between align-items-center pt-2 border-top mt-2 small text-muted" style="border-color: var(--border-color) !important; font-size: 11px;">
                  <span><i class="bi bi-person me-1"></i>${task.owner}</span>
                  <span><i class="bi bi-clock me-1"></i>${task.dueDate || 'No due date'}</span>
                </div>
                <div class="mt-2 text-end">
                  <button class="btn btn-sm btn-light-custom py-0 px-2 btn-edit-task" data-task-id="${task._id}" style="font-size: 11px;">
                    <i class="bi bi-pencil me-1"></i>Edit
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.btn-edit-task').forEach(btn => {
      btn.addEventListener('click', () => {
        const tid = btn.getAttribute('data-task-id');
        const allTasks = [...boardData.todo, ...boardData.inProgress, ...boardData.blocked, ...boardData.done];
        const task = allTasks.find(t => t._id === tid);
        openTaskFormModal(task);
      });
    });
  } catch (err) {
    container.innerHTML = `<div class="alert alert-danger col-12">${err.message}</div>`;
  }
}

/**
 * AI Assistant Suggestions Modal
 * Rule-based operational scanner checking unverified stock, low stock, damage, match readiness, and attendance.
 * User must explicitly click '+ Add' to generate the task.
 */
async function openAiSuggestionsModal() {
  const contentHtml = `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="stat-label text-gold"><i class="bi bi-magic me-1"></i>Operational Health Diagnostic</span>
        <span class="badge bg-light text-dark border small" id="ai-source-badge">Scanning club records...</span>
      </div>

      <div class="small text-muted mb-3">
        The operations scanner reviews physical inventory status, safety damages, upcoming fixture readiness, and session attendance completion.
        Tasks are only added to your board when you explicitly click <strong>+ Add</strong>.
      </div>

      <div id="ai-suggestions-list">
        <div class="text-center py-4">
          <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
          <div class="small text-muted mt-2">Analyzing club operational status...</div>
        </div>
      </div>
    </div>
  `;

  openModal({
    title: 'Suggest Management Actions (AI & Rule Engine)',
    contentHtml,
    footerHtml: `<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>`,
    onOpen: async (modalEl) => {
      try {
        const res = await api.get('/api/tasks/suggestions');
        const badge = document.getElementById('ai-source-badge');
        if (badge) badge.textContent = res.source;

        const listEl = document.getElementById('ai-suggestions-list');
        if (!res.suggestions || res.suggestions.length === 0) {
          listEl.innerHTML = `<div class="text-muted text-center py-4">No urgent operational bottlenecks detected. All records are up to date!</div>`;
          return;
        }

        listEl.innerHTML = res.suggestions.map((sug, i) => {
          const prioBadge = sug.priority === 'Critical' ? 'badge bg-danger' :
                            sug.priority === 'High' ? 'badge bg-warning text-dark' : 'badge bg-info text-dark';

          return `
            <div class="card-custom p-3 mb-2" id="sug-card-${i}">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <span class="${prioBadge}" style="font-size: 10px;">${sug.priority}</span>
                <span class="badge-role" style="font-size: 9.5px;">${sug.category || 'Operations'}</span>
              </div>
              <div class="fw-bold text-main mb-1" style="font-size: 13.5px;">${sug.title}</div>
              <p class="small text-muted mb-3" style="line-height: 1.4;">${sug.explanation}</p>
              <div class="text-end">
                <button type="button" class="btn btn-sm btn-burgundy py-1 px-3 btn-add-sug-task" data-sug-index="${i}">
                  <i class="bi bi-plus-lg me-1"></i>+ Add
                </button>
              </div>
            </div>
          `;
        }).join('');

        // Attach + Add handlers
        listEl.querySelectorAll('.btn-add-sug-task').forEach(btn => {
          btn.addEventListener('click', async () => {
            const idx = parseInt(btn.getAttribute('data-sug-index'), 10);
            const sug = res.suggestions[idx];

            btn.disabled = true;
            btn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Adding...`;

            try {
              await api.post('/api/tasks', {
                title: sug.title,
                details: sug.explanation,
                category: sug.category || 'Operations',
                priority: sug.priority || 'Medium',
                status: 'To do',
                source: res.source.includes('AI') ? 'AI Assistant' : 'Rule Engine'
              });

              showToast(`Task "${sug.title}" added to Kanban board.`, 'success');
              btn.className = 'btn btn-sm btn-success py-1 px-3';
              btn.innerHTML = `<i class="bi bi-check2"></i> Added`;
              loadKanbanBoard();
            } catch (err) {
              showToast(`Error: ${err.message}`, 'error');
              btn.disabled = false;
              btn.innerHTML = `+ Add`;
            }
          });
        });
      } catch (err) {
        document.getElementById('ai-suggestions-list').innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
      }
    }
  });
}

/**
 * Task Creation & Edit Modal
 */
function openTaskFormModal(task = null) {
  const isEditing = !!task;
  const canEdit = ['Administrator', 'Manager', 'Coach'].includes(currentUser?.role);

  const contentHtml = `
    <form id="task-dialog-form">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-custom">Task Title *</label>
          <input type="text" id="t-title" class="form-control-custom" placeholder="e.g. Replenish sterile adhesive plasters" value="${task?.title || ''}" required ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Category</label>
          <select id="t-category" class="form-select-custom" ${!canEdit ? 'disabled' : ''}>
            <option value="Operations" ${task?.category === 'Operations' ? 'selected' : ''}>Operations</option>
            <option value="Match Prep" ${task?.category === 'Match Prep' ? 'selected' : ''}>Match Prep</option>
            <option value="Inventory" ${task?.category === 'Inventory' ? 'selected' : ''}>Inventory</option>
            <option value="Medical/Safety" ${task?.category === 'Medical/Safety' ? 'selected' : ''}>Medical/Safety</option>
            <option value="Administration" ${task?.category === 'Administration' ? 'selected' : ''}>Administration</option>
            <option value="General" ${task?.category === 'General' ? 'selected' : ''}>General</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Priority Level</label>
          <select id="t-priority" class="form-select-custom" ${!canEdit ? 'disabled' : ''}>
            <option value="Low" ${task?.priority === 'Low' ? 'selected' : ''}>Low</option>
            <option value="Medium" ${!task || task?.priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="High" ${task?.priority === 'High' ? 'selected' : ''}>High</option>
            <option value="Critical" ${task?.priority === 'Critical' ? 'selected' : ''}>Critical</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Kanban Status Column</label>
          <select id="t-status" class="form-select-custom" ${!canEdit ? 'disabled' : ''}>
            <option value="To do" ${!task || task?.status === 'To do' ? 'selected' : ''}>To do</option>
            <option value="In progress" ${task?.status === 'In progress' ? 'selected' : ''}>In progress</option>
            <option value="Blocked" ${task?.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
            <option value="Done" ${task?.status === 'Done' ? 'selected' : ''}>Done</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Owner / Assigned Official</label>
          <input type="text" id="t-owner" class="form-control-custom" value="${task?.owner || currentUser?.name || 'Unassigned'}" ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Target Deadline</label>
          <input type="date" id="t-dueDate" class="form-control-custom" value="${task?.dueDate || ''}" ${!canEdit ? 'disabled' : ''}>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Operational Action Details</label>
          <textarea id="t-details" class="form-control-custom" rows="3" placeholder="Actionable steps, supplier details, equipment IDs..." ${!canEdit ? 'disabled' : ''}>${task?.details || ''}</textarea>
        </div>
      </div>
    </form>
  `;

  openModal({
    title: isEditing ? `Edit Task: ${task.title}` : 'Create Operational Task',
    contentHtml,
    footerHtml: canEdit ? undefined : `<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>`,
    onOpen: (modalEl) => {
      if (!canEdit) return;

      document.getElementById('modal-btn-save')?.addEventListener('click', async () => {
        const title = document.getElementById('t-title')?.value;
        const category = document.getElementById('t-category')?.value;
        const priority = document.getElementById('t-priority')?.value;
        const status = document.getElementById('t-status')?.value;
        const owner = document.getElementById('t-owner')?.value;
        const dueDate = document.getElementById('t-dueDate')?.value;
        const details = document.getElementById('t-details')?.value;

        if (!title || !title.trim()) {
          showToast('Task title is required.', 'error');
          return;
        }

        const bodyData = { title, category, priority, status, owner, dueDate, details };

        try {
          if (isEditing) {
            await api.put(`/api/tasks/${task._id}`, bodyData);
            showToast('Task updated successfully.', 'success');
          } else {
            await api.post('/api/tasks', bodyData);
            showToast(`Task "${title}" created.`, 'success');
          }
          closeModal();
          loadKanbanBoard();
        } catch (err) {
          showToast(`Error: ${err.message}`, 'error');
        }
      });
    }
  });
}
