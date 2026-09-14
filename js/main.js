(() => {
  const IDV = {
    brandReduced: 'assets/brand/rota-zero-zero-reduzida.svg',
    brandReverse: 'assets/brand/rota-zero-zero-reversa-transparente.svg',
    roadmapSignature: 'assets/brand/product-roadmap-horizontal-warmwhite.svg',
    arrowNext: 'assets/idv/arrow-next-right.svg',
    compassCover: 'assets/idv/icon-compass-cover.svg',
    nodeTerra: 'assets/idv/node-highlight-terra.svg',
    pathAscending: 'assets/idv/path-main-ascending.svg',
    pathPause: 'assets/idv/path-branch-pause.svg',
    pathThreeWay: 'assets/idv/path-branch-three-way.svg',
    iconObserve: 'assets/idv/icon-observe.svg',
    iconBuild: 'assets/idv/icon-build.svg',
    iconCheck: 'assets/idv/icon-check-circle.svg',
    iconRoute: 'assets/idv/icon-route.svg',
    iconFamily: 'assets/idv/icon-family.svg'
  };

  const injectIdvOverrides = () => {
    const style = document.createElement('style');
    style.dataset.idvAlignment = 'v2';
    style.textContent = `
      .trail-flow { stroke-dasharray: none !important; animation: none !important; }
      .node-halo { animation: none !important; }
      .brand-compact { width: auto !important; height: 2.5rem !important; }
      .footer-logo { width: auto !important; height: 2.75rem !important; background: transparent !important; padding: 0 !important; }
      .button-green .cta-arrow { width: 1rem; height: 1rem; flex: 0 0 auto; }
      .idv-step-icon { width: 1.3rem; height: 1.3rem; margin: 1rem 0 .65rem; opacity: .82; }
      .idv-audience-icon { width: 2rem; height: 2rem; margin-bottom: 1.15rem; opacity: .82; }
      .roadmap-product-signature { width: min(100%, 24rem); height: auto; margin: 0 0 1.6rem; }
      .roadmap-list .idv-list-icon { width: 1.05rem; height: 1.05rem; flex: 0 0 auto; filter: invert(72%) sepia(18%) saturate(1040%) hue-rotate(114deg) brightness(86%) contrast(87%); }
      .roadmap-list li { display: flex; align-items: center; gap: .65rem; }
      .trail-card .trail-svg text { font-family: Inter, Arial, sans-serif; }
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

  const alignHeroIllustration = () => {
    const heroSvg = document.querySelector('.trail-svg');
    if (!heroSvg) return;

    heroSvg.innerHTML = `
      <image href="${IDV.pathAscending}" x="55" y="145" width="300" height="189" preserveAspectRatio="xMidYMid meet" aria-hidden="true" />
      <image href="${IDV.pathPause}" x="177" y="308" width="106" height="49" preserveAspectRatio="xMidYMid meet" aria-hidden="true" />
      <image href="${IDV.pathThreeWay}" x="343" y="33" width="150" height="234" preserveAspectRatio="xMidYMid meet" aria-hidden="true" />
      <circle cx="61" cy="294" r="9" fill="#2FA88C" stroke="#F5F1E8" stroke-width="3" />
      <circle cx="183" cy="314" r="9" fill="#2FA88C" stroke="#F5F1E8" stroke-width="3" />
      <circle cx="305" cy="217" r="9" fill="#2FA88C" stroke="#F5F1E8" stroke-width="3" />
      <image href="${IDV.nodeTerra}" x="323" y="125" width="52" height="52" preserveAspectRatio="xMidYMid meet" aria-hidden="true" />
      <image href="${IDV.compassCover}" x="58" y="50" width="88" height="88" preserveAspectRatio="xMidYMid meet" aria-hidden="true" />
      <g font-size="13" fill="#1C1F26">
        <text x="61" y="329" text-anchor="middle" font-weight="600">interesse</text>
        <text x="300" y="247" text-anchor="end" font-weight="600">um projeto pequeno</text>
        <text x="317" y="113" text-anchor="end" font-weight="600">decisão</text>
        <text x="434" y="24" text-anchor="middle">sites</text>
        <text x="490" y="193" text-anchor="middle">jogos</text>
        <text x="458" y="286" text-anchor="middle">ainda não sei</text>
        <text x="245" y="376" text-anchor="middle" fill="#5F6670" font-size="12">pausar também faz parte</text>
      </g>
    `;
  };

  const enhanceProcess = () => {
    const icons = [IDV.iconObserve, IDV.iconBuild, IDV.iconCheck, IDV.iconRoute];
    document.querySelectorAll('.process-grid > li').forEach((item, index) => {
      if (!icons[index] || item.querySelector('.idv-step-icon')) return;
      const icon = document.createElement('img');
      icon.src = icons[index];
      icon.alt = '';
      icon.className = 'idv-step-icon';
      icon.setAttribute('aria-hidden', 'true');
      const heading = item.querySelector('h3');
      if (heading) item.insertBefore(icon, heading);
    });
  };

  const enhanceAudience = () => {
    const cards = document.querySelectorAll('.audience-card');
    const assets = [IDV.iconBuild, IDV.iconFamily];
    cards.forEach((card, index) => {
      if (!assets[index] || card.querySelector('.idv-audience-icon')) return;
      const icon = document.createElement('img');
      icon.src = assets[index];
      icon.alt = '';
      icon.className = 'idv-audience-icon';
      icon.setAttribute('aria-hidden', 'true');
      card.prepend(icon);
    });
  };

  const enhanceRoadmapSection = () => {
    const section = document.querySelector('#roadmap .roadmap-grid > div');
    if (section && !section.querySelector('.roadmap-product-signature')) {
      const signature = document.createElement('img');
      signature.src = IDV.roadmapSignature;
      signature.alt = 'Roadmap de Programação para Pais e Jovens';
      signature.className = 'roadmap-product-signature';
      const heading = section.querySelector('h2');
      if (heading) section.insertBefore(signature, heading);
    }

    document.querySelectorAll('.roadmap-list li').forEach((item) => {
      const legacy = item.querySelector('span[aria-hidden="true"]');
      if (!legacy || item.querySelector('.idv-list-icon')) return;
      const icon = document.createElement('img');
      icon.src = IDV.iconCheck;
      icon.alt = '';
      icon.className = 'idv-list-icon';
      icon.setAttribute('aria-hidden', 'true');
      legacy.replaceWith(icon);
    });
  };

  injectIdvOverrides();
  alignBrandAssets();
  alignCtaArrows();
  alignHeroIllustration();
  enhanceProcess();
  enhanceAudience();
  enhanceRoadmapSection();

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