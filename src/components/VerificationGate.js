const TIER_COPY = {
  1: {
    title: 'Verify before renting',
    intro: 'Renting involves two people exchanging a valuable item. Identity verification confirms that every renter is a real, accountable person before a rental request is submitted.',
    why: 'Identity verification helps reduce fraud and gives item owners confidence before accepting a rental request.',
    what: 'Government-issued ID, Selfie for identity matching',
    how: 'Verification usually takes a few minutes. Your rental request is submitted only after verification is completed successfully.',
    cta: 'Continue to Verification'
  },
  2: {
    title: 'Verify before listing',
    intro: 'Listing an item means receiving rental requests and payouts. Additional verification is required before your listing can be published.',
    why: 'Address and payout verification help ensure renters know who they are renting from and where rental payments should be sent.',
    what: 'Government-issued ID, Selfie, Address verification, Bank or payout details',
    how: 'Once verification is complete, your listing becomes eligible to appear in the marketplace.',
    cta: 'Continue'
  },
  3: {
    title: 'Additional verification required',
    intro: 'This item requires an additional review because of its value.',
    why: 'Higher-value items carry greater financial risk. Enhanced verification helps reduce fraud before the listing becomes visible to renters.',
    what: 'Confirmation of previous verification, Proof of ownership (where applicable), Additional review information',
    how: 'Your submission is reviewed before the listing is published. You\'ll be notified once the review is complete.',
    cta: 'Start Review'
  }
};

