applyTranslations();
renderHeader("map");

let selectedPlaceId = null;
let noteMode = false;
let markerLayer = null;
let youMarker = null;
let formOpen = false;
let formRating = 4;
let showAllNotes = false;

const VENUE_CENTRE = [36.9478, 30.8870];

const VENUE_ZONES = [
  {
    key: "zone_blue",
    colour: "#0f6d78",
    points: [
      [36.94610, 30.87800],
      [36.95210, 30.87800],
      [36.95089, 30.88655],
      [36.94489, 30.88655]
    ]
  },
  {
    key: "zone_green",
    colour: "#246229",
    points: [
      [36.94489, 30.88655],
      [36.95089, 30.88655],
      [36.95077, 30.88736],
      [36.94990, 30.89600],
      [36.94390, 30.89600],
      [36.94477, 30.88736]
    ]
  }
];

const map = L.map("map", {
  minZoom: 6,
  maxBounds: [[35.8, 25.6], [42.1, 44.8]],
  maxBoundsViscosity: 1.0,
  zoomControl: false
}).setView(VENUE_CENTRE, 15);

L.control.zoom({ position: "bottomright" }).addTo(map);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
  crossOrigin: true
}).addTo(map);

VENUE_ZONES.forEach(function (zone) {
  L.polygon(zone.points, {
    color: zone.colour,
    weight: 2,
    opacity: 0.7,
    fillColor: zone.colour,
    fillOpacity: 0.14,
    lineJoin: "round"
  }).bindTooltip(t(zone.key), { sticky: true }).addTo(map);
});

const CATEGORY_STYLE = {
  cop31:      { colour: "#0f6d78", radius: "3px", ring: "2px solid #ffffff" },
  sights:     { colour: "#6b3fa0", radius: "50%", ring: "2px solid #ffffff" },
  climate:    { colour: "#246229", radius: "50%", ring: "3px solid #f6c344" },
  plantbased: { colour: "#b3541e", radius: "50%", ring: "2px solid #ffffff" },
  local:      { colour: "#1d5fa6", radius: "50%", ring: "2px solid #ffffff" }
};

const CATEGORY_FILTER = {
  cop31: "catCop31", sights: "catSights", climate: "catClimate",
  plantbased: "catPlant", local: "catLocal"
};

function makeIcon(place) {
  const style = CATEGORY_STYLE[placeCategory(place)];

  return L.divIcon({
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    html: '<div style="width:18px;height:18px;border-radius:' + style.radius +
          ';background:' + style.colour + ';border:' + style.ring +
          ';box-shadow:0 1px 3px rgba(0,0,0,0.45);"></div>'
  });
}

function categoryShown(category) {
  const el = document.getElementById(CATEGORY_FILTER[category]);
  return el ? el.checked : true;
}

function refreshMarkers() {
  if (markerLayer) map.removeLayer(markerLayer);
  markerLayer = L.markerClusterGroup({
    maxClusterRadius: 40,
    disableClusteringAtZoom: 17,
    spiderfyOnMaxZoom: true
  });

  getPlaces().forEach(function (place) {
    if (!categoryShown(placeCategory(place))) return;

    const marker = L.marker([place.lat, place.lng], { icon: makeIcon(place) });
    marker.bindTooltip(placeText(place, "name"));
    marker.on("click", function () { showPlace(place.id); });
    markerLayer.addLayer(marker);
  });

  map.addLayer(markerLayer);
}

function toggleFilters(event) {
  if (event) event.stopPropagation();
  const box = document.getElementById("filterBox");
  const btn = document.getElementById("filterToggle");
  if (!box) return;
  const open = box.classList.toggle("open");
  if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
}

map.on("click", function () {
  const box = document.getElementById("filterBox");
  if (box && box.classList.contains("open") && !noteMode) {
    box.classList.remove("open");
    document.getElementById("filterToggle").setAttribute("aria-expanded", "false");
  }
});

