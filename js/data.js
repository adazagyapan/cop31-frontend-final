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
  /* COP31 */
  { id: "p_expo", name: { en: "Antalya EXPO Center (COP31)", tr: "Antalya EXPO Merkezi (COP31)" }, category: "cop31",
    lat: 36.94764, lng: 30.88366,
    type: { en: "COP31 venue", tr: "COP31 alanı" } },
  { id: "p_tram_expo", name: { en: "AntRay tram – Expo stop", tr: "AntRay tramvayı – Expo durağı" }, category: "cop31",
    lat: 36.94528, lng: 30.87667,
    type: { en: "Tram stop", tr: "Tramvay durağı" } },

  /* Sights & nature */
  { id: "p_perge", name: { en: "Perge Ancient City", tr: "Perge Antik Kenti" }, category: "sights",
    lat: 36.95769, lng: 30.85261,
    type: { en: "Ancient city", tr: "Antik kent" } },
  { id: "p_aspendos", name: { en: "Aspendos Theatre", tr: "Aspendos Antik Tiyatrosu" }, category: "sights",
    lat: 36.93894, lng: 31.17220,
    type: { en: "Ancient theatre", tr: "Antik tiyatro" } },
  { id: "p_termessos", name: { en: "Termessos – Güllük Dağı National Park", tr: "Termessos – Güllük Dağı Milli Parkı" }, category: "sights",
    lat: 37.01443, lng: 30.51468,
    type: { en: "Ancient city · National park", tr: "Antik kent · Milli park" } },
  { id: "p_olympos", name: { en: "Olympos Ancient City", tr: "Olympos Antik Kenti" }, category: "sights",
    lat: 36.39551, lng: 30.47229,
    type: { en: "Ancient city · Protected area", tr: "Antik kent · Koruma alanı" } },
  { id: "p_yanartas", name: { en: "Yanartaş (Chimaera)", tr: "Yanartaş (Khimaira)" }, category: "sights",
    lat: 36.43113, lng: 30.45638,
    type: { en: "Natural site", tr: "Doğal alan" } },
  { id: "p_koprulu", name: { en: "Köprülü Kanyon National Park", tr: "Köprülü Kanyon Milli Parkı" }, category: "sights",
    lat: 37.19172, lng: 31.18087,
    type: { en: "National park", tr: "Milli park" } },
  { id: "p_adrasan", name: { en: "Adrasan Bay", tr: "Adrasan Koyu" }, category: "sights",
    lat: 36.30567, lng: 30.46508,
    type: { en: "Bay & beach", tr: "Koy ve sahil" } },
  { id: "p_hadrian", name: { en: "Hadrian's Gate & Kaleiçi", tr: "Hadrian Kapısı ve Kaleiçi" }, category: "sights",
    lat: 36.88524, lng: 30.70858,
    type: { en: "Historic site · Old town", tr: "Tarihi yer · Tarihi kent merkezi" } },
  { id: "p_yivli", name: { en: "Yivli Minare", tr: "Yivli Minare" }, category: "sights",
    lat: 36.88661, lng: 30.70454,
    type: { en: "Historic site", tr: "Tarihi yer" } },
  { id: "p_duden", name: { en: "Lower Düden Waterfall", tr: "Aşağı Düden Şelalesi" }, category: "sights",
    lat: 36.85077, lng: 30.78337,
    type: { en: "Natural site", tr: "Doğal alan" } },
  { id: "p_kursunlu", name: { en: "Kurşunlu Waterfall Nature Park", tr: "Kurşunlu Şelalesi Tabiat Parkı" }, category: "sights",
    lat: 37.00296, lng: 30.82178,
    type: { en: "Nature park", tr: "Tabiat parkı" } },
  { id: "p_tunektepe", name: { en: "Tünektepe Cable Car", tr: "Tünektepe Teleferik" }, category: "sights",
    lat: 36.83040, lng: 30.59802,
    type: { en: "Viewpoint · Cable car", tr: "Seyir noktası · Teleferik" } },
  { id: "p_karaalioglu", name: { en: "Karaalioğlu Park", tr: "Karaalioğlu Parkı" }, category: "sights",
    lat: 36.87964, lng: 30.70488,
    type: { en: "City park", tr: "Kent parkı" } },
  { id: "p_hidirlik", name: { en: "Hıdırlık Tower", tr: "Hıdırlık Kulesi" }, category: "sights",
    lat: 36.88126, lng: 30.70362,
    type: { en: "Historic site", tr: "Tarihi yer" } },
  { id: "p_kaleicimuseum", name: { en: "Suna & İnan Kıraç Kaleiçi Museum", tr: "Suna & İnan Kıraç Kaleiçi Müzesi" }, category: "sights",
    lat: 36.88418, lng: 30.70752,
    type: { en: "Museum", tr: "Müze" } },
  { id: "p_oldharbour", name: { en: "Kaleiçi Old Harbour", tr: "Kaleiçi Yat Limanı" }, category: "sights",
    lat: 36.88489, lng: 30.70136,
    type: { en: "Historic harbour", tr: "Tarihi liman" } },
  { id: "p_ataturkhouse", name: { en: "Atatürk House Museum", tr: "Atatürk Evi Müzesi" }, category: "sights",
    lat: 36.88072, lng: 30.70815,
    type: { en: "Museum", tr: "Müze" } },
  { id: "p_phaselis", name: { en: "Phaselis Ancient City", tr: "Phaselis Antik Kenti" }, category: "sights",
    lat: 36.52515, lng: 30.55203,
    type: { en: "Ancient city", tr: "Antik kent" } },
  { id: "p_konyaalti", name: { en: "Konyaaltı Beach", tr: "Konyaaltı Plajı" }, category: "sights",
    lat: 36.86465, lng: 30.64387,
    type: { en: "Beach", tr: "Plaj" } },
  { id: "p_goynuk", name: { en: "Göynük Canyon", tr: "Göynük Kanyonu" }, category: "sights",
    lat: 36.68261, lng: 30.53410,
    type: { en: "Nature park", tr: "Tabiat parkı" } },
  { id: "p_upperduden", name: { en: "Upper Düden Waterfall", tr: "Yukarı Düden Şelalesi" }, category: "sights",
    lat: 36.96471, lng: 30.72678,
    type: { en: "Nature park", tr: "Tabiat parkı" } },

  /* Climate-friendly: green transport, eco stays, organic shops */
  { id: "p_liberty", name: { en: "Liberty Hotels Lara", tr: "Liberty Otel Lara" }, category: "climate",
    lat: 36.85736, lng: 30.88944,
    type: { en: "Hotel · Green Key", tr: "Otel · Yeşil Anahtar" } },
  { id: "p_akdenizbahcesi", name: { en: "Akdeniz Bahçesi (Çıralı)", tr: "Akdeniz Bahçesi (Çıralı)" }, category: "climate",
    lat: 36.41242, lng: 30.47843,
    type: { en: "Eco-lodge · Organic farm", tr: "Eko-konaklama · Organik çiftlik" } },
  { id: "p_otogar", name: { en: "Antalya Bus Terminal (Otogar)", tr: "Antalya Otogarı" }, category: "climate",
    lat: 36.92194, lng: 30.66498,
    type: { en: "Bus terminal · Tram", tr: "Otogar · Tramvay" } },
  { id: "p_mola", name: { en: "Mola Kafe & Bike Rental", tr: "Mola Kafe & Bisiklet Kiralama" }, category: "climate",
    lat: 36.87739, lng: 30.66286,
    type: { en: "Bike rental · Café", tr: "Bisiklet kiralama · Kafe" } },
  { id: "p_ahsap", name: "Ahşap Bisiklet", category: "climate",
    lat: 36.87731, lng: 30.63928,
    type: { en: "Bike shop & repair", tr: "Bisiklet dükkânı ve tamir" } },
  { id: "p_bluebicycle", name: "Blue Bicycle", category: "climate",
    lat: 36.88601, lng: 30.71399,
    type: { en: "Bike rental", tr: "Bisiklet kiralama" } },
  { id: "p_helpbike", name: "Helpbike", category: "climate",
    lat: 36.86902, lng: 30.72789,
    type: { en: "Bike rental & repair", tr: "Bisiklet kiralama ve tamir" } },
  { id: "p_gordo", name: { en: "Gordo Rental", tr: "Gordo Kiralama" }, category: "climate",
    lat: 36.87125, lng: 30.65119,
    type: { en: "Bike rental", tr: "Bisiklet kiralama" } },
  { id: "p_inobike", name: "INOBIKE Belek", category: "climate",
    lat: 36.84103, lng: 31.14798,
    type: { en: "Bike rental", tr: "Bisiklet kiralama" } },
  { id: "p_beren", name: "Beren Bisiklet", category: "climate",
    lat: 36.85817, lng: 30.76462,
    type: { en: "Bike repair", tr: "Bisiklet tamiri" } },
  { id: "p_sunrisesup", name: { en: "Sunrise Paddle Board", tr: "Sunrise SUP" }, category: "climate",
    lat: 36.88102, lng: 30.67181,
    type: { en: "Paddle-board tours", tr: "SUP turları" } },
  { id: "p_supcanoe", name: { en: "Sup Canoe Antalya", tr: "SUP Kano Antalya" }, category: "climate",
    lat: 36.88252, lng: 30.65297,
    type: { en: "Paddle-board & kayak tours", tr: "SUP ve kano turları" } },
  { id: "p_canoesup", name: { en: "Antalya Canoe & Sup", tr: "Antalya Kano & SUP" }, category: "climate",
    lat: 36.88364, lng: 30.67406,
    type: { en: "Canoe & paddle-board tours", tr: "Kano ve SUP turları" } },
  { id: "p_karma", name: "Karma Organik Market", category: "climate",
    lat: 36.85323, lng: 30.74973,
    type: { en: "Organic shop", tr: "Organik market" } },
  { id: "p_dogalpazar", name: "Doğal Pazar", category: "climate",
    lat: 36.87093, lng: 30.62846,
    type: { en: "Natural products shop", tr: "Doğal ürünler dükkânı" } },

  /* Plant-based food: fully vegan, or with vegan options */
  { id: "p_gaiya", name: { en: "Gaiya's Vegan House", tr: "Gaiya Vegan Evi" }, category: "plantbased",
    lat: 36.86638, lng: 30.64010,
    type: { en: "Vegan restaurant", tr: "Vegan restoran" } },
  { id: "p_level", name: { en: "LEVEL – Vegan & Gluten Free", tr: "LEVEL – Vegan ve Glütensiz" }, category: "plantbased",
    lat: 36.88490, lng: 30.70699,
    type: { en: "Vegan restaurant", tr: "Vegan restoran" } },
  { id: "p_parlak", name: { en: "Parlak Restaurant", tr: "Parlak Restoran" }, category: "plantbased",
    lat: 36.88773, lng: 30.70533,
    type: { en: "Restaurant with vegan options", tr: "Vegan seçenekli restoran" } },
  { id: "p_7mehmet", name: "7 Mehmet", category: "plantbased",
    lat: 36.88116, lng: 30.66334,
    type: { en: "Restaurant with vegan options", tr: "Vegan seçenekli restoran" } },
  { id: "p_terra", name: { en: "Terra Kitchen", tr: "Terra Mutfak" }, category: "plantbased",
    lat: 36.41561, lng: 30.48219,
    type: { en: "Restaurant with vegan options", tr: "Vegan seçenekli restoran" } },
  { id: "p_sisu", name: { en: "Sisu Vegan Kitchen", tr: "Sisu Vegan Mutfak" }, category: "plantbased",
    lat: 36.89078, lng: 30.66858,
    type: { en: "Vegan restaurant · Family-run", tr: "Vegan restoran · Aile işletmesi" } },
  { id: "p_salt", name: { en: "Salt Vegetarian", tr: "Salt Vejetaryen" }, category: "plantbased",
    lat: 36.85251, lng: 30.76818,
    type: { en: "Vegan restaurant · Family-run", tr: "Vegan restoran · Aile işletmesi" } },
  { id: "p_chi", name: "Ch'i For Life", category: "plantbased",
    lat: 36.85511, lng: 30.85921,
    type: { en: "Vegan restaurant", tr: "Vegan restoran" } },
  { id: "p_venus", name: { en: "Venüs Cafe & Kitchen", tr: "Venüs Kafe & Mutfak" }, category: "plantbased",
    lat: 36.87532, lng: 30.65109,
    type: { en: "Café with vegan options", tr: "Vegan seçenekli kafe" } },
  { id: "p_nutrie", name: "Nutrie Foodie", category: "plantbased",
    lat: 36.86181, lng: 30.73590,
    type: { en: "Café with vegan options", tr: "Vegan seçenekli kafe" } },
  { id: "p_rokka", name: "Rokka Pizza Falafel", category: "plantbased",
    lat: 36.88524, lng: 30.70938,
    type: { en: "Falafel · Vegetarian options", tr: "Falafel · Vejetaryen seçenekler" } },
  { id: "p_fatmasultan", name: { en: "Fatma Sultan Restaurant", tr: "Fatma Sultan Restoran" }, category: "plantbased",
    lat: 36.88340, lng: 30.71072,
    type: { en: "Turkish cuisine · Vegan menu", tr: "Türk mutfağı · Vegan menü" } },
  { id: "p_cava", name: { en: "Cava Restaurant", tr: "Cava Restoran" }, category: "plantbased",
    lat: 36.88491, lng: 30.70843,
    type: { en: "Lebanese · Garden restaurant", tr: "Lübnan mutfağı · Bahçe restoranı" } },

  /* Small local businesses */
  { id: "p_babamutfagi", name: "Baba Mutfağı Ev Yemekleri", category: "local",
    lat: 36.88757, lng: 30.70913,
    type: { en: "Local eatery", tr: "Esnaf lokantası" } },
  { id: "p_yagmur", name: { en: "Yağmur Cafe", tr: "Yağmur Kafe" }, category: "local",
    lat: 36.88582, lng: 30.70561,
    type: { en: "Small café", tr: "Küçük kafe" } },
  { id: "p_gizlibahce", name: "Gizli Bahçe", category: "local",
    lat: 36.88565, lng: 30.70457,
    type: { en: "Café · Guesthouse", tr: "Kafe · Pansiyon" } },
  { id: "p_hece", name: { en: "Hece Art Workshop", tr: "Hece Sanat Atölyesi" }, category: "local",
    lat: 36.88559, lng: 30.71539,
    type: { en: "Craft workshop", tr: "El sanatları atölyesi" } },
  { id: "p_sefahamam", name: { en: "Sefa Hamam", tr: "Sefa Hamamı" }, category: "local",
    lat: 36.88460, lng: 30.70717,
    type: { en: "Historic Turkish bath", tr: "Tarihi hamam" } },
  { id: "p_kaizen", name: { en: "Kaizen Specialty Coffee", tr: "Kaizen Nitelikli Kahve" }, category: "local",
    lat: 36.88787, lng: 30.73339,
    type: { en: "Coffee shop", tr: "Kahve dükkânı" } },
  { id: "p_nobler", name: { en: "Nobler Coffee Shop", tr: "Nobler Kahve" }, category: "local",
    lat: 36.85185, lng: 30.76066,
    type: { en: "Coffee roaster", tr: "Kahve kavurucusu" } },
  { id: "p_homestead", name: { en: "Homestead Coffee and Company", tr: "Homestead Kahve" }, category: "local",
    lat: 36.83907, lng: 30.59213,
    type: { en: "Coffee roaster", tr: "Kahve kavurucusu" } },
  { id: "p_jiraf", name: { en: "Jiraf Coffee & Book", tr: "Jiraf Kahve & Kitap" }, category: "local",
    lat: 36.86369, lng: 30.63297,
    type: { en: "Book café", tr: "Kitap kafe" } },
  { id: "p_kahvaltinoktasi", name: "Kahvaltı Noktası", category: "local",
    lat: 36.89048, lng: 30.69609,
    type: { en: "Breakfast place", tr: "Kahvaltı salonu" } },
  { id: "p_comlekci", name: { en: "Çömlekçi Restaurant", tr: "Çömlekçi Restoran" }, category: "local",
    lat: 36.88994, lng: 30.69559,
    type: { en: "Local restaurant", tr: "Yerel restoran" } },
  { id: "p_eksico", name: "Ekşi Co.", category: "local",
    lat: 36.87144, lng: 30.62858,
    type: { en: "Bakery · Café", tr: "Fırın · Kafe" } },
  { id: "p_yildizkofte", name: "Meşhur Aksu Yıldız Köfte & Piyaz", category: "local",
    lat: 36.85807, lng: 30.76016,
    type: { en: "Local eatery", tr: "Esnaf lokantası" } }
];

