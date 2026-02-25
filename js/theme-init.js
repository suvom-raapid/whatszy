/**
 * WhatsFormat - Theme Initialization (Blocking)
 * Loaded in <head> to prevent flash of wrong theme (FOUC).
 */
(function() {
  'use strict';

  var THEME_KEY = 'whatsformat-theme';
  var LIGHT = 'light';
  var DARK = 'dark';

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
  }

  function getTheme() {
    try { return localStorage.getItem(THEME_KEY) || ''; } catch(e) { return ''; }
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  var saved = getTheme();
  var current = saved || getSystemTheme();
  apply(current);

  window.__whatsformatTheme = {
    get: function() {
      return document.documentElement.getAttribute('data-theme') || DARK;
    },
    toggle: function() {
      var next = this.get() === DARK ? LIGHT : DARK;
      apply(next);
      try { localStorage.setItem(THEME_KEY, next); } catch(e) {}
      document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
      return next;
    }
  };

  // Listen for OS preference changes (only when no manual preference)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
      try {
        if (!localStorage.getItem(THEME_KEY)) {
          var t = e.matches ? LIGHT : DARK;
          apply(t);
          document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: t } }));
        }
      } catch(ex) {}
    });
  }
})();
