import { api } from '../api.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { escapeHtml as esc } from '../utils/html.js';

const amounts = new Intl.NumberFormat('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = value => amounts.format(value || 0);
const monthNow = () => {
  const parts = new Intl.DateTimeFormat('en', { timeZone: 'Asia/Colombo', year: 'numeric', month: '2-digit' }).formatToParts(new Date());
  return `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}`;
};
const metricLabels = {
  monthly: 'Monthly amount', attended: 'Attended + late sessions', practiceAttended: 'Attended + late practices', matchAttended: 'Attended + late match sessions',
  absent: 'Absent sessions', late: 'Late sessions', runs: 'Runs', wickets: 'Wickets', catches: 'Catches', stumpings: 'Stumpings', runOuts: 'Run-outs', fieldingPoints: 'Fielding points', verifiedMatches: 'Verified matches'
};
const metrics = {
  Allowance: ['monthly', 'attended', 'practiceAttended', 'matchAttended'], Deduction: ['monthly', 'absent', 'late'],
  Reward: ['runs', 'wickets', 'catches', 'stumpings', 'runOuts', 'fieldingPoints', 'verifiedMatches']
};
const option = (value, label, selected) => `<option value="${esc(value)}" ${String(value) === String(selected) ? 'selected' : ''}>${esc(label)}</option>`;
const input = (id, label, value, attributes = '') => `<div class="col-md-6"><label for="${id}" class="form-label-custom">${label}</label><input id="${id}" class="form-control-custom" value="${esc(value)}" ${attributes}></div>`;
function guard(container, user) {
  if (['Administrator', 'Manager'].includes(user?.role)) return true;
  container.innerHTML = '<div class="alert alert-warning">Player payments are restricted to Administrators and Managers.</div>';
  return false;
}

function paymentLoadError(target, err, retry) {
  const message = err.status === 404 && err.message === 'API route not found.'
    ? 'The running payment service needs to be updated. Restart the backend using Open Website.bat, then retry.'
    : err.message;
  target.innerHTML = `<div class="alert alert-danger"><div>${esc(message)}</div><button type="button" class="btn btn-sm btn-outline-burgundy mt-2" data-retry-payments>Retry</button></div>`;
  target.querySelector('[data-retry-payments]').addEventListener('click', retry);
}

export async function renderPayments(container, user) {
  if (!guard(container, user)) return;
  let report = null;
  let requestNumber = 0;
  container.innerHTML = `
    <div class="payment-view d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
      <div><h2 class="page-title mb-1">Monthly Player Payments</h2><div class="small text-muted">Attendance allowances, deductions and verified performance rewards · LKR</div></div>
      <a href="#/payment-rules" class="btn btn-outline-burgundy">Rates &amp; reward rules</a>
    </div>
    <div class="card-custom p-3 mb-4">
      <div class="row g-3 align-items-end">
        <div class="col-sm-4 col-lg-3"><label for="payment-month" class="form-label-custom">Payment month</label><input type="month" id="payment-month" class="form-control-custom" value="${monthNow()}" required></div>
        <div class="col-sm-8 col-lg-5"><label for="payment-search" class="form-label-custom">Find player</label><input id="payment-search" class="form-control-custom" type="search" placeholder="Search player name or company"></div>
        <div class="col-lg-4 d-flex gap-2"><button id="payment-refresh" class="btn btn-light-custom">Refresh</button><a id="payment-csv" class="btn btn-outline-burgundy">Export CSV</a></div>
      </div>
      <p class="small text-muted mt-3 mb-0">Attendance = (Attended + Late) / marked entries; unmarked entries are excluded. Excused sessions have no absence deduction. Each rule sets its own allowance eligibility requirements.</p>
    </div>
    <div id="payment-result" aria-live="polite"></div>`;
  const monthInput = container.querySelector('#payment-month');
  const result = container.querySelector('#payment-result');
  const csv = container.querySelector('#payment-csv');
  function renderRows() {
    if (!report) return;
    const search = container.querySelector('#payment-search').value.trim().toLowerCase();
    const rows = report.rows.filter(r => `${r.fullName} ${r.company}`.toLowerCase().includes(search));
    const summary = report.summary;
    result.innerHTML = `
      <div class="row g-3 mb-4">${[['Allowances', summary.allowances], ['Deductions', summary.deductions], ['Performance rewards', summary.rewards], ['Net payable', summary.netPayable]].map(([label, value]) => `<div class="col-6 col-xl-3"><div class="card-custom p-3"><div class="stat-label">${label} · LKR</div><div class="fs-4 fw-bold text-main">${money(value)}</div></div></div>`).join('')}</div>
      ${report.ruleCount === 0 ? '<div class="alert alert-info small">No active rules for this month. Add rates and reward rules to calculate payments, or add a player adjustment below.</div>' : ''}
      <p class="small text-muted">Calculated from current attendance, verified scores, rules and adjustments. These figures update when those records change. Excess deductions are shown separately; payable amounts stop at zero.</p>
      <div class="card-custom"><div class="table-responsive"><table class="table-custom"><thead><tr><th>Player</th><th>Attendance</th><th>Allowance eligibility</th><th>Allowances</th><th>Deductions</th><th>Rewards</th><th>Net payable</th><th>Manage</th></tr></thead><tbody>
      ${rows.map(r => `<tr>
        <td><strong>${esc(r.fullName)}</strong>${r.isActive ? '' : '<span class="badge bg-secondary ms-1">Inactive</span>'}<div class="small text-muted">${esc(r.company)}</div></td>
        <td>${r.attendance.rate === null ? '—' : `${r.attendance.rate.toFixed(1)}%`}<div class="small text-muted">${r.attendance.attendedTotal}/${r.attendance.marked} marked${r.attendance.notMarked ? ` · ${r.attendance.notMarked} unmarked` : ''}</div></td>
        <td><span class="badge ${r.eligibility === 'Eligible' ? 'bg-success' : 'bg-secondary'}">${esc(r.eligibility)}</span></td>
        <td>${money(r.allowances)}</td><td>${money(r.deductions)}</td><td>${money(r.rewards)}</td><td class="fw-bold">${money(r.netPayable)}${r.excessDeductions ? `<div class="small text-danger">Excess deductions: ${money(r.excessDeductions)}</div>` : ''}</td>
        <td><button class="btn btn-sm btn-outline-burgundy" data-payment-player="${esc(r.playerId)}">Details / adjust</button></td></tr>`).join('') || '<tr><td colspan="8" class="text-center text-muted py-4">No players found.</td></tr>'}
      </tbody></table></div></div>`;
    result.querySelectorAll('[data-payment-player]').forEach(button => button.addEventListener('click', () => openBreakdown(report.rows.find(r => r.playerId === button.dataset.paymentPlayer), report, load)));
  }
  async function load() {
    if (!monthInput.reportValidity()) return;
    const number = ++requestNumber;
    report = null;
    result.innerHTML = '<div class="text-muted p-4">Calculating monthly payments...</div>';
    csv.removeAttribute('href');
    try {
      const data = await api.get(`/api/payments/monthly?month=${encodeURIComponent(monthInput.value)}`);
      if (number !== requestNumber || !container.isConnected) return;
      report = data;
      csv.href = `/api/payments/monthly/csv?month=${encodeURIComponent(data.month)}`;
      renderRows();
    } catch (err) {
      if (number === requestNumber && container.isConnected) paymentLoadError(result, err, load);
    }
  }
  monthInput.addEventListener('change', load);
  container.querySelector('#payment-refresh').addEventListener('click', load);
  container.querySelector('#payment-search').addEventListener('input', renderRows);
  await load();
}

function openBreakdown(row, report, reload) {
  const a = row.attendance;
  const adjustments = report.adjustments.filter(adj => String(adj.player?._id || adj.player) === row.playerId);
  openModal({
    title: `${esc(row.fullName)} · ${esc(report.month)}`,
    contentHtml: `
      <div class="row g-2 mb-3 small">${[['Attended', a.attended], ['Late', a.late], ['Absent', a.absent], ['Excused', a.excused], ['Unmarked', a.notMarked], ['Attendance', a.rate === null ? '—' : `${a.rate.toFixed(1)}%`]].map(([label, value]) => `<div class="col-4 col-md-2"><div class="border rounded p-2"><div class="text-muted">${label}</div><strong>${value}</strong></div></div>`).join('')}</div>
      <div class="small text-muted mb-3">Verified this month: ${row.performance.runs} runs · ${row.performance.wickets} wickets · ${row.performance.fieldingPoints} fielding points across ${row.performance.verifiedMatches} matches.</div>
      <form id="eligibility-form" class="border rounded p-3 mb-3">
        <label class="d-flex gap-2 align-items-center"><input type="checkbox" id="allowance-eligible" ${row.allowanceEligible ? 'checked' : ''}>Eligible for allowances</label>
        <label for="eligibility-note" class="form-label-custom mt-2">Eligibility note</label><input id="eligibility-note" class="form-control-custom" maxlength="500" value="${esc(row.allowanceEligibilityNote)}">
        <div class="small text-muted my-2">Allowance rules also check the monthly attendance requirements. Manual allowances require this player eligibility setting.</div>
        <button class="btn btn-sm btn-outline-burgundy" type="submit">Save eligibility</button>
      </form>
      <h6 class="text-main">Payment breakdown · LKR</h6>
      <div class="table-responsive"><table class="table-custom"><thead><tr><th>Item</th><th>Type</th><th>Basis</th><th>Amount</th></tr></thead><tbody>
        ${row.lines.map(line => `<tr><td>${esc(line.name)}<div class="small text-muted">${esc(line.source)}</div></td><td>${esc(line.kind)}</td><td>${esc(line.basis)}${line.source === 'Rule' ? `<div class="small text-muted">${esc(metricLabels[line.metric])}: ${line.value} · ${line.units} payment unit(s)</div>` : ''}</td><td>${line.kind === 'Deduction' ? '−' : ''}${money(line.amount)}</td></tr>`).join('') || '<tr><td colspan="4" class="text-muted">No payment items apply.</td></tr>'}
      </tbody></table></div>
      ${row.excluded.length ? `<div class="border rounded p-3 my-3 small"><strong>Allowances held / excluded</strong>${row.excluded.map(item => `<div class="mt-1">${esc(item.name)}: ${esc(item.reason)}</div>`).join('')}</div>` : ''}
      <div class="fw-bold my-3">Net payable: LKR ${money(row.netPayable)}${row.excessDeductions ? ` · Excess deductions: LKR ${money(row.excessDeductions)}` : ''}</div>
      <div class="d-flex justify-content-between align-items-center mb-2"><h6 class="mb-0">Player adjustments</h6><button id="add-payment-adjustment" class="btn btn-sm btn-burgundy">Add allowance / deduction / reward</button></div>
      ${adjustments.map(adj => `<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 border-top py-2 small"><span>${esc(adj.name)} · ${esc(adj.kind)} · LKR ${money(adj.amount)}</span><span><button class="btn btn-sm btn-light-custom" data-edit-adjustment="${esc(adj._id)}">Edit</button> <button class="btn btn-sm btn-outline-danger" data-delete-adjustment="${esc(adj._id)}">Delete</button></span></div>`).join('') || '<div class="small text-muted">No manual adjustments for this player and month.</div>'}`,
    footerHtml: '<button class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',
    onOpen(modal) {
      modal.querySelector('#add-payment-adjustment').addEventListener('click', () => adjustmentModal(row, report.month, reload));
      modal.querySelectorAll('[data-edit-adjustment]').forEach(button => button.addEventListener('click', () => adjustmentModal(row, report.month, reload, adjustments.find(a => a._id === button.dataset.editAdjustment))));
      modal.querySelectorAll('[data-delete-adjustment]').forEach(button => button.addEventListener('click', () => {
        const adjustment = adjustments.find(a => a._id === button.dataset.deleteAdjustment);
        deleteModal('Delete adjustment', `${adjustment.name} · LKR ${money(adjustment.amount)}`, `/api/payments/adjustments/${adjustment._id}`, reload);
      }));
      modal.querySelector('#eligibility-form').addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        button.disabled = true;
        try {
          await api.put(`/api/players/${row.playerId}`, { allowanceEligible: modal.querySelector('#allowance-eligible').checked, allowanceEligibilityNote: modal.querySelector('#eligibility-note').value });
          closeModal(); showToast('Allowance eligibility saved.', 'success'); await reload();
        } catch (err) { showToast(err.message, 'error'); button.disabled = false; }
      });
    }
  });
}

