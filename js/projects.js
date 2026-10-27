/* ==========================================================================
   Projects — filtering and modal detail view
   ========================================================================== */
(function () {
  const { qs, qsa } = CK;

  const projectData = {
    smartfarm: {
      title: 'Smart Farm Monitoring System', category: 'Full Stack App', icon: 'fa-seedling', image: 'images/icons/smart-farm.png',
      desc: 'A smart agriculture platform that enables farmers to monitor crop and environmental conditions in real time through sensor data, helping improve productivity, reduce waste, and support data-driven farming decisions.',
      tech: ['JavaScript', 'MySQL', 'Laravel', 'Bootstrap', 'Chart.js', 'REST APIs'], repo: '#', demo: 'https://smart-farm-monitorin-system.netlify.app/'
    },
    primenest: {
      title: 'PrimeNest – Real Estate Website', category: 'Full Stack App', icon: 'fa-house', image: 'images/icons/prime-nest.png',
      desc: 'A modern real estate platform that simplifies property discovery by allowing users to browse, search, and explore residential and commercial listings with an intuitive and responsive user experience.',
      tech: ['React', 'Express', 'Node.js', 'Tailwind CSS', 'REST APIs', 'Redux'], repo: '#', demo: 'https://world-bank-project-phi.vercel.app/'
    },
    onlinebank: {
      title: 'Online Banking App', category: 'Full Stack App', icon: 'fa-building-columns', image: 'images/icons/bank.png',
      desc: 'A secure and user-friendly digital banking application that allows users to manage accounts, transfer funds, track transactions, and perform everyday banking operations conveniently from any device.',
      tech: ['Laravel', 'JavaScript', 'MySQL', 'Bootstrap', 'Stripe', 'JWT'], repo: '#', demo: 'https://nexora-banking-app.netlify.app/'
    },
    qrcode: {
      title: 'QR Code Generator', category: 'Tool', icon: 'fa-qrcode', image: 'images/icons/qr-code.png',
      desc: 'A lightweight browser tool that generates downloadable QR codes for links, text, and contact cards without a server round-trip.',
      tech: ['JavaScript', 'Canvas API', 'File Export', 'SVG', 'UI Design', 'Responsive Layout'], repo: '#', demo: 'https://quickmark-qrcode-generator.vercel.app/'
    },
    bgremover: {
      title: 'Background Remover', category: 'Tool', icon: 'fa-wand-magic-sparkles', image: 'images/icons/background-remover.png',
      desc: 'An image utility that isolates subjects from their backgrounds directly in the browser, exporting transparent PNGs.',
      tech: ['JavaScript', 'Canvas API', 'Image Processing', 'PNG Export', 'User Controls', 'Accessibility'], repo: '#', demo: 'https://cutline-background-remover.vercel.app/'
    },
    imgcompress: {
      title: 'Image Compressor', category: 'Tool', icon: 'fa-compress', image: 'images/icons/image-compressor.png',
      desc: 'A drag-and-drop compression tool that shrinks image file size while giving the user a live before/after quality comparison.',
      tech: ['JavaScript', 'Canvas API', 'Compression Algorithms', 'Drag & Drop', 'Preview Mode', 'Progressive UX'], repo: '#', demo: 'https://squish-image-compressor.vercel.app/'
    },
    cybersecurity: {
      title: 'Cybersecurity Intelligence Platform', category: 'Web Application', icon: 'fa-building-columns', image: 'images/icons/cyber-security.png',
      desc: 'An enterprise-style cybersecurity intelligence dashboard that provides threat monitoring, IP intelligence, vulnerability tracking, security analytics, incident management, and global threat visualization using real-time data sources.',
      tech: ['HTML5', 'CSS3', 'Vanilla JavaScript (ES6+)', 'REST APIs', 'Leaflet/OpenStreetMap', 'Chart.js', 'LocalStorage'], repo: '#', demo: 'https://cybersecurity-intelligence-platform.vercel.app/'
    },
    ecommerce: {
      title: 'E-Commerce Website', category: 'Web Application', icon: 'fa-building-columns', image: 'images/icons/e-commerce.png',
      desc: 'A modern, API-driven e-commerce platform featuring dynamic product discovery, advanced search and filtering, product comparison, wishlist, shopping cart, checkout, order tracking, and customer account management.',
      tech: ['HTML5', 'CSS3', 'Vanilla JavaScript (ES6+)', 'REST APIs', 'DummyJSON API', 'LocalStorage'], repo: '#', demo: 'https://luxora-e-cormerce-website.vercel.app/'
    },
    healthcare: {
      title: 'Healthcare Management System', category: 'Web Application', icon: 'fa-building-columns', image: 'images/icons/smart-health.png',
      desc: 'A comprehensive healthcare management platform with dedicated patient, doctor, and administrator experiences, including appointments, health tracking, medical records, prescriptions, healthcare analytics, and public health data visualization.',
      tech: ['HTML5', 'CSS3', 'Vanilla JavaScript (ES6+)', 'REST APIs', 'Public Health APIs/Datasets', 'Chart.js', 'LocalStorage'], repo: '#', demo: 'https://healthcare-management-system-three-mu.vercel.app/'
    },
    weatherapp: {
      title: 'Weather Forecast Platform', category: 'Web Application', icon: 'fa-building-columns', image: 'images/icons/weather-app.png',
      desc: 'An advanced weather intelligence application providing real-time weather conditions, hourly and multi-day forecasts, interactive maps, weather analytics, location intelligence, alerts, city comparison, and dynamic weather visualizations.',
      tech: ['HTML5', 'CSS3', 'Vanilla JavaScript (ES6+)', 'Weather REST API', 'Geolocation API', 'Leaflet/OpenStreetMap', 'Chart.js', 'LocalStorage'], repo: '#', demo: 'https://weather-forecast-website-seven.vercel.app/'
    },
    onlinecalculator: {
      title: 'Ultimate Online Calculator', category: 'Tool', icon: 'fa-compress', image: 'images/icons/online-calculator.png',
      desc: 'A professional, responsive, and SEO-optimized online calculator platform that provides users with a wide range of free calculators for mathematics, finance, education, health & fitness, date/time, everyday tasks, and measurements. The platform is designed for fast browser-based calculations, easy navigation, and long-term expansion with additional calculators and educational guides.',
      tech: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap 5', 'LocalStorage', 'Git & GitHub'], repo: '#', demo: 'https://ultimate-online-calculator.vercel.app/'
    },
  };

  /* ---- Filtering ---- */
  const filterBtns = qsa('.filter-btn');
  const cards = qsa('.project-card');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---- Modal ---- */
  const overlay = qs('#projectModal');
  if (!overlay) return;
  const modal = qs('.modal', overlay);

  const openModal = (key) => {
    const data = projectData[key];
    if (!data) return;
    const media = qs('.modal__media', modal);
    media.innerHTML = data.image
      ? `<img src="${data.image}" alt="${data.title}" />`
      : `<i class="fa-solid ${data.icon}"></i>`;
    qs('.modal__cat', modal).textContent = data.category;
    qs('.modal__title', modal).textContent = data.title;
    qs('.modal__desc', modal).textContent = data.desc;
    const pillsWrap = qs('.modal__tech', modal);
    pillsWrap.innerHTML = data.tech.map((t) => `<span class="tech-pill">${t}</span>`).join('');
    qs('.modal__repo', modal).href = data.repo;
    qs('.modal__demo', modal).href = data.demo;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.project));
    card.addEventListener('keypress', (e) => { if (e.key === 'Enter') openModal(card.dataset.project); });
  });

  qs('.modal__close', overlay)?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
