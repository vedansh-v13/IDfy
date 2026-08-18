import { ICONS } from '../icons.js';
import { state } from '../main.js';
import { InfoSheet } from './InfoSheet.js';

const DESCRIPTIONS = {
  '1': 'Medium format, 100 MP back-illuminated sensor. Milled from a single block of aluminum, engineered in Sweden.',
  '2': 'Full-frame rangefinder. Manufactured by hand in Wetzlar, Germany. 60 MP triple resolution sensor.',
  '3': 'Cinema-grade aerial. Full-frame 8K gimbal camera, advanced obstacle sensing, precision RTK.',
  '4': 'World\'s smallest full-frame sensor camera. Modular system, L-mount, Leica glass compatible.'
};

export function createHeroCard(item) {
  const card = document.createElement('article');
  card.className = 'hero';
  
  const style = document.createElement('style');
  style.textContent = `
    /* ── Featured editorial layout ──────────────────── */
    .hero {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid var(--color-border);
      cursor: pointer;
    }
    
    /* Full-width image, landscape on mobile */
    .hero__img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 4/3;
      overflow: hidden;
      background: #e0ddd7;
    }
    
    @media (min-width: 768px) {
      .hero {
        flex-direction: row;
      }
      .hero__img-wrap {
        width: 60%;
        aspect-ratio: unset;
        /* height follows row */
        min-height: 420px;
      }
    }
    
    .hero__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .hero:hover .hero__img { transform: scale(1.025); }
    
    /* Tag overlay */
    .hero__tag {
      position: absolute;
      top: 0;
      left: 0;
      font-family: var(--font-utility);
      font-size: 8px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(247,247,247,0.9);
      background: rgba(3,3,3,0.5);
      padding: 5px 10px;
    }
    
    /* Save */
    .hero__save {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 5;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(247,247,247,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      color: var(--color-optical-black);
    }
    .hero__save svg { width: 15px; height: 15px; }
    .hero__save:hover { background: #fff; }
    
    /* Text side */
    .hero__body {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px 20px;
      border-top: 1px solid var(--color-border);
    }
    
    @media (min-width: 768px) {
      .hero__body {
        width: 40%;
        padding: 40px 36px;
        border-top: none;
        border-left: 1px solid var(--color-border);
      }
    }
    
    .hero__label {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      margin-bottom: 12px;
    }
    
    .hero__title {
      font-family: var(--font-display);
      font-weight: 300;
      font-size: clamp(28px, 4vw, 44px);
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: var(--color-optical-black);
      margin-bottom: 16px;
    }
    
    .hero__desc {
      font-size: 12px;
      line-height: 1.65;
      color: var(--color-anodized-stone);
      margin-bottom: 20px;
      max-width: 340px;
    }
    
    .hero__price-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      border-top: 1px solid var(--color-border);
      padding-top: 14px;
      margin-bottom: 16px;
    }
    
    .hero__price {
      font-size: 13px;
      color: var(--color-optical-black);
    }
    
    .hero__meta {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.08em;
      color: var(--color-anodized-stone);
    }
    
    .hero__cta {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-optical-black);
      border: 1px solid var(--color-optical-black);
      padding: 10px 18px;
      background: transparent;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.15s, color 0.15s;
      align-self: flex-start;
    }
    .hero__cta:hover {
      background: var(--color-optical-black);
      color: var(--bg-primary);
    }
  `;
  card.appendChild(style);
  
  const desc = DESCRIPTIONS[item.id] || '';
  
  card.innerHTML += `
    <div class="hero__img-wrap">
      <span class="hero__tag">Featured · ${item.category}</span>
      <img src="${item.imageUrl}" alt="${item.title}" class="hero__img" loading="eager">
      <button class="hero__save" aria-label="Save">${ICONS.heartOutline}</button>
    </div>
    <div class="hero__body">
      <div class="hero__label">${item.category}</div>
      <h2 class="hero__title">${item.title}</h2>
      <p class="hero__desc">${desc}</p>
      <div class="hero__price-row">
        <span class="hero__price">₹${item.pricePerDay.toLocaleString('en-IN')} / day</span>
        <span class="hero__meta">${item.rentalsCompleted} Rentals Completed</span>
      </div>
      <button class="hero__cta">View details →</button>
    </div>
  `;
  
  card.addEventListener('click', e => {
    if (e.target.closest('.hero__save')) return;
    window.location.hash = `#/item/${item.id}`;
  });
  
  const saveBtn = card.querySelector('.hero__save');
  saveBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (!state.isAuthenticated) {
      const c = document.createElement('div');
      c.innerHTML = '<p>Sign in to save items.</p>';
      InfoSheet.open({ title: 'Account required', contentNode: c });
    } else {
      const saved = saveBtn.classList.toggle('saved');
      saveBtn.innerHTML = saved ? ICONS.heartFilled : ICONS.heartOutline;
    }
  });
  
  return card;
}
