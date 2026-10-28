/**
 * Storage Service for Hanuman Chalisa — The Living Temple
 * Handles LocalStorage for settings & preferences,
 * and IndexedDB for private devotional journal & session logs.
 */

const STORAGE_KEYS = {
  THEME: 'hc_theme',
  FONT_SCALE: 'hc_font_scale',
  LANG: 'hc_lang',
  LAST_VERSE: 'hc_last_verse',
  SANKALP_GOAL: 'hc_sankalp_goal',
  AUDIO_SYNC: 'hc_audio_sync',
  PLAYBACK_SPEED: 'hc_playback_speed',
  AMBIENT_ON: 'hc_ambient_on',
  BOOKMARKS: 'hc_bookmarks',
  JAPAMALA_COUNT: 'hc_japamala_count',
  JOURNAL: 'hc_journal_entries',
  SESSIONS: 'hc_sadhana_sessions',
  AKHAND_LOOP: 'hc_akhand_loop',
  REPEAT_GOAL: 'hc_repeat_goal'
};

const DB_NAME = 'HanumanChalisaDB';
const DB_VERSION = 1;
const STORE_JOURNAL = 'journal';
const STORE_SESSIONS = 'sessions';

class StorageService {
  constructor() {
    this.db = null;
    this._initDB();
  }

  // --- LocalStorage Helpers ---
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'temple';
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  getFontScale() {
    return parseFloat(localStorage.getItem(STORAGE_KEYS.FONT_SCALE) || '1.0');
  }

  setFontScale(scale) {
    localStorage.setItem(STORAGE_KEYS.FONT_SCALE, scale.toString());
    document.documentElement.style.setProperty('--reader-scale', scale.toString());
  }

  getLanguage() {
    return localStorage.getItem(STORAGE_KEYS.LANG) || 'all'; // 'all', 'hi', 'en', 'translit'
  }

  setLanguage(lang) {
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  }

  getLastVerseId() {
    return localStorage.getItem(STORAGE_KEYS.LAST_VERSE) || 'doha-1';
  }

  setLastVerseId(verseId) {
    localStorage.setItem(STORAGE_KEYS.LAST_VERSE, verseId);
  }

  getSankalpGoal() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.SANKALP_GOAL) || '7', 10);
  }

  setSankalpGoal(goal) {
    localStorage.setItem(STORAGE_KEYS.SANKALP_GOAL, goal.toString());
  }

  getRepeatGoal() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.REPEAT_GOAL) || '1', 10);
  }

  setRepeatGoal(goal) {
    localStorage.setItem(STORAGE_KEYS.REPEAT_GOAL, goal.toString());
  }

  getAkhandLoop() {
    return localStorage.getItem(STORAGE_KEYS.AKHAND_LOOP) === 'true';
  }

  setAkhandLoop(enabled) {
    localStorage.setItem(STORAGE_KEYS.AKHAND_LOOP, enabled ? 'true' : 'false');
  }

  getAudioSync() {
    const val = localStorage.getItem(STORAGE_KEYS.AUDIO_SYNC);
    return val === null ? true : val === 'true';
  }

  setAudioSync(enabled) {
    localStorage.setItem(STORAGE_KEYS.AUDIO_SYNC, enabled ? 'true' : 'false');
  }

  getPlaybackSpeed() {
    return parseFloat(localStorage.getItem(STORAGE_KEYS.PLAYBACK_SPEED) || '1.0');
  }

  setPlaybackSpeed(speed) {
    localStorage.setItem(STORAGE_KEYS.PLAYBACK_SPEED, speed.toString());
  }

  getAmbientOn() {
    return localStorage.getItem(STORAGE_KEYS.AMBIENT_ON) === 'true';
  }

  setAmbientOn(enabled) {
    localStorage.setItem(STORAGE_KEYS.AMBIENT_ON, enabled ? 'true' : 'false');
  }

  getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  toggleBookmark(verseId) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(verseId);
    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(verseId);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return bookmarks.includes(verseId);
  }

  isBookmarked(verseId) {
    return this.getBookmarks().includes(verseId);
  }

  getJapamalaCount() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.JAPAMALA_COUNT) || '0', 10);
  }

  setJapamalaCount(count) {
    localStorage.setItem(STORAGE_KEYS.JAPAMALA_COUNT, count.toString());
  }

  // --- IndexedDB for Private Devotional Journal & Sadhana Logs ---
  async _initDB() {
    if (!window.indexedDB) return;
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_JOURNAL)) {
          db.createObjectStore(STORE_JOURNAL, { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains(STORE_SESSIONS)) {
          db.createObjectStore(STORE_SESSIONS, { keyPath: 'id', autoIncrement: true });
        }
      };
      request.onsuccess = (event) => {
        this.db = event.target.result;
      };
    } catch (e) {
      console.warn('IndexedDB initialization failed, falling back to LocalStorage', e);
    }
  }

  async saveJournalEntry(text) {
    const entry = {
      text,
      timestamp: Date.now(),
      dateString: new Date().toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction(STORE_JOURNAL, 'readwrite');
        const store = tx.objectStore(STORE_JOURNAL);
        const req = store.add(entry);
        req.onsuccess = () => resolve(entry);
        req.onerror = () => {
          this._saveJournalFallback(entry);
          resolve(entry);
        };
      });
    } else {
      this._saveJournalFallback(entry);
      return entry;
    }
  }

  _saveJournalFallback(entry) {
    const entries = this.getJournalEntriesSync();
    entries.unshift(entry);
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries.slice(0, 50)));
  }

  async getJournalEntries() {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction(STORE_JOURNAL, 'readonly');
        const store = tx.objectStore(STORE_JOURNAL);
        const req = store.getAll();
        req.onsuccess = () => {
          const res = req.result || [];
          res.sort((a, b) => b.timestamp - a.timestamp);
          resolve(res);
        };
        req.onerror = () => resolve(this.getJournalEntriesSync());
      });
    }
    return this.getJournalEntriesSync();
  }

  getJournalEntriesSync() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
}

export const storage = new StorageService();
