import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(fs.readFileSync(path.join(root, 'site-config.json'), 'utf8'));
const check = process.argv.includes('--check');
const publish = process.argv.includes('--publish');
const privacyReady = Object.values(config.privacy).every(value => typeof value === 'string' && value.trim());
let siteUrl = '';
if (config.siteUrl) {
  const url = new URL(config.siteUrl);
  if (url.protocol !== 'https:' || url.search || url.hash || url.username || url.password) throw new Error('siteUrl deve ser uma URL HTTPS sem consulta, credenciais ou fragmento.');
  siteUrl = url.href.replace(/\/$/, '');
}
if (publish && (!siteUrl || !privacyReady)) throw new Error('Publicação pendente: preencha domínio e todos os dados de privacidade em site-config.json após confirmação da loja.');
const context = { window: {} };
vm.createContext(context);
for (const file of ['assets/catalog-products.js', 'assets/pages.js', 'assets/lens-pages.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file, timeout: 1000 });
}
const pages = context.window.PUPILA_PAGES;
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const publicPath = route => route === 'index.html' ? '' : route.replace(/index\.html$/, '');
const descriptions = {
  'index.html': 'Óculos de grau e de sol, lentes, relógios e semijoias. Conheça a Ótica Pupila, no Centro de Joinville, desde 1992.',
  'contato/index.html': 'Visite a Ótica Pupila na Rua Abdon Batista, 59, Centro de Joinville. Consulte endereço, horários, telefone e atendimento pelo WhatsApp.',
  'nossa-historia/index.html': 'Conheça a história da Ótica Pupila, em Joinville desde 1992, e o cuidado da equipe na escolha de óculos, lentes e acessórios.',
  'perguntas-frequentes/index.html': 'Tire dúvidas sobre limpeza, conservação, proteção UV e escolha de óculos e lentes com as orientações da Ótica Pupila.',
  'privacidade/index.html': 'Saiba como funciona o site da Ótica Pupila e como entrar em contato sobre privacidade.',
  'oculos-de-grau/index.html': 'Conheça a seleção de óculos de grau da Ótica Pupila em Joinville. Consulte armações, lentes e disponibilidade com nossa equipe.',
  'oculos-de-sol/index.html': 'Explore a seleção de óculos de sol da Ótica Pupila em Joinville. Filtre por marca e público e consulte a disponibilidade.',
  'relogios/index.html': 'Conheça a seleção de relógios da Ótica Pupila em Joinville. Consulte modelos e opções com a equipe ou planeje sua visita.',
  'semijoias/index.html': 'Encontre semijoias para acompanhar seu estilo na Ótica Pupila em Joinville. Consulte a seleção com a equipe da loja.',
  'ray-ban-meta/index.html': 'Conheça o Ray-Ban Meta Wayfarer Gen 3 RW4011 601SSB na Ótica Pupila em Joinville. Veja os seis ângulos e consulte detalhes com a loja.',
  'lentes/index.html': 'Lentes para óculos HOYA, ZEISS e Essilor na Ótica Pupila em Joinville. Conheça as tecnologias e consulte opções com sua receita médica.',
  'lentes/hoya/index.html': 'Conheça as famílias de lentes HOYA na Ótica Pupila em Joinville. Consulte tecnologias, tratamentos e opções conforme sua receita médica.',
  'lentes/zeiss/index.html': 'Conheça lentes e tratamentos ZEISS na Ótica Pupila em Joinville. Consulte opções para sua rotina conforme sua receita médica.',
  'lentes/essilor/index.html': 'Ótica Pupila: Essilor Varilux Especialista Select 2026 em Joinville. Conheça Varilux, Eyezen, Stellest, Crizal, Transitions e Xperio.',
  'lentes/contato/index.html': 'Conheça as linhas de lentes de contato na Ótica Pupila em Joinville. Consulte opções com receita médica; consultas e adaptação fora da loja.',
  '404.html': 'Encontre as páginas e os canais de atendimento da Ótica Pupila em Joinville.'
};
const output = new Map();
for (const [route, page] of Object.entries(pages)) {
  const prefix = route === '404.html' ? (siteUrl ? new URL(siteUrl).pathname.replace(/\/?$/, '/') : '/') : '../'.repeat(route.split('/').length - 1) || './';
  const description = descriptions[route] ?? page.description;
  if (!description || description.length > 160) throw new Error(`Descrição ausente ou longa: ${route}`);
  let content = page.html.replace(/pupila-asset:([^" ]+)/g, (_, key) => context.window.PUPILA_ASSETS[key] || '');
  if (route === 'privacidade/index.html') {
    const p = config.privacy;
    const details = privacyReady
      ? `<p>Atualizada em ${escape(p.reviewedOn)}.</p><h2>Responsável pelo site</h2><p>${escape(p.legalName)} · CNPJ ${escape(p.cnpj)}.<br>${escape(p.address)}.</p>`
      : '<p class="care-note">Esta prévia aguarda os dados oficiais da empresa e da hospedagem para concluir a política de privacidade.</p>';
    const hosting = privacyReady ? `A hospedagem é fornecida por ${escape(p.hosting)}, em ${escape(p.hostingCountry)}. Registros técnicos: ${escape(p.logRetention)}.` : 'O serviço de hospedagem e suas condições de registro de acesso ainda não foram definidos.';
    content = content.replace(/<article class="wrap prose">[\s\S]*?<\/article>/, `<article class="wrap prose">${details}
<h2>Funcionamento do site</h2><p>Este site apresenta a loja e sua seleção. Não oferece contas, pagamentos ou formulários para coleta de dados pessoais. O código não utiliza cookies, pixels de publicidade, análise de audiência ou armazenamento local para acompanhar visitantes.</p>
<h2>Hospedagem e registros técnicos</h2><p>${hosting}</p>
<h2>Atendimento</h2><p>A página de contato informa o endereço, os horários e o número de atendimento da loja. Os botões de WhatsApp abrem o serviço com uma mensagem sugerida sobre o produto ou a página consultada. Você pode revisar a mensagem antes de enviá-la.</p>
<h2>Contato sobre privacidade</h2><p>${privacyReady ? `Para solicitações sobre seus dados pessoais, incluindo acesso, correção ou exclusão, entre em contato por ${escape(p.contact)}.` : 'Durante a preparação desta versão, dúvidas podem ser encaminhadas à loja pelo telefone (47) 3422-3223. O canal definitivo para solicitações sobre dados pessoais ainda será confirmado.'}</p></article>`);
  }
  content = content.replace(/\b(href|src)="([^"]+)"/g, (match, attr, value) => {
    if (value.startsWith('#/')) {
      const [target, anchor] = value.slice(2).split('#');
      const key = target.split('?')[0];
      return `${attr}="${prefix}${publicPath(key)}${anchor ? `#${anchor}` : ''}"`;
    }
    if (value.startsWith('assets/') || value.startsWith('lentes/')) return `${attr}="${prefix}${value}"`;
    return match;
  });
  // Responsive variants use actual source candidates, including on nested routes.
  content = content.replace(/src="([^"]*assets\/(image-0[234])\.webp)"/g, (match, src, stem) => `${match} srcset="${prefix}assets/${stem}-480.webp 480w, ${prefix}assets/${stem}-768.webp 768w, ${src} ${stem === 'image-02' ? 1536 : 1152}w" sizes="(max-width: 600px) 90vw, 50vw"`);
  content = content.replace(/src="([^"]*essilor-select-2026-1600\.webp)"/g, (match, src) => `${match} srcset="${prefix}assets/lenses/essilor-select-2026-800.webp 800w, ${src} 1600w" sizes="(max-width: 700px) 90vw, 50vw"`);
  const currentHref = `${prefix}${publicPath(route)}`;
  content = content.replace(/<nav id="main-nav"[\s\S]*?<\/nav>/, nav => nav.replaceAll(`href="${currentHref}"`, `href="${currentHref}" aria-current="page"`));
  const noindex = route === '404.html';
  const url = siteUrl ? `${siteUrl}/${publicPath(route)}` : '';
  const image = siteUrl ? `${siteUrl}/assets/social-pupila.jpg` : '';
  output.set(route, `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#123442">
  <meta name="description" content="${escape(description)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : ''}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${escape(page.title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta name="twitter:card" content="summary_large_image">
  ${url && route !== '404.html' ? `<link rel="canonical" href="${escape(url)}">\n  <meta property="og:url" content="${escape(url)}">` : ''}
  ${image ? `<meta property="og:image" content="${escape(image)}">\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">\n  <meta property="og:image:alt" content="Ótica Pupila — Joinville, desde 1992">` : ''}
  <title>${escape(page.title)}</title>
  <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}assets/site.css">
  <link rel="preload" as="font" href="${prefix}assets/fonts/dm-sans-latin.woff2" type="font/woff2" crossorigin>
  ${route === 'index.html' ? `<link rel="preload" as="font" href="${prefix}assets/fonts/cormorant-garamond-italic-latin.woff2" type="font/woff2" crossorigin>
  <link rel="preload" as="image" href="${prefix}assets/image-04.webp" imagesrcset="${prefix}assets/image-04-480.webp 480w, ${prefix}assets/image-04-768.webp 768w, ${prefix}assets/image-04.webp 1152w" imagesizes="(max-width: 600px) 90vw, 50vw" fetchpriority="high">` : ''}
  <script defer src="${prefix}assets/routes.js"></script>
  <script src="${prefix}assets/app.js"></script>
