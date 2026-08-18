import { state } from '../main.js';
import { InfoSheet } from './InfoSheet.js';

const TIER_LABELS = {
  0: 'GUEST',
  1: 'RENTER',
  2: 'VERIFIED',
  3: 'TRUSTED'
};

export function createTierIndicator() {
  const el = document.createElement('button');
  el.className = 'tier-badge';
  
  const style = document.createElement('style');
  style.textContent = `
    .tier-badge {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      background: transparent;
      border: 1px solid var(--color-border);
      padding: 6px 12px;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
      white-space: nowrap;
    }
    .tier-badge:hover {
      border-color: var(--color-optical-black);
      color: var(--color-optical-black);
    }
    
    /* InfoSheet sections */
    .tier-info-section { margin-bottom: 24px; }
    .tier-info-section h4 {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      margin-bottom: 8px;
    }
    .tier-info-section p, .tier-info-section li {
      font-size: 13px;
      line-height: 1.65;
      color: var(--color-optical-black);
      opacity: 0.75;
    }
    .tier-info-section ul { padding-left: 16px; margin-top: 6px; }
    .tier-info-section li { margin-bottom: 6px; }
  `;
  el.appendChild(style);

  const textSpan = document.createElement('span');
  el.appendChild(textSpan);
  
  const update = () => {
    const tier = state.tier;
    const label = TIER_LABELS[tier] || 'GUEST';
    textSpan.textContent = `[ T${tier} // ${label} ]`;
    el.setAttribute('aria-label', `Verification Status Clearance level: T${tier} ${label}`);
  };
  
  el.addEventListener('click', e => {
    e.stopPropagation();
    const node = document.createElement('div');
    node.innerHTML = `
      <div class="tier-info-section">
        <h4>Current Status</h4>
        <p>You're browsing with <strong>Guest Access (T0)</strong>. All listings, categories and item details are freely visible. No verification required to explore.</p>
      </div>
      <div class="tier-info-section">
        <h4>Why we verify</h4>
        <p>Precision equipment passes between people who may not know each other. Verification confirms real accountability before any physical exchange.</p>
      </div>
      <div class="tier-info-section">
        <h4>When it's requested</h4>
        <ul>
          <li><strong>Tier 1 (Renter)</strong>: Phone number verification to initiate rental requests.</li>
          <li><strong>Tier 2 (Verified)</strong>: Government ID and selfie match for standard rentals.</li>
          <li><strong>Tier 3 (Trusted)</strong>: Enhanced screening for high-value listings.</li>
        </ul>
      </div>
      <div class="tier-info-section">
        <h4>Privacy</h4>
        <p>Documents are encrypted and never shared. IDs are deleted 30 days after the rental ends.</p>
      </div>
    `;
    InfoSheet.open({ title: 'How verification works', contentNode: node });
  });
  
  update();
  document.addEventListener('tier-changed', update);
  return el;
}
