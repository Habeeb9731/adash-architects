// Shared behaviour for every [data-carousel] on a page.
document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('[data-track]')!;
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-next]')!;
  const controls = root.querySelector<HTMLElement>('[data-controls]');
  const segments = root.querySelectorAll<HTMLElement>('[data-segment]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const step = () => {
    const slide = track.querySelector<HTMLElement>('[data-slide]');
    if (!slide) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return slide.offsetWidth + gap;
  };
  const move = (direction: number) => {
    track.scrollBy({ left: direction * step(), behavior: reduced.matches ? 'auto' : 'smooth' });
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev.setAttribute('aria-disabled', String(track.scrollLeft <= 2));
    next.setAttribute('aria-disabled', String(track.scrollLeft >= max - 2));
    // Controls are pointless when every card already fits, such as on very wide screens.
    if (controls) controls.hidden = max <= 2;
    if (track.dataset.focusable !== undefined) {
      if (max > 2) track.setAttribute('tabindex', '0');
      else track.removeAttribute('tabindex');
    }
    const active = max > 2 ? Math.round((track.scrollLeft / max) * (segments.length - 1)) : 0;
    segments.forEach((segment, i) => segment.toggleAttribute('data-active', i === active));
  };

  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  // Left and right arrows move one card while focus is anywhere in the carousel.
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
  });

  let frame = 0;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
});
