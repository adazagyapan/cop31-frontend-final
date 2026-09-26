const STORE = {
  places:  "cop31_places",
  notes:   "cop31_notes",
  session: "cop31_session"
};

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error("Could not read storage:", err);
    return fallback;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Could not write storage:", err);
  }
}

function makeId(prefix) {
  return prefix + "_" + Math.random().toString(36).slice(2, 8);
}

const USERS = [
  { email: "admin@cop31.org", password: "admin123", name: "Moderator",   role: "admin" },
  { email: "user@cop31.org",  password: "user123",  name: "Delegate",    role: "user"  },
  { email: "press@cop31.org", password: "press123", name: "Press Badge", role: "user"  }
];

const SEED_PLACES = [
  { id: "p_expo", name: "Antalya Expo Center", layer: "cop31", eco: true,
    lat: 36.94764, lng: 30.88366,
    type: { en: "COP31 venue", tr: "COP31 alanı" },
    info: { en: "Main venue. Plenary sessions and daily briefings.",
            tr: "Ana alan. Genel kurul oturumları ve günlük brifingler." } },

  { id: "p_hallb", name: "Side Event Kinda Venue", layer: "cop31", eco: true,
    lat: 36.9490, lng: 30.8810,
    type: { en: "COP31 venue", tr: "COP31 alanı" },
    info: { en: "Side events and NGO events.",
            tr: "Yan etkinlikler ve STK etkinlikleri." } },

  { id: "p_press", name: "Another Kinda Venue IDK", layer: "cop31", eco: false,
    lat: 36.94492, lng: 30.89090,
    type: { en: "COP31 venue", tr: "COP31 alanı" },
    info: { en: "Accreditation desk and briefing room.",
            tr: "Akreditasyon masası ve brifing odası." } },

  { id: "p_cafe", name: "Cart Curt Café", layer: "tourism", eco: true,
    lat: 36.9365, lng: 30.8210,
    type: { en: "Vegan restaurant", tr: "Vegan restoran" },
    info: { en: "Plant-based menu, ten minutes from the venue.",
            tr: "Bitki bazlı menü, alana on dakika mesafede." } },

  { id: "p_hotel", name: "Zart Zurt Stay", layer: "tourism", eco: true,
    lat: 36.9440, lng: 30.8100,
    type: { en: "Eco-hotel", tr: "Eko-otel" },
    info: { en: "Low-energy certified hotel with transit access.",
            tr: "Toplu taşıma erişimli, düşük enerji sertifikalı otel." } },

  { id: "p_museum", name: "Bişey Museum", layer: "tourism", eco: false,
    lat: 36.9330, lng: 30.8180,
    type: { en: "Museum", tr: "Müze" },
    info: { en: "Regional history and culture exhibits.",
            tr: "Bölgesel tarih ve kültür sergileri." } },

  { id: "p_market", name: "Market", layer: "tourism", eco: true,
    lat: 36.9375, lng: 30.8125,
    type: { en: "Local business", tr: "Yerel işletme" },
    info: { en: "Local produce, mornings only.",
            tr: "Yerel üretim, yalnızca sabahları." } }
];

function placeText(place, field) {
  const value = place[field];
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  return value[getLang()] || value.en || value.tr || "";
}

const SEED_VERSION = 2;
const SEED_VERSION_KEY = "cop31_seed_version";

function migrateSeedPositions(saved) {
  if (readStore(SEED_VERSION_KEY, 1) >= SEED_VERSION) return saved;

  SEED_PLACES.forEach(function (seed) {
    const mine = saved.find(function (p) { return p.id === seed.id; });
    if (mine) { mine.lat = seed.lat; mine.lng = seed.lng; }
  });

  writeStore(STORE.places, saved);
  writeStore(SEED_VERSION_KEY, SEED_VERSION);
  return saved;
}

function getPlaces() {
  let saved = readStore(STORE.places, null);
  if (saved) saved = migrateSeedPositions(saved);

  return saved || JSON.parse(JSON.stringify(SEED_PLACES));
}

function savePlaces(places) {
  writeStore(STORE.places, places);
}

function getPlace(id) {
  return getPlaces().find(function (p) { return p.id === id; }) || null;
}

function addPlace(place) {
  const places = getPlaces();
  place.id = makeId("p");
  places.push(place);
  savePlaces(places);
  return place;
}

function deletePlace(id) {
  savePlaces(getPlaces().filter(function (p) { return p.id !== id; }));
}

