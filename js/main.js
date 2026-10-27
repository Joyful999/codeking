/* ==========================================================================
   Main — navigation, tabs, small interactions
   ========================================================================== */
(function () {
  const { qs, qsa } = CK;

  /* ---- Mobile nav toggle ---- */
  const navToggle = qs('.nav-toggle');
  const nav = qs('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    qsa('.nav__link', nav).forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
    }));
  }

  /* ---- Active nav link by current page ---- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  qsa('.nav__link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) link.classList.add('is-active');
  });

  /* ---- About tabs ---- */
  const tabBtns = qsa('.tab-btn');
  if (tabBtns.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('is-active'));
        qsa('.tab-panel').forEach((p) => p.classList.remove('is-active'));
        btn.classList.add('is-active');
        qs('#' + btn.dataset.tab)?.classList.add('is-active');
      });
    });
  }

  /* ---- Footer year ---- */
  const yearEl = qs('#currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Newsletter form (front-end only) ---- */
  const newsletter = qs('.newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = qs('input', newsletter);
      if (input && input.value) {
        input.value = '';
        input.placeholder = 'Subscribed! Thank you.';
      }
    });
  }
})();
