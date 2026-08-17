import { state } from '../main.js';

export function renderIdentityVerification() {
  const container = document.createElement('div');
  container.className = 'identity-page';

  const style = document.createElement('style');
  style.textContent = `
    .identity-page {
      padding: var(--header-height, 52px) 0 80px 0;
      min-height: 100vh;
      background: var(--bg-primary);
      display: flex;
      flex-direction: column;
    }
    
    .id-header {
      padding: var(--space-4) var(--space-4) var(--space-6);
      border-bottom: 1px solid var(--color-border);
      max-width: var(--verify-max);
      margin: 0 auto;
      width: 100%;
    }
    
    .id-back {
      font-family: var(--font-utility);
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-anodized-stone);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: var(--space-6);
    }
    .id-back:hover { color: var(--color-optical-black); }
    
    .id-title {
      font-family: var(--font-display);
      font-size: var(--text-display-l);
      font-weight: 300;
      line-height: 1.1;
      letter-spacing: -0.01em;
      color: var(--color-optical-black);
      margin-bottom: var(--space-4);
    }
    
    .id-progress {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .id-step-text {
      font-size: 13px;
      color: var(--color-anodized-stone);
    }
    .id-progress-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--color-border);
    }
    .id-progress-bar span {
      font-size: 10px;
    }
    .id-progress-bar .active-dot {
      color: var(--color-optical-black);
    }
    .id-progress-bar .line {
      flex: 1;
      height: 1px;
      background: var(--color-optical-black);
    }
    .id-progress-labels {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .id-progress-labels .active {
      color: var(--color-optical-black);
      font-weight: bold;
    }
    .id-progress-labels .inactive {
      color: var(--color-anodized-stone);
    }
    
    .id-content {
      padding: var(--space-6) var(--space-4);
      max-width: var(--verify-max);
      margin: 0 auto;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .id-explanation {
      font-size: 15px;
      line-height: 1.6;
      color: var(--color-optical-black);
      margin-bottom: var(--space-6);
    }
    
    .id-instruction {
      font-size: 18px;
      font-weight: 500;
      color: var(--color-optical-black);
      margin-bottom: var(--space-3);
    }
    
    .id-examples {
      font-size: 13px;
      color: var(--color-anodized-stone);
      margin-bottom: var(--space-8);
      line-height: 1.6;
    }
    .id-examples ul { padding-left: 16px; margin-top: 4px; }
    
    .id-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: auto;
    }
    
    .btn-primary {
      font-family: var(--font-utility);
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: var(--color-optical-black);
      color: var(--bg-primary);
      padding: 16px 24px;
      text-align: center;
      border: none;
      cursor: pointer;
      width: 100%;
      transition: background 0.15s;
    }
    .btn-primary:hover { background: #333; }
    
    .btn-secondary {
      font-family: var(--font-utility);
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: transparent;
      color: var(--color-optical-black);
      padding: 16px 24px;
      text-align: center;
      border: 1px solid var(--color-border);
      cursor: pointer;
      width: 100%;
      transition: border-color 0.15s;
    }
    .btn-secondary:hover { border-color: var(--color-optical-black); }
    
    /* Camera Simulator Overlay */
    .camera-overlay {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background: rgba(3, 3, 3, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      color: white;
    }
    .camera-header {
      padding: 24px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .camera-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
    }
    .camera-title {
      font-family: var(--font-utility);
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    
    .camera-view {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 20px;
    }
    
    /* Ground glass targeting frame */
    .camera-frame {
      width: 100%;
      max-width: 400px;
      aspect-ratio: 3/2;
      border: 1px solid rgba(255, 255, 255, 0.3);
      position: relative;
    }
    .camera-frame.selfie {
      aspect-ratio: 3/4;
      border-radius: 200px;
    }
    
    /* Tech crop markers */
    .camera-frame::before, .camera-frame::after,
    .camera-frame-inner::before, .camera-frame-inner::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-color: white;
      border-style: solid;
    }
    .camera-frame::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
    .camera-frame::after { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
    
    .camera-frame-inner { position: absolute; inset: 0; pointer-events: none; }
    .camera-frame-inner::before { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
    .camera-frame-inner::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
    
    .camera-instruction {
      position: absolute;
      bottom: -60px;
      left: 0;
      right: 0;
      text-align: center;
      font-family: var(--font-utility);
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.9);
      transition: opacity 0.3s ease;
    }
    
    .camera-controls {
      padding: 40px 20px calc(40px + env(safe-area-inset-bottom));
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .camera-capture-btn {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 4px solid white;
      background: rgba(255,255,255,0.2);
      margin: 0 auto 20px;
      cursor: pointer;
      transition: background 0.15s;
    }
    .camera-capture-btn:active { background: rgba(255,255,255,0.6); }
    
    .camera-fail-btn {
      font-family: var(--font-utility);
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      background: none;
      border: 1px solid rgba(255,255,255,0.3);
      color: rgba(255,255,255,0.7);
      padding: 10px;
      cursor: pointer;
      align-self: center;
    }
    
    /* Previews */
    .preview-box {
      aspect-ratio: 3/2;
      background: var(--color-titanium-fog);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--space-6);
    }
    .preview-box.selfie {
      aspect-ratio: 3/4;
      max-width: 280px;
      margin: 0 auto var(--space-6);
      border-radius: 140px;
    }
    
    /* Failure State */
    .fail-icon {
      margin-bottom: var(--space-4);
      color: #b91c1c;
    }
    .fail-title {
      font-size: 18px;
      font-weight: 500;
      color: var(--color-optical-black);
      margin-bottom: var(--space-2);
    }
    .fail-msg {
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-anodized-stone);
      margin-bottom: var(--space-4);
    }
    .fail-recovery {
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-optical-black);
      padding: 16px;
      background: rgba(3,3,3,0.03);
      margin-bottom: var(--space-8);
      border-left: 2px solid var(--color-optical-black);
    }
    
    /* Processing State */
    .processing-spinner {
      margin: 40px auto;
      width: 40px;
      height: 40px;
      border: 2px solid var(--color-border);
      border-top-color: var(--color-optical-black);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    
    /* Success State */
    .success-icon {
      margin-bottom: var(--space-4);
      color: #059669; /* emerald-600 */
    }
  `;
  container.appendChild(style);

  let currentStep = 'ID_CAPTURE'; // ID_CAPTURE, ID_PREVIEW, ID_FAIL, SELFIE_CAPTURE, SELFIE_PREVIEW, SELFIE_FAIL, PROCESSING, SUCCESS, MANUAL_REVIEW
  let idFailCount = 0;
  let selfieFailCount = 0;
  let failReason = '';
  let failRecovery = '';

  const tier = state.activeVerificationTier || 1;
  
  const explanations = {
    1: 'To submit a rental request, we need to confirm your identity.',
    2: 'Before your listing can be published, we need to confirm your identity.',
    3: 'Before this listing can be reviewed, we need to confirm your identity.'
  };

  const successConfirmations = {
    1: ['Your identity has been confirmed.', 'You can now submit rental requests.'],
    2: ['Your identity has been confirmed.', 'Continue with address verification to publish your listing.'],
    3: ['Your identity has been confirmed.', 'Your listing is ready for enhanced review.']
  };

  const renderHeader = (stepNum) => {
    return `
      <div class="id-header">
        <a href="javascript:history.back()" class="id-back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </a>
        <h1 class="id-title">Verify your identity</h1>
        <div class="id-progress">
          <div class="id-step-text">Step ${stepNum} of 2</div>
          <div class="id-progress-bar">
            <span class="${stepNum === 1 ? 'active-dot' : ''}">●</span>
            <div class="line"></div>
            <span class="${stepNum === 2 ? 'active-dot' : ''}">○</span>
          </div>
          <div class="id-progress-labels">
            <span class="${stepNum === 1 ? 'active' : 'inactive'}">Capture ID</span>
            <span class="${stepNum === 2 ? 'active' : 'inactive'}">Take Selfie</span>
          </div>
        </div>
      </div>
    `;
  };

  const renderContent = () => {
    let html = '';
    if (currentStep === 'ID_CAPTURE') {
      html = `
        ${renderHeader(1)}
        <div class="id-content">
          <div class="id-explanation">${explanations[tier]}</div>
          <div class="id-instruction">Capture the front of your government-issued ID.</div>
          <div class="id-examples">
            Supported examples:
            <ul>
              <li>Driver's License</li>
              <li>Passport</li>
              <li>National ID</li>
            </ul>
          </div>
          <div class="id-actions">
            <button class="btn-primary" id="btn-open-camera">Open Camera</button>
            <button class="btn-secondary">Upload Existing Photo</button>
          </div>
        </div>
      `;
    } else if (currentStep === 'ID_PREVIEW') {
      html = `
        ${renderHeader(1)}
        <div class="id-content">
          <div class="id-instruction">Review your capture</div>
          <div class="preview-box">
            <span style="font-family: var(--font-utility); font-size: 10px; opacity: 0.5;">ID THUMBNAIL</span>
          </div>
          <div class="id-actions">
            <button class="btn-primary" id="btn-continue">Continue</button>
            <button class="btn-secondary" id="btn-retake">Retake</button>
          </div>
        </div>
      `;
    } else if (currentStep === 'ID_FAIL') {
      html = `
        ${renderHeader(1)}
        <div class="id-content">
          <div class="fail-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="fail-title">Capture unsuccessful</div>
          <div class="fail-msg">${failReason}</div>
          <div class="fail-recovery">${failRecovery}</div>
          <div class="id-actions">
            <button class="btn-primary" id="btn-retry">Retry Failed Step</button>
          </div>
        </div>
      `;
    } else if (currentStep === 'SELFIE_CAPTURE') {
      html = `
        ${renderHeader(2)}
        <div class="id-content">
          <div class="id-instruction">Look directly at the camera.</div>
          <div class="id-examples">
            <ul>
              <li>Remove sunglasses or face coverings.</li>
              <li>Ensure your face is fully visible.</li>
            </ul>
          </div>
          <div class="id-actions">
            <button class="btn-primary" id="btn-open-camera">Open Camera</button>
          </div>
        </div>
      `;
    } else if (currentStep === 'SELFIE_PREVIEW') {
      html = `
        ${renderHeader(2)}
        <div class="id-content">
          <div class="id-instruction">Review your selfie</div>
          <div class="preview-box selfie">
            <span style="font-family: var(--font-utility); font-size: 10px; opacity: 0.5;">SELFIE</span>
          </div>
          <div class="id-actions">
            <button class="btn-primary" id="btn-submit">Submit Verification</button>
            <button class="btn-secondary" id="btn-retake">Retake</button>
          </div>
        </div>
      `;
    } else if (currentStep === 'SELFIE_FAIL') {
      html = `
        ${renderHeader(2)}
        <div class="id-content">
          <div class="fail-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="fail-title">Verification unsuccessful</div>
          <div class="fail-msg">${failReason}</div>
          <div class="fail-recovery">${failRecovery}</div>
          <div class="id-actions">
            <button class="btn-primary" id="btn-retry">Retry Failed Step</button>
          </div>
        </div>
      `;
    } else if (currentStep === 'MANUAL_REVIEW') {
      html = `
        <div class="id-header">
          <h1 class="id-title">Manual Review Required</h1>
        </div>
        <div class="id-content">
          <div class="id-explanation">Automatic verification couldn't be completed after multiple attempts.</div>
          <div class="id-actions">
            <button class="btn-primary">Continue with Manual Review</button>
            <button class="btn-secondary" id="btn-reset">Try Another Document</button>
          </div>
        </div>
      `;
    } else if (currentStep === 'PROCESSING') {
      html = `
        <div class="id-header">
          <h1 class="id-title">Checking your identity</h1>
        </div>
        <div class="id-content">
          <div class="processing-spinner"></div>
          <div class="id-explanation" style="text-align: center;">We're confirming that your document is valid and that it matches your selfie.</div>
          <div class="id-examples" style="text-align: center;">Verification usually takes a few minutes. You can safely leave this screen.</div>
          <div class="id-actions">
            <button class="btn-primary" id="btn-return">Return to Item</button>
            <button class="btn-secondary" id="btn-status">View Verification Status</button>
          </div>
        </div>
      `;
    } else if (currentStep === 'SUCCESS') {
      html = `
        <div class="id-header">
          <h1 class="id-title">Identity verification complete</h1>
        </div>
        <div class="id-content">
          <div class="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="id-instruction">${successConfirmations[tier][0]}</div>
          <div class="id-explanation">${successConfirmations[tier][1]}</div>
          <div class="id-actions">
            <button class="btn-primary" id="btn-success-action">
              ${tier === 1 ? 'Return to Rental' : tier === 2 ? 'Continue to Address Verification' : 'Continue to Enhanced Review'}
            </button>
            <button class="btn-secondary">View Verification Details</button>
          </div>
        </div>
      `;
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.innerHTML = html;
    
    // Bind buttons
    const bind = (id, handler) => {
      const el = contentWrapper.querySelector('#' + id);
      if (el) el.addEventListener('click', handler);
    };

    if (currentStep === 'ID_CAPTURE' || currentStep === 'SELFIE_CAPTURE') {
      bind('btn-open-camera', () => openCameraOverlay(currentStep === 'ID_CAPTURE'));
    }
    
    bind('btn-continue', () => { currentStep = 'SELFIE_CAPTURE'; updateView(); });
    bind('btn-retake', () => { updateView(); /* currentStep stays same as before preview, wait, it should go back to capture. */ 
      if (currentStep === 'ID_PREVIEW') currentStep = 'ID_CAPTURE';
      if (currentStep === 'SELFIE_PREVIEW') currentStep = 'SELFIE_CAPTURE';
      updateView();
    });
    
    bind('btn-retry', () => {
      if (currentStep === 'ID_FAIL') currentStep = 'ID_CAPTURE';
      if (currentStep === 'SELFIE_FAIL') currentStep = 'SELFIE_CAPTURE';
      updateView();
    });
    
    bind('btn-reset', () => {
      idFailCount = 0;
      selfieFailCount = 0;
      currentStep = 'ID_CAPTURE';
      updateView();
    });
    
    bind('btn-submit', () => {
      currentStep = 'PROCESSING';
      updateView();
      // Simulate background processing
      setTimeout(() => {
        if (currentStep === 'PROCESSING') {
          currentStep = 'SUCCESS';
          // Update global tier status
          state.tier = tier;
          document.dispatchEvent(new Event('tier-changed'));
          updateView();
        }
      }, 4000);
    });
    
    bind('btn-return', () => {
      // Return to Item
      history.back();
    });
    
    bind('btn-success-action', () => {
      // In a real app, Tier 2/3 would route to their next specific forms.
      // We will just go back for now.
      history.back();
    });

    container.innerHTML = '';
    container.appendChild(style); // preserve styles
    Array.from(contentWrapper.children).forEach(child => container.appendChild(child));
  };

  const openCameraOverlay = (isId) => {
    const overlay = document.createElement('div');
    overlay.className = 'camera-overlay';
    
    const prompts = isId 
      ? ['Move closer', 'Reduce glare', 'Keep entire document inside frame', 'Hold still while capturing...']
      : ['Look at the camera', 'Blink once', 'Slowly turn your head left', 'Slowly turn your head right', 'Hold still...'];
      
    let promptIndex = 0;
    
    overlay.innerHTML = `
      <div class="camera-header">
        <div style="width:32px"></div>
        <div class="camera-title">${isId ? 'Capture ID' : 'Liveness Check'}</div>
        <button class="camera-close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="camera-view">
        <div class="camera-frame ${isId ? '' : 'selfie'}">
          <div class="camera-frame-inner"></div>
          <div class="camera-instruction">${prompts[0]}</div>
        </div>
      </div>
      <div class="camera-controls">
        <button class="camera-capture-btn" title="Manual Capture"></button>
        <button class="camera-fail-btn">Simulate Failure</button>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    const instrEl = overlay.querySelector('.camera-instruction');
    
    let interval = setInterval(() => {
      promptIndex++;
      if (promptIndex < prompts.length) {
        instrEl.style.opacity = '0';
        setTimeout(() => {
          instrEl.textContent = prompts[promptIndex];
          instrEl.style.opacity = '1';
        }, 300);
      } else {
        clearInterval(interval);
        setTimeout(handleSuccess, 1000); // Auto capture after sequence
      }
    }, 2000);
    
    const closeOverlay = () => {
      clearInterval(interval);
      overlay.remove();
    };
    
    const handleSuccess = () => {
      closeOverlay();
      currentStep = isId ? 'ID_PREVIEW' : 'SELFIE_PREVIEW';
      updateView();
    };
    
    const handleFail = () => {
      closeOverlay();
      if (isId) {
        idFailCount++;
        if (idFailCount >= 3) {
          currentStep = 'MANUAL_REVIEW';
        } else {
          currentStep = 'ID_FAIL';
          const errors = [
            { r: "We couldn't read the document because part of it is outside the frame.", a: "Place the entire document inside the frame." },
            { r: "The image is too blurry to read the document.", a: "Hold still and ensure good lighting." },
            { r: "Reflections are covering important details.", a: "Remove reflective glare." }
          ];
          const err = errors[idFailCount % errors.length];
          failReason = err.r;
          failRecovery = err.a;
        }
      } else {
        selfieFailCount++;
        if (selfieFailCount >= 3) {
          currentStep = 'MANUAL_REVIEW';
        } else {
          currentStep = 'SELFIE_FAIL';
          failReason = "We couldn't confirm that a live person is in front of the camera.";
          failRecovery = "Look directly at the camera and follow the prompts.";
        }
      }
      updateView();
    };
    
    overlay.querySelector('.camera-close').addEventListener('click', closeOverlay);
    overlay.querySelector('.camera-capture-btn').addEventListener('click', handleSuccess);
    overlay.querySelector('.camera-fail-btn').addEventListener('click', handleFail);
  };

  const updateView = () => {
    renderContent();
    window.scrollTo(0, 0);
  };

  updateView();
  return container;
}
