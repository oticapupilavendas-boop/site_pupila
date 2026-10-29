/* Interações leves das páginas de lentes estáticas. */
(() => {
  'use strict';
  const root = document.getElementById('pupila-app');
  if (!root) return;
  const nav = root.querySelector('#main-nav');
  const toggle = root.querySelector('.menu-toggle');
  root.querySelectorAll('.lens-comparison-range').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.lens-comparison').style.setProperty('--comparison-position', `${input.value}%`);
    });
  });
  const closeMenu = () => {
    nav?.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
  };
  root.addEventListener('click', event => {
    const target = event.target.closest('a, button');
    if (!target) return;
    if (target === toggle) {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('menu-open', open);
      if (open) nav.querySelector('summary, a[href]')?.focus();
    }
    if (target.matches('[data-whatsapp]')) {
      window.open(`https://wa.me/554734223223?text=${encodeURIComponent(target.dataset.whatsapp)}`, '_blank', 'noopener,noreferrer');
    }
    if (target.getAttribute('href') === '#conteudo') {
      event.preventDefault();
      root.querySelector('main')?.focus();
    }
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
    if (toggle?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
})();
