import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const context = { window: {} };
vm.createContext(context);
for (const file of ['assets/pages.js', 'assets/lens-pages.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file, timeout: 1000 });
}

const meta = {
  'lentes/index.html': 'Lentes para óculos (lentes oftálmicas) HOYA, ZEISS e Essilor na Ótica Pupila em Joinville. Revendedora autorizada e Essilor Varilux Especialista Select 2026. Venda com receita médica.',
  'lentes/hoya/index.html': 'Conheça Hoyalux, Nulux, Sync III, WorkStyle, WorkSmart, Sensity, MiYOSMART e Hi-Vision na Ótica Pupila. Lentes HOYA em Joinville com receita médica.',
  'lentes/zeiss/index.html': 'Conheça as lentes ZEISS SmartLife, ClearMind, ClearView, DriveSafe, Office e MyoCare, além de PhotoFusion X, BlueGuard, UVProtect e DuraVision.',
  'lentes/essilor/index.html': 'Ótica Pupila: Essilor Varilux Especialista Select 2026 em Joinville. Conheça Varilux, Eyezen, Stellest, Crizal, Transitions e Xperio.',
  'lentes/contato/index.html': 'Lentes de contato Biofinity, Morning-Q, Vision 20/20, Aqualife, BioSoft, Natural Vision, Colourise e Impression na Ótica Pupila. Venda com receita médica.'
};
const checkOnly = process.argv.includes('--check');

for (const [route, description] of Object.entries(meta)) {
  const page = context.window.PUPILA_PAGES[route];
  const depth = route.split('/').length - 1;
  const prefix = '../'.repeat(depth);
  let content = page.html
    .replace(/pupila-asset:([^" ]+)/g, (_, key) => context.window.PUPILA_ASSETS[key] || '')
    .replace(/src="assets\//g, `src="${prefix}assets/`)
    .replace(/href="#\//g, `href="${prefix}#/`)
    .replace(/href="lentes\//g, `href="${prefix}lentes/`)
    .replace('class="nav-group nav-lenses"', 'class="nav-group nav-lenses" data-active');
  const current = route.replace('index.html', '');
  content = content.replace(`href="${prefix}${current}"`, `href="${prefix}${current}" aria-current="page"`);
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#123442">
  <meta name="description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${description}">
  <title>${page.title}</title>
  <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}assets/site.css">
  <script defer src="${prefix}assets/lens-ui.js"></script>
</head>
<body data-page="lentes">
  <div id="pupila-app">${content}</div>
</body>
</html>
`;
  const destination = path.join(root, route);
  if (checkOnly) {
    if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8').replace(/\r\n/g, '\n') !== html) {
      throw new Error(`${route} está desatualizada; execute npm run build:lenses`);
    }
  } else {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, html);
  }
}

console.log(`✓ ${Object.keys(meta).length} páginas de lentes ${checkOnly ? 'atualizadas' : 'geradas'}`);
