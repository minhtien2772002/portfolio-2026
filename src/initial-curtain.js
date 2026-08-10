(() => {
  try {
    if (window.sessionStorage.getItem("portfolio.hasPlayedInitialCurtain") === "1") {
      document.documentElement.classList.add("has-played-initial-curtain");
    }
  } catch {}
})();