</head>
<body data-root="${prefix}" data-page="${route.split('/')[0].replace('.html', '')}">
  <div id="pupila-app">${content}</div>
</body>
</html>
`.replace(/[ \t]+$/gm, ''));
}
output.set('assets/routes.js', `/* Gerado por scripts/build-site.mjs. */\nwindow.PUPILA_ROUTES = ${JSON.stringify(Object.fromEntries(Object.keys(pages).map(route => [route, publicPath(route)])), null, 2)};\n`);
output.set('robots.txt', `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
if (siteUrl) output.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).filter(route => route !== '404.html').map(route => `  <url><loc>${escape(`${siteUrl}/${publicPath(route)}`)}</loc></url>`).join('\n')}\n</urlset>\n`);
for (const [file, content] of output) {
  const destination = path.join(root, file);
  if (check) {
    if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8').replace(/\r\n/g, '\n') !== content) throw new Error(`${file} está desatualizado; execute npm run build`);
  } else {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content);
  }
}
if (!siteUrl && fs.existsSync(path.join(root, 'sitemap.xml'))) {
  if (check) throw new Error('sitemap.xml contém domínio antigo; execute npm run build');
  fs.unlinkSync(path.join(root, 'sitemap.xml'));
}
if (publish) {
  const dist = path.join(root, 'dist');
  if (path.resolve(path.dirname(dist)) !== path.resolve(root) || (fs.existsSync(dist) && fs.lstatSync(dist).isSymbolicLink())) throw new Error('Diretório de publicação fora da pasta do projeto.');
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(dist, { recursive: true });
  for (const [file] of output) {
    fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
    fs.copyFileSync(path.join(root, file), path.join(dist, file));
  }
  fs.cpSync(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true, filter: file => !['catalog-products.js', 'pages.js', 'lens-pages.js', 'logo-meta.png', 'essilor-select-2026.jpeg'].includes(path.basename(file)) && !file.endsWith('.avif') });
}
console.log(`✓ ${Object.keys(pages).length} páginas estáticas ${check ? 'verificadas' : 'geradas'}${siteUrl ? ', SEO com domínio configurado' : '; domínio e política final pendentes'}`);
