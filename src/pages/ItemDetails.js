import { itemDetailsData } from '../data/itemDetailsData.js';
import { VerificationGate } from '../components/VerificationGate.js';
import { InfoSheet } from '../components/InfoSheet.js';
import { state } from '../main.js';

export function renderItemDetails(itemId = '1') {
  const container = document.createElement('div');
  container.className = 'details-page-container';
  
  // 1. Resolve item details data or handle fallback
  let originalItem = itemDetailsData[itemId] || itemDetailsData['1'];
  
  // Active page state
  let selectedStartDate = null;
  let selectedEndDate = null;
  let isSaved = false;

  // Booked dates indices for September 2026 calendar (1-indexed days)
  const bookedDates = [10, 11, 12, 24, 25];

  const style = document.createElement('style');
  style.textContent = `
    /* ── Details Page Structure ───────────────────── */
    .details-page {
      background: var(--bg-primary);
      color: var(--color-optical-black);
      min-height: 100%;
      position: relative;
    }
    
    /* Sticky navigation bar within details page — mobile only */
    .details-nav {
      position: sticky;
      top: var(--header-height, 52px);
      z-index: 80;
      height: 48px;
      background: var(--bg-primary);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }
    
    @media (min-width: 1024px) {
      .details-nav {
        display: none !important;
      }
    }
    
    .details-nav__title {
      font-family: var(--font-utility);
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-optical-black);
      font-weight: 400;
    }
    .details-nav__action {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .details-nav__btn {
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--color-optical-black);
      cursor: pointer;
      transition: color 0.15s;
    }
    .details-nav__btn:hover { color: var(--color-anodized-stone); }
    .details-nav__btn.saved svg {
      fill: var(--color-coating-amber);
      stroke: var(--color-coating-amber);
    }
    
    /* Sidebar navigation for desktop */
    .sidebar-nav {
      display: none;
    }
    
    @media (min-width: 1024px) {
      .sidebar-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 16px;
        margin-bottom: 24px;
      }
    }
    
    .sidebar-nav__back {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-optical-black);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: color 0.15s;
      background: transparent;
      border: none;
    }
    .sidebar-nav__back:hover {
      color: var(--color-anodized-stone);
    }
    .sidebar-nav__actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Layout grid */
    .details-grid {
      display: grid;
      grid-template-columns: 1fr;
      width: 100%;
      max-width: var(--content-max);
      margin: 0 auto;
    }
    
    @media (min-width: 1024px) {
      .details-grid {
        grid-template-columns: 3fr 2fr;
      }
    }
    
    /* Left column — image showcase stack */
    .details-gallery {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid var(--color-border);
    }
    
    .gallery-stack {
      display: none;
    }
    
    /* Mobile Touch Gallery Swiper */
    .gallery-swiper {
      display: block;
      position: relative;
      width: 100%;
      aspect-ratio: 1/1;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }
    .gallery-swiper::-webkit-scrollbar { display: none; }
    
    .swiper-slide {
      scroll-snap-align: start;
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      display: inline-block;
      vertical-align: top;
      background: #e8e5e0;
      cursor: zoom-in;
    }
    .swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    
    .gallery-counter {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(3,3,3,0.6);
      color: var(--bg-primary);
      font-family: var(--font-utility);
      font-size: 8px;
      letter-spacing: 0.1em;
      pointer-events: none;
      padding: 4px 8px;
    }
    
    @media (min-width: 1024px) {
      .details-gallery {
        border-bottom: none;
        border-right: 1px solid var(--color-border);
      }
      .gallery-swiper { display: none; }
      .gallery-stack {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      .gallery-stack-img {
        width: 100%;
        aspect-ratio: 3/2;
        border-bottom: 1px solid var(--color-border);
        overflow: hidden;
        cursor: zoom-in;
      }
      .gallery-stack-img:last-child { border-bottom: none; }
      .gallery-stack-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
      }
      .gallery-stack-img:hover img { transform: scale(1.02); }
    }
    
    /* Right column — Sticky details sidebar */
    .details-sidebar {
      padding: 24px 16px;
    }
    
    @media (min-width: 1024px) {
      .details-sidebar {
        padding: 40px 36px;
        position: sticky;
        top: var(--header-height, 52px);
        height: calc(100vh - var(--header-height, 52px) - 56px);
        overflow-y: auto;
      }
      .details-sidebar::-webkit-scrollbar { display: none; }
    }
    
    /* Item Summary Block */
    .item-summary {
      margin-bottom: 32px;
    }
    .item-cat {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      margin-bottom: 8px;
    }
    .item-title {
      font-family: var(--font-display);
      font-size: clamp(24px, 3.5vw, 36px);
      font-weight: 300;
      line-height: 1.1;
      color: var(--color-optical-black);
      margin-bottom: 16px;
    }
    .item-desc {
      font-size: 13px;
      line-height: 1.7;
      color: var(--color-anodized-stone);
      margin-bottom: 24px;
    }
    
    /* Price deposit block */
    .pricing-block {
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 32px;
    }
    .pricing-cell {
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .pricing-cell:first-child { border-right: 1px solid var(--color-border); }
    .pricing-label {
      font-family: var(--font-utility);
      font-size: 8px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
    }
    .pricing-value {
      font-size: 18px;
      font-weight: 500;
      color: var(--color-optical-black);
    }
    
    /* Calendar widget */
    .calendar-container {
      margin-bottom: 32px;
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .calendar-title {
      font-family: var(--font-body);
      font-weight: 500;
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-optical-black);
    }
    .calendar-status {
      font-size: 11px;
      color: var(--color-anodized-stone);
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-left: 1px solid var(--color-border);
      border-top: 1px solid var(--color-border);
    }
    .calendar-day-label {
      font-family: var(--font-utility);
      font-size: 8px;
      text-align: center;
      padding: 6px 0;
      border-right: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      color: var(--color-anodized-stone);
      background: rgba(3,3,3,0.02);
    }
    .calendar-cell {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-utility);
      font-size: 10px;
      border-right: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      background: transparent;
      cursor: pointer;
      position: relative;
      transition: background 0.15s, color 0.15s;
    }
    .calendar-cell.booked {
      color: var(--color-titanium-fog);
      background: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(3,3,3,0.03) 5px, rgba(3,3,3,0.03) 10px);
      cursor: not-allowed;
    }
    .calendar-cell.selected {
      background: var(--color-optical-black);
      color: var(--bg-primary);
    }
    .calendar-cell.in-range {
      background: rgba(3,3,3,0.07);
    }
    
    /* Toast message for unavailable selections */
    .toast-msg {
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-optical-black);
      color: var(--bg-primary);
      font-size: 12px;
      padding: 10px 18px;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s;
      white-space: nowrap;
    }
    .toast-msg.show { opacity: 1; }
    
    /* Details section blocks */
    .details-section {
      border-top: 1px solid var(--color-border);
      padding: 24px 0;
    }
    .details-section__title {
      font-family: var(--font-body);
      font-weight: 500;
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      margin-bottom: 12px;
    }
    
    /* Owner block */
    .owner-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .owner-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .owner-avatar {
      width: 36px; height: 36px;
      background: var(--color-optical-black);
      color: var(--bg-primary);
      font-family: var(--font-utility);
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .owner-meta {
      display: flex;
      flex-direction: column;
    }
    .owner-name { font-size: 13px; font-weight: 500; }
    .owner-joined { font-size: 11px; color: var(--color-anodized-stone); }
    .owner-stats {
      font-size: 12px;
      line-height: 1.6;
      color: var(--color-optical-black);
      opacity: 0.8;
      margin-top: 4px;
    }
    .owner-chat-btn {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      border: 1px solid var(--color-border);
      padding: 8px 14px;
      align-self: flex-start;
      margin-top: 8px;
      transition: border-color 0.15s, color 0.15s;
    }
    .owner-chat-btn:hover {
      border-color: var(--color-optical-black);
      color: var(--color-optical-black);
    }
    
    /* Specs table */
    .specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 24px;
      font-size: 12px;
    }
    .spec-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .spec-label { color: var(--color-anodized-stone); font-size: 11px; }
    .spec-val { color: var(--color-optical-black); font-weight: 500; }
    
    /* Pickup Area block */
    .pickup-area {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .pickup-title { font-size: 13px; font-weight: 500; }
    .pickup-note {
      font-size: 12px;
      line-height: 1.6;
      color: var(--color-anodized-stone);
    }
    
    /* Terms list */
    .terms-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 12px;
      line-height: 1.6;
      color: var(--color-optical-black);
      opacity: 0.85;
    }
    
    /* Mobile CTA bar sticky */
    .mob-cta-bar {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: var(--bg-primary);
      border-top: 1px solid var(--color-border);
      padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
      z-index: 70;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .mob-cta-price {
      display: flex;
      flex-direction: column;
    }
    .mob-cta-price__val { font-size: 15px; font-weight: 600; }
    .mob-cta-price__label { font-size: 10px; color: var(--color-anodized-stone); }
    
    .rent-btn {
      flex: 1;
      font-family: var(--font-utility);
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: var(--color-optical-black);
      color: var(--bg-primary);
      padding: 14px 20px;
      text-align: center;
      transition: background 0.15s;
      cursor: pointer;
    }
    .rent-btn:hover { background: #333; }
    .rent-btn:disabled {
      background: var(--color-titanium-fog);
      color: var(--bg-primary);
      cursor: not-allowed;
    }
    
    /* Hide desktop CTA on mobile, hide mobile CTA on desktop */
    .desktop-cta-container { display: none; }
    
    @media (min-width: 1024px) {
      .mob-cta-bar { display: none; }
      .desktop-cta-container {
        display: block;
        margin-bottom: 32px;
      }
      .desktop-rent-btn {
        width: 100%;
        display: block;
      }
    }
    
    /* ── Date Picker overlay drawer (mobile) / modal (desktop) ── */
    .date-drawer {
      position: fixed;
      inset: 0;
      z-index: 600;
      display: none;
      flex-direction: column;
    }
    .date-drawer.open {
      display: flex;
    }
    .date-drawer__scrim {
      position: absolute;
      inset: 0;
      background: rgba(3,3,3,0.4);
    }
    .date-drawer__panel {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      background: var(--bg-primary);
      border-top: 1px solid var(--color-border);
      padding: 24px 16px calc(32px + env(safe-area-inset-bottom));
      transform: translate3d(0, 100%, 0);
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .date-drawer.open .date-drawer__panel {
      transform: translate3d(0, 0, 0);
    }
    .date-drawer__actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 24px;
    }
    .date-drawer__btn {
      font-family: var(--font-utility);
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 12px 20px;
      text-align: center;
      cursor: pointer;
    }
    .date-drawer__btn--cancel {
      border: 1px solid var(--color-border);
    }
    .date-drawer__btn--cancel:hover { border-color: var(--color-optical-black); }
    .date-drawer__btn--continue {
      background: var(--color-optical-black);
      color: var(--bg-primary);
    }
    .date-drawer__btn--continue:disabled {
      background: var(--color-titanium-fog);
      cursor: not-allowed;
    }
    
    @media (min-width: 768px) {
      .date-drawer {
        align-items: center;
        justify-content: center;
      }
      .date-drawer__panel {
        position: relative;
        bottom: auto; left: auto; right: auto;
        width: 100%;
        max-width: 440px;
        transform: translateY(16px);
        opacity: 0;
        transition: transform 0.22s ease, opacity 0.22s ease;
        border: 1px solid var(--color-border);
        padding: 32px;
      }
      .date-drawer.open .date-drawer__panel {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    /* ── Lightbox Overlay ────────────────────────── */
    .lightbox {
      position: fixed;
      inset: 0;
      background: var(--bg-primary);
      z-index: 800;
      display: flex;
      flex-direction: column;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .lightbox.open {
      opacity: 1;
      pointer-events: auto;
    }
    .lightbox__head {
      height: 48px;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }
    .lightbox__close {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-optical-black);
    }
    .lightbox__scroll {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 24px 16px;
    }
    .lightbox__img-container {
      width: 100%;
      border: 1px solid var(--color-border);
      background: #e8e5e0;
    }
    .lightbox__img-container img {
      width: 100%;
      height: auto;
      display: block;
    }
  `;
  container.appendChild(style);

  // Outer Wrapper
  const outerWrapper = document.createElement('div');
  outerWrapper.className = 'details-page';
  container.appendChild(outerWrapper);

  // Toast container
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  document.body.appendChild(toast);
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  };

  // Full Screen Lightbox Overlay
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox__head">
      <button class="details-nav__btn lightbox__back" aria-label="Close lightbox">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      </button>
      <span class="details-nav__title">Showroom Gallery</span>
      <button class="lightbox__close">Close</button>
    </div>
    <div class="lightbox__scroll">
      ${originalItem.images.map(img => `<div class="lightbox__img-container"><img src="${img}" alt="${originalItem.title}"></div>`).join('')}
    </div>
  `;
  container.appendChild(lightbox);
  
  const closeLightbox = () => lightbox.classList.remove('open');
  lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__back').addEventListener('click', closeLightbox);

  // Date Picker overlay drawer (mobile) / modal (desktop)
  const dateDrawer = document.createElement('div');
  dateDrawer.className = 'date-drawer';
  dateDrawer.innerHTML = `
    <div class="date-drawer__scrim"></div>
    <div class="date-drawer__panel">
      <div class="calendar-header">
        <span class="calendar-title">Select Rental Period</span>
        <span class="calendar-status date-drawer-status">No dates selected</span>
      </div>
      <div class="calendar-grid date-drawer-grid"></div>
      <div class="date-drawer__actions">
        <button class="date-drawer__btn date-drawer__btn--cancel">Cancel</button>
        <button class="date-drawer__btn date-drawer__btn--continue" disabled>Continue</button>
      </div>
    </div>
  `;
  container.appendChild(dateDrawer);
  
  const openDateDrawer = () => {
    dateDrawer.style.display = 'flex';
    dateDrawer.offsetHeight; // force reflow
    dateDrawer.classList.add('open');
  };

  const closeDateDrawer = () => {
    dateDrawer.classList.remove('open');
    setTimeout(() => {
      if (!dateDrawer.classList.contains('open')) {
        dateDrawer.style.display = 'none';
      }
    }, 250);
  };

  dateDrawer.querySelector('.date-drawer__scrim').addEventListener('click', closeDateDrawer);
  dateDrawer.querySelector('.date-drawer__btn--cancel').addEventListener('click', closeDateDrawer);

  const drawerContinue = dateDrawer.querySelector('.date-drawer__btn--continue');

  // Launch Verification Gate Tier 1 callback
  const launchVerificationFlow = () => {
    if (state.tier >= 1) {
      const node = document.createElement('div');
      node.innerHTML = `<p>Your rental request for <strong>${originalItem.title}</strong> has been successfully submitted!</p>`;
      InfoSheet.open({ title: 'Request Submitted', contentNode: node });
      return;
    }

    VerificationGate.open({
      tier: 1,
      itemTitle: originalItem.title,
      onConfirm: () => {
        state.activeVerificationTier = 1;
        window.location.hash = '#/identity';
      },
      onDismiss: () => {
        // Closed
      }
    });
  };

  drawerContinue.addEventListener('click', () => {
    closeDateDrawer();
    setTimeout(() => {
      launchVerificationFlow();
    }, 280);
  });

  // Main Render function
  const render = () => {
    outerWrapper.innerHTML = '';

    // Render Sub-Header Nav (Mobile/tablet only)
    const nav = document.createElement('nav');
    nav.className = 'details-nav';
    
    const backBtn = document.createElement('button');
    backBtn.className = 'details-nav__btn';
    backBtn.setAttribute('aria-label', 'Go back');
    backBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`;
    backBtn.addEventListener('click', () => {
      window.history.back();
    });
    
    const navTitle = document.createElement('span');
    navTitle.className = 'details-nav__title';
    navTitle.textContent = `${originalItem.category}`;
    
    const navActions = document.createElement('div');
    navActions.className = 'details-nav__action';
    
    const shareBtn = document.createElement('button');
    shareBtn.className = 'details-nav__btn';
    shareBtn.setAttribute('aria-label', 'Share listing');
    shareBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>`;
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: originalItem.title,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard');
      }
    });
    
    const saveBtn = document.createElement('button');
    saveBtn.className = `details-nav__btn${isSaved ? ' saved' : ''}`;
    saveBtn.setAttribute('aria-label', 'Save to favorites');
    saveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    saveBtn.addEventListener('click', () => {
      if (!state.isAuthenticated) {
        const node = document.createElement('div');
        node.innerHTML = '<p>Sign in to save items to your favorites shelf.</p>';
        InfoSheet.open({ title: 'Sign in required', contentNode: node });
      } else {
        isSaved = !isSaved;
        saveBtn.classList.toggle('saved', isSaved);
        showToast(isSaved ? 'Saved to favorites' : 'Removed from favorites');
      }
    });
    
    navActions.appendChild(shareBtn);
    navActions.appendChild(saveBtn);
    nav.appendChild(backBtn);
    nav.appendChild(navTitle);
    nav.appendChild(navActions);
    outerWrapper.appendChild(nav);

    // Grid Container
    const grid = document.createElement('div');
    grid.className = 'details-grid';
    
    // Left: Gallery Column
    const galleryCol = document.createElement('div');
    galleryCol.className = 'details-gallery';
    
    // Mobile swiper
    const swiper = document.createElement('div');
    swiper.className = 'gallery-swiper';
    swiper.innerHTML = originalItem.images.map(img => `
      <div class="swiper-slide"><img src="${img}" alt="${originalItem.title}" loading="lazy"></div>
    `).join('');
    
    const counter = document.createElement('div');
    counter.className = 'gallery-counter';
    counter.textContent = `1 / ${originalItem.images.length}`;
    
    swiper.addEventListener('scroll', () => {
      const index = Math.round(swiper.scrollLeft / swiper.clientWidth) + 1;
      counter.textContent = `${index} / ${originalItem.images.length}`;
    });
    
    // Open lightbox on swiper slide click
    swiper.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.addEventListener('click', () => lightbox.classList.add('open'));
    });
    
    // Desktop vertical stack
    const stack = document.createElement('div');
    stack.className = 'gallery-stack';
    stack.innerHTML = originalItem.images.map(img => `
      <div class="gallery-stack-img"><img src="${img}" alt="${originalItem.title}"></div>
    `).join('');
    
    stack.querySelectorAll('.gallery-stack-img').forEach(slide => {
      slide.addEventListener('click', () => lightbox.classList.add('open'));
    });

    galleryCol.appendChild(swiper);
    galleryCol.appendChild(counter);
    galleryCol.appendChild(stack);
    grid.appendChild(galleryCol);

    // Right: Sidebar Column
    const sidebar = document.createElement('div');
    sidebar.className = 'details-sidebar';
    
    // Desktop Sidebar Navigation Row (Header Actions integrated into sidebar)
    const sidebarNav = document.createElement('div');
    sidebarNav.className = 'sidebar-nav';
    
    const sideBack = document.createElement('button');
    sideBack.className = 'sidebar-nav__back';
    sideBack.innerHTML = `← Back`;
    sideBack.addEventListener('click', () => {
      window.history.back();
    });
    
    const sideActions = document.createElement('div');
    sideActions.className = 'sidebar-nav__actions';
    
    const sideShare = document.createElement('button');
    sideShare.className = 'details-nav__btn';
    sideShare.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>`;
    sideShare.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: originalItem.title,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard');
      }
    });
    
    const sideSave = document.createElement('button');
    sideSave.className = `details-nav__btn${isSaved ? ' saved' : ''}`;
    sideSave.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    sideSave.addEventListener('click', () => {
      if (!state.isAuthenticated) {
        const node = document.createElement('div');
        node.innerHTML = '<p>Sign in to save items to your favorites shelf.</p>';
        InfoSheet.open({ title: 'Sign in required', contentNode: node });
      } else {
        isSaved = !isSaved;
        sideSave.classList.toggle('saved', isSaved);
        saveBtn.classList.toggle('saved', isSaved);
        showToast(isSaved ? 'Saved to favorites' : 'Removed from favorites');
      }
    });
    
    sideActions.appendChild(sideShare);
    sideActions.appendChild(sideSave);
    sidebarNav.appendChild(sideBack);
    sidebarNav.appendChild(sideActions);
    sidebar.appendChild(sidebarNav);
    
    // Summary
    const summary = document.createElement('div');
    summary.className = 'item-summary';
    summary.innerHTML = `
      <div class="item-cat">${originalItem.category}</div>
      <h1 class="item-title">${originalItem.title}</h1>
      <p class="item-desc">${originalItem.description}</p>
    `;
    sidebar.appendChild(summary);

    // Pricing Row
    const pricing = document.createElement('div');
    pricing.className = 'pricing-block';
    pricing.innerHTML = `
      <div class="pricing-cell">
        <span class="pricing-label">Daily rate</span>
        <span class="pricing-value">$${originalItem.pricePerDay}</span>
      </div>
      <div class="pricing-cell">
        <span class="pricing-label">Security deposit</span>
        <span class="pricing-value">$${originalItem.refundableDeposit}</span>
      </div>
    `;
    sidebar.appendChild(pricing);

    // Calendar
    const calContainer = document.createElement('div');
    calContainer.className = 'calendar-container';
    calContainer.innerHTML = `
      <div class="calendar-header">
        <span class="calendar-title">Availability</span>
        <span class="calendar-status cal-dates-readout">Select dates</span>
      </div>
      <div class="calendar-grid inner-cal-grid"></div>
    `;
    sidebar.appendChild(calContainer);

    // Render Calendar cells helper
    const makeCalendarCells = (gridContainer, statusEl, isDrawer = false) => {
      gridContainer.innerHTML = '';
      
      // Days header S M T W T F S
      const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      days.forEach(d => {
        const el = document.createElement('div');
        el.className = 'calendar-day-label';
        el.textContent = d;
        gridContainer.appendChild(el);
      });

      // Render September 2026 calendar days (Starts on Tuesday = offset 2 empty cells)
      const offset = 2;
      for (let i = 0; i < offset; i++) {
        const el = document.createElement('div');
        el.className = 'calendar-cell booked';
        gridContainer.appendChild(el);
      }

      // Render 30 days
      for (let day = 1; day <= 30; day++) {
        const cell = document.createElement('button');
        cell.className = 'calendar-cell';
        cell.textContent = day;

        const isBooked = bookedDates.includes(day);
        if (isBooked) {
          cell.classList.add('booked');
        }

        // Apply highlights based on selected range
        if (selectedStartDate && day === selectedStartDate) {
          cell.classList.add('selected');
        }
        if (selectedEndDate && day === selectedEndDate) {
          cell.classList.add('selected');
        }
        if (selectedStartDate && selectedEndDate && day > selectedStartDate && day < selectedEndDate) {
          cell.classList.add('in-range');
        }

        cell.addEventListener('click', () => {
          if (isBooked) {
            showToast('These dates have already been booked.');
            return;
          }

          if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            // First select or reset select
            selectedStartDate = day;
            selectedEndDate = null;
          } else {
            // Second select
            if (day < selectedStartDate) {
              selectedStartDate = day;
            } else {
              // Check if range contains booked dates
              let hasBookedInRange = false;
              for (let d = selectedStartDate; d <= day; d++) {
                if (bookedDates.includes(d)) hasBookedInRange = true;
              }
              if (hasBookedInRange) {
                showToast('Selected range contains booked dates.');
                selectedStartDate = day;
              } else {
                selectedEndDate = day;
              }
            }
          }

          // Refresh all calendars renders
          updateCalendarReadouts();
        });

        gridContainer.appendChild(cell);
      }
    };

    const updateCalendarReadouts = () => {
      // Refresh cell selections
      const allInnerCells = calContainer.querySelectorAll('.calendar-cell');
      const allDrawerCells = dateDrawer.querySelectorAll('.calendar-cell');
      
      const refreshCells = (cells) => {
        cells.forEach(c => {
          if (!c.textContent) return;
          const day = parseInt(c.textContent);
          c.classList.remove('selected', 'in-range');
          if (selectedStartDate && day === selectedStartDate) c.classList.add('selected');
          if (selectedEndDate && day === selectedEndDate) c.classList.add('selected');
          if (selectedStartDate && selectedEndDate && day > selectedStartDate && day < selectedEndDate) c.classList.add('in-range');
        });
      };

      refreshCells(allInnerCells);
      refreshCells(allDrawerCells);

      // Label readout
      let statusText = 'Select dates';
      if (selectedStartDate && !selectedEndDate) {
        statusText = `Sep ${selectedStartDate}`;
      } else if (selectedStartDate && selectedEndDate) {
        statusText = `Sep ${selectedStartDate}–${selectedEndDate}`;
      }

      calContainer.querySelector('.cal-dates-readout').textContent = statusText;
      dateDrawer.querySelector('.date-drawer-status').textContent = statusText;

      // Update CTA buttons states
      const rentButtons = container.querySelectorAll('.action-rent-trigger');
      rentButtons.forEach(btn => {
        btn.disabled = false;
        btn.textContent = 'Rent This Item';
      });

      // Drawer continue button state
      drawerContinue.disabled = !(selectedStartDate && selectedEndDate);
    };

    // Render calendar grids
    makeCalendarCells(calContainer.querySelector('.inner-cal-grid'), calContainer.querySelector('.cal-dates-readout'));
    makeCalendarCells(dateDrawer.querySelector('.date-drawer-grid'), dateDrawer.querySelector('.date-drawer-status'), true);

    // Desktop Rent CTA Column Area
    const desktopCtaContainer = document.createElement('div');
    desktopCtaContainer.className = 'desktop-cta-container';
    
    const deskRentBtn = document.createElement('button');
    deskRentBtn.className = 'rent-btn desktop-rent-btn action-rent-trigger';
    deskRentBtn.textContent = 'Rent This Item';
    
    deskRentBtn.addEventListener('click', () => {
      if (selectedStartDate && selectedEndDate) {
        launchVerificationFlow();
      } else {
        // Open modal Date Picker
        openDateDrawer();
      }
    });
    
    desktopCtaContainer.appendChild(deskRentBtn);
    sidebar.appendChild(desktopCtaContainer);

    // Owner card
    const ownerSec = document.createElement('div');
    ownerSec.className = 'details-section';
    ownerSec.innerHTML = `
      <div class="details-section__title">Listed by</div>
      <div class="owner-info">
        <div class="owner-header">
          <div class="owner-avatar">${originalItem.owner.name.split(' ').map(n=>n[0]).join('')}</div>
          <div class="owner-meta">
            <span class="owner-name">${originalItem.owner.name}</span>
            <span class="owner-joined">${originalItem.owner.joined}</span>
          </div>
        </div>
        <div class="owner-stats">
          ${originalItem.owner.completedRentals} completed rentals<br>
          ${originalItem.owner.responseTime}
        </div>
        <button class="owner-chat-btn">Message Owner</button>
      </div>
    `;
    ownerSec.querySelector('.owner-chat-btn').addEventListener('click', () => {
      if (!state.isAuthenticated) {
        const node = document.createElement('div');
        node.innerHTML = '<p>Sign in to start a message thread with this owner.</p>';
        InfoSheet.open({ title: 'Sign in required', contentNode: node });
      } else {
        showToast('Opening owner conversation thread...');
      }
    });
    sidebar.appendChild(ownerSec);

    // Specifications
    const specsSec = document.createElement('div');
    specsSec.className = 'details-section';
    specsSec.innerHTML = `
      <div class="details-section__title">Specifications</div>
      <div class="specs-grid">
        ${Object.entries(originalItem.specifications).map(([k, v]) => `
          <div class="spec-item">
            <span class="spec-label">${k}</span>
            <span class="spec-val">${v}</span>
          </div>
        `).join('')}
      </div>
      <p style="font-size:12px;color:var(--color-anodized-stone);margin-top:16px;line-height:1.6;">
        <strong>Rental Note:</strong> ${originalItem.rentalNotes}
      </p>
    `;
    sidebar.appendChild(specsSec);

    // Pickup location
    const pickupSec = document.createElement('div');
    pickupSec.className = 'details-section';
    pickupSec.innerHTML = `
      <div class="details-section__title">Pickup area</div>
      <div class="pickup-area">
        <span class="pickup-title">${originalItem.pickupArea}</span>
        <span class="pickup-note">Exact pickup details become available after your rental request is accepted to protect both parties' privacy.</span>
      </div>
    `;
    sidebar.appendChild(pickupSec);

    // Rental Terms
    const termsSec = document.createElement('div');
    termsSec.className = 'details-section';
    termsSec.innerHTML = `
      <div class="details-section__title">Rental policies</div>
      <div class="terms-list">
        <div><strong>Duration:</strong> Minimum ${originalItem.terms.minDuration}, Maximum ${originalItem.terms.maxDuration}</div>
        <div><strong>Late Returns:</strong> ${originalItem.terms.lateFees}</div>
        <div><strong>Accidents/Damage:</strong> ${originalItem.terms.responsibility}</div>
        <div><strong>Cancellation:</strong> ${originalItem.owner.cancellationPolicy}</div>
      </div>
    `;
    sidebar.appendChild(termsSec);

    grid.appendChild(sidebar);
    outerWrapper.appendChild(grid);

    // Sticky Bottom Mobile Action Bar
    const mobCta = document.createElement('div');
    mobCta.className = 'mob-cta-bar';
    mobCta.innerHTML = `
      <div class="mob-cta-price">
        <span class="mob-cta-price__val">$${originalItem.pricePerDay}</span>
        <span class="mob-cta-price__label">per day</span>
      </div>
      <button class="rent-btn action-rent-trigger">Rent This Item</button>
    `;
    
    mobCta.querySelector('.rent-btn').addEventListener('click', () => {
      if (selectedStartDate && selectedEndDate) {
        launchVerificationFlow();
      } else {
        // Open overlay Date Picker
        openDateDrawer();
      }
    });
    outerWrapper.appendChild(mobCta);

    // Initial readouts update
    updateCalendarReadouts();
  };

  render();
  return container;
}
