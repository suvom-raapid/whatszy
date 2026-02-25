/**
 * WhatsFormat - Theme Module (ES Module wrapper)
 * Delegates to window.__whatsformatTheme set by theme-init.js
 */

export const THEMES = { LIGHT: 'light', DARK: 'dark' };

export function getCurrentTheme() {
  return window.__whatsformatTheme ? window.__whatsformatTheme.get() : THEMES.DARK;
}

export function toggleTheme() {
  if (window.__whatsformatTheme) {
    return window.__whatsformatTheme.toggle();
  }
  return getCurrentTheme();
}

export function initTheme() {
  // Theme is already initialized by theme-init.js (blocking script in <head>).
  // This function exists for API compatibility with the modular app.js.
}
