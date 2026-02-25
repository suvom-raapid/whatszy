(function () {
  var CONSENT_KEY = 'whatsformat-consent';
  var GA_ID = 'G-8YTQW8NG2R';
  var ADSENSE_ID = 'ca-pub-1485600963253811';

  function hasConsented() {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  }

  function loadGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function loadAdSense() {
    var s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_ID;
    document.head.appendChild(s);
  }

  function showBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.classList.add('visible');
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.classList.remove('visible');
  }

  function onAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    hideBanner();
    loadGA();
    loadAdSense();
  }

  function onDecline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    hideBanner();
  }

  // Expose for external checks
  window.__cookieConsent = {
    accepted: function () { return hasConsented(); }
  };

  // Init on DOM ready
  if (hasConsented()) {
    loadGA();
    loadAdSense();
  } else if (localStorage.getItem(CONSENT_KEY) !== 'declined') {
    document.addEventListener('DOMContentLoaded', showBanner);
  }

  // Bind buttons after DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');
    if (acceptBtn) acceptBtn.addEventListener('click', onAccept);
    if (declineBtn) declineBtn.addEventListener('click', onDecline);
  });
})();
