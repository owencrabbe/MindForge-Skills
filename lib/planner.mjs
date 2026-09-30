export const STORAGE_KEY = 'phroneme.fitness-lab.week.v1';
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MAX_HABITS = 6;
const DAY_MS = 86400000;

function dayDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Use a valid calendar date.');
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error('Use a valid calendar date.');
  return date;
}

export function localDate(now = new Date()) {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new Error('Use a valid date.');
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function weekStart(value = localDate()) {
  const date = dayDate(value);
  const offset = (date.getUTCDay() + 6) % 7;
  return new Date(date.getTime() - offset * DAY_MS).toISOString().slice(0, 10);
}

export function weekDates(startDate) {
  const start = dayDate(startDate);
  return WEEKDAYS.map((_, index) => new Date(start.getTime() + index * DAY_MS).toISOString().slice(0, 10));
}

function cleanText(value, name, max, required = false) {
  if (typeof value !== 'string') throw new Error(`${name} must be text.`);
  const text = value.trim();
  if (required && !text) throw new Error(`Add ${name.toLowerCase()}.`);
  if (text.length > max) throw new Error(`${name} must be ${max} characters or fewer.`);
  return text;
}

export function createPlan(input, now = new Date()) {
  if (!input || typeof input !== 'object') throw new Error('Add a weekly plan.');
  const startDate = weekStart(input.startDate || localDate(now));
  const goal = cleanText(input.goal ?? '', 'A focus', 140, true);
  const context = cleanText(input.context ?? '', 'Context', 500);
  if (!Array.isArray(input.habits) || !input.habits.length || input.habits.length > MAX_HABITS) {
    throw new Error(`Choose between 1 and ${MAX_HABITS} habits.`);
  }
  const habits = input.habits.map((habit, index) => {
    const name = cleanText(habit?.name, 'Habit name', 80, true);
    if (!Array.isArray(habit.days) || !habit.days.length || habit.days.some(day => !Number.isInteger(day) || day < 0 || day > 6)) {
      throw new Error(`Choose at least one valid day for ${name}.`);
    }
    return { id: `habit-${index + 1}`, name, days: [...new Set(habit.days)].sort((a, b) => a - b) };
  });
  if (new Set(habits.map(habit => habit.name.toLowerCase())).size !== habits.length) throw new Error('Give each habit a different name.');
  return { schemaVersion: 1, startDate, createdAt: now.toISOString(), goal, context, habits, completions: {}, reflection: '' };
}

function validatePlan(plan) {
  if (!plan || typeof plan !== 'object' || Array.isArray(plan) || plan.schemaVersion !== 1) throw new Error('This saved plan uses an unsupported format.');
  if (weekStart(plan.startDate) !== plan.startDate) throw new Error('The saved week must begin on Monday.');
  if (typeof plan.createdAt !== 'string' || !Number.isFinite(new Date(plan.createdAt).getTime())) throw new Error('The saved creation date is invalid.');
  const validated = createPlan({ startDate: plan.startDate, goal: plan.goal, context: plan.context, habits: plan.habits }, new Date(plan.createdAt));
  if (plan.habits.some((habit, index) => habit.id !== validated.habits[index].id)) throw new Error('Saved habit identifiers are invalid.');
  if (!plan.completions || typeof plan.completions !== 'object' || Array.isArray(plan.completions)) throw new Error('Saved completion data is invalid.');
  const allowed = new Set(validated.habits.flatMap(habit => habit.days.map(day => `${habit.id}:${weekDates(validated.startDate)[day]}`)));
  for (const [key, value] of Object.entries(plan.completions)) {
    if (!allowed.has(key) || value !== true) throw new Error('Saved completion data contains an unplanned or invalid entry.');
    validated.completions[key] = true;
  }
  validated.reflection = cleanText(plan.reflection ?? '', 'Reflection', 1800);
  return validated;
}

export function parseStoredPlan(raw) {
  if (raw == null || raw === '') return { plan: null, error: null };
  if (typeof raw !== 'string' || raw.length > 40000) return { plan: null, error: 'The saved plan could not be read. Export a backup when your plan is available.' };
  try { return { plan: validatePlan(JSON.parse(raw)), error: null }; }
  catch { return { plan: null, error: 'A saved plan could not be read. Your browser data has not been changed; create a new plan to replace it.' }; }
}

export function toggleCompletion(plan, habitId, date) {
  const next = validatePlan(plan);
  const habit = next.habits.find(item => item.id === habitId);
  const day = weekDates(next.startDate).indexOf(date);
  if (!habit || day < 0 || !habit.days.includes(day)) throw new Error('Only a planned habit can be checked off.');
  const key = `${habitId}:${date}`;
  if (next.completions[key]) delete next.completions[key];
  else next.completions[key] = true;
  return next;
}

export function updateReflection(plan, text) {
  const next = validatePlan(plan);
  next.reflection = cleanText(text, 'Reflection', 1800);
  return next;
}

export function summarizePlan(plan) {
  const valid = validatePlan(plan);
  const dates = weekDates(valid.startDate);
  const days = dates.map((date, index) => {
    const due = valid.habits.filter(habit => habit.days.includes(index));
    return { date, label: WEEKDAYS[index], planned: due.length, completed: due.filter(habit => valid.completions[`${habit.id}:${date}`]).length };
  });
  const planned = days.reduce((total, day) => total + day.planned, 0);
  const completed = days.reduce((total, day) => total + day.completed, 0);
  return { planned, completed, percentage: Math.round(completed / planned * 100), days };
}

export function exportPlanJson(plan) { return JSON.stringify(validatePlan(plan), null, 2); }

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

export function renderPrintableJournal(plan) {
  const valid = validatePlan(plan);
  const summary = summarizePlan(valid);
  const dates = weekDates(valid.startDate);
  const rows = valid.habits.map(habit => `<tr><th scope="row">${escapeHtml(habit.name)}</th>${dates.map((date, day) => `<td>${habit.days.includes(day) ? valid.completions[`${habit.id}:${date}`] ? '✓' : '□' : '—'}</td>`).join('')}</tr>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Phroneme · week of ${valid.startDate}</title><style>body{font-family:system-ui,sans-serif;max-width:900px;margin:40px auto;padding:24px;color:#222}h1{font-size:38px}p{line-height:1.7;white-space:pre-wrap}table{border-collapse:collapse;width:100%;margin:28px 0}th,td{border:1px solid #bbb;padding:14px;text-align:center}th:first-child{text-align:left}small{color:#555}.reflection{min-height:160px;border:1px solid #bbb;padding:18px}footer{margin-top:32px;font-size:12px}@media print{body{margin:0}.print-note{display:none}}</style></head><body><small>PHRONEME / WEEKLY JOURNAL</small><h1>${escapeHtml(valid.goal)}</h1><p>Week of ${valid.startDate} · ${summary.completed} of ${summary.planned} planned check-ins completed.</p>${valid.context ? `<p>${escapeHtml(valid.context)}</p>` : ''}<p class="print-note">To print or save a PDF, open your browser’s Print command. This file contains your personal plan; keep it somewhere you trust.</p><table><thead><tr><th scope="col">My habit</th>${dates.map((date, day) => `<th scope="col">${WEEKDAYS[day]}<br><small>${date.slice(5)}</small></th>`).join('')}</tr></thead><tbody>${rows}</tbody></table><h2>What worked? What will I change?</h2><div class="reflection"><p>${escapeHtml(valid.reflection)}</p></div><footer>Phroneme Fitness Lab · User-chosen habits and personal reflection. Completion records describe this plan, not health outcomes.</footer></body></html>`;
}
