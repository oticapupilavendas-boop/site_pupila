import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('index.html');
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
const context = { window: {} };
vm.createContext(context);
vm.runInContext(read('assets/pages.js'), context, { timeout: 1000 });
new vm.Script(read('assets/app.js'));
const { PUPILA_PAGES: pages, PUPILA_ASSETS: assets, PUPILA_META_VIEWS: views } = context.window;

assert(html.trimStart().startsWith('<!doctype html>'), 'doctype HTML5 ausente');
assert(html.includes('<html lang="pt-BR">'), 'idioma pt-BR ausente');
assert(html.includes('name="viewport"'), 'viewport ausente');
assert(!/<(?:script|link)[^>]+(?:src|href)="https?:/.test(html), 'dependência externa no carregamento');
assert(Object.keys(pages).length >= 14, 'rotas esperadas ausentes');
assert(views.length === 6, 'a galeria deve oferecer seis ângulos');
assert(/data-catalog-empty>/.test(pages['oculos-de-grau/index.html'].html), 'catálogo sem produtos deve exibir sua orientação inicial');

let imageCount = 0;
for (const [route, page] of Object.entries(pages)) {
  const source = page.html.replace(/pupila-asset:([^" ]+)/g, (_, asset) => assets[asset] || '');
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
  assert(new Set(ids).size === ids.length, `${route}: IDs duplicados`);
  assert((source.match(/<h1\b/g) || []).length === 1, `${route}: deve haver um único h1`);
  assert((source.match(/<main\b/g) || []).length === 1, `${route}: deve haver um único main`);
  assert(source.includes('id="conteudo" tabindex="-1"'), `${route}: destino do skip link ausente`);
  assert(source.includes('class="skip-link"'), `${route}: skip link ausente`);
  assert(page.title.includes('Pupila'), `${route}: título inválido`);
  assert(!source.includes('pupila-asset:'), `${route}: imagem não resolvida`);
  assert(!source.includes('data:image/'), `${route}: imagem embutida`);
  assert(!source.includes('data-slot='), `${route}: produto fictício exposto`);
  for (const [tag] of source.matchAll(/<img\b[^>]*>/g)) {
    const attr = attributes(tag);
    imageCount++;
    assert(attr.alt !== undefined, `${route}: imagem sem alt`);
    assert(Number(attr.width) > 0 && Number(attr.height) > 0, `${route}: imagem sem dimensões`);
    assert(Boolean(attr.src) && fs.existsSync(path.join(root, attr.src)), `${route}: imagem ausente ${attr.src}`);
  }
  for (const [tag] of source.matchAll(/<a\b[^>]*>/g)) {
    const attr = attributes(tag);
    if (attr.target === '_blank') assert(attr.rel?.includes('noopener'), `${route}: link externo sem noopener`);
    if (!attr.href?.startsWith('#/')) continue;
    const [pathAndQuery, anchor] = attr.href.slice(2).split('#');
    const target = pages[pathAndQuery.split('?')[0]];
    assert(Boolean(target), `${route}: rota inexistente ${attr.href}`);
    if (target && anchor) assert(target.html.includes(`id="${anchor}"`), `${route}: âncora inexistente ${attr.href}`);
  }
}
for (const asset of Object.values(assets)) assert(fs.existsSync(path.join(root, asset)), `asset ausente: ${asset}`);
for (const [tag] of html.matchAll(/<(?:script|link)\b[^>]*>/g)) {
  const attr = attributes(tag);
  const file = attr.src || attr.href;
  if (file) assert(fs.existsSync(path.join(root, file)), `recurso ausente: ${file}`);
}
for (const [, file] of read('assets/site.css').matchAll(/url\('([^']+)'\)/g)) {
  assert(fs.existsSync(path.join(root, 'assets', file)), `fonte ausente: ${file}`);
}
assert(read('assets/site.css').includes('prefers-reduced-motion: reduce'), 'movimento reduzido ausente');

if (failures.length) {
  console.error(failures.map(message => `✗ ${message}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`✓ ${Object.keys(pages).length} rotas, ${imageCount} imagens, links, âncoras, fontes e sintaxe verificados`);
}
