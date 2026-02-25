/**
 * WhatsFormat - Bundled Application (No ES6 Modules)
 * All functionality in one file for maximum compatibility
 */

(function() {
  'use strict';

  // =============================
  // UTILITIES
  // =============================

  function showToast(msg = '✓ Copied to clipboard!') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function copyText(elId) {
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

  function clearField(id) {
    document.getElementById(id).value = '';
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // =============================
  // TEXT FORMATTER
  // =============================

  function wrapText(wrapper) {
    const ta = document.getElementById('formatInput');
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value;

    if (start === end) {
      ta.value = wrapper + text + wrapper;
    } else {
      const selected = text.substring(start, end);
      ta.value = text.substring(0, start) + wrapper + selected + wrapper + text.substring(end);
    }

    ta.focus();
    updateFormatPreview();
  }

  function insertText(prefix) {
    const ta = document.getElementById('formatInput');
    const start = ta.selectionStart;
    const text = ta.value;

    if (ta.selectionStart !== ta.selectionEnd) {
      const selected = text.substring(start, ta.selectionEnd);
      const lines = selected.split('\n').map(l => prefix + l).join('\n');
      ta.value = text.substring(0, start) + lines + text.substring(ta.selectionEnd);
    } else {
      ta.value = text.substring(0, start) + prefix + text.substring(start);
    }

    ta.focus();
    updateFormatPreview();
  }

  function insertBulletList() {
    const ta = document.getElementById('formatInput');
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value;

    if (start !== end) {
      const selected = text.substring(start, end);
      const lines = selected.split('\n').map(l => '• ' + l).join('\n');
      ta.value = text.substring(0, start) + lines + text.substring(end);
    } else {
      ta.value = text.substring(0, start) + '• ' + text.substring(start);
    }

    ta.focus();
    updateFormatPreview();
  }

  function insertNumberedList() {
    const ta = document.getElementById('formatInput');
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value;

    if (start !== end) {
      const selected = text.substring(start, end);
      const lines = selected.split('\n').map((l, i) => (i + 1) + '. ' + l).join('\n');
      ta.value = text.substring(0, start) + lines + text.substring(end);
    } else {
      ta.value = text.substring(0, start) + '1. ' + text.substring(start);
    }

    ta.focus();
    updateFormatPreview();
  }

  function updateFormatPreview() {
    const raw = document.getElementById('formatInput').value;
    document.getElementById('formatOutput').textContent = raw;

    // Simple WhatsApp-style preview rendering
    let html = escapeHtml(raw);
    html = html.replace(/```([\s\S]*?)```/g, '<code style="font-family:Space Mono,monospace; background:rgba(0,0,0,0.3); padding:2px 4px; border-radius:3px;">$1</code>');
    html = html.replace(/\*(.+?)\*/g, '<b>$1</b>');
    html = html.replace(/_(.+?)_/g, '<i>$1</i>');
    html = html.replace(/~(.+?)~/g, '<s>$1</s>');
    html = html.replace(/\n/g, '<br>');

    const preview = document.getElementById('formatPreview');
    if (raw.trim()) {
      preview.innerHTML = html;
      preview.style.color = '';
      preview.style.fontStyle = '';
    } else {
      preview.innerHTML = 'Your message preview...';
      preview.style.color = 'rgba(255,255,255,0.45)';
      preview.style.fontStyle = 'italic';
    }
  }

  // =============================
  // BLANK MESSAGE
  // =============================

  function generateBlank() {
    const count = Math.min(parseInt(document.getElementById('blankCount').value) || 1, 100);
    const blank = Array(count).fill('\u200E').join('\n');
    document.getElementById('blankOutput').textContent = blank;
    document.getElementById('blankCharCount').textContent = `Generated ${count} invisible line(s) — ready to copy`;
  }

  // =============================
  // FANCY TEXT
  // =============================

  const fancyMaps = {
    'Bold': { offset: 0x1D400 },
    'Italic': { offset: 0x1D434 },
    'Bold Italic': { offset: 0x1D468 },
    'Script': { offset: 0x1D49C },
    'Bold Script': { offset: 0x1D4D0 },
    'Fraktur': { offset: 0x1D504 },
    'Double-Struck': { offset: 0x1D538 },
    'Sans-Serif': { offset: 0x1D5A0 },
    'Sans Bold': { offset: 0x1D5D4 },
    'Sans Italic': { offset: 0x1D608 },
    'Monospace': { offset: 0x1D670 },
  };

  const specialMaps = {
    'Circled': (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D2 + code - 97);
      if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + code - 49);
      if (code === 48) return '⓪';
      return c;
    },
    'Squared': (c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F130 + code - 97);
      return c;
    },
    'Fullwidth': (c) => {
      const code = c.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCodePoint(0xFF01 + code - 33);
      return c;
    },
    'Upside Down': (c) => {
      const flipMap = 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz';
      const flipMapUpper = '∀qƆpƎℲ⅁HIſʞ˥WNOԀQɹS⊥∩ΛMX⅄Z';
      const code = c.charCodeAt(0);
      if (code >= 97 && code <= 122) return flipMap[code - 97];
      if (code >= 65 && code <= 90) return flipMapUpper[code - 65];
      if (c === '!') return '¡';
      if (c === '?') return '¿';
      if (c === '.') return '˙';
      if (c === ',') return '\'';
      return c;
    }
  };

  function convertFancy(text, style) {
    if (specialMaps[style]) {
      const result = [...text].map(c => specialMaps[style](c));
      if (style === 'Upside Down') result.reverse();
      return result.join('');
    }

    const map = fancyMaps[style];
    if (!map) return text;

    return [...text].map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(map.offset + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(map.offset + 26 + code - 97);
      return c;
    }).join('');
  }

  function generateFancyText() {
    const input = document.getElementById('fancyInput');
    const grid = document.getElementById('fancyGrid');

    if (!input || !grid) return;

    const text = input.value;

    if (!text.trim()) {
      grid.innerHTML = '<div style="color:var(--text-dark); font-style:italic; grid-column:1/-1; padding:1rem; text-align:center;">Type something above to see styles</div>';
      return;
    }

    const allStyles = [...Object.keys(fancyMaps), ...Object.keys(specialMaps)];
    grid.innerHTML = allStyles.map(style => {
      const converted = convertFancy(text, style);
      const escaped = converted.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      return `
        <div class="fancy-option" onclick="copyFancyText('${escaped}')">
          <div>
            <div class="fancy-label">${style}</div>
            <div class="preview">${escapeHtml(converted)}</div>
          </div>
          <div class="copy-icon">COPY</div>
        </div>`;
    }).join('');
  }

  function copyFancyText(text) {
    // Unescape the text
    const unescaped = text.replace(/\\'/g, "'");

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(unescaped)
        .then(() => showToast('✓ Copied to clipboard!'))
        .catch(err => {
          console.error('Clipboard error:', err);
          fallbackCopyText(unescaped);
        });
    } else {
      fallbackCopyText(unescaped);
    }
  }

  // =============================
  // TEXT REPEATER
  // =============================

  function repeatText() {
    const text = document.getElementById('repeatInput').value;
    const count = Math.min(parseInt(document.getElementById('repeatCount').value) || 1, 5000);
    const newline = document.getElementById('repeatNewline').checked;

    if (!text) {
      showToast('Enter some text first!');
      return;
    }

    const separator = newline ? '\n' : '';
    const result = Array(count).fill(text).join(separator);
    document.getElementById('repeatOutput').textContent = result;
  }

  // =============================
  // REVERSE & FLIP
  // =============================

  function updateReverse() {
    const text = document.getElementById('reverseInput').value;
    document.getElementById('reversedOutput').textContent = [...text].reverse().join('');
    document.getElementById('flippedOutput').textContent = convertFancy(text, 'Upside Down');
  }

  // =============================
  // CHARACTER COUNTER
  // =============================

  function updateCounter() {
    const text = document.getElementById('counterInput').value;
    document.getElementById('statChars').textContent = text.length.toLocaleString();
    document.getElementById('statWords').textContent = text.trim() ? text.trim().split(/\s+/).length.toLocaleString() : '0';
    document.getElementById('statLines').textContent = text ? text.split('\n').length.toLocaleString() : '0';

    const emojiRegex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
    const emojis = text.match(emojiRegex);
    document.getElementById('statEmojis').textContent = emojis ? emojis.length.toLocaleString() : '0';
  }

  // =============================
  // EMOJI PICKER
  // =============================

  const emojiData = {
    'Smileys': ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😊','😇','🥰','😍','🤩','😘','😗','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐'],
    'Hands': ['👋','🤚','🖐','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','💪','🦾'],
    'Hearts': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','♥️','😻','💑','💏'],
    'Animals': ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🦅','🦆','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪲'],
    'Food': ['🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🫑','🥦','🧅','🌽','🥕','🫒','🧄','🥔','🍞','🥐','🥖','🥯','🧇','🍕','🍔','🍟','🌭','🌮','🌯','🍿','🍩','🍪','🎂','🍰','🧁','🍫','🍬','🍭'],
    'Travel': ['🚗','🚕','🚙','🚌','🚎','🏎','🚓','🚑','🚒','🚐','🛻','🚚','✈️','🚀','🛸','🚁','⛵','🚢','🏠','🏰','🗼','🗽','⛪','🕌','🏛','⛩','🌍','🌎','🌏'],
    'Symbols': ['✅','❌','❓','❗','💯','🔥','⭐','🌟','💫','✨','🎉','🎊','🏆','🥇','🎯','💡','📌','📍','🔗','💬','💭','🗯','🔔','🔕','📢','📣','⚡','♻️','🔰','💠','Ⓜ️','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤'],
    'Flags': ['🏳️','🏴','🏁','🚩','🏳️‍🌈','🏳️‍⚧️','🇺🇸','🇬🇧','🇮🇳','🇫🇷','🇩🇪','🇮🇹','🇪🇸','🇧🇷','🇯🇵','🇰🇷','🇨🇳','🇦🇺','🇨🇦','🇲🇽','🇷🇺','🇸🇦','🇦🇪','🇿🇦','🇳🇬','🇹🇷','🇦🇷','🇵🇰','🇧🇩','🇮🇩']
  };

  let currentEmojiCategory = 'Smileys';

  function renderEmojiCategories() {
    const container = document.getElementById('emojiCategories');
    if (!container) return;

    container.innerHTML = Object.keys(emojiData).map(cat =>
      `<button class="emoji-cat-btn ${cat === currentEmojiCategory ? 'active' : ''}" onclick="switchEmojiCategory('${cat}')">${cat}</button>`
    ).join('');
  }

  function switchEmojiCategory(cat) {
    currentEmojiCategory = cat;
    renderEmojiCategories();
    renderEmojiGrid();
  }

  function renderEmojiGrid() {
    const grid = document.getElementById('emojiGrid');
    if (!grid) return;

    grid.innerHTML = emojiData[currentEmojiCategory].map(emoji =>
      `<button class="emoji-btn" onclick="addEmoji('${emoji}')">${emoji}</button>`
    ).join('');
  }

  function addEmoji(emoji) {
    const output = document.getElementById('emojiOutput');
    if (output) {
      output.textContent += emoji;
    }
  }

  function initEmojiPicker() {
    renderEmojiCategories();
    renderEmojiGrid();
  }

  // =============================
  // TAB SWITCHING
  // =============================

  function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabNav = document.querySelector('.tab-nav');
    const scrollHint = document.getElementById('tabScrollHint');

    // Check if tabs are scrollable
    function checkScrollable() {
      if (tabNav) {
        const isScrollable = tabNav.scrollWidth > tabNav.clientWidth;

        if (isScrollable) {
          tabNav.classList.add('scrollable');
          if (scrollHint) scrollHint.classList.add('visible');
        } else {
          tabNav.classList.remove('scrollable');
          if (scrollHint) scrollHint.classList.remove('visible');
        }
      }
    }

    // Initial check
    checkScrollable();

    // Check on window resize
    window.addEventListener('resize', checkScrollable);

    // Hide scroll hint on first interaction
    if (tabNav && scrollHint) {
      tabNav.addEventListener('scroll', () => {
        scrollHint.style.display = 'none';
      }, { once: true });
    }

    // Tab switching logic
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = document.getElementById(`tab-${targetTab}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }

        // Scroll active tab into view
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        // Reinitialize specific content if needed
        if (targetTab === 'fancy') {
          generateFancyText();
        }
      });
    });
  }

  // =============================
  // EXPOSE GLOBAL FUNCTIONS
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
  window.copyFancyText = copyFancyText;
  window.repeatText = repeatText;
  window.updateReverse = updateReverse;
  window.updateCounter = updateCounter;
  window.switchEmojiCategory = switchEmojiCategory;
  window.addEmoji = addEmoji;

  // =============================
  // INITIALIZE
  // =============================

  document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing WhatsFormat...');

    try {
      initTabs();
      console.log('✓ Tabs initialized');

      generateFancyText();
      console.log('✓ Fancy text initialized');

      initEmojiPicker();
      console.log('✓ Emoji picker initialized');

      console.log('✓ WhatsFormat loaded successfully!');
    } catch (error) {
      console.error('❌ Error initializing WhatsFormat:', error);
      showToast('Error loading app. Please refresh the page.');
    }
  });

})();
