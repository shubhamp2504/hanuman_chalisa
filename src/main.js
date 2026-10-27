/**
 * HANUMAN CHALISA — THE LIVING TEMPLE
 * Main Application Orchestrator (ES Module)
 */

import { CHALISA_DATA } from './content/chalisa-data.js';
import { WISDOM_STORIES, VIRTUES } from './content/wisdom-data.js';
import { storage } from './services/storage-service.js';
import { audioService } from './services/audio-service.js';
import { createVerseCardHTML } from './components/verse-card.js';
import { AudioDock } from './components/audio-dock.js';
import { DiyaCanvas } from './components/diya-canvas.js';
import { PetalsCanvas } from './components/petals-canvas.js';
import { ICONS } from './utils/icons.js';

class HanumanChalisaApp {
  constructor() {
    this.currentView = 'home';
    this.readingMode = 'continuous'; // 'continuous' or 'focused'
    this.focusedVerseIndex = 0;
    this.homeDiya = null;
    this.altarDiya = null;
    this.petalsCanvas = null;
    this.audioDock = null;

    this.init();
  }

  async init() {
    // 1. Restore persisted theme and font scale
    this.initSettings();

    // 2. Render content
    this.renderVersesList();
    this.renderIndexDrawer();
    this.renderWisdom();
    this.initJapamala();
    await this.initJournal();

    // 3. Initialize Audio Player Dock
    const dockContainer = document.getElementById('global-audio-dock');
    if (dockContainer) {
      this.audioDock = new AudioDock(dockContainer);
    }

    // 4. Initialize Interactive Diyas
    this.initDiyas();

    // 5. Setup Event Listeners & Router
    this.bindNavigation();
    this.bindHeaderActions();
    this.bindReaderEvents();
    this.bindKeyboardShortcuts();
    this.subscribeRecitationSync();

    // 6. Register PWA Service Worker
    this.registerServiceWorker();

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

    const savedLang = storage.getLanguage();
    this._updateLangButtons(savedLang);
    this.applyLanguageFilter(savedLang);

    // Settings Dropdown Button
    const settingsBtn = document.getElementById('btn-header-settings');
    const settingsMenu = document.getElementById('settings-menu');

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

    // Language Filter Buttons
    document.querySelectorAll('[data-lang-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang-val');
        storage.setLanguage(lang);
        this._updateLangButtons(lang);
        this.applyLanguageFilter(lang);
      });
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

  _updateLangButtons(activeLang) {
    document.querySelectorAll('[data-lang-val]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang-val') === activeLang);
    });
  }

  applyLanguageFilter(lang) {
    const list = document.getElementById('verses-list-container');
    if (!list) return;

    list.classList.remove('lang-hi-only', 'lang-en-only', 'lang-translit-only');
    if (lang === 'hi') list.classList.add('lang-hi-only');
    if (lang === 'en') list.classList.add('lang-en-only');
    if (lang === 'translit') list.classList.add('lang-translit-only');
  }

  // =========================================================================
  // ROUTING & NAVIGATION
  // =========================================================================
  bindNavigation() {
    // Nav buttons
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = btn.getAttribute('data-nav');
        this.switchView(targetView);
      });
    });

    // Brand click returns to Home
    const brandBtn = document.getElementById('brand-home-btn');
    if (brandBtn) {
      brandBtn.addEventListener('click', () => this.switchView('home'));
    }

    // Hero 3 Action Cards
    const btnHeroListen = document.getElementById('btn-hero-listen');
    const btnHeroRead = document.getElementById('btn-hero-read');
    const btnHeroUnderstand = document.getElementById('btn-hero-understand');
    const btnDailyReadMore = document.getElementById('btn-daily-read-more');

    if (btnHeroListen) {
      btnHeroListen.addEventListener('click', () => {
        this.switchView('reader');
        audioService.play();
      });
    }

    if (btnHeroRead) {
      btnHeroRead.addEventListener('click', () => {
        this.switchView('reader');
      });
    }

    if (btnHeroUnderstand) {
      btnHeroUnderstand.addEventListener('click', () => {
        this.switchView('wisdom');
      });
    }

    if (btnDailyReadMore) {
      btnDailyReadMore.addEventListener('click', () => {
        this.switchView('reader');
      });
    }
  }

  switchView(viewName) {
    if (this.currentView === viewName) return;

    this.currentView = viewName;

    // Toggle active page view
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active-view');
    });

    const activeTarget = document.getElementById(`view-${viewName}`);
    if (activeTarget) {
      activeTarget.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-nav') === viewName);
    });

    // Close any open drawers
    this.closeIndexDrawer();
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

    // Darshan Mode Open / Exit
    const darshanBtn = document.getElementById('btn-header-darshan');
    const darshanOverlay = document.getElementById('darshan-overlay');
    const exitDarshanBtn = document.getElementById('btn-exit-darshan');

    if (darshanBtn && darshanOverlay) {
      darshanBtn.addEventListener('click', () => {
        this.openDarshanMode();
      });
    }

    if (exitDarshanBtn) {
      exitDarshanBtn.addEventListener('click', () => {
        this.closeDarshanMode();
      });
    }

    // Darshan Minimal Controls
    const darshanPlay = document.getElementById('btn-darshan-play');
    const darshanPrev = document.getElementById('btn-darshan-prev');
    const darshanNext = document.getElementById('btn-darshan-next');
    const darshanBell = document.getElementById('btn-darshan-bell');

    if (darshanPlay) {
      darshanPlay.addEventListener('click', () => audioService.togglePlay());
    }
    if (darshanPrev) {
      darshanPrev.addEventListener('click', () => audioService.prevVerse());
    }
    if (darshanNext) {
      darshanNext.addEventListener('click', () => audioService.nextVerse());
    }
    if (darshanBell) {
      darshanBell.addEventListener('click', () => audioService.playTempleBell());
    }

    // Mobile nav button
    const mobileNavBtn = document.getElementById('btn-mobile-nav');
    if (mobileNavBtn) {
      mobileNavBtn.addEventListener('click', () => {
        const next = this.currentView === 'home' ? 'reader' : (this.currentView === 'reader' ? 'sadhana' : (this.currentView === 'sadhana' ? 'wisdom' : 'home'));
        this.switchView(next);
      });
    }
  }

  openDarshanMode() {
    const overlay = document.getElementById('darshan-overlay');
    if (!overlay) return;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Start Petals Canvas
    const canvas = document.getElementById('darshan-petals-canvas');
    if (canvas && !this.petalsCanvas) {
      this.petalsCanvas = new PetalsCanvas(canvas, { count: 32 });
    } else if (this.petalsCanvas) {
      this.petalsCanvas.resumeAnimation();
    }

    this.updateDarshanVerse(audioService.currentVerseIndex);
  }

  closeDarshanMode() {
    const overlay = document.getElementById('darshan-overlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    document.body.style.overflow = '';

    if (this.petalsCanvas) {
      this.petalsCanvas.stopAnimation();
    }
  }

  updateDarshanVerse(index) {
    const verse = CHALISA_DATA[index];
    if (!verse) return;

    const hindiEl = document.getElementById('darshan-verse-hindi');
    const translitEl = document.getElementById('darshan-verse-translit');
    const engEl = document.getElementById('darshan-verse-eng');

    if (hindiEl) hindiEl.innerHTML = verse.linesDevanagari.join('<br />');
    if (translitEl) translitEl.textContent = verse.transliteration;
    if (engEl) engEl.textContent = verse.englishMeaning;
  }

  // =========================================================================
  // LIVING CHALISA READER
  // =========================================================================
  renderVersesList() {
    const container = document.getElementById('verses-list-container');
    if (!container) return;

    const html = CHALISA_DATA.map((verse, index) => {
      const isCurrent = index === 0;
      const isUpcoming = index === 1;
      return createVerseCardHTML(verse, index, isCurrent, isUpcoming);
    }).join('');

    container.innerHTML = html;
  }

  bindReaderEvents() {
    const container = document.getElementById('verses-list-container');
    if (!container) return;

    // Delegated actions on Verse Cards
    container.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;

      const action = target.getAttribute('data-action');

      if (action === 'toggle-word-by-word') {
        const grid = target.nextElementSibling;
        const isOpen = grid.classList.toggle('open');
        target.classList.toggle('open', isOpen);
        target.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }

      if (action === 'bookmark') {
        const verseId = target.getAttribute('data-verse-id');
        const isBookmarked = storage.toggleBookmark(verseId);
        target.classList.toggle('bookmarked', isBookmarked);
        target.innerHTML = isBookmarked ? ICONS.heart : ICONS.heartOutline;
        this.updateIndexBookmarks();
      }

      if (action === 'play-verse') {
        const index = parseInt(target.getAttribute('data-verse-index'), 10);
        audioService.jumpToVerse(index);
        audioService.play();
      }
    });

    // Mode Toggle (Continuous vs Focused)
    const btnContinuous = document.getElementById('btn-mode-continuous');
    const btnFocused = document.getElementById('btn-mode-focused');
    const continuousList = document.getElementById('verses-list-container');
    const focusedContainer = document.getElementById('focused-single-container');

    if (btnContinuous && btnFocused) {
      btnContinuous.addEventListener('click', () => {
        this.readingMode = 'continuous';
        btnContinuous.classList.add('active');
        btnFocused.classList.remove('active');
        continuousList.style.display = 'flex';
        focusedContainer.style.display = 'none';
      });

      btnFocused.addEventListener('click', () => {
        this.readingMode = 'focused';
        btnFocused.classList.add('active');
        btnContinuous.classList.remove('active');
        continuousList.style.display = 'none';
        focusedContainer.style.display = 'block';
        this.renderFocusedVerse(this.focusedVerseIndex);
      });
    }

    // Focused mode Prev / Next buttons
    const btnFocusedPrev = document.getElementById('btn-focused-prev');
    const btnFocusedNext = document.getElementById('btn-focused-next');

    if (btnFocusedPrev && btnFocusedNext) {
      btnFocusedPrev.addEventListener('click', () => {
        if (this.focusedVerseIndex > 0) {
          this.focusedVerseIndex--;
          this.renderFocusedVerse(this.focusedVerseIndex);
        }
      });

      btnFocusedNext.addEventListener('click', () => {
        if (this.focusedVerseIndex < CHALISA_DATA.length - 1) {
          this.focusedVerseIndex++;
          this.renderFocusedVerse(this.focusedVerseIndex);
        }
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
  }

  renderFocusedVerse(index) {
    const verse = CHALISA_DATA[index];
    const target = document.getElementById('focused-verse-target');
    const indicator = document.getElementById('focused-verse-indicator');
    const btnPrev = document.getElementById('btn-focused-prev');
    const btnNext = document.getElementById('btn-focused-next');

    if (!target || !verse) return;

    target.innerHTML = createVerseCardHTML(verse, index, true, false);
    if (indicator) indicator.textContent = `${verse.titleDevanagari} (${index + 1} / ${CHALISA_DATA.length})`;

    if (btnPrev) btnPrev.disabled = index === 0;
    if (btnNext) btnNext.disabled = index === CHALISA_DATA.length - 1;
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
      const isBookmarked = storage.isBookmarked(`verse-${i}`);
      html += `
        <button type="button" class="index-chip-btn ${isBookmarked ? 'bookmarked' : ''}" data-target-verse="${dataIndex}">
          ${i}
        </button>
      `;
    }
    chaupayiGrid.innerHTML = html;

    // Open Drawer
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        this.openIndexDrawer();
      });
    }

    // Close Drawer
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeIndexDrawer());
    if (backdrop) backdrop.addEventListener('click', () => this.closeIndexDrawer());

    // Jump to verse when chip clicked
    panel.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-target-verse]');
      if (!btn) return;

      const targetIndex = parseInt(btn.getAttribute('data-target-verse'), 10);
      this.closeIndexDrawer();

      if (this.currentView !== 'reader') {
        this.switchView('reader');
      }

      this.jumpAndHighlightVerse(targetIndex);
    });
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

  updateIndexBookmarks() {
    document.querySelectorAll('[data-target-verse]').forEach(btn => {
      const index = parseInt(btn.getAttribute('data-target-verse'), 10);
      const verse = CHALISA_DATA[index];
      if (verse) {
        btn.classList.toggle('bookmarked', storage.isBookmarked(verse.id));
      }
    });
  }

  jumpAndHighlightVerse(index) {
    audioService.jumpToVerse(index);
    this.focusedVerseIndex = index;

    if (this.readingMode === 'focused') {
      this.renderFocusedVerse(index);
    } else {
      const verse = CHALISA_DATA[index];
      const card = document.getElementById(`verse-card-${verse.id}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  // =========================================================================
  // LIVING RECITATION SYNCHRONIZATION
  // =========================================================================
  subscribeRecitationSync() {
    const counterBadge = document.getElementById('reader-verse-counter');

    audioService.on('versechange', ({ index, verse }) => {
      storage.setLastVerseId(verse.id);

      // 1. Update reader progress counter
      if (counterBadge) {
        counterBadge.textContent = `${verse.verseNumberLabel} / ४३`;
      }

      // 2. Update Darshan mode verse
      this.updateDarshanVerse(index);

      // 3. Update Focused Single-Verse mode
      if (this.readingMode === 'focused') {
        this.focusedVerseIndex = index;
        this.renderFocusedVerse(index);
      }

      // 4. Update Continuous scroll highlight & auto-scroll
      if (audioService.audioSyncEnabled) {
        document.querySelectorAll('.verse-card').forEach(card => {
          card.classList.remove('active-recitation', 'upcoming-recitation');
        });

        const activeCard = document.getElementById(`verse-card-${verse.id}`);
        if (activeCard) {
          activeCard.classList.add('active-recitation');
          if (this.currentView === 'reader') {
            activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }

        // Preview upcoming
        const nextVerse = CHALISA_DATA[index + 1];
        if (nextVerse) {
          const nextCard = document.getElementById(`verse-card-${nextVerse.id}`);
          if (nextCard) nextCard.classList.add('upcoming-recitation');
        }
      }
    });

    audioService.on('ended', () => {
      console.log('Chanting round completed');
    });
  }

  // =========================================================================
  // INTERACTIVE CANVAS DIYAS
  // =========================================================================
  initDiyas() {
    // 1. Home Diya (Size 80)
    const homeCanvas = document.getElementById('home-diya-canvas');
    const homeTrigger = document.getElementById('btn-home-diya-trigger');
    if (homeCanvas) {
      this.homeDiya = new DiyaCanvas(homeCanvas, { size: 80, isLit: true });
    }
    if (homeTrigger && this.homeDiya) {
      homeTrigger.addEventListener('click', () => {
        this.homeDiya.lightUp();
      });
    }

    // 2. Altar Diya (Size 220)
    const altarCanvas = document.getElementById('altar-diya-canvas');
    if (altarCanvas) {
      this.altarDiya = new DiyaCanvas(altarCanvas, { size: 220, isLit: true });
    }
  }

  // =========================================================================
  // JAPAMALA & SANKALP PRACTICE
  // =========================================================================
  initJapamala() {
    let count = storage.getJapamalaCount();
    const target = 108;
    const numDisplay = document.getElementById('japamala-count-num');
    const fillBar = document.getElementById('japamala-progress-fill');
    const tapBtn = document.getElementById('btn-japamala-tap');
    const resetBtn = document.getElementById('btn-japamala-reset');
    const bellBtn = document.getElementById('btn-japamala-sound');

    const updateDisplay = () => {
      if (numDisplay) numDisplay.textContent = count;
      if (fillBar) fillBar.style.width = `${Math.min(100, (count / target) * 100)}%`;
      storage.setJapamalaCount(count);
    };

    updateDisplay();

    if (tapBtn) {
      tapBtn.addEventListener('click', () => {
        count++;
        // Haptic feedback if supported
        if (navigator.vibrate) {
          navigator.vibrate([25]);
        }

        if (count % target === 0) {
          audioService.playTempleBell();
        }

        updateDisplay();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        count = 0;
        updateDisplay();
      });
    }

    if (bellBtn) {
      bellBtn.addEventListener('click', () => {
        audioService.playTempleBell();
      });
    }

    // Sankalp Pills
    document.querySelectorAll('.sankalp-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.sankalp-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const goal = parseInt(pill.getAttribute('data-count'), 10);
        storage.setSankalpGoal(goal);
        audioService.setRepeatCount(goal);
      });
    });
  }

  // =========================================================================
  // DEVOTIONAL REFLECTIONS JOURNAL
  // =========================================================================
  async initJournal() {
    const form = document.getElementById('journal-form');
    const input = document.getElementById('journal-input');
    const list = document.getElementById('journal-entries-list');

    const renderEntries = async () => {
      if (!list) return;
      const entries = await storage.getJournalEntries();
      if (entries.length === 0) {
        list.innerHTML = `
          <div style="font-size: 0.88rem; color: var(--text-muted); font-style: italic; text-align: center; padding: 16px;">
            यहाँ अभी कोई प्रविष्टि नहीं है। पाठ उपरांत अपने भाव अवश्य लिखें।
          </div>
        `;
        return;
      }

      list.innerHTML = entries.map(e => `
        <article class="journal-entry-item">
          <span class="journal-entry-date">${e.dateString}</span>
          <p class="journal-entry-text">${e.text}</p>
        </article>
      `).join('');
    };

    await renderEntries();

    if (form && input) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        await storage.saveJournalEntry(text);
        input.value = '';
        await renderEntries();
      });
    }
  }

  // =========================================================================
  // WISDOM EXPLORER
  // =========================================================================
  renderWisdom() {
    const virtuesGrid = document.getElementById('virtues-grid');
    const storiesGrid = document.getElementById('stories-grid');

    // 1. Virtues
    if (virtuesGrid) {
      virtuesGrid.innerHTML = VIRTUES.map(v => `
        <div class="virtue-card">
          <div class="virtue-icon-badge">
            ${ICONS[v.icon] || ICONS.lotus}
          </div>
          <h4 class="virtue-name-hindi">${v.nameHindi}</h4>
          <p class="virtue-desc">${v.description}</p>
        </div>
      `).join('');
    }

    // 2. Stories
    if (storiesGrid) {
      storiesGrid.innerHTML = WISDOM_STORIES.map(s => {
        const verseIndex = CHALISA_DATA.findIndex(v => v.id === s.verseId);
        return `
          <article class="story-card">
            <div>
              <div class="story-card-header">
                <span class="story-cat-badge">${s.category}</span>
                <span style="font-size: 0.78rem; color: var(--c-gold); font-weight: 600;">${s.virtue}</span>
              </div>
              <h4 class="story-title-hindi" style="margin-top: 8px;">${s.titleHindi}</h4>
              <span class="story-title-english">${s.titleEnglish}</span>
              <p class="story-verse-quote" style="margin-top: 10px;">${s.verseQuote}</p>
              <p class="story-summary" style="margin-top: 10px;">${s.summaryHindi}</p>
            </div>
            <div>
              <p class="story-reflection">${s.reflection}</p>
              <footer class="story-card-footer">
                <button type="button" class="btn-story-read-verse" data-open-story-verse="${verseIndex}">
                  <span>संबंधित पद पढ़ें (Read Verse)</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                </button>
              </footer>
            </div>
          </article>
        `;
      }).join('');

      // Cross-linking: Clicking "Read Verse" opens reader directly at that verse
      storiesGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-open-story-verse]');
        if (!btn) return;

        const targetIndex = parseInt(btn.getAttribute('data-open-story-verse'), 10);
        if (targetIndex >= 0) {
          this.switchView('reader');
          this.jumpAndHighlightVerse(targetIndex);
        }
      });
    }
  }

  // =========================================================================
  // KEYBOARD ACCESSIBILITY
  // =========================================================================
  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in a textarea or input
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
      } else if (e.code === 'KeyD') {
        const darshanOverlay = document.getElementById('darshan-overlay');
        if (darshanOverlay.classList.contains('active')) {
          this.closeDarshanMode();
        } else {
          this.openDarshanMode();
        }
      } else if (e.code === 'KeyB') {
        audioService.playTempleBell();
      } else if (e.code === 'Escape') {
        this.closeDarshanMode();
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
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.__app = new HanumanChalisaApp();
});
