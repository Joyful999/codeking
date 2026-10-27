/* ==========================================================================
   Animation — cursor, particles, GSAP reveals, tilt, counters
   ========================================================================== */
(function () {
  const { qs, qsa, prefersReducedMotion, animateCount } = CK;
  const reduced = prefersReducedMotion();

  /* ---- Page loader ---- */
  window.addEventListener('load', () => {
    const loader = qs('.loader');
    if (loader) setTimeout(() => loader.classList.add('is-hidden'), 400);
  });

  /* ---- Scroll progress bar ---- */
  const progressBar = qs('.scroll-progress');
  const updateProgress = () => {
    if (!progressBar) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  };
  document.addEventListener('scroll', updateProgress, { passive: true });

  /* ---- Header scroll state ---- */
  const header = qs('.header');
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---- Back to top ---- */
  const backToTop = qs('.back-to-top');
  document.addEventListener('scroll', () => {
    if (!backToTop) return;
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

  /* ---- Custom cursor ---- */
  if (!reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = qs('.cursor-dot');
    const glow = qs('.cursor-glow');
    let mx = 0, my = 0, gx = 0, gy = 0;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
    });
    const loop = () => {
      gx += (mx - gx) * 0.15;
      gy += (my - gy) * 0.15;
      if (glow) { glow.style.left = gx + 'px'; glow.style.top = gy + 'px'; }
      requestAnimationFrame(loop);
    };
    loop();
    qsa('a, button, .tilt-card, input, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => glow && glow.classList.add('is-active'));
      el.addEventListener('mouseleave', () => glow && glow.classList.remove('is-active'));
    });
  }

  /* ---- Hero mouse-follow glow ---- */
  const heroGlow = qs('.mouse-glow');
  const heroSection = qs('.hero');
  if (heroGlow && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      heroGlow.style.left = (e.clientX - rect.left) + 'px';
      heroGlow.style.top = (e.clientY - rect.top) + 'px';
    });
  }

  /* ---- Particles generation ---- */
  const particleField = qs('.particles');
  if (particleField) {
    const count = window.innerWidth < 700 ? 12 : 26;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * 6) + 's';
      p.style.animationDuration = (5 + Math.random() * 5) + 's';
      p.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
      particleField.appendChild(p);
    }
  }

  /* ---- Scroll reveal (GSAP ScrollTrigger if present, else IntersectionObserver) ---- */
  const revealEls = qsa('.reveal');
  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    revealEls.forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---- Animated counters ---- */
  const statEls = qsa('[data-count]');
  if (statEls.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target, parseInt(entry.target.dataset.count, 10));
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach((el) => io2.observe(el));
  }

  /* ---- Vanilla Tilt ---- */
  if (window.VanillaTilt) {
    VanillaTilt.init(qsa('.tilt-card'), { max: 8, speed: 400, glare: true, 'max-glare': 0.15, scale: 1.02 });
  }

  /* ---- Typed.js hero role ---- */
  const typedTarget = qs('#typedRole');
  if (typedTarget) {
    if (window.Typed && !reduced) {
      new Typed('#typedRole', {
        strings: ['Full Stack Software Engineer', 'Laravel Developer', 'JavaScript Expert', 'Problem Solver', 'Software Consultant', 'Turning Ideas Into Reality'],
        typeSpeed: 45, backSpeed: 25, backDelay: 1400, loop: true, smartBackspace: true
      });
    } else {
      typedTarget.textContent = 'Full Stack Software Engineer';
    }
  }

  /* ---- Magnetic buttons ---- */
  if (!reduced) {
    qsa('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---- Ripple buttons ---- */
  qsa('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-fx';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---- Marquee duplication for seamless loop ---- */
  const track = qs('.marquee__track');
  if (track) track.innerHTML += track.innerHTML;

  /* ---- Swiper testimonials fallback (manual slider) ---- */
  const slides = qs('.testimonial-slides');
  const dotsWrap = qs('.testimonial-dots');
  if (slides) {
    const total = qsa('.testimonial-slide', slides).length;
    let index = 0;
    const goTo = (i) => {
      index = (i + total) % total;
      slides.style.transform = `translateX(-${index * 100}%)`;
      qsa('.dot', dotsWrap).forEach((d, di) => d.classList.toggle('is-active', di === index));
    };
    if (dotsWrap) {
      qsa('.dot', dotsWrap).forEach((d, di) => d.addEventListener('click', () => goTo(di)));
    }
    let auto = setInterval(() => goTo(index + 1), 5500);
    slides.closest('.testimonial-track').addEventListener('mouseenter', () => clearInterval(auto));
    slides.closest('.testimonial-track').addEventListener('mouseleave', () => { auto = setInterval(() => goTo(index + 1), 5500); });
  }
})();
