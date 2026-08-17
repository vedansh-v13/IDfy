export function createCategoryNav() {
  const container = document.createElement('nav');
  container.className = 'cat-nav';
  
  const style = document.createElement('style');
  style.textContent = `
    .cat-nav {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--color-border);
      display: flex;
    }
    .cat-nav::-webkit-scrollbar { display: none; }
    
    .cat-btn {
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.01em;
      color: var(--color-anodized-stone);
      white-space: nowrap;
      padding: 13px 20px;
      border-right: 1px solid var(--color-border);
      border-bottom: 2px solid transparent;
      cursor: pointer;
      background: transparent;
      transition: color 0.15s, border-bottom-color 0.15s;
      flex-shrink: 0;
    }
    .cat-btn:first-child { border-left: none; }
    .cat-btn.active {
      color: var(--color-optical-black);
      border-bottom-color: var(--color-optical-black);
      font-weight: 600;
    }
    .cat-btn:hover:not(.active) { color: var(--color-optical-black); }
  `;
  container.appendChild(style);
  
  const cats = ['All', 'Cameras', 'Lenses', 'Drones', 'Clothing', 'Studio', 'Gaming', 'Outdoor'];
  let active = 0;
  
  cats.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = `cat-btn${i === active ? ' active' : ''}`;
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      container.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      container.dispatchEvent(new CustomEvent('category-change', { detail: cat }));
    });
    container.appendChild(btn);
  });
  
  return container;
}
