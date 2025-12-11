/* --- backend/server.js (MusicBox Standalone Engine) --- */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http'); 
const { Server } = require('socket.io'); 
const mongoose = require('mongoose'); 
const YTDlpWrap = require('yt-dlp-wrap').default;
const ffmpegPath = require('ffmpeg-static');
const archiver = require('archiver');

// --- ENVIRONMENT DETECTION ---
const IS_WINDOWS = process.platform === 'win32';
const BINARY_NAME = IS_WINDOWS ? 'yt-dlp.exe' : 'yt-dlp';

// --- CONFIGURATION ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/musicbox_standalone'; 
// The Admin Panel domain that is allowed to control this engine
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || 'https://ankyy.com'; 

// --- APP SETUP ---
const app = express();
const server = http.createServer(app); 

// Allow Frontend (Self) + Admin (Remote)
const ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://musicbox.life",
    "https://www.musicbox.life",
    ADMIN_ORIGIN 
];

const io = new Server(server, {
    cors: { origin: ALLOWED_ORIGINS, methods: ["GET", "POST"] }
});

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true }));

// --- STATIC PATHS ---
const downloadDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);
app.use('/downloads', express.static(downloadDir));

// --- MONGODB ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected (MusicBox Engine)'))
    .catch(err => console.error('❌ MongoDB Error:', err));

// --- FILE SCHEMA ONLY (No Blog) ---
const FileSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: String,
    filename: String,
    type: String,
    quality: String,
    effect: String,
    thumbnail: String,
    date: { type: Date, default: Date.now },
    size: String,
    status: String,
    downloadDuration: Number
});
const FileModel = mongoose.model('File', FileSchema);

// --- YT-DLP ENGINE SETUP ---
const binaryPath = path.join(__dirname, BINARY_NAME);
let ytDlpWrap;

const ensureBinaryExists = async () => {
    if (!fs.existsSync(binaryPath)) {
        console.log(`⏳ Downloading ${BINARY_NAME}...`);
        try { 
            await YTDlpWrap.downloadFromGithub(binaryPath); 
            if (!IS_WINDOWS) fs.chmodSync(binaryPath, '755');
            console.log(`✅ Engine Ready.`);
        } catch (err) { console.error('❌ Engine DL Failed:', err); }
    }
    ytDlpWrap = new YTDlpWrap(binaryPath);
};
ensureBinaryExists();

// --- QUEUE SYSTEM ---
class DownloadQueue {
    constructor(concurrency = 2) { 
        this.queue = [];
        this.activeCount = 0;
        this.concurrency = concurrency;
    }
    add(task) {
        this.queue.push(task);
        this.processNext();
        this.emitUpdate();
    }
    processNext() {
        if (this.activeCount >= this.concurrency || this.queue.length === 0) return;
        const task = this.queue.shift();
        this.activeCount++;
        this.emitUpdate();
        task().finally(() => {
            this.activeCount--;
            this.processNext();
            this.emitUpdate();
        });
    }
    emitUpdate() {
        // Emit to everyone listening (Frontend + Remote Admin)
        io.emit('queue_update', { length: this.queue.length, active: this.activeCount });
    }
}
const queue = new DownloadQueue(2);

// --- SOCKET.IO ---
io.on('connection', (socket) => {
    // Just emit stats on connection
    emitStats();
});

const emitStats = async () => {
    try {
        const totalFiles = await FileModel.countDocuments();
        const recent = await FileModel.find().sort({ date: -1 }).limit(10);
        let totalSizeMB = 0;
        const allFiles = await FileModel.find();
        allFiles.forEach(f => { totalSizeMB += parseFloat(f.size || 0); });

        io.emit('stats_update', {
            totalFiles,
            storageUsage: totalSizeMB.toFixed(1),
            recentActivity: recent
        });
    } catch(e) {}
};

// ======================================================
// CONVERSION ROUTES
// ======================================================