function placeText(place, field) {
  const value = place[field];
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  return value[getLang()] || value.en || value.tr || "";
}

const SEED_VERSION = 3;
const SEED_VERSION_KEY = "cop31_seed_version";

const OLD_SEED_IDS = ["p_expo", "p_hallb", "p_press", "p_cafe", "p_hotel", "p_museum", "p_market"];

const CATEGORIES = ["cop31", "sights", "climate", "plantbased", "local"];

function placeCategory(place) {
  if (CATEGORIES.indexOf(place.category) !== -1) return place.category;
  if (place.layer === "cop31") return "cop31";
  return place.eco ? "climate" : "sights";
}

function migrateSeedPlaces(saved) {
  if (readStore(SEED_VERSION_KEY, 1) >= SEED_VERSION) return saved;

  const seedIds = SEED_PLACES.map(function (p) { return p.id; });
  const ownPlaces = saved.filter(function (p) {
    return OLD_SEED_IDS.indexOf(p.id) === -1 && seedIds.indexOf(p.id) === -1;
  });
  const updated = JSON.parse(JSON.stringify(SEED_PLACES)).concat(ownPlaces);

  writeStore(STORE.places, updated);
  writeStore(SEED_VERSION_KEY, SEED_VERSION);
  return updated;
}

function getPlaces() {
  let saved = readStore(STORE.places, null);
  if (saved) saved = migrateSeedPlaces(saved);

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
