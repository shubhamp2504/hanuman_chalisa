/**
 * Audio Dock Component
 * Fixed bottom player dock for Living Recitation and Meditative Soundscape.
 */

import { ICONS } from '../utils/icons.js';
import { audioService } from '../services/audio-service.js';
import { CHALISA_DATA } from '../content/chalisa-data.js';

export class AudioDock {
  constructor(containerElement) {
    this.container = containerElement;
    this.isDraggingScrubber = false;
    this.repeatCounts = [1, 3, 7, 11, 21, 108];
    this.repeatIndex = 0;
    this.speeds = [0.75, 1.0, 1.25];
    this.speedIndex = 1;

    this.render();
    this.bindEvents();
    this.subscribeAudio();
  }

  render() {
    const currentVerse = audioService.getCurrentVerse();

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
            <span class="audio-track-title" id="audio-track-title">${currentVerse.titleDevanagari}</span>
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
          <span class="time-display" id="audio-time-display">0:00 / 4:30</span>
        </div>

        <!-- Right: Extras (Speed, Repeat, Ambient, Sync) -->
        <div class="audio-dock-extras">
          <button type="button" class="dock-pill-btn btn-sync-toggle active" id="btn-sync-toggle" title="Toggle Verse Highlighting Sync" aria-label="Toggle Verse Sync">
            ${ICONS.sync}
            <span>Sync</span>
          </button>

          <button type="button" class="dock-pill-btn" id="btn-speed-toggle" title="Playback Speed" aria-label="Playback Speed">
            <span id="speed-label">1.0x</span>
          </button>

          <button type="button" class="dock-pill-btn" id="btn-repeat-toggle" title="Sankalp Chanting Repeat Count" aria-label="Repeat Count">
            ${ICONS.replay}
            <span id="repeat-label">1x</span>
          </button>

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
    const repeatBtn = this.container.querySelector('#btn-repeat-toggle');
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

    speedBtn.addEventListener('click', () => {
      this.speedIndex = (this.speedIndex + 1) % this.speeds.length;
      const speed = this.speeds[this.speedIndex];
      audioService.setSpeed(speed);
      this.container.querySelector('#speed-label').textContent = `${speed}x`;
    });

    repeatBtn.addEventListener('click', () => {
      this.repeatIndex = (this.repeatIndex + 1) % this.repeatCounts.length;
      const count = this.repeatCounts[this.repeatIndex];
      audioService.setRepeatCount(count);
      this.container.querySelector('#repeat-label').textContent = `${count}x`;
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
  }
}
