/* Desktop-only progressive enhancement: the local poster remains usable without JS/WebGL/CDN. */
(() => {
  const stage = document.querySelector('[data-sunglasses]');
  const desktop = matchMedia('(min-width: 651px) and (hover: hover) and (pointer: fine)');
  if (!stage || !desktop.matches) return;

  const poster = stage.querySelector('img');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const probe = document.createElement('canvas');
  const gl = probe.getContext('webgl2');
  if (!gl) return;
  gl.getExtension('WEBGL_lose_context')?.loseContext();

  const root = document.body.dataset.root || './';
  const viewer = document.createElement('model-viewer');
  const attributes = {
    src: `${root}assets/models/timberland-solar.glb?v=3`,
    'environment-image': `${root}assets/models/pupila-studio-centered.hdr`,
    'camera-orbit': '0deg 90deg auto',
    'field-of-view': '28deg',
    'shadow-intensity': '0',
    'interaction-prompt': 'none',
    exposure: '1',
    loading: 'eager',
    reveal: 'auto',
    'aria-hidden': 'true'
  };
  Object.entries(attributes).forEach(([name, value]) => viewer.setAttribute(name, value));
  viewer.inert = true;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frameId = 0;
  let previousTime = 0;
  let failed = false;
  let timeoutId;

  const applyOrbit = () => {
    // The viewer orbits the camera, so the front of the frames turns the other way.
    viewer.setAttribute('camera-orbit', `${-currentX * 24}deg ${90 - currentY * 12}deg auto`);
  };

  const animate = time => {
    const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.1) : 1 / 60;
    previousTime = time;
    const smoothing = 1 - Math.exp(-5 * delta);
    currentX += (targetX - currentX) * smoothing;
    currentY += (targetY - currentY) * smoothing;
    applyOrbit();
    if (Math.abs(targetX - currentX) > .001 || Math.abs(targetY - currentY) > .001) {
      frameId = requestAnimationFrame(animate);
    } else {
      currentX = targetX;
      currentY = targetY;
      applyOrbit();
      frameId = 0;
      previousTime = 0;
    }
  };

  const schedule = () => {
    if (!frameId) frameId = requestAnimationFrame(animate);
  };

  const followCursor = event => {
    if (reduced.matches || !desktop.matches || event.pointerType !== 'mouse') return;
    const { left, top, width, height } = stage.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    targetX = Math.max(-1, Math.min(1, (event.clientX - centerX) / (width / 2)));
    targetY = Math.max(-1, Math.min(1, (event.clientY - centerY) / (height / 2)));
    schedule();
  };

  const resetOrbit = () => {
    targetX = 0;
    targetY = 0;
    if (reduced.matches || !desktop.matches) {
      currentX = 0;
      currentY = 0;
      cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
      applyOrbit();
    } else {
      schedule();
    }
  };

  const fallback = () => {
    if (failed) return;
    failed = true;
    clearTimeout(timeoutId);
    cancelAnimationFrame(frameId);
    reduced.removeEventListener('change', resetOrbit);
    desktop.removeEventListener('change', resetOrbit);
    window.removeEventListener('pointermove', followCursor);
    document.removeEventListener('pointerleave', resetOrbit);
    stage.classList.remove('is-ready');
    viewer.remove();
  };

  reduced.addEventListener('change', resetOrbit);
  desktop.addEventListener('change', resetOrbit);
  window.addEventListener('pointermove', followCursor, { passive: true });
  document.addEventListener('pointerleave', resetOrbit);
  viewer.addEventListener('error', fallback);
  viewer.addEventListener('load', () => {
    if (failed) return;
    clearTimeout(timeoutId);
    poster.setAttribute('aria-hidden', 'true');
    stage.classList.add('is-ready');
    resetOrbit();
  }, { once: true });
  stage.append(viewer);
  timeoutId = setTimeout(fallback, 30000);

  (async () => {
    try {
      if (!customElements.get('model-viewer')) {
        await import('https://cdn.jsdelivr.net/npm/@google/model-viewer@4.4.0/dist/model-viewer.min.js');
      }
    } catch {
      fallback();
    }
  })();
})();
