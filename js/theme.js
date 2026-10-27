/* ==========================================================================
   Theme — dark / light mode
   ========================================================================== */
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'codeking-theme';
  const toggleBtn = document.getElementById('themeToggle');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      toggleBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  };

  const stored = localStorage.getItem(STORAGE_KEY);
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(stored || (systemPrefersLight ? 'light' : 'dark'));

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(current);
      localStorage.setItem(STORAGE_KEY, current);
    });
  }
})();