export const VerificationGate = {
  init() {
    if (document.getElementById('verification-gate-root')) return;

    this.root = document.createElement('div');
    this.root.id = 'verification-gate-root';
    this.root.style.display = 'none';

    const style = document.createElement('style');
    style.textContent = `
      #verification-gate-root {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: none;
      }
      #verification-gate-root.is-active {
        display: block;
      }
      
      .gate-scrim {
        position: absolute;
        inset: 0;
        background: rgba(3,3,3,0.4);
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      #verification-gate-root.is-open .gate-scrim {
        opacity: 1;
      }
      
      .gate-panel {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        background: var(--bg-primary);
        border-top: 1px solid var(--color-border);
        padding: 24px 20px calc(32px + env(safe-area-inset-bottom));
        transform: translate3d(0, 100%, 0);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        max-height: 92dvh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      }
      #verification-gate-root.is-open .gate-panel {
        transform: translate3d(0, 0, 0);
      }
      
      .gate-handle-area {
        width: 100%;
        padding: 8px 0 16px;
        display: flex;
        justify-content: center;
        cursor: grab;
      }
      .gate-handle {
        width: 36px;
        height: 4px;
        background: var(--color-border);
      }
      
      /* Close button */
      .gate-close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-optical-black);
        cursor: pointer;
      }
      
      /* Typography */
      .gate-title {
        font-family: var(--font-display);
        font-size: 26px;
        font-weight: 300;
        line-height: 1.15;
        letter-spacing: -0.01em;
        color: var(--color-optical-black);
        margin-bottom: 16px;
        padding-right: 32px;
      }
      .gate-intro {
        font-size: 13px;
        line-height: 1.65;
        color: var(--color-anodized-stone);
        margin-bottom: 28px;
      }
      
      /* Info Sections: WHY -> WHAT -> HOW */
      .gate-info-stack {
        display: flex;
        flex-direction: column;
        gap: 0;
        border-top: 1px solid var(--color-border);
        margin-bottom: 28px;
      }
      .gate-section-block {
        border-bottom: 1px solid var(--color-border);
        padding: 16px 0;
      }
      .gate-section-label {
        font-family: var(--font-utility);
        font-size: 8px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--color-anodized-stone);
        margin-bottom: 6px;
      }
      .gate-section-text {
        font-size: 12px;
        line-height: 1.6;
        color: var(--color-optical-black);
        opacity: 0.85;
      }
      
      /* Actions */
      .gate-error-banner {
        background: #fdf0f0;
        border: 1px solid #f5c2c2;
        color: #b91c1c;
        font-size: 12px;
        padding: 12px;
        margin-bottom: 16px;
        line-height: 1.4;
        display: none;
      }
      
      .gate-cta {
        font-family: var(--font-utility);
        font-size: 10px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        background: var(--color-optical-black);
        color: var(--bg-primary);
        padding: 14px 20px;
        text-align: center;
        width: 100%;
        cursor: pointer;
        transition: background 0.15s;
      }
      .gate-cta:hover { background: #333; }
      
      .gate-dismiss {
        font-family: var(--font-utility);
        font-size: 9px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--color-anodized-stone);
        text-align: center;
        margin-top: 16px;
        cursor: pointer;
        align-self: center;
        background: none;
        border: none;
      }
      .gate-dismiss:hover { color: var(--color-optical-black); }

      /* Desktop presentation */
      @media (min-width: 768px) {
        #verification-gate-root.is-active {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gate-panel {
          position: relative;
          bottom: auto; left: auto; right: auto;
          width: 100%;
          max-width: 480px;
          border: 1px solid var(--color-border);
          transform: translate3d(0, 16px, 0);
          opacity: 0;
          transition: transform 0.25s ease, opacity 0.25s ease;
          padding: 40px 36px;
        }
        #verification-gate-root.is-open .gate-panel {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        .gate-handle-area { display: none; }
      }
    `;
    document.head.appendChild(style);

    this.root.innerHTML = `
      <div class="gate-scrim"></div>
      <div class="gate-panel" role="dialog" aria-modal="true">
        <button class="gate-close-btn" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
        <div class="gate-handle-area"><div class="gate-handle"></div></div>
        
        <h2 class="gate-title"></h2>
        <p class="gate-intro"></p>
        
        <div class="gate-info-stack">
          <div class="gate-section-block">
            <div class="gate-section-label">Why</div>
            <div class="gate-section-text gate-why-text"></div>
          </div>
          <div class="gate-section-block">
            <div class="gate-section-label">What</div>
            <div class="gate-section-text gate-what-text"></div>
          </div>
          <div class="gate-section-block">
            <div class="gate-section-label">How</div>
            <div class="gate-section-text gate-how-text"></div>
          </div>
        </div>
        
        <div class="gate-error-banner"></div>
        <button class="gate-cta"></button>
        <button class="gate-dismiss">Not Now</button>
      </div>
    `;

    document.body.appendChild(this.root);

    // Bind event listeners
    this.root.querySelector('.gate-scrim').addEventListener('click', () => this.close());
    this.root.querySelector('.gate-dismiss').addEventListener('click', () => this.close());
    this.root.querySelector('.gate-close-btn').addEventListener('click', () => this.close());

    // Primary CTA listener
    this.root.querySelector('.gate-cta').addEventListener('click', () => {
      const errorBanner = this.root.querySelector('.gate-error-banner');
      errorBanner.style.display = 'none';
      if (this.onConfirmCallback) this.onConfirmCallback();
      this.close(true);
    });

    // Escape key listener for desktop
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.root.classList.contains('is-open')) {
        this.close();
      }
    });

    // Swipe down gesture for mobile
    const panel = this.root.querySelector('.gate-panel');
    const handleArea = this.root.querySelector('.gate-handle-area');
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    handleArea.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY;
      isDragging = true;
      panel.style.transition = 'none';
    });

    handleArea.addEventListener('touchmove', e => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      if (deltaY > 0) {
        panel.style.transform = `translate3d(0, ${deltaY}px, 0)`;
      }
    });

    handleArea.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      panel.style.transition = '';
      const deltaY = currentY - startY;
      if (deltaY > 120) {
        this.close();
      } else {
        panel.style.transform = '';
      }
    });

    this.onConfirmCallback = null;
    this.onDismissCallback = null;
  },

  open({ tier, onConfirm, onDismiss }) {
    this.init();
    
    const copy = TIER_COPY[tier] || TIER_COPY[1];
    
    this.root.querySelector('.gate-title').textContent = copy.title;
    this.root.querySelector('.gate-intro').textContent = copy.intro;
    this.root.querySelector('.gate-why-text').textContent = copy.why;
    this.root.querySelector('.gate-what-text').textContent = copy.what;
    this.root.querySelector('.gate-how-text').textContent = copy.how;
    this.root.querySelector('.gate-cta').textContent = copy.cta;
    
    this.root.querySelector('.gate-error-banner').style.display = 'none';

    this.onConfirmCallback = onConfirm;
    this.onDismissCallback = onDismiss;

    // Show wrapper using display block
    this.root.style.display = 'block';
    this.root.classList.add('is-active');
    
    // Trigger transition in next paint frame
    setTimeout(() => {
      this.root.classList.add('is-open');
    }, 20);
  },

  close(isCtaSuccess = false) {
    this.root.classList.remove('is-open');
    
    if (!isCtaSuccess && this.onDismissCallback) {
      this.onDismissCallback();
    }

    const panel = this.root.querySelector('.gate-panel');
    setTimeout(() => {
      panel.style.transform = '';
      this.root.classList.remove('is-active');
      this.root.style.display = 'none';
    }, 300);
  }
};