app.post('/api/convert', (req, res) => {
    if (!ytDlpWrap) return res.status(503).json({ success: false, message: "Initializing..." });
    const { url, type, quality = 'max', effect = 'none' } = req.body;
    
    const downloadTask = async () => {
        const startTime = Date.now();
        try {
            io.emit('log', { message: `Started: ${url}`, type: 'info' });
            
            // 1. Get Metadata
            const metadataJSON = await ytDlpWrap.execPromise([url, '--dump-json', '--no-playlist', '--no-warnings']);
            const meta = JSON.parse(metadataJSON);
            const cleanTitle = meta.title.replace(/[^\w\s-]/gi, '') || "downloaded_video";
            
            // 2. Prepare Paths
            let suffix = '';
            if (type === 'mp4') suffix += `-${quality}`;
            if (effect !== 'none') suffix += `-${effect}`; 
            
            const filename = `${cleanTitle}${suffix}.${type}`;
            const outputTemplate = path.join(downloadDir, `${cleanTitle}${suffix}.%(ext)s`);

            // 3. Build Arguments
            let args = [url, '-o', outputTemplate, '--no-playlist', '--force-overwrites', '--ffmpeg-location', ffmpegPath, '--add-metadata', '--embed-thumbnail'];
            
            if (fs.existsSync(path.join(__dirname, 'cookies.txt'))) {
                args.push('--cookies', path.join(__dirname, 'cookies.txt'));
            }

            // 4. Effects & Quality
            let audioFilters = [];
            if (effect === 'slowed') audioFilters.push("asetrate=44100*0.88,atempo=1.0,aecho=0.8:0.9:1000:0.3");
            else if (effect === 'nightcore') audioFilters.push("asetrate=44100*1.25,atempo=1.0");
            else if (effect === 'bassboost') audioFilters.push("bass=g=10:f=110:w=0.6");

            if (type === 'mp3') {
                args.push('-x', '--audio-format', 'mp3');
                if (audioFilters.length > 0) args.push('--postprocessor-args', `ffmpeg:-af "${audioFilters.join(',')}"`);
            } else {
                let formatString = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best';
                if(quality === '1080') formatString = 'bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]';
                if(quality === '720') formatString = 'bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]';
                if(quality === '360') formatString = 'bestvideo[height<=360][ext=mp4]+bestaudio[ext=m4a]';
                
                args.push('-f', formatString, '--merge-output-format', 'mp4');
                if (audioFilters.length > 0) args.push('--postprocessor-args', `ffmpeg:-af "${audioFilters.join(',')}"`);
            }

            // 5. Execute
            await ytDlpWrap.execPromise(args);
            
            // 6. Save Record
            const stats = fs.statSync(path.join(downloadDir, filename));
            const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
            const duration = ((Date.now() - startTime) / 1000).toFixed(2);

            const record = {
                id: Date.now(), title: cleanTitle, filename: filename, type: type, quality: quality,
                effect: effect, thumbnail: meta.thumbnail, date: new Date(), size: sizeMB, status: 'Success', downloadDuration: duration
            };
            
            await new FileModel(record).save();
            io.emit('log', { message: `Finished: ${cleanTitle}`, type: 'success' });
            emitStats();

            if (!res.headersSent) res.json({ success: true, data: record });

        } catch (error) {
            console.error(error);
            io.emit('log', { message: `Failed: ${url}`, type: 'error' });
            if (!res.headersSent) res.status(500).json({ success: false, message: "Failed" });
        }
    };
    queue.add(downloadTask);
});

// Playlist Fetch
app.post('/api/playlist', async (req, res) => {
    if (!ytDlpWrap) return res.status(503).json({ success: false, message: "Initializing..." });
    const { url } = req.body;
    try {
        const metadataJSON = await ytDlpWrap.execPromise([url, '--flat-playlist', '--dump-single-json', '--no-warnings']);
        const playlistData = JSON.parse(metadataJSON);
        const entries = (playlistData.entries || []).map(entry => ({
            title: entry.title,
            url: entry.url || `https://www.youtube.com/watch?v=${entry.id}`,
            id: entry.id
        }));
        res.json({ success: true, videos: entries, title: playlistData.title });
    } catch (error) { res.status(500).json({ success: false }); }
});

// Zip Download
app.post('/api/zip', async (req, res) => {
    const { fileIds } = req.body;
    const filesToZip = await FileModel.find({ id: { $in: fileIds } });
    if(filesToZip.length === 0) return res.status(400).json({success: false});
    const archive = archiver('zip', { zlib: { level: 9 } });
    res.attachment('MusicBox_Download.zip');
    archive.pipe(res);
    filesToZip.forEach(file => {
        const filePath = path.join(downloadDir, file.filename);
        if(fs.existsSync(filePath)) archive.file(filePath, { name: file.filename });
    });
    archive.finalize();
});

// History API (Public to Frontend, Secured in future for remote admin)
app.get('/api/history', async (req, res) => {
    try {
        let history = await FileModel.find().sort({ date: -1 });
        let totalSizeBytes = 0;
        history.forEach(record => { if(record.size) totalSizeBytes += (parseFloat(record.size) * 1024 * 1024); });
        const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(1);
        res.json({ success: true, data: history, storage: totalSizeMB });
    } catch (e) { res.status(500).json({ success: false }); }
});

// Delete (Used by Client Mode and Remote Admin)
app.delete('/api/files/:id', async (req, res) => {
    try {
        // TODO: Add Authorization Check here in Phase 3
        const fileRecord = await FileModel.findOne({ id: parseInt(req.params.id) });
        if (!fileRecord) return res.status(404).json({ success: false });
        const filePath = path.join(downloadDir, fileRecord.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        await FileModel.deleteOne({ id: parseInt(req.params.id) });
        emitStats();
        res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false }); }
});

server.listen(PORT, () => console.log(`🚀 MusicBox Engine running on Port ${PORT}`));