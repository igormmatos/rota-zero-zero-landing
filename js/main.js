(() => {
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('#menu-mobile');

  if (menuButton && mobileNav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
      mobileNav.hidden = true;
    };

    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      if (open) {
        closeMenu();
      } else {
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', 'Fechar menu');
        mobileNav.hidden = false;
      }
    });

    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const reveals = [...document.querySelectorAll('.reveal')];
  const canAnimate = 'IntersectionObserver' in window
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canAnimate) {
    reveals.forEach((el) => el.classList.add('will-animate'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

    reveals.forEach((el) => observer.observe(el));
  }
})();
