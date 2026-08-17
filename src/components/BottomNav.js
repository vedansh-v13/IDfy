import { ICONS } from '../icons.js';
import { state } from '../main.js';

export function setupBottomNav() {
  const nav = document.createElement('nav');
  nav.className = 'bot-nav';
  
  const style = document.createElement('style');
  style.textContent = `
    /* Analogue Shop inspired: fixed bar at bottom with top border */
    .bot-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--bg-primary);
      border-top: 1px solid var(--color-border);
      display: flex;
      z-index: 90;
      height: 56px;
    }
    
    .bot-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      color: var(--color-anodized-stone);
      text-decoration: none;
      border-right: 1px solid var(--color-border);
      transition: color 0.15s, background-color 0.15s;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .bot-item:last-child { border-right: none; }
    .bot-item.active {
      color: var(--color-optical-black);
      background: rgba(3,3,3,0.025);
    }
    
    /* Active dot — thin 1px line at top of the tab, Analogue-style */
    .bot-item.active::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--color-optical-black);
    }
    
    .bot-label {
      font-family: var(--font-utility);
      font-size: 8px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      line-height: 1;
    }
    
    /* Hide on desktop */
    @media (min-width: 1024px) {
      .bot-nav { display: none; }
    }
  `;
  nav.appendChild(style);
  
  const items = [
    { label: 'Home',     icon: ICONS.house,       hash: '#/' },
    { label: 'Explore',  icon: ICONS.compass,     hash: '#/explore' },
    { label: 'Saved',    icon: ICONS.bookmark,    hash: '#/saved',    auth: true },
    { label: 'Messages', icon: ICONS.messageSquare, hash: '#/messages', auth: true },
    { label: 'Account',  icon: ICONS.circleUser,  hash: '#/account' },
  ];
  
  const currentHash = window.location.hash || '#/';
  
  items.forEach(item => {
    const el = document.createElement('a');
    el.href = item.hash;
    el.className = `bot-item${item.hash === currentHash ? ' active' : ''}`;
    el.innerHTML = `${item.icon}<span class="bot-label">${item.label}</span>`;
    
    if (item.auth) {
      el.addEventListener('click', e => {
        if (!state.isAuthenticated) {
          e.preventDefault();
        }
      });
    }
    
    nav.appendChild(el);
  });
  
  return nav;
}