function locateMe() {
  if (!navigator.geolocation) {
    showToast(t("loc_unavailable"));
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const here = [pos.coords.latitude, pos.coords.longitude];

      if (youMarker) map.removeLayer(youMarker);
      youMarker = L.layerGroup([
        L.circle(here, {
          radius: Math.max(pos.coords.accuracy || 60, 40),
          color: "#1a73e8", weight: 1, opacity: 0.35,
          fillColor: "#1a73e8", fillOpacity: 0.14
        }),
        L.marker(here, {
          icon: L.divIcon({
            className: "",
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            html: '<div style="width:16px;height:16px;border-radius:50%;background:#1a73e8;' +
                  'border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>'
          })
        }).bindTooltip(t("loc_you"))
      ]).addTo(map);

      map.setView(here, 16);
    },
    function (err) {
      showToast(err.code === 1 ? t("loc_denied") : t("loc_unavailable"));
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

function starsFor(rating) {
  return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function escapeAttr(text) {
  return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function averageRating(notes) {
  if (notes.length === 0) return null;
  const total = notes.reduce(function (sum, n) { return sum + (n.rating || 0); }, 0);
  return Math.round((total / notes.length) * 10) / 10;
}

function renderNote(n, uiLang) {
  const cached = getNoteTranslation(n.id, uiLang);
  const shown = cached || n.text;

  let control;
  if (cached) {
    control = '<span class="hint">' + translationLabel(n.id, uiLang) + ' &middot; ' +
      '<a href="#" id="tlink_' + n.id + '" onclick="return toggleOriginal(\'' + n.id + '\')">' +
      t("note_show_orig") + '</a></span>';
  } else {
    control = '<a href="#" onclick="return translateNote(\'' + n.id + '\')">' +
      t("note_translate") + '</a>';
  }

  return '<div class="review">' +
    '<div class="review-top">' +
      '<span class="stars">' + starsFor(n.rating) + '</span>' +
      (n.lang && n.lang !== "und" ? '<span class="hint">' + n.lang.toUpperCase() + '</span>' : '') +
      (n.visibility === "limited"
        ? '<span class="pill pill-pending">' + t("pill_limited") + '</span>' : '') +
    '</div>' +
    '<p class="review-text" id="nb_' + n.id + '" data-orig="' + escapeAttr(n.text) + '"' +
      (n.lang && n.lang !== "und" ? ' data-lang-orig="' + escapeAttr(n.lang) + '"' : '') +
      (cached
        ? ' data-trans="' + escapeAttr(cached) + '" data-showing="trans"' +
          ' lang="' + escapeAttr(machineTranslatedLang(n.id, uiLang)) + '"' +
          ' data-lang-trans="' + escapeAttr(machineTranslatedLang(n.id, uiLang)) + '"'
        : (n.lang && n.lang !== "und" ? ' lang="' + escapeAttr(n.lang) + '"' : '')) + '>' +
      escapeHtml(shown) + '</p>' +
    '<div class="review-foot">' +
      '<span class="hint">' + escapeHtml(n.author) + '</span>' +
      control +
    '</div>' +
  '</div>';
}

function showPlace(placeId) {
  if (placeId !== selectedPlaceId) {
    formOpen = false;
    showAllNotes = false;
    formRating = 4;
  }
  selectedPlaceId = placeId;

  const place = getPlace(placeId);
  if (!place) return;

  const notes = getApprovedNotes(placeId);
  const uiLang = getLang();
  const avg = averageRating(notes);

  const summary = avg === null
    ? '<div class="rating-line"><span class="hint">' + t("panel_no_reviews") + '</span></div>'
    : '<div class="rating-line">' +
        '<span class="stars">' + starsFor(Math.round(avg)) + '</span>' +
        '<span class="rating-num">' + avg.toFixed(1) + '</span>' +
        '<span class="hint">' + notes.length + ' ' + t("panel_reviews") + '</span>' +
      '</div>';

  const visible = showAllNotes ? notes : notes.slice(0, 2);
  let reviewHtml = visible.map(function (n) { return renderNote(n, uiLang); }).join("");

  if (notes.length > 2) {
    reviewHtml += '<button class="link-btn" onclick="toggleAllNotes()">' +
      (showAllNotes ? t("panel_see_less") : t("panel_see_all") + " (" + notes.length + ")") +
      '</button>';
  }

  let formHtml;
  if (isGuest()) {
    formHtml = '<button class="add-review" onclick="goSignIn()">' +
                 t("guest_to_review") +
               '</button>';
  } else if (!formOpen) {
    formHtml = '<button class="add-review" onclick="openForm()">' +
                 '<span aria-hidden="true">+</span> ' + t("panel_add_btn") +
               '</button>';
  } else {
    let starPicker = '<div class="star-pick" role="group" aria-label="' + escapeAttr(t("rating_label")) + '">';
    for (let i = 1; i <= 5; i++) {
      starPicker += '<button type="button" class="star' + (i <= formRating ? " on" : "") +
                    '" onclick="setRating(' + i + ')" aria-label="' + i + '">' +
                    (i <= formRating ? "★" : "☆") + '</button>';
    }
    starPicker += '</div>';

    formHtml =
      '<div class="review-form">' +
        '<h3>' + t("panel_form_q") + '</h3>' +
        starPicker +
        '<textarea id="noteText" rows="3" placeholder="' + escapeAttr(t("panel_write_ph")) + '"></textarea>' +
        '<label for="noteVisibility">' + t("panel_visibility") + '</label>' +
        '<select id="noteVisibility">' +
          '<option value="public">' + t("panel_everyone") + '</option>' +
          '<option value="limited">' + t("panel_limited") + '</option>' +
        '</select>' +
        '<div class="form-actions">' +
          '<button onclick="submitNote()">' + t("panel_submit") + '</button>' +
          '<button class="ghost" onclick="closeForm()">' + t("panel_cancel") + '</button>' +
        '</div>' +
      '</div>';
  }

  document.getElementById("panel").innerHTML =
    '<h2>' + escapeHtml(placeText(place, "name")) + '</h2>' +
    '<p class="place-type">' + escapeHtml(placeText(place, "type")) +
      (placeCategory(place) === "climate" ? ' <span class="eco-tag">' + t("panel_eco") + '</span>' : '') +
    '</p>' +
    summary +
    (placeText(place, "info") ? '<p class="place-info">' + escapeHtml(placeText(place, "info")) + '</p>' : '') +
    '<div class="reviews">' + reviewHtml + '</div>' +
    formHtml;

  autoTranslateVisible();
}

function toggleAllNotes() { showAllNotes = !showAllNotes; showPlace(selectedPlaceId); }
function openForm()  { formOpen = true;  showPlace(selectedPlaceId); }
function closeForm() { formOpen = false; showPlace(selectedPlaceId); }

function setRating(n) {
  const box = document.getElementById("noteText");
  const kept = box ? box.value : "";
  formRating = n;
  showPlace(selectedPlaceId);
  const again = document.getElementById("noteText");
  if (again) { again.value = kept; again.focus(); }
}

function toggleOriginal(noteId) {
  const body = document.getElementById("nb_" + noteId);
  const link = document.getElementById("tlink_" + noteId);
  if (!body) return false;

  const showingOriginal = body.getAttribute("data-showing") === "orig";
  if (showingOriginal) {
    body.textContent = body.getAttribute("data-trans");
    body.setAttribute("data-showing", "trans");
    body.setAttribute("lang", body.getAttribute("data-lang-trans") || "");
    if (link) link.textContent = t("note_show_orig");
  } else {
    body.textContent = body.getAttribute("data-orig");
    body.setAttribute("data-showing", "orig");
    const orig = body.getAttribute("data-lang-orig");
    if (orig) body.setAttribute("lang", orig); else body.removeAttribute("lang");
    if (link) link.textContent = t("note_show_trans");
  }
  return false;
}

async function translateNote(noteId) {
  const note = getNotes().find(function (n) { return n.id === noteId; });
  if (!note) return false;

  showToast(t("note_translating"));
  const out = await translateText(note.text, "auto", getLang());

  if (!out) { showToast(t("note_tr_unavail")); return false; }
  if (out.trim() === note.text.trim()) { showToast(t("note_same_lang")); return false; }

  setNoteTranslation(noteId, getLang(), out, lastTranslation);
  showPlace(selectedPlaceId);
  return false;
}

async function autoTranslateVisible() {
  const uiLang = getLang();
  const todo = getApprovedNotes(selectedPlaceId).filter(function (n) {
    return n.lang !== "und" && n.lang !== uiLang && !getNoteTranslation(n.id, uiLang);
  });
  if (todo.length === 0) return;

  let changed = false;
  for (const n of todo) {
    if (!(await onDeviceAvailable(n.lang, uiLang))) return;
    const out = await translateText(n.text, n.lang, uiLang);
    if (out) { setNoteTranslation(n.id, uiLang, out, lastTranslation); changed = true; }
  }
  if (changed) showPlace(selectedPlaceId);
}

function submitNote() {
  if (isGuest()) { goSignIn(); return; }

  const text = document.getElementById("noteText").value.trim();
  if (text === "") { showToast(t("toast_empty_note")); return; }

  const visibility = document.getElementById("noteVisibility").value;
  const result = createNote(selectedPlaceId, text, formRating, visibility, getSession().name);

  if (!result.ok) { showToast(t("toast_blocked") + " " + t(result.reasonKey)); return; }

  showToast(t("toast_sent"));
  formOpen = false;
  formRating = 4;
  showPlace(selectedPlaceId);
}

function toggleNoteMode() {
  if (isGuest()) {
    showToast(t("guest_note_mode"));
    goSignIn();
    return;
  }

  noteMode = !noteMode;

  const button = document.getElementById("noteModeBtn");
  if (button) {
    button.textContent = noteMode ? t("note_cancel") : t("note_start");
    button.classList.toggle("active", noteMode);
  }

  const stage = document.getElementById("map");
  if (stage) stage.style.cursor = noteMode ? "crosshair" : "";
  if (noteMode) showToast(t("toast_tap_map"));
}

map.on("click", function (e) {
  if (!noteMode) return;

  const nearest = findNearestPlace(e.latlng.lat, e.latlng.lng, 250);
  if (nearest === null) { showToast(t("toast_too_far")); return; }

  toggleNoteMode();
  selectedPlaceId = null;
  showPlace(nearest.id);
  openForm();
  showToast(t("toast_snapped") + " " + placeText(nearest, "name"));
});

refreshMarkers();

try {
  const locate = document.getElementById("locateBtn");
  if (locate) locate.title = t("loc_find");
} catch (err) {
  console.warn("Optional map control missing:", err);
}
