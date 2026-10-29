/**
 * HANUMAN CHALISA — THE LIVING TEMPLE
 * Main Application Orchestrator (ES Module)
 * Pure, authentic, streamlined focus exclusively on Shri Hanuman Chalisa.
 */

import { CHALISA_DATA } from './content/chalisa-data.js';
import { storage } from './services/storage-service.js';
import { audioService } from './services/audio-service.js';
import { renderTempleSinglePageHTML } from './components/temple-view.js';
import { AudioDock } from './components/audio-dock.js';

class HanumanChalisaApp {
  constructor() {
    this.showMeaningInTemple = false;
    this.audioDock = null;
    this.darshanVisible = storage.getDarshanVisible();

    this.init();
  }

  async init() {
    // 1. Restore persisted theme, speed, and font scale
    this.initSettings();

    // 2. Render Full Hanuman Chalisa Manuscript
    this.renderTempleView();
    this.renderIndexDrawer();

    // 3. Initialize Audio Player Dock
    const dockContainer = document.getElementById('global-audio-dock');
    if (dockContainer) {
      this.audioDock = new AudioDock(dockContainer);
    }

    // 4. Initialize Modals
    this.bindCreditsModal();
    this.bindSankalpModal();

    // 5. Setup Event Listeners
    this.bindHeaderActions();
    this.bindReaderEvents();
    this.bindKeyboardShortcuts();
    this.subscribeRecitationSync();

    // 6. Register PWA Service Worker & Multi-Browser Install Prompts
    this.registerServiceWorker();
    this.initPWAInstall();

    console.log('🕉️ Hanuman Chalisa — The Living Temple Initialized');
  }

