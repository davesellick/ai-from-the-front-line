/* deck-epic.js: runs the option picked with ?epic=a|b|c|d. Without it this does nothing. */
(() => {
  const epic = (new URLSearchParams(location.search).get('epic') || '').toLowerCase();
  if (!['a', 'b', 'c', 'd'].includes(epic)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.dataset.epic = epic;
  const stage = document.querySelector('deck-stage');
  const slides = [...stage.children].filter((el) => el.tagName === 'SECTION');
  const GREEN = '#D0F8B0', PERI = '#A8B0F8', BRAND = '#4A56B8';

  const once = (el, ms) => setTimeout(() => el.remove(), ms);
  const add = (slide, cls, css, ms) => {
    const el = document.createElement('i');
    el.className = cls;
    if (css) Object.assign(el.style, css);
    slide.appendChild(el);
    once(el, ms);
    return el;
  };
  const flash = (s) => add(s, 'e-flash', null, 260);
  const ring = (s, x, y, c, delay = 0) => {
    const el = add(s, 'e-ring', { left: x + 'px', top: y + 'px', animationDelay: delay + 'ms' }, 1800 + delay);
    el.style.setProperty('--e-c', c);
  };
  const beam = (s, hot) => add(s, hot ? 'e-beam hot' : 'e-beam', null, 1400);
  const shake = (s, small) => {
    const c = small ? 'e-shake-s' : 'e-shake';
    const f = s.querySelector('.frame') || s;
    const targets = [f, ...s.querySelectorAll('.nx-appwin, .nx-stack')];
    targets.forEach((t) => { t.classList.remove(c); void t.offsetWidth; t.classList.add(c); setTimeout(() => t.classList.remove(c), 560); });
  };

  /* Split headlines into letters for option D */
  if (epic === 'd') {
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const split = (root) => {
      let i = 0;
      const walk = (node) => {
        [...node.childNodes].forEach((n) => {
          if (n.nodeType === 1) { if (n.tagName !== 'BR') walk(n); return; }
          if (n.nodeType !== 3 || !n.textContent.trim()) return;
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((word) => {
            if (!word) return;
            if (!word.trim()) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'e-w';
            [...word].forEach((ch) => {
              const c = document.createElement('span');
              c.className = 'e-c';
              c.textContent = ch;
              c.style.setProperty('--i', i++);
              c.style.setProperty('--x', Math.round((rnd() - .5) * 1500) + 'px');
              c.style.setProperty('--y', Math.round((rnd() - .5) * 900) + 'px');
              c.style.setProperty('--r', Math.round((rnd() - .5) * 200) + 'deg');
              w.appendChild(c);
            });
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        });
      };
      walk(root);
    };
    /* Inline-block letters lose the font's kerning, so each letter keeps its natural advance. */
    const keepKerning = (h) => {
      const k = (h.closest('section').getBoundingClientRect().width / 1920) || 1;
      const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
      const nat = new Map();
      for (let t = walker.nextNode(); t; t = walker.nextNode()) {
        const r = document.createRange();
        const lefts = [];
        for (let a = 0; a <= t.length; a++) {
          r.setStart(t, Math.min(a, t.length - 1)); r.setEnd(t, Math.min(a + 1, t.length));
          const b = r.getBoundingClientRect();
          lefts.push(a === t.length ? b.right : b.left);
        }
        nat.set(t, lefts);
      }
      return { k, nat };
    };
    const fix = (h, widths) => {
      h.querySelectorAll('.e-c').forEach((c, n) => {
        const w = c.getBoundingClientRect().width / widths.k;
        const adv = widths.flat[n];
        if (adv) c.style.marginRight = (adv - w).toFixed(2) + 'px';
      });
    };
    document.fonts.ready.then(() => slides.forEach((s) => s.querySelectorAll('h1.display, h2.display').forEach((h) => {
      const m = keepKerning(h);
      const flat = [];
      m.nat.forEach((lefts, t) => {
        const text = t.textContent;
        for (let a = 0; a < text.length; a++) if (text[a].trim()) flat.push((lefts[a + 1] - lefts[a]) / m.k);
      });
      split(h);
      fix(h, { k: m.k, flat });
    })));
  }

  /* Option C: light runs round the main card on every slide */
  if (epic === 'c') {
    slides.forEach((s) => s.querySelectorAll('[data-card], .nx-appwin, .nx-tile, .press-card, .cover-prompt').forEach((el) => el.classList.add('e-runner')));
  }

  /* Beats, by slide label */
  const label = (s) => s.dataset.label;
  const entry = (s) => {
    const l = label(s);
    if (epic === 'a') {
      if (l === 'Cover') setTimeout(() => { shake(s); ring(s, 640, 470, BRAND); ring(s, 640, 470, PERI, 180); }, 1320);
      else if (s.classList.contains('ink') && !s.querySelector('.nx-stack')) setTimeout(() => shake(s, true), 240);
    }
    if (epic === 'c') {
      setTimeout(() => beam(s, s.classList.contains('ink')), l === 'Cover' ? 1300 : 300);
      if (l === 'Cover') setTimeout(() => ring(s, 640, 470, PERI), 1300);
    }
  };
  const step = (s, n, prev) => {
    if (n <= prev) return;
    const l = label(s);
    if (epic === 'a') {
      if (l === "It's a lie") { shake(s); if (n === 2) { flash(s); ring(s, 960, 540, GREEN); ring(s, 960, 540, PERI, 160); } }
      else if (l === 'What does it mean' && n === 1) shake(s);
      else if (l === 'Soundcheck' && n === 2) { shake(s); ring(s, 960, 700, GREEN); }
      else if (l === "Let's go" && n === 9) { shake(s); ring(s, 960, 980, GREEN); }
      else if (['AI native everywhere', 'No funding', "Let's go", 'Trust, but measure', 'The stack'].includes(l)) shake(s, true);
    }
    if (epic === 'b') {
      if (l === "It's a lie" && n === 2) setTimeout(() => { shake(s); ring(s, 960, 540, GREEN); ring(s, 960, 540, PERI, 150); }, 300);
    }
    if (epic === 'c') {
      if (l === "It's a lie") { beam(s, true); if (n === 2) { ring(s, 960, 540, GREEN); ring(s, 960, 540, PERI, 200); } }
      else if (l === "Let's go" && n === 9) { beam(s); ring(s, 960, 980, GREEN); }
      else if (l === 'Soundcheck' && n === 2) ring(s, 960, 700, GREEN);
    }
    if (epic === 'd') {
      if (l === "It's a lie" && n === 2) ring(s, 960, 540, GREEN);
    }
  };

  const seen = new WeakMap();
  slides.forEach((s) => {
    seen.set(s, Number(s.dataset.stepNow || 0));
    new MutationObserver(() => {
      const n = Number(s.dataset.stepNow || 0);
      const prev = seen.get(s) || 0;
      seen.set(s, n);
      if (s.hasAttribute('data-deck-active')) step(s, n, prev);
    }).observe(s, { attributes: true, attributeFilter: ['data-step-now'] });
  });
  stage.addEventListener('slidechange', (e) => { if (e.detail.slide) entry(e.detail.slide); });
  const first = slides[stage.index];
  if (first) entry(first);
})();
