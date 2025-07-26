# EasyInput - AI Text Improvement Browser Extension

A powerful browser extension that lets you right-click any editable field and improve its text using AI. Built with React, TypeScript, and Vite for Manifest V3.

## Features

- 🎯 **Right-click Integration**: Context menu on all editable fields
- 🤖 **AI-Powered**: Improve text using OpenAI's GPT-3.5-turbo
- ⚡ **React UI**: Beautiful, responsive overlay interface
- 🔒 **Secure Storage**: OpenAI API keys stored safely in browser storage
- 🚀 **Fast Building**: Vite-powered development and building
- 📱 **Modern Design**: Styled with styled-components

## Project Structure

```
Extension/
├── src/
│   ├── background.ts           # Background script (context menu)
│   ├── manifest.json          # Extension manifest (MV3)
│   ├── content/
│   │   └── index.tsx          # Content script with React overlay
│   ├── popup/
│   │   ├── index.html         # Popup HTML
│   │   └── popup.tsx          # React popup for API key management
│   ├── utils/
│   │   └── api.ts             # API utilities and storage functions
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── package.json               # Dependencies and scripts
├── vite.config.ts            # Vite configuration with @crxjs/vite-plugin
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd Extension
   npm install
   ```

2. **Build the extension:**
   ```bash
   npm run build
   ```

3. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

### Development

For development with hot reload:
```bash
npm run dev
```

## OpenAI API Integration

The extension uses OpenAI's GPT-3.5-turbo model for text improvement. No backend required!

### API Configuration

The extension makes direct calls to OpenAI's API:

```typescript
POST https://api.openai.com/v1/chat/completions
Content-Type: application/json
Authorization: Bearer YOUR_OPENAI_API_KEY

{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant that improves text..."
    },
    {
      "role": "user", 
      "content": "Please improve this text: [user text]"
    }
  ],
  "max_tokens": 1000,
  "temperature": 0.7
}
```

## Usage

1. **Set up your OpenAI API key:**
   - Click the extension icon in Chrome
   - Enter your OpenAI API key in the popup
   - Click "Save OpenAI API Key"

2. **Improve text:**
   - Right-click on any text field, textarea, or contenteditable element
   - Select "Polish with LLM" from the context menu
   - Edit the text in the overlay if needed
   - Click "Improve Text" to get AI suggestions
   - Click "Replace Original" to apply the changes

## Configuration

### OpenAI API Settings

The extension uses OpenAI's GPT-3.5-turbo model by default. To modify the AI behavior, edit the `improveText` function in `src/utils/api.ts`:

```typescript
// Change model, temperature, or system prompt
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  // ... configuration
});
```

### Supported Elements

The extension works with:
- `<input>` fields (text, email, search, url, tel, password)
- `<textarea>` elements
- Any element with `contenteditable="true"`

## Build Scripts

- `npm run dev` - Development mode with hot reload
- `npm run build` - Production build
- `npm run preview` - Preview the built extension

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **@crxjs/vite-plugin** - Chrome extension support
- **styled-components** - CSS-in-JS styling
- **Chrome Extension APIs** - Manifest V3

## Permissions

The extension requires these permissions:
- `contextMenus` - Create right-click menu items
- `storage` - Store API keys securely
- `scripting` - Inject content scripts
- `activeTab` - Access current tab
- `<all_urls>` - Work on all websites

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 