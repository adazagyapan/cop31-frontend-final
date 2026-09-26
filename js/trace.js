(function () {
  if (!/[?&]trace\b/.test(location.search)) return;
  if (typeof map === "undefined") return;

  const points = [];
  let shape = null;

  const box = document.createElement("div");
  box.className = "trace-box";
  box.innerHTML =
    '<strong>Zone tracing</strong>' +
    '<p class="hint">Click each corner of the zone in order. Undo removes the last point.</p>' +
    '<textarea id="traceOut" rows="6" readonly></textarea>' +
    '<div class="trace-actions">' +
      '<button class="small ghost" id="traceUndo">Undo</button>' +
      '<button class="small ghost" id="traceClear">Clear</button>' +
      '<button class="small" id="traceCopy">Copy</button>' +
    '</div>';
  document.querySelector(".map-stage").appendChild(box);

  L.DomEvent.disableClickPropagation(box);
  L.DomEvent.disableScrollPropagation(box);

  function redraw() {
    if (shape) map.removeLayer(shape);
    shape = points.length >= 3
      ? L.polygon(points, { color: "#d97706", weight: 2, dashArray: "6 4", fillOpacity: 0.1 })
      : L.polyline(points, { color: "#d97706", weight: 2, dashArray: "6 4" });
    shape.addTo(map);

    document.getElementById("traceOut").value =
      "points: [\n" +
      points.map(function (p) {
        return "  [" + p[0].toFixed(5) + ", " + p[1].toFixed(5) + "]";
      }).join(",\n") +
      "\n]";
  }

  map.on("click", function (e) {
    points.push([e.latlng.lat, e.latlng.lng]);
    redraw();
  });

  document.getElementById("traceUndo").onclick = function () { points.pop(); redraw(); };
  document.getElementById("traceClear").onclick = function () { points.length = 0; redraw(); };
  document.getElementById("traceCopy").onclick = function () {
    const out = document.getElementById("traceOut");
    out.select();
    try { navigator.clipboard.writeText(out.value); } catch (err) { document.execCommand("copy"); }
    showToast("Copied " + points.length + " points.");
  };

  redraw();
})();
