### 🌟 MUSICBOX.LIFE — PROJECT VISION (v8.0)

**Document Purpose:** Strategic blueprint for MusicBox.life. We have evolved beyond a "Downloader." We are a **High-End, Privacy-First Media Operating System**.

---

### 🚨 CRITICAL AI DIRECTIVE: THE "LIQUID CHROME" STANDARD
**To any AI Architect working on this project:**

**⚠️ ABSOLUTE LAW:** Your design output must be **Classic, Industry-Level, and Sexier than the standard.**
We do not build "Websites." We build **High-Fidelity Interfaces**.

**The Design DNA ("No Life / Liquid Chrome"):**
*   **The Vibe:** Think **Teenage Engineering, Braun Electronics, Liquid Metal, Y2K Futurism.** It is sterile, expensive, and slightly sarcastic.
*   **The "Sexier" Rule:**
    *   **NO GENERIC UI:** If it looks like Bootstrap, Material UI, or a standard Tailwind component library, **delete it immediately.**
    *   **Typography:** "Pure Inter." Headlines are **Massive**, **Bold** (`font-black`), and have tight tracking (`tracking-tighter`). Captions are `font-mono`, uppercase, and wide (`tracking-widest`).
    *   **Surfaces:** **Chrome, Silver, and White.** No dark mode by default. Use `bg-chrome-50` for backgrounds and `bg-chrome-900` (Deep Steel) for text.
    *   **Physics:**
        *   **Liquid Blobs:** Background elements must morph and float (SVG Filters).
        *   **Momentum Scroll:** The site *must* use **Lenis** for that "heavy/smooth" feel.
    *   **Zero Clutter:** White space is luxury. Do not fill space just to fill it.

**The "System" Protocol:**
*   **Terminology:** Do not use "Sign Up." Use **"Mint Identity," "Initialize," "Access Protocol."**
*   **Motion:** Everything is kinetic. Inputs "lift" on focus. Buttons have liquid shine effects.

---

### 1. Core Identity & User Flow

**Role:** The "Black Box" Media OS.
**Domain:** https://musicbox.life
**Philosophy:** "No Life. Just Data."

**The New SaaS Architecture:**
1.  **Public Layer (Landing):** High-end industrial marketing. The goal is to sell the "Data Liberation" philosophy.
2.  **The Gate (Auth):** A "Chrome Access Terminal" (Login/Register).
3.  **Protected Layer (The Library):** Once authenticated, the user enters the "App." This is where the **Bento Grid** lives.
4.  **The Canvas (Extraction):** The workspace where media is processed.
    *   *Privacy Feature:* Refreshing the page wipes the canvas. We do not store files in cookies or disk. We stream RAM-to-RAM.

---

### 2. Technology Stack (v8.0)

**Frontend (The Interface):**
*   **Framework:** React 18.
*   **Routing:** React Router v6.
*   **Styling:** Tailwind CSS + `framer-motion`.
*   **Physics:** **Lenis** (Smooth Scroll) + SVG Filters (Liquid Effects).
*   **State:** LocalStorage (for JWT) + React State (Ephemeral).

**Backend (The Muscle):**
*   **Runtime:** Node.js + Express.
*   **Security:** `gatekeeper.js` middleware (JWT Verification + IP Rate Limiting).
*   **The Engine:** **`yt-dlp-wrap`** (Binary).

**Database (The Memory):**
*   **MongoDB Atlas:**
    *   `Users`: Identity & Auth.
    *   `DownloadLog`: Metadata history (Title, URL, UserID). **No File Storage.**

---

### 3. Architecture & Folder Structure

```text
/var/www/musicbox.life/
├── backend/               # THE UNIVERSAL ENGINE
│   ├── yt-dlp             # Binary
│   ├── server.js          # [CORE] Auth + Extraction Logic
│   ├── middleware/        # [SECURE] Gatekeeper (Rate Limits)
│   ├── models/            # [DB] User & DownloadLog Schemas
│   └── .env               # Secrets (JWT_SECRET, MONGO_URI)
├── frontend/              # THE INTERFACE (Liquid Chrome Theme)
│   ├── src/
│   │   ├── components/
│   │   │   ├── BentoGrid.js  # [PROTECTED] The Tool Library
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Landing.js    # [PUBLIC] "No Life" Theme (V2.6 Pure Inter)
│   │   │   ├── Library.js    # [PROTECTED] The App Home
│   │   │   ├── AuthPages.js  # [PUBLIC] "Bold Minimalist" (V3.0)
│   │   │   └── ToolPage.js   # [PROTECTED] The Extraction Canvas
│   │   ├── App.js            # Router (Guard Logic)
│   │   ├── index.css         # Custom Scrollbars & SVG Filters
│   │   └── ...
│   ├── tailwind.config.js    # [CONFIG] Chrome Colors & Liquid Animations
│   └── package.json       
└── README.md
```

---

### 4. Feature Roadmap

**Phase 1-8: Foundation & Logic (Completed)**
*   [x] **The Logic:** `yt-dlp` Universal Extraction.
*   [x] **The Security:** JWT Auth + IP Rate Limiting.

**Phase 9: The "Liquid Butter" Overhaul (CURRENT COMPLETED LOCALLY)**
*   [x] **Design:** "No Life" Theme (Chrome/Liquid/Inter).
*   [x] **Physics:** Lenis Scroll + Morphing Blobs.
*   [x] **Typography:** Pure Inter Bold.

**Phase 10: Deployment & Intelligence (NEXT PRIORITY)**
*   **Objective:** Push the visual overhaul to production and enable AI.
*   **Tasks:**
    1.  **Deploy:** Push Phase 9 code to `musicbox.life` (Clean Build).
    2.  **AI Engine:** Create `/tools/ai`. Integrate **OpenAI Whisper** to transcribe downloaded audio into text/summaries.
    3.  **Smart Caching:** Cache AI results to save API costs.

---

### 5. Deployment Strategy

**Method:** "Clean Slate" Protocol.
*Why:* We introduced new dependencies (`lenis`, `lucide-react`) and radically changed the CSS structure.

**Workflow:**
1.  **Local:** `git push origin main`
2.  **Server:** `ssh root@musicbox.life`
3.  **Server:** `git pull` -> `npm install` (Backend & Frontend) -> `rm -rf frontend/build` -> `npm run build` (Frontend).
4.  **Backend:** Ensure `.env` is updated. Restart PM2.

--- END OF FILE ---