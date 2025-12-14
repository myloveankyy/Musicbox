# --- MUSICBOX CLEANUP SCRIPT ---
# This script removes unused files from the previous Ankyy Monorepo.

Write-Host "🗑️  Starting Cleanup Protocol..." -ForegroundColor Yellow

# 1. CLEAN FRONTEND COMPONENTS (Keep only MusicBox.js)
$components = @(
    "frontend/src/components/AnkyyLogo.js",
    "frontend/src/components/Building.js",
    "frontend/src/components/Courses.js",
    "frontend/src/components/DigitalJourney.js",
    "frontend/src/components/Header.js",
    "frontend/src/components/Hero.js",
    "frontend/src/components/ToolsGrid.js"
)

foreach ($file in $components) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted: $file" -ForegroundColor Red
    }
}

# 2. CLEAN FRONTEND PAGES (Keep only MusicBoxPage.js)
$pages = @(
    "frontend/src/pages/Article.js",
    "frontend/src/pages/BlogFeed.js",
    "frontend/src/pages/HomePage.js"
)

foreach ($file in $pages) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted: $file" -ForegroundColor Red
    }
}

# 3. CLEAN BACKEND BLOAT
if (Test-Path "backend/yt-dlp.exe") {
    Remove-Item "backend/yt-dlp.exe" -Force
    Write-Host "Deleted: backend/yt-dlp.exe (Server will auto-download Linux version)" -ForegroundColor Red
}

# 4. PURGE DOWNLOADS FOLDER (Remove stale MP3s)
if (Test-Path "backend/downloads") {
    Get-ChildItem -Path "backend/downloads" -Include *.mp3, *.mp4, *.webm -Recurse | Remove-Item -Force
    Write-Host "Purged: backend/downloads/*" -ForegroundColor Cyan
}

Write-Host "✅ Cleanup Complete. Project is now 'Clean'." -ForegroundColor Green