  // =========================================================================
  // SETTINGS & THEMES
  // =========================================================================
  initSettings() {
    const savedTheme = storage.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    this._updateThemeButtons(savedTheme);

    const savedScale = storage.getFontScale();
    document.documentElement.style.setProperty('--reader-scale', savedScale.toString());
    this._updateFontButtons(savedScale);

    // Settings Dropdown Button
    const settingsBtn = document.getElementById('btn-header-settings');
    const settingsMenu = document.getElementById('settings-menu');

    if (settingsBtn && settingsMenu) {
      settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = settingsMenu.classList.toggle('open');
        settingsBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
          settingsMenu.classList.remove('open');
          settingsBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Theme Buttons
    document.querySelectorAll('[data-theme-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme-val');
        storage.setTheme(theme);
        this._updateThemeButtons(theme);
      });
    });

    // Font Scale Buttons
    document.querySelectorAll('[data-scale]').forEach(btn => {
      btn.addEventListener('click', () => {
        const scale = parseFloat(btn.getAttribute('data-scale'));
        storage.setFontScale(scale);
        this._updateFontButtons(scale);
      });
    });

    // Speed Control in Settings Menu
    const currentSpeed = audioService.playbackSpeed || 1.0;
    this._updateSpeedButtons(currentSpeed);

    document.querySelectorAll('[data-speed-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        const speed = parseFloat(btn.getAttribute('data-speed-val'));
        audioService.setSpeed(speed);
      });
    });

    // Reader Toolbar Speed Button
    const readerSpeedBtn = document.getElementById('btn-reader-speed-toggle');
    const readerSpeedLabel = document.getElementById('reader-speed-label');
    const speedsList = [0.75, 0.85, 1.0, 1.15, 1.25, 1.5];

    if (readerSpeedBtn) {
      readerSpeedBtn.addEventListener('click', () => {
        const cur = audioService.playbackSpeed || 1.0;
        const curIdx = speedsList.indexOf(cur);
        const nextSpeed = speedsList[(curIdx + 1) % speedsList.length];
        audioService.setSpeed(nextSpeed);
      });
    }

    audioService.on('speedchange', ({ speed }) => {
      this._updateSpeedButtons(speed);
      if (readerSpeedLabel) {
        readerSpeedLabel.textContent = `${speed}x गति`;
      }
    });

    // Akhand Path Loop Controls in Settings Menu
    const initialLoopVal = audioService.isAkhandLoop ? 0 : (audioService.repeatGoal || 1);
    this._updateLoopButtons(initialLoopVal);

    document.querySelectorAll('[data-loop-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-loop-val'), 10);
        audioService.setRepeatCount(val);
      });
    });

    // Reader Toolbar Akhand Loop Button
    const readerAkhandBtn = document.getElementById('btn-reader-akhand-loop');
    const loopCycle = [1, 3, 7, 11, 21, 108, 0]; // 0 is infinite
    if (readerAkhandBtn) {
      readerAkhandBtn.addEventListener('click', () => {
        const cur = audioService.isAkhandLoop ? 0 : (audioService.repeatGoal || 1);
        const curIdx = loopCycle.indexOf(cur);
        const nextVal = loopCycle[(curIdx + 1) % loopCycle.length];
        audioService.setRepeatCount(nextVal);
      });
    }

    this._updateReaderAkhandButton(audioService.repeatGoal, audioService.isAkhandLoop);

    audioService.on('loopmodechange', ({ repeatGoal, isAkhandLoop }) => {
      const activeVal = isAkhandLoop ? 0 : repeatGoal;
      this._updateLoopButtons(activeVal);
      this._updateReaderAkhandButton(repeatGoal, isAkhandLoop);
    });
  }

  _updateLoopButtons(activeVal) {
    document.querySelectorAll('[data-loop-val]').forEach(btn => {
      const val = parseInt(btn.getAttribute('data-loop-val'), 10);
      btn.classList.toggle('active', val === activeVal);
    });
  }

  _updateReaderAkhandButton(repeatGoal, isAkhandLoop) {
    const readerAkhandBtn = document.getElementById('btn-reader-akhand-loop');
    const readerAkhandLabel = document.getElementById('reader-akhand-label');
    if (!readerAkhandBtn || !readerAkhandLabel) return;

    if (isAkhandLoop) {
      readerAkhandBtn.className = 'reader-tool-btn active-infinite';
      readerAkhandLabel.textContent = '🚩 ∞ अखंड लूप';
    } else if (repeatGoal > 1) {
      readerAkhandBtn.className = 'reader-tool-btn active';
      readerAkhandLabel.textContent = `🚩 ${repeatGoal} पाठ लूप`;
    } else {
      readerAkhandBtn.className = 'reader-tool-btn';
      readerAkhandLabel.textContent = '🚩 १ पाठ';
    }
  }

  _updateSpeedButtons(activeSpeed) {
    document.querySelectorAll('[data-speed-val]').forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.getAttribute('data-speed-val')) === activeSpeed);
    });
  }

  _updateThemeButtons(activeTheme) {
    document.querySelectorAll('[data-theme-val]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-val') === activeTheme);
    });
  }

  _updateFontButtons(activeScale) {
    document.querySelectorAll('[data-scale]').forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.getAttribute('data-scale')) === activeScale);
    });
  }

  // =========================================================================
  // HEADER ACTIONS & TEMPLE BELL
  // =========================================================================
  bindHeaderActions() {
    const bellBtn = document.getElementById('btn-header-bell');
    if (bellBtn) {
      bellBtn.addEventListener('click', () => {
        audioService.playTempleBell();
        bellBtn.style.transform = 'scale(1.2) rotate(-15deg)';
        setTimeout(() => {
          bellBtn.style.transform = 'scale(1.2) rotate(15deg)';
          setTimeout(() => bellBtn.style.transform = '', 150);
        }, 150);
      });
    }

    const brandBtn = document.getElementById('brand-home-btn');
    if (brandBtn) {
      brandBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // =========================================================================
  // LIVING CHALISA MANUSCRIPT READER
  // =========================================================================
  renderTempleView() {
    const container = document.getElementById('temple-single-page-container');
    if (!container) return;

    container.innerHTML = renderTempleSinglePageHTML(this.showMeaningInTemple);

    // Clicking on any couplet starts reciting from that verse
    container.querySelectorAll('.temple-couplet').forEach(couplet => {
      couplet.addEventListener('click', () => {
        const index = parseInt(couplet.getAttribute('data-temple-index'), 10);
        audioService.jumpToVerse(index);
        audioService.play();
      });
    });
  }

  bindReaderEvents() {
    // Hero action buttons
    const btnHeroListen = document.getElementById('btn-hero-listen');
    const btnHeroRead = document.getElementById('btn-hero-read');
    const readingSection = document.getElementById('chalisa-reading-section');

    if (btnHeroListen) {
      btnHeroListen.addEventListener('click', () => {
        audioService.play();
        if (readingSection) {
          readingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    if (btnHeroRead) {
      btnHeroRead.addEventListener('click', () => {
        if (readingSection) {
          readingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Toggle Hindi Meaning in Temple Mode
    const btnMeaning = document.getElementById('btn-toggle-meaning');
    if (btnMeaning) {
      btnMeaning.addEventListener('click', () => {
        this.showMeaningInTemple = !this.showMeaningInTemple;
        btnMeaning.classList.toggle('active', this.showMeaningInTemple);
        document.querySelectorAll('.temple-meaning-inline').forEach(el => {
          el.style.display = this.showMeaningInTemple ? 'block' : 'none';
        });
      });
    }

    // Quick Font Scale buttons (A- / A+)
    const btnFontDec = document.getElementById('btn-reader-font-dec');
    const btnFontInc = document.getElementById('btn-reader-font-inc');

    if (btnFontDec) {
      btnFontDec.addEventListener('click', () => {
        const cur = storage.getFontScale();
        const next = Math.max(0.85, Math.round((cur - 0.1) * 100) / 100);
        storage.setFontScale(next);
        this._updateFontButtons(next);
      });
    }

    if (btnFontInc) {
      btnFontInc.addEventListener('click', () => {
        const cur = storage.getFontScale();
        const next = Math.min(1.4, Math.round((cur + 0.1) * 100) / 100);
        storage.setFontScale(next);
        this._updateFontButtons(next);
      });
    }

    // Distraction-Free Toggle
    const btnDistract = document.getElementById('btn-toggle-distraction-free');
    if (btnDistract) {
      btnDistract.addEventListener('click', () => {
        document.body.classList.toggle('distraction-free');
        btnDistract.classList.toggle('active', document.body.classList.contains('distraction-free'));
      });
    }

    // Toggle Darshan Image (Collapsible Hero Art - default hidden for pure basic reading)
    const toggleDarshan = () => {
      const nextState = !this.darshanVisible;
      storage.setDarshanVisible(nextState);
      this.updateDarshanView(nextState);
      if (nextState) {
        const heroThreshold = document.getElementById('hero-threshold');
        if (heroThreshold) {
          heroThreshold.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const btnDarshan = document.getElementById('btn-toggle-darshan');
    if (btnDarshan) {
      btnDarshan.addEventListener('click', toggleDarshan);
    }

    const btnSettingsDarshan = document.getElementById('btn-settings-darshan-toggle');
    if (btnSettingsDarshan) {
      btnSettingsDarshan.addEventListener('click', toggleDarshan);
    }

    // Set initial Darshan view state (default: collapsed/pure reading)
    this.updateDarshanView(this.darshanVisible);
  }

  updateDarshanView(isVisible) {
    this.darshanVisible = isVisible;
    const heroThreshold = document.getElementById('hero-threshold');
    const btnDarshan = document.getElementById('btn-toggle-darshan');
    const btnSettingsDarshan = document.getElementById('btn-settings-darshan-toggle');

    if (heroThreshold) {
      heroThreshold.classList.toggle('open', isVisible);
    }
    if (btnDarshan) {
      btnDarshan.classList.toggle('active', isVisible);
    }
    if (btnSettingsDarshan) {
      btnSettingsDarshan.classList.toggle('active', isVisible);
      const span = btnSettingsDarshan.querySelector('span');
      if (span) {
        span.textContent = isVisible ? '🖼️ दर्शन चित्र छिपाएं (Hide Darshan)' : '🖼️ दर्शन चित्र दिखाएं (Show Darshan)';
      }
    }
  }

  // =========================================================================
  // VERSE INDEX DRAWER
  // =========================================================================
  renderIndexDrawer() {
    const chaupayiGrid = document.getElementById('index-chaupayi-grid');
    const openBtn = document.getElementById('btn-open-index');
    const closeBtn = document.getElementById('btn-close-index-drawer');
    const backdrop = document.getElementById('index-drawer-backdrop');
    const panel = document.getElementById('index-drawer-panel');

    if (!chaupayiGrid) return;

    // Render 1 to 40 Chaupayi buttons
    let html = '';
    for (let i = 1; i <= 40; i++) {
      const dataIndex = i + 1; // Doha 1 & 2 are index 0 & 1
      html += `
        <button type="button" class="index-chip-btn" data-target-verse="${dataIndex}">
          ${i}
        </button>
      `;
    }
    chaupayiGrid.innerHTML = html;

    // Open Drawer
    if (openBtn) openBtn.addEventListener('click', () => this.openIndexDrawer());
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeIndexDrawer());
    if (backdrop) backdrop.addEventListener('click', () => this.closeIndexDrawer());

    // Jump to verse when chip clicked
    if (panel) {
      panel.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-target-verse]');
        if (!btn) return;

        const targetIndex = parseInt(btn.getAttribute('data-target-verse'), 10);
        this.closeIndexDrawer();
        this.jumpAndHighlightVerse(targetIndex);
      });
    }
  }

  openIndexDrawer() {
    const backdrop = document.getElementById('index-drawer-backdrop');
    const panel = document.getElementById('index-drawer-panel');
    if (backdrop && panel) {
      backdrop.classList.add('open');
      panel.classList.add('open');
    }
  }

  closeIndexDrawer() {
    const backdrop = document.getElementById('index-drawer-backdrop');
    const panel = document.getElementById('index-drawer-panel');
    if (backdrop && panel) {
      backdrop.classList.remove('open');
      panel.classList.remove('open');
    }
  }

  jumpAndHighlightVerse(index) {
    audioService.jumpToVerse(index);
    audioService.play();

    document.querySelectorAll('.temple-couplet').forEach(c => c.classList.remove('active-temple-verse'));
    const couplet = document.getElementById(`temple-couplet-${index}`);
    if (couplet) {
      couplet.classList.add('active-temple-verse');
      couplet.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // =========================================================================
  // LIVING RECITATION SYNCHRONIZATION
  // =========================================================================
  subscribeRecitationSync() {
    audioService.on('versechange', ({ index, verse }) => {
      storage.setLastVerseId(verse.id);

      // Highlight playing couplet and scroll smoothly
      document.querySelectorAll('.temple-couplet').forEach(c => c.classList.remove('active-temple-verse'));
      const templeCouplet = document.getElementById(`temple-couplet-${index}`);
      if (templeCouplet) {
        templeCouplet.classList.add('active-temple-verse');
        if (audioService.audioSyncEnabled) {
          templeCouplet.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    audioService.on('ended', () => {
      console.log('Chanting cycle completed');
    });
  }

  // =========================================================================
  // CREDITS & COPYRIGHT MODAL
  // =========================================================================
  bindCreditsModal() {
    const dialog = document.getElementById('credits-modal-dialog');
    const backdrop = document.getElementById('credits-modal-backdrop');
    const closeBtn = document.getElementById('btn-close-credits');

    const openModal = () => {
      if (dialog && backdrop) {
        dialog.classList.add('open');
        backdrop.classList.add('open');
        dialog.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeModal = () => {
      if (dialog && backdrop) {
        dialog.classList.remove('open');
        backdrop.classList.remove('open');
        dialog.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    };

    const triggerIds = ['btn-header-credits', 'btn-open-credits', 'btn-settings-credits'];
    triggerIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal();
        });
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dialog && dialog.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // =========================================================================
  // SANKALP COMPLETION CELEBRATION MODAL (VIRAL WHATSAPP SHARING)
  // =========================================================================
  bindSankalpModal() {
    const modal = document.getElementById('sankalp-complete-modal');
    const backdrop = document.getElementById('sankalp-complete-backdrop');
    const closeBtn = document.getElementById('btn-close-sankalp-modal');
    const shareBtn = document.getElementById('btn-share-sankalp-whatsapp');
    const roundsDisplay = document.getElementById('sankalp-completed-rounds-num');

    let lastCompletedRounds = 1;

    const closeModal = () => {
      if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeModal();
      }
    });

    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const text = encodeURIComponent(`🚩 जय श्री राम! मैंने आज श्री हनुमान चालीसा के ${lastCompletedRounds} पावन पाठ का अखंड संकल्प पूर्ण किया।\n\nआप भी संपूर्ण चालीसा पाठ, अखंड लूप एवं पावन दर्शन का लाभ लें:\nhttps://vibecodinghanumanchalisa.vercel.app/`);
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
      });
    }

    // Trigger celebration when anusthan / sankalp rounds complete
    audioService.on('ended', ({ completedRounds }) => {
      if (completedRounds && completedRounds > 1) {
        lastCompletedRounds = completedRounds;
        if (roundsDisplay) {
          roundsDisplay.textContent = `${completedRounds} पाठ`;
        }
        if (modal) {
          modal.classList.add('open');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          audioService.playTempleBell();
        }
      }
    });
  }

  // =========================================================================
  // KEYBOARD ACCESSIBILITY
  // =========================================================================
  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        audioService.togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        audioService.nextVerse();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        audioService.prevVerse();
      } else if (e.code === 'KeyB') {
        audioService.playTempleBell();
      } else if (e.code === 'Escape') {
        this.closeIndexDrawer();
        const settingsMenu = document.getElementById('settings-menu');
        if (settingsMenu) settingsMenu.classList.remove('open');
      }
    });
  }

  // =========================================================================
  // PWA SERVICE WORKER
  // =========================================================================
  registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        console.log('PWA ServiceWorker registered with scope:', reg.scope);
      }).catch(err => {
        console.warn('PWA ServiceWorker registration notice:', err);
      });
    }
  }

  // =========================================================================
  // UNIVERSAL MULTI-BROWSER ADAPTIVE PWA INSTALL SYSTEM
  // =========================================================================
  initPWAInstall() {
    let deferredInstallPrompt = null;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    // Browser & Environment Detection
    const ua = navigator.userAgent || '';
    const isInApp = /WhatsApp|Instagram|FBAN|FBAV|Line|WeChat|MicroMessenger/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isIOSChrome = isIOS && /CriOS/i.test(ua);
    const isIOSSafari = isIOS && !isIOSChrome && !isInApp && /Safari/i.test(ua);

    const banner = document.getElementById('pwa-install-banner');
    const headerBtn = document.getElementById('btn-header-install');
    const installActionBtn = document.getElementById('btn-pwa-install-action');
    const dismissBtn = document.getElementById('btn-pwa-dismiss');
    const guideModal = document.getElementById('ios-install-modal');
    const guideDoneBtn = document.getElementById('btn-ios-done');
    const guideBackdrop = document.getElementById('ios-install-backdrop');
    const guideTitle = document.getElementById('pwa-guide-title');
    const guideSubtitle = document.getElementById('pwa-guide-subtitle');
    const guideStepsList = document.getElementById('pwa-guide-steps-list');

    // Populate instructional modal dynamically for the specific browser/device
    const populateGuideModal = () => {
      if (!guideStepsList) return;

      if (isInApp) {
        if (guideTitle) guideTitle.textContent = 'मुख्य ब्राउज़र में खोलकर इंस्टॉल करें';
        if (guideSubtitle) guideSubtitle.textContent = 'ऐप स्थापित करने के लिए २ सरल कदम:';
        guideStepsList.innerHTML = `
          <div class="ios-step-item">
            <span class="ios-step-num">१</span>
            <div class="ios-step-text">
              ऊपर दाएँ कोने में <strong>३-बिंदु ( ⋮ )</strong> या <strong>Share</strong> आइकन पर टैप करें।
            </div>
          </div>
          <div class="ios-step-item">
            <span class="ios-step-num">२</span>
            <div class="ios-step-text">
              <strong>"Open in Chrome"</strong> या <strong>"Open in Safari"</strong> चुनें। वहाँ केवल १ क्लिक में ऐप इंस्टॉल हो जाएगी।
            </div>
          </div>
        `;
      } else if (isIOSChrome) {
        if (guideTitle) guideTitle.textContent = 'iPhone Chrome में ऐप कैसे जोड़ें?';
        if (guideSubtitle) guideSubtitle.textContent = 'बिना ऐप स्टोर के सीधे होम स्क्रीन पर जोड़ें:';
        guideStepsList.innerHTML = `
          <div class="ios-step-item">
            <span class="ios-step-num">१</span>
            <div class="ios-step-text">
              ऊपर सर्च बार (Address Bar) के दाएँ कोने में दिए गए <strong>Share आइकन ( <svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align: -2px;" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg> )</strong> पर टैप करें।
            </div>
          </div>
          <div class="ios-step-item">
            <span class="ios-step-num">२</span>
            <div class="ios-step-text">
              नीचे स्क्रॉल करके <strong>"Add to Home Screen (होम स्क्रीन पर जोड़ें)"</strong> विकल्प चुनें।
            </div>
          </div>
        `;
      } else if (isIOS) {
        if (guideTitle) guideTitle.textContent = 'iPhone पर ऐप कैसे जोड़ें?';
        if (guideSubtitle) guideSubtitle.textContent = 'बिना ऐप स्टोर के सीधे होम स्क्रीन पर जोड़ें:';
        guideStepsList.innerHTML = `
          <div class="ios-step-item">
            <span class="ios-step-num">१</span>
            <div class="ios-step-text">
              सफारी (Safari) में नीचे दिए गए <strong>Share बटन ( <svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align: -2px;" fill="currentColor"><path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z"/></svg> )</strong> पर टैप करें।
            </div>
          </div>
          <div class="ios-step-item">
            <span class="ios-step-num">२</span>
            <div class="ios-step-text">
              नीचे स्क्रॉल करके <strong>"Add to Home Screen (होम स्क्रीन पर जोड़ें)"</strong> विकल्प चुनें।
            </div>
          </div>
        `;
      } else {
        // Desktop or other browsers without deferredInstallPrompt
        if (guideTitle) guideTitle.textContent = 'ब्राउज़र से ऐप कैसे इंस्टॉल करें?';
        if (guideSubtitle) guideSubtitle.textContent = 'सीधे होम स्क्रीन अथवा डेस्कटॉप पर जोड़ें:';
        guideStepsList.innerHTML = `
          <div class="ios-step-item">
            <span class="ios-step-num">१</span>
            <div class="ios-step-text">
              ब्राउज़र के ऊपर दाएँ कोने में <strong>३-बिंदु ( ⋮ )</strong> मेनू दबाएं।
            </div>
          </div>
          <div class="ios-step-item">
            <span class="ios-step-num">२</span>
            <div class="ios-step-text">
              <strong>"Install App (ऐप इंस्टॉल करें)"</strong> या <strong>"Add to Home Screen"</strong> विकल्प चुनें।
            </div>
          </div>
        `;
      }
    };

    if (!isStandalone) {
      if (headerBtn) headerBtn.style.display = 'inline-flex';

      const isDismissed = sessionStorage.getItem('hc_pwa_dismissed');
      if (!isDismissed && banner) {
        setTimeout(() => {
          banner.style.display = 'flex';
        }, 1500);
      }
    }

    // Capture native beforeinstallprompt (Android Chrome, Edge, Desktop Chrome)
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (headerBtn) headerBtn.style.display = 'inline-flex';
    });

    const triggerInstall = async () => {
      if (deferredInstallPrompt) {
        try {
          deferredInstallPrompt.prompt();
          const { outcome } = await deferredInstallPrompt.userChoice;
          if (outcome === 'accepted') {
            if (banner) banner.style.display = 'none';
            if (headerBtn) headerBtn.style.display = 'none';
          }
          deferredInstallPrompt = null;
        } catch (err) {
          console.warn('Native install prompt failed, showing guide:', err);
          populateGuideModal();
          if (guideModal) {
            guideModal.classList.add('open');
            guideModal.setAttribute('aria-hidden', 'false');
          }
        }
      } else {
        populateGuideModal();
        if (guideModal) {
          guideModal.classList.add('open');
          guideModal.setAttribute('aria-hidden', 'false');
        }
      }
    };

    if (installActionBtn) installActionBtn.addEventListener('click', triggerInstall);
    if (headerBtn) headerBtn.addEventListener('click', triggerInstall);

    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        if (banner) banner.style.display = 'none';
        sessionStorage.setItem('hc_pwa_dismissed', 'true');
      });
    }

    const closeGuide = () => {
      if (guideModal) {
        guideModal.classList.remove('open');
        guideModal.setAttribute('aria-hidden', 'true');
      }
    };

    if (guideDoneBtn) guideDoneBtn.addEventListener('click', closeGuide);
    if (guideBackdrop) guideBackdrop.addEventListener('click', closeGuide);

    window.addEventListener('appinstalled', () => {
      console.log('Hanuman Chalisa PWA successfully installed on home screen');
      if (banner) banner.style.display = 'none';
      if (headerBtn) headerBtn.style.display = 'none';
      closeGuide();
      audioService.playTempleBell();
    });
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.__app = new HanumanChalisaApp();
});
