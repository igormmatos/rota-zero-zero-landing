(() => {
  const IDV = {
    brandReduced: 'assets/brand/rota-zero-zero-reduzida.svg',
    brandReverse: 'assets/brand/rota-zero-zero-reversa-transparente.svg',
    arrowNext: 'assets/idv/arrow-next-right.svg',
    compassCover: 'assets/idv/icon-compass-cover.svg',
    nodeTerra: 'assets/idv/node-highlight-terra.svg'
  };

  const injectIdvOverrides = () => {
    const style = document.createElement('style');
    style.dataset.idvAlignment = 'v1';
    style.textContent = `
      .trail-flow { stroke-dasharray: none !important; animation: none !important; }
      .node-halo { animation: none !important; }
      .brand-compact { width: auto !important; height: 2.5rem !important; }
      .footer-logo { width: auto !important; height: 2.75rem !important; background: transparent !important; padding: 0 !important; }
      .button-green .cta-arrow { width: 1rem; height: 1rem; flex: 0 0 auto; }
    `;
    document.head.appendChild(style);
  };

  const alignBrandAssets = () => {
    const compactBrand = document.querySelector('.brand-compact');
    if (compactBrand) {
      compactBrand.src = IDV.brandReduced;
      compactBrand.alt = 'R00 — ROTA ZERO ZERO';
      compactBrand.removeAttribute('width');
      compactBrand.removeAttribute('height');
    }

    const footerBrand = document.querySelector('.footer-logo');
    if (footerBrand) {
      footerBrand.src = IDV.brandReverse;
      footerBrand.removeAttribute('style');
      footerBrand.removeAttribute('width');
      footerBrand.removeAttribute('height');
    }
  };

  const alignCtaArrows = () => {
    document.querySelectorAll('.button-green span[aria-hidden="true"]').forEach((arrow) => {
      if (arrow.textContent.trim() !== '→') return;
      const img = document.createElement('img');
      img.src = IDV.arrowNext;
      img.alt = '';
      img.className = 'cta-arrow';
      img.setAttribute('aria-hidden', 'true');
      arrow.replaceWith(img);
    });
  };

  const createSvgImage = (href, x, y, width, height, className) => {
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttribute('href', href);
    image.setAttribute('x', String(x));
    image.setAttribute('y', String(y));
    image.setAttribute('width', String(width));
    image.setAttribute('height', String(height));
    image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    image.setAttribute('aria-hidden', 'true');
    if (className) image.setAttribute('class', className);
    return image;
  };

  const alignHeroIllustration = () => {
    const heroSvg = document.querySelector('.trail-svg');
    if (!heroSvg) return;

    const pausePath = [...heroSvg.querySelectorAll('path')].find((path) => path.getAttribute('stroke') === '#83CDBB');
    if (pausePath) {
      pausePath.setAttribute('stroke', '#2FA88C');
      pausePath.setAttribute('stroke-opacity', '0.6');
      pausePath.setAttribute('stroke-dasharray', '5 6');
    }

    const compass = [...heroSvg.querySelectorAll('g')].find((group) => group.getAttribute('transform') === 'translate(88 92)');
    if (compass) {
      compass.replaceWith(createSvgImage(IDV.compassCover, 42, 46, 92, 92, 'idv-compass'));
    }

    const decisionCircle = [...heroSvg.querySelectorAll('circle')].find((circle) => circle.getAttribute('cx') === '350' && circle.getAttribute('cy') === '200' && circle.getAttribute('fill') === '#D97757');
    if (decisionCircle) decisionCircle.setAttribute('opacity', '0');

    const halo = heroSvg.querySelector('.node-halo');
    if (halo) halo.setAttribute('display', 'none');

    if (!heroSvg.querySelector('.idv-node-terra')) {
      heroSvg.appendChild(createSvgImage(IDV.nodeTerra, 324, 174, 52, 52, 'idv-node-terra'));
    }
  };

  injectIdvOverrides();
  alignBrandAssets();
  alignCtaArrows();
  alignHeroIllustration();

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
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
})();