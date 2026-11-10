import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
const context = { window: {} };
vm.createContext(context);
for (const file of ['assets/catalog-products.js', 'assets/pages.js', 'assets/lens-pages.js', 'assets/routes.js']) vm.runInContext(read(file), context, { filename: file, timeout: 1000 });
new vm.Script(read('assets/app.js'));
const pages = context.window.PUPILA_PAGES;
const config = JSON.parse(read('site-config.json'));
assert(Object.keys(pages).length === 76, 'páginas esperadas ausentes');
assert(context.window.PUPILA_META_VIEWS.length === 6, 'a galeria deve oferecer seis ângulos');
let imageCount = 0;
const titles = new Set();
for (const route of Object.keys(pages)) {
  const source = read(route);
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
  const pageDir = path.dirname(path.join(root, route));
  assert(source.startsWith('<!doctype html>'), `${route}: doctype ausente`);
  assert(source.includes('<html lang="pt-BR">'), `${route}: idioma ausente`);
  assert(source.includes('name="viewport"'), `${route}: viewport ausente`);
  assert(new Set(ids).size === ids.length, `${route}: IDs duplicados`);
  assert((source.match(/<h1\b/g) || []).length === 1, `${route}: deve haver um h1 no HTML`);
  assert((source.match(/<main\b/g) || []).length === 1, `${route}: deve haver um main`);
  assert(source.includes('id="conteudo" tabindex="-1"'), `${route}: destino do skip link ausente`);
  assert(!source.includes('pupila-asset:') && !source.includes('data:image/'), `${route}: imagem inválida`);
  assert(!source.includes('data-whatsapp=') && !source.includes('href="#/'), `${route}: ação dependente do roteador antigo`);
  assert(!source.includes('modelos disponíveis') && !source.includes('revendedora autorizada') && !source.includes('melhor preço'), `${route}: promessa comercial sem confirmação`);
  const title = source.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title?.includes('Pupila'), `${route}: título ausente`);
  if (route !== 'marcas/modelo/index.html') {
    assert(!titles.has(title), `${route}: título duplicado`);
    titles.add(title);
  }
  const description = source.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert(description?.length > 30 && description.length <= 160, `${route}: descrição inválida`);
  if (config.siteUrl && route !== '404.html') assert(source.includes('rel="canonical"') && source.includes('property="og:image"'), `${route}: SEO absoluto ausente`);
  for (const [tag] of source.matchAll(/<(?:img|script|link|a)\b[^>]*>/g)) {
    const attr = attributes(tag);
    if (tag.startsWith('<img')) {
      imageCount++;
      assert(attr.alt !== undefined && Number(attr.width) > 0 && Number(attr.height) > 0, `${route}: imagem sem alt/dimensões`);
    }
    if (attr.target === '_blank') assert(attr.rel?.includes('noopener') && attr.rel?.includes('noreferrer'), `${route}: link sem proteção`);
    if (attr.href?.startsWith('https://wa.me/')) {
      const url = new URL(attr.href);
      assert(/^\/\d{10,15}$/.test(url.pathname), `${route}: telefone WhatsApp inválido`);
      assert(url.searchParams.get('text')?.startsWith('Olá!') && !url.searchParams.get('text').includes('${'), `${route}: mensagem WhatsApp inválida`);
    }
    const refs = [attr.src, attr.href, ...(attr.srcset || '').split(',').map(value => value.trim().split(' ')[0])].filter(Boolean);
    for (const ref of refs) {
      if (/^(?:https?:|tel:|mailto:|data:)/.test(ref)) continue;
      const [pathname, fragment] = ref.split('#');
      let target = pathname.startsWith('/') ? path.resolve(root, `.${pathname.split('?')[0]}`) : path.resolve(pageDir, pathname.split('?')[0] || path.basename(route));
      if (!pathname) target = path.join(root, route);
      else if (pathname.endsWith('/')) target = path.join(target, 'index.html');
      assert(fs.existsSync(target), `${route}: recurso inexistente ${ref}`);
      if (fragment && fs.existsSync(target) && target.endsWith('.html')) assert(read(path.relative(root, target)).includes(`id="${fragment}"`), `${route}: âncora inexistente ${ref}`);
    }
  }
}
for (const [category, cardCount, brandCount] of [['oculos-de-grau', 45, 18], ['oculos-de-sol', 14, 10]]) {
  const source = read(`${category}/index.html`);
  assert((source.match(/\bdata-catalog-card\b/g) || []).length === cardCount, `${category}: quantidade de cartões inesperada`);
  assert((source.match(/\bdata-catalog-brand-option=/g) || []).length === brandCount + 1, `${category}: quantidade de marcas inesperada`);
  assert(source.includes('RAY-BAN META WAYFARER GEN 3</h2>') === (category === 'oculos-de-grau'), `${category}: Ray-Ban Meta na categoria incorreta`);
  assert(['todos', 'feminino', 'masculino'].every(audience => source.includes(`data-catalog-filter="${audience}"`)) && source.includes('data-catalog-brand'), `${category}: filtros ausentes`);
  assert(source.includes('wa.me/') && source.includes('Planeje sua visita'), `${category}: caminho de atendimento ausente`);
}
for (const product of context.window.PUPILA_DATA.products.filter(item => item.route.includes('/'))) {
  const route = `${product.route}/index.html`;
  assert(read(route).includes('Ficha do modelo') && product.views.length >= 3, `${route}: ficha ou ângulos ausentes`);
  for (const { image, alt } of product.views) {
    const bytes = fs.readFileSync(path.join(root, image));
    assert(image.endsWith('.webp') && bytes.subarray(8, 12).toString() === 'WEBP' && bytes.length < 100000 && alt, `${route}: foto inválida ou pesada`);
  }
}
for (const [, file] of read('assets/site.css').matchAll(/url\('([^']+)'\)/g)) assert(fs.existsSync(path.join(root, 'assets', file)), `recurso CSS ausente: ${file}`);
assert(read('assets/site.css').includes('prefers-reduced-motion: reduce'), 'movimento reduzido ausente');
assert(read('lentes/essilor/index.html').includes('Essilor Varilux Especialista Select 2026'), 'certificação ausente');
assert(read('index.html').includes('home-select-section'), 'destaque Select ausente na home');
const lenses = read('lentes/index.html');
assert(lenses.indexOf('Como funciona o atendimento.') < lenses.indexOf('UM RECONHECIMENTO DA ESSILORLUXOTTICA') && lenses.indexOf('UM RECONHECIMENTO DA ESSILORLUXOTTICA') < lenses.indexOf('Três referências em lentes.'), 'ordem editorial de lentes alterada');
assert(lenses.includes('Comparação conceitual') && lenses.includes('lens-comparison-range') && lenses.includes('Filtro de luz azul'), 'guia de tecnologias ausente');
assert(!lenses.includes('TAMBÉM NA PUPILA'), 'chamada de contato indevida na página de óculos');
assert(read('lentes/contato/index.html').includes('não são realizados na loja'), 'limite do atendimento ausente');
assert(['lentes/index.html','lentes/hoya/index.html','lentes/zeiss/index.html','lentes/essilor/index.html'].every(route => read(route).toLowerCase().includes('lentes multifocais progressivas')), 'terminologia multifocal ausente');
for (const file of ['essilor-select-2026-800.webp','essilor-select-2026-1600.webp']) assert(fs.statSync(path.join(root, 'assets/lenses', file)).size <= 200000, `${file}: certificado muito grande`);
assert(fs.statSync(path.join(root, 'assets/logo-meta-small.webp')).size <= 15000, 'logo Meta muito grande');
assert(fs.statSync(path.join(root, 'assets/image-03-480.webp')).size <= 120000, 'fachada móvel muito grande');
if (config.siteUrl) {
  const sitemap = read('sitemap.xml');
  for (const route of Object.keys(pages).filter(route => !['404.html','marcas/modelo/index.html'].includes(route))) assert(sitemap.includes(`${config.siteUrl.replace(/\/$/,'')}/${route.replace('index.html','')}`), `${route}: ausente no sitemap`);
} else assert(!fs.existsSync(path.join(root, 'sitemap.xml')), 'sitemap não pode inventar domínio');
if (failures.length) { console.error(failures.map(message => `✗ ${message}`).join('\n')); process.exitCode = 1; }
else console.log(`✓ ${Object.keys(pages).length} páginas HTML, ${imageCount} imagens, metadados, links e recursos verificados`);
