/* --- backend/server.js (v8.0 Hybrid Engine) --- */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const YTDlpWrap = require('yt-dlp-wrap').default;
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- IMPORTS ---
const User = require('./models/User');
const DownloadLog = require('./models/DownloadLog');
const { identifyUser, checkRateLimit } = require('./middleware/gatekeeper');

// --- CONFIGURATION ---
const app = express();
const PORT = process.env.PORT || 5000;
const BINARY_PATH = path.join(__dirname, 'yt-dlp'); // Binary lives in root/backend/yt-dlp
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev')); // "Velvet Thunder" logging

// --- DATABASE (The Memory) ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('⚡ [DB] MongoDB Atlas Connected'))
  .catch(err => console.error('❌ [DB] Connection Failed:', err));

// --- ENGINE INIT ---
const initEngine = async () => {
    if (!fs.existsSync(BINARY_PATH)) {
        console.log("⏳ [SYSTEM] Downloading yt-dlp binary...");
        try {
            await YTDlpWrap.downloadFromGithub(BINARY_PATH);
            console.log("✅ [SYSTEM] Engine Installed.");
            // Ensure executable permissions (Linux/Mac)
            fs.chmodSync(BINARY_PATH, '755');
        } catch (err) {
            console.error("❌ [SYSTEM] Binary Download Failed:", err);
        }
    }
};
initEngine();

const ytDlpWrap = new YTDlpWrap(BINARY_PATH);

// ------------------------------------------
// 🔐 AUTH ROUTES (The Keys)
// ------------------------------------------

// 1. MINT IDENTITY (Register)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ success: false, message: "Identity exists." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "Identity Established." });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. ACCESS PROTOCOL (Login)
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Identity not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid Credentials." });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ 
            success: true,
            token, 
            user: { id: user._id, username: user.username, email: user.email } 
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ------------------------------------------
// ⚙️ THE CORE ENGINE (Extraction)
// ------------------------------------------

app.get('/', (req, res) => res.json({ status: 'Operational', engine: 'yt-dlp', mode: 'Hybrid' }));

// THE UNIVERSAL EXTRACTOR
// Flow: Identify User -> Check Limits -> Extract -> Log -> Return
app.post('/api/extract', identifyUser, checkRateLimit, async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ success: false, error: "No URL detected." });

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userId = req.user ? req.user.id : null;

    console.log(`[ENGINE] Processing: ${url} | User: ${userId ? 'REGISTERED' : 'GUEST'}`);

    try {
        // 1. EXECUTE BINARY (Get Metadata only)
        // We use --dump-json to get direct links without downloading to server disk
        const metadataString = await ytDlpWrap.execPromise([
            url,
            '--dump-json',
            '--no-playlist',
            '--no-warnings'
        ]);
        
        const data = JSON.parse(metadataString);

        // 2. NORMALIZE DATA
        // yt-dlp returns different fields for different sites. We standardize here.
        const payload = {
            title: data.title || `Extracted_Media_${Date.now()}`,
            author: data.uploader || data.channel || "Unknown",
            thumbnail: data.thumbnail, 
            // Prefer the requested format URL, fall back to simple url
            url: data.url || (data.formats && data.formats[data.formats.length - 1].url), 
            type: data.ext || "mp4",
            size: data.filesize_approx ? `${(data.filesize_approx / 1024 / 1024).toFixed(1)} MB` : "HD", 
            platform: data.extractor_key
        };

        // 3. LOG TRANSACTION (Required for Rate Limiting)
        await DownloadLog.create({
            url: url,
            platform: payload.platform,
            title: payload.title,
            ip: clientIp,
            userId: userId
        });

        console.log(`[ENGINE] Success: ${payload.title}`);
        res.json({ success: true, data: payload });

    } catch (error) {
        console.error(`[ENGINE] Extraction Error: ${error.message}`);
        res.status(500).json({ 
            success: false, 
            error: "Extraction Failed. Link might be private, geo-locked, or unsupported." 
        });
    }
});

// ------------------------------------------
// 📊 DASHBOARD ENDPOINTS (User Data)
// ------------------------------------------

// USER HISTORY
app.get('/api/user/history', identifyUser, async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, error: "Access Denied." });

    try {
        const history = await DownloadLog.find({ userId: req.user.id })
            .sort({ timestamp: -1 })
            .limit(50)
            .select('title platform url timestamp type');

        res.json({ success: true, history });
    } catch (err) {
        res.status(500).json({ success: false, error: "DB Error" });
    }
});

// USER STATS
app.get('/api/user/stats', identifyUser, async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, error: "Access Denied." });

    try {
        const count = await DownloadLog.countDocuments({ userId: req.user.id });
        res.json({ success: true, totalDownloads: count });
    } catch (err) {
        res.status(500).json({ success: false, error: "Stats Error" });
    }
});

// GLOBAL STATS (Public)
app.get('/api/stats', async (req, res) => {
    try {
        const total = await DownloadLog.countDocuments();
        res.json({ success: true, totalDownloads: total });
    } catch (err) {
        res.status(500).json({ success: false, error: "Stats Unavailable" });
    }
});

// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`
    🚀 MUSICBOX ENGINE ACTIVE
    --------------------------------------
    PORT:    ${PORT}
    MODE:    HYBRID (Guest + Auth)
    --------------------------------------
    `);
});