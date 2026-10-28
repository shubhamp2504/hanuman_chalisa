/**
 * Audio Dock Component
 * Fixed bottom player dock for Living Recitation, Speed Control, Akhand Path Loop, and Meditative Soundscape.
 */

import { ICONS } from '../utils/icons.js';
import { audioService } from '../services/audio-service.js';
import { CHALISA_DATA } from '../content/chalisa-data.js';

export class AudioDock {
  constructor(containerElement) {
    this.container = containerElement;
    this.isDraggingScrubber = false;
    this.repeatOptions = [
      { val: 1, devanagari: '१', name: '१ पाठ', desc: 'एकल पाठ' },
      { val: 3, devanagari: '३', name: '३ पाठ', desc: 'त्रिकाल शांति' },
      { val: 7, devanagari: '७', name: '७ पाठ', desc: 'संकट मुक्ति' },
      { val: 11, devanagari: '११', name: '११ पाठ', desc: 'मंगलवार विशेष' },
      { val: 21, devanagari: '२१', name: '२१ पाठ', desc: 'मनोकामना' },
      { val: 108, devanagari: '१०८', name: '१०८ पाठ', desc: 'महासंकल्प' }
    ];
    this.speeds = [
      { val: 0.75, label: '0.75x', desc: 'धीमा (Slow)' },
      { val: 0.85, label: '0.85x', desc: 'सहज (Calm)' },
      { val: 1.0, label: '1.0x', desc: 'सामान्य (Normal)' },
      { val: 1.15, label: '1.15x', desc: 'मध्यम (Moderate)' },
      { val: 1.25, label: '1.25x', desc: 'शीघ्र (Fast)' },
      { val: 1.5, label: '1.5x', desc: 'द्रुत (Swift)' }
    ];

    this.render();
    this.bindEvents();
    this.subscribeAudio();
  }

