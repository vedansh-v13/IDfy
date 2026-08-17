import { initRouter } from './router.js';
import { setupHeader } from './components/Header.js';
import { setupBottomNav } from './components/BottomNav.js';
import { VerificationGate } from './components/VerificationGate.js';
import { InfoSheet } from './components/InfoSheet.js';

export const state = {
  tier: 0,
  isAuthenticated: false,
};

function bootstrap() {
  // Initialize singleton components
  VerificationGate.init();
  InfoSheet.init();

  // Create app shell layout
  const app = document.getElementById('app');
  
  const header = setupHeader();
  app.appendChild(header);

  const main = document.createElement('main');
  main.id = 'router-view';
  main.style.flex = '1';
  main.style.paddingBottom = '56px'; // space for flat bottom nav
  app.appendChild(main);

  const bottomNav = setupBottomNav();
  app.appendChild(bottomNav);

  // Init router which mounts to #router-view
  initRouter(main);
}

document.addEventListener('DOMContentLoaded', bootstrap);
