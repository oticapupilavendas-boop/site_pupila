(function () {
  'use strict';

  const root = document.getElementById('pupila-app');
  const home = window.PUPILA_PAGES?.['index.html'];
  if (!root || !home) return;

  const route = 'ray-ban-meta/index.html';
  const base = 'assets/0RW4011__601SSB__P21__shad__';
  const views = [
    ['qt', 'Vista de três quartos, com frente e haste direita visíveis'],
    ['fr', 'Vista frontal da armação preta'],
    ['al2', 'Vista de três quartos, com frente e haste esquerda visíveis'],
    ['lt', 'Vista lateral da haste'],
    ['bk', 'Vista posterior da armação'],
    ['cfr', 'Vista frontal pelo lado interno da armação']
  ];
  const image = (view, extra = '', alt = view[1]) => `<img src="${base}${view[0]}.avif" width="720" height="386" alt="${alt}" decoding="async" ${extra}>`;

  const feature = `<section class="meta-feature" aria-labelledby="meta-feature-title"><div class="wrap meta-feature-grid"><div class="meta-feature-copy"><p class="eyebrow">EM DESTAQUE NA PUPILA</p><h2 id="meta-feature-title">Um clássico para olhar adiante.</h2><p>Conheça o Ray-Ban Meta Wayfarer Gen 3, modelo RW4011 601SSB: armação preto fosco e lentes transparentes. Explore os ângulos e converse com a equipe da Pupila sobre o produto.</p><a class="button primary" href="#/${route}">Conhecer os óculos <span aria-hidden="true">↗</span></a></div><figure class="meta-feature-art">${image(views[0], 'loading="lazy"')}<figcaption>RAY-BAN META · WAYFARER GEN 3</figcaption></figure></div></section>`;

  const buttons = views.map((view, index) => `<button type="button" class="meta-view" data-meta-view="${index}" aria-label="Ver ângulo ${index + 1}: ${view[1]}" aria-pressed="${index === 0}">${image(view, 'loading="lazy"', '')}<span>${['3/4','Frente','3/4','Lateral','Traseira','Interior'][index]}</span></button>`).join('');
  const productMain = `<main id="conteudo" tabindex="-1"><div class="wrap breadcrumb"><a href="#/index.html">Início</a><span aria-hidden="true">/</span><span>Ray-Ban Meta</span></div><section class="meta-page wrap" aria-labelledby="meta-title"><div class="meta-page-heading"><p class="eyebrow">SELEÇÃO PUPILA · RW4011 601SSB</p><h1 id="meta-title">Ray-Ban Meta<br>Wayfarer Gen 3.</h1><p>Uma armação icônica em preto fosco. Veja o produto por diferentes ângulos e fale com a equipe da Pupila para confirmar tamanho e disponibilidade.</p></div><div class="meta-gallery" aria-label="Galeria de imagens dos óculos"><div class="meta-gallery-main">${image(views[0], 'id="meta-main-image" fetchpriority="high"')}<span class="meta-gallery-count" aria-live="polite">01 / 06</span></div><div class="meta-gallery-controls" role="group" aria-label="Escolha um ângulo">${buttons}</div><p class="meta-gallery-help">Use os botões para mudar o ângulo. Com foco na galeria, as setas do teclado também funcionam.</p></div><div class="meta-page-details"><div><p class="eyebrow">O PRODUTO</p><h2>Detalhes confirmados.</h2></div><dl><div><dt>Modelo</dt><dd>RW4011 601SSB</dd></div><div><dt>Armação</dt><dd>Preto fosco</dd></div><div><dt>Lentes</dt><dd>Transparentes com filtro de luz azul-violeta</dd></div><div><dt>Tamanho e disponibilidade</dt><dd>Consulte a equipe da Pupila</dd></div></dl></div><div class="meta-page-cta"><p>Quer conhecer os óculos de perto?</p><button type="button" class="button primary" data-whatsapp="Olá! Gostaria de saber mais sobre o Ray-Ban Meta Wayfarer Gen 3 RW4011 601SSB.">Fale com a Pupila</button><a class="text-link" href="#/contato/index.html">Visite a loja</a></div></section></main>`;

  window.PUPILA_PAGES[route] = {
    title: 'Ray-Ban Meta Wayfarer Gen 3 | Ótica Pupila',
    html: home.html.replace(/<main id="conteudo"[\s\S]*?<\/main>/, productMain)
  };

  function enhance() {
    const footerLogo = root.querySelector('.footer-brand img');
    if (footerLogo) {
      footerLogo.src = 'assets/logo-pupila-branco.webp';
      footerLogo.width = 1767;
      footerLogo.height = 842;
    }
    const nav = root.querySelector('#main-nav');
    if (nav && !nav.querySelector('.meta-nav-link')) {
      const link = document.createElement('a');
      link.className = 'nav-link meta-nav-link';
      link.href = `#/${route}`;
      link.textContent = 'Ray-Ban Meta';
      if (window.PupilaRoute === route) link.setAttribute('aria-current', 'page');
      const contact = nav.querySelector('a[href="#/contato/index.html"]');
      if (contact) contact.before(link);
      else nav.append(link);
    }
    const footer = root.querySelector('.footer-grid');
    if (footer && !footer.querySelector('.meta-footer-link')) {
      const link = document.createElement('a');
      link.className = 'meta-footer-link';
      link.href = `#/${route}`;
      link.textContent = 'Ray-Ban Meta';
      footer.querySelector('a[href="#/oculos-de-sol/index.html"]')?.after(link);
    }
    if (window.PupilaRoute === 'index.html' && !root.querySelector('.meta-feature')) {
      root.querySelector('.values-strip')?.insertAdjacentHTML('afterend', feature);
      const panel = root.querySelector('.meta-feature');
      if (panel && !matchMedia('(prefers-reduced-motion: reduce)').matches && window.gsap && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
          if (!entries[0].isIntersecting) return;
          observer.disconnect();
          gsap.fromTo(panel.querySelector('.meta-feature-copy'), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .65, ease: 'power2.out', clearProps: 'all' });
        }, { threshold: .12 });
        observer.observe(panel);
      }
    }
  }

  const render = window.PupilaRender;
  window.PupilaRender = function (...args) {
    render.apply(this, args);
    enhance();
  };
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-meta-view]');
    if (!button) return;
    showView(Number(button.dataset.metaView));
  });
  root.addEventListener('keydown', event => {
    const button = event.target.closest('[data-meta-view]');
    if (!button || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const index = (Number(button.dataset.metaView) + (event.key === 'ArrowRight' ? 1 : views.length - 1)) % views.length;
    showView(index);
    root.querySelector(`[data-meta-view="${index}"]`)?.focus();
  });
  function showView(index) {
    const main = root.querySelector('#meta-main-image');
    if (!main || !views[index]) return;
    const update = () => { main.src = `${base}${views[index][0]}.avif`; main.alt = views[index][1]; };
    if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(main, { opacity: .3, duration: .12, onComplete: () => { update(); gsap.to(main, { opacity: 1, duration: .25 }); } });
    } else update();
    root.querySelectorAll('[data-meta-view]').forEach(el => el.setAttribute('aria-pressed', String(Number(el.dataset.metaView) === index)));
    const count = root.querySelector('.meta-gallery-count');
    if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / 06`;
  }

  if (location.hash.startsWith(`#/${route}`)) window.PupilaRender(route, false);
  else enhance();
})();
