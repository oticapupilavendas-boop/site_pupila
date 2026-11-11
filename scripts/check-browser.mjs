import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createServer } from 'node:http';
import vm from 'node:vm';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const galleryRoutes = ['oculos-de-grau/steiner-91263/', 'oculos-de-sol/oakley-verde-escuro/'];
const removedRoutes = ['marcas', 'marcas/modelo', 'oculos-de-grau/ray-ban-tartaruga', 'oculos-de-sol/ray-ban-preto-lentes-verdes'];
const unknownLegacyRoutes = [...removedRoutes, 'constructor', '__proto__', 'toString', 'hasOwnProperty', 'valueOf'];
const legacyRoutes = ['ray-ban-meta','ray-ban-meta/','ray-ban-meta/index.html','lentes','lentes/index.html','lentes/contato','oculos-de-grau?publico=feminino','index.html#avaliacoes', ...unknownLegacyRoutes];
const window = {};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/routes.js'),'utf8'),{window});
const routes = Object.keys(window.PUPILA_ROUTES).map(route => route.replace(/index\.html$/, ''));
const mime = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2' };
const server = createServer((request,response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  let file = path.resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) { response.writeHead(301,{Location:pathname+'/'}).end(); return; }
    file=path.join(file,'index.html');
  }
  const exists=fs.existsSync(file) && fs.statSync(file).isFile();
  if (!exists) file=path.join(root,'404.html');
  response.writeHead(exists ? 200 : 404,{'Content-Type':mime[path.extname(file)] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(response);
});
await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
const base = `http://127.0.0.1:${server.address().port}/`;
let browser;
const output = path.join(root,'test-results');
fs.mkdirSync(output,{recursive:true});
try {
  const module = process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright';
  const { chromium, firefox, webkit } = await import(module);
  const engine = {chromium,firefox,webkit}[process.env.BROWSER || 'chromium'];
  browser=await engine.launch({headless:true,...(process.env.BROWSER_CHANNEL ? {channel:process.env.BROWSER_CHANNEL} : {})});
  const context=await browser.newContext({reducedMotion:'reduce'});
  const mapFixture = { contentType: 'text/html', body: '<!doctype html><html lang="pt-BR"><title>Google Maps</title><main>Mapa da Ótica Pupila</main></html>' };
  await context.route('https://www.google.com/maps/embed?**', route => route.fulfill(mapFixture));
  await context.route('https://www.google.com/maps/dir/**', route => route.fulfill(mapFixture));
  await context.route('https://wa.me/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>WhatsApp de teste</title>' }));
  const page=await context.newPage();
  const errors=[];
  let navigationCancellations=0;
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error') errors.push(message.text());});
  page.on('requestfailed',request=>{
    // Viewport changes and redirects can cancel an obsolete responsive-image request.
    // Decoded images are checked on every settled page; other network failures fail the run.
    if (request.failure()?.errorText === 'net::ERR_ABORTED') navigationCancellations++;
    else errors.push(`${request.url()}: ${request.failure()?.errorText}`);
  });
  let layoutChecks=0;
  for (const width of [320,375,768,901,1024,1440]) {
    await page.setViewportSize({width,height:900});
    for (const route of routes) {
      const response=await page.goto(base+route);
      assert.equal(response.status(),200,route);
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.evaluate(async()=>{await document.fonts.ready; document.querySelectorAll('img').forEach(image=>image.loading='eager'); await Promise.all([...document.images].map(image=>image.decode().catch(()=>{})));});
      const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(image=>!image.complete||!image.naturalWidth).map(image=>image.src),h1:document.querySelectorAll('h1').length,small:[...document.querySelectorAll('p,span,a,figcaption,dt,dd')].filter(el=>el.getClientRects().length&&parseFloat(getComputedStyle(el).fontSize)<11).map(el=>el.className)}));
      assert.equal(result.overflow,false,`${route} em ${width}px: rolagem horizontal`);
      assert.deepEqual(result.broken,[],`${route}: imagens quebradas`);
      assert.equal(result.h1,1,route);
      assert.deepEqual(result.small,[],`${route} em ${width}px: texto informativo pequeno`);
      if (route === 'oculos-de-grau/' || route === 'oculos-de-sol/') {
        const aligned = await page.locator('[data-catalog-card]').evaluateAll(cards => {
          const rows = new Map();
          return cards.every(card => {
            const row = Math.round(card.getBoundingClientRect().top);
            const details = card.querySelector('.text-link').getBoundingClientRect().top;
            if (!rows.has(row)) rows.set(row, details);
            return Math.abs(rows.get(row) - details) < 1;
          });
        });
        assert(aligned,`${route} em ${width}px: ações desalinhadas`);
      }
      if (route === 'lentes/') {
        const edge = await page.locator('.lens-hero-art--glasses').evaluate(el => ({right:el.getBoundingClientRect().right,viewport:document.documentElement.clientWidth}));
        assert(Math.abs(edge.right-edge.viewport) <= 1, `lentes em ${width}px: vazio na borda direita`);
      }

      layoutChecks++;
    }
    console.log(`✓ Layout de ${routes.length} páginas em ${width}px`);
  }
  await page.setViewportSize({width:375,height:900});
  await page.goto(base);
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
  const homeLink = page.locator('#main-nav').getByRole('link', { name: 'Início', exact: true });
  assert.equal(await homeLink.evaluate(el => el === document.activeElement), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  assert.equal(await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement),true);
  await page.locator('.menu-toggle').click();
  await page.locator('.nav-products > summary').click();
  await page.locator('#main-nav').getByRole('link',{name:'Relógios',exact:true}).click();
  await page.waitForURL('**/relogios/');
  await page.goBack();
  assert.equal(new URL(page.url()).pathname,'/');
  await page.goForward();
  assert.equal(new URL(page.url()).pathname,'/relogios/');
  await page.locator('.menu-toggle').click();
  await homeLink.click();
  await page.waitForURL(base);
  const contactLink = page.locator('.floating-contact');
  assert.equal(await contactLink.innerText(), 'Fale com a Pupila');
  assert.equal(await contactLink.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(37, 211, 102)');
  assert.equal(await page.getByRole('link', { name: 'Converse com a gente' }).evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(181, 54, 64)');
  const homeWhatsapp = new URL(await contactLink.getAttribute('href'));
  assert.equal(homeWhatsapp.origin, 'https://wa.me');
  assert.match(homeWhatsapp.searchParams.get('text'), /escolher um produto/);
  const directions = page.locator('.location-layout').getByRole('link', { name: 'Como chegar' });
  const directionsHref = await directions.getAttribute('href');
  assert.equal(await page.getByRole('link', { name: 'Centro de Joinville, SC' }).getAttribute('href'), directionsHref);
  assert.equal(new URL(directionsHref).searchParams.get('dir_action'), 'navigate');
  await directions.click();
  await page.waitForURL(directionsHref);
  await page.goto(base+'contato/#atendimento');
  assert.equal(await page.locator('#atendimento .contact-phone').innerText(), '(47) 3422-3223');
  await page.goto(base+'ray-ban-meta/');
  const views=page.locator('[data-product-view]');
  await views.nth(2).click();
  assert.match(await page.locator('#product-main-image').getAttribute('src'),/al2\.webp$/);
  await page.keyboard.press('End');
  assert.equal(await views.last().getAttribute('aria-pressed'),'true');
  await page.keyboard.press('ArrowRight');
  assert.equal(await views.first().getAttribute('aria-pressed'),'true');
  await page.keyboard.press('Home');
  assert.match(await page.locator('.meta-gallery-count').innerText(),/01 \/ 06/);
  const productCTA = new URL(await page.getByRole('link',{name:'Quero conhecer de perto'}).getAttribute('href'), page.url());
  assert.equal(productCTA.pathname, '/554734223223');
  assert.match(productCTA.searchParams.get('text'), /Ray-Ban Meta Wayfarer Gen 3.*preço.*disponibilidade/);
  for (const route of galleryRoutes) {
    const [category, slug] = route.split('/');
    await page.goto(base+category+'/');
    await page.locator(`[data-catalog-card][href$="/${slug}/"]`).click();
    await page.waitForURL(base+route);
    const main = page.locator('#product-main-image');
    const angles = page.locator('[data-product-view]');
    assert.equal(await angles.count(),3,route);
    assert.match(await main.getAttribute('src'), new RegExp(`${slug}-frente\\.webp$`), route);
    await angles.nth(1).click();
    assert.match(await main.getAttribute('src'), new RegExp(`${slug}-lateral\\.webp$`), route);
    await page.keyboard.press('End');
    assert.match(await main.getAttribute('src'), new RegExp(`${slug}-detalhe\\.webp$`), route);
    assert.match(await main.getAttribute('alt'),/detalhe da armação/,route);
    assert.equal(await main.evaluate(async image => { await image.decode(); return image.naturalWidth; }),960,route);
    assert.equal(await angles.last().getAttribute('aria-pressed'),'true',route);
    assert.equal(await page.locator('.meta-gallery-count').innerText(),'03 / 03',route);
    const cta = new URL(await page.getByRole('link',{name:'Quero conhecer de perto'}).getAttribute('href'), page.url());
    const brand = await page.locator('h1').innerText();
    assert(cta.searchParams.get('text').includes(brand) && cta.searchParams.get('text').includes(category === 'oculos-de-sol' ? 'óculos de sol' : 'armação de grau'), route);
    assert.equal(await page.locator('.floating-contact').getAttribute('href'), cta.href, route);
    const details = page.getByRole('region',{name:'Ficha do modelo'});
    assert.equal(await details.locator('dt').count(),3,route);
    assert.equal(await details.locator('a').count(), 0, route);
    await page.getByRole('navigation',{name:'Caminho da página'}).getByRole('link',{name:/Óculos de/}).click();
    await page.waitForURL(base+category+'/');
  }
  for (const [category, unisexBrand, feminineBrand] of [['oculos-de-grau/', 'HB', 'Vogue Eyewear'], ['oculos-de-sol/', 'Oakley', 'Carmim']]) {
    await page.goto(base+category);
    const brandMenu = page.locator('[data-catalog-brand]');
    const brandFilter = brandMenu.locator('summary');
    const selectBrand = async name => {
      await brandFilter.click();
      await brandMenu.getByRole('button',{name,exact:true}).click();
    };
    const cards = page.locator('[data-catalog-card]:visible');
    const initialCount = await cards.count();
    const selectAudience = label => page.getByRole('button',{name:label,exact:true}).click();
    await brandFilter.press('ArrowDown');
    assert.equal(await brandMenu.getByRole('button',{name:'Todas as marcas',exact:true}).evaluate(el=>el===document.activeElement),true);
    await page.keyboard.press('Escape');
    assert.equal(await brandFilter.evaluate(el=>el===document.activeElement),true);
    await selectBrand(unisexBrand);
    await selectAudience('Feminino');
    const feminineSelection = await cards.evaluateAll(items => items.map(item => [item.dataset.brand,item.getAttribute('href')]));
    assert.deepEqual(feminineSelection.map(([brand]) => brand), [unisexBrand], category);
    await selectAudience('Masculino');
    assert.deepEqual(await cards.evaluateAll(items => items.map(item => [item.dataset.brand,item.getAttribute('href')])),feminineSelection,category);
    await selectBrand(feminineBrand);
    assert.equal(await cards.count(),0,category);
    assert.equal(await page.locator('[data-catalog-empty]').isVisible(),true,category);
    await selectAudience('Feminino');
    assert(await cards.count() > 0,category);
    assert.equal(await page.locator('[data-catalog-empty]').isVisible(),false,category);
    await selectBrand('Todas as marcas');
    await selectAudience('Todos');
    assert.equal(await cards.count(),initialCount,category);
  }
  await page.goto(base+'oculos-de-grau/emporio-armani-preto-clip-on/');
  await page.getByRole('button',{name:'Ver ângulo 5: Clip oliva'}).click();
  assert.match(await page.locator('#product-main-image').getAttribute('src'),/emporio-armani-preto-clip-on-clip-oliva\.webp$/);
  assert.equal(await page.locator('.meta-gallery-count').innerText(),'05 / 05');
  const clipContact = page.getByRole('link', { name: 'Quero conhecer de perto' });
  const clipHref = await clipContact.getAttribute('href');
  assert.match(new URL(clipHref).searchParams.get('text'), /Emporio Armani com clip solar.*preço.*disponibilidade/);
  await clipContact.click();
  await page.waitForURL(clipHref);
  await page.goto(base+'oculos-de-grau/');
  const catalogContact = page.getByRole('link', { name: 'Consultar a seleção' });
  const catalogHref = await catalogContact.getAttribute('href');
  assert.match(new URL(catalogHref).searchParams.get('text'), /seleção de óculos de grau/);
  await catalogContact.click();
  await page.waitForURL(catalogHref);
  for (const route of legacyRoutes) {
    await page.goto(base+'#/'+route);
    await page.waitForURL(url=>!url.hash.startsWith('#/'));
    const unknown = unknownLegacyRoutes.includes(route);
    const pathname=new URL(page.url()).pathname;
    assert.equal(pathname,unknown?'/404.html':route.startsWith('index.html')?'/':`/${route.split('?')[0].replace(/\/?index\.html$/,'').replace(/\/$/,'')}/`,route);
    assert.equal(await page.locator('h1').count(),1,route);
  }
  await page.goto(base+'lentes/');
  await page.locator('.lens-comparison-range').focus();
  await page.keyboard.press('End');
  assert.equal(await page.locator('.lens-comparison').evaluate(el=>getComputedStyle(el).getPropertyValue('--comparison-position').trim()),'100%');
  await page.goto(base+'relogios/');
  const reviews = page.locator('#produto-avaliacoes');
  const nextReview = reviews.getByRole('button', { name: 'Próxima avaliação' });
  assert.equal(await reviews.locator('.carousel-slide:visible').count(), 1);
  await nextReview.press('Enter');
  assert.match(await reviews.locator('.carousel-slide:visible blockquote').innerText(), /Curitiba/);
  assert.equal(await nextReview.evaluate(el => el === document.activeElement), true);
  await nextReview.press('Space');
  assert.match(await reviews.locator('.carousel-slide:visible blockquote').innerText(), /informações claras/);
  await reviews.getByRole('button', { name: 'Avaliação anterior' }).click();
  await reviews.getByRole('button', { name: 'Avaliação anterior' }).click();
  await reviews.getByRole('button', { name: 'Avaliação anterior' }).click();
  assert.match(await reviews.locator('.carousel-slide:visible blockquote').innerText(), /produtos de qualidade/);
  const faq = page.locator('#produto-perguntas');
  assert.match(await faq.locator('.carousel-slide:visible h3').innerText(), /relógio pode molhar/);
  await faq.getByRole('button', { name: 'Próxima pergunta' }).click();
  assert.match(await faq.locator('.carousel-slide:visible h3').innerText(), /experimentar o relógio/);
  assert.equal(await faq.locator('.carousel-slide:visible').evaluate(el => getComputedStyle(el).animationName), 'none');

  await page.setViewportSize({ width: 1159, height: 668 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(base+'oculos-de-grau/');
  const catalogCards = page.locator('.catalog-card');
  await catalogCards.first().scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.querySelectorAll('.catalog-card')].slice(0, 3).every(card => card.classList.contains('catalog-entering')));
  assert.deepEqual(await catalogCards.evaluateAll(cards => cards.slice(0, 3).map(card => getComputedStyle(card).animationDelay)), ['0s', '0.07s', '0.14s']);
  await page.goto(base+'lentes/');
  const lensCard = page.locator('.lens-brand-card').first();
  await lensCard.hover();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.lens-brand-card')).transform !== 'none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await lensCard.evaluate(el => getComputedStyle(el).transform), 'none');
  // A clean no-JS context verifies actual links and the mobile navigation fallback.
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:900}});
  await nojs.route('https://www.google.com/maps/embed?**', route => route.fulfill(mapFixture));
  const plain=await nojs.newPage();
  for(const route of routes) {
    await plain.goto(base+route);
    assert.equal(await plain.locator('h1').count(),1);
    assert.equal(await plain.locator('#main-nav').isVisible(),true,route);
    assert.equal(await plain.locator('.menu-toggle').isVisible(),false,route);
    const href=await plain.locator('.floating-contact').getAttribute('href');
    const whatsapp = new URL(href);
    assert.equal(whatsapp.origin, 'https://wa.me', route);
    assert(whatsapp.searchParams.get('text').length >= 50, route);
  }
  await plain.goto(base+'lentes/');
  await plain.locator('.nav-products > summary').click();
  await plain.locator('#main-nav').getByRole('link',{name:'Relógios',exact:true}).click();
  assert.equal(new URL(plain.url()).pathname,'/relogios/');
  assert.equal(await plain.locator('#produto-avaliacoes .carousel-slide:visible').count(), 5);
  assert.equal(await plain.locator('#produto-perguntas .carousel-slide:visible').count(), 5);
  await plain.goto(base+'perguntas-frequentes/');
  assert.equal(await plain.locator('.faq-full details').count(), 30);
  await plain.getByRole('link', { name: 'Lentes HOYA', exact: true }).click();
  await plain.locator('#faq-lentes-hoya + .faq-list summary').first().click();
  assert.equal(await plain.locator('#faq-lentes-hoya + .faq-list details').first().getAttribute('open'), '');
  for (const route of removedRoutes) {
    assert.equal((await plain.goto(base+route+'/')).status(), 404, route);
  }
  const missing=await plain.goto(base+'caminho/inexistente');
  assert.equal(missing.status(),404);
  assert.equal(await plain.locator('#main-nav').isVisible(),true);
  await plain.getByRole('link',{name:'Ótica Pupila — início'}).click();
  assert.equal(new URL(plain.url()).pathname,'/');
  await nojs.close();
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(base+'contato/');
  const mobileImage = page.locator('.contact-photo img');
  await mobileImage.evaluate(image => image.decode());
  assert.match(await mobileImage.evaluate(el => el.currentSrc), /-480\.webp$/);
  await page.goto(base+'ray-ban-meta/');
  if(process.env.AXE_SCRIPT) {
    const violations=[];
    for (const route of ['','oculos-de-grau/','oculos-de-sol/','ray-ban-meta/','contato/','lentes/','lentes/essilor/','privacidade/','404.html',...galleryRoutes]) {
      await page.goto(base+route);
      await page.addScriptTag({path:process.env.AXE_SCRIPT});
      const result=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']}}));
      violations.push(...result.violations.map(item=>({route,id:item.id,nodes:item.nodes.map(node=>node.target)})));
      assert.equal(result.incomplete.some(item=>item.id==='aria-prohibited-attr'),false,route);
    }
    fs.writeFileSync(path.join(output,'axe.json'),JSON.stringify(violations,null,2));
    assert.deepEqual(violations,[],'axe: violações');
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base);
  await page.screenshot({path:path.join(output,'home-desktop.png'),fullPage:true});
  await page.setViewportSize({width:375,height:900});
  await page.screenshot({path:path.join(output,'home-mobile.png'),fullPage:true});
  await page.goto(base+'oculos-de-grau/');
  await page.screenshot({path:path.join(output,'categoria-mobile.png'),fullPage:true});
  assert.deepEqual(errors,[],'erros de navegador/rede');
  console.log(`✓ ${layoutChecks} cenários de layout; menu, galeria, filtros, carrosséis, movimento, comparador, ${legacyRoutes.length} URLs legadas e ${routes.length} páginas sem JavaScript`);
  fs.writeFileSync(path.join(output,'browser-summary.json'),JSON.stringify({engine:process.env.BROWSER_CHANNEL||process.env.BROWSER||'chromium',layoutChecks,noJavaScript:routes.length,legacyRoutes:legacyRoutes.length,axe:Boolean(process.env.AXE_SCRIPT),navigationCancellations,errors},null,2));
} finally {
  await browser?.close();
  await new Promise(resolve=>server.close(resolve));
}
