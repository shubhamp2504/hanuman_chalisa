/**
 * Verse Card Component
 * Renders individual Dohas and Chaupayis with Devanagari text,
 * Roman transliteration, Hindi/English meanings, word-by-word breakdown,
 * and audio controls.
 */

import { ICONS } from '../utils/icons.js';
import { storage } from '../services/storage-service.js';

export function createVerseCardHTML(verse, index, isCurrentRecitation = false, isUpcoming = false) {
  const isBookmarked = storage.isBookmarked(verse.id);
  const activeClass = isCurrentRecitation ? 'active-recitation' : '';
  const upcomingClass = isUpcoming ? 'upcoming-recitation' : '';
  
  // Format lines
  const linesHTML = verse.linesDevanagari
    .map(line => `<span class="verse-line">${line}</span>`)
    .join('');

  // Format Word-by-Word
  const wordByWordChips = verse.wordByWord && verse.wordByWord.length > 0
    ? verse.wordByWord.map(w => `
        <div class="word-meaning-chip">
          <span class="chip-word">${w.word}</span>
          <span class="chip-meaning">${w.meaning}</span>
        </div>
      `).join('')
    : '';

  return `
    <article 
      class="verse-card ${activeClass} ${upcomingClass}" 
      id="verse-card-${verse.id}" 
      data-verse-id="${verse.id}" 
      data-verse-index="${index}"
      tabindex="0"
      aria-label="${verse.titleDevanagari} — ${verse.titleEnglish}"
    >
      <header class="verse-card-header">
        <div class="verse-meta-left">
          <span class="verse-pill-number">${verse.verseNumberLabel}</span>
          <span class="verse-type-tag">${verse.titleEnglish}</span>
        </div>
        <div class="verse-actions-right">
          <button 
            type="button" 
            class="verse-icon-btn btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" 
            data-action="bookmark" 
            data-verse-id="${verse.id}"
            title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Verse'}"
            aria-label="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Verse'}"
          >
            ${isBookmarked ? ICONS.heart : ICONS.heartOutline}
          </button>
          <button 
            type="button" 
            class="verse-icon-btn btn-play-single" 
            data-action="play-verse" 
            data-verse-index="${index}"
            title="Play from this verse"
            aria-label="Play from this verse"
          >
            ${ICONS.play}
          </button>
        </div>
      </header>

      <div class="verse-devanagari">
        ${linesHTML}
      </div>

      <div class="verse-transliteration">
        ${verse.transliteration}
      </div>

      <div class="verse-meaning-hindi">
        <strong>सरल अर्थ:</strong> ${verse.hindiMeaning}
      </div>

      <div class="verse-meaning-english">
        <strong>English:</strong> ${verse.englishMeaning}
      </div>

      ${wordByWordChips ? `
        <button type="button" class="word-by-word-toggle" data-action="toggle-word-by-word" aria-expanded="false">
          <span>शब्दार्थ (Word-by-Word Meaning)</span>
          <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
        </button>
        <div class="word-by-word-grid">
          ${wordByWordChips}
        </div>
      ` : ''}

      <footer class="verse-card-footer">
        <span class="verse-theme-tag">
          ${ICONS.lotus}
          <span>${verse.theme}</span>
        </span>
        <button type="button" class="btn-play-verse" data-action="play-verse" data-verse-index="${index}">
          ${ICONS.play}
          <span>पाठ सुनें (Listen)</span>
        </button>
      </footer>
    </article>
  `;
}
