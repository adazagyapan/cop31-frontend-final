function getSession() {
  return readStore(STORE.session, null);
}

function isAdmin() {
  const s = getSession();
  return s !== null && s.role === "admin";
}

function login(email, password) {
  const found = USERS.find(function (u) {
    return u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password;
  });
  if (!found) return false;
  writeStore(STORE.session, { email: found.email, name: found.name, role: found.role });
  return true;
}

function logout() {
  localStorage.removeItem(STORE.session);
  window.location.href = "index.html";
}

function isGuest() {
  return getSession() === null;
}

function goSignIn() {
  try { localStorage.setItem("cop31_return", location.pathname.split("/").pop()); }
  catch (err) { }
  window.location.href = "login.html";
}

function requireLogin() {
  if (getSession() === null) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function requireAdmin() {
  if (!requireLogin()) return false;
  if (!isAdmin()) {
    alert(t("admin_only"));
    window.location.href = "map.html";
    return false;
  }
  return true;
}

function renderHeader(currentPage) {
  const session = getSession();

  const header = document.getElementById("siteHeader");
  if (!header) return;

  const links = [];
  if (currentPage !== "map")     links.push('<a href="map.html">' + t("nav_map") + '</a>');
  if (currentPage !== "events")  links.push('<a href="events.html">' + t("nav_events") + '</a>');
  if (currentPage !== "about")   links.push('<a href="about.html">' + t("nav_about") + '</a>');
  if (currentPage !== "culture") links.push('<a href="culture.html">' + t("nav_culture") + '</a>');
  if (session && session.role === "admin" && currentPage !== "admin") {
    links.push('<a href="admin.html">' + t("nav_moderation") + '</a>');
  }

  const otherLang = getLang() === "en" ? "TR" : "EN";

  const identity = session
    ? '<span class="who">' + session.name +
        ' <span class="role-tag">' + t("role_" + session.role) + '</span></span>' +
      '<button class="ghost small" onclick="logout()">' + t("nav_signout") + '</button>'
    : '<span class="who">' + t("guest_label") + '</span>' +
      '<button class="small" onclick="goSignIn()">' + t("nav_signin") + '</button>';

  header.innerHTML =
    '<a href="index.html" class="idd-logo header-logo" aria-label="İklim Değişmeden Değiş"></a>' +
    '<span class="brand">' + t("brand") + '</span>' +
    '<nav>' +
      '<div class="menu">' +
        '<button class="ghost small" onclick="toggleMenu(event)">' + t("nav_menu") + ' ▾</button>' +
        '<div class="menu-panel" id="menuPanel">' + links.join("") + '</div>' +
      '</div>' +
      identity +
      '<button class="ghost small" onclick="toggleLang()" title="English / Türkçe">' + otherLang + '</button>' +
    '</nav>';
}

function toggleMenu(event) {
  event.stopPropagation();
  const panel = document.getElementById("menuPanel");
  if (panel) panel.classList.toggle("open");
}

document.addEventListener("click", function () {
  const panel = document.getElementById("menuPanel");
  if (panel) panel.classList.remove("open");
});

let toastTimer = null;

function showToast(message) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
}

(function () {
  const local = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(location.hostname);
  if (local || /[?&]photos\b/.test(location.search)) {
    document.documentElement.classList.add("show-photo-slots");
  }
})();
