// A living map of my skills: drifting nodes joined by what I actually used together.
(() => {
  const hero = document.getElementById('top');
  const cv = document.getElementById('graph');
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = [
    ['Python', .46, .13], ['Machine Learning', .62, .27], ['TensorFlow', .76, .10], ['Scikit-learn', .92, .12],
    ['OpenCV', .56, .90], ['FastAPI', .38, .82], ['REST APIs', .70, .86], ['Neo4j', .84, .92],
    ['PostgreSQL', .24, .92], ['React', .95, .84], ['LLM evaluation', .54, .58], ['Vector search', .50, .74],
    ['Docker (learning)', .10, .90]
  ];
  const E = [[0,1],[0,5],[1,2],[2,3],[1,3],[1,4],[1,10],[10,11],[5,11],[5,6],[5,7],[5,8],[6,9],[5,12],[4,5]];
  let w, h, dpr, hot = -1, raf, visible = true;
  const pos = [];

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    N.forEach((n, i) => {
      pos[i] = [n[1] * w + Math.sin(t / 2600 + i * 1.7) * 11, n[2] * h + Math.cos(t / 3100 + i * 2.3) * 9];
    });
    const near = new Set();
    if (hot > -1) E.forEach(([a, b]) => { if (a === hot) near.add(b); if (b === hot) near.add(a); });
    E.forEach(([a, b]) => {
      const lit = hot > -1 && (a === hot || b === hot);
      ctx.strokeStyle = 'rgba(180,199,168,' + (lit ? .85 : hot > -1 ? .08 : .2) + ')';
      ctx.lineWidth = lit ? 1.6 : 1;
      ctx.beginPath(); ctx.moveTo(...pos[a]); ctx.lineTo(...pos[b]); ctx.stroke();
    });
    ctx.font = (w < 600 ? 11 : 13) + 'px system-ui, sans-serif';
    N.forEach((n, i) => {
      const on = i === hot || near.has(i);
      const a = hot > -1 ? (on ? 1 : .22) : .75;
      ctx.fillStyle = 'rgba(180,199,168,' + a + ')';
      ctx.beginPath(); ctx.arc(pos[i][0], pos[i][1], i === hot ? 6 : i === 12 ? 5 : 4, 0, 6.283); ctx.fill();
      ctx.fillText(n[0], pos[i][0] + 10, pos[i][1] + 4);
    });
  }

  function loop(t) { draw(t); if (visible) raf = requestAnimationFrame(loop); }

  hero.addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    let best = -1, d = 48;
    pos.forEach((p, i) => { const k = Math.hypot(p[0] - x, p[1] - y); if (k < d) { d = k; best = i; } });
    if (best !== hot) { hot = best; if (reduce) draw(0); }
  });
  hero.addEventListener('pointerleave', () => { hot = -1; if (reduce) draw(0); });
  addEventListener('resize', () => { size(); if (reduce) draw(0); });

  size();
  if (reduce) { draw(0); return; }
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) raf = requestAnimationFrame(loop); else cancelAnimationFrame(raf);
  }).observe(hero);
})();
