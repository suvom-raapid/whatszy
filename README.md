# WhatsFormat

> 🎨 A modern, modular WhatsApp text toolkit — Format your messages with style!

![WhatsFormat Banner](https://img.shields.io/badge/WhatsFormat-WhatsApp%20Toolkit-25D366?style=for-the-badge&logo=whatsapp)

## ✨ Features

- **Text Formatter** — Apply WhatsApp formatting (bold, italic, strikethrough, monospace) with live preview
- **Blank Message Generator** — Send invisible/empty messages
- **Fancy Text Generator** — Convert text to stylish Unicode fonts (15+ styles)
- **Text Repeater** — Repeat text or emojis multiple times
- **Reverse & Flip** — Mirror or flip text upside down
- **Emoji Picker** — Browse 200+ emojis organized by categories
- **Character Counter** — Count characters, words, lines, and emojis

## 🚀 Demo

Visit the live demo: [https://whatsformat.com](https://whatsformat.com)

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Modern styling with CSS variables
- **Vanilla JavaScript** — Modular ES6+ modules
- **GitHub Pages** — Free static hosting

## 📁 Project Structure

```
whatszy/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and animations
├── js/
│   ├── app.js          # Main application entry point
│   ├── utils.js        # Utility functions (toast, clipboard)
│   ├── formatters.js   # Text formatting logic
│   └── emoji.js        # Emoji picker functionality
├── README.md
└── LICENSE
```

## 🎯 Quick Start

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/suvom-raapid/whatszy.git
   cd whatszy
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html
   # or
   python3 -m http.server 8000
   ```

### Deploy to GitHub Pages

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save and wait for deployment

3. Your site will be live at: `https://whatsformat.com`

## 🎨 Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
  --bg: #0a0f0d;
  --green: #25d366;
  --teal: #00a884;
  /* ... more colors */
}
```

### Features

All features are modular. To add/remove functionality:

1. Edit the relevant module in `js/` folder
2. Import/export functions in `js/app.js`
3. Update HTML in `index.html`

## 🧩 Modular Architecture

The project is built with modularity in mind:

- **utils.js** — Shared utilities (toast, clipboard, HTML escape)
- **formatters.js** — Text manipulation functions
- **emoji.js** — Emoji data and picker logic
- **app.js** — Initializes modules and exposes global functions

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Inspiration

Built for WhatsApp users who want to add style to their messages. Perfect for:

- Creating eye-catching messages
- Generating unique text styles
- Quick emoji access
- Text manipulation tasks

## 🙏 Acknowledgments

- WhatsApp for inspiration
- Google Fonts (DM Sans & Space Mono)
- The open-source community

## 📧 Contact

Have questions or suggestions? Feel free to open an issue!

---

<p align="center">Made with ☕ for WhatsApp users everywhere</p>
<p align="center">⭐ Star this repo if you find it useful!</p>
