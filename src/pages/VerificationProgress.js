export function renderVerificationProgress() {
  const el = document.createElement('div');
  el.dataset.page = 'VerificationProgress';
  el.innerHTML = `<main style="padding: var(--space-4);"><h1 class="display-l">Verification In Progress</h1></main>`;
  return el;
}
