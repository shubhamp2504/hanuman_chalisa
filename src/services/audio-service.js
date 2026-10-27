/**
 * Audio Service for Hanuman Chalisa — The Living Temple
 *
 * Implements:
 * 1. Studio-Mastered Real Audio Recitation (Hariharan & Gulshan Kumar) via HTML5 Audio API
 * 2. Exact timestamp synchronization across all 43 verses (startTime / endTime)
 * 3. Web Audio API Meditative Tanpura Drone Generator (Harmonic Sa-Pa-Sa drone)
 * 4. Web Audio API Resonant Bronze Temple Bell Synthesizer (852 Hz Solfeggio fundamental)
 */

import { CHALISA_DATA } from '../content/chalisa-data.js';
import { storage } from './storage-service.js';

class AudioService {
  constructor() {
    this.audioCtx = null;
    this.tanpuraRunning = false;
    this.tanpuraOscs = [];
    this.tanpuraTimer = null;

    // Real Audio Element
    this.audio = new Audio('/audio/hanuman_chalisa.m4a');
    this.audio.preload = 'metadata';

    // State
    this.isPlaying = false;
    this.currentVerseIndex = 0;
    this.playbackSpeed = storage.getPlaybackSpeed();
    this.repeatGoal = 1;
    this.currentRepeatRound = 1;
    this.audioSyncEnabled = storage.getAudioSync();
    this.totalDuration = 582; // Total track duration (approx 9m 42s)
    this.currentTime = 0;

    // Event listeners map
    this.listeners = {
      versechange: [],
      statechange: [],
      timeupdate: [],
      ended: []
    };

    this._bindAudioEvents();
  }

  _initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  _emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  _bindAudioEvents() {
    this.audio.playbackRate = this.playbackSpeed;

    this.audio.addEventListener('loadedmetadata', () => {
      if (this.audio.duration && !isNaN(this.audio.duration)) {
        this.totalDuration = this.audio.duration;
      }
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
      this._checkVerseAtTime(this.currentTime);

      this._emit('timeupdate', {
        currentTime: this.currentTime,
        totalDuration: this.totalDuration,
        progress: this.totalDuration > 0 ? this.currentTime / this.totalDuration : 0
      });
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.audio.playbackRate = this.playbackSpeed;
      this._emit('statechange', { isPlaying: true });
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this._emit('statechange', { isPlaying: false });
    });

    this.audio.addEventListener('ended', () => {
      this._handleRecitationCycleEnd();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Real audio file playback notice:', e);
    });
  }

  _checkVerseAtTime(time) {
    // Check if current time falls into a specific verse
    let matchedIndex = -1;
    for (let i = 0; i < CHALISA_DATA.length; i++) {
      const v = CHALISA_DATA[i];
      if (time >= v.startTime && time < v.endTime) {
        matchedIndex = i;
        break;
      }
    }

    if (matchedIndex !== -1 && matchedIndex !== this.currentVerseIndex) {
      this.currentVerseIndex = matchedIndex;
      this._emit('versechange', {
        index: this.currentVerseIndex,
        verse: CHALISA_DATA[this.currentVerseIndex]
      });
    }
  }