function adjustmentModal(row, month, reload, adjustment = null) {
  openModal({
    title: `${adjustment ? 'Edit' : 'Add'} payment adjustment`,
    contentHtml: `<p class="small text-muted">${esc(row.fullName)} · ${esc(month)} · LKR. Applies only to this player and month.</p>
      <form id="adjustment-form"><div class="row g-3">
        <div class="col-md-6"><label for="adj-kind" class="form-label-custom">Type</label><select id="adj-kind" class="form-select-custom">${['Allowance', 'Deduction', 'Reward'].map(k => option(k, k, adjustment?.kind || 'Allowance')).join('')}</select></div>
        ${input('adj-amount', 'Amount · LKR', adjustment?.amount ?? '', 'type="number" min="0.01" max="1000000000" step="0.01" required')}
        ${input('adj-name', 'Name / reason', adjustment?.name || '', 'maxlength="120" required')}
        ${input('adj-note', 'Notes', adjustment?.note || '', 'maxlength="1000"')}
      </div></form>${!row.allowanceEligible ? '<p class="small text-danger mt-3">This player is ineligible for allowances. Allowance adjustments will be excluded until eligibility is enabled.</p>' : ''}`,
    onOpen(modal) {
      modal.querySelector('#modal-btn-save').addEventListener('click', async event => {
        if (!modal.querySelector('form').reportValidity()) return;
        const button = event.currentTarget;
        button.disabled = true;
        const body = { player: row.playerId, month, kind: modal.querySelector('#adj-kind').value, amount: Number(modal.querySelector('#adj-amount').value), name: modal.querySelector('#adj-name').value, note: modal.querySelector('#adj-note').value };
        try {
          if (adjustment) await api.put(`/api/payments/adjustments/${adjustment._id}`, body);
          else await api.post('/api/payments/adjustments', body);
          closeModal(); showToast('Payment adjustment saved.', 'success'); await reload();
        } catch (err) { showToast(err.message, 'error'); button.disabled = false; }
      });
    }
  });
}

