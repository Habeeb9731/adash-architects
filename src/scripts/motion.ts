// Scroll and load motion for the whole site. Everything here is progressive:
// without JavaScript, or with reduced motion requested, content simply shows.
//
//   data-reveal       fades and lifts in when scrolled into view
//   data-split        splits text into words that rise from behind a mask
//   data-stagger      children fade in one after another
//   data-img-reveal   photo frame wipes open upward while the photo settles
//   data-hero-in      hero content that arrives in sequence on load (--d sets the delay)
//   data-parallax     photo layer that drifts slower than the page ("hero" or a number)

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

// Split text nodes into word spans, leaving child elements such as <br> in place.
function split(el: HTMLElement) {
  let i = 0;
  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { frag.append(' '); continue; }
          const outer = document.createElement('span');
          outer.className = 'w';
          const inner = document.createElement('span');
          inner.textContent = part;
          inner.style.setProperty('--i', String(i++));
          outer.append(inner);
          frag.append(outer);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as Element).hasAttribute('aria-hidden')) {
        walk(child);
      }
    }
  };
  walk(el);
  el.classList.add('is-split');
}

const watched = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split], [data-stagger], [data-img-reveal]');

if (reduced) {
  watched.forEach((el) => el.classList.add('is-in'));
  root.classList.add('is-loaded');
} else {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach(split);
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((list) => {
    [...list.children].forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
  });

  // After a photo has revealed, hand its transform back to the hover zoom.
  document.querySelectorAll<HTMLElement>('[data-img-reveal]').forEach((frame) => {
    frame.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'clip-path') frame.classList.add('revealed');
    });
  });

  if ('IntersectionObserver' in window) {
    // A fully clipped photo frame never counts as intersecting, so photo frames are
    // triggered by their (unclipped) parent instead of by themselves.
    const targets = new Map<Element, HTMLElement[]>();
    watched.forEach((el) => {
      const trigger = el.hasAttribute('data-img-reveal') ? el.parentElement! : el;
      targets.set(trigger, [...(targets.get(trigger) ?? []), el]);
    });
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          targets.get(entry.target)?.forEach((el) => el.classList.add('is-in'));
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    targets.forEach((_, trigger) => io.observe(trigger));
  } else {
    watched.forEach((el) => el.classList.add('is-in'));
  }

  // Lift the curtain and start the hero sequence once the hero photo is decoded,
  // so the page never opens on a half-loaded image. Never wait more than 1.2s.
  const heroImg = document.querySelector<HTMLImageElement>('[data-hero-photo] img');
  const ready = heroImg ? heroImg.decode().catch(() => {}) : Promise.resolve();
  Promise.race([ready, new Promise((r) => setTimeout(r, 1200))]).then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));
  });

  // Page transitions: cover the page with the curtain, then navigate.
  const LEAVE_MS = 650;
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element).closest?.('a');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    // Same page (including #anchors): let the browser scroll normally.
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    root.classList.add('is-leaving');
    setTimeout(() => { location.href = url.href; }, LEAVE_MS);
  });

  // Coming back via the back button restores the page from cache with the curtain down.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) root.classList.remove('is-leaving');
  });

  // Parallax: one rAF loop, only while something is on screen.
  const layers = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const layer of layers) {
      const box = layer.parentElement!.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) continue;
      const mode = layer.dataset.parallax!;
      // The hero drifts down as it scrolls away; other photos move around their centre.
      const y = mode === 'hero'
        ? Math.max(0, -box.top) * 0.28
        : (box.top + box.height / 2 - vh / 2) * -Number(mode || 0.1);
      layer.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
  };

  // Nav pill hides while scrolling down and returns on the way back up.
  const header = document.querySelector<HTMLElement>('[data-header]');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) {
      const menuOpen = header.querySelector('[aria-expanded="true"]');
      header.classList.toggle('is-hidden', !menuOpen && y > 160 && y > lastY + 2);
      if (y < lastY - 2 || y <= 160) header.classList.remove('is-hidden');
    }
    lastY = y;
    if (layers.length && !ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}
