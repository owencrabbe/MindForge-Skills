import { STORAGE_KEY, WEEKDAYS, localDate, weekStart, weekDates, createPlan, parseStoredPlan, toggleCompletion, updateReflection, summarizePlan, exportPlanJson, renderPrintableJournal, escapeHtml } from './lib/planner.mjs';
import { sources, claims, reviewClaim, getEvidenceSummary } from './lib/evidence.mjs';
import { config } from './config.mjs';

const $ = id => document.getElementById(id);
const suggestedHabits = ['My chosen movement', 'Make space for recovery', 'Reflect on my day', 'Practice a skill'];
const methods = [
  { name: 'Deep research', operation: 'LEARN', question: 'What would count as good evidence?', description: 'Separate a personal story from a broader claim. Find the original source, identify who was studied, and write down what remains uncertain.' },
  { name: 'First principles', operation: 'DECOMPOSE', question: 'What am I actually trying to make easier?', description: 'Name the practical problem beneath your goal. Which constraints are real, and which assumptions could you change this week?' },
  { name: 'Steelman / red team', operation: 'STRESS-TEST', question: 'What is the strongest reason this plan could fail?', description: 'Give your plan a fair hearing, then examine its weakest assumption. Choose one adjustment before a predictable obstacle arrives.' },
  { name: 'Decision forge', operation: 'DECIDE', question: 'Which option fits the week I actually have?', description: 'Compare two realistic options using your own criteria. Consider the time, effort, and tradeoffs, then choose a reversible next step.' },
  { name: 'Socratic partner', operation: 'QUESTION', question: 'What am I treating as true without checking?', description: 'Ask why you believe the claim. What observation would change your mind? Write your answer before looking for agreement.' },
  { name: 'Cross-pollinate', operation: 'CONNECT', question: 'What useful pattern could I borrow?', description: 'Look for a practical idea from another part of your life. Explain why the pattern might transfer, then try a small version and observe what happens.' },
];

let plan = null;
let savedRecordExists = false;
let chosenHabits = [];
let activeMethod = null;

function storageMessage(message) { $('storage-message').textContent = message; }

try {
  const raw = localStorage.getItem(STORAGE_KEY);
  savedRecordExists = raw != null;
  const restored = parseStoredPlan(raw);
  plan = restored.plan;
  if (restored.error) storageMessage(restored.error);
} catch { storageMessage('Browser storage is unavailable. You can use the lab for this session and export your plan.'); }

function savePlan(next, message = 'Saved in this browser. Export a backup to keep a copy.') {
  plan = next;
  try { localStorage.setItem(STORAGE_KEY, exportPlanJson(plan)); savedRecordExists = true; storageMessage(message); }
  catch { storageMessage('Your plan is available for this session, but this browser could not save it. Export a copy before closing the page.'); }
}

async function confirmChange(title, description, action) {
  const dialog = $('confirm-dialog');
  $('confirm-title').textContent = title;
  $('confirm-description').textContent = description;
  $('confirm-action').textContent = action;
  if (typeof dialog.showModal !== 'function') return window.confirm(`${title}\n\n${description}`);
  dialog.returnValue = 'cancel';
  return new Promise(resolve => {
    dialog.addEventListener('close', () => resolve(dialog.returnValue === 'confirm'), { once: true });
    dialog.showModal();
  });
}

function renderHabitChoices() {
  $('habit-options').innerHTML = suggestedHabits.map((name, index) => `<label class="habit-option"><input type="checkbox" data-suggested="${index}" ${chosenHabits.some(habit => habit.name === name) ? 'checked' : ''}><span>${escapeHtml(name)}</span><span class="option-plus" aria-hidden="true">+</span></label>`).join('');
  $('selected-habits').innerHTML = chosenHabits.map((habit, index) => `<fieldset class="day-choice"><legend>${escapeHtml(habit.name)}</legend><button type="button" class="remove-habit" data-remove="${index}" aria-label="Remove ${escapeHtml(habit.name)}">×</button><div class="day-pills">${WEEKDAYS.map((day, dayIndex) => `<label><input type="checkbox" data-habit="${index}" data-day="${dayIndex}" ${habit.days.includes(dayIndex) ? 'checked' : ''}><span>${day}</span></label>`).join('')}</div></fieldset>`).join('');
}

