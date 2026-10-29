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
vm.runInContext(read('assets/lens-pages.js'), context, { timeout: 1000 });
new vm.Script(read('assets/app.js'));
new vm.Script(read('assets/lens-ui.js'));
const { PUPILA_PAGES: pages, PUPILA_ASSETS: assets, PUPILA_META_VIEWS: views } = context.window;

assert(html.trimStart().startsWith('<!doctype html>'), 'doctype HTML5 ausente');
assert(html.includes('<html lang="pt-BR">'), 'idioma pt-BR ausente');
assert(html.includes('name="viewport"'), 'viewport ausente');
assert(!/<(?:script|link)[^>]+(?:src|href)="https?:/.test(html), 'dependência externa no carregamento');
assert(Object.keys(pages).length >= 18, 'rotas esperadas ausentes');
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

for (const route of ['lentes/index.html', 'lentes/hoya/index.html', 'lentes/zeiss/index.html', 'lentes/essilor/index.html', 'lentes/contato/index.html']) {
  const source = read(route);
  assert(source.includes('<html lang="pt-BR">'), `${route}: idioma ausente`);
  assert(source.includes('receita médica'), `${route}: orientação sobre receita ausente`);
  assert(source.includes('<meta name="description"'), `${route}: descrição SEO ausente`);
  assert(source.includes('href="' + '../'.repeat(route.split('/').length - 1) + 'assets/site.css"'), `${route}: CSS ausente`);
  for (const [tag] of source.matchAll(/<img\b[^>]*>/g)) {
    const attr = attributes(tag);
    assert(Boolean(attr.src) && fs.existsSync(path.resolve(path.dirname(path.join(root, route)), attr.src)), `${route}: imagem estática ausente ${attr.src}`);
  }
}
assert(read('lentes/essilor/index.html').includes('Essilor Varilux Especialista Select 2026'), 'certificação Select ausente');
assert(pages['index.html'].html.includes('home-select-section') && pages['index.html'].html.includes('Essilor Varilux'), 'destaque Select ausente na página inicial');
assert(read('lentes/index.html').indexOf('Como funciona o atendimento.') < read('lentes/index.html').indexOf('UM RECONHECIMENTO DA ESSILORLUXOTTICA') && read('lentes/index.html').indexOf('UM RECONHECIMENTO DA ESSILORLUXOTTICA') < read('lentes/index.html').indexOf('Três referências em lentes.'), 'destaque Select deve aparecer após atendimento e antes das marcas');
assert(read('lentes/index.html').includes('Comparação conceitual') && read('lentes/index.html').includes('lens-comparison-range') && read('lentes/index.html').includes('Filtro de luz azul'), 'guia visual de tecnologias ausente');
assert(!read('lentes/index.html').includes('TAMBÉM NA PUPILA'), 'chamada para lentes de contato não deve aparecer na página de óculos');
assert(read('lentes/index.html').indexOf('Como funciona o atendimento.') < read('lentes/index.html').indexOf('Três referências em lentes.'), 'atendimento de óculos deve vir antes das marcas');
assert(read('lentes/contato/index.html').indexOf('Como funciona o atendimento.') < read('lentes/contato/index.html').indexOf('Linhas com que trabalhamos.'), 'atendimento de contato deve vir antes das linhas');
assert(read('lentes/contato/index.html').includes('não são realizados na loja'), 'limite do atendimento ausente');
assert(['lentes/index.html', 'lentes/hoya/index.html', 'lentes/zeiss/index.html', 'lentes/essilor/index.html'].every(route => read(route).toLowerCase().includes('lentes multifocais progressivas')), 'terminologia multifocal ausente');

if (failures.length) {
  console.error(failures.map(message => `✗ ${message}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`✓ ${Object.keys(pages).length} rotas, ${imageCount} imagens, links, âncoras, fontes e sintaxe verificados`);
}
