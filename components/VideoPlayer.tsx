
import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from 'lucide-react';
import { MediaItem, ChannelItem } from '../types';
import Hls from 'hls.js';

interface VideoPlayerProps {
  item: MediaItem | ChannelItem;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ item, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use sourceUrl if available (real M3U), otherwise fallback to constants (demo)
    // For demo content in constants.ts, we don't have sourceUrl, so we use a sample video
    let src = item.sourceUrl;
    
    // Fallback for mock data that doesn't have a real stream URL
    if (!src) {
        src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    }

    if (Hls.isSupported() && src.includes('.m3u8')) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
      
      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
            console.error("HLS Error", data);
            // Optionally try to recover
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari support
      video.src = src;
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      // Standard MP4 or other formats
      video.src = src;
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }

    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = window.setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [item]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <div className="relative w-full h-full max-w-7xl max-h-screen bg-black overflow-hidden group">
        
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          loop={false}
        />

        {/* Overlay Controls */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
            <div>
              <h2 className="text-white text-2xl font-bold tracking-tight">{(item as MediaItem).title || (item as ChannelItem).name}</h2>
              <p className="text-slate-300 text-sm mt-1">
                 { (item as ChannelItem).category ? `Live • ${(item as ChannelItem).category}` : 'VOD' }
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-slate-800/50 hover:bg-slate-700/80 rounded-full text-white backdrop-blur-md transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Center Play Button (only when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="p-6 bg-blue-600/90 rounded-full backdrop-blur-xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                <Play size={48} className="text-white ml-2" fill="currentColor" />
              </div>
            </div>
          )}

          {/* Bottom Bar Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 space-y-4">
            
            {/* Progress Bar */}
            <div className="group/progress relative h-1.5 w-full bg-slate-700/50 rounded-full cursor-pointer overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                </button>
                
                <div className="flex items-center gap-2 group/vol">
                  <button onClick={toggleMute} className="text-slate-300 hover:text-white transition-colors">
                    {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="text-slate-300 hover:text-white transition-colors">
                  <Settings size={20} />
                </button>
                <button className="text-slate-300 hover:text-white transition-colors">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