function addHabit(name) {
  const clean = name.trim();
  if (!clean) { $('form-message').textContent = 'Add a name for your habit.'; return false; }
  if (chosenHabits.length >= 6) { $('form-message').textContent = 'Choose up to six habits for this plan.'; return false; }
  if (chosenHabits.some(habit => habit.name.toLowerCase() === clean.toLowerCase())) { $('form-message').textContent = 'That habit is already in your plan.'; return false; }
  chosenHabits.push({ name: clean, days: [] });
  $('form-message').textContent = '';
  renderHabitChoices();
  return true;
}

function loadBuilder() {
  $('week-input').value = plan?.startDate || localDate();
  $('focus-input').value = plan?.goal || '';
  $('context-input').value = plan?.context || '';
  chosenHabits = plan ? plan.habits.map(habit => ({ name: habit.name, days: [...habit.days] })) : [];
  renderHabitChoices();
}

function renderPlan() {
  $('empty-state').hidden = Boolean(plan);
  $('saved-plan').hidden = !plan;
  if (!plan) { $('workspace-title').textContent = 'Your week starts here.'; return; }
  const dates = weekDates(plan.startDate);
  const summary = summarizePlan(plan);
  $('workspace-title').textContent = 'A little structure. Real check-ins.';
  $('saved-week').textContent = `WEEK OF ${plan.startDate} / ${dates.at(-1)}`;
  $('saved-focus').textContent = plan.goal;
  $('saved-context').textContent = plan.context;
  $('saved-context').hidden = !plan.context;
  $('completed-count').textContent = summary.completed;
  $('planned-count').textContent = summary.planned;
  $('completion-percent').textContent = `${summary.percentage}%`;
  $('reflection-input').value = plan.reflection;
  const today = localDate();
  $('habit-tracker').innerHTML = `<table class="habit-table"><caption class="sr-only">Weekly habit check-ins. Select a scheduled day to mark it complete or undo completion.</caption><thead><tr><th scope="col">My habit</th>${dates.map((date, index) => `<th scope="col" ${date === today ? 'class="today"' : ''}><span>${WEEKDAYS[index]}</span><small>${date.slice(8)}</small>${date === today ? '<span class="sr-only">Today</span>' : ''}</th>`).join('')}</tr></thead><tbody>${plan.habits.map(habit => `<tr><th scope="row">${escapeHtml(habit.name)}</th>${dates.map((date, day) => {
    if (!habit.days.includes(day)) return '<td><span class="unplanned" aria-label="No check-in planned">—</span></td>';
    const complete = Boolean(plan.completions[`${habit.id}:${date}`]);
    return `<td><button class="check-in ${complete ? 'is-complete' : ''}" type="button" data-complete="${habit.id}" data-date="${date}" aria-pressed="${complete}" aria-label="${escapeHtml(habit.name)}, ${WEEKDAYS[day]} ${date}, ${complete ? 'completed; undo' : 'mark complete'}">${complete ? '<span aria-hidden="true">✓</span>' : '<span aria-hidden="true">+</span>'}</button></td>`;
  }).join('')}</tr>`).join('')}</tbody></table>`;
  $('weekly-trend').innerHTML = summary.days.map(day => `<div class="trend-day"><div class="trend-count">${day.completed}<span>/${day.planned}</span></div><div class="bar-track">${Array.from({ length: 6 }, (_, index) => `<span class="bar-unit ${index < day.completed ? 'bar-completed' : index < day.planned ? 'bar-planned' : ''}"></span>`).reverse().join('')}</div><span class="trend-day-label">${day.label}</span><span class="sr-only">${day.completed} completed of ${day.planned} planned check-ins</span></div>`).join('');
}

$('habit-options').addEventListener('change', event => {
  const checkbox = event.target.closest('[data-suggested]');
  if (!checkbox) return;
  const name = suggestedHabits[Number(checkbox.dataset.suggested)];
  if (checkbox.checked) { if (!addHabit(name)) checkbox.checked = false; }
  else { chosenHabits = chosenHabits.filter(habit => habit.name !== name); renderHabitChoices(); }
});

$('selected-habits').addEventListener('change', event => {
  const checkbox = event.target.closest('[data-day]');
  if (!checkbox) return;
  const habit = chosenHabits[Number(checkbox.dataset.habit)];
  const day = Number(checkbox.dataset.day);
  if (!habit) return;
  habit.days = checkbox.checked ? [...new Set([...habit.days, day])].sort((a, b) => a - b) : habit.days.filter(value => value !== day);
});