function deleteModal(title, label, endpoint, reload) {
  openModal({ title, contentHtml: `<p>Delete <strong>${esc(label)}</strong>?</p><p class="small text-muted mb-0">Calculated monthly payments will update immediately.</p>`,
    footerHtml: '<button class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button><button class="btn btn-danger" id="confirm-payment-delete">Delete</button>',
    onOpen(modal) { modal.querySelector('#confirm-payment-delete').addEventListener('click', async event => {
      const button = event.currentTarget; button.disabled = true;
      try { await api.delete(endpoint); closeModal(); showToast('Deleted successfully.', 'success'); await reload(); }
      catch (err) { showToast(err.message, 'error'); button.disabled = false; }
    }); }
  });
}

export async function renderPaymentRules(container, user) {
  if (!guard(container, user)) return;
  let rules = [], players = [];
  let selectedPlayer = '';
  container.innerHTML = `
    <div class="payment-view d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4"><div><h2 class="page-title mb-1">Rates &amp; Reward Rules</h2><div class="small text-muted">Manage allowance eligibility, deduction rates and performance rewards · LKR</div></div><div class="d-flex gap-2"><a href="#/payments" class="btn btn-light-custom">Monthly payments</a><button class="btn btn-burgundy" id="add-payment-rule" disabled>Add rule</button></div></div>
    <div class="card-custom p-3 mb-4 small text-muted">Set amounts using the club's approved rates. Rules can apply to all players or selected players, with start and end months. All matching rules add together. Editing or deleting a rule recalculates every month in its date range; use a new rule with a later start month for a rate change.</div>
    <div class="card-custom p-3 mb-4">
      <label for="rules-player-filter" class="form-label-custom">Manage rates and rewards for</label>
      <select id="rules-player-filter" class="form-select-custom" disabled><option value="">All players</option></select>
      <div class="small text-muted mt-2" id="rules-player-context">Choose a player to add their attendance allowance, performance reward or deduction. Shared rules also apply to that player.</div>
    </div>
    <div id="payment-rules-list" aria-live="polite"></div>`;
  const list = container.querySelector('#payment-rules-list');
  const playerFilter = container.querySelector('#rules-player-filter');
  function addRule(kind) {
    const defaults = {
      players: selectedPlayer ? [selectedPlayer] : [], kind,
      ...(kind === 'Allowance' ? { metric: 'monthly', calculation: 'Fixed', period: 'Month' } : {}),
      ...(kind === 'Deduction' ? { metric: 'absent', calculation: 'Per unit', period: 'Month' } : {}),
      ...(kind === 'Reward' ? { metric: 'runs', calculation: 'Fixed', threshold: 50, period: 'Match' } : {})
    };
    ruleModal(players, load, null, defaults);
  }
  function renderRules() {
    const player = players.find(p => p._id === selectedPlayer);
    container.querySelector('#rules-player-context').textContent = player
      ? `New rules will apply to ${player.fullName}. Shared rules and this player's own rules both contribute to their monthly payment.`
      : 'Choose a player to add their attendance allowance, performance reward or deduction. Shared rules also apply to that player.';
    list.innerHTML = ['Allowance', 'Deduction', 'Reward'].map(kind => {
      const group = rules.filter(r => r.kind === kind && (!selectedPlayer || !r.players?.length || r.players.includes(selectedPlayer)));
      const title = kind === 'Allowance' ? 'Attendance allowances & eligibility' : kind === 'Deduction' ? 'Payment deduction rates' : 'Performance rewards';
      const addLabel = kind === 'Allowance' ? 'Add attendance allowance' : kind === 'Deduction' ? 'Add deduction' : 'Add performance reward';
      return `<div class="card-custom mb-4"><div class="p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2"><h5 class="mb-0 fs-6">${title}</h5><button class="btn btn-sm btn-outline-burgundy" data-add-rule-kind="${kind}">${addLabel}</button></div>
        <div class="table-responsive"><table class="table-custom"><thead><tr><th>Rule</th><th>Rate · LKR</th><th>Applies to</th><th>Eligibility / basis</th><th>Effective months</th><th>Manage</th></tr></thead><tbody>
        ${group.map(r => `<tr><td><strong>${esc(r.name)}</strong><div><span class="badge ${r.enabled ? 'bg-success' : 'bg-secondary'}">${r.enabled ? 'Enabled' : 'Disabled'}</span></div></td>
          <td>${money(r.amount)}<div class="small text-muted">${esc(r.calculation)}</div></td>
          <td>${r.players?.length ? r.players.map(id => esc(players.find(p => p._id === id)?.fullName || 'Inactive player')).join(', ') : 'All players (shared)'}</td>
          <td>${esc(metricLabels[r.metric])} ≥ ${r.threshold}<div class="small text-muted">${r.kind === 'Allowance' ? `Attendance ≥ ${r.minAttendanceRate}%; ${r.minimumMarkedSessions}+ marked session(s)${r.requireCompleteAttendance ? '; complete roll call required' : ''}` : r.kind === 'Reward' ? (r.period === 'Match' ? 'Each verified match' : 'Monthly verified totals') : 'Monthly attendance'}</div></td>
          <td>${esc(r.effectiveFrom)}${r.effectiveTo ? ` to ${esc(r.effectiveTo)}` : ' onwards'}</td><td><div class="d-flex gap-2"><button class="btn btn-sm btn-outline-burgundy" data-edit-rule="${esc(r._id)}">Edit</button><button class="btn btn-sm btn-outline-danger" data-delete-rule="${esc(r._id)}">Delete</button></div></td></tr>`).join('') || `<tr><td colspan="6" class="text-center text-muted py-4">No ${kind.toLowerCase()} rules${selectedPlayer ? ' for this player' : ''}. Add a rule to set the rate.</td></tr>`}
        </tbody></table></div></div>`;
    }).join('');
    list.querySelectorAll('[data-add-rule-kind]').forEach(button => button.addEventListener('click', () => addRule(button.dataset.addRuleKind)));
    list.querySelectorAll('[data-edit-rule]').forEach(button => button.addEventListener('click', () => ruleModal(players, load, rules.find(r => r._id === button.dataset.editRule))));
    list.querySelectorAll('[data-delete-rule]').forEach(button => button.addEventListener('click', () => {
      const rule = rules.find(r => r._id === button.dataset.deleteRule);
      deleteModal('Delete payment rule', rule.name, `/api/payments/rules/${rule._id}`, load);
    }));
  }
  async function load() {
    container.querySelector('#add-payment-rule').disabled = true;
    playerFilter.disabled = true;
    list.innerHTML = '<div class="text-muted p-3">Loading rates and reward rules...</div>';
    try {
      const [data, squad] = await Promise.all([api.get('/api/payments/rules'), api.get('/api/players')]);
      if (!container.isConnected) return;
      rules = data.rules; players = squad.players;
      if (selectedPlayer && !players.some(p => p._id === selectedPlayer)) selectedPlayer = '';
      playerFilter.innerHTML = option('', 'All players', selectedPlayer) + players.map(p => option(p._id, p.fullName, selectedPlayer)).join('');
      playerFilter.disabled = false;
      container.querySelector('#add-payment-rule').disabled = false;
      renderRules();
    } catch (err) { if (container.isConnected) paymentLoadError(list, err, load); }
  }
  playerFilter.addEventListener('change', () => { selectedPlayer = playerFilter.value; renderRules(); });
  container.querySelector('#add-payment-rule').addEventListener('click', () => addRule('Allowance'));
  await load();
}

