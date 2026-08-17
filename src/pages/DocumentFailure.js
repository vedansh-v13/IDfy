export function renderDocumentFailure() {
  const el = document.createElement('div');
  el.dataset.page = 'DocumentFailure';
  el.innerHTML = `<main style="padding: var(--space-4);"><h1 class="display-l">Document Capture Failure</h1></main>`;
  return el;
}
