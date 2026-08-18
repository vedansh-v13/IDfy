import { ICONS } from '../icons.js';
import { state } from '../main.js';
import { InfoSheet } from './InfoSheet.js';

export function createItemCard(item, isWide = false) {
  const card = document.createElement('article');
  card.className = `pcard${isWide ? ' pcard--wide' : ''}`;
  card.setAttribute('data-id', item.id);
  
  const style = document.createElement('style');
  style.textContent = `
    .pcard {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      border-right: 1px solid var(--color-border);
    }
    
    /* Portrait image */
    .pcard__img-wrap {
      position: relative;
      aspect-ratio: 2/3;
      overflow: hidden;
      background: #e8e5e0;
    }
    .pcard--wide .pcard__img-wrap {
      aspect-ratio: 4/3;
    }
    .pcard__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
    }
    .pcard:hover .pcard__img { transform: scale(1.04); }
    
    /* Save button */
    .pcard__save {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 5;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(247,247,247,0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
      color: var(--color-optical-black);
    }
    .pcard__save svg { width: 14px; height: 14px; }
    .pcard:hover .pcard__save, .pcard__save.saved { opacity: 1; }
    
    /* Info row — Analogue Shop style: name left, price right, all on one line */
    .pcard__info {
      border-top: 1px solid var(--color-border);
      padding: 10px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .pcard__row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }
    .pcard__name {
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.01em;
      color: var(--color-optical-black);
      line-height: 1.3;
    }
    .pcard__price {
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 400;
      color: var(--color-optical-black);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .pcard__meta {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.08em;
      color: var(--color-anodized-stone);
      margin-top: 2px;
    }
  `;
  card.appendChild(style);
  
  card.innerHTML += `
    <div class="pcard__img-wrap">
      <img src="${item.imageUrl}" alt="${item.title}" class="pcard__img" loading="lazy">
      <button class="pcard__save" aria-label="Save item">${ICONS.heartOutline}</button>
    </div>
    <div class="pcard__info">
      <div class="pcard__row">
        <span class="pcard__name">${item.title}</span>
        <span class="pcard__price">₹${item.pricePerDay.toLocaleString('en-IN')}/day</span>
      </div>
      <div class="pcard__meta">${item.distance} · ${item.rentalsCompleted} Rentals Completed</div>
    </div>
  `;
  
  card.addEventListener('click', e => {
    if (e.target.closest('.pcard__save')) return;
    window.location.hash = `#/item/${item.id}`;
  });
  
  const saveBtn = card.querySelector('.pcard__save');
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
