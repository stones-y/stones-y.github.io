/* ══════════════════════════════════════
   STARFIELD
══════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  let W, H, stars = [];
  const COUNT = 140;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkStar() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.1 + 0.2,
      vx:    (Math.random() - 0.5) * 0.035,
      vy:    (Math.random() - 0.5) * 0.018,
      alpha: Math.random(),
      dAlpha:(Math.random() * 0.003 + 0.0005) * (Math.random() < 0.5 ? 1 : -1),
      hue:   Math.random() < 0.3 ? 45 : 220,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: COUNT }, mkStar);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const s of stars) {
      // Only drift on non-mobile
      if (!isMobile) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;
      }
      s.alpha += s.dAlpha;
      if (s.alpha > 0.85 || s.alpha < 0.05) s.dAlpha *= -1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue}, 40%, 85%, ${s.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;

  // Reinitialise stars on resize/orientation change so they
  // fill the new dimensions rather than clustering in a corner
  function onResize() {
    resize();
    stars = Array.from({ length: COUNT }, mkStar);
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', function () {
    // Small delay lets the browser finish rotating before we read dimensions
    setTimeout(onResize, 200);
  });

  // Wait for full load before sizing the canvas — fixes mobile Safari
  // reading wrong dimensions if the canvas is sized too early
  window.addEventListener('load', function () {
    init();
    draw();
  });
})();

/* ══════════════════════════════════════
   PROGRESS BARS — animate in on load
══════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', function () {
  requestAnimationFrame(function () {
    document.querySelectorAll('.progress-fill').forEach(function (el) {
      const pct = el.style.getPropertyValue('--pct');
      el.style.setProperty('--pct', '0%');
      setTimeout(function () {
        el.style.setProperty('--pct', pct);
      }, 300);
    });
  });
});

/* ══════════════════════════════════════
   NAV PILLS — tab switching
══════════════════════════════════════ */
document.querySelectorAll('.nav-pill').forEach(function (pill) {
  pill.addEventListener('click', function (e) {
    e.preventDefault();

    // Update active pill
    document.querySelectorAll('.nav-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    // Show matching section, hide all others
    const target = pill.getAttribute('href').replace('#', '');
    document.querySelectorAll('.content-section').forEach(function (section) {
      section.classList.toggle('active', section.id === target);
    });

    // Scroll to top so the section header is always visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});