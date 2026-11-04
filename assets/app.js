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
  function updateCatalog(catalog, audience = catalog.dataset.audience || 'todos') {
    const brand = catalog.querySelector('[data-catalog-brand]').value;
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
    if (target.getAttribute('href') === '#conteudo') {
      event.preventDefault();
      root.querySelector('main')?.focus();
      root.querySelector('main')?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  });
  root.addEventListener('keydown', event => {
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
  root.addEventListener('change', event => {
    if (event.target.matches('[data-catalog-brand]')) updateCatalog(event.target.closest('[data-catalog]'));
  });
  root.addEventListener('toggle', event => {
    if (event.target.matches('.nav-group[open]')) root.querySelectorAll('.nav-group[open]').forEach(group => { if (group !== event.target) group.open = false; });
  }, true);
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-group')) closeGroups();
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const summary = root.querySelector('.nav-group[open] > summary');
    closeGroups();
    summary?.focus();
    closeMenu(true);
  });
  root.addEventListener('focusout', event => {
    if (event.relatedTarget && !root.querySelector('.site-header')?.contains(event.relatedTarget)) {
      closeMenu();
      closeGroups();
    }
  });
});
