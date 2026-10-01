<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>COP31 Türkiye App</title>
  <link rel="manifest" href="manifest.webmanifest">
  <meta name="theme-color" content="#17401b">
  <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32.png">
  <link rel="apple-touch-icon" href="img/icon-apple-180.png">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="COP31 TR">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header class="site-header" id="siteHeader"></header>

  <div class="admin-wrap">

    <div class="tabs">
      <button class="tab active" id="tabQueue"  onclick="openTab('queue')"  data-i18n="tab_queue"></button>
      <button class="tab"        id="tabPlaces" onclick="openTab('places')" data-i18n="tab_places"></button>
      <button class="tab"        id="tabAll"    onclick="openTab('all')"    data-i18n="tab_all"></button>
    </div>

    <section id="viewQueue">
      <div class="section-note" data-i18n="admin_queue_note"></div>
      <div id="queueList"></div>
    </section>

    <section id="viewPlaces" style="display: none;">
      <div class="card">
        <h3 data-i18n="form_add_place"></h3>
        <div class="two-col">
          <div>
            <label for="pName" data-i18n="form_name"></label>
            <input id="pName">
          </div>
          <div>
            <label for="pType" data-i18n="form_type"></label>
            <input id="pType">
          </div>
        </div>

        <div class="two-col">
          <div>
            <label for="pLat" data-i18n="form_lat"></label>
            <input id="pLat" type="number" step="0.0001" placeholder="36.9402">
          </div>
          <div>
            <label for="pLng" data-i18n="form_lng"></label>
            <input id="pLng" type="number" step="0.0001" placeholder="30.8164">
          </div>
        </div>

        <div>
          <label for="pLayer" data-i18n="form_layer"></label>
          <select id="pLayer">
            <option value="sights" data-i18n="layer_tourism"></option>
            <option value="climate" data-i18n="cat_climate"></option>
            <option value="plantbased" data-i18n="cat_plantbased"></option>
            <option value="local" data-i18n="cat_local"></option>
            <option value="cop31" data-i18n="layer_cop31"></option>
          </select>
        </div>

        <label for="pInfo" data-i18n="form_desc"></label>
        <textarea id="pInfo" rows="2" data-i18n-placeholder="form_desc_ph"></textarea>

        <div class="actions">
          <button onclick="handleAddPlace()" data-i18n="form_submit"></button>
        </div>
      </div>

      <h3 style="margin-top:24px;" data-i18n="form_catalogue"></h3>
      <div id="placeList"></div>
    </section>

    <section id="viewAll" style="display: none;">
      <div class="section-note" data-i18n="admin_all_note"></div>
      <div id="allList"></div>
    </section>

    <hr style="margin: 40px 0 20px; border: 0; border-top: 1px solid var(--line);">
    <p class="hint">
      <span data-i18n="reset_label"></span>
      <button class="ghost small" onclick="handleReset()" data-i18n="reset_button"></button>
    </p>

  </div>

  <script src="js/data.js"></script>
  <script src="js/i18n.js"></script>
  <script src="js/translate.js"></script>
  <script src="js/auth.js"></script>
  <script src="js/pwa.js"></script>
  <script src="js/admin.js"></script>

</body>
</html>
