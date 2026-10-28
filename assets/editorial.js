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
  const angleNames = ['três quartos à direita', 'frontal', 'três quartos à esquerda', 'lateral', 'posterior', 'interior'];
  const arrow = direction => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${direction === 'prev' ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'}"/></svg>`;
  const rotate = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9a8 8 0 0 1 14-3l2 2"/><path d="M20 4v4h-4M20 15a8 8 0 0 1-14 3l-2-2"/><path d="M4 20v-4h4"/></svg>';
  const image = (view, extra = '', alt = view[1]) => `<img src="${base}${view[0]}.avif" width="720" height="386" alt="${alt}" decoding="async" ${extra}>`;

  const feature = `<section class="meta-feature" aria-labelledby="meta-feature-title"><div class="wrap meta-feature-grid"><div class="meta-feature-copy"><p class="eyebrow">EM DESTAQUE NA PUPILA</p><h2 id="meta-feature-title">Um clássico para olhar adiante.</h2><p>Conheça o Ray-Ban Meta Wayfarer Gen 3, modelo RW4011 601SSB: armação preto fosco e lentes transparentes. Explore os ângulos e converse com a equipe da Pupila sobre o produto.</p><a class="button primary" href="#/${route}">Conhecer os óculos <span aria-hidden="true">↗</span></a></div><figure class="meta-feature-art">${image(views[0], 'loading="lazy"')}<figcaption>RAY-BAN META · WAYFARER GEN 3</figcaption></figure></div></section>`;

  const buttons = views.map((view, index) => `<button type="button" class="meta-view" data-meta-view="${index}" aria-label="Ver ângulo ${index + 1}: ${view[1]}" aria-pressed="${index === 0}">${image(view, 'loading="lazy"', '')}<span>${['3/4','Frente','3/4','Lateral','Traseira','Interior'][index]}</span></button>`).join('');
  const productMain = `<main id="conteudo" tabindex="-1"><div class="wrap breadcrumb"><a href="#/index.html">Início</a><span aria-hidden="true">/</span><span>Ray-Ban Meta</span></div><section class="meta-page wrap" aria-labelledby="meta-title"><div class="meta-page-heading"><p class="eyebrow">SELEÇÃO PUPILA · RW4011 601SSB</p><h1 id="meta-title">Ray-Ban Meta<br>Wayfarer Gen 3.</h1><p>Uma armação icônica em preto fosco. Veja o produto por diferentes ângulos e fale com a equipe da Pupila para confirmar tamanho e disponibilidade.</p></div><div class="meta-gallery" aria-label="Visualização em 360 graus dos óculos"><div class="meta-gallery-main" data-meta-spinner tabindex="0" role="group" aria-label="Visualizador em 360 graus, ângulo 1 de 6: ${angleNames[0]}" aria-describedby="meta-gallery-help">${image(views[0], 'id="meta-main-image" fetchpriority="high" draggable="false"')}<span class="meta-gallery-badge">${rotate}<span>360° · ARRASTE</span></span><button type="button" class="meta-gallery-arrow prev" data-meta-step="-1" aria-label="Ver ângulo anterior">${arrow('prev')}</button><button type="button" class="meta-gallery-arrow next" data-meta-step="1" aria-label="Ver próximo ângulo">${arrow('next')}</button><span class="meta-gallery-count" aria-live="polite">01 / 06</span></div><div class="meta-gallery-controls" role="group" aria-label="Escolha um ângulo">${buttons}</div><p class="meta-gallery-help" id="meta-gallery-help">Arraste ou deslize sobre a imagem para girar. Você também pode usar as setas do teclado ou escolher um ângulo abaixo.</p></div><div class="meta-page-details"><div><p class="eyebrow">O PRODUTO</p><h2>Detalhes confirmados.</h2></div><dl><div><dt>Modelo</dt><dd>RW4011 601SSB</dd></div><div><dt>Armação</dt><dd>Preto fosco</dd></div><div><dt>Lentes</dt><dd>Transparentes com filtro de luz azul-violeta</dd></div><div><dt>Tamanho e disponibilidade</dt><dd>Consulte a equipe da Pupila</dd></div></dl></div><div class="meta-page-cta"><p>Quer conhecer os óculos de perto?</p><button type="button" class="button primary" data-whatsapp="Olá! Gostaria de saber mais sobre o Ray-Ban Meta Wayfarer Gen 3 RW4011 601SSB.">Fale com a Pupila</button><a class="text-link" href="#/contato/index.html">Visite a loja</a></div></section></main>`;

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
    if (button) {
      showView(Number(button.dataset.metaView));
      return;
    }
    const step = event.target.closest('[data-meta-step]');
    if (step) showView(currentView() + Number(step.dataset.metaStep));
  });
  root.addEventListener('keydown', event => {
    const button = event.target.closest('[data-meta-view]');
    const spinner = event.target.closest('[data-meta-spinner]');
    if ((!button && !spinner) || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? views.length - 1 : currentView() + (event.key === 'ArrowRight' ? 1 : -1);
    showView(index);
    if (button) root.querySelector(`[data-meta-view="${normalise(index)}"]`)?.focus();
  });
  let drag = null;
  root.addEventListener('pointerdown', event => {
    const spinner = event.target.closest('[data-meta-spinner]');
    if (!spinner || event.target.closest('button')) return;
    drag = { pointerId: event.pointerId, x: event.clientX };
    spinner.classList.add('is-dragging');
    spinner.setPointerCapture?.(event.pointerId);
  });
  root.addEventListener('pointermove', event => {
    const spinner = event.target.closest('[data-meta-spinner]');
    if (!spinner || !drag || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (Math.abs(distance) < 34) return;
    if (event.cancelable) event.preventDefault();
    showView(currentView() + (distance < 0 ? 1 : -1), false);
    drag.x = event.clientX;
  });
  const endDrag = event => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    root.querySelector('[data-meta-spinner]')?.classList.remove('is-dragging');
    drag = null;
  };
  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', endDrag);
  function normalise(index) {
    return (index % views.length + views.length) % views.length;
  }
  function currentView() {
    return Number(root.querySelector('[data-meta-view][aria-pressed="true"]')?.dataset.metaView || 0);
  }
  function showView(index, animate = true) {
    index = normalise(index);
    const main = root.querySelector('#meta-main-image');
    if (!main || !views[index]) return;
    const update = () => { main.src = `${base}${views[index][0]}.avif`; main.alt = views[index][1]; };
    if (window.gsap) gsap.killTweensOf(main);
    if (animate && window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(main, { opacity: .3, duration: .12, onComplete: () => { update(); gsap.to(main, { opacity: 1, duration: .25 }); } });
    } else update();
    root.querySelectorAll('[data-meta-view]').forEach(el => el.setAttribute('aria-pressed', String(Number(el.dataset.metaView) === index)));
    const count = root.querySelector('.meta-gallery-count');
    if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / 06`;
    const spinner = root.querySelector('[data-meta-spinner]');
    if (spinner) {
      spinner.setAttribute('aria-label', `Visualizador em 360 graus, ângulo ${index + 1} de ${views.length}: ${angleNames[index]}`);
    }
  }

  if (location.hash.startsWith(`#/${route}`)) window.PupilaRender(route, false);
  else enhance();
})();
