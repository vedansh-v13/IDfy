import { createCategoryNav } from '../components/CategoryNav.js';
import { createHeroCard } from '../components/HeroCard.js';
import { createItemCard } from '../components/ItemCard.js';
import { InfoSheet } from '../components/InfoSheet.js';
import { mockListings } from '../data/mockListings.js';

export function renderMarketplaceHome() {
  const page = document.createElement('div');
  page.dataset.page = 'MarketplaceHome';
  
  const style = document.createElement('style');
  style.textContent = `
    /* ── Announcement band ───────────────────────── */
    .announce-band {
      background: var(--color-optical-black);
      color: var(--bg-primary);
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      text-align: center;
      padding: 9px 16px;
    }

    /* ── Browse intro section ────────────────────── */
    .browse-intro {
      border-bottom: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
    }
    
    /* Hero image strip — full bleed */
    .browse-intro__hero-img {
      width: 100%;
      height: 260px;
      overflow: hidden;
    }
    @media (min-width: 768px) {
      .browse-intro__hero-img { height: 380px; }
    }
    @media (min-width: 1024px) {
      .browse-intro__hero-img { height: 480px; }
    }
    .browse-intro__hero-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 35%;
    }
    
    /* Text band beneath image */
    .browse-intro__text {
      border-top: 1px solid var(--color-border);
      display: grid;
      grid-template-columns: 1fr;
    }
    @media (min-width: 768px) {
      .browse-intro__text {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .browse-intro__headline {
      padding: 32px 24px 28px;
      border-bottom: 1px solid var(--color-border);
    }
    @media (min-width: 768px) {
      .browse-intro__headline {
        border-bottom: none;
        border-right: 1px solid var(--color-border);
        padding: 40px 36px;
      }
    }
    
    .browse-intro__h1 {
      font-family: var(--font-display);
      font-weight: 300;
      font-size: clamp(26px, 3.5vw, 48px);
      line-height: 1.08;
      letter-spacing: -0.025em;
      color: var(--color-optical-black);
    }
    
    .browse-intro__side {
      padding: 28px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 24px;
    }
    @media (min-width: 768px) {
      .browse-intro__side { padding: 40px 36px; }
    }
    
    .browse-intro__body {
      font-size: 13px;
      line-height: 1.7;
      color: var(--color-anodized-stone);
      max-width: 360px;
    }
    
    .browse-intro__link {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-optical-black);
      border: 1px solid var(--color-optical-black);
      padding: 9px 16px;
      background: transparent;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      align-self: flex-start;
    }
    .browse-intro__link:hover {
      background: var(--color-optical-black);
      color: var(--bg-primary);
    }
    
    /* ── Product grid ────────────────────────────── */
    .grid-section {
      border-bottom: 1px solid var(--color-border);
    }
    
    /* Analogue Shop-style product grid: flush to edges, 1px gaps between cells */
    .pGrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
    }
    @media (min-width: 640px) {
      .pGrid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (min-width: 1024px) {
      .pGrid { grid-template-columns: repeat(4, 1fr); }
    }
    
    /* Grid cells have a top border */
    .pGrid .pcard {
      border-top: 1px solid var(--color-border);
    }
    
    /* Remove right border from last in each row */
    @media (max-width: 639px) {
      .pGrid .pcard:nth-child(2n) { border-right: none; }
    }
    @media (min-width: 640px) and (max-width: 1023px) {
      .pGrid .pcard:nth-child(3n) { border-right: none; }
    }
    @media (min-width: 1024px) {
      .pGrid .pcard:nth-child(4n) { border-right: none; }
    }
    
    /* ── Footer ──────────────────────────────────── */
    .site-footer {
      display: grid;
      grid-template-columns: 1fr;
      border-top: 1px solid var(--color-border);
    }
    @media (min-width: 768px) {
      .site-footer { grid-template-columns: 1fr 1fr; }
    }
    
    .footer-left {
      padding: 40px 24px;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    @media (min-width: 768px) {
      .footer-left {
        border-bottom: none;
        border-right: 1px solid var(--color-border);
        padding: 48px 36px;
      }
    }
    
    .footer-logo {
      font-family: var(--font-utility);
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-optical-black);
    }
    .footer-tagline {
      font-size: 12px;
      line-height: 1.7;
      color: var(--color-anodized-stone);
      max-width: 280px;
    }
    .footer-copy {
      font-family: var(--font-utility);
      font-size: 8px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-titanium-fog);
      margin-top: auto;
    }
    
    .footer-right {
      padding: 40px 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
    }
    @media (min-width: 768px) {
      .footer-right { padding: 48px 36px; }
    }
    
    .footer-link-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .footer-link-group:first-child {
      border-right: 1px solid var(--color-border);
      padding-right: 24px;
      margin-right: 24px;
    }
    
    .footer-group-label {
      font-family: var(--font-utility);
      font-size: 8px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      margin-bottom: 4px;
    }
    
    .footer-link {
      font-size: 12px;
      color: var(--color-optical-black);
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      text-align: left;
      transition: color 0.15s;
    }
    .footer-link:hover { color: var(--color-anodized-stone); }
    
    /* Table for info sheet */
    .vtable {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .vtable th, .vtable td {
      padding: 10px 8px;
      border-bottom: 1px solid var(--color-border);
      text-align: left;
    }
    .vtable th { color: var(--color-anodized-stone); font-weight: 400; font-size: 11px; }
  `;
  page.appendChild(style);
  
  // ── 1. Announcement band ────────────────────────
  const announce = document.createElement('div');
  announce.className = 'announce-band';
  announce.textContent = 'Browse freely. Verify only when you\'re ready to rent or list.';
  page.appendChild(announce);
  
  // ── 2. Browse intro ─────────────────────────────
  const intro = document.createElement('section');
  intro.className = 'browse-intro';
  intro.setAttribute('aria-label', 'Introduction');
  
  const heroImg = document.createElement('div');
  heroImg.className = 'browse-intro__hero-img';
  heroImg.innerHTML = `<img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1600" alt="Precision optical equipment" loading="eager">`;
  
  const textBand = document.createElement('div');
  textBand.className = 'browse-intro__text';
  
  const headlineCol = document.createElement('div');
  headlineCol.className = 'browse-intro__headline';
  headlineCol.innerHTML = `<h1 class="browse-intro__h1">A showroom for precision equipment.</h1>`;
  
  const sideCol = document.createElement('div');
  sideCol.className = 'browse-intro__side';
  
  const body = document.createElement('p');
  body.className = 'browse-intro__body';
  body.textContent = 'Cameras, drones, and gear are available to borrow. Browse the full collection freely. Verification takes two minutes and is requested only when you choose to rent or list.';
  
  const disclosureBtn = document.createElement('button');
  disclosureBtn.className = 'browse-intro__link';
  disclosureBtn.innerHTML = 'Verification schedule →';

  const scheduleContainer = document.createElement('div');
  scheduleContainer.className = 'browse-intro__schedule';
  scheduleContainer.style.maxHeight = '0px';
  scheduleContainer.style.overflow = 'hidden';
  scheduleContainer.style.transition = 'max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), margin-top 0.25s';
  scheduleContainer.style.marginTop = '0px';
  scheduleContainer.innerHTML = `
    <div style="padding: var(--space-3) 0; display: flex; flex-direction: column; gap: 8px;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--color-border); padding-bottom: 6px; font-family: var(--font-utility); font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-anodized-stone);">
        <span>Action</span>
        <span>Requirement</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; font-size: 13px; color: var(--color-optical-black); opacity: 0.85;">
        <span>Browse freely</span>
        <span>No verification</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; font-size: 13px; color: var(--color-optical-black); opacity: 0.85;">
        <span>Save items</span>
        <span>No verification</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; font-size: 13px; color: var(--color-optical-black); opacity: 0.85;">
        <span>Rent an item</span>
        <span>Phone + ID + Selfie (T1)</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; font-size: 13px; color: var(--color-optical-black); opacity: 0.85;">
        <span>List standard item</span>
        <span>Address + Payout (T2)</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; font-size: 13px; color: var(--color-optical-black); opacity: 0.85;">
        <span>List high-value item</span>
        <span>Enhanced Review (T3)</span>
      </div>
    </div>
  `;

  let isOpen = false;
  disclosureBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      disclosureBtn.innerHTML = 'Verification schedule ↓';
      scheduleContainer.style.maxHeight = '240px';
      scheduleContainer.style.marginTop = '12px';
    } else {
      disclosureBtn.innerHTML = 'Verification schedule →';
      scheduleContainer.style.maxHeight = '0px';
      scheduleContainer.style.marginTop = '0px';
    }
  });
  
  sideCol.appendChild(body);
  sideCol.appendChild(disclosureBtn);
  sideCol.appendChild(scheduleContainer);
  textBand.appendChild(headlineCol);
  textBand.appendChild(sideCol);
  
  intro.appendChild(heroImg);
  intro.appendChild(textBand);
  page.appendChild(intro);
  
  // ── 3. Category nav ──────────────────────────────
  const catNav = createCategoryNav();
  page.appendChild(catNav);
  
  // ── 4. Listings: featured + grid ─────────────────
  const gridSection = document.createElement('section');
  gridSection.className = 'grid-section';
  gridSection.setAttribute('aria-label', 'Listings');
  
  const featuredWrap = document.createElement('div');
  const gridWrap = document.createElement('div');
  gridWrap.className = 'pGrid';
  
  gridSection.appendChild(featuredWrap);
  gridSection.appendChild(gridWrap);
  page.appendChild(gridSection);
  
  // ── 5. Footer ────────────────────────────────────
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  
  const footerLeft = document.createElement('div');
  footerLeft.className = 'footer-left';
  footerLeft.innerHTML = `
    <div class="footer-logo">Platform</div>
    <p class="footer-tagline">A curated showroom for precision equipment. Cameras, drones, and gear are available to borrow.</p>
    <div class="footer-copy">© 2026 Platform. All rights reserved.</div>
  `;
  
  const footerRight = document.createElement('div');
  footerRight.className = 'footer-right';
  
  const linkGroups = [
    {
      label: 'Platform',
      links: [
        { label: 'How it Works', body: '<p>Browse freely. When you decide to rent or list, verification takes about 2 minutes via phone confirmation and identity check.</p>' },
        { label: 'Insurance Coverage', body: '<p>All transactions are backed by equipment damage protection to protect owners against accidental damage or loss during a rental period.</p>' },
        { label: 'List an Item', body: '<p>Earn from precision equipment sitting in your cabinet. Set your own pricing, availability and conditions.</p>' },
      ]
    },
    {
      label: 'Legal',
      links: [
        { label: 'Privacy Policy', body: '<p>Personal data is encrypted, never sold, and deleted according to GDPR. Government IDs are purged 30 days post-rental.</p>' },
        { label: 'Terms of Service', body: '<p>By using the platform you agree to handle all listed items with care, complete verification requirements, and follow our rental protocol.</p>' },
        { label: 'Help & Support', body: '<p>Support is available 24 hours a day via email. Response time is typically under 2 hours for active rentals.</p>' },
      ]
    }
  ];
  
  linkGroups.forEach(group => {
    const g = document.createElement('div');
    g.className = 'footer-link-group';
    g.innerHTML = `<div class="footer-group-label">${group.label}</div>`;
    group.links.forEach(lnk => {
      const btn = document.createElement('button');
      btn.className = 'footer-link';
      btn.textContent = lnk.label;
      btn.addEventListener('click', () => {
        const node = document.createElement('div');
        node.style.cssText = 'font-size:13px;line-height:1.7;color:rgba(3,3,3,0.75);';
        node.innerHTML = lnk.body;
        InfoSheet.open({ title:lnk.label, contentNode: node });
      });
      g.appendChild(btn);
    });
    footerRight.appendChild(g);
  });
  
  footer.appendChild(footerLeft);
  footer.appendChild(footerRight);
  page.appendChild(footer);
  
  // ── Render helpers ───────────────────────────────
  const renderListings = items => {
    featuredWrap.innerHTML = '';
    gridWrap.innerHTML = '';
    
    if (!items.length) {
      featuredWrap.innerHTML = `<p style="padding:40px 24px;font-size:13px;color:var(--color-anodized-stone)">No items in this category.</p>`;
      return;
    }
    
    // First item: editorial hero card
    featuredWrap.appendChild(createHeroCard(items[0]));
    
    // Remaining items: flush grid
    items.slice(1).forEach(item => {
      gridWrap.appendChild(createItemCard(item));
    });
  };
  
  renderListings(mockListings);
  
  catNav.addEventListener('category-change', e => {
    const cat = e.detail;
    renderListings(cat === 'All' ? mockListings : mockListings.filter(i => i.category === cat));
  });
  
  return page;
}
