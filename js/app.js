/**
 * WhatsFormat - Main Application
 * Initializes all modules and sets up global functions
 */

import { showToast, copyText, clearField } from './utils.js';
import {
  wrapText,
  insertText,
  insertBulletList,
  insertNumberedList,
  updateFormatPreview,
  generateBlank,
  generateFancyText,
  repeatText,
  updateReverse,
  updateCounter
} from './formatters.js';
import {
  initEmojiPicker,
  switchEmojiCategory,
  addEmoji
} from './emoji.js';

// =============================
// TAB SWITCHING FUNCTIONALITY
// =============================
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      // Remove active class from all buttons and panes
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      // Add active class to clicked button and corresponding pane
      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      // Reinitialize specific tab content if needed
      if (targetTab === 'fancy') {
        generateFancyText();
      } else if (targetTab === 'emoji') {
        // Emoji picker already initialized
      }
    });
  });
}

// =============================
// MAKE FUNCTIONS GLOBAL
// =============================
window.showToast = showToast;
window.copyText = copyText;
window.clearField = clearField;
window.wrapText = wrapText;
window.insertText = insertText;
window.insertBulletList = insertBulletList;
window.insertNumberedList = insertNumberedList;
window.updateFormatPreview = updateFormatPreview;
window.generateBlank = generateBlank;
window.generateFancyText = generateFancyText;
window.repeatText = repeatText;
window.updateReverse = updateReverse;
window.updateCounter = updateCounter;
window.switchEmojiCategory = switchEmojiCategory;
window.addEmoji = addEmoji;

// =============================
// INITIALIZE APPLICATION
// =============================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing WhatsFormat...');

  try {
    // Initialize tab switching
    initTabs();
    console.log('✓ Tabs initialized');

    // Initialize fancy text grid with placeholder
    generateFancyText();
    console.log('✓ Fancy text initialized');

    // Initialize emoji picker
    initEmojiPicker();
    console.log('✓ Emoji picker initialized');

    console.log('✓ WhatsFormat loaded successfully!');
  } catch (error) {
    console.error('❌ Error initializing WhatsFormat:', error);
    showToast('Error loading app. Please refresh the page.');
  }
});

// =============================
// ERROR HANDLING
// =============================
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
