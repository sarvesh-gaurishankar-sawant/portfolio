/* ==========================================================================
   Portfolio — Main JavaScript
   Scroll reveal, navigation, mobile menu
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Scroll Reveal (IntersectionObserver) --- */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    reveals.forEach(el => el.classList.add('revealed'));
  }

  /* --- Navigation: scroll background --- */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* --- Navigation: active section highlighting --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    let currentSection = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* --- Mobile Menu --- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function openMenu() {
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

});