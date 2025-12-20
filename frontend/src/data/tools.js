import { 
  Instagram, Youtube, Music, Scissors, Mic, 
  Video, FileVideo, Download, Hash, Type
} from 'lucide-react';

export const TOOLS_DATA = [
  {
    category: "Instagram Tools",
    slug: "instagram",
    color: "from-pink-500 to-purple-600",
    bg: "bg-pink-50",
    tools: [
      { id: 'insta-reel', name: 'Reel Downloader', slug: 'reel-downloader', icon: Instagram, desc: 'Save Reels in 1080p.' },
      { id: 'insta-audio', name: 'Insta Audio Extractor', slug: 'audio-extractor', icon: Music, desc: 'Get MP3 from any post.' },
      { id: 'insta-story', name: 'Story Saver', slug: 'story-saver', icon: FileVideo, desc: 'Download stories anonymously.' },
    ]
  },
  {
    category: "YouTube Studio",
    slug: "youtube",
    color: "from-red-500 to-red-600",
    bg: "bg-red-50",
    tools: [
      { id: 'yt-mp4', name: 'YouTube Downloader', slug: 'video-downloader', icon: Youtube, desc: 'Save videos in 4K/HD.' },
      { id: 'yt-mp3', name: 'YouTube to MP3', slug: 'mp3-converter', icon: Music, desc: 'Convert video to high-quality audio.' },
      { id: 'yt-shorts', name: 'Shorts Downloader', slug: 'shorts-downloader', icon: Download, desc: 'Bulk save Shorts.' },
    ]
  },
  {
    category: "Audio Lab",
    slug: "audio",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    tools: [
      { id: 'audio-cut', name: 'Audio Cutter', slug: 'cutter', icon: Scissors, desc: 'Trim audio files precisely.' },
      { id: 'audio-speed', name: 'Speed Changer', slug: 'speed', icon: Mic, desc: 'Speed up or slow down songs.' },
    ]
  },
  {
    category: "AI Magic",
    slug: "ai",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    tools: [
      { id: 'ai-tags', name: 'Hashtag Generator', slug: 'hashtag-generator', icon: Hash, desc: 'Viral tags for Reels.' },
      { id: 'ai-caps', name: 'Caption Generator', slug: 'caption-generator', icon: Type, desc: 'Write witty captions instantly.' },
    ]
  }
];