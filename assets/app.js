/* Navegação estática, menu e galeria. Sem dependências de terceiros. */
(() => {
  'use strict';

  const root = document.getElementById('pupila-app');
  const pages = window.PUPILA_PAGES;
  if (!root || !pages) return;

  const readRoute = () => location.hash.startsWith('#/') ? location.hash.slice(2) : 'index.html';
  const parseRoute = route => {
    const [pathAndQuery, anchor = ''] = route.split('#');
    return { path: pathAndQuery.split('?')[0] || 'index.html', anchor };
  };
  let currentRoute;
  let scrollFrame;

  function closeMenu(returnFocus = false) {
    const toggle = root.querySelector('.menu-toggle');
    const wasOpen = toggle?.getAttribute('aria-expanded') === 'true';
    root.querySelector('#main-nav')?.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (returnFocus && wasOpen) toggle?.focus();
  }

  function scrollToRoute(route, restoreY) {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      if (route !== currentRoute) return;
      const { anchor } = parseRoute(route);
      const target = anchor && document.getElementById(anchor);
      if (typeof restoreY === 'number') window.scrollTo({ top: restoreY, behavior: 'instant' });
      else if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }

  function render(route, focus = false, restoreY) {
    const { path } = parseRoute(route);
    const page = pages[path] || pages['404.html'];
    currentRoute = route;
    root.innerHTML = page.html.replace(/pupila-asset:([^" ]+)/g, (_, asset) => window.PUPILA_ASSETS[asset] || '');
    root.classList.add('js');
    document.title = page.title;
    document.body.dataset.page = path.split('/')[0].replace('.html', '');
    root.querySelectorAll('#main-nav a[href]').forEach(link => {
      const target = parseRoute(link.getAttribute('href').slice(2));
      if (target.path === path && !target.anchor) link.setAttribute('aria-current', 'page');
    });
    root.querySelectorAll('.nav-group').forEach(group => {
      group.toggleAttribute('data-active', Boolean(group.querySelector('[aria-current="page"]')));
    });
    if (focus) root.querySelector('main')?.focus({ preventScroll: true });
    scrollToRoute(route, restoreY);
  }

  function navigate(route) {
    if (route === currentRoute) {
      closeMenu();
      root.querySelector('main')?.focus({ preventScroll: true });
      scrollToRoute(route);
      return;
    }
    history.replaceState({ ...history.state, scrollY: window.scrollY }, '', location.href);
    history.pushState({}, '', '#/' + route);
    render(route, true);
  }

  function showProductView(index) {
    const gallery = root.querySelector('[data-product-gallery]');
    const product = window.PUPILA_DATA.products.find(item => item.slug === gallery?.dataset.productGallery);
    const view = product?.views[index];
    const main = root.querySelector('#product-main-image');
    if (!main || !view) return;
    // Update synchronously so rapid clicks cannot leave a stale selected angle.
    main.src = view.image;
    main.alt = view.alt;
    root.querySelectorAll('[data-product-view]').forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.productView) === index));
    });
    root.querySelector('.meta-gallery-count').textContent = `${String(index + 1).padStart(2, '0')} / ${String(product.views.length).padStart(2, '0')}`;
  }

  function updateCatalog(catalog, audience = catalog.dataset.audience || 'todos') {
    const brand = catalog.querySelector('[data-catalog-brand]').value;
    const cards = [...catalog.querySelectorAll('[data-catalog-card]')];
    let visible = 0;
    cards.forEach(card => {
      const audienceMatch = audience === 'todos' || card.dataset.audience.split(' ').includes(audience);
      const brandMatch = brand === 'todas' || card.dataset.brand === brand;
      const matches = audienceMatch && brandMatch;
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    catalog.dataset.audience = audience;
    catalog.querySelectorAll('[data-catalog-filter]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.catalogFilter === audience));
    });
    catalog.querySelector('[data-catalog-result]').textContent = visible === 1 ? '1 modelo disponível' : `${visible} modelos disponíveis`;
    catalog.querySelector('[data-catalog-empty]').hidden = visible !== 0;
  }

  root.addEventListener('click', event => {
    const target = event.target.closest('a, button');
    if (!target) return;
    if (target.matches('.menu-toggle')) {
      const open = target.getAttribute('aria-expanded') !== 'true';
      const nav = root.querySelector('#main-nav');
      target.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('menu-open', open);
      if (open) nav.querySelector('summary, a[href]')?.focus();
    }
    if (target.matches('[data-product-view]')) showProductView(Number(target.dataset.productView));
    if (target.matches('[data-catalog-filter]')) updateCatalog(target.closest('[data-catalog]'), target.dataset.catalogFilter);
    if (target.matches('[data-whatsapp]')) {
      const number = window.PUPILA_DATA.company.whatsapp;
      if (/^\d{10,15}$/.test(number)) {
        window.open(`https://wa.me/${number}?text=${encodeURIComponent(target.dataset.whatsapp)}`, '_blank', 'noopener,noreferrer');
      }
    }
    const href = target.getAttribute('href');
    if (href === '#conteudo') {
      event.preventDefault();
      root.querySelector('main')?.focus({ preventScroll: true });
      root.querySelector('main')?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    if (href?.startsWith('#/') && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      navigate(href.slice(2));
    }
  });

  root.addEventListener('keydown', event => {
    const button = event.target.closest('[data-product-view]');
    if (button && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const gallery = button.closest('[data-product-gallery]');
      const product = window.PUPILA_DATA.products.find(item => item.slug === gallery?.dataset.productGallery);
      const length = product?.views.length;
      if (!length) return;
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? length - 1 : (Number(button.dataset.productView) + delta + length) % length;
      showProductView(index);
      root.querySelector(`[data-product-view="${index}"]`)?.focus();
    }
  });
  root.addEventListener('change', event => {
    if (event.target.matches('[data-catalog-brand]')) updateCatalog(event.target.closest('[data-catalog]'));
  });
  root.addEventListener('toggle', event => {
    if (event.target.matches('.nav-group[open]')) {
      root.querySelectorAll('.nav-group[open]').forEach(group => {
        if (group !== event.target) group.open = false;
      });
    }
  }, true);
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-group')) root.querySelectorAll('.nav-group[open]').forEach(group => { group.open = false; });
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    root.querySelectorAll('.nav-group[open]').forEach(group => {
      group.open = false;
      group.querySelector('summary').focus();
    });
    closeMenu(true);
  });
  root.addEventListener('focusout', event => {
    if (event.relatedTarget && !root.querySelector('.site-header')?.contains(event.relatedTarget)) {
      closeMenu();
      root.querySelectorAll('.nav-group[open]').forEach(group => { group.open = false; });
    }
  });
  window.addEventListener('popstate', event => render(readRoute(), true, event.state?.scrollY));
  window.addEventListener('hashchange', () => {
    if (readRoute() !== currentRoute) render(readRoute(), true);
  });
  try { history.scrollRestoration = 'manual'; } catch { /* The links still work without scroll restoration. */ }
  render(readRoute());
})();
