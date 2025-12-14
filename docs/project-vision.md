--- START OF FILE project-vision.md ---

⭐ MUSICBOX.LIFE — PROJECT VISION ⭐

Document Purpose: This is the master strategic document for MusicBox.life. It is a standalone, isolated "Media Factory" designed for high-performance YouTube conversion. It operates independently but is controlled remotely by the Ankyy.com Admin Panel.

1. Core Vision & Guiding Principles

**Role:** The Engine Room.
**Domain:** https://musicbox.life
**Primary Goal:** Speed, Reliability, and Utility. To be the fastest converter in India without risking the main personal brand.

**Safety Strategy (Risk Isolation):**
*   This domain accepts the "Risk" of media conversion.
*   It operates on a separate server (Droplet) with a separate IP.
*   If this domain is blocked or penalized, Ankyy.com remains unaffected.

**Design Philosophy:**
*   **Aesthetic:** "Midnight Pro." Dark mode, neon accents, dashboard-style interface.
*   **User Experience:** One-click focus. No distractions, no blogs, just a search bar and a download button.

2. Technology Stack

**Frontend:**
*   **Framework:** React 18 (CRA)
*   **Styling:** Tailwind CSS v3.0
*   **Networking:** Socket.io Client (for progress bars).

**Backend (The Factory):**
*   **Runtime:** Node.js + Express.
*   **Engine:** yt-dlp (Python-based downloader) + FFmpeg (Media conversion).
*   **Worker System:** Custom Queue Manager (FIFO) to prevent server overload.

**Database:**
*   **MongoDB:** Standalone instance. Stores file history and conversion logs specific to this tool.

**Infrastructure:**
*   **Server:** DigitalOcean Droplet (Ubuntu 24.04).
*   **Proxy:** Nginx (Reverse Proxy).
*   **Security:** Certbot (SSL), "Cookie Passport" (YouTube Authorization).

3. Architecture & Folder Structure

This project is a standalone repository focused purely on execution.

Ankyy_Empire/
└── MusicBox_App/
    ├── backend/               # The Conversion Engine
    │   ├── downloads/         # Temporary storage for MP3/MP4
    │   ├── .env               # Secrets (Mongo URI, Remote Admin Keys)
    │   ├── cookies.txt        # YouTube Authorization Passport
    │   └── server.js          # Logic: Conversion, Queue, API
    ├── frontend/              # The User Interface
    │   ├── public/
    │   └── src/               # React Code (Downloader UI)
    ├── docs/                  # Documentation
    │   ├── project-journal.md
    │   └── project-vision.md
    ├── .gitignore             # Git Rules
    └── README.md              # Installation Manual

4. Feature Roadmap

**Phase 1: The Factory (Completed)**
*   [x] Standalone Deployment on separate IP.
*   [x] Core FFmpeg/yt-dlp Engine integration.
*   [x] Queue System to handle multiple users.
*   [x] Dark Mode UI.

**Phase 2: Connect "God Mode" (Integration)**
*   **Concept:** This server has no Admin UI. It must accept commands from `ankyy.com`.
*   **API Security:** Implement a `MUSICBOX_SECRET_KEY`.
*   **Remote Commands:**
    *   `GET /stats`: Send CPU usage and download counts to Ankyy Admin.
    *   `DELETE /file/:id`: Allow Ankyy Admin to wipe files remotely.
    *   `POST /ban`: Block specific IPs via Nginx or Express.

**Phase 3: Monetization Prep (Revenue)**
*   **Ads Strategy:** Implement "Pop-under" or "Banner" slots in the Frontend (AdSense or alternatives like PropellerAds).
*   **Premium Model:**
    *   **The Lock:** Limit free users to 3 downloads/hour or 720p quality.
    *   **The Key:** "Premium Access Codes" (sold via Ankyy.com) that unlock 4K downloads and unlimited speed on MusicBox.life.
    *   **Implementation:** Simple middleware check in `server.js` validating the Access Code.

**Phase 4: Advanced Media Tools**
*   [ ] **Audio Trimming:** UI to select start/end time before download.
*   [ ] **Metadata Editor:** Allow users to change Album Art/Artist Name before download.

5. Deployment Strategy

*   **Method:** "Magic Deploy" Script (`./deploy.sh`).
*   **Workflow:** Local Dev (`MusicBox_App` folder) -> Push to GitHub (`musicbox-app`) -> Pull on Server -> Build -> Restart.
*   **Domain:** `musicbox.life` (Public access).

--- END OF FILE ---