function ruleModal(players, reload, rule = null, defaults = {}) {
  const values = rule || defaults;
  const selectedPlayers = (values.players || []).map(String);
  const choices = [...players, ...selectedPlayers.filter(id => !players.some(p => p._id === id)).map(id => ({ _id: id, fullName: 'Inactive player' }))];
  openModal({
    title: rule ? 'Edit rates / reward rule' : 'Add rates / reward rule',
    contentHtml: `<form id="payment-rule-form"><div class="row g-3">
      ${input('rule-name', 'Rule name', rule?.name || '', 'maxlength="120" required placeholder="e.g. Monthly practice allowance"')}
      <div class="col-md-6"><label for="rule-kind" class="form-label-custom">Rule type</label><select id="rule-kind" class="form-select-custom">${Object.keys(metrics).map(kind => option(kind, kind === 'Allowance' ? 'Attendance allowance' : kind === 'Reward' ? 'Performance reward' : 'Deduction', values.kind || 'Allowance')).join('')}</select></div>
      <div class="col-md-6"><label for="rule-metric" class="form-label-custom">Calculate using</label><select id="rule-metric" class="form-select-custom"></select></div>
      ${input('rule-amount', 'Rate / amount · LKR', rule?.amount ?? 0, 'type="number" min="0" max="1000000000" step="0.01" required')}
      <div class="col-md-6"><label for="rule-calculation" class="form-label-custom">Calculation</label><select id="rule-calculation" class="form-select-custom">${['Fixed', 'Per unit', 'Per milestone'].map(value => option(value, value === 'Fixed' ? 'Fixed amount when threshold met' : value === 'Per unit' ? 'Rate × every unit' : 'Rate × completed milestones', values.calculation || 'Fixed')).join('')}</select></div>
      ${input('rule-threshold', 'Minimum units / milestone size', values.threshold ?? 1, 'type="number" min="0.5" max="1000000000" step="0.5" required')}
      <div class="col-12 small text-muted" id="rule-example">For absence deductions, use Per unit with a threshold of 1. A reward for a fifty uses Runs, Fixed, threshold 50, Each verified match. Per milestone pays once for each completed threshold.</div>
      <div class="col-md-6" id="rule-period-group"><label for="rule-period" class="form-label-custom">Performance period</label><select id="rule-period" class="form-select-custom">${option('Month', 'Monthly verified totals', values.period || 'Match')}${option('Match', 'Each verified match', values.period || 'Match')}</select></div>
      <div class="col-12" id="rule-eligibility"><div class="border rounded p-3"><h6 class="fs-6">Allowance eligibility</h6><div class="row g-3">
        ${input('rule-attendance-rate', 'Minimum monthly attendance %', rule?.minAttendanceRate ?? 75, 'type="number" min="0" max="100" step="0.1" required')}
        ${input('rule-min-sessions', 'Minimum marked sessions', rule?.minimumMarkedSessions ?? 1, 'type="number" min="1" max="10000" step="1" required')}
        <div class="col-12"><label class="d-flex gap-2 align-items-center"><input id="rule-complete" type="checkbox" ${rule?.requireCompleteAttendance !== false ? 'checked' : ''}>Hold allowance until all of the player's roll calls for this month are marked</label><div class="small text-muted mt-2">The player must also be marked eligible for allowances in their profile or payment details.</div></div>
      </div></div></div>
      ${input('rule-start', 'Effective from month', rule?.effectiveFrom || monthNow(), 'type="month" required')}
      ${input('rule-end', 'Effective to month (optional)', rule?.effectiveTo || '', 'type="month"')}
      <div class="col-12"><label for="rule-scope" class="form-label-custom">Apply to players</label><select id="rule-scope" class="form-select-custom mb-2">${option('all', 'All players', selectedPlayers.length ? 'selected' : 'all')}${option('selected', 'Selected players', selectedPlayers.length ? 'selected' : 'all')}</select>
        <div id="rule-players"><label for="rule-player-search" class="form-label-custom">Find players</label><input id="rule-player-search" class="form-control-custom mb-2" type="search" placeholder="Search player name" aria-describedby="rule-player-help">
          <div class="border rounded p-2" style="max-height: 200px; overflow-y: auto;">${choices.map(p => `<label class="d-flex align-items-center gap-2 p-2 small" data-rule-player-name="${esc(p.fullName.toLowerCase())}"><input type="checkbox" class="rule-player-checkbox" value="${esc(p._id)}" ${selectedPlayers.includes(p._id) ? 'checked' : ''}>${esc(p.fullName)}</label>`).join('') || '<div class="small text-muted p-2">No players available.</div>'}</div>
          <div class="small text-muted mt-2" id="rule-player-help">Tick each player this rule applies to.</div>
        </div>
        <div class="small text-muted mt-2" id="rule-scope-summary" aria-live="polite"></div>
      </div>
      <div class="col-12"><label class="d-flex gap-2 align-items-center"><input id="rule-enabled" type="checkbox" ${rule?.enabled !== false ? 'checked' : ''}>Rule enabled</label></div>
    </div></form>`,
    onOpen(modal) {
      const find = id => modal.querySelector(`#${id}`);
      function updateMetric() {
        const kind = find('rule-kind').value;
        const chosen = find('rule-metric').value || values.metric;
        find('rule-metric').innerHTML = metrics[kind].map(metric => option(metric, metricLabels[metric], chosen)).join('');
        find('rule-eligibility').classList.toggle('d-none', kind !== 'Allowance');
        find('rule-period-group').classList.toggle('d-none', kind !== 'Reward');
        find('rule-attendance-rate').disabled = kind !== 'Allowance';
        find('rule-min-sessions').disabled = kind !== 'Allowance';
        updateCalculation();
      }
      function updateCalculation() {
        const monthly = find('rule-metric').value === 'monthly';
        find('rule-calculation').disabled = monthly;
        find('rule-threshold').disabled = monthly;
        if (monthly) { find('rule-calculation').value = 'Fixed'; find('rule-threshold').value = '1'; }
      }
      function updateScope() {
        const selected = find('rule-scope').value === 'selected';
        find('rule-players').classList.toggle('d-none', !selected);
        modal.querySelectorAll('.rule-player-checkbox').forEach(checkbox => { checkbox.disabled = !selected; });
        const names = choices.filter(p => [...modal.querySelectorAll('.rule-player-checkbox:checked')].some(checkbox => checkbox.value === p._id)).map(p => p.fullName);
        find('rule-scope-summary').textContent = selected ? (names.length ? `Applies to: ${names.join(', ')}` : 'Choose at least one player.') : 'Applies to all players.';
      }
      find('rule-kind').addEventListener('change', updateMetric);
      find('rule-metric').addEventListener('change', updateCalculation);
      find('rule-scope').addEventListener('change', updateScope);
      modal.querySelectorAll('.rule-player-checkbox').forEach(checkbox => checkbox.addEventListener('change', updateScope));
      find('rule-player-search').addEventListener('input', event => {
        const search = event.target.value.trim().toLowerCase();
        modal.querySelectorAll('[data-rule-player-name]').forEach(label => label.classList.toggle('d-none', !label.dataset.rulePlayerName.includes(search)));
      });
      updateMetric(); updateScope();
      find('modal-btn-save').addEventListener('click', async event => {
        if (!find('payment-rule-form').reportValidity()) return;
        const body = {
          name: find('rule-name').value, kind: find('rule-kind').value, metric: find('rule-metric').value,
          amount: Number(find('rule-amount').value), calculation: find('rule-calculation').value, threshold: Number(find('rule-threshold').value),
          period: find('rule-kind').value === 'Reward' ? find('rule-period').value : 'Month',
          minAttendanceRate: Number(find('rule-attendance-rate').value), minimumMarkedSessions: Number(find('rule-min-sessions').value), requireCompleteAttendance: find('rule-complete').checked,
          effectiveFrom: find('rule-start').value, effectiveTo: find('rule-end').value, enabled: find('rule-enabled').checked,
          players: find('rule-scope').value === 'all' ? [] : [...modal.querySelectorAll('.rule-player-checkbox:checked')].map(checkbox => checkbox.value)
        };
        if (find('rule-scope').value === 'selected' && !body.players.length) { showToast('Choose at least one player for this rule.', 'error'); return; }
        if (body.effectiveTo && body.effectiveTo < body.effectiveFrom) { showToast('End month must be on or after the start month.', 'error'); return; }
        const button = event.currentTarget; button.disabled = true;
        try {
          if (rule) await api.put(`/api/payments/rules/${rule._id}`, body);
          else await api.post('/api/payments/rules', body);
          closeModal(); showToast('Payment rule saved.', 'success'); await reload();
        } catch (err) { showToast(err.message, 'error'); button.disabled = false; }
      });
    }
  });
}