$('selected-habits').addEventListener('click', event => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;
  chosenHabits.splice(Number(button.dataset.remove), 1);
  renderHabitChoices();
});

$('add-habit').addEventListener('click', () => { if (addHabit($('custom-habit').value)) $('custom-habit').value = ''; });
$('custom-habit').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); $('add-habit').click(); } });

$('plan-form').addEventListener('submit', async event => {
  event.preventDefault();
  try {
    if (!$('week-input').value) throw new Error('Choose a week for your plan.');
    const next = createPlan({ startDate: $('week-input').value, goal: $('focus-input').value, context: $('context-input').value, habits: chosenHabits });
    if ((plan || savedRecordExists) && !await confirmChange('Replace the saved plan?', 'This replaces your current plan and its check-ins in this browser. Export a journal or JSON backup first if you want to keep them.', 'Replace plan')) return;
    savePlan(next);
    $('form-message').textContent = '';
    $('reflection-status').textContent = 'Saved when you leave this field.';
    renderPlan();
    $('workspace-title').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (error) { $('form-message').textContent = error.message; }
});

$('habit-tracker').addEventListener('click', event => {
  const button = event.target.closest('[data-complete]');
  if (!button || !plan) return;
  try {
    const habitId = button.dataset.complete;
    const date = button.dataset.date;
    savePlan(toggleCompletion(plan, habitId, date));
    renderPlan();
    const replacement = document.querySelector(`[data-complete="${habitId}"][data-date="${date}"]`);
    replacement?.focus({ preventScroll: true });
  } catch (error) { storageMessage(error.message); }
});

function saveReflection() {
  if (!plan) return;
  try {
    savePlan(updateReflection(plan, $('reflection-input').value));
    $('reflection-status').textContent = 'Reflection saved in this browser.';
  } catch (error) { $('reflection-status').textContent = error.message; }
}
$('reflection-input').addEventListener('blur', saveReflection);
$('reflection-input').addEventListener('input', () => { $('reflection-status').textContent = 'Unsaved reflection. Leave this field or choose Save reflection.'; });
$('save-reflection').addEventListener('click', saveReflection);

function download(content, fileName, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
$('export-journal').addEventListener('click', () => { if (plan) { saveReflection(); download(renderPrintableJournal(plan), `phroneme-journal-${plan.startDate}.html`, 'text/html;charset=utf-8'); storageMessage('Journal downloaded. Open the file and use your browser’s Print command to print it or save a PDF.'); } });
$('export-json').addEventListener('click', () => { if (plan) { saveReflection(); download(exportPlanJson(plan), `phroneme-plan-${plan.startDate}.json`, 'application/json'); storageMessage('JSON backup downloaded. It includes the personal text and check-ins you entered.'); } });
$('delete-plan').addEventListener('click', async () => {
  if (!await confirmChange('Delete this plan?', 'This removes the saved plan, check-ins, and reflection from this browser. Downloaded copies are kept wherever you saved them.', 'Delete plan')) return;
  try { localStorage.removeItem(STORAGE_KEY); savedRecordExists = false; storageMessage('Your plan was deleted from this browser.'); }
  catch { storageMessage('The plan was cleared from this session. Browser storage could not be accessed; its saved copy may remain.'); }
  plan = null;
  loadBuilder();
  renderPlan();
});

$('methods-grid').innerHTML = methods.map((method, index) => `<button class="method-card" data-method="${index}" type="button" aria-expanded="false" aria-controls="method-detail"><span class="method-number">0${index + 1}</span><span class="eyebrow">${method.operation}</span><h3>${method.name}</h3><p>${method.question}</p><span class="method-arrow" aria-hidden="true">↗</span></button>`).join('');
$('methods-grid').addEventListener('click', event => {
  const button = event.target.closest('[data-method]');
  if (!button) return;
  activeMethod = methods[Number(button.dataset.method)];
  document.querySelectorAll('[data-method]').forEach(item => { item.setAttribute('aria-expanded', String(item === button)); item.classList.toggle('method-selected', item === button); });
  $('method-detail-name').textContent = activeMethod.name;
  $('method-detail-question').textContent = activeMethod.question;
  $('method-detail-description').textContent = activeMethod.description;
  $('method-message').textContent = '';
  $('method-detail').hidden = false;
});
$('use-method').addEventListener('click', () => {
  if (!activeMethod) return;
  if (!plan) { $('method-message').textContent = 'Create a weekly plan first, then add this question to your reflection.'; return; }
  const addition = `${activeMethod.name}: ${activeMethod.question}\n`;
  const updated = `${plan.reflection}${plan.reflection ? '\n\n' : ''}${addition}`;
  if (updated.length > 1800) { $('method-message').textContent = 'Your reflection is nearly full. Make room before adding another question.'; return; }
  savePlan(updateReflection(plan, updated));
  $('reflection-input').value = updated;
  $('reflection-status').textContent = 'Reflection prompt saved in this browser.';
  $('method-message').textContent = 'Question added to your reflection.';
  $('reflection-input').scrollIntoView({ behavior: 'smooth', block: 'center' });
  $('reflection-input').focus({ preventScroll: true });
});

function safeLink(value) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
}

const evidenceSummary = getEvidenceSummary();
$('claim-presets').innerHTML = claims.slice(0, 3).map((claim, index) => `<button type="button" data-claim="${index}">${escapeHtml(claim.title)}</button>`).join('');
$('claim-presets').addEventListener('click', event => {
  const button = event.target.closest('[data-claim]');
  if (!button) return;
  $('claim-input').value = claims[Number(button.dataset.claim)].text;
  $('claim-form').requestSubmit();
});
$('claim-form').addEventListener('submit', event => {
  event.preventDefault();
  const text = $('claim-input').value.trim();
  if (!text) return;
  const result = reviewClaim(text);
  const container = $('claim-result');
  container.hidden = false;
  container.classList.toggle('claim-match', result.status === 'catalog-match');
  const links = (result.sources || []).map(source => {
    const url = safeLink(source.url);
    return url ? `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)} ↗</a></li>` : '';
  }).join('');
  container.innerHTML = `<span class="result-label">${result.status === 'catalog-match' ? 'LIBRARY WORDING MATCH' : 'INSUFFICIENT EVIDENCE IN THIS LIBRARY'}</span><h4>${escapeHtml(result.title || (result.matched ? 'Read the source and its limits.' : 'This library cannot support that wording.'))}</h4><p>${escapeHtml(result.message)}</p>${result.claim?.caveat ? `<p class="result-caveat"><strong>Scope & limits:</strong> ${escapeHtml(result.claim.caveat)}</p>` : ''}${links ? `<ul>${links}</ul>` : ''}${(result.limitations || []).length ? `<p class="result-limitations">${result.limitations.map(escapeHtml).join(' ')}</p>` : ''}`;
});
$('library-count').textContent = `${sources.length} SOURCES / ${claims.length} STATEMENTS`;
$('source-list').innerHTML = sources.map((source, index) => {
  const url = safeLink(source.url);
  return `<article class="source-card"><span class="source-number">0${index + 1}</span><div><p class="eyebrow">${escapeHtml(source.publisher)} / ${escapeHtml(source.status)}</p><h4>${url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)} <span aria-hidden="true">↗</span></a>` : escapeHtml(source.title)}</h4><p>${escapeHtml(source.summary)}</p>${source.scope ? `<p class="source-scope">Scope: ${escapeHtml(source.scope)}</p>` : ''}<small>Reviewed ${escapeHtml(source.reviewedAt)} · Review due ${escapeHtml(source.reviewDueAt)}</small></div></article>`;
}).join('');
$('library-summary').textContent = `Curated library reviewed ${evidenceSummary.reviewedAt || 'with dates listed above'}. Method: deterministic wording match. AI model evaluation: ${evidenceSummary.modelEvaluation || 'NOT RUN'}.`;

for (const [id, url] of [['portfolio-link', config.portfolioUrl], ['repo-footer', config.repositoryUrl], ['source-code-link', config.repositoryUrl], ['product-home-link', config.productHomeUrl]]) {
  const checked = safeLink(url);
  if (checked) $(id).href = checked;
  else $(id).hidden = true;
}
if (config.productHomeLabel) $('product-home-link').textContent = `${config.productHomeLabel} ↗`;
if (safeLink(config.shopifyUrl)) {
  $('commerce-destination').innerHTML = `<a class="button button-orange" href="${escapeHtml(safeLink(config.shopifyUrl))}" target="_blank" rel="noopener noreferrer">Explore the Shopify collection <span aria-hidden="true">↗</span></a>`;
}
$('current-year').textContent = new Date().getFullYear();
loadBuilder();
renderPlan();
