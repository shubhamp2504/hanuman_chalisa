/**
 * Temple Single-Page Full Hanuman Chalisa View
 * Pure, authentic, continuous hymn layout designed for temple chanting,
 * daily Nitya Path, and undisturbed devotional reading.
 */

import { CHALISA_DATA } from '../content/chalisa-data.js';

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toDevanagariNumeral(num) {
  return String(num).split('').map(d => DEVANAGARI_DIGITS[parseInt(d, 10)] ?? d).join('');
}

export function renderTempleSinglePageHTML(showMeaning = false) {
  const openingDohas = CHALISA_DATA.slice(0, 2);
  const chaupayis = CHALISA_DATA.slice(2, 42);
  const closingDoha = CHALISA_DATA.slice(42, 43);

  const renderCouplet = (verse, globalIndex) => {
    const isChaupayi = verse.type === 'chaupayi';
    const numDev = verse.number ? toDevanagariNumeral(verse.number) : '';
    
    return `
      <div 
        class="temple-couplet ${globalIndex === 0 ? 'active-temple-verse' : ''}" 
        id="temple-couplet-${globalIndex}" 
        data-temple-index="${globalIndex}"
        role="button"
        tabindex="0"
        title="Tap to listen from this verse"
      >
        <div class="temple-lines-wrap">
          <div class="temple-line">${verse.linesDevanagari[0]}</div>
          <div class="temple-line">
            <span>${verse.linesDevanagari[1]}</span>
            ${isChaupayi ? `<span class="temple-verse-number">॥ ${numDev} ॥</span>` : ''}
          </div>
        </div>
        <div class="temple-meaning-inline" style="display: ${showMeaning ? 'block' : 'none'};">
          <span class="temple-meaning-bullet">भावार्थ:</span> ${verse.hindiMeaning}
        </div>
      </div>
    `;
  };

  return `
    <div class="temple-manuscript" id="temple-manuscript">
      <!-- Traditional Sacred Header -->
      <div class="temple-shloka-head">
        <div class="temple-om-symbol">ॐ</div>
        <h2 class="temple-main-title">॥ श्री हनुमान चालीसा ॥</h2>
        <p class="temple-subtitle-author">महाकवि गोस्वामी तुलसीदास कृत • अवधी भाषा</p>
        <div class="temple-decorative-divider">❖ ❖ ❖</div>
      </div>

      <!-- 1. Opening Dohas -->
      <div class="temple-group-block">
        <div class="temple-group-title">॥ दोहा ॥</div>
        <div class="temple-couplets-list" id="temple-dohas-opening">
          ${openingDohas.map((v, i) => renderCouplet(v, i)).join('')}
        </div>
      </div>

      <div class="temple-section-separator">✦ ✦ ✦</div>

      <!-- 2. 40 Chaupayis -->
      <div class="temple-group-block">
        <div class="temple-group-title">॥ चौपाई ॥</div>
        <div class="temple-couplets-list" id="temple-chaupayis-list">
          ${chaupayis.map((v, i) => renderCouplet(v, i + 2)).join('')}
        </div>
      </div>

      <div class="temple-section-separator">✦ ✦ ✦</div>

      <!-- 3. Closing Doha -->
      <div class="temple-group-block">
        <div class="temple-group-title">॥ दोहा ॥</div>
        <div class="temple-couplets-list" id="temple-dohas-closing">
          ${closingDoha.map((v, i) => renderCouplet(v, 42)).join('')}
        </div>
      </div>

      <!-- Traditional Colophon -->
      <div class="temple-colophon-box">
        <p class="temple-colophon-text">॥ इति श्रीगोस्वामितुलसीदासकृतं श्रीहनुमानचालीसा समाप्तम् ॥</p>
        <p class="temple-slogan">॥ जय श्री राम • संकटमोचन कृपा निधान ॥</p>
      </div>
    </div>
  `;
}
