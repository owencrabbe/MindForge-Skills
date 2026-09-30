import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const out = path.join(root, 'public');
await readFile(path.join(root, 'app/index.html'), 'utf8');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, 'app'), out, { recursive: true });
await cp(path.join(root, 'lib'), path.join(out, 'lib'), { recursive: true });
await cp(path.join(root, 'evidence'), path.join(out, 'evidence'), { recursive: true });
// Browser imports stay portable in app/ and the generated web root.
const main = path.join(out, 'main.mjs');
const source = await readFile(main, 'utf8');
await writeFile(main, source.replaceAll('../lib/', './lib/').replaceAll('../evidence/', './evidence/'));
await writeFile(path.join(out, 'robots.txt'), 'User-agent: *\nAllow: /\n');
await writeFile(path.join(out, '404.html'), '<!doctype html><html lang="en"><meta charset="utf-8"><title>Page not found · MindForge</title><body><main><h1>Page not found</h1><p><a href="/">Return to MindForge Fitness Lab</a></p></main></body></html>');
console.log('Built MindForge Fitness Lab into public/. No runtime dependencies or user-data backend.');
