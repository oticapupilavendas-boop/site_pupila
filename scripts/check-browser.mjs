import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createServer } from 'node:http';
import vm from 'node:vm';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const rayBanRoutes = ['oculos-de-grau/ray-ban-tartaruga/','oculos-de-grau/ray-ban-preta/','oculos-de-sol/ray-ban-marrom-translucido/','oculos-de-sol/ray-ban-preto-lentes-verdes/'];
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
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  assert.equal(await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement),true);
  await page.locator('.menu-toggle').click();
  await page.getByRole('link',{name:'Relógios',exact:true}).first().click();
  await page.waitForURL('**/relogios/');
  await page.goBack();
  assert.equal(new URL(page.url()).pathname,'/');
  await page.goForward();
  assert.equal(new URL(page.url()).pathname,'/relogios/');
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
  const productCTA=new URL(await page.getByRole('link',{name:'Quero conhecer de perto'}).getAttribute('href'));
  assert.match(productCTA.searchParams.get('text'),/RW4011 601SSB/);
  for (const route of rayBanRoutes) {
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
    const cta = new URL(await page.getByRole('link',{name:'Quero conhecer de perto'}).getAttribute('href'));
    assert(cta.searchParams.get('text').includes(await page.locator('h1').innerText()),route);
    const details = page.getByRole('region',{name:'Ficha do modelo'});
    assert.equal(await details.locator('dt').count(),3,route);
    assert.equal(new URL(await details.getByRole('link',{name:/Ver referência/}).getAttribute('href')).hostname,'www.ray-ban.com',route);
    await page.getByRole('link',{name:/Voltar para óculos/}).click();
    await page.waitForURL(base+category+'/');
  }
  for (const category of ['oculos-de-grau/','oculos-de-sol/']) {
    await page.goto(base+category);
    const brandFilter = page.getByLabel('Filtrar por marca');
    const cards = page.locator('[data-catalog-card]:visible');
    const initialCount = await cards.count();
    const selectAudience = label => page.getByRole('button',{name:label,exact:true}).click();
    await brandFilter.selectOption('Oakley');
    await selectAudience('Feminino');
    const feminineOakley = await cards.evaluateAll(items => items.map(item => [item.dataset.brand,item.getAttribute('href')]));
    assert(feminineOakley.length > 0 && feminineOakley.every(([brand]) => brand === 'Oakley'),category);
    await selectAudience('Masculino');
    assert.deepEqual(await cards.evaluateAll(items => items.map(item => [item.dataset.brand,item.getAttribute('href')])),feminineOakley,category);
    await brandFilter.selectOption('Carmim');
    assert.equal(await cards.count(),0,category);
    assert.equal(await page.locator('[data-catalog-empty]').isVisible(),true,category);
    await selectAudience('Feminino');
    assert(await cards.count() > 0,category);
    assert.equal(await page.locator('[data-catalog-empty]').isVisible(),false,category);
    await brandFilter.selectOption('todas');
    await selectAudience('Todos');
    assert.equal(await cards.count(),initialCount,category);
  }
  await page.goto(base+'oculos-de-grau/hb-switch-system/');
  await page.getByRole('button',{name:'Ver ângulo 4: Com clip'}).click();
  assert.match(await page.locator('#product-main-image').getAttribute('src'),/hb-switch-system-com-clip\.webp$/);
  assert.equal(await page.locator('.meta-gallery-count').innerText(),'04 / 04');
  for (const route of ['ray-ban-meta','ray-ban-meta/','ray-ban-meta/index.html','lentes','lentes/index.html','lentes/contato','oculos-de-grau?publico=feminino','index.html#avaliacoes','constructor','__proto__','toString','hasOwnProperty','valueOf']) {
    await page.goto(base+'#/'+route);
    await page.waitForURL(url=>!url.hash.startsWith('#/'));
    const unknown=['constructor','__proto__','toString','hasOwnProperty','valueOf'].includes(route);
    const pathname=new URL(page.url()).pathname;
    assert.equal(pathname,unknown?'/404.html':route.startsWith('index.html')?'/':`/${route.split('?')[0].replace(/\/?index\.html$/,'').replace(/\/$/,'')}/`,route);
    assert.equal(await page.locator('h1').count(),1,route);
  }
  await page.goto(base+'lentes/');
  await page.locator('.lens-comparison-range').focus();
  await page.keyboard.press('End');
  assert.equal(await page.locator('.lens-comparison').evaluate(el=>getComputedStyle(el).getPropertyValue('--comparison-position').trim()),'100%');
  // A clean no-JS context verifies actual links and the mobile navigation fallback.
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:900}});
  const plain=await nojs.newPage();
  for(const route of routes) {
    await plain.goto(base+route);
    assert.equal(await plain.locator('h1').count(),1);
    assert.equal(await plain.locator('#main-nav').isVisible(),true,route);
    assert.equal(await plain.locator('.menu-toggle').isVisible(),false,route);
    const href=await plain.locator('.floating-contact').getAttribute('href');
    assert.match(href,/^https:\/\/wa\.me\/\d+\?text=/,route);
  }
  await plain.goto(base+'lentes/');
  await plain.getByRole('link',{name:'Relógios',exact:true}).first().click();
  assert.equal(new URL(plain.url()).pathname,'/relogios/');
  const missing=await plain.goto(base+'caminho/inexistente');
  assert.equal(missing.status(),404);
  assert.equal(await plain.locator('#main-nav').isVisible(),true);
  await plain.getByRole('link',{name:'Ótica Pupila — início'}).click();
  assert.equal(new URL(plain.url()).pathname,'/');
  await nojs.close();
  await page.goto(base+'contato/');
  const mobileImage=await page.locator('.location-photo img').count() ? page.locator('.location-photo img') : page.locator('main img').first();
  if(await mobileImage.count()) assert.match(await mobileImage.evaluate(el=>el.currentSrc),/-480\.webp$/);
  await page.goto(base+'ray-ban-meta/');
  if(process.env.AXE_SCRIPT) {
    const violations=[];
    for (const route of ['','oculos-de-grau/','oculos-de-sol/','ray-ban-meta/','contato/','lentes/','lentes/essilor/','privacidade/','404.html',...rayBanRoutes]) {
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
  console.log(`✓ ${layoutChecks} cenários de layout; menu, galeria, comparador, histórico, 13 URLs legadas e ${routes.length} páginas sem JavaScript`);
  fs.writeFileSync(path.join(output,'browser-summary.json'),JSON.stringify({engine:process.env.BROWSER_CHANNEL||process.env.BROWSER||'chromium',layoutChecks,noJavaScript:routes.length,legacyRoutes:13,axe:Boolean(process.env.AXE_SCRIPT),navigationCancellations,errors},null,2));
} finally {
  await browser?.close();
  await new Promise(resolve=>server.close(resolve));
}
