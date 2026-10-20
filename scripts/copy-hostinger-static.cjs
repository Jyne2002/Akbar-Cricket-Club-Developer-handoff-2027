const fs = require('node:fs');
const path = require('node:path');

const repositoryRoot = path.resolve(__dirname, '..');
const sourceDirectory = path.join(repositoryRoot, 'frontend', 'dist');
const destinationDirectory = path.join(repositoryRoot, 'backend', 'hostinger-static');
const indexPath = path.join(sourceDirectory, 'index.html');

if (!fs.existsSync(indexPath)) {
  throw new Error('Vite output is missing. Build the frontend before copying its production files.');
}

const html = fs.readFileSync(indexPath, 'utf8');
const assetPaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(match => match[1]);
if (!assetPaths.some(assetPath => assetPath.endsWith('.js')) || !assetPaths.some(assetPath => assetPath.endsWith('.css'))) {
  throw new Error('The frontend build must include compiled JavaScript and CSS assets.');
}
for (const assetPath of assetPaths) {
  const resolvedAsset = path.resolve(sourceDirectory, `.${assetPath}`);
  if (!resolvedAsset.startsWith(`${sourceDirectory}${path.sep}`) || !fs.statSync(resolvedAsset).isFile()) {
    throw new Error('A compiled frontend asset is missing or outside the build directory.');
  }
}

if (path.relative(repositoryRoot, destinationDirectory) !== path.join('backend', 'hostinger-static')) {
  throw new Error('The static destination must be backend/hostinger-static.');
}
if (fs.existsSync(destinationDirectory) && fs.lstatSync(destinationDirectory).isSymbolicLink()) {
  throw new Error('The static destination must be a regular directory.');
}

fs.rmSync(destinationDirectory, { recursive: true, force: true });
fs.cpSync(sourceDirectory, destinationDirectory, { recursive: true });
console.log('Copied the complete Vite production build into backend/hostinger-static. Include this directory in Git before pushing.');
