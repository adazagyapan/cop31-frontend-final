# COP31 Türkiye App

A map-based guide to COP31 — the UN Climate Change Conference at the Antalya EXPO
Center, 9–20 November 2026 — and to Türkiye's climate-friendly places. Built by
[İklim Değişmeden Değiş (IDD ORG)](https://www.iklimdd.org).

Anyone can browse the map, the programme and the guide pages. Writing a review
needs an account, and every review is checked by a moderator before it appears.
Reviews in other languages can be translated with Google Translate.

This is the front-end. It runs in the browser and can be installed on a phone
like an app. Accounts and data still live in each browser (see *Prototype
limits*); the shared database is a separate backend project.

## Pages

| Page | What it does |
|------|--------------|
| `index.html` | Welcome page: what the app is, "See the map", sign in, install. |
| `map.html` | The map: venue zones, places, filters, your location, reviews. |
| `events.html` | The official COP31 programme, day by day. |
| `about.html` | About COP31, IDD ORG and the app; Google Translate disclaimer. |
| `culture.html` | Practical guide to Antalya and travelling sustainably. |
| `login.html` | Sign in. Returns you to the page you came from. |
| `admin.html` | Moderators only: review queue, all notes, place catalogue. |

## Files

```
├── index.html, map.html, events.html, about.html,
│   culture.html, login.html, admin.html
├── manifest.webmanifest   app name, colours, icons (installing)
├── sw.js                  service worker: offline copies of the app
├── css/style.css          every style; the IDD logo is embedded in it
├── img/                   app icons, and the photos you add (see img/README.md)
├── js/
│   ├── data.js            places, notes, storage, the automatic screen
│   ├── i18n.js            every English and Turkish phrase
│   ├── translate.js       translating reviews, and the Google attribution
│   ├── auth.js            sign-in, roles, the header and menu
│   ├── pwa.js             registers the service worker, install button
│   ├── map.js             the map page (venue zones are defined at the top)
│   ├── trace.js           zone-tracing tool, only active with ?trace
│   ├── events.js          the programme page
│   └── admin.js           the moderation page
└── translate-proxy/
    └── worker.js          the Cloudflare Worker that holds the Google key
```

## Running it

Serve the folder over http — VS Code **Live Server**, or
`python -m http.server 8000` — or publish it on GitHub Pages. Don't open the
files by double-clicking: storage, translation and the offline service worker
all refuse to work on a `file://` address.

Demo accounts: moderator `admin@cop31.org` / `admin123`, delegate
`user@cop31.org` / `user123`.

## The venue

COP31 is held at the Antalya EXPO Center — the former EXPO 2016 park, Solak
Alanya Yolu / Serik Caddesi, Aksu. The organisers give the site as about
1.1 million m²: roughly 527,000 m² Blue Zone and 582,000 m² Green Zone, both on
the one site.

The zone shapes are at the top of `js/map.js` (`VENUE_ZONES`). The outer outline
is fitted to known points on the site and to its published size. **The line
between Blue and Green is provisional**, because the official split is only
published as a picture on [cop31.tr/venue](https://cop31.tr/venue).

To trace it exactly:

1. Open `map.html?trace` (on Live Server or GitHub Pages).
2. Open the official venue map beside it.
3. Click the corners of one zone in order. Undo removes the last point.
4. Press Copy and paste the list over that zone's `points` in `js/map.js`.

The tool is invisible without `?trace`.

## The programme

`events.html` shows the twelve thematic days as published by the COP31
Presidency at [cop31.tr/thematic-days](https://cop31.tr/thematic-days) (announced
on [24 August 2026](https://cop31.tr/news-detail/thematic-days-announced-2026)).
Session times and side events are published later; re-check that page before
launch.

## Language

Every page has an EN/TR switch. All interface text is in `js/i18n.js`: one line
per phrase, English and Turkish side by side. HTML marks text with
`data-i18n="key"`, placeholders with `data-i18n-placeholder`, and image
descriptions with `data-i18n-alt`.

## Translating reviews

Reviews are translated on request, then saved so each is only translated once:

1. **Google** (main route) — through `translate-proxy/worker.js`, a Cloudflare
   Worker holding the Google Cloud key. Google detects the review's language, so
   any language works, and the review's language tag is corrected to match.
2. **The browser's own translator** — used automatically only when Chrome/Edge
   on desktop already has the language pair downloaded. Free.
3. **MyMemory** — a keyless fallback if the worker is unreachable.

Only Google's translations say "Translated from … by Google". The others say
"Automatically translated", so Google is never credited for work it didn't do.

**Google's terms** (docs.cloud.google.com/translate/attribution) require:
the "Powered by Google Translate" badge next to translations (download it from
that page and save it as `img/powered-by-google-translate.png`), a link to
translate.google.com (done), translated text marked with
`lang="xx-x-mtfrom-yy"` (done), and their disclaimer (on the About page).

**Updating the worker:** paste `translate-proxy/worker.js` into the Cloudflare
editor and deploy; the secret stays. It only answers the sites listed in
`ALLOWED_ORIGINS` — add your address there if the site moves. The daily
character quota you set in Google Cloud is the real cost cap; keep it.

## Installing on a phone

The site is a Progressive Web App. On Android/desktop Chrome and Edge, the
welcome page shows **Install the app**. On iPhone: Share → Add to Home Screen.
Once opened, the app shell works offline, and map areas you've already viewed
stay available (up to 400 tiles — OpenStreetMap forbids downloading ahead).

**When you publish a new version, change `VERSION` in `sw.js`** (`cop31-v1` →
`cop31-v2`). That makes installed copies fetch the new files.

## Prototype limits

- **Accounts aren't secure.** Passwords are checked in the browser and the demo
  accounts are shown on the sign-in page, so on a public site anyone can sign in
  as a moderator. Real sign-in needs the backend.
- **Data is per browser.** Places and reviews live in each browser's storage;
  one person's review isn't seen on another's phone until the backend exists.
- **Placeholder places.** The city places are stand-ins, to be replaced with
  real, verified ones as the final step.

## Built with

[Leaflet](https://leafletjs.com/), [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster),
[OpenStreetMap](https://www.openstreetmap.org/copyright) map data, Google Cloud
Translation. Otherwise plain HTML, CSS and JavaScript.
