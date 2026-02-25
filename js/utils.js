/**
 * WhatsFormat - Utility Functions
 * Common utilities for toast notifications, clipboard operations, etc.
 */

// Toast notification system
export function showToast(msg = '✓ Copied to clipboard!') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

// Copy text from element to clipboard
export function copyText(elId) {
  const el = document.getElementById(elId);
  const text = el.textContent || el.innerText;

  if (!text.trim() && elId !== 'blankOutput') {
    showToast('Nothing to copy!');
    return;
  }

  // Use modern clipboard API with fallback
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('✓ Copied to clipboard!'))
      .catch(err => {
        console.error('Clipboard error:', err);
        fallbackCopyText(text);
      });
  } else {
    fallbackCopyText(text);
  }
}

// Fallback copy method for older browsers
function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    showToast('✓ Copied to clipboard!');
  } catch (err) {
    console.error('Fallback copy failed:', err);
    showToast('❌ Copy failed. Please copy manually.');
  }

  document.body.removeChild(textarea);
}

// Clear input field
export function clearField(id) {
  document.getElementById(id).value = '';
}

// HTML escape utility
export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
