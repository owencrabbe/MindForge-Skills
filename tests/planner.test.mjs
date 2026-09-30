import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlan, parseStoredPlan, toggleCompletion, updateReflection, summarizePlan, exportPlanJson, renderPrintableJournal, weekStart, weekDates, localDate } from '../lib/planner.mjs';

const input = { startDate: '2026-09-30', goal: 'Show up this week', context: 'Two busy evenings', habits: [{ name: 'My chosen movement', days: [0, 2, 4] }, { name: 'Write one reflection', days: [6] }] };
const make = () => createPlan(input, new Date('2026-09-30T12:00:00Z'));

test('weeks use Monday across month, leap-year, and year boundaries without DST drift', () => {
  assert.equal(weekStart('2026-09-30'), '2026-09-28');
  assert.equal(weekStart('2027-01-01'), '2026-12-28');
  assert.equal(weekStart('2024-02-29'), '2024-02-26');
  assert.deepEqual(weekDates('2026-03-02'), ['2026-03-02','2026-03-03','2026-03-04','2026-03-05','2026-03-06','2026-03-07','2026-03-08']);
  assert.equal(localDate(new Date(2026, 8, 30, 23, 59)), '2026-09-30');
  assert.throws(() => weekStart('2026-02-30'), /valid calendar date/);
});

test('validates activity count, names, selected days and free-text lengths', () => {
  assert.throws(() => createPlan({ ...input, habits: [] }), /between 1 and 6/);
  assert.throws(() => createPlan({ ...input, habits: [{ name: 'Walk', days: [7] }] }), /valid day/);
  assert.throws(() => createPlan({ ...input, habits: [{ name: 'Walk', days: [] }] }), /valid day/);
  assert.throws(() => createPlan({ ...input, habits: [{ name: 'Walk', days: [0] }, { name: 'walk', days: [1] }] }), /different name/);
  assert.throws(() => createPlan({ ...input, goal: 'a'.repeat(141) }), /140/);
  const plan = createPlan({ ...input, habits: [{ name: 'Walk', days: [4, 0, 4] }] });
  assert.deepEqual(plan.habits[0].days, [0, 4]);
});

test('malformed or hostile saved data fails closed without inventing completion records', () => {
  for (const raw of ['bad JSON', 'null', '{}', JSON.stringify({ ...make(), schemaVersion: 2 }), JSON.stringify({ ...make(), completions: { 'habit-1:2026-09-29': true } }), JSON.stringify({ ...make(), completions: { 'habit-1:2026-09-28': false } })]) {
    const result = parseStoredPlan(raw);
    assert.equal(result.plan, null);
    assert.ok(result.error);
  }
  assert.deepEqual(parseStoredPlan(null), { plan: null, error: null });
  assert.deepEqual(parseStoredPlan(JSON.stringify(make())).plan, make());
});

test('completion updates are immutable and restricted to scheduled dates', () => {
  const original = make();
  const completed = toggleCompletion(original, 'habit-1', '2026-09-28');
  assert.deepEqual(original.completions, {});
  assert.equal(completed.completions['habit-1:2026-09-28'], true);
  assert.deepEqual(toggleCompletion(completed, 'habit-1', '2026-09-28').completions, {});
  assert.throws(() => toggleCompletion(original, 'habit-1', '2026-09-29'), /Only a planned/);
  assert.throws(() => toggleCompletion(original, 'missing', '2026-09-28'), /Only a planned/);
  assert.throws(() => toggleCompletion(original, 'habit-1', '2026-10-05'), /Only a planned/);
});

test('progress reports exact planned and completed check-ins with honest daily denominators', () => {
  const plan = toggleCompletion(make(), 'habit-1', '2026-09-28');
  const summary = summarizePlan(plan);
  assert.equal(summary.planned, 4);
  assert.equal(summary.completed, 1);
  assert.equal(summary.percentage, 25);
  assert.deepEqual(summary.days[1], { date: '2026-09-29', label: 'Tue', planned: 0, completed: 0 });
});

test('JSON export round trips reflection and printable export escapes all user text', () => {
  const unsafe = createPlan({ ...input, goal: '<script>alert(1)</script>', context: '<img src=x onerror=alert(1)>', habits: [{ name: '<b>My habit</b>', days: [0] }] });
  const plan = updateReflection(unsafe, 'A & B <iframe src="x">');
  assert.deepEqual(parseStoredPlan(exportPlanJson(plan)).plan, plan);
  const printed = renderPrintableJournal(plan);
  assert.ok(printed.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(printed.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(printed.includes('A &amp; B &lt;iframe'));
  assert.ok(!printed.includes('<script>'));
  assert.ok(!printed.includes('<iframe'));
  assert.throws(() => updateReflection(plan, 'x'.repeat(1801)), /1800/);
});
