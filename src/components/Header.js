import { createTierIndicator } from './TierIndicator.js';
import { ICONS } from '../icons.js';

export function setupHeader() {
  const header = document.createElement('header');
  header.className = 'app-header';
  
  // ── Case Study Announcement Bar ──────────────
  const announcementBar = document.createElement('div');
  announcementBar.className = 'cs-announcement-bar';
  announcementBar.innerHTML = `
    <a href="/casestudy/" class="cs-announcement-link">
      <span class="cs-announcement-label">Product Design Case Study</span>
      <span class="cs-announcement-cta">Read the Case Study →</span>
    </a>
  `;
  header.appendChild(announcementBar);
  // ── END Case Study Bar ───────────────────────

  const style = document.createElement('style');
  style.textContent = `
    /* ── Case Study Announcement Bar ─────────── */
    .cs-announcement-bar {
      width: 100%;
      background: var(--color-optical-black);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cs-announcement-link {
      display: flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      padding: 0 16px;
    }
    .cs-announcement-label {
      font-family: var(--font-utility);
      font-size: 8px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
    }
    .cs-announcement-cta {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #B8A062;
      transition: opacity 0.15s;
    }
    .cs-announcement-link:hover .cs-announcement-cta {
      opacity: 0.7;
    }
    @media (max-width: 480px) {
      .cs-announcement-label { display: none; }
    }
    /* ── Header ─────────────────────────────────── */
    .app-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--bg-primary);
      border-bottom: 1px solid var(--color-border);
      width: 100%;
      height: var(--header-height);
    }
    
    .header-inner {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      height: 100%;
      padding: 0 16px;
      max-width: var(--content-max);
      margin: 0 auto;
    }
    
    /* Left zone — hamburger on mobile, nav on desktop */
    .header-left {
      display: flex;
      align-items: center;
      gap: 0;
    }
    
    /* Center — logo */
    .header-logo {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      text-decoration: none;
      white-space: nowrap;
      justify-self: center;
      transition: color 0.15s;
    }
    .header-logo:hover {
      color: var(--color-optical-black);
    }
    
    /* Right zone */
    .header-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 2px;
    }
    
    .h-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      color: var(--color-optical-black);
      cursor: pointer;
      transition: color 0.15s;
      flex-shrink: 0;
    }
    
    .h-btn:hover { color: var(--color-anodized-stone); }
    
    /* Desktop nav links */
    .header-nav {
      display: none;
      align-items: center;
      gap: 0;
    }
    
    .nav-link {
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.04em;
      color: var(--color-optical-black);
      text-decoration: none;
      padding: 0 14px;
      height: var(--header-height);
      display: inline-flex;
      align-items: center;
      border-right: 1px solid var(--color-border);
      transition: color 0.15s;
    }
    
    .nav-link:first-child { border-left: 1px solid var(--color-border); }
    .nav-link:hover { color: var(--color-anodized-stone); }
    .nav-link.active { font-weight: 600; }
    
    /* Mobile menu overlay */
    .mob-menu {
      position: fixed;
      inset: 0;
      background: var(--bg-primary);
      z-index: 300;
      display: flex;
      flex-direction: column;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .mob-menu.open {
      opacity: 1;
      pointer-events: auto;
    }
    .mob-menu__head {
      height: var(--header-height);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 16px;
    }
    .mob-menu__links {
      padding: 40px 24px;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .mob-nav-link {
      font-family: var(--font-body);
      font-size: 15px;
      letter-spacing: 0.01em;
      color: var(--color-optical-black);
      text-decoration: none;
      padding: 16px 0;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .mob-nav-link::after {
      content: '→';
      font-size: 12px;
      color: var(--color-anodized-stone);
    }
    
    /* Full-screen search overlay */
    .search-overlay {
      position: fixed;
      inset: 0;
      background: var(--bg-primary);
      z-index: 400;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .search-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .search-overlay__close {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    .search-overlay__inner {
      width: 100%;
      max-width: 560px;
      padding: 0 24px;
    }
    .search-overlay__label {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      margin-bottom: 12px;
    }
    .search-overlay__field {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--color-optical-black);
      padding-bottom: 8px;
      gap: 8px;
    }
    .search-overlay__input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-family: var(--font-body);
      font-size: 22px;
      color: var(--color-optical-black);
    }
    .search-overlay__input::placeholder {
      color: var(--color-titanium-fog);
    }
    .search-overlay__tags {
      margin-top: 24px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .search-tag {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      border: 1px solid var(--color-border);
      padding: 6px 12px;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
      background: transparent;
    }
    .search-tag:hover {
      border-color: var(--color-optical-black);
      color: var(--color-optical-black);
    }
    
    @media (min-width: 1024px) {
      .header-inner {
        padding: 0 24px;
        grid-template-columns: auto 1fr auto;
        gap: 32px;
      }
      .header-nav { display: flex; }
      .h-btn--menu { display: none !important; }
      .header-left { order: 0; }
      .header-logo { justify-self: unset; }
    }
  `;
  header.appendChild(style);
  
  const inner = document.createElement('div');
  inner.className = 'header-inner';
  
  // Left
  const leftZone = document.createElement('div');
  leftZone.className = 'header-left';
  
  const menuBtn = document.createElement('button');
  menuBtn.className = 'h-btn h-btn--menu';
  menuBtn.setAttribute('aria-label', 'Menu');
  menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
  leftZone.appendChild(menuBtn);
  
  // Desktop nav (also in left zone on desktop)
  const desktopNav = document.createElement('nav');
  desktopNav.className = 'header-nav';
  const navItems = [
    { label: 'Marketplace', href: '#/' },
    { label: 'Collections', href: '#/categories' },
    { label: 'How it Works', href: '#/how-it-works' },
    { label: 'List an Item', href: '#/list' },
    { label: 'About', href: '#/about' },
    { label: 'Case Study ↗', href: '/casestudy/', external: true },
  ];
  navItems.forEach((item, i) => {
    const a = document.createElement('a');
    a.href = item.href;
    a.className = `nav-link${i === 0 ? ' active' : ''}`;
    a.textContent = item.label;
    desktopNav.appendChild(a);
  });
  leftZone.appendChild(desktopNav);
  
  // Right
  const rightZone = document.createElement('div');
  rightZone.className = 'header-right';
  
  const searchBtn = document.createElement('button');
  searchBtn.className = 'h-btn';
  searchBtn.setAttribute('aria-label', 'Search');
  searchBtn.innerHTML = ICONS.search;
  
  const tierBadge = createTierIndicator();
  
  const profileBtn = document.createElement('button');
  profileBtn.className = 'h-btn';
  profileBtn.setAttribute('aria-label', 'Account');
  profileBtn.innerHTML = ICONS.profile;
  
  rightZone.appendChild(searchBtn);
  rightZone.appendChild(tierBadge);
  rightZone.appendChild(profileBtn);
  
  // Center — Home Anchor
  const logo = document.createElement('a');
  logo.href = '#/';
  logo.className = 'header-logo';
  logo.textContent = '[ SHOWROOM ]';
  
  inner.appendChild(leftZone);
  inner.appendChild(logo);
  inner.appendChild(rightZone);
  header.appendChild(inner);
  
  // ── Mobile menu overlay ──────────────────────────
  const mobMenu = document.createElement('div');
  mobMenu.className = 'mob-menu';
  
  const mobHead = document.createElement('div');
  mobHead.className = 'mob-menu__head';
  const mobClose = document.createElement('button');
  mobClose.className = 'h-btn';
  mobClose.setAttribute('aria-label', 'Close menu');
  mobClose.innerHTML = ICONS.close;
  mobHead.appendChild(mobClose);
  
  const mobLinks = document.createElement('nav');
  mobLinks.className = 'mob-menu__links';
  navItems.forEach(item => {
    const a = document.createElement('a');
    a.href = item.href;
    a.className = 'mob-nav-link';
    a.textContent = item.label;
    if (item.external) {
      a.style.color = '#B8A062';
    }
    a.addEventListener('click', () => mobMenu.classList.remove('open'));
    mobLinks.appendChild(a);
  });
  
  mobMenu.appendChild(mobHead);
  mobMenu.appendChild(mobLinks);
  header.appendChild(mobMenu);
  
  // ── Search overlay ───────────────────────────────
  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay';
  searchOverlay.innerHTML = `
    <button class="h-btn search-overlay__close" aria-label="Close search">${ICONS.close}</button>
    <div class="search-overlay__inner">
      <div class="search-overlay__label">Search the showroom</div>
      <div class="search-overlay__field">
        ${ICONS.search}
        <input type="search" placeholder="Cameras, drones, apparel..." class="search-overlay__input">
      </div>
      <div class="search-overlay__tags">
        <button class="search-tag">Hasselblad</button>
        <button class="search-tag">Leica</button>
        <button class="search-tag">DJI Inspire</button>
        <button class="search-tag">Arc'teryx</button>
      </div>
    </div>
  `;
  header.appendChild(searchOverlay);
  
  // Events
  menuBtn.addEventListener('click', () => mobMenu.classList.add('open'));
  mobClose.addEventListener('click', () => mobMenu.classList.remove('open'));
  
  const input = searchOverlay.querySelector('.search-overlay__input');
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('open');
    setTimeout(() => input.focus(), 100);
  });
  searchOverlay.querySelector('.search-overlay__close').addEventListener('click', () => {
    searchOverlay.classList.remove('open');
    input.value = '';
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchOverlay.classList.remove('open');
      input.value = '';
    }
  });
  searchOverlay.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      input.value = tag.textContent;
      searchOverlay.classList.remove('open');
    });
  });
  
  return header;
}
