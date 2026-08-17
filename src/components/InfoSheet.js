export const InfoSheet = {
  init() {
    if (document.getElementById('info-sheet-root')) return;
    
    this.root = document.createElement('div');
    this.root.id = 'info-sheet-root';
    this.root.style.display = 'none';

    // Resuses the same CSS as VerificationGate via classes
    this.root.innerHTML = `
      <div class="gate-scrim"></div>
      <div class="gate-panel" role="dialog" aria-modal="true" style="padding-top: var(--space-8)">
        <div class="gate-handle"></div>
        <h2 class="gate-heading display-l" style="margin-bottom: var(--space-4)"></h2>
        <div class="gate-content body-m" style="margin-bottom: var(--space-8)"></div>
        <div class="flex flex-col">
          <button class="gate-cta cta-primary">Got it</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.root);
    
    this.root.querySelector('.gate-scrim').addEventListener('click', () => this.close());
    this.root.querySelector('.gate-cta').addEventListener('click', () => this.close());
  },
  
  open({ title, contentNode }) {
    this.root.style.display = '';
    this.root.offsetHeight; // force reflow
    
    this.root.querySelector('.gate-heading').textContent = title;
    const contentContainer = this.root.querySelector('.gate-content');
    contentContainer.innerHTML = '';
    contentContainer.appendChild(contentNode);
    
    this.root.classList.add('is-open');
  },
  
  close() {
    this.root.classList.remove('is-open');
    setTimeout(() => {
      this.root.style.display = 'none';
    }, 280);
  }
};
