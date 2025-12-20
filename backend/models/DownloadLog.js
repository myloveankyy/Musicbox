/* --- backend/models/DownloadLog.js --- */

const mongoose = require('mongoose');

const DownloadLogSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    default: 'Unknown'
  },
  title: {
    type: String,
    default: 'Untitled'
  },
  type: {
    type: String, // e.g., 'MP4', 'MP3'
    default: 'MP4'
  },
  ip: {
    type: String, // Critical for Guest Rate Limiting
    required: false
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Links to the User model
    default: null 
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DownloadLog', DownloadLogSchema);