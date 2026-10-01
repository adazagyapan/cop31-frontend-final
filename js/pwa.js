(function () {
  const secure = location.protocol === "https:" ||
                 /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  if ("serviceWorker" in navigator && secure) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function (err) {
        console.warn("Service worker not registered:", err);
      });
    });
  }

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
    const btn = document.getElementById("installBtn");
    if (btn) btn.hidden = false;
  });

  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    const btn = document.getElementById("installBtn");
    if (btn) btn.hidden = true;
  });

  window.installApp = async function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    const btn = document.getElementById("installBtn");
    if (btn) btn.hidden = true;
  };
})();