  // =========================================================================
  // 1. RESONANT TEMPLE BELL (Web Audio API Synthesizer)
  // =========================================================================
  playTempleBell() {
    this._initAudioContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const baseFreq = 852; // Solfeggio frequency for spiritual awakening

      const harmonics = [
        { freq: baseFreq, gain: 0.45, decay: 3.2 },
        { freq: baseFreq * 1.5, gain: 0.3, decay: 2.5 },
        { freq: baseFreq * 2.0, gain: 0.2, decay: 1.8 },
        { freq: baseFreq * 2.76, gain: 0.15, decay: 1.4 },
        { freq: baseFreq * 3.8, gain: 0.08, decay: 1.0 }
      ];

      harmonics.forEach(({ freq, gain, decay }) => {
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(gain, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + decay);
      });
    } catch (e) {
      console.warn('Temple bell synthesis error:', e);
    }
  }

  // =========================================================================
  // 2. SACRED TANPURA AMBIENT DRONE (Continuous Web Audio Engine)
  // =========================================================================
  toggleTanpuraAmbient() {
    if (this.tanpuraRunning) {
      this.stopTanpuraAmbient();
      return false;
    } else {
      this.startTanpuraAmbient();
      return true;
    }
  }

  startTanpuraAmbient() {
    this._initAudioContext();
    if (!this.audioCtx || this.tanpuraRunning) return;

    this.tanpuraRunning = true;
    storage.setAmbientOn(true);

    const baseFreq = 146.83;
    const stringFreqs = [baseFreq * 1.5, baseFreq * 2, baseFreq * 2, baseFreq];
    let stringIndex = 0;

    const pluckString = () => {
      if (!this.tanpuraRunning || !this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const freq = stringFreqs[stringIndex % stringFreqs.length];
      stringIndex++;

      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, now);

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(0.045, now + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 3.9);

      this.tanpuraTimer = setTimeout(pluckString, 1100);
    };

    pluckString();
  }

  stopTanpuraAmbient() {
    this.tanpuraRunning = false;
    storage.setAmbientOn(false);
    if (this.tanpuraTimer) {
      clearTimeout(this.tanpuraTimer);
      this.tanpuraTimer = null;
    }
  }

  // =========================================================================
  // 3. LIVING RECITATION ENGINE (REAL STUDIO AUDIO)
  // =========================================================================
  play() {
    this._initAudioContext();
    this.audio.play().catch(err => {
      console.warn('Playback gesture required:', err);
    });
  }

  pause() {
    this.audio.pause();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  jumpToVerse(index) {
    if (index < 0) index = 0;
    if (index >= CHALISA_DATA.length) index = CHALISA_DATA.length - 1;

    this.currentVerseIndex = index;
    const verse = CHALISA_DATA[this.currentVerseIndex];

    if (verse && verse.startTime !== undefined) {
      this.audio.currentTime = verse.startTime;
    }

    this._emit('versechange', {
      index: this.currentVerseIndex,
      verse: CHALISA_DATA[this.currentVerseIndex]
    });
  }

  nextVerse() {
    if (this.currentVerseIndex < CHALISA_DATA.length - 1) {
      this.jumpToVerse(this.currentVerseIndex + 1);
    } else {
      this._handleRecitationCycleEnd();
    }
  }

  prevVerse() {
    if (this.currentVerseIndex > 0) {
      this.jumpToVerse(this.currentVerseIndex - 1);
    }
  }

  seekRatio(ratio) {
    ratio = Math.max(0, Math.min(1, ratio));
    const targetTime = ratio * this.totalDuration;
    this.audio.currentTime = targetTime;
  }

  setSpeed(speed) {
    this.playbackSpeed = speed;
    this.audio.playbackRate = speed;
    storage.setPlaybackSpeed(speed);
    this._emit('speedchange', { speed });
  }

  setRepeatCount(count) {
    this.repeatGoal = count;
  }

  setAudioSync(enabled) {
    this.audioSyncEnabled = enabled;
    storage.setAudioSync(enabled);
  }

  getCurrentVerse() {
    return CHALISA_DATA[this.currentVerseIndex];
  }

  _handleRecitationCycleEnd() {
    this.playTempleBell();

    if (this.currentRepeatRound < this.repeatGoal) {
      this.currentRepeatRound++;
      this.audio.currentTime = CHALISA_DATA[0].startTime;
      this.play();
    } else {
      this.pause();
      this.audio.currentTime = 0;
      this.currentRepeatRound = 1;
      this.currentVerseIndex = 0;
      this._emit('ended', { completedRounds: this.repeatGoal });
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}

export const audioService = new AudioService();
