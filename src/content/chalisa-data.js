/**
 * Authentic, verified sacred text of the Shri Hanuman Chalisa
 * Composed by Goswami Tulsidas in Awadhi.
 * Contains:
 * - 2 Opening Dohas
 * - 40 Chaupayis
 * - 1 Closing Doha
 *
 * Each entry provides Devanagari text, Roman transliteration,
 * simple Hindi meaning, clear English translation, word-by-word breakdown,
 * key spiritual theme, and connected Wisdom story references.
 */

export const CHALISA_DATA = [
  {
    id: "doha-1",
    type: "doha-opening",
    number: null,
    titleDevanagari: "प्रारंभिक दोहा १",
    titleEnglish: "Opening Doha 1",
    verseNumberLabel: "दोहा १",
    linesDevanagari: [
      "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।",
      "बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥"
    ],
    transliteration: "Shri Guru Charana Saroja Raja, Nija Manu Mukuru Sudhari ।\nBaranau Raghubara Bimala Jasu, Jo Dayaku Phala Chari ॥",
    hindiMeaning: "अपने गुरु के चरण कमलों की धूलि से अपने मन रूपी दर्पण को पवित्र और स्वच्छ करके, मैं श्री रघुवीर (श्रीराम) के उस निर्मल यश का गान करता हूँ, जो जीवन के चारों पुरुषार्थों (धर्म, अर्थ, काम और मोक्ष) को प्रदान करने वाला है।",
    englishMeaning: "Cleansing the mirror of my mind with the dust of the lotus feet of the revered Guru, I narrate the pure glory of Sri Raghuvara (Lord Rama), which bestows the four essential fruits of human life (Dharma, Artha, Kama, and Moksha).",
    wordByWord: [
      { word: "श्रीगुरु", meaning: "Revered spiritual master / Divine guide" },
      { word: "चरन सरोज रज", meaning: "Dust of lotus feet (sacred humility)" },
      { word: "निज मनु मुकुरु सुधारि", meaning: "Cleansing the mirror of one's own heart/mind" },
      { word: "बरनउँ", meaning: "I narrate / sing" },
      { word: "रघुबर बिमल जसु", meaning: "The immaculate glory of Lord Rama" },
      { word: "दायकु फल चारि", meaning: "Bestower of the four fruits (Righteousness, Wealth, Joy, Liberation)" }
    ],
    theme: "Humility & Guru Vandana",
    storyRef: "guru-vandana",
    approxDuration: 8.5
  },
  {
    id: "doha-2",
    type: "doha-opening",
    number: null,
    titleDevanagari: "प्रारंभिक दोहा २",
    titleEnglish: "Opening Doha 2",
    verseNumberLabel: "दोहा २",
    linesDevanagari: [
      "बुद्धिहीन तनु जानिके सुमिरौ पवन-कुमार ।",
      "बल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार ॥"
    ],
    transliteration: "Buddhi-Heena Tanu Janike, Sumirau Pawana-Kumara ।\nBala Budhi Bidya Dehu Mohi, Harahu Kalesa Bikara ॥",
    hindiMeaning: "हे पवनकुमार! स्वयं को शारीरिक व मानसिक रूप से सामर्थ्यहीन और अज्ञानी जानकर मैं आपका स्मरण करता हूँ। मुझे शारीरिक बल, सद्बुद्धि और विद्या प्रदान कीजिए तथा मेरे समस्त क्लेशों (दुःखों) और विकारों को दूर कर दीजिए।",
    englishMeaning: "Knowing myself to be devoid of wisdom and pure understanding, I meditate upon you, O son of the Wind God (Pavana-Kumara). Bestow upon me physical strength, keen intellect, and sacred wisdom, and remove all my afflictions and inner impurities.",
    wordByWord: [
      { word: "बुद्धिहीन", meaning: "Devoid of wisdom / acknowledging human limitation" },
      { word: "तनु जानिके", meaning: "Knowing my mortal self" },
      { word: "सुमिरौ", meaning: "I meditate upon / remember" },
      { word: "पवन-कुमार", meaning: "O Son of the Wind God (Hanuman)" },
      { word: "बल बुधि बिद्या", meaning: "Physical strength, intellect, and spiritual knowledge" },
      { word: "हरहु कलेस बिकार", meaning: "Dispel all sorrows and mental impurities" }
    ],
    theme: "Supplication & Surrender",
    storyRef: "surrender",
    approxDuration: 8.0
  },
  {
    id: "verse-1",
    type: "chaupayi",
    number: 1,
    titleDevanagari: "चौपाई १",
    titleEnglish: "Chaupayi 1",
    verseNumberLabel: "१",
    linesDevanagari: [
      "जय हनुमान ज्ञान गुन सागर ।",
      "जय कपीस तिहुँ लोक उजागर ॥"
    ],
    transliteration: "Jaya Hanumana Gyana Guna Sagara ।\nJaya Kapisa Tihun Loka Ujagara ॥",
    hindiMeaning: "हे श्री हनुमान! आपकी जय हो, आप ज्ञान और सद्गुणों के अथाह सागर हैं। हे वानरेश्वर! आपकी जय हो, आपका पावन प्रकाश और यश तीनों लोकों (स्वर्ग, पृथ्वी, पाताल) में प्रदीप्त है।",
    englishMeaning: "Victory to Lord Hanuman, who is an infinite ocean of wisdom and virtues. Victory to the foremost among the Vanaras, whose radiant glory illuminates all three worlds.",
    wordByWord: [
      { word: "ज्ञान गुन सागर", meaning: "Ocean of divine wisdom and virtuous qualities" },
      { word: "कपीस", meaning: "Supreme sovereign among the Vanaras" },
      { word: "तिहुँ लोक उजागर", meaning: "Illuminator of the three realms of creation" }
    ],
    theme: "Wisdom & Cosmic Radiance",
    storyRef: "infinite-wisdom",
    approxDuration: 6.5
  },
  {
    id: "verse-2",
    type: "chaupayi",
    number: 2,
    titleDevanagari: "चौपाई २",
    titleEnglish: "Chaupayi 2",
    verseNumberLabel: "२",
    linesDevanagari: [
      "राम दूत अतुलित बल धामा ।",
      "अंजनि-पुत्र पवनसुत नामा ॥"
    ],
    transliteration: "Rama Duta Atulita Bala Dhama ।\nAnjani-Putra Pawanasuta Nama ॥",
    hindiMeaning: "आप श्रीराम के अद्वितीय दूत और अतुलनीय (असीम) बल के धाम हैं। आप माता अंजना के तेजस्वी पुत्र हैं और पवनसुत के नाम से विख्यात हैं।",
    englishMeaning: "You are the trusted messenger of Lord Rama, the supreme abode of immeasurable strength. You are hailed as the son of Mother Anjani and celebrated by the name Pavanasuta (son of the Wind).",
    wordByWord: [
      { word: "राम दूत", meaning: "Envoy and ambassador of Lord Rama" },
      { word: "अतुलित बल धामा", meaning: "Abode of incomparable and limitless fortitude" },
      { word: "अंजनि-पुत्र", meaning: "Beloved son of mother Anjana" },
      { word: "पवनसुत", meaning: "Offspring of the deity of Wind (Vayu)" }
    ],
    theme: "Unmatched Fortitude & Divine Lineage",
    storyRef: "meeting-rama",
    approxDuration: 6.5
  },
  {
    id: "verse-3",
    type: "chaupayi",
    number: 3,
    titleDevanagari: "चौपाई ३",
    titleEnglish: "Chaupayi 3",
    verseNumberLabel: "३",
    linesDevanagari: [
      "महाबीर बिक्रम बजरंगी ।",
      "कुमति निवार सुमति के संगी ॥"
    ],
    transliteration: "Mahabira Bikrama Bajarangi ।\nKumati Niwara Sumati Ke Sangi ॥",
    hindiMeaning: "हे महाबली! आप अपार पराक्रमी हैं, आपका अंग वज्र के समान कठोर है (बजरंगबली)। आप कुबुद्धि (दुर्विचारों) का निवारण करते हैं और सुबुद्धि (सद्विचारों) के सच्चे साथी हैं।",
    englishMeaning: "O supreme hero of formidable valor, your limbs possess the resilience of a thunderbolt. You dispel wicked and negative intellect, and you are the eternal companion of noble and pure thoughts.",
    wordByWord: [
      { word: "महाबीर", meaning: "Great warrior / Supreme heroic soul" },
      { word: "बजरंगी", meaning: "One with diamond/thunderbolt-like strength (Vajra-anga)" },
      { word: "कुमति निवार", meaning: "Dispeller of negative thoughts and evil inclinations" },
      { word: "सुमति के संगी", meaning: "Companion of righteous intellect and pure discernment" }
    ],
    theme: "Courage & Mental Purity",
    storyRef: "courage",
    approxDuration: 6.5
  },
  {
    id: "verse-4",
    type: "chaupayi",
    number: 4,
    titleDevanagari: "चौपाई ४",
    titleEnglish: "Chaupayi 4",
    verseNumberLabel: "४",
    linesDevanagari: [
      "कंचन बरन बिराज सुबेसा ।",
      "कानन कुंडल कुंचित केसा ॥"
    ],
    transliteration: "Kanchana Barana Biraja Subesa ।\nKanana Kundala Kunchita Kesa ॥",
    hindiMeaning: "आपका शारीरिक वर्ण सुवर्ण (सोने) के समान कांतिमान है, आप सुंदर वेश से सुशोभित हैं। आपके कानों में दिव्य कुंडल शोभायमान हैं और आपके बाल सुंदर व घुंघराले हैं।",
    englishMeaning: "Your divine complexion radiates like molten gold, adorned in graceful attire. Splendid earrings embellish your ears, and your locks of hair are charmingly curled.",
    wordByWord: [
      { word: "कंचन बरन", meaning: "Golden radiant complexion" },
      { word: "बिराज सुबेसा", meaning: "Gracefully attired in sacred vestments" },
      { word: "कानन कुंडल", meaning: "Celestial earrings adorning the ears" },
      { word: "कुंचित केसा", meaning: "Naturally curly, beautiful hair" }
    ],
    theme: "Divine Form & Beauty",
    storyRef: "divine-form",
    approxDuration: 6.5
  },
  {
    id: "verse-5",
    type: "chaupayi",
    number: 5,
    titleDevanagari: "चौपाई ५",
    titleEnglish: "Chaupayi 5",
    verseNumberLabel: "५",
    linesDevanagari: [
      "हाथ बज्र औ ध्वजा बिराजै ।",
      "काँधे मूँज जनेऊ साजै ॥"
    ],
    transliteration: "Hatha Bajra Au Dhwaja Birajai ।\nKandhe Munja Janeu Sajai ॥",
    hindiMeaning: "आपके हाथों में वज्र (गदा) और धर्म-ध्वजा सुशोभित हैं। आपके कंधे पर पवित्र मूंज की जनेऊ (यज्ञोपवीत) अत्यंत शोभा पा रही है।",
    englishMeaning: "In your hands rest the mighty thunderbolt-mace and the victorious standard of righteousness. Upon your shoulder rests the sacred thread (Janeu) woven of sacred Munja grass.",
    wordByWord: [
      { word: "हाथ बज्र", meaning: "In hand, the celestial mace (Gada)" },
      { word: "ध्वजा बिराजै", meaning: "The flag of truth and victory shines" },
      { word: "काँधे", meaning: "Upon the sacred shoulder" },
      { word: "मूँज जनेऊ", meaning: "Sacred thread symbolizing vow and chastity" }
    ],
    theme: "Sacred Duty & Dharma",
    storyRef: "sacred-symbols",
    approxDuration: 6.5
  },
  {
    id: "verse-6",
    type: "chaupayi",
    number: 6,
    titleDevanagari: "चौपाई ६",
    titleEnglish: "Chaupayi 6",
    verseNumberLabel: "६",
    linesDevanagari: [
      "संकर सुवन केसरीनंदन ।",
      "तेज प्रताप महा जग बंदन ॥"
    ],
    transliteration: "Sankara Suwana Kesarina-nandana ।\nTeja Pratapa Maha Jaga Bandana ॥",
    hindiMeaning: "आप भगवान शिव के रुद्रावतार हैं और राजा केसरी के नंदन हैं। आपका अलौकिक तेज और प्रताप इतना महान है कि संपूर्ण जगत आपकी वंदना करता है।",
    englishMeaning: "You are the divine incarnation of Lord Shiva and the joy of King Kesari. Your radiant aura and majestic splendor are revered and saluted by the entire cosmos.",
    wordByWord: [
      { word: "संकर सुवन", meaning: "Incarnation of Lord Shiva (Rudra Avatara)" },
      { word: "केसरीनंदन", meaning: "Beloved son of Kesari" },
      { word: "तेज प्रताप", meaning: "Luminous energy and cosmic majesty" },
      { word: "महा जग बंदन", meaning: "Venerated across all the universes" }
    ],
    theme: "Cosmic Majesty",
    storyRef: "shiva-rudra",
    approxDuration: 6.5
  },
  {
    id: "verse-7",
    type: "chaupayi",
    number: 7,
    titleDevanagari: "चौपाई ७",
    titleEnglish: "Chaupayi 7",
    verseNumberLabel: "७",
    linesDevanagari: [
      "बिद्यावान गुनी अति चातुर ।",
      "राम काज करिबे को आतुर ॥"
    ],
    transliteration: "Bidyawana Guni Ati Chatura ।\nRama Kaja Karibe Ko Aatura ॥",
    hindiMeaning: "आप समस्त विद्याओं में पारंगत, अत्यंत गुणी और परम चतुर हैं। आप भगवान श्रीराम के किसी भी कार्य को संपन्न करने के लिए सदैव तत्पर और व्याकुल रहते हैं।",
    englishMeaning: "You are learned in all sacred wisdom, endowed with supreme virtues, and intensely discerning. You are ever eager and devoted to execute the noble work of Lord Rama.",
    wordByWord: [
      { word: "बिद्यावान", meaning: "Repository of all learning and arts" },
      { word: "गुनी अति चातुर", meaning: "Exemplary in virtue and sharpest in discernment" },
      { word: "राम काज", meaning: "The divine mission of Sri Rama" },
      { word: "करिबे को आतुर", meaning: "Ever enthusiastic and prompt to fulfill" }
    ],
    theme: "Readiness & Service",
    storyRef: "selfless-service",
    approxDuration: 6.5
  },
  {
    id: "verse-8",
    type: "chaupayi",
    number: 8,
    titleDevanagari: "चौपाई ८",
    titleEnglish: "Chaupayi 8",
    verseNumberLabel: "८",
    linesDevanagari: [
      "प्रभु चरित्र सुनिबे को रसिया ।",
      "राम लखन सीता मन बसिया ॥"
    ],
    transliteration: "Prabhu Charitra Sunibe Ko Rasiya ।\nRama Lakhana Sita Mana Basiya ॥",
    hindiMeaning: "आप प्रभु श्रीराम के चरित्र और कथाओं को सुनने में परम आनंद (रस) का अनुभव करते हैं। आपके हृदय मंदिर में श्रीराम, लक्ष्मण और माता सीता सदैव निवास करते हैं।",
    englishMeaning: "You relish with boundless devotion listening to the stories and virtues of the Lord. In the sanctuary of your heart dwell Sri Rama, Lakshmana, and Mother Sita eternally.",
    wordByWord: [
      { word: "प्रभु चरित्र", meaning: "Divine deeds and virtues of God" },
      { word: "सुनिबे को रसिया", meaning: "A true connoisseur eager to listen with love" },
      { word: "राम लखन सीता", meaning: "Sri Rama, Lakshmana, and Sita" },
      { word: "मन बसिया", meaning: "Enshrined in the heart" }
    ],
    theme: "Pure Devotion (Bhakti)",
    storyRef: "ram-charitra",
    approxDuration: 6.5
  },
  {
    id: "verse-9",
    type: "chaupayi",
    number: 9,
    titleDevanagari: "चौपाई ९",
    titleEnglish: "Chaupayi 9",
    verseNumberLabel: "९",
    linesDevanagari: [
      "सूक्ष्म रूप धरि सियहिं दिखावा ।",
      "बिकट रूप धरि लंक जरावा ॥"
    ],
    transliteration: "Sukshma Rupa Dhari Siyahin Dikhawa ।\nBikata Rupa Dhari Lanka Jarawa ॥",
    hindiMeaning: "आपने अशोक वाटिका में माता सीता के समक्ष अत्यंत सूक्ष्म (छोटा) रूप धारण करके दर्शन दिए, और बाद में विशाल व भयंकर रूप धारण करके दुष्टों की लंका नगरी को भस्म कर दिया।",
    englishMeaning: "Assuming an atom-sized subtle form, you presented yourself gently to Mother Sita; and manifesting a colossal, formidable form, you set ablaze the golden fortress of Lanka.",
    wordByWord: [
      { word: "सूक्ष्म रूप", meaning: "Minute, gentle form (demonstrating humility)" },
      { word: "सियहिं दिखावा", meaning: "Revealed to Mother Sita" },
      { word: "बिकट रूप", meaning: "Formidable, mighty cosmic form" },
      { word: "लंक जरावा", meaning: "Burned Lanka to awaken righteousness" }
    ],
    theme: "Adaptability & Discernment",
    storyRef: "lanka-dahan",
    approxDuration: 6.5
  },
  {
    id: "verse-10",
    type: "chaupayi",
    number: 10,
    titleDevanagari: "चौपाई १०",
    titleEnglish: "Chaupayi 10",
    verseNumberLabel: "१०",
    linesDevanagari: [
      "भीम रूप धरि असुर सँहारे ।",
      "रामचंद्र के काज संवारे ॥"
    ],
    transliteration: "Bhima Rupa Dhari Asura Sanhare ।\nRamachandra Ke Kaja Sanware ॥",
    hindiMeaning: "आपने विशाल भीमकाय रूप धारण करके अधर्मी असुरों का संहार किया और इस प्रकार मर्यादा पुरुषोत्तम श्रीराम के समस्त कार्यों को सफलतापूर्वक संवार दिया।",
    englishMeaning: "Assuming a gigantic, invincible stance, you vanquished the oppressive demons and brought all of Lord Ramachandra's monumental tasks to triumphant fruition.",
    wordByWord: [
      { word: "भीम रूप", meaning: "Form of titanic strength" },
      { word: "असुर सँहारे", meaning: "Destroyed demonic, unjust forces" },
      { word: "रामचंद्र के काज", meaning: "The divine missions of Lord Rama" },
      { word: "संवारे", meaning: "Accomplished with excellence" }
    ],
    theme: "Triumph of Righteousness",
    storyRef: "victory-of-dharma",
    approxDuration: 6.5
  },
  {
    id: "verse-11",
    type: "chaupayi",
    number: 11,
    titleDevanagari: "चौपाई ११",
    titleEnglish: "Chaupayi 11",
    verseNumberLabel: "११",
    linesDevanagari: [
      "लाय सजीवन लखन जियाये ।",
      "श्रीरघुबीर हरषि उर लाये ॥"
    ],
    transliteration: "Laya Sajivana Lakhana Jiyaye ।\nShriraghubira Harashi Ura Laye ॥",
    hindiMeaning: "आपने द्रोणागिरि पर्वत से संजीवनी बूटी लाकर मूर्छित लक्ष्मण जी के प्राणों की रक्षा की, जिससे अत्यंत हर्षित होकर श्रीरघुवीर ने आपको हृदय से लगा लिया।",
    englishMeaning: "Fetching the life-giving Sanjeevani herb from the northern mountains, you revived Lakshmana; filled with boundless joy, Sri Rama embraced you to His chest.",
    wordByWord: [
      { word: "लाय सजीवन", meaning: "Bringing the Sanjeevani life herb" },
      { word: "लखन जियाये", meaning: "Restored Lakshmana to conscious life" },
      { word: "श्रीरघुबीर हरषि", meaning: "Sri Rama overjoyed with gratitude" },
      { word: "उर लाये", meaning: "Held close in a loving divine embrace" }
    ],
    theme: "Life Giver & Unconditional Love",
    storyRef: "sanjeevani",
    approxDuration: 6.5
  },
  {
    id: "verse-12",
    type: "chaupayi",
    number: 12,
    titleDevanagari: "चौपाई १२",
    titleEnglish: "Chaupayi 12",
    verseNumberLabel: "१२",
    linesDevanagari: [
      "रघुपति कीन्ही बहुत बड़ाई ।",
      "तुम मम प्रिय भरतहि सम भाई ॥"
    ],
    transliteration: "Raghupati Kinhi Bahuta Badai ।\nTuma Mama Priya Bharatahi Sama Bhai ॥",
    hindiMeaning: "रघुकुल के स्वामी श्रीराम ने आपकी भूरि-भूरि प्रशंसा की और कहा—'हे हनुमान! तुम मुझे मेरे प्रिय भाई भरत के समान ही अत्यंत प्रिय हो।'",
    englishMeaning: "Lord Rama praised you wholeheartedly, proclaiming: 'You are as dear to Me as My beloved brother Bharata.'",
    wordByWord: [
      { word: "रघुपति कीन्ही", meaning: "The Lord of the Raghus offered" },
      { word: "बहुत बड़ाई", meaning: "Immense heartfelt praise" },
      { word: "तुम मम प्रिय", meaning: "You are as dear to me" },
      { word: "भरतहि सम भाई", meaning: "As my own brother Bharata" }
    ],
    theme: "Supreme Spiritual Brotherhood",
    storyRef: "bharat-sam-bhai",
    approxDuration: 6.5
  },
  {
    id: "verse-13",
    type: "chaupayi",
    number: 13,
    titleDevanagari: "चौपाई १३",
    titleEnglish: "Chaupayi 13",
    verseNumberLabel: "१३",
    linesDevanagari: [
      "सहस बदन तुम्हरो जस गावैं ।",
      "अस कहि श्रीपति कंठ लगावैं ॥"
    ],
    transliteration: "Sahasa Badana Tumharo Jasa Gawain ।\nAsa Kahi Shripati Kantha Lagawain ॥",
    hindiMeaning: "हजार मुखों वाले शेषनाग भी आपका यश गाते हैं—ऐसा कहकर लक्ष्मीपति भगवान श्रीराम ने आपको पुनः प्रेमपूर्वक अपने गले से लगा लिया।",
    englishMeaning: "'The thousand-mouthed Sheshanaga sings of your glory,' so saying, Lord Rama drew you again into His loving embrace.",
    wordByWord: [
      { word: "सहस बदन", meaning: "The thousand-hooded celestial serpent Shesha" },
      { word: "तुम्हरो जस गावैं", meaning: "Chants your boundless fame" },
      { word: "अस कहि", meaning: "Expressing thus" },
      { word: "कंठ लगावैं", meaning: "Embraced affectionately" }
    ],
    theme: "Eternal Renown",
    storyRef: "cosmic-praise",
    approxDuration: 6.5
  },
  {
    id: "verse-14",
    type: "chaupayi",
    number: 14,
    titleDevanagari: "चौपाई १४",
    titleEnglish: "Chaupayi 14",
    verseNumberLabel: "१४",
    linesDevanagari: [
      "सनकादिक ब्रह्मादि मुनीसा ।",
      "नारद सारद सहित अहीसा ॥"
    ],
    transliteration: "Sanakadika Brahmadika Munisa ।\nNarada Sarada Sahita Ahisa ॥",
    hindiMeaning: "सनक आदि महर्षि, ब्रह्मा जी आदि प्रमुख देवता और मुनि, देवर्षि नारद, माता सरस्वती और शेषनाग सभी आपकी महिमा का गुणगान करते हैं।",
    englishMeaning: "Sanaka and the great sages, Brahma and the foremost celestials, Narada, Goddess Saraswati, and the king of serpents all chant your sacred virtues.",
    wordByWord: [
      { word: "सनकादिक", meaning: "The primal enlightened sages (Sanaka, Sanatana, etc.)" },
      { word: "ब्रह्मादि मुनीसा", meaning: "Lord Brahma and exalted ascetics" },
      { word: "नारद सारद", meaning: "Sage Narada and Saraswati (wisdom)" },
      { word: "सहित अहीसा", meaning: "Along with Sheshanaga, cosmic serpent" }
    ],
    theme: "Universal Reverence",
    storyRef: "sages-praise",
    approxDuration: 6.5
  },
  {
    id: "verse-15",
    type: "chaupayi",
    number: 15,
    titleDevanagari: "चौपाई १५",
    titleEnglish: "Chaupayi 15",
    verseNumberLabel: "१५",
    linesDevanagari: [
      "जम कुबेर दिगपाल जहाँ ते ।",
      "कबि कोबिद कहि सके कहाँ ते ॥"
    ],
    transliteration: "Yama Kubera Digpala Jahan Te ।\nKabi Kobida Kahi Sake Kahan Te ॥",
    hindiMeaning: "यमराज, कुबेर और समस्त दिशाओं के रक्षक (दिग्पाल) जहाँ आपकी स्तुति करते हैं, वहाँ साधारण कवि और विद्वान भला आपके यश का पूर्ण वर्णन कैसे कर सकते हैं!",
    englishMeaning: "When Yama (god of death), Kubera (lord of wealth), and the guardians of all directions praise you, how could earthly poets and scholars ever fully describe your greatness?",
    wordByWord: [
      { word: "जम कुबेर", meaning: "Yama and Kubera" },
      { word: "दिगपाल जहाँ ते", meaning: "Guardians of all cardinal directions" },
      { word: "कबि कोबिद", meaning: "Poets and learned scholars" },
      { word: "कहि सके कहाँ ते", meaning: "How could human speech ever suffice?" }
    ],
    theme: "Ineffable Greatness",
    storyRef: "ineffable-glory",
    approxDuration: 6.5
  },
  {
    id: "verse-16",
    type: "chaupayi",
    number: 16,
    titleDevanagari: "चौपाई १६",
    titleEnglish: "Chaupayi 16",
    verseNumberLabel: "१६",
    linesDevanagari: [
      "तुम उपकार सुग्रीवहिं कीन्हा ।",
      "राम मिलाय राज पद दीन्हा ॥"
    ],
    transliteration: "Tuma Upakara Sugriwahin Kinha ।\nRama Milaya Raja Pada Dinha ॥",
    hindiMeaning: "आपने सुग्रीव पर अनुपम उपकार किया; उन्हें श्रीराम से मिलाया और उनकी मित्रता कराकर उन्हें किष्किंधा का राजपद पुनः दिलवाया।",
    englishMeaning: "You rendered an unforgettable benefactor's grace to Sugriva by uniting him in friendship with Lord Rama, restoring to him his rightful sovereign crown.",
    wordByWord: [
      { word: "उपकार सुग्रीवहिं", meaning: "Immense benevolent act for Sugriva" },
      { word: "राम मिलाय", meaning: "Introduced and united with Rama" },
      { word: "राज पद दीन्हा", meaning: "Conferred the royal throne of Kishkindha" }
    ],
    theme: "Noble Benevolence & Alliance",
    storyRef: "sugriva-alliance",
    approxDuration: 6.5
  },
  {
    id: "verse-17",
    type: "chaupayi",
    number: 17,
    titleDevanagari: "चौपाई १७",
    titleEnglish: "Chaupayi 17",
    verseNumberLabel: "१७",
    linesDevanagari: [
      "तुम्हरो मंत्र बिभीषन माना ।",
      "लंकेस्वर भए सब जग जाना ॥"
    ],
    transliteration: "Tumharo Mantra Bibhishana Mana ।\nLankeswara Bhae Saba Jaga Jana ॥",
    hindiMeaning: "विभीषण ने आपके हितकारी परामर्श (मंत्र) को स्वीकार किया, जिसके फलस्वरूप वे लंका के अधिपति बने—यह तथ्य संपूर्ण संसार भली-भांति जानता है।",
    englishMeaning: "Vibhishana heeded your righteous counsel, and in doing so became the revered King of Lanka, as is renowned throughout the world.",
    wordByWord: [
      { word: "तुम्हरो मंत्र", meaning: "Your wise and pious advice" },
      { word: "बिभीषन माना", meaning: "Vibhishana accepted and followed" },
      { word: "लंकेस्वर भए", meaning: "Became sovereign of Lanka" },
      { word: "सब जग जाना", meaning: "A celebrated truth known everywhere" }
    ],
    theme: "Wise Counsel & Guidance",
    storyRef: "vibhishana-counsel",
    approxDuration: 6.5
  },
  {
    id: "verse-18",
    type: "chaupayi",
    number: 18,
    titleDevanagari: "चौपाई १८",
    titleEnglish: "Chaupayi 18",
    verseNumberLabel: "१८",
    linesDevanagari: [
      "जुग सहस्र जोजन पर भानू ।",
      "लील्यो ताहि मधुर फल जानू ॥"
    ],
    transliteration: "Juga Sahasra Jojana Para Bhanu ।\nLilyo Tahi Madhura Phala Janu ॥",
    hindiMeaning: "हजारों योजन (करोड़ों मील) की दूरी पर स्थित सूर्य को आपने बाल्यावस्था में एक मीठा लाल फल समझकर सहज ही अपने मुख में रख लिया था।",
    englishMeaning: "The blazing Sun situated thousands of yojanas away—thinking it to be a sweet luscious fruit—you playfully swallowed in your innocent childhood.",
    wordByWord: [
      { word: "जुग सहस्र जोजन", meaning: "12,000 x 1,000 yojanas (exact cosmic astronomical distance)" },
      { word: "पर भानू", meaning: "The sun in distant orbit" },
      { word: "लील्यो ताहि", meaning: "Swallowed with effortless ease" },
      { word: "मधुर फल जानू", meaning: "Mistaking it for a ripe delicious fruit" }
    ],
    theme: "Fearless Wonder & Cosmic Reach",
    storyRef: "swallowing-the-sun",
    approxDuration: 6.5
  },
  {
    id: "verse-19",
    type: "chaupayi",
    number: 19,
    titleDevanagari: "चौपाई १९",
    titleEnglish: "Chaupayi 19",
    verseNumberLabel: "१९",
    linesDevanagari: [
      "प्रभु मुद्रिका मेलि मुख माहीं ।",
      "जलधि लाँघि गये अचरज नाहीं ॥"
    ],
    transliteration: "Prabhu Mudrika Meli Mukha Mahin ।\nJaladhi Langhi Gaye Acharaja Nahin ॥",
    hindiMeaning: "आपने भगवान श्रीराम की मुद्रिका (अंगूठी) को मुख में रखकर विशाल समुद्र को सहज ही लांघ लिया; आपके अतुलित सामर्थ्य के लिए यह कोई आश्चर्य की बात नहीं है।",
    englishMeaning: "Holding the sovereign signet ring of Lord Rama in your mouth, you leaped effortlessly across the vast ocean; in truth, for your boundless spirit, this is no marvel.",
    wordByWord: [
      { word: "प्रभु मुद्रिका", meaning: "Signet ring of Sri Rama" },
      { word: "मेलि मुख माहीं", meaning: "Kept reverently in the mouth" },
      { word: "जलधि लाँघि गये", meaning: "Leaped across the turbulent ocean" },
      { word: "अचरज नाहीं", meaning: "It is no surprise for one of your devotion" }
    ],
    theme: "Faith Overcoming Obstacles",
    storyRef: "crossing-the-ocean",
    approxDuration: 6.5
  },
  {
    id: "verse-20",
    type: "chaupayi",
    number: 20,
    titleDevanagari: "चौपाई २०",
    titleEnglish: "Chaupayi 20",
    verseNumberLabel: "२०",
    linesDevanagari: [
      "दुर्गम काज जगत के जेते ।",
      "सुगम अनुग्रह तुम्हरे तेते ॥"
    ],
    transliteration: "Durgama Kaja Jagata Ke Jete ।\nSugama Anugraha Tumhare Tete ॥",
    hindiMeaning: "संसार में जितने भी अत्यंत कठिन और असाध्य कार्य हैं, वे सब आपकी कृपा (अनुग्रह) से सहज और सरल हो जाते हैं।",
    englishMeaning: "All tasks in this world, however insurmountable or arduous they may seem, become effortlessly accomplished by the grace of your benevolent blessing.",
    wordByWord: [
      { word: "दुर्गम काज", meaning: "Formidable, near-impossible obstacles" },
      { word: "जगत के जेते", meaning: "As many as exist in the mortal world" },
      { word: "सुगम", meaning: "Become smooth, accessible, and simple" },
      { word: "अनुग्रह तुम्हरे तेते", meaning: "By the touch of your divine compassion" }
    ],
    theme: "Grace Over Obstacles",
    storyRef: "divine-grace",
    approxDuration: 6.5
  },
  {
    id: "verse-21",
    type: "chaupayi",
    number: 21,
    titleDevanagari: "चौपाई २१",
    titleEnglish: "Chaupayi 21",
    verseNumberLabel: "२१",
    linesDevanagari: [
      "राम दुआरे तुम रखवारे ।",
      "होत न आज्ञा बिनु पैसारे ॥"
    ],
    transliteration: "Rama Duare Tuma Rakhaware ।\nHota Na Aagya Binu Paisare ॥",
    hindiMeaning: "आप श्रीराम के पावन द्वार के रक्षक और द्वारपाल हैं; आपकी अनुमति और आज्ञा के बिना कोई भी उस दिव्य दरबार में प्रवेश नहीं कर सकता।",
    englishMeaning: "You stand as the vigilant guardian at the gateway to Sri Rama's sanctuary; none can gain entry into His divine presence without your blessing and consent.",
    wordByWord: [
      { word: "राम दुआरे", meaning: "At the divine portal of Sri Rama" },
      { word: "तुम रखवारे", meaning: "You are the sentinel and protector" },
      { word: "होत न आज्ञा बिनु", meaning: "Without your permission" },
      { word: "पैसारे", meaning: "None can gain admittance" }
    ],
    theme: "Gatekeeper of Grace",
    storyRef: "guardian-of-dharma",
    approxDuration: 6.5
  },
  {
    id: "verse-22",
    type: "chaupayi",
    number: 22,
    titleDevanagari: "चौपाई २२",
    titleEnglish: "Chaupayi 22",
    verseNumberLabel: "२२",
    linesDevanagari: [
      "सब सुख लहै तुम्हारी सरना ।",
      "तुम रच्छक काहू को डर ना ॥"
    ],
    transliteration: "Saba Sukha Lahai Tumhari Sarana ।\nTuma Racchaka Kahu Ko Dara Na ॥",
    hindiMeaning: "जो भी आपकी शरण में आता है, वह समस्त सुखों और आनंद को प्राप्त करता है। जब आप रक्षक हैं, तो फिर किसी भी भय या संकट का कोई स्थान नहीं रहता।",
    englishMeaning: "All joy, peace, and fulfillment reside in your shelter. When you are the guardian and protector, whom or what should one ever fear?",
    wordByWord: [
      { word: "सब सुख लहै", meaning: "All happiness and fulfillment is attained" },
      { word: "तुम्हारी सरना", meaning: "In taking refuge at your feet" },
      { word: "तुम रच्छक", meaning: "When you are the protector" },
      { word: "काहू को डर ना", meaning: "There remains no cause for fear" }
    ],
    theme: "Supreme Sanctuary (Abhaya)",
    storyRef: "fearlessness",
    approxDuration: 6.5
  },
  {
    id: "verse-23",
    type: "chaupayi",
    number: 23,
    titleDevanagari: "चौपाई २३",
    titleEnglish: "Chaupayi 23",
    verseNumberLabel: "२३",
    linesDevanagari: [
      "आपन तेज सम्हारो आपै ।",
      "तीनों लोक हाँक तें काँपै ॥"
    ],
    transliteration: "Aapana Teja Samharo Aapai ।\nTinon Loka Hanka Ten Kampai ॥",
    hindiMeaning: "आपके प्रचंड तेज और पराक्रम को केवल आप ही नियंत्रित कर सकते हैं। आपके एक गर्जन (हुंकार) मात्र से तीनों लोक थर-थर कांपने लगते हैं।",
    englishMeaning: "Only you yourself can bear and harness your monumental radiance; at your single heroic lion-roar, all the three worlds tremble in awe.",
    wordByWord: [
      { word: "आपन तेज", meaning: "Your boundless radiant power" },
      { word: "सम्हारो आपै", meaning: "Can be contained only by yourself" },
      { word: "तीनों लोक", meaning: "The three worlds" },
      { word: "हाँक तें काँपै", meaning: "Quake at your majestic roar" }
    ],
    theme: "Cosmic Potency & Mastery",
    storyRef: "cosmic-roar",
    approxDuration: 6.5
  },
  {
    id: "verse-24",
    type: "chaupayi",
    number: 24,
    titleDevanagari: "चौपाई २४",
    titleEnglish: "Chaupayi 24",
    verseNumberLabel: "२४",
    linesDevanagari: [
      "भूत पिसाच निकट नहिं आवै ।",
      "महाबीर जब नाम सुनावै ॥"
    ],
    transliteration: "Bhuta Pisacha Nikata Nahin Aawai ।\nMahabira Jaba Nama Sunawai ॥",
    hindiMeaning: "जहाँ भी 'महावीर' हनुमान का पावन नाम स्मरण किया जाता है, वहाँ भूत-पिशाच, नकारात्मक ऊर्जाएं और अनिष्टकारी शक्तियां कभी पास नहीं फटक सकतीं।",
    englishMeaning: "Ghosts, negative vibrations, and malevolent entities dare not approach the sanctuary where the sacred name of 'Mahavira' Hanuman is proclaimed.",
    wordByWord: [
      { word: "भूत पिसाच", meaning: "Negative spirits and harmful energies" },
      { word: "निकट नहिं आवै", meaning: "Cannot dare to draw near" },
      { word: "महाबीर", meaning: "The supreme brave protector" },
      { word: "जब नाम सुनावै", meaning: "Whenever His holy name is spoken" }
    ],
    theme: "Protection From Negativity",
    storyRef: "dispelling-darkness",
    approxDuration: 6.5
  },
  {
    id: "verse-25",
    type: "chaupayi",
    number: 25,
    titleDevanagari: "चौपाई २५",
    titleEnglish: "Chaupayi 25",
    verseNumberLabel: "२५",
    linesDevanagari: [
      "नासै रोग हरै सब पीरा ।",
      "जपत निरंतर हनुमत बीरा ॥"
    ],
    transliteration: "Nasai Roga Harai Saba Pira ।\nJapata Nirantara Hanumata Bira ॥",
    hindiMeaning: "वीर हनुमान जी के नाम का निरंतर जप करने से समस्त रोग नष्ट हो जाते हैं और जीवन की सारी शारीरिक व मानसिक पीड़ाएं दूर हो जाती हैं।",
    englishMeaning: "All illnesses dissolve and all pains are extinguished for the devotee who constantly and devotedly chants the name of the valiant Hanuman.",
    wordByWord: [
      { word: "नासै रोग", meaning: "Diseases and afflictions are destroyed" },
      { word: "हरै सब पीरा", meaning: "All agony and anguish is relieved" },
      { word: "जपत निरंतर", meaning: "Chanting consistently with mindfulness" },
      { word: "हनुमत बीरा", meaning: "The brave and compassionate Hanuman" }
    ],
    theme: "Healing & Wholeness",
    storyRef: "healing-power",
    approxDuration: 6.5
  },
  {
    id: "verse-26",
    type: "chaupayi",
    number: 26,
    titleDevanagari: "चौपाई २६",
    titleEnglish: "Chaupayi 26",
    verseNumberLabel: "२६",
    linesDevanagari: [
      "संकट तें हनुमान छुड़ावै ।",
      "मन क्रम बचन ध्यान जो लावै ॥"
    ],
    transliteration: "Sankata Ten Hanumana Chhudawai ।\nMana Krama Bachana Dhyana Jo Lawai ॥",
    hindiMeaning: "जो भी व्यक्ति मन (विचार), कर्म (आचरण) और वचन (वाणी) से एकाग्र होकर श्री हनुमान जी का ध्यान करता है, हनुमान जी उसे समस्त संकटों से मुक्त कर देते हैं।",
    englishMeaning: "Lord Hanuman liberates from all trials and crises whoever fixes their meditation upon Him through thoughts, deeds, and words in harmonious sincerity.",
    wordByWord: [
      { word: "संकट तें", meaning: "From all predicaments and calamities" },
      { word: "हनुमान छुड़ावै", meaning: "Hanuman grants freedom and safety" },
      { word: "मन क्रम बचन", meaning: "Mind, actions, and speech (holistic integrity)" },
      { word: "ध्यान जो लावै", meaning: "Whoever centers their conscious focus" }
    ],
    theme: "Deliverance Through Integrity",
    storyRef: "crisis-liberation",
    approxDuration: 6.5
  },
  {
    id: "verse-27",
    type: "chaupayi",
    number: 27,
    titleDevanagari: "चौपाई २७",
    titleEnglish: "Chaupayi 27",
    verseNumberLabel: "२७",
    linesDevanagari: [
      "सब पर राम तपस्वी राजा ।",
      "तिन के काज सकल तुम साजा ॥"
    ],
    transliteration: "Saba Para Rama Tapaswi Raja ।\nTina Ke Kaja Sakala Tuma Saja ॥",
    hindiMeaning: "तपस्वी राजा श्रीराम सर्वोपरि हैं; और आप वही महान भक्त हैं जिन्होंने उन प्रभु श्रीराम के भी सभी कार्यों को संपूर्ण और सिद्ध कर दिखाया।",
    englishMeaning: "Sri Rama, the supreme ascetic sovereign, reigns exalted over all creation; and it was you who accomplished all of His sacred deeds with unwavering perfection.",
    wordByWord: [
      { word: "सब पर राम", meaning: "Above all stands Sri Rama" },
      { word: "तपस्वी राजा", meaning: "The sublime ascetic king" },
      { word: "तिन के काज", meaning: "All His profound tasks" },
      { word: "सकल तुम साजा", meaning: "You arranged and brought to glory" }
    ],
    theme: "Master of Divine Execution",
    storyRef: "rama-karya",
    approxDuration: 6.5
  },
  {
    id: "verse-28",
    type: "chaupayi",
    number: 28,
    titleDevanagari: "चौपाई २८",
    titleEnglish: "Chaupayi 28",
    verseNumberLabel: "२८",
    linesDevanagari: [
      "और मनोरथ जो कोई लावै ।",
      "सोइ अमित जीवन फल पावै ॥"
    ],
    transliteration: "Aura Manoratha Jo Koi Lawai ।\nSoi Amita Jiwana Phala Pawai ॥",
    hindiMeaning: "जो भी भक्त आपके पास कोई भी शुद्ध अभिलाषा (मनोरथ) लेकर आता है, वह अपने जीवन में असीम और स्थायी आध्यात्मिक व सांसारिक फल प्राप्त करता है।",
    englishMeaning: "Whatever noble aspiration or heartfelt prayer any devotee brings before you, they receive the boundless and imperishable fruit of life.",
    wordByWord: [
      { word: "और मनोरथ", meaning: "Any sincere wish or righteous desire" },
      { word: "जो कोई लावै", meaning: "Whosoever approaches in devotion" },
      { word: "सोइ अमित", meaning: "Attains that limitless, immortal" },
      { word: "जीवन फल पावै", meaning: "Fruitful blessing of life" }
    ],
    theme: "Fulfillment of Pure Prayers",
    storyRef: "divine-fulfillment",
    approxDuration: 6.5
  },
  {
    id: "verse-29",
    type: "chaupayi",
    number: 29,
    titleDevanagari: "चौपाई २९",
    titleEnglish: "Chaupayi 29",
    verseNumberLabel: "२९",
    linesDevanagari: [
      "चारों जुग परताप तुम्हारा ।",
      "है परसिद्ध जगत उजियारा ॥"
    ],
    transliteration: "Charon Juga Paratapa Tumhara ।\nHai Parasiddha Jagata Ujiyara ॥",
    hindiMeaning: "सत्ययुग, त्रेतायुग, द्वापरयुग और कलियुग—चारों युगों में आपका पावन तेज और प्रभाव विद्यमान है; आपका यश समस्त संसार को आलोकित करने वाला है।",
    englishMeaning: "Across all four great cosmic epochs (Satya, Treta, Dvapara, and Kali Yuga), your divine glory reigns eternal; your splendor luminously illumines the entire universe.",
    wordByWord: [
      { word: "चारों जुग", meaning: "Throughout the four cosmic ages" },
      { word: "परताप तुम्हारा", meaning: "Your radiant spiritual prowess" },
      { word: "है परसिद्ध", meaning: "Universally celebrated and acknowledged" },
      { word: "जगत उजियारा", meaning: "Illuminating light of the universe" }
    ],
    theme: "Timeless Presence (Chiranjivi)",
    storyRef: "chiranjivi-hanuman",
    approxDuration: 6.5
  },
  {
    id: "verse-30",
    type: "chaupayi",
    number: 30,
    titleDevanagari: "चौपाई ३०",
    titleEnglish: "Chaupayi 30",
    verseNumberLabel: "३०",
    linesDevanagari: [
      "साधु संत के तुम रखवारे ।",
      "असुर निकंदन राम दुलारे ॥"
    ],
    transliteration: "Sadhu Santa Ke Tuma Rakhaware ।\nAsura Nikandana Rama Dulare ॥",
    hindiMeaning: "आप साधु-संतों और सज्जनों के रक्षक हैं, अधर्मी दुष्टों (असुरों) का विनाश करने वाले हैं और भगवान श्रीराम के अत्यंत प्रिय व दुलारे हैं।",
    englishMeaning: "You are the protective guardian of saints and pious seekers, the destroyer of wicked oppressors, and the dearly beloved child of Lord Rama.",
    wordByWord: [
      { word: "साधु संत के", meaning: "Of the holy sages and righteous seekers" },
      { word: "तुम रखवारे", meaning: "You are the steadfast guardian" },
      { word: "असुर निकंदन", meaning: "Annihilator of deceitful and cruel forces" },
      { word: "राम दुलारे", meaning: "Cherished beloved of Sri Rama" }
    ],
    theme: "Protector of the Good",
    storyRef: "protection-of-saints",
    approxDuration: 6.5
  },
  {
    id: "verse-31",
    type: "chaupayi",
    number: 31,
    titleDevanagari: "चौपाई ३१",
    titleEnglish: "Chaupayi 31",
    verseNumberLabel: "३१",
    linesDevanagari: [
      "अष्ट सिद्धि नौ निधि के दाता ।",
      "अस बर दीन जानकी माता ॥"
    ],
    transliteration: "Ashta Siddhi Nau Nidhi Ke Data ।\nAsa Bara Dina Janaki Mata ॥",
    hindiMeaning: "आप आठों सिद्धियों (अणिमा, महिमा, आदि) और नौ निधियों (पद्म, महापद्म, आदि) को प्रदान करने वाले हैं; ऐसा वरदान आपको पूज्य माता जानकी (सीता जी) ने दिया है।",
    englishMeaning: "You are the gracious bestower of the Eight Yogic Siddhis and the Nine Divine Treasures; such a supreme boon was conferred upon you by Mother Janaki herself.",
    wordByWord: [
      { word: "अष्ट सिद्धि", meaning: "The 8 yogic perfections (Anima, Mahima, Garima, Laghima, Prapti, Prakamya, Ishitva, Vashitva)" },
      { word: "नौ निधि", meaning: "The 9 divine treasures of cosmic abundance" },
      { word: "के दाता", meaning: "Bestower upon worthy seekers" },
      { word: "अस बर दीन", meaning: "This boon was blessed" },
      { word: "जानकी माता", meaning: "By revered Mother Sita" }
    ],
    theme: "Mastery of Siddhis & Treasures",
    storyRef: "ashta-siddhi",
    approxDuration: 6.5
  },
  {
    id: "verse-32",
    type: "chaupayi",
    number: 32,
    titleDevanagari: "चौपाई ३२",
    titleEnglish: "Chaupayi 32",
    verseNumberLabel: "३२",
    linesDevanagari: [
      "राम रसायन तुम्हरे पासा ।",
      "सदा रहो रघुपति के दासा ॥"
    ],
    transliteration: "Rama Rasayana Tumhare Pasa ।\nSada Raho Raghupati Ke Dasa ॥",
    hindiMeaning: "आपके पास श्रीराम के नाम और भक्ति रूपी दिव्य रसायन (अमृत) है। आप सदैव रघुकुल शिरोमणि श्रीराम के अनन्य और समर्पित सेवक बने रहते हैं।",
    englishMeaning: "You possess the supreme elixir (Rasayana) of Rama's divine name and devotion. You remain forever the humble, dedicated servant of Lord Raghupati.",
    wordByWord: [
      { word: "राम रसायन", meaning: "The divine alchemy/elixir of Rama Bhakti" },
      { word: "तुम्हरे पासा", meaning: "Held abundantly within your being" },
      { word: "सदा रहो", meaning: "Ever remaining in steadfast loyalty" },
      { word: "रघुपति के दासा", meaning: "The selfless devotee of Lord Rama" }
    ],
    theme: "The Elixir of Divine Name",
    storyRef: "ram-rasayan",
    approxDuration: 6.5
  },
  {
    id: "verse-33",
    type: "chaupayi",
    number: 33,
    titleDevanagari: "चौपाई ३३",
    titleEnglish: "Chaupayi 33",
    verseNumberLabel: "३३",
    linesDevanagari: [
      "तुम्हरे भजन राम को पावै ।",
      "जनम जनम के दुख बिसरावै ॥"
    ],
    transliteration: "Tumhare Bhajana Rama Ko Pawai ।\nJanama Janama Ke Dukha Bisrawai ॥",
    hindiMeaning: "आपका भजन और गुणगान करने से भक्त को प्रभु श्रीराम की प्राप्ति होती है, और उसके जन्म-जन्मांतरों के समस्त संचित दुःख और कष्ट मिट जाते हैं।",
    englishMeaning: "Through devotional remembrance of you, one attains Sri Rama, and the accumulated afflictions of countless lifetimes are dissolved into peace.",
    wordByWord: [
      { word: "तुम्हरे भजन", meaning: "Singing your praise with devotion" },
      { word: "राम को पावै", meaning: "Attains the grace of Sri Rama" },
      { word: "जनम जनम के दुख", meaning: "Sufferings accumulated across lifetimes" },
      { word: "बिसरावै", meaning: "Are forgotten and dissolved" }
    ],
    theme: "Pathway to the Supreme",
    storyRef: "bhajan-mahima",
    approxDuration: 6.5
  },
  {
    id: "verse-34",
    type: "chaupayi",
    number: 34,
    titleDevanagari: "चौपाई ३४",
    titleEnglish: "Chaupayi 34",
    verseNumberLabel: "३४",
    linesDevanagari: [
      "अंत काल रघुबर पुर जाई ।",
      "जहाँ जन्म हरि-भक्त कहाई ॥"
    ],
    transliteration: "Anta Kala Raghubara Pura Jai ।\nJahan Janma Hari-Bhakta Kahai ॥",
    hindiMeaning: "जीवन के अंतिम समय में ऐसा साधक श्रीरघुवीर के परम पावन धाम (साकेत लोक) को जाता है; और यदि उसका पुनः जन्म भी हो, तो वह ईश्वर का सच्चा भक्त ही कहलाता है।",
    englishMeaning: "At the end of mortal life, such a soul ascends to the sacred realm of Lord Rama; and wherever they may take birth, they are honored as a true devotee of God.",
    wordByWord: [
      { word: "अंत काल", meaning: "At the moment of transition" },
      { word: "रघुबर पुर जाई", meaning: "Enters the celestial abode of Rama" },
      { word: "जहाँ जन्म", meaning: "And in any rebirth" },
      { word: "हरि-भक्त कहाई", meaning: "Is renowned as a devoted servant of the Divine" }
    ],
    theme: "Liberation & Divine Destiny",
    storyRef: "spiritual-liberation",
    approxDuration: 6.5
  },
  {
    id: "verse-35",
    type: "chaupayi",
    number: 35,
    titleDevanagari: "चौपाई ३५",
    titleEnglish: "Chaupayi 35",
    verseNumberLabel: "३५",
    linesDevanagari: [
      "और देवता चित्त न धरई ।",
      "हनुमत सेइ सर्ब सुख करई ॥"
    ],
    transliteration: "Aura Devata Chitta Na Dharai ।\nHanumata Sei Sarba Sukha Karai ॥",
    hindiMeaning: "किसी अन्य देवता का चित्त में चिंतन किए बिना भी, केवल श्री हनुमान जी की सेवा और स्मरण करने से साधक को समस्त सुख और आनंद सहज ही प्राप्त हो जाते हैं।",
    englishMeaning: "Without needing to focus one's mind upon any other deity, simply by serving and meditating upon Hanuman, one attains every joy and spiritual fulfillment.",
    wordByWord: [
      { word: "और देवता", meaning: "Other deities or celestial beings" },
      { word: "चित्त न धरई", meaning: "Even if not held in active meditation" },
      { word: "हनुमत सेइ", meaning: "By serving Hanuman wholeheartedly" },
      { word: "सर्ब सुख करई", meaning: "All happiness and contentment is bestowed" }
    ],
    theme: "Single-Minded Devotion",
    storyRef: "ekagrata",
    approxDuration: 6.5
  },
  {
    id: "verse-36",
    type: "chaupayi",
    number: 36,
    titleDevanagari: "चौपाई ३६",
    titleEnglish: "Chaupayi 36",
    verseNumberLabel: "३६",
    linesDevanagari: [
      "संकट कटै मिटै सब पीरा ।",
      "जो सुमिरै हनुमत बलबीरा ॥"
    ],
    transliteration: "Sankata Katai Mitai Saba Pira ।\nJo Sumirai Hanumata Balabira ॥",
    hindiMeaning: "जो भी व्यक्ति परम बलशाली और वीर हनुमान जी का स्मरण करता है, उसके सारे संकट कट जाते हैं और समस्त शारीरिक व मानसिक क्लेश मिट जाते हैं।",
    englishMeaning: "All crises are severed and all suffering is wiped away for the soul who lovingly remembers the mighty and heroic Hanuman.",
    wordByWord: [
      { word: "संकट कटै", meaning: "Adversities are severed away" },
      { word: "मिटै सब पीरा", meaning: "All sorrow is effaced" },
      { word: "जो सुमिरै", meaning: "Whoever faithfully remembers" },
      { word: "हनुमत बलबीरा", meaning: "Hanuman, the heroic storehouse of strength" }
    ],
    theme: "Total Dispeller of Distress",
    storyRef: "sankat-mochan",
    approxDuration: 6.5
  },
  {
    id: "verse-37",
    type: "chaupayi",
    number: 37,
    titleDevanagari: "चौपाई ३७",
    titleEnglish: "Chaupayi 37",
    verseNumberLabel: "३७",
    linesDevanagari: [
      "जै जै जै हनुमान गोसाईं ।",
      "कृपा करहु गुरुदेव की नाईं ॥"
    ],
    transliteration: "Jai Jai Jai Hanumana Gosain ।\nKripa Karahu Gurudewa Ki Nain ॥",
    hindiMeaning: "हे सर्वसमर्थ स्वामी श्री हनुमान! आपकी सदा जय हो, जय हो, जय हो! आप मुझ पर एक कृपालु गुरुदेव की तरह अपनी पावन कृपा दृष्टि बनाए रखिए।",
    englishMeaning: "Victory, victory, ever victory to you, O Lord and master Hanuman! Bestow your gentle grace upon me, even as a loving and compassionate spiritual teacher (Guru).",
    wordByWord: [
      { word: "जै जै जै", meaning: "Victory, glory, celebration threefold" },
      { word: "हनुमान गोसाईं", meaning: "O master and protector Hanuman" },
      { word: "कृपा करहु", meaning: "Pour out your compassion and grace" },
      { word: "गुरुदेव की नाईं", meaning: "Just like a benevolent spiritual master" }
    ],
    theme: "The Master as Guru",
    storyRef: "hanuman-as-guru",
    approxDuration: 6.5
  },
  {
    id: "verse-38",
    type: "chaupayi",
    number: 38,
    titleDevanagari: "चौपाई ३८",
    titleEnglish: "Chaupayi 38",
    verseNumberLabel: "३८",
    linesDevanagari: [
      "जो सत बार पाठ कर कोई ।",
      "छूटहि बंदि महा सुख होई ॥"
    ],
    transliteration: "Jo Sata Bara Patha Kara Koi ।\nChhutahi Bandi Maha Sukha Hoi ॥",
    hindiMeaning: "जो भी साधक इस पावन चालीसा का सौ (१०८) बार निष्ठापूर्वक पाठ करता है, वह संसार के सभी बंधनों और कष्टों से मुक्त हो जाता है तथा परम सुख को प्राप्त करता है।",
    englishMeaning: "Whoever recites this sacred hymn a hundred times with pure devotion is freed from all worldly bondages and attains exalted spiritual bliss.",
    wordByWord: [
      { word: "जो सत बार", meaning: "Whoever recites a hundred times (traditional Sankalp count)" },
      { word: "पाठ कर कोई", meaning: "Undertakes this sacred reading" },
      { word: "छूटहि बंदि", meaning: "Is released from all captivity, fear, and bondage" },
      { word: "महा सुख होई", meaning: "And experiences supreme, serene happiness" }
    ],
    theme: "Deliverance from Bondage",
    storyRef: "sankalp-glory",
    approxDuration: 6.5
  },
  {
    id: "verse-39",
    type: "chaupayi",
    number: 39,
    titleDevanagari: "चौपाई ३९",
    titleEnglish: "Chaupayi 39",
    verseNumberLabel: "३९",
    linesDevanagari: [
      "जो यह पढ़ै हनुमान चलीसा ।",
      "होय सिद्धि साखी गौरीसा ॥"
    ],
    transliteration: "Jo Yaha Padhai Hanumana Chalisa ।\nHoya Siddhi Sakhi Gaurisa ॥",
    hindiMeaning: "जो भी व्यक्ति इस 'हनुमान चालीसा' का श्रद्धा से पाठ करता है, वह अवश्य ही सिद्धि और सफलता प्राप्त करता है; इसके साक्षी स्वयं भगवान शिव (गौरीश) हैं।",
    englishMeaning: "Whoever reads this Hanuman Chalisa attains spiritual perfection and accomplishment; to this truth, Lord Shiva (consort of Gauri) Himself stands as the eternal witness.",
    wordByWord: [
      { word: "जो यह पढ़ै", meaning: "Whoever recites this sacred prayer" },
      { word: "हनुमान चलीसा", meaning: "The forty verses of Hanuman" },
      { word: "होय सिद्धि", meaning: "Attains spiritual fruit and realization" },
      { word: "साखी गौरीसा", meaning: "Lord Shiva is the eternal witness to this pledge" }
    ],
    theme: "The Divine Witness",
    storyRef: "shiva-witness",
    approxDuration: 6.5
  },
  {
    id: "verse-40",
    type: "chaupayi",
    number: 40,
    titleDevanagari: "चौपाई ४०",
    titleEnglish: "Chaupayi 40",
    verseNumberLabel: "४०",
    linesDevanagari: [
      "तुलसीदास सदा हरि चेरा ।",
      "कीजै नाथ हृदय मँह डेरा ॥"
    ],
    transliteration: "Tulasidasa Sada Hari Chera ।\nKijai Natha Hridaya Manha Dera ॥",
    hindiMeaning: "गोस्वामी तुलसीदास जी कहते हैं—'मैं सदा के लिए श्रीहरि का सेवक हूँ। हे मेरे नाथ हनुमान जी! आप कृपा करके मेरे हृदय के मंदिर में सदा के लिए अपना डेरा (निवास) बना लीजिए।'",
    englishMeaning: "Tulsidas declares: 'I am eternally the humble servant of Sri Hari. O my Lord and protector, make Your everlasting home within the sanctuary of my heart.'",
    wordByWord: [
      { word: "तुलसीदास", meaning: "The humble poet-saint Tulsidas" },
      { word: "सदा हरि चेरा", meaning: "Forever the servant of Lord Vishnu/Rama" },
      { word: "कीजै नाथ", meaning: "O my beloved Lord" },
      { word: "हृदय मँह डेरा", meaning: "Abide forever within the temple of my heart" }
    ],
    theme: "Enshrinement in the Heart",
    storyRef: "tulsidas-surrender",
    approxDuration: 6.5
  },
  {
    id: "doha-3",
    type: "doha-closing",
    number: null,
    titleDevanagari: "समापन दोहा",
    titleEnglish: "Closing Doha",
    verseNumberLabel: "समापन दोहा",
    linesDevanagari: [
      "पवनतनय संकट हरन मंगल मूरति रूप ।",
      "राम लखन सीता सहित हृदय बसहु सुर भूप ॥"
    ],
    transliteration: "Pawanatanaya Sankata Harana, Mangala Murati Rupa ।\nRama Lakhana Sita Sahita, Hridaya Basahu Sura Bhupa ॥",
    hindiMeaning: "हे पवनपुत्र! आप संकटों का हरण करने वाले और साक्षात् कल्याणकारी मंगल की मूर्ति हैं। हे देवों के अधिपति हनुमान जी! आप भगवान श्रीराम, लक्ष्मण जी और माता सीता सहित मेरे हृदय में सदा-सदा के लिए निवास कीजिए।",
    englishMeaning: "O Son of the Wind, dispeller of all tribulations, embodiment of all auspiciousness! O sovereign of the gods, dwell eternally within my heart alongside Sri Rama, Lakshmana, and Mother Sita.",
    wordByWord: [
      { word: "पवनतनय", meaning: "O Son of the Wind God" },
      { word: "संकट हरन", meaning: "Dispeller and redeemer of every crisis" },
      { word: "मंगल मूरति रूप", meaning: "Embodiment of supreme auspiciousness and grace" },
      { word: "राम लखन सीता सहित", meaning: "Together with Sri Rama, Lakshmana, and Sita" },
      { word: "हृदय बसहु", meaning: "Enshrine Yourself eternally within my heart" },
      { word: "सुर भूप", meaning: "Exalted sovereign among celestial beings" }
    ],
    theme: "Eternal Auspicious Enshrinement",
    storyRef: "mangala-murti",
    approxDuration: 8.5
  }
];

export const TOTAL_VERSES = CHALISA_DATA.length; // 43 verses in total