  render() {
    const currentVerse = audioService.getCurrentVerse();
    const currentSpeed = audioService.playbackSpeed || 1.0;
    const isAkhand = audioService.isAkhandLoop;
    const currentRepeat = audioService.repeatGoal || 1;

    const speedOptionsHTML = this.speeds.map(s => `
      <button type="button" class="speed-opt-btn ${s.val === currentSpeed ? 'active' : ''}" data-speed="${s.val}">
        <span>${s.label}</span>
        <small style="opacity: 0.75; font-size: 0.75rem;">${s.desc}</small>
      </button>
    `).join('');

    const repeatOptionsHTML = this.repeatOptions.map(r => `
      <button type="button" class="repeat-opt-btn ${(!isAkhand && r.val === currentRepeat) ? 'active' : ''}" data-repeat="${r.val}">
        <span class="repeat-opt-badge">${r.devanagari}</span>
        <span class="repeat-opt-name">${r.name}</span>
        <small class="repeat-opt-desc">${r.desc}</small>
      </button>
    `).join('');

    let repeatLabelText = `${currentRepeat}x`;
    if (isAkhand) {
      repeatLabelText = '∞ अखंड';
    }

    this.container.innerHTML = `
      <div class="audio-timeline-track" id="audio-timeline-track" title="Click to seek recitation">
        <div class="audio-timeline-fill" id="audio-timeline-fill">
          <div class="audio-timeline-thumb"></div>
        </div>
      </div>

      <div class="audio-dock-inner">
        <!-- Left: Track Details -->
        <div class="audio-track-info">
          <div class="audio-track-badge" id="audio-badge">
            ${ICONS.om}
          </div>
          <div class="audio-track-details">
            <div class="audio-track-title-row" style="display: flex; align-items: center; gap: 6px;">
              <span class="audio-track-title" id="audio-track-title">${currentVerse.titleDevanagari}</span>
              <span class="akhand-round-badge ${isAkhand ? 'akhand-infinite' : ''}" id="akhand-round-badge" style="${(isAkhand || currentRepeat > 1) ? 'display: inline-flex;' : 'display: none;'}">
                ${isAkhand ? `अखंड चक्र ${audioService.currentRepeatRound} (∞)` : `चक्र ${audioService.currentRepeatRound} / ${currentRepeat}`}
              </span>
            </div>
            <span class="audio-track-sub" id="audio-track-sub">${currentVerse.linesDevanagari[0]}</span>
          </div>
        </div>

        <!-- Center: Transport -->
        <div class="audio-transport-controls">
          <button type="button" class="transport-btn" id="btn-audio-prev" title="Previous Verse (Left Arrow)" aria-label="Previous Verse">
            ${ICONS.prev}
          </button>
          <button type="button" class="transport-btn-primary" id="btn-audio-play" title="Play / Pause Recitation (Spacebar)" aria-label="Play / Pause">
            ${ICONS.play}
          </button>
          <button type="button" class="transport-btn" id="btn-audio-next" title="Next Verse (Right Arrow)" aria-label="Next Verse">
            ${ICONS.next}
          </button>
          <span class="time-display" id="audio-time-display">0:00 / 9:42</span>
        </div>

        <!-- Right: Extras (Speed, Akhand Loop, Ambient, Sync) -->
        <div class="audio-dock-extras">
          <button type="button" class="dock-pill-btn btn-sync-toggle active" id="btn-sync-toggle" title="Toggle Verse Highlighting Sync" aria-label="Toggle Verse Sync">
            ${ICONS.sync}
            <span>Sync</span>
          </button>

          <!-- Speed Control Dropdown & Popover -->
          <div class="speed-dropdown" id="speed-dropdown-wrapper">
            <button type="button" class="dock-pill-btn btn-speed-toggle" id="btn-speed-toggle" title="Change Audio Speed" aria-label="Change Audio Speed" aria-expanded="false">
              ${ICONS.speed}
              <span id="speed-label">${currentSpeed}x</span>
            </button>
            <div class="speed-menu-popover" id="speed-menu-popover" role="menu" aria-label="Playback Speed Options">
              ${speedOptionsHTML}
            </div>
          </div>

          <!-- Akhand Path Loop & Repeat Dropdown -->
          <div class="repeat-dropdown" id="repeat-dropdown-wrapper">
            <button type="button" class="dock-pill-btn btn-repeat-toggle ${isAkhand ? 'active-akhand' : ''}" id="btn-repeat-toggle" title="Akhand Path Loop & Sankalp (अखंड पाठ व जप संकल्प)" aria-label="Repeat Count" aria-expanded="false">
              ${ICONS.replay}
              <span id="repeat-label">${repeatLabelText}</span>
            </button>
            <div class="repeat-menu-popover" id="repeat-menu-popover" role="menu" aria-label="Akhand Path Loop Options">
              <div class="repeat-popover-header">
                <span>🚩 अखंड पाठ लूप एवं संकल्प</span>
              </div>
              <div class="repeat-opts-grid">
                ${repeatOptionsHTML}
              </div>
              <div class="repeat-akhand-row">
                <button type="button" class="repeat-akhand-btn ${isAkhand ? 'active' : ''}" id="btn-akhand-infinite" data-repeat="0">
                  <span class="akhand-infinity-icon">∞</span>
                  <div class="akhand-btn-text">
                    <strong>अखंड पाठ लूप (Non-Stop Loop)</strong>
                    <small>अनवरत निरंतर श्रवण व पाठ (कभी न रुकने वाला)</small>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <button type="button" class="dock-pill-btn btn-ambient-sound" id="btn-ambient-toggle" title="Toggle Meditative Tanpura Drone" aria-label="Toggle Tanpura Drone">
            ${ICONS.tanpura}
            <span>तंबूरा</span>
          </button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const playBtn = this.container.querySelector('#btn-audio-play');
    const prevBtn = this.container.querySelector('#btn-audio-prev');
    const nextBtn = this.container.querySelector('#btn-audio-next');
    const ambientBtn = this.container.querySelector('#btn-ambient-toggle');
    const syncBtn = this.container.querySelector('#btn-sync-toggle');
    const speedBtn = this.container.querySelector('#btn-speed-toggle');
    const speedPopover = this.container.querySelector('#speed-menu-popover');
    const repeatBtn = this.container.querySelector('#btn-repeat-toggle');
    const repeatPopover = this.container.querySelector('#repeat-menu-popover');
    const track = this.container.querySelector('#audio-timeline-track');

    playBtn.addEventListener('click', () => {
      audioService.togglePlay();
    });

    prevBtn.addEventListener('click', () => {
      audioService.prevVerse();
    });

    nextBtn.addEventListener('click', () => {
      audioService.nextVerse();
    });

    ambientBtn.addEventListener('click', () => {
      const active = audioService.toggleTanpuraAmbient();
      ambientBtn.classList.toggle('active', active);
    });

    syncBtn.addEventListener('click', () => {
      const newState = !audioService.audioSyncEnabled;
      audioService.setAudioSync(newState);
      syncBtn.classList.toggle('active', newState);
    });

    // Speed Popover Toggle
    speedBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      repeatPopover.classList.remove('open');
      repeatBtn.setAttribute('aria-expanded', 'false');
      const isOpen = speedPopover.classList.toggle('open');
      speedBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Repeat / Akhand Loop Popover Toggle
    repeatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      speedPopover.classList.remove('open');
      speedBtn.setAttribute('aria-expanded', 'false');
      const isOpen = repeatPopover.classList.toggle('open');
      repeatBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close popovers when clicking outside
    document.addEventListener('click', (e) => {
      if (!speedPopover.contains(e.target) && e.target !== speedBtn) {
        speedPopover.classList.remove('open');
        speedBtn.setAttribute('aria-expanded', 'false');
      }
      if (!repeatPopover.contains(e.target) && e.target !== repeatBtn) {
        repeatPopover.classList.remove('open');
        repeatBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Speed option selection
    speedPopover.addEventListener('click', (e) => {
      const optBtn = e.target.closest('[data-speed]');
      if (!optBtn) return;

      const speedVal = parseFloat(optBtn.getAttribute('data-speed'));
      audioService.setSpeed(speedVal);

      speedPopover.querySelectorAll('.speed-opt-btn').forEach(btn => btn.classList.remove('active'));
      optBtn.classList.add('active');

      this.container.querySelector('#speed-label').textContent = `${speedVal}x`;
      speedPopover.classList.remove('open');
      speedBtn.setAttribute('aria-expanded', 'false');
    });

    // Repeat / Akhand Loop selection
    repeatPopover.addEventListener('click', (e) => {
      const optBtn = e.target.closest('[data-repeat]');
      if (!optBtn) return;

      const repeatVal = parseInt(optBtn.getAttribute('data-repeat'), 10);
      audioService.setRepeatCount(repeatVal);

      repeatPopover.classList.remove('open');
      repeatBtn.setAttribute('aria-expanded', 'false');
    });

    // Timeline Scrubber Click & Drag
    const handleSeek = (e) => {
      const rect = track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      audioService.seekRatio(ratio);
    };

    track.addEventListener('click', handleSeek);
  }

  subscribeAudio() {
    const playBtn = this.container.querySelector('#btn-audio-play');
    const titleEl = this.container.querySelector('#audio-track-title');
    const subEl = this.container.querySelector('#audio-track-sub');
    const fillEl = this.container.querySelector('#audio-timeline-fill');
    const timeEl = this.container.querySelector('#audio-time-display');
    const badge = this.container.querySelector('#audio-badge');
    const speedLabel = this.container.querySelector('#speed-label');
    const speedPopover = this.container.querySelector('#speed-menu-popover');
    const repeatLabel = this.container.querySelector('#repeat-label');
    const repeatBtn = this.container.querySelector('#btn-repeat-toggle');
    const repeatPopover = this.container.querySelector('#repeat-menu-popover');
    const akhandBadge = this.container.querySelector('#akhand-round-badge');

    audioService.on('statechange', ({ isPlaying }) => {
      playBtn.innerHTML = isPlaying ? ICONS.pause : ICONS.play;
      badge.classList.toggle('playing', isPlaying);
    });

    audioService.on('versechange', ({ index, verse }) => {
      titleEl.textContent = verse.titleDevanagari;
      subEl.textContent = verse.linesDevanagari[0];
    });

    audioService.on('timeupdate', ({ currentTime, totalDuration, progress }) => {
      fillEl.style.width = `${progress * 100}%`;
      timeEl.textContent = `${audioService.formatTime(currentTime)} / ${audioService.formatTime(totalDuration)}`;
    });

    audioService.on('speedchange', ({ speed }) => {
      if (speedLabel) speedLabel.textContent = `${speed}x`;
      if (speedPopover) {
        speedPopover.querySelectorAll('.speed-opt-btn').forEach(btn => {
          btn.classList.toggle('active', parseFloat(btn.getAttribute('data-speed')) === speed);
        });
      }
    });

    const updateLoopUI = ({ repeatGoal, isAkhandLoop, currentRound }) => {
      if (repeatLabel) {
        repeatLabel.textContent = isAkhandLoop ? '∞ अखंड' : `${repeatGoal}x`;
      }
      if (repeatBtn) {
        repeatBtn.classList.toggle('active-akhand', isAkhandLoop);
        repeatBtn.classList.toggle('active', repeatGoal > 1 || isAkhandLoop);
      }

      // Update popover active buttons
      if (repeatPopover) {
        repeatPopover.querySelectorAll('.repeat-opt-btn').forEach(btn => {
          const val = parseInt(btn.getAttribute('data-repeat'), 10);
          btn.classList.toggle('active', !isAkhandLoop && val === repeatGoal);
        });
        const akhandBtn = repeatPopover.querySelector('#btn-akhand-infinite');
        if (akhandBtn) akhandBtn.classList.toggle('active', isAkhandLoop);
      }

      // Update Akhand Round Badge
      if (akhandBadge) {
        if (isAkhandLoop) {
          akhandBadge.style.display = 'inline-flex';
          akhandBadge.classList.add('akhand-infinite');
          akhandBadge.textContent = `अखंड चक्र ${currentRound} (∞)`;
        } else if (repeatGoal > 1) {
          akhandBadge.style.display = 'inline-flex';
          akhandBadge.classList.remove('akhand-infinite');
          akhandBadge.textContent = `चक्र ${currentRound} / ${repeatGoal}`;
        } else {
          akhandBadge.style.display = 'none';
        }
      }
    };

    audioService.on('loopmodechange', updateLoopUI);

    audioService.on('roundchange', ({ round, total, isAkhand }) => {
      if (akhandBadge) {
        akhandBadge.style.display = 'inline-flex';
        if (isAkhand) {
          akhandBadge.classList.add('akhand-infinite');
          akhandBadge.textContent = `अखंड चक्र ${round} (∞)`;
        } else {
          akhandBadge.classList.remove('akhand-infinite');
          akhandBadge.textContent = `चक्र ${round} / ${total}`;
        }
      }
    });

    audioService.on('ended', () => {
      if (akhandBadge) {
        akhandBadge.style.display = 'none';
      }
    });
  }
}
