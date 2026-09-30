import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const source = dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({ options: {
  theme: { type: 'string' },
  planner: { type: 'string' },
  brand: { type: 'string', default: 'Phroneme' },
  apply: { type: 'boolean', default: false },
  help: { type: 'boolean', default: false }
} });

if (values.help) {
  console.log('Usage: node commerce/shopify/install.mjs --theme /absolute/theme/path [--planner https://verified.example/path] [--brand Phroneme] [--apply]');
  console.log('The default is a dry run. This installs local files only; it never connects to or publishes a Shopify store.');
  process.exit(0);
}

if (!values.theme) throw new Error('--theme must identify the local Shopify theme directory.');
if (!values.brand.trim()) throw new Error('--brand must be a non-empty public brand name.');
if (values.planner) {
  const planner = new URL(values.planner);
  if (planner.protocol !== 'https:' || planner.username || planner.password) throw new Error('--planner must be an HTTPS URL without embedded credentials.');
}
const target = resolve(values.theme);
if (target === source) throw new Error('Choose a destination theme, not this integration pack.');
await access(join(target, 'layout/theme.liquid'));

const prepared = [];
const maybeRead = async (path) => {
  try { return await readFile(path, 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
};

for (const relative of ['sections/mindforge-founder.liquid', 'locales/en.default.json', 'locales/en.default.schema.json', 'templates/page.mindforge.json']) {
  const incomingText = await readFile(join(source, relative), 'utf8');
  const existingText = await maybeRead(join(target, relative));
  let text = incomingText;
  if (relative.startsWith('locales/')) {
    const incoming = JSON.parse(incomingText);
    const existing = existingText ? JSON.parse(existingText) : {};
    if (existing.mindforge && JSON.stringify(existing.mindforge) !== JSON.stringify(incoming.mindforge)) {
      throw new Error(`${relative} already contains a different mindforge namespace. Review and merge it manually; no files were changed.`);
    }
    text = `${JSON.stringify({ ...existing, mindforge: incoming.mindforge }, null, 2)}\n`;
  } else if (relative.startsWith('templates/')) {
    const template = JSON.parse(incomingText);
    template.sections.founder.settings.brand_name = values.brand;
    if (values.planner) template.sections.founder.settings.tool_url = values.planner;
    text = `${JSON.stringify(template, null, 2)}\n`;
    if (existingText && JSON.stringify(JSON.parse(existingText)) !== JSON.stringify(template)) {
      throw new Error(`${relative} already exists with different settings. Review it manually; no files were changed.`);
    }
  } else if (existingText && existingText !== text) {
    throw new Error(`${relative} already exists with different content. Review it manually; no files were changed.`);
  }
  prepared.push({ relative, text, changed: existingText !== text });
}

for (const file of prepared) {
  console.log(`${values.apply ? 'Install' : 'Dry run'}: ${file.relative}${file.changed ? '' : ' (already identical)'}`);
  if (values.apply && file.changed) {
    const path = join(target, file.relative);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, file.text, 'utf8');
  }
}
console.log(values.apply ? 'Local integration complete. Validate the full destination theme before uploading an unpublished preview.' : 'No files changed. Add --apply to install these four files into the local theme.');
