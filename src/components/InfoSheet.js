export const InfoSheet = {
  init() {
    if (document.getElementById('info-sheet-root')) return;
    
    this.root = document.createElement('div');
    this.root.id = 'info-sheet-root';
    this.root.style.display = 'none';

    const style = document.createElement('style');
    style.textContent = `
      #info-sheet-root {
        position: fixed;
        inset: 0;
        z-index: 1100;
        display: none;
      }
      #info-sheet-root.is-active {
        display: block;
      }
      
      #info-sheet-root .gate-scrim {
        position: absolute;
        inset: 0;
        background: rgba(3,3,3,0.4);
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      #info-sheet-root.is-open .gate-scrim {
        opacity: 1;
      }
      
      #info-sheet-root .gate-panel {
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
      #info-sheet-root.is-open .gate-panel {
        transform: translate3d(0, 0, 0);
      }
      
      @media (min-width: 768px) {
        #info-sheet-root.is-active {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #info-sheet-root .gate-panel {
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
        #info-sheet-root.is-open .gate-panel {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    this.root.innerHTML = `
      <div class="gate-scrim"></div>
      <div class="gate-panel" role="dialog" aria-modal="true" style="padding-top: var(--space-8)">
        <h2 class="gate-heading display-l" style="margin-bottom: var(--space-4)"></h2>
        <div class="gate-content body-m" style="margin-bottom: var(--space-8)"></div>
        <div class="flex flex-col">
          <button class="gate-cta cta-primary btn-primary">Got it</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.root);
    
    this.root.querySelector('.gate-scrim').addEventListener('click', () => this.close());
    this.root.querySelector('.gate-cta').addEventListener('click', () => this.close());
  },
  
  open({ title, contentNode }) {
    this.root.style.display = 'block';
    this.root.classList.add('is-active');
    
    this.root.querySelector('.gate-heading').textContent = title;
    const contentContainer = this.root.querySelector('.gate-content');
    contentContainer.innerHTML = '';
    contentContainer.appendChild(contentNode);
    
    setTimeout(() => {
      this.root.classList.add('is-open');
    }, 20);
  },
  
  close() {
    this.root.classList.remove('is-open');
    setTimeout(() => {
      this.root.classList.remove('is-active');
      this.root.style.display = 'none';
    }, 280);
  }
};
