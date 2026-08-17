export function renderVerificationGatePage(tier) {
  const el = document.createElement('div');
  el.dataset.page = 'VerificationGatePage';
  el.innerHTML = `<main style="padding: var(--space-4);"><h1 class="display-l">Verification Gate</h1><p class="utility">TIER: ${tier}</p></main>`;
  return el;
}
