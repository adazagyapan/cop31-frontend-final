if (requireAdmin()) {
  applyTranslations();
  renderHeader("admin");
}

function openTab(name) {
  const views = { queue: "viewQueue", places: "viewPlaces", all: "viewAll" };
  const tabs  = { queue: "tabQueue",  places: "tabPlaces",  all: "tabAll"  };

  for (const key in views) {
    document.getElementById(views[key]).style.display = key === name ? "block" : "none";
    document.getElementById(tabs[key]).classList.toggle("active", key === name);
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function starsFor(rating) {
  return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
}

function placeName(placeId) {
  const p = getPlace(placeId);
  return p ? placeText(p, "name") : "—";
}

function formatDate(iso) {
  const d = new Date(iso);
  const locale = getLang() === "tr" ? "tr-TR" : "en-GB";
  return d.toLocaleDateString(locale) + " " +
         d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
}

function noteBody(note) {
  const uiLang = getLang();
  const cached = getNoteTranslation(note.id, uiLang);

  let out = '<p style="margin-top:10px;">' + escapeHtml(note.text) + '</p>';

  if (cached) {
    out += '<p style="margin-top:6px; padding-left:10px; border-left:3px solid var(--line);"' +
             ' lang="' + machineTranslatedLang(note.id, uiLang) + '">' +
             escapeHtml(cached) +
             '<br><span class="hint">' + translationLabel(note.id, uiLang) + '</span>' +
           '</p>';
  } else {
    out += '<p style="margin-top:6px;">' +
             '<a href="#" onclick="return translateAdminNote(\'' + note.id + '\')">' +
             t("note_translate") + '</a></p>';
  }

  return out;
}

async function translateAdminNote(noteId) {
  const note = getNotes().find(function (n) { return n.id === noteId; });
  if (!note) return false;

  showToast(t("note_translating"));

  const out = await translateText(note.text, "auto", getLang());

  if (!out) {
    showToast(t("note_tr_unavail"));
    return false;
  }

  if (out.trim() === note.text.trim()) {
    showToast(t("note_same_lang"));
    return false;
  }

  setNoteTranslation(noteId, getLang(), out, lastTranslation);
  renderQueue();
  renderAll();
  return false;
}

function noteCard(note, withActions) {
  const flag = note.flagKey
    ? '<div style="margin-top:8px;">' +
        '<span class="pill pill-flagged">' + t("status_flagged") + '</span> ' +
        '<span class="hint">' + t(note.flagKey) + '</span>' +
      '</div>'
    : "";

  const actions = withActions
    ? '<div class="actions">' +
        '<button class="small" onclick="decide(\'' + note.id + '\', \'approved\')">' + t("btn_approve") + '</button>' +
        '<button class="small danger" onclick="decide(\'' + note.id + '\', \'rejected\')">' + t("btn_reject") + '</button>' +
      '</div>'
    : (note.status === "approved"
        ? '<div class="actions">' +
            '<button class="small ghost" onclick="decide(\'' + note.id + '\', \'pending\')">' + t("btn_pullback") + '</button>' +
          '</div>'
        : "");

  return '<div class="card">' +
    '<div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">' +
      '<b>' + escapeHtml(placeName(note.placeId)) + '</b>' +
      '<span class="pill pill-' + note.status + '">' + t("status_" + note.status) + '</span>' +
      '<span class="stars">' + starsFor(note.rating) + '</span>' +
    '</div>' +
    noteBody(note) +
    flag +
    '<div class="meta hint" style="margin-top:8px;">' +
      escapeHtml(note.author) +
      (note.lang && note.lang !== "und" ? ' &middot; ' + note.lang.toUpperCase() : '') +
      ' &middot; ' + t("meta_audience") + ' ' +
      (note.visibility === "limited" ? t("panel_limited") : t("panel_everyone")) +
      ' &middot; ' + formatDate(note.createdAt) +
    '</div>' +
    actions +
  '</div>';
}

function renderQueue() {
  const pending = getPendingNotes();
  const box = document.getElementById("queueList");

  if (pending.length === 0) {
    box.innerHTML = '<div class="empty">' + t("admin_queue_empty") + '</div>';
    return;
  }

  pending.sort(function (a, b) {
    if (a.flagKey && !b.flagKey) return -1;
    if (!a.flagKey && b.flagKey) return 1;
    return 0;
  });

  box.innerHTML = pending.map(function (n) { return noteCard(n, true); }).join("");
}

function decide(noteId, status) {
  setNoteStatus(noteId, status, "");
  renderQueue();
  renderAll();

  const words = {
    approved: t("toast_published"),
    rejected: t("toast_rejected"),
    pending:  t("toast_requeued")
  };
  showToast(words[status]);
}

function renderAll() {
  const notes = getNotes();
  const box = document.getElementById("allList");

  if (notes.length === 0) {
    box.innerHTML = '<div class="empty">' + t("admin_all_empty") + '</div>';
    return;
  }

  const sorted = notes.slice().reverse();
  box.innerHTML = sorted.map(function (n) { return noteCard(n, false); }).join("");
}

const CATEGORY_LABEL = {
  cop31: "layer_cop31", sights: "layer_tourism", climate: "cat_climate",
  plantbased: "cat_plantbased", local: "cat_local"
};

function renderPlaces() {
  const places = getPlaces();

  let rows = "";
  places.forEach(function (p) {
    rows +=
      '<tr>' +
        '<td><b>' + escapeHtml(placeText(p, "name")) + '</b><br>' +
            '<span class="hint">' + escapeHtml(placeText(p, "type")) + '</span></td>' +
        '<td>' + t(CATEGORY_LABEL[placeCategory(p)]) + '</td>' +
        '<td class="hint">' + p.lat.toFixed(4) + ', ' + p.lng.toFixed(4) + '</td>' +
        '<td><button class="small danger" onclick="handleDeletePlace(\'' + p.id + '\')">' +
            t("btn_remove") + '</button></td>' +
      '</tr>';
  });

  document.getElementById("placeList").innerHTML =
    '<table class="table">' +
      '<tr>' +
        '<th>' + t("col_place") + '</th>' +
        '<th>' + t("form_layer") + '</th>' +
        '<th>' + t("col_coords") + '</th>' +
        '<th></th>' +
      '</tr>' +
      rows +
    '</table>';
}

function handleAddPlace() {
  const name = document.getElementById("pName").value.trim();
  const type = document.getElementById("pType").value.trim();
  const lat  = parseFloat(document.getElementById("pLat").value);
  const lng  = parseFloat(document.getElementById("pLng").value);
  const info = document.getElementById("pInfo").value.trim();

  if (name === "" || type === "") {
    showToast(t("err_place_fields"));
    return;
  }

  if (isNaN(lat) || isNaN(lng)) {
    showToast(t("err_coords_num"));
    return;
  }

  if (lat < 35.8 || lat > 42.1 || lng < 25.6 || lng > 44.8) {
    showToast(t("err_coords_range"));
    return;
  }

  const lang = getLang();

  addPlace({
    name: name,
    type: { en: type, tr: type },
    info: { en: info, tr: info },
    category: document.getElementById("pLayer").value,
    lat: lat,
    lng: lng,
    enteredIn: lang
  });

  ["pName", "pType", "pLat", "pLng", "pInfo"].forEach(function (id) {
    document.getElementById(id).value = "";
  });

  renderPlaces();
  showToast(t("toast_place_added"));
}

function handleDeletePlace(id) {
  if (!confirm(t("confirm_remove"))) return;
  deletePlace(id);
  renderPlaces();
  renderQueue();
  renderAll();
  showToast(t("toast_removed"));
}

function handleReset() {
  if (!confirm(t("confirm_reset"))) return;
  resetDemoData();
  renderQueue();
  renderAll();
  renderPlaces();
  showToast(t("toast_reset"));
}

renderQueue();
renderAll();
renderPlaces();
