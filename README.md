# श्री हनुमान चालीसा — The Living Temple
### A Premium, Inclusive, Immersive Devotional Web Experience

> **॥ श्री हनुमते नमः ॥**  
> *"पवनतनय संकट हरन मंगल मूरति रूप । राम लखन सीता सहित हृदय बसहु सुर भूप ॥"*

---

## 🌟 Executive Summary

**The Living Temple** is a production-grade, highly inclusive, and immersive digital temple application dedicated to Goswami Tulsidas's sacred **Shri Hanuman Chalisa**. Engineered without heavy frameworks, it uses Vanilla ES Modules, Modern CSS with custom properties, and HTML5 Web APIs (Web Audio, Canvas, IndexedDB, Service Worker) to deliver a reverent, fast, and accessible devotional experience for people of all generations.

---

## 🏛️ Seven Core Experiences

### 1. Experience A — The Threshold (द्वार)
- **Cinematic Sanctum Sanctorum:** Features high-resolution, respectful, original artwork of Lord Hanuman in Abhaya Mudra with temple lamps, brass bells, and divine golden rays.
- **Three One-Tap Immediate Actions:**
  1. **LISTEN (श्रवण):** 1-tap playback of complete Chalisa recitation.
  2. **READ (पाठ):** Direct entrance to the sacred reader.
  3. **UNDERSTAND (अर्थ):** Deep dive into wisdom, virtues, and Ramayana backstories.
- **Interactive Heart Diya:** Tap to kindle an inner flame with a golden spark emission and temple bell chime.
- **Daily Reflection Verse:** Prominently highlights an inspiring Doha or Chaupayi on every visit.

### 2. Experience B — The Living Chalisa (सजीव पाठ)
- **100% Verified Sacred Text:**
  - 2 Traditional Opening Dohas (*श्रीगुरु चरन सरोज रज...* & *बुद्धिहीन तनु जानिके...*)
  - All 40 Chaupayis in exact traditional order (1 to 40)
  - 1 Traditional Closing Doha (*पवनतनय संकट हरन...*)
- **Multilingual Presentation:**
  - Pristine Devanagari Awadhi text
  - Poetic Roman transliteration
  - Simple Hindi explanation (*सरल अर्थ*)
  - Dignified English translation
  - Interactive Word-by-Word Breakdown (*शब्दार्थ*)
- **Reading Controls:**
  - Continuous scroll mode vs. Focused single-verse mode
  - Verse Index Drawer (jump directly to any Chaupayi 1–40 or Doha)
  - Text scale adjustability (`A-`, `A`, `A+`, `A++`)
  - Distraction-Free Reading Mode (hides chrome and maximizes peace)
  - Verse bookmarking (persisted locally)
- **Living Recitation Synchronization:**
  - During playback, the active verse is highlighted in radiant golden aura (`active-recitation`).
  - Auto-scroll keeps the current verse gently centered.
  - Upcoming verse preview peek.
  - Click any verse card to jump and play directly from that point.

### 3. Experience C — One-Tap Audio Dock (श्रवण)
- **Living Player Controls:** Play/Pause, Seek scrubber, Next/Previous verse navigation, Playback speed selector (`0.75x`, `1.0x`, `1.25x`), Repeat cycle counter (`1x`, `3x`, `7x`, `11x`, `21x`, `108x`).
- **Web Audio Meditative Tanpura Drone:** Custom synthesized harmonic acoustic drone (Sa-Pa-Sa: 146.83Hz / 220Hz / 293.66Hz) that runs seamlessly in the background.
- **Web Audio Bronze Temple Bell:** Multi-harmonic overtone synthesizer (852Hz Solfeggio fundamental) with realistic exponential decay.
- **Audio Sync Toggle:** Turn auto-scroll and highlighting on or off with a single click.

### 4. Experience D — Multilingual India (बहुभाषी भारत)
- Seamless switching between **Devanagari**, **Roman Transliteration**, and **English Meaning**.
- Instant filtering without losing reading position or audio playback.

