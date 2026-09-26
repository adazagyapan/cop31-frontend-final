const TRANSLATE_PROXY_URL = "https://falling-darkness-8d69.zagyapanada.workers.dev/";

const USE_MYMEMORY_FALLBACK = true;
const MYMEMORY_EMAIL = "";

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise(function (resolve) { setTimeout(function () { resolve("__timeout__"); }, ms); })
  ]);
}

function isFileProtocol() {
  return typeof location !== "undefined" && location.protocol === "file:";
}

async function onDeviceAvailable(source, target) {
  if (typeof self === "undefined" || !("Translator" in self)) return false;
  try {
    const status = await withTimeout(self.Translator.availability({
      sourceLanguage: source,
      targetLanguage: target
    }), 3000);
    return status === "available";
  } catch (err) {
    return false;
  }
}

async function translateOnDevice(text, source, target) {
  const translator = await self.Translator.create({
    sourceLanguage: source,
    targetLanguage: target
  });
  return await translator.translate(text);
}

async function translateViaProxy(text, source, target) {
  if (!TRANSLATE_PROXY_URL) return null;
  try {
    const res = await fetch(TRANSLATE_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text, source: source, target: target })
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.translation) return null;
    return { text: data.translation, detected: (data.detected || "").toLowerCase() };
  } catch (err) {
    console.error("Translation proxy failed:", err);
    return null;
  }
}

async function translateViaMyMemory(text, source, target) {
  if (!USE_MYMEMORY_FALLBACK) return null;
  try {
    const params = new URLSearchParams({
      q: text.slice(0, 500),
      langpair: source + "|" + target
    });
    if (MYMEMORY_EMAIL) params.set("de", MYMEMORY_EMAIL);

    const res = await fetch("https://api.mymemory.translated.net/get?" + params.toString());
    if (!res.ok) return null;

    const data = await res.json();
    if (data.responseStatus !== 200) {
      console.warn("MyMemory said:", data.responseDetails);
      return null;
    }
    return data.responseData.translatedText || null;
  } catch (err) {
    console.error("MyMemory translation failed:", err);
    return null;
  }
}

let lastTranslation = { engine: null, from: "" };

async function translateText(text, source, target) {
  const known = source && source !== "auto";
  lastTranslation = { engine: null, from: known ? source : "" };
  if (known && source === target) return text;

  if (isFileProtocol()) {
    console.warn(
      "Translation needs the page served over http. It's running from a " +
      "file:// address (opened by double-clicking). Use Live Server, a local " +
      "server, or GitHub Pages instead."
    );
    return null;
  }

  if (known && await onDeviceAvailable(source, target)) {
    try {
      const out = await translateOnDevice(text, source, target);
      lastTranslation = { engine: "device", from: source };
      return out;
    } catch (err) {
    }
  }

  const viaProxy = await translateViaProxy(text, source, target);
  if (viaProxy !== null) {
    lastTranslation = { engine: "google", from: viaProxy.detected || (known ? source : "") };
    return viaProxy.text;
  }

  const mmSource = known ? source : guessSourceLang(text);
  if (mmSource === target) return text;

  const viaMyMemory = await translateViaMyMemory(text, mmSource, target);
  if (viaMyMemory !== null) {
    lastTranslation = { engine: "mymemory", from: mmSource === "und" ? "" : mmSource };
    return viaMyMemory;
  }

  console.warn("No translation method returned a result for " + source + " -> " + target + ".");
  return null;
}

function guessSourceLang(text) {
  if (typeof detectLanguage === "function") return detectLanguage(text);
  return /[çğıöşüÇĞİÖŞÜ]/.test(text) ? "tr" : "en";
}

async function translationPossible(source, target) {
  if (source === target) return false;
  if (await onDeviceAvailable(source, target)) return true;
  if (TRANSLATE_PROXY_URL) return true;
  return USE_MYMEMORY_FALLBACK;
}

async function translateDiagnostics() {
  const hasApi = typeof self !== "undefined" && "Translator" in self;
  console.log("Secure context:", window.isSecureContext, "| protocol:", location.protocol);
  console.log("Built-in Translator API present:", hasApi);
  console.log("Cloud proxy configured:", TRANSLATE_PROXY_URL || "no");
  console.log("MyMemory fallback on:", USE_MYMEMORY_FALLBACK);
  if (isFileProtocol()) {
    console.warn(">>> The page is running from a file:// address. Translation " +
      "cannot work here. Serve it over http (Live Server / local server / GitHub Pages).");
  }
  if (hasApi) {
    try {
      console.log("tr -> en on-device:", await withTimeout(self.Translator.availability({ sourceLanguage: "tr", targetLanguage: "en" }), 3000));
      console.log("en -> tr on-device:", await withTimeout(self.Translator.availability({ sourceLanguage: "en", targetLanguage: "tr" }), 3000));
    } catch (err) {
      console.log("on-device availability check failed:", err);
    }
  }
}

const GOOGLE_BADGE_SRC = "img/powered-by-google-translate.png";

function languageName(code, uiLang) {
  try {
    const name = new Intl.DisplayNames([uiLang], { type: "language" }).of(code);
    return name ? name.charAt(0).toLocaleUpperCase(uiLang) + name.slice(1) : code.toUpperCase();
  } catch (err) {
    return code.toUpperCase();
  }
}

function escapeLabelText(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function translationLabel(noteId, uiLang) {
  const meta = getNoteTranslationMeta(noteId, uiLang);

  if (!meta || meta.engine !== "google") {
    return '<span class="mt-label">' + t("note_translated_auto") + '</span>';
  }

  const wording = meta.from
    ? t("note_translated_from").replace("{lang}", escapeLabelText(languageName(meta.from, uiLang)))
    : t("note_translated");

  const linked = wording.replace("Google",
    '<a href="https://translate.google.com" target="_blank" rel="noopener">Google</a>');

  return '<span class="mt-label">' + linked +
           '<img class="gt-badge" src="' + GOOGLE_BADGE_SRC + '" alt="Powered by Google Translate"' +
           ' onerror="this.remove()">' +
         '</span>';
}

function machineTranslatedLang(noteId, uiLang) {
  const meta = getNoteTranslationMeta(noteId, uiLang);
  return uiLang + "-x-mtfrom-" + ((meta && meta.from) || "und");
}
