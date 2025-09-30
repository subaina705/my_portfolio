// Smooth scroll + active link switching + mobile menu + basic form validate + year + filters
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scrolling
  const scrollLinks = document.querySelectorAll('.scrollto');
  const header = document.querySelector('.site-header');
  const headerOffset = () => (header ? header.offsetHeight + 8 : 60);

  function smoothTo(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top, behavior: 'smooth' });
  }

  scrollLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothTo(href);
        // close mobile menu
        const mobile = document.getElementById('mobileMenu');
        if (mobile && !mobile.hasAttribute('hidden')) {
          mobile.toggleAttribute('hidden', true);
        }
      }
    });
  });

  // Active link on scroll
  const sections = ['#home', '#about', '#skills', '#projects', '#contact'].map((s) => document.querySelector(s));
  const navLinks = document.querySelectorAll('a.nav-link');

  function setActive(hash) {
    navLinks.forEach((l) => l.classList.remove('active'));
    const active = document.querySelector(`a.nav-link[href="${hash}"]`);
    if (active) active.classList.add('active');
  }

  let lastActive = '#home';
  function onScroll() {
    const y = window.scrollY + headerOffset() + 20;
    for (const sec of sections) {
      if (!sec) continue;
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (y >= top && y < bottom) {
        const id = `#${sec.id}`;
        if (id !== lastActive) {
          setActive(id);
          lastActive = id;
        }
        break;
      }
    }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const hidden = mobileMenu.hasAttribute('hidden');
      mobileMenu.toggleAttribute('hidden', !hidden);
    });
  }

  // Bootstrap form validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        alert('Thanks! This demo form isn’t wired to a backend yet.');
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Project filters
  const filterButtons = document.querySelectorAll('.filters .btn');
  const grid = document.getElementById('projectGrid');
  if (filterButtons.length && grid) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.filter;
        const cards = grid.querySelectorAll('.project-card');
        cards.forEach((card) => {
          const match = type === 'all' || card.dataset.type === type;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  // Animate skill bars on first view
  const bars = document.querySelectorAll('.skill-line .bar i');
  let barsAnimated = false;
  function animateBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection || barsAnimated) return;
    const rect = skillsSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 100;
    if (inView) {
      bars.forEach((i) => {
        const w = i.style.width;
        i.style.width = '0';
        setTimeout(() => (i.style.width = w), 100);
      });
      barsAnimated = true;
    }
  }
  window.addEventListener('scroll', animateBars, { passive: true });
  window.addEventListener('load', animateBars);
})();