### 5. Experience E — Sankalp: Devotional Sadhana (साधना)
- **Sankalp Goal Selection:** Commit to 1, 3, 7, 11, 21, or 108 recitations.
- **Digital Japamala:** 108 beads chanting counter with haptic vibration feedback, progress bar, and bell chime upon cycle completion.
- **Altar Diya:** Full-size interactive canvas brass lamp with realistic flickering flame, wick, and oil pool.
- **Private Devotional Journal:** Dedicated reflection journal stored privately in **IndexedDB** on the user's device (no cloud tracking or privacy invasion).
- **Ethical Design:** Strictly no guilt-inducing streaks, no competitive leaderboards, and zero commercialization.

### 6. Experience F — Wisdom Explorer (ज्ञान)
- **5 Core Divine Virtues:**
  1. *Nishkama Bhakti* (Selfless Devotion)
  2. *Shaurya* (Righteous Courage)
  3. *Vinamrata* (Unshakeable Humility)
  4. *Buddhi & Viveka* (Wisdom & Discernment)
  5. *Seva* (Dedicated Service)
- **6 Sacred Ramayana Episodes:**
  - *Mount Dronagiri & Sanjeevani Herb* (Chaupayi 11)
  - *Swallowing the Sun / Solar Distance* (Chaupayi 18)
  - *Ashok Vatika & Lanka Dahan* (Chaupayi 9)
  - *First Meeting with Sri Rama at Rishyamukha* (Chaupayi 2)
  - *Crossing the Ocean & The Three Tests* (Chaupayi 19)
  - *Mystery of Ashta Siddhi & Nava Nidhi* (Chaupayi 31)
- **Direct Cross-Linking:** Click any story to instantly open and highlight the corresponding verse in the reader.

### 7. Experience G — Darshan Mode (दर्शन)
- Atmospheric fullscreen temple sanctum view.
- Real-time HTML5 Canvas particle system of gently drifting saffron marigold and white jasmine flower petals.
- Central illuminated verse projection with minimal discreet controls and exit button.

---

## 🎨 Design Tokens & Themes

The design implements the four custom curated spiritual themes:

| Theme | Class / Token | Purpose |
|---|---|---|
| **मंदिर (Temple)** | `data-theme="temple"` | Default sanctum sanctorum: Deep charcoal (`#14100F`), Midnight brown (`#211612`), Saffron (`#F59E0B`), and Antique gold (`#D9B56D`). |
| **प्रकाश (Parchment)** | `data-theme="parchment"` | Warm sunlit temple parchment mode tailored for elderly readers and outdoor sunlight reading with supreme contrast. |
| **रात्रि (Nocturne)** | `data-theme="dark"` | Pure deep charcoal OLED black for minimal eye strain during quiet midnight recitations. |
| **गेरुआ (Sacred Ochre)** | `data-theme="ochre"` | Earthy terracotta (`#9D5035`) and holy gerua ascetic aesthetic. |

---

## 🚀 Local Development & Build

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
git clone <repo-url>
cd vibe_coding_hanuman_chalisa
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production
```bash
npm run build
```
The optimized production bundle is generated in the `dist/` folder:
- Pure static HTML, CSS, and JS (Zero server runtime required).
- Assets hashed and gzipped.

### Preview Production Build
```bash
npm run preview
```

---

## 📱 PWA & Offline Access

- **Service Worker (`public/sw.js`):** Caches the complete app shell, fonts, styles, and verified scriptures.
- **Web App Manifest (`public/manifest.webmanifest`):** Allows "Install as App" on Android, iOS, Windows, and macOS with standalone display and devotional icon.
- **Offline Assurance:** The complete text, meanings, word-by-word glossaries, journal, and sound generators operate 100% offline once visited.

---

## 🌐 Static Deployment

Since this application compiles to static assets in `dist/`, it can be hosted on any static hosting platform:

### 1. GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist/` directory via `gh-pages` or GitHub Actions.

### 2. Vercel
```bash
npx vercel
```
- Output Directory: `dist`

### 3. Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### 4. Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `dist`

---

## 🕉️ Dedication

*Dedicated with devotion to Sri Sita-Rama and Sri Hanuman Ji.*  
*May all beings be free from suffering and attain eternal peace.*
