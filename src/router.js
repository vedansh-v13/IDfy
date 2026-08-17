import { renderMarketplaceHome } from './pages/MarketplaceHome.js';
import { renderItemDetails } from './pages/ItemDetails.js';
import { renderVerificationGatePage } from './pages/VerificationGatePage.js';
import { renderIdentityVerification } from './pages/IdentityVerification.js';
import { renderDocumentFailure } from './pages/DocumentFailure.js';
import { renderVerificationProgress } from './pages/VerificationProgress.js';
import { renderHighValueReview } from './pages/HighValueReview.js';
import { renderListAnItem } from './pages/ListAnItem.js';

const routes = {
  '/': renderMarketplaceHome,
  '/item/:id': renderItemDetails,
  '/verify/:tier': renderVerificationGatePage,
  '/identity': renderIdentityVerification,
  '/capture-failure': renderDocumentFailure,
  '/verification-progress': renderVerificationProgress,
  '/listing-review': renderHighValueReview,
  '/list': renderListAnItem,
};

function matchRoute(hash) {
  const path = hash.replace(/^#/, '') || '/';
  
  for (const [routePattern, handler] of Object.entries(routes)) {
    const regexPattern = routePattern.replace(/:\w+/g, '([^/]+)');
    const regex = new RegExp(`^${regexPattern}$`);
    const match = path.match(regex);
    
    if (match) {
      const params = match.slice(1);
      return { handler, params };
    }
  }
  
  return { handler: renderMarketplaceHome, params: [] }; // Fallback
}

export function initRouter(mountNode) {
  function handleRouteChange() {
    const hash = window.location.hash;
    const { handler, params } = matchRoute(hash);
    mountNode.innerHTML = '';
    const pageNode = handler(...params);
    mountNode.appendChild(pageNode);
    window.scrollTo(0, 0);

    // Toggle bottom navigation (.bot-nav) visibility
    const botNav = document.querySelector('.bot-nav');
    if (botNav) {
      if (hash.startsWith('#/item/') || hash.startsWith('#/verify/') || hash.startsWith('#/identity')) {
        botNav.style.display = 'none';
        mountNode.style.paddingBottom = '0px';
      } else {
        botNav.style.display = '';
        mountNode.style.paddingBottom = '56px';
      }
    }
  }

  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange(); // initial load
}
