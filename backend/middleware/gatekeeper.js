const jwt = require('jsonwebtoken');
const DownloadLog = require('../models/DownloadLog'); 

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';

// --- MIDDLEWARE A: IDENTITY SCANNER ---
// Does not block. Just checks "Who are you?"
// If Token valid -> req.user = { id, role }
// If No Token  -> req.user = null
const identifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.log("[GATEKEEPER] Invalid Token detected. Treating as Guest.");
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
};

// --- MIDDLEWARE B: THE WALL ---
// Enforces limits based on Identity.
const checkRateLimit = async (req, res, next) => {
  // 1. VIP PASS: If User is logged in, skip all checks.
  if (req.user) {
    console.log(`[GATEKEEPER] VIP Access: User ${req.user.id}`);
    return next();
  }

  // 2. GUEST CHECK: Track by IP
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  // Calculate Start of Day (Midnight)
  const startOfDay = new Date();
  startOfDay.setHours(0,0,0,0);

  try {
    // Count downloads from this IP since Midnight
    const count = await DownloadLog.countDocuments({
      ip: clientIp,
      timestamp: { $gte: startOfDay }
    });

    console.log(`[GATEKEEPER] Guest IP ${clientIp} Usage: ${count}/3`);

    // 3. THE REJECTION
    // Limit set to 3 per day for Guests.
    if (count >= 3) {
      return res.status(429).json({ 
        success: false,
        error: "LIMIT_REACHED", 
        message: "Daily Guest Limit Reached. Initialize Identity for Unlimited Access." 
      });
    }

    next();
  } catch (error) {
    console.error("[GATEKEEPER] DB Error:", error);
    // Fail Open: If DB is down, let them download (better UX than blocking)
    next(); 
  }
};

module.exports = { identifyUser, checkRateLimit };