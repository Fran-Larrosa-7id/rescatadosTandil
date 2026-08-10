import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const browserDir = join(root, 'dist', 'rescatadosTandil', 'browser');
const indexPath = join(browserDir, 'index.html');
const notFoundPath = join(browserDir, '404.html');

if (!existsSync(indexPath)) {
  throw new Error(`No se encontro ${indexPath}. Ejecuta primero el build de produccion.`);
}

copyFileSync(indexPath, notFoundPath);
console.log(`GitHub Pages fallback creado: ${notFoundPath}`);
