import { cubicOut } from './vendor/d3-ease/cubic.mjs';

const preview = document.querySelector('.preview');
const glasses = preview.querySelector('.glasses');
const desktopMotion = matchMedia(
  '(min-width: 769px) and (any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)'
);

const directions = new Map([
  ['ArrowLeft', [-1, 0]],
  ['ArrowRight', [1, 0]],
  ['ArrowUp', [0, -1]],
  ['ArrowDown', [0, 1]]
]);

const clamp = value => Math.max(-1, Math.min(1, value));
let frame = 0;
let x = 0;
let y = 0;
let targetX = 0;
let targetY = 0;
let duration = 200;

function moveTo(nextX, nextY, nextDuration) {
  if (nextX === targetX && nextY === targetY && nextDuration === duration) return;
  targetX = nextX;
  targetY = nextY;
  duration = nextDuration;
  cancelAnimationFrame(frame);

  const fromX = x;
  const fromY = y;
  const start = performance.now();

  function animate(now) {
    const progress = Math.min(1, (now - start) / nextDuration);
    const eased = cubicOut(Math.max(0, progress));
    x = fromX + (nextX - fromX) * eased;
    y = fromY + (nextY - fromY) * eased;
    glasses.style.transform = `translate3d(${14 * x}px, ${9 * y}px, 0) rotateX(${-6 * y}deg) rotateY(${8 * x}deg)`;
    frame = progress < 1 ? requestAnimationFrame(animate) : 0;
  }

  frame = requestAnimationFrame(animate);
}

function center() {
  if (desktopMotion.matches) moveTo(0, 0, 680);
}

function updateAvailability() {
  if (desktopMotion.matches) {
    preview.tabIndex = 0;
    preview.setAttribute('aria-describedby', 'keyboard-help');
    return;
  }

  cancelAnimationFrame(frame);
  frame = x = y = targetX = targetY = 0;
  glasses.style.removeProperty('transform');
  preview.removeAttribute('tabindex');
  preview.removeAttribute('aria-describedby');
  if (document.activeElement === preview) preview.blur();
}

preview.addEventListener('pointermove', event => {
  if (!desktopMotion.matches || event.pointerType === 'touch') return;
  const { left, top, width, height } = preview.getBoundingClientRect();
  moveTo(
    clamp(2 * (event.clientX - left) / width - 1),
    clamp(2 * (event.clientY - top) / height - 1),
    200
  );
});

preview.addEventListener('pointerleave', center);
preview.addEventListener('pointercancel', center);
preview.addEventListener('blur', center);
window.addEventListener('blur', center);

preview.addEventListener('keydown', event => {
  if (!desktopMotion.matches || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === 'Escape') {
    center();
    return;
  }

  const direction = directions.get(event.key);
  if (!direction) return;
  event.preventDefault();
  const [dx, dy] = direction;
  moveTo(clamp(targetX + dx * 0.25), clamp(targetY + dy * 0.25), 200);
});

desktopMotion.addEventListener('change', updateAvailability);
updateAvailability();
