/* Interações progressivas compartilhadas por todas as páginas estáticas. */
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const root = document.getElementById('pupila-app');
  if (!root) return;
  const routes = window.PUPILA_ROUTES || {};
  const siteRoot = new URL(document.body.dataset.root || './', location.href);
  function redirectLegacyRoute() {
    if (!location.hash.startsWith('#/')) return;
    const [pathAndQuery, anchor = ''] = location.hash.slice(2).split('#');
    const raw = pathAndQuery.split('?')[0].replace(/^\/+|\/+$/g, '');
    const key = !raw ? 'index.html' : /\.html$/.test(raw) ? raw : `${raw}/index.html`;
    const destination = Object.hasOwn(routes, key) ? routes[key] : '404.html';
    const url = new URL(destination, siteRoot);
    if (anchor) url.hash = anchor;
    location.replace(url.href);
  }
  redirectLegacyRoute();
  window.addEventListener('hashchange', redirectLegacyRoute);
  root.classList.add('js');
  const nav = root.querySelector('#main-nav');
  const toggle = root.querySelector('.menu-toggle');
  const catalog = root.querySelector('[data-catalog]');
  const brandMenu = root.querySelector('[data-catalog-brand]');
  const pendingCards = new Map();
  const observeCatalog = catalog && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cardObserver = observeCatalog ? new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) revealCatalogGroup(target);
    });
  }, { threshold: .08 }) : null;
  const closeGroups = () => root.querySelectorAll('.nav-group[open]').forEach(group => { group.open = false; });
  const closeMenu = (returnFocus = false) => {
    const wasOpen = toggle?.getAttribute('aria-expanded') === 'true';
    nav?.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (returnFocus && wasOpen) toggle.focus();
  };
  function showProductView(index) {
    const buttons = [...root.querySelectorAll('[data-product-view]')];
    const button = buttons[index];
    const image = button?.querySelector('img');
    const main = root.querySelector('#product-main-image');
    if (!main || !image) return;
    main.src = image.src;
    main.alt = button.dataset.viewAlt;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    root.querySelector('.meta-gallery-count').textContent = `${String(index + 1).padStart(2, '0')} / ${String(buttons.length).padStart(2, '0')}`;
  }
  function revealCatalogGroup(card) {
    const group = pendingCards.get(card);
    if (!group) return;
    for (const member of group) {
      pendingCards.delete(member);
      cardObserver.unobserve(member);
      member.classList.replace('catalog-pending', 'catalog-entering');
    }
  }
  function prepareCatalogEntrance() {
    if (!cardObserver) return;
    cardObserver.disconnect();
    cardObserver.takeRecords();
    pendingCards.clear();
    const cards = [...catalog.querySelectorAll('[data-catalog-card]')];
    cards.forEach(card => card.classList.remove('catalog-pending', 'catalog-entering'));
    const visible = cards.filter(card => !card.hidden);
    for (let start = 0; start < visible.length; start += 3) {
      const group = visible.slice(start, start + 3);
      group.forEach((card, index) => {
        card.style.setProperty('--catalog-delay', `${index * 70}ms`);
        card.classList.add('catalog-pending');
        pendingCards.set(card, group);
        cardObserver.observe(card);
      });
    }
  }
  function updateCatalog(catalog, audience = catalog.dataset.audience || 'todos') {
    const brand = catalog.querySelector('[data-catalog-brand-option][aria-pressed="true"]').dataset.catalogBrandOption;
    let visible = 0;
    catalog.querySelectorAll('[data-catalog-card]').forEach(card => {
      const audienceMatch = audience === 'todos' || card.dataset.audience.split(' ').some(value => value === audience || value === 'todos');
      card.hidden = !(audienceMatch && (brand === 'todas' || card.dataset.brand === brand));
      if (!card.hidden) visible++;
    });
    catalog.dataset.audience = audience;
    catalog.querySelectorAll('[data-catalog-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.catalogFilter === audience)));
    catalog.querySelector('[data-catalog-result]').textContent = visible === 1 ? '1 modelo em destaque' : `${visible} modelos em destaque`;
    catalog.querySelector('[data-catalog-empty]').hidden = visible !== 0;
    prepareCatalogEntrance();
  }
  prepareCatalogEntrance();
  catalog?.addEventListener('focusin', event => revealCatalogGroup(event.target.closest('[data-catalog-card]')));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function watchCarouselMotion(carousel, viewport, onChange) {
    const toggleMotion = carousel.querySelector('[data-motion-toggle]');
    if (!('IntersectionObserver' in window)) return;
    let visible = false;
    let paused = false;
    let hovered = false;
    function update() {
      toggleMotion.hidden = reducedMotion.matches;
      toggleMotion.textContent = paused ? 'Retomar' : 'Pausar';
      onChange(visible && !document.hidden && !reducedMotion.matches
        && !paused && !hovered && !carousel.contains(document.activeElement));
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= .35;
      update();
    }, { threshold: .35 });
    observer.observe(viewport);
    toggleMotion.addEventListener('click', () => {
      paused = !paused;
      update();
    });
    carousel.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') {
        hovered = true;
        update();
      }
    });
    carousel.addEventListener('pointerleave', () => {
      hovered = false;
      update();
    });
    carousel.addEventListener('focusin', update);
    carousel.addEventListener('focusout', () => queueMicrotask(update));
    reducedMotion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
  }

  for (const carousel of root.querySelectorAll('[data-carousel]')) {
    const track = carousel.querySelector('.carousel-slides');
    const slides = [...track.children];
    const controls = carousel.querySelector('.carousel-controls');
    const position = controls.querySelector('[data-carousel-position]');
    let current = 0;

    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'item');
      slide.setAttribute('aria-label', `${index + 1} de ${slides.length}`);
      slide.setAttribute('aria-hidden', String(index !== 0));
    });
    carousel.classList.add('carousel-enhanced');
    carousel.setAttribute('aria-roledescription', 'carrossel');
    track.setAttribute('aria-live', 'polite');
    position.textContent = `1 / ${slides.length}`;
    controls.hidden = false;
    function advance(step) {
      slides[current].setAttribute('aria-hidden', 'true');
      current = (current + step + slides.length) % slides.length;
      slides[current].setAttribute('aria-hidden', 'false');
      position.textContent = `${current + 1} / ${slides.length}`;
    }
    controls.addEventListener('click', event => {
      const step = event.target.closest('[data-carousel-step]');
      if (step) advance(Number(step.dataset.carouselStep));
    });
    if (carousel.hasAttribute('data-carousel-autoplay')) {
      let timer;
      watchCarouselMotion(carousel, track, running => {
        clearInterval(timer);
        track.setAttribute('aria-live', running ? 'off' : 'polite');
        if (running) timer = setInterval(() => advance(1), 7500);
      });
    }
  }

  for (const carousel of root.querySelectorAll('[data-brand-carousel]')) {
    const viewport = carousel.querySelector('.brand-strip-window');
    const track = carousel.querySelector('.brand-strip-track');
    const list = track.firstElementChild;
    const duplicate = list.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    track.append(duplicate);
    carousel.classList.add('brand-enhanced');
    let offset = 0;
    let frame = 0;
    let previousTime = 0;
    let running = false;
    let jump;
    let period;
    let logoStep;

    function paint() {
      if (!period) return;
      offset = ((offset % period) + period) % period;
      track.style.transform = `translateX(${offset - period}px)`;
    }
    function measure() {
      period = list.getBoundingClientRect().width;
      logoStep = list.children[1].offsetLeft - list.children[0].offsetLeft;
      paint();
    }
    function animate(time) {
      frame = 0;
      if (jump) {
        jump.start ??= time;
        const progress = Math.min((time - jump.start) / 350, 1);
        const travelled = jump.distance * (1 - (1 - progress) ** 3);
        offset += travelled - jump.travelled;
        jump.travelled = travelled;
        if (progress === 1) jump = undefined;
      } else if (running && previousTime) {
        offset += Math.min(time - previousTime, 50) * .024;
      }
      previousTime = time;
      paint();
      if (running || jump) frame = requestAnimationFrame(animate);
    }
    measure();
    for (const arrow of carousel.querySelectorAll('[data-brand-step]')) {
      arrow.hidden = false;
      arrow.addEventListener('click', () => {
        const distance = -Number(arrow.dataset.brandStep) * logoStep;
        if (reducedMotion.matches) {
          offset += distance;
          paint();
        } else {
          jump = { distance: distance + (jump ? jump.distance - jump.travelled : 0), travelled: 0 };
          if (!frame) frame = requestAnimationFrame(animate);
        }
      });
    }
    window.addEventListener('resize', measure);
    watchCarouselMotion(carousel, viewport, active => {
      running = active;
      if (running && !frame) {
        previousTime = 0;
        frame = requestAnimationFrame(animate);
      }
    });
  }

  root.addEventListener('click', event => {
    const target = event.target.closest('a, button');
    if (!target) return;
    if (target === toggle) {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav?.classList.toggle('menu-open', open);
      if (open) nav?.querySelector('summary, a[href]')?.focus();
    }
    if (target.matches('[data-product-view]')) showProductView(Number(target.dataset.productView));
    if (target.matches('[data-catalog-filter]')) updateCatalog(target.closest('[data-catalog]'), target.dataset.catalogFilter);
    if (target.matches('[data-catalog-brand-option]')) {
      brandMenu.querySelectorAll('[data-catalog-brand-option]').forEach(option => option.setAttribute('aria-pressed', String(option === target)));
      brandMenu.querySelector('#catalog-brand-value').textContent = target.textContent;
      brandMenu.open = false;
      brandMenu.querySelector('summary').focus();
      updateCatalog(brandMenu.closest('[data-catalog]'));
    }
    if (target.getAttribute('href') === '#conteudo') {
      event.preventDefault();
      root.querySelector('main')?.focus();
      root.querySelector('main')?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  });
  root.addEventListener('keydown', event => {
    if (brandMenu?.contains(event.target) && ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      const options = [...brandMenu.querySelectorAll('[data-catalog-brand-option]')];
      const current = options.indexOf(event.target);
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1
        : current < 0 ? options.findIndex(option => option.getAttribute('aria-pressed') === 'true')
        : (current + offset + options.length) % options.length;
      event.preventDefault();
      brandMenu.open = true;
      options[next].focus();
      return;
    }
    const button = event.target.closest('[data-product-view]');
    if (!button || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const length = root.querySelectorAll('[data-product-view]').length;
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? length - 1 : (Number(button.dataset.productView) + delta + length) % length;
    showProductView(index);
    root.querySelector(`[data-product-view="${index}"]`).focus();
  });
  root.addEventListener('input', event => {
    if (event.target.matches('.lens-comparison-range')) event.target.closest('.lens-comparison').style.setProperty('--comparison-position', `${event.target.value}%`);
  });
  root.addEventListener('toggle', event => {
    if (event.target.matches('.nav-group[open]')) root.querySelectorAll('.nav-group[open]').forEach(group => { if (group !== event.target) group.open = false; });
  }, true);
  document.addEventListener('click', event => {
    if (brandMenu?.open && !brandMenu.contains(event.target)) brandMenu.open = false;
    if (!event.target.closest('.nav-group')) closeGroups();
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (brandMenu?.open && brandMenu.contains(event.target)) {
      brandMenu.open = false;
      brandMenu.querySelector('summary').focus();
      return;
    }
    const summary = root.querySelector('.nav-group[open] > summary');
    closeGroups();
    summary?.focus();
    closeMenu(true);
  });
  root.addEventListener('focusout', event => {
    if (brandMenu?.open && brandMenu.contains(event.target) && event.relatedTarget && !brandMenu.contains(event.relatedTarget)) brandMenu.open = false;
    if (event.relatedTarget && !root.querySelector('.site-header')?.contains(event.relatedTarget)) {
      closeMenu();
      closeGroups();
    }
  });
});
