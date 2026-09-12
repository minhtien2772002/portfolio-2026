(function initializeGoogleAnalytics(window, document) {
  "use strict";

  const measurementId = "G-DJVR3BEQ0F";
  let lastPagePath = "";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });

  function getPageViewData() {
    const currentUrl = new URL(window.location.href);
    const pagePath = currentUrl.pathname || "/";

    return {
      pagePath,
      pageLocation: `${currentUrl.origin}${pagePath}`,
    };
  }

  function trackPageView() {
    const { pagePath, pageLocation } = getPageViewData();
    if (pagePath === lastPagePath) return false;

    lastPagePath = pagePath;
    window.gtag("event", "page_view", {
      page_location: pageLocation,
      page_path: pagePath,
      page_title: document.title,
    });
    return true;
  }

  window.portfolioAnalytics = Object.freeze({ trackPageView });
})(window, document);
