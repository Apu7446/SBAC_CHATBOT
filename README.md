# SBAC Bank PLC — Web Portal & AI Chatbot 🏦🤖 (Next.js Edition)

A modern, enterprise-ready banking web portal for **South Bangla Agriculture and Commerce (SBAC) Bank PLC** built with **Next.js 16 (App Router)**, **React 19**, and a **Custom Vanilla CSS Design System**. Features an intelligent bilingual AI chatbot assistant for real-time customer support.

---

## 🌟 Key Features

- **⚡ Next.js App Router Architecture**: Fast server and client component rendering, zero configuration overhead.
- **🛡️ Secure Server API Route**: Built-in backend proxy endpoint at `/api/chat` to securely handle queries and environment-based LLM API keys.
- **🤖 Smart Bilingual AI Chatbot**: Supports queries in both Bengali (বাংলা), English, and Banglish with instant natural language understanding.
- **🔄 Hybrid AI Engine**:
  - **Zero-Config Offline Mode**: Verified instant answers directly from [`lib/knowledge.js`](file:///c:/Users/SBACBL/Documents/PROJECT2/SBAC%20WEBSITE%20CHAT_BOT/lib/knowledge.js).
  - **Live Cloud LLM Mode**: Google Gemini, OpenRouter (Gemma 2, Llama 3, DeepSeek R1), OpenAI (`gpt-4o-mini`), and custom local Ollama endpoints.
  - **Automatic Fallback**: Gracefully degrades to verified offline knowledge if an external API key quota expires.
- **🎙️ Web Speech & Web Audio APIs**:
  - Voice-to-Text (STT) mic dictation.
  - Text-to-Speech (TTS) reading answers aloud.
  - Zero-latency synthesized sound chimes (`AudioContext` oscillators).
- **💳 Accounts, Loans & Taqwa Islamic Banking**: Instant guidance on Savings accounts, Fixed Deposits (FDR), DPS schemes, and financing.
- **📱 BanglaPay Showcase**: Digital banking app highlights with direct Google Play and App Store links.
- **📍 Branch & ATM Locator**: Quick lookup for branches and 24/7 hotline 16327.

---

## 📁 Project Structure

```text
SBAC WEBSITE CHAT_BOT/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js       # Next.js Server API Route (POST /api/chat)
│   ├── layout.js              # Root Layout (Google Fonts, FontAwesome, Styles)
│   └── page.js                # Main Single Page Application entry
├── components/
│   ├── Navbar.jsx             # Top utility bar & responsive navigation
│   ├── Hero.jsx               # Hero banner with live counters & CTA buttons
│   ├── QuickPortals.jsx       # 6 quick-access banking digital services
│   ├── Products.jsx           # Accounts, Islamic Banking, Loans & Cards
│   ├── BanglaPaySection.jsx   # BanglaPay mobile app showcase & phone mockup
│   ├── Footer.jsx             # Corporate footer with branch details
│   └── Chatbot.jsx            # State-synchronized floating widget & fullscreen modal
├── lib/
│   ├── chat-engine.js         # NLU language detection, matching, and LLM fetchers
│   └── knowledge.js           # Structured banking product data
├── public/                    # Static brand logos and bank assets
│   ├── sbac-logo.png
│   ├── banglapay-logo.png
│   ├── call-center.png
│   └── sbac_bank_info.txt
├── style.css                  # Custom Vanilla CSS Design System
├── package.json               # Next.js dependencies & scripts
├── next.config.mjs            # Next.js configuration
└── README.md                  # Project documentation
```

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: Pure Vanilla CSS3 (Custom Design System with Glassmorphism)
- **AI & LLM Integration**: Multi-provider (Local Knowledge Base, Google Gemini, OpenRouter, OpenAI, Custom API)
- **Browser APIs**: Web Speech API (`SpeechRecognition`, `SpeechSynthesis`), Web Audio API (`AudioContext`), Web Storage API (`localStorage`)
- **Libraries**: `marked` (Markdown to rich HTML), FontAwesome 6.5, Google Fonts (*Outfit*, *Plus Jakarta Sans*, *Hind Siliguri*)

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📄 License & Attribution

Developed for **SBAC Bank PLC** banking services and demonstration. All rights reserved by South Bangla Agriculture and Commerce Bank PLC.
