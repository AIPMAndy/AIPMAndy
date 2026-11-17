/** Zero-dependency local static file server for the public site/ directory. */
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, sep } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const port = Number(process.env.PORT ?? 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
const mimeTypes = { '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.html': 'text/html' };

export function safeFilePath(pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }
  if (decoded.includes('\\') || decoded.includes('\0')) return null;
  const filename = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const path = resolve(join(root, filename));
  return path.startsWith(root + sep) ? path : null;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  http.createServer(async (req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end('Method Not Allowed'); return; }
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const path = safeFilePath(pathname);
    if (!path) { res.writeHead(400); res.end('Bad Request'); return; }
    try {
      const data = await readFile(path);
      const ext = path.slice(path.lastIndexOf('.'));
      res.writeHead(200, { 'content-type': `${mimeTypes[ext] ?? 'application/octet-stream'}; charset=utf-8`, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch {
      res.writeHead(404); res.end('Not Found');
    }
  }).listen(port, '127.0.0.1', () => {
    console.log(`FreeClaude 本地网站：http://127.0.0.1:${port}`);
  });
}
