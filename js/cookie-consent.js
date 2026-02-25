(function () {
  var DISMISS_KEY = 'whatsformat-cookie-notice';

  function showNotice() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.classList.add('visible');
  }

  function dismissNotice() {
    localStorage.setItem(DISMISS_KEY, '1');
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.classList.remove('visible');
  }

  // Show notice if not previously dismissed
  if (!localStorage.getItem(DISMISS_KEY)) {
    document.addEventListener('DOMContentLoaded', showNotice);
  }

  // Bind dismiss button
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('cookie-dismiss');
    if (btn) btn.addEventListener('click', dismissNotice);
  });
})();
