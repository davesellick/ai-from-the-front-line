/* deck-steps.js: one build step per click, on top of the shared deck-stage.js.
 *
 * In a slide:
 *   data-step="n"       shown from step n onwards (gets the class "on")
 *   data-step-off="n"   gone again from step n (gets the class "off")
 *   data-count="19352"  counts up from 0 when it comes on
 *   data-tick           adds 1 (or data-tick-by) every 1.5s while it is on
 *   data-type="text"    types itself out when the slide opens (data-type-delay in ms)
 *   data-no-advance     clicks inside this element do not move the deck
 *
 * Next (arrow, space, click) reveals the next step, then moves to the next slide.
 * Back hides the last step, then returns to the previous slide fully built.
 * URL: ?steps=all opens every slide finished; ?step=N opens the slide at step N.
 */
(() => {
  const stage = document.querySelector('deck-stage');
  if (!stage) return;
  const params = new URLSearchParams(location.search);
  const allSteps = params.get('steps') === 'all';
  if (allSteps) document.documentElement.classList.add('nx-final');
  const startStep = params.has('step') ? Number(params.get('step')) : null;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NEXT = new Set(['ArrowRight', 'PageDown', ' ', 'Spacebar']);
  const BACK = new Set(['ArrowLeft', 'PageUp']);
  const fmt = (n) => n.toLocaleString('en-GB');
  const timers = new Set();
  let driven = false; /* true once the presenter has moved: a reload is not coming back */

  const slides = () => [...stage.children].filter((el) => el.tagName === 'SECTION');
  const active = () => slides()[stage.index];
  const lastStep = (slide) =>
    Math.max(0, ...[...slide.querySelectorAll('[data-step]')].map((el) => Math.max(Number(el.dataset.step), Number(el.dataset.stepOff || 0))));
  const nowStep = (slide) => Number(slide.dataset.stepNow || 0);

  function countUp(el, animate) {
    const target = Number(el.dataset.count);
    if (!animate || reduced) { el.textContent = fmt(target); return; }
    const t0 = performance.now();
    const ms = 1400;
    const frame = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  function setStep(slide, n, animate = true) {
    slide.dataset.stepNow = n;
    slide.querySelectorAll('[data-step]').forEach((el) => {
      const wasOn = el.classList.contains('on');
      const on = Number(el.dataset.step) <= n;
      el.classList.toggle('on', on);
      if (el.dataset.stepOff) el.classList.toggle('off', n >= Number(el.dataset.stepOff));
      if (el.dataset.count && on && !wasOn) countUp(el, animate);
      if (el.dataset.count && !on) el.textContent = '0';
    });
    slide.querySelectorAll('[data-step] [data-count]').forEach((el) => {
      const on = el.closest('[data-step]').classList.contains('on');
      if (on && el.dataset.done !== '1') { el.dataset.done = '1'; countUp(el, animate); }
      if (!on) { el.dataset.done = ''; el.textContent = '0'; }
    });
  }

  function clearTimers() { timers.forEach(clearInterval); timers.clear(); }

  function startLive(slide) {
    clearTimers();
    slide.querySelectorAll('[data-type]').forEach((el) => {
      const text = el.dataset.type;
      if (allSteps || reduced) { el.textContent = text; return; }
      el.textContent = '';
      let i = 0;
      const wait = setTimeout(() => {
        const id = setInterval(() => {
          el.textContent = text.slice(0, ++i);
          if (i >= text.length) { clearInterval(id); timers.delete(id); }
        }, 42);
        timers.add(id);
      }, Number(el.dataset.typeDelay || 700));
      timers.add(wait);
    });
    slide.querySelectorAll('[data-tick]').forEach((el) => {
      const by = Number(el.dataset.tickBy || 1);
      el.textContent = fmt(by);
      if (reduced) return;
      const id = setInterval(() => {
        const host = el.closest('[data-step]');
        if (!host || host.classList.contains('on')) el.textContent = fmt(Number(el.textContent.replace(/,/g, '')) + by);
      }, 1500);
      timers.add(id);
    });
  }

  function forward() {
    driven = true;
    const slide = active();
    if (nowStep(slide) < lastStep(slide)) setStep(slide, nowStep(slide) + 1);
    else stage.goTo(stage.index + 1);
  }
  function back() {
    driven = true;
    const slide = active();
    if (nowStep(slide) > 0) setStep(slide, nowStep(slide) - 1);
    else stage.goTo(stage.index - 1);
  }

  window.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (NEXT.has(e.key)) { e.preventDefault(); e.stopImmediatePropagation(); forward(); }
    else if (BACK.has(e.key)) { e.preventDefault(); e.stopImmediatePropagation(); back(); }
  }, true);

  window.addEventListener('click', (e) => {
    const path = e.composedPath();
    const hit = (fn) => path.some((n) => n.nodeType === 1 && fn(n));
    if (hit((n) => n.matches('a, button, input, textarea, select, [data-no-advance], #notes-panel, .overlay'))) return;
    e.stopPropagation();
    e.preventDefault();
    if (hit((n) => n.classList.contains('tapzone--back'))) back(); else forward();
  }, true);

  stage.addEventListener('slidechange', (e) => {
    const { slide, index, previousIndex } = e.detail;
    if (!slide) return;
    const cameBack = driven && previousIndex > index;
    let n = 0;
    if (allSteps || cameBack) n = lastStep(slide);
    else if (startStep !== null && !driven) n = startStep;
    setStep(slide, n, false);
    startLive(slide);
  });

  /* The first slidechange can fire before this script runs. */
  const finishAll = () => slides().forEach((s) => setStep(s, lastStep(s), false));
  window.addEventListener('beforeprint', finishAll);
  const first = active();
  if (first) {
    const n = allSteps ? lastStep(first) : startStep ?? 0;
    setStep(first, n, false);
    startLive(first);
  }
})();
