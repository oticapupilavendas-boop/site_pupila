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
const products = context.window.PUPILA_DATA.products;
const config = JSON.parse(read('site-config.json'));
assert(Object.keys(pages).length === 33, 'quantidade inesperada de páginas');
assert(products.length === 18 && new Set(products.map(product => product.brand)).size === products.length, 'o catálogo deve ter uma armação por marca no site inteiro');
assert(['marcas/index.html', 'marcas/modelo/index.html'].every(route => !fs.existsSync(path.join(root, route)) && !Object.hasOwn(context.window.PUPILA_ROUTES, route)), 'página de marcas ainda presente');
const productRoutes = new Set([
  'oculos-de-grau/index.html', 'oculos-de-sol/index.html', 'relogios/index.html', 'semijoias/index.html',
  ...Object.keys(pages).filter(route => route.startsWith('lentes/')),
  ...products.map(product => `${product.route}/index.html`)
]);
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
  assert(!titles.has(title), `${route}: título duplicado`);
  titles.add(title);
  const description = source.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert(description?.length > 30 && description.length <= 160, `${route}: descrição inválida`);
  if (config.siteUrl && route !== '404.html') assert(source.includes('rel="canonical"') && source.includes('property="og:image"'), `${route}: SEO absoluto ausente`);
  for (const [tag] of source.matchAll(/<(?:img|script|link|a)\b[^>]*>/g)) {
    const attr = attributes(tag);
    if (tag.startsWith('<img')) {
      imageCount++;
      assert(attr.alt !== undefined && Number(attr.width) > 0 && Number(attr.height) > 0, `${route}: imagem sem alt/dimensões`);
    }
    if (tag.startsWith('<a') && attr.href && /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(attr.href) && !attr.href.startsWith('tel:')) {
      const url = new URL(attr.href, 'https://example.invalid');
      assert(url.origin === 'https://wa.me' && url.pathname === '/554734223223', `${route}: destino externo inesperado ${attr.href}`);
      assert(url.searchParams.get('text')?.startsWith('Olá!') && url.searchParams.get('text').length >= 50, `${route}: mensagem de contexto ausente`);
      assert(attr.target === '_blank' && attr.rel?.includes('noopener') && attr.rel?.includes('noreferrer'), `${route}: proteção do link de WhatsApp ausente`);
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
  if (productRoutes.has(route)) {
    assert(source.includes('id="produto-avaliacoes"') && source.includes('id="produto-perguntas"'), `${route}: avaliações ou FAQ de produto ausentes`);
  }
}
for (const [category, cardCount] of [['oculos-de-grau', 12], ['oculos-de-sol', 6]]) {
  const source = read(`${category}/index.html`);
  const categoryProducts = products.filter(product => product.categories.includes(category));
  const expectedSlugs = categoryProducts.filter(product => product.route.startsWith(`${category}/`)).map(product => product.slug).sort();
  const publishedSlugs = fs.readdirSync(path.join(root, category)).filter(slug => fs.existsSync(path.join(root, category, slug, 'index.html'))).sort();
  assert(JSON.stringify(publishedSlugs) === JSON.stringify(expectedSlugs), `${category}: fichas ausentes ou excedentes`);
  assert((source.match(/\bdata-catalog-card\b/g) || []).length === cardCount, `${category}: quantidade de cartões inesperada`);
  assert((source.match(/\bdata-catalog-brand-option=/g) || []).length === cardCount + 1, `${category}: quantidade de marcas inesperada`);
  assert(categoryProducts.every(product => source.includes(`<h3>${product.brand}</h3>`)), `${category}: título do cartão deve exibir a marca`);
  assert(source.includes('eyewear-photo-space'), `${category}: espaço da foto ausente`);
  assert(['todos', 'feminino', 'masculino'].every(audience => source.includes(`data-catalog-filter="${audience}"`)) && source.includes('data-catalog-brand'), `${category}: filtros ausentes`);
  assert(source.includes('https://wa.me/554734223223?text=') && source.includes('Planeje sua visita'), `${category}: caminho de atendimento ausente`);
}
const catalogPhotos = new Set();
for (const product of products) {
  const route = `${product.route}/index.html`;
  const source = read(route);
  assert(source.includes(`<h1 id="product-title">${product.brand}</h1>`) && source.includes('Ficha do modelo') && product.views.length >= 3, `${route}: marca, ficha ou ângulos ausentes`);
  for (const { image, alt } of product.views) {
    if (image.startsWith('assets/catalogo/')) catalogPhotos.add(image);
    const bytes = fs.readFileSync(path.join(root, image));
    assert(image.endsWith('.webp') && bytes.subarray(8, 12).toString() === 'WEBP' && bytes.length < 100000 && alt, `${route}: foto inválida ou pesada`);
  }
}
for (const file of fs.readdirSync(path.join(root, 'assets/catalogo'), { recursive: true })) {
  if (file.endsWith('.webp')) assert(catalogPhotos.has(`assets/catalogo/${file.split(path.sep).join('/')}`), `foto de armação removida ainda presente: ${file}`);
}
for (const [, file] of read('assets/site.css').matchAll(/url\('([^']+)'\)/g)) assert(fs.existsSync(path.join(root, 'assets', file)), `recurso CSS ausente: ${file}`);
assert(read('assets/site.css').includes('prefers-reduced-motion: reduce'), 'movimento reduzido ausente');
assert(read('lentes/essilor/index.html').includes('Essilor Varilux Especialista Select 2026'), 'certificação ausente');
const home = read('index.html');
assert(home.includes('home-select-section'), 'destaque Select ausente na home');
assert(home.includes('testimonials-grid') && home.includes('faq-list') && !home.includes('data-carousel'), 'avaliações e FAQ da home devem manter o formato');
assert(read('contato/index.html').includes('Falar pelo WhatsApp'), 'atendimento pelo WhatsApp ausente');
const faqPage = read('perguntas-frequentes/index.html').split('class="wrap faq-full"')[1].split('</main>')[0];
const faqQuestions = [...faqPage.matchAll(/<summary>([^<]+)/g)].map(([, question]) => question);
assert(faqQuestions.length === 30 && new Set(faqQuestions).size === 30, 'o FAQ deve reunir exatamente 30 perguntas diferentes');
for (const route of productRoutes) {
  const source = read(route);
  const reviewSection = source.split('id="produto-avaliacoes"')[1].split('</section>')[0];
  assert((reviewSection.match(/<blockquote>/g) || []).length === 5, `${route}: cinco avaliações esperadas`);
  const questions = [...source.matchAll(/<article class="carousel-question"><h3>([^<]+)/g)].map(([, question]) => question);
  assert(questions.length >= 5 && questions.every(question => faqQuestions.includes(question)), `${route}: perguntas de produto fora do FAQ central`);
}
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
  for (const route of Object.keys(pages).filter(route => route !== '404.html')) assert(sitemap.includes(`${config.siteUrl.replace(/\/$/,'')}/${route.replace('index.html','')}`), `${route}: ausente no sitemap`);
} else assert(!fs.existsSync(path.join(root, 'sitemap.xml')), 'sitemap não pode inventar domínio');
if (failures.length) { console.error(failures.map(message => `✗ ${message}`).join('\n')); process.exitCode = 1; }
else console.log(`✓ ${Object.keys(pages).length} páginas HTML, ${imageCount} imagens, metadados, links e recursos verificados`);