function getNotes() {
  return readStore(STORE.notes, []);
}

function saveNotes(notes) {
  writeStore(STORE.notes, notes);
}

function getApprovedNotes(placeId) {
  return getNotes().filter(function (n) {
    return n.placeId === placeId && n.status === "approved";
  });
}

function getPendingNotes() {
  return getNotes().filter(function (n) { return n.status === "pending"; });
}

function setNoteTranslation(noteId, lang, text, meta) {
  const notes = getNotes();
  const note = notes.find(function (n) { return n.id === noteId; });
  if (!note) return;
  if (!note.translations) note.translations = {};
  note.translations[lang] = text;

  if (!note.translationMeta) note.translationMeta = {};
  note.translationMeta[lang] = {
    engine: (meta && meta.engine) || "",
    from:   (meta && meta.from) || ""
  };

  if (meta && meta.engine === "google" && meta.from) {
    note.lang = meta.from;
  }

  saveNotes(notes);
}

function getNoteTranslationMeta(noteId, lang) {
  const note = getNotes().find(function (n) { return n.id === noteId; });
  return note && note.translationMeta ? (note.translationMeta[lang] || null) : null;
}

function getNoteTranslation(noteId, lang) {
  const note = getNotes().find(function (n) { return n.id === noteId; });
  return note && note.translations ? (note.translations[lang] || null) : null;
}

function setNoteStatus(noteId, status, reason) {
  const notes = getNotes();
  const note = notes.find(function (n) { return n.id === noteId; });
  if (!note) return;
  note.status = status;
  note.decisionReason = reason || "";
  saveNotes(notes);
}

const BLOCK_WORDS = ["idiot", "hate", "kill", "aptal", "salak"];
const FLAG_WORDS  = ["scam", "fake", "stupid", "dolandırıcı"];

function detectLanguage(text) {
  if (/[çğıöşüÇĞİÖŞÜ]/.test(text)) return "tr";

  const englishHints = /\b(the|and|is|was|were|this|that|it|to|of|for|with|very|good|great|nice|here|there|not|but|have|had)\b/i;
  if (englishHints.test(text)) return "en";

  return "und";
}

function screenNote(text) {
  const lower = text.toLowerCase();

  if (/\b[\w.+-]+@[\w-]+\.[\w.]+\b/.test(text) || /\+?\d[\d\s-]{8,}/.test(text)) {
    return { action: "block", reasonKey: "screen_contact" };
  }

  for (let i = 0; i < BLOCK_WORDS.length; i++) {
    if (lower.includes(BLOCK_WORDS[i])) {
      return { action: "block", reasonKey: "screen_language" };
    }
  }

  for (let i = 0; i < FLAG_WORDS.length; i++) {
    if (lower.includes(FLAG_WORDS[i])) {
      return { action: "flag", reasonKey: "screen_wording" };
    }
  }

  if (/(.)\1{6,}/.test(text) || (text.length > 20 && text === text.toUpperCase())) {
    return { action: "flag", reasonKey: "screen_spam" };
  }

  return { action: "pass", reasonKey: "" };
}

function createNote(placeId, text, rating, visibility, authorName) {
  const screen = screenNote(text);

  if (screen.action === "block") {
    return { ok: false, reasonKey: screen.reasonKey };
  }

  const note = {
    id:         makeId("note"),
    placeId:    placeId,
    text:       text,
    rating:     rating,
    visibility: visibility,
    status:     "pending",
    flagKey:    screen.action === "flag" ? screen.reasonKey : "",
    author:     authorName,
    lang:       detectLanguage(text),
    createdAt:  new Date().toISOString()
  };

  const notes = getNotes();
  notes.push(note);
  saveNotes(notes);

  return { ok: true, note: note };
}

function distanceMetres(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = Math.PI / 180;
  const x = (lng2 - lng1) * toRad * Math.cos((lat1 + lat2) / 2 * toRad);
  const y = (lat2 - lat1) * toRad;
  return Math.sqrt(x * x + y * y) * R;
}

function findNearestPlace(lat, lng, maxMetres) {
  let best = null;
  let bestDistance = Infinity;

  getPlaces().forEach(function (p) {
    const d = distanceMetres(lat, lng, p.lat, p.lng);
    if (d < bestDistance) {
      bestDistance = d;
      best = p;
    }
  });

  return bestDistance <= maxMetres ? best : null;
}

function resetDemoData() {
  localStorage.removeItem(STORE.places);
  localStorage.removeItem(STORE.notes);
}
