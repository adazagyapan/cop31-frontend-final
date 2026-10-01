applyTranslations();
renderHeader("events");

const PROGRAMME = [
  { day: 1,  date: 9,  key: "ev_d1",  tags: ["all"] },
  { day: 2,  date: 10, key: "ev_d2",  tags: ["all"] },
  { day: 3,  date: 11, key: "ev_d3",  summit: 1, tags: ["all", "summit"] },
  { day: 4,  date: 12, key: "ev_d4",  summit: 2, tags: ["all", "summit"] },
  { day: 5,  date: 13, key: "ev_d5",  tags: ["all"] },
  { day: 6,  date: 14, key: "ev_d6",  tags: ["all", "youth"] },
  { day: 7,  date: 15, key: "ev_d7",  subKey: "ev_d7s", tags: ["all"] },
  { day: 8,  date: 16, key: "ev_d8",  tags: ["all"] },
  { day: 9,  date: 17, key: "ev_d9",  tags: ["all"] },
  { day: 10, date: 18, key: "ev_d10", tags: ["all"] },
  { day: 11, date: 19, key: "ev_d11", tags: ["all"] },
  { day: 12, date: 20, key: "ev_d12", tags: ["all"] }
];

let activeFilter = "all";

function formatDay(date) {
  const d = new Date(2026, 10, date);
  const locale = getLang() === "tr" ? "tr-TR" : "en-GB";
  return d.toLocaleDateString(locale, { day: "numeric", month: "long" });
}

function isToday(date) {
  const now = new Date();
  return now.getFullYear() === 2026 && now.getMonth() === 10 && now.getDate() === date;
}

function renderFilters() {
  const filters = [
    { id: "all",    key: "ev_filter_all" },
    { id: "summit", key: "ev_filter_summit" },
    { id: "youth",  key: "ev_filter_youth" }
  ];

  document.getElementById("evFilters").innerHTML = filters.map(function (f) {
    return '<button class="ev-chip' + (activeFilter === f.id ? " active" : "") +
           '" onclick="setFilter(\'' + f.id + '\')">' + t(f.key) + '</button>';
  }).join("");
}

function setFilter(id) {
  activeFilter = id;
  renderFilters();
  renderProgramme();
}

function renderProgramme() {
  const shown = PROGRAMME.filter(function (d) {
    return d.tags.indexOf(activeFilter) !== -1;
  });

  document.getElementById("evList").innerHTML = shown.map(function (d) {
    const summitLine = d.summit
      ? '<div class="ev-summit">' + t("ev_summit_badge") + ' &middot; ' +
        t("ev_day") + ' ' + d.summit + '</div>'
      : "";

    const sub = d.subKey ? '<div class="ev-sub">' + t(d.subKey) + '</div>' : "";

    return '<div class="ev-day' + (isToday(d.date) ? " today" : "") + '">' +
             '<div class="ev-date">' +
               '<span class="ev-daynum">' + t("ev_day") + ' ' + d.day + '</span>' +
               '<span class="ev-datetext">' + formatDay(d.date) + '</span>' +
             '</div>' +
             '<div class="ev-body">' +
               '<h3>' + t(d.key) + '</h3>' +
               sub +
               summitLine +
             '</div>' +
           '</div>';
  }).join("");
}

renderFilters();
renderProgramme();
