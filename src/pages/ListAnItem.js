import { VerificationGate } from '../components/VerificationGate.js';
import { InfoSheet } from '../components/InfoSheet.js';
import { state } from '../main.js';

// Transient local store to preserve state when page renders/remounts
let formState = {
  title: '',
  price: '',
  description: '',
  isHighValue: false
};

export function renderListAnItem() {
  const container = document.createElement('div');
  container.className = 'list-page-container';
  
  const style = document.createElement('style');
  style.textContent = `
    .list-page {
      background: var(--bg-primary);
      padding: 32px 16px 80px;
      max-width: 600px;
      margin: 0 auto;
    }
    @media (min-width: 768px) {
      .list-page { padding: 48px 24px 100px; }
    }
    
    .list-title {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 300;
      letter-spacing: -0.02em;
      color: var(--color-optical-black);
      margin-bottom: 8px;
    }
    
    .list-subtitle {
      font-size: 13px;
      color: var(--color-anodized-stone);
      margin-bottom: 32px;
    }
    
    .list-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .form-label {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
    }
    
    .form-input, .form-textarea {
      border: 1px solid var(--color-border);
      background: transparent;
      padding: 12px 16px;
      font-family: var(--font-body);
      font-size: 14px;
      color: var(--color-optical-black);
      outline: none;
      transition: border-color 0.15s;
    }
    .form-input:focus, .form-textarea:focus {
      border-color: var(--color-optical-black);
    }
    
    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }
    
    .toggle-group {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 13px;
      color: var(--color-optical-black);
    }
    
    .toggle-checkbox {
      width: 16px; height: 16px;
      accent-color: var(--color-optical-black);
    }
    
    .publish-btn {
      font-family: var(--font-utility);
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: var(--color-optical-black);
      color: var(--bg-primary);
      padding: 14px 24px;
      text-align: center;
      margin-top: 16px;
      cursor: pointer;
      transition: background 0.15s;
    }
    .publish-btn:hover { background: #333; }
  `;
  container.appendChild(style);

  const main = document.createElement('main');
  main.className = 'list-page';
  
  main.innerHTML = `
    <h1 class="list-title">List an Item</h1>
    <p class="list-subtitle">Details of your precision object to share with the showroom.</p>
    
    <form class="list-form" onsubmit="return false;">
      <div class="form-group">
        <label class="form-label" for="l-title">Item Name</label>
        <input type="text" id="l-title" class="form-input" placeholder="e.g. Leica Q3" value="${formState.title}">
      </div>
      
      <div class="form-group">
        <label class="form-label" for="l-price">Daily Rental Price ($)</label>
        <input type="number" id="l-price" class="form-input" placeholder="e.g. 120" value="${formState.price}">
      </div>
      
      <div class="form-group">
        <label class="form-label" for="l-desc">Description</label>
        <textarea id="l-desc" class="form-textarea" placeholder="Include item condition, inclusions, and specific requirements...">${formState.description}</textarea>
      </div>
      
      <label class="toggle-group">
        <input type="checkbox" id="l-high" class="toggle-checkbox" ${formState.isHighValue ? 'checked' : ''}>
        <span>Mark this as a high-value listing manually</span>
      </label>
      
      <button type="submit" class="publish-btn">Publish Listing</button>
    </form>
  `;
  
  container.appendChild(main);

  // Bind input syncs to preserve state
  const titleIn = main.querySelector('#l-title');
  const priceIn = main.querySelector('#l-price');
  const descIn = main.querySelector('#l-desc');
  const highIn = main.querySelector('#l-high');

  titleIn.addEventListener('input', () => formState.title = titleIn.value);
  descIn.addEventListener('input', () => formState.description = descIn.value);
  
  priceIn.addEventListener('input', () => {
    formState.price = priceIn.value;
    // Auto toggle high value if price > 400
    if (parseFloat(priceIn.value) > 400) {
      highIn.checked = true;
      formState.isHighValue = true;
    }
  });

  highIn.addEventListener('change', () => formState.isHighValue = highIn.checked);

  // Submit flow
  main.querySelector('.publish-btn').addEventListener('click', () => {
    if (!titleIn.value || !priceIn.value) {
      const node = document.createElement('div');
      node.innerHTML = '<p>Please enter an item name and daily rental rate to publish.</p>';
      InfoSheet.open({ title: 'Missing Information', contentNode: node });
      return;
    }

    const tierToTrigger = formState.isHighValue || parseFloat(priceIn.value) > 400 ? 3 : 2;

    if (state.tier >= tierToTrigger) {
      const node = document.createElement('div');
      node.innerHTML = `<p>Your listing <strong>${formState.title}</strong> has been successfully published!</p>`;
      InfoSheet.open({ title: 'Listing Published', contentNode: node });

      // Reset form state on successful publish
      formState = { title: '', price: '', description: '', isHighValue: false };
      titleIn.value = '';
      priceIn.value = '';
      descIn.value = '';
      highIn.checked = false;
      return;
    }

    VerificationGate.open({
      tier: tierToTrigger,
      onConfirm: () => {
        state.activeVerificationTier = tierToTrigger;
        window.location.hash = '#/identity';
      },
      onDismiss: () => {
        // Just closes the gate, inputs are preserved
      }
    });
  });

  return container;
}
