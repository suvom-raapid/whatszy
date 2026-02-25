/**
 * WhatsFormat - Emoji Picker
 * Handles emoji selection and display
 */

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

export function renderEmojiCategories() {
  const container = document.getElementById('emojiCategories');
  container.innerHTML = Object.keys(emojiData).map(cat =>
    `<button class="emoji-cat-btn ${cat === currentEmojiCategory ? 'active' : ''}" onclick="window.switchEmojiCategory('${cat}')">${cat}</button>`
  ).join('');
}

export function switchEmojiCategory(cat) {
  currentEmojiCategory = cat;
  renderEmojiCategories();
  renderEmojiGrid();
}

export function renderEmojiGrid() {
  const grid = document.getElementById('emojiGrid');
  grid.innerHTML = emojiData[currentEmojiCategory].map(emoji =>
    `<button class="emoji-btn" onclick="window.addEmoji('${emoji}')">${emoji}</button>`
  ).join('');
}

export function addEmoji(emoji) {
  document.getElementById('emojiOutput').textContent += emoji;
}

// Initialize emoji picker
export function initEmojiPicker() {
  renderEmojiCategories();
  renderEmojiGrid();
}
