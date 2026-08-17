export function renderHighValueReview() {
  const el = document.createElement('div');
  el.dataset.page = 'HighValueReview';
  el.innerHTML = `<main style="padding: var(--space-4);"><h1 class="display-l">High-Value Listing Review</h1></main>`;
  return el;
}
