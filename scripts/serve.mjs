import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../public/', import.meta.url)));
const port = Number(process.env.PORT || 4320);
const types = { '.html': 'text/html; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8' };
const security = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url))).headers[0].headers;
http.createServer(async (req, res) => {
  for (const { key, value } of security) res.setHeader(key, value);
  try {
    const requestPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const target = path.resolve(root, '.' + requestPath);
    if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
    const info = await stat(target);
    const file = info.isDirectory() ? path.join(target, 'index.html') : target;
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(path.join(root, '404.html')));
  }
}).listen(port, '127.0.0.1', () => console.log(`MindForge: http://127.0.0.1:${port}`));
