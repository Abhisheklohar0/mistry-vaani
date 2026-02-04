
import React, { useState, useRef, useEffect } from 'react';
import { LONG_VIDEOS_DATA, APP_NAME } from '../constants';
import { 
  Play, MoreVertical, Share2, 
  Bookmark, X, Flag, Link2, ListPlus, Volume2, VolumeX, Maximize2, CheckCircle2, 
  Pause, RotateCcw, RotateCw, ChevronDown, Heart
} from 'lucide-react';
import { ContentCard } from '../types';

// Reusable Official App Logo component for avatars
const OfficialAppAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = "" }) => (
  <div 
    style={{ width: size, height: size }} 
    className={`rounded-full bg-[#1C1C18] border border-[#FFD400]/20 flex items-center justify-center overflow-hidden flex-shrink-0 ${className}`}
  >
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 100 100" fill="none">
      <path d="M15 20L50 85L85 20" stroke="#FFD400" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Reusable Premium Gold Verified Tick
const VerifiedBadge: React.FC<{ size?: number }> = ({ size = 10 }) => (
  <div className="flex items-center justify-center ml-1">
    <CheckCircle2 
      size={size} 
      className="text-[#FFD400]" 
      fill="#FFD400" 
      fillOpacity={0.2}
      strokeWidth={3}
    />
  </div>
);

interface VideoOptionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  video: ContentCard;
}

const VideoOptionsDrawer: React.FC<VideoOptionsDrawerProps> = ({ isOpen, onClose, video }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 max-h-[70%] bg-[#161612] rounded-t-[32px] border-t border-white/10 flex flex-col shadow-2xl overflow-hidden pb-10">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-[14px] font-black text-white uppercase tracking-widest">Video Options</h3>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full">
            <X size={20} className="text-[#A0A096]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
          <div className="flex items-center space-x-4">
            <OfficialAppAvatar size={48} />
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-[15px] font-black text-white uppercase">{APP_NAME}</span>
                <VerifiedBadge size={14} />
              </div>
              <span className="text-[10px] font-bold text-[#FFD400] uppercase tracking-widest">Official Channel</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] font-black text-[#555550] uppercase tracking-widest">Description</h4>
            <p className="text-[13px] text-[#A0A096] leading-relaxed font-medium">
              {video.description || "No description provided for this video."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/5 active:scale-95 transition-transform">
              <ListPlus size={18} className="text-[#A0A096]" />
              <span className="text-sm font-bold text-white uppercase tracking-tighter">Save playlist</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/5 active:scale-95 transition-transform">
              <Link2 size={18} className="text-[#A0A096]" />
              <span className="text-sm font-bold text-white uppercase tracking-tighter">Copy link</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/5 active:scale-95 transition-transform">
              <Flag size={18} className="text-red-500/60" />
              <span className="text-sm font-bold text-white uppercase tracking-tighter">Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StickyPlayer: React.FC<{ 
  video: ContentCard; 
  onClose: () => void;
  onFullscreen: () => void;
}> = ({ video, onClose, onFullscreen }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false));
      
      // Real view tracking logic: Increment views on play
      const currentViews = Number(localStorage.getItem(`vaani_views_${video.id}`)) || 0;
      localStorage.setItem(`vaani_views_${video.id}`, String(currentViews + 1));
      // Dispatch custom event to update UI in other components
      window.dispatchEvent(new CustomEvent('vaani_view_update', { detail: { id: video.id } }));
    }
  }, [video.id]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
      resetControlsTimeout();
    }
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) videoRef.current.currentTime += seconds;
    resetControlsTimeout();
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      className="w-full aspect-video bg-black relative group overflow-hidden"
      onMouseMove={resetControlsTimeout}
      onClick={() => setShowControls(!showControls)}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        playsInline
        autoPlay
        muted={isMuted}
      />

      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex flex-col justify-between ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="p-4 flex items-center justify-between">
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 bg-black/20 rounded-full text-white backdrop-blur-md">
            <ChevronDown size={20} />
          </button>
          <div className="flex items-center space-x-3">
             <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="p-2 bg-black/20 rounded-full text-white backdrop-blur-md">
               {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
             </button>
             <button onClick={(e) => { e.stopPropagation(); onFullscreen(); }} className="p-2 bg-black/20 rounded-full text-white backdrop-blur-md">
               <Maximize2 size={18} />
             </button>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-12">
          <button onClick={(e) => { e.stopPropagation(); skip(-10); }} className="text-white hover:text-[#FFD400] transition-colors">
            <RotateCcw size={32} />
          </button>
          <button onClick={togglePlay} className="w-16 h-16 bg-[#FFD400] rounded-full flex items-center justify-center text-black shadow-2xl active:scale-90 transition-transform">
            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} className="ml-1" fill="currentColor" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); skip(10); }} className="text-white hover:text-[#FFD400] transition-colors">
            <RotateCw size={32} />
          </button>
        </div>

        <div className="px-4 pb-4 space-y-2">
           <div className="flex items-center justify-between text-[10px] font-black text-white/80 uppercase tracking-widest">
             <span>{formatTime(currentTime)}</span>
             <span>{formatTime(duration)}</span>
           </div>
           <input
             type="range"
             min="0"
             max={duration || 0}
             value={currentTime}
             onChange={handleSeek}
             onClick={(e) => e.stopPropagation()}
             className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#FFD400] transition-all"
           />
        </div>
      </div>
    </div>
  );
};

interface VideoCardProps {
  video: ContentCard;
  isCurrentlyPlaying: boolean;
  onSelect: (video: ContentCard) => void;
  onShowOptions: (video: ContentCard) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isCurrentlyPlaying, onSelect, onShowOptions }) => {
  const [hasLiked, setHasLiked] = useState(() => localStorage.getItem(`vaani_video_liked_${video.id}`) === 'true');
  const [hasSaved, setHasSaved] = useState(() => localStorage.getItem(`vaani_video_saved_${video.id}`) === 'true');
  const [views, setViews] = useState(() => Number(localStorage.getItem(`vaani_views_${video.id}`)) || 0);

  useEffect(() => {
    const handleViewUpdate = (e: any) => {
      if (e.detail?.id === video.id) {
        setViews(Number(localStorage.getItem(`vaani_views_${video.id}`)) || 0);
      }
    };
    window.addEventListener('vaani_view_update', handleViewUpdate);
    return () => window.removeEventListener('vaani_view_update', handleViewUpdate);
  }, [video.id]);

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !hasLiked;
    setHasLiked(newState);
    localStorage.setItem(`vaani_video_liked_${video.id}`, String(newState));
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !hasSaved;
    setHasSaved(newState);
    localStorage.setItem(`vaani_video_saved_${video.id}`, String(newState));
  };

  // Real like logic: Only user interaction counts
  const getDisplayLikes = () => {
    return hasLiked ? "1" : "0";
  };

  return (
    <div className="w-full bg-black mb-10 animate-in fade-in">
      <div 
        className="relative w-full aspect-video bg-[#111] overflow-hidden cursor-pointer"
        onClick={() => onSelect(video)}
      >
        <img 
          src={video.thumbnail} 
          className="w-full h-full object-cover" 
          alt={video.title} 
        />
        {isCurrentlyPlaying && (
          <div className="absolute inset-0 bg-[#FFD400]/20 flex items-center justify-center backdrop-blur-[2px]">
             <div className="bg-black/80 px-4 py-2 rounded-full border border-[#FFD400]/40 flex items-center space-x-2">
               <div className="flex space-x-0.5 items-end h-3">
                 <div className="w-0.5 bg-[#FFD400] animate-[music_0.6s_ease-in-out_infinite] h-full"></div>
                 <div className="w-0.5 bg-[#FFD400] animate-[music_0.8s_ease-in-out_infinite_0.1s] h-1/2"></div>
                 <div className="w-0.5 bg-[#FFD400] animate-[music_0.7s_ease-in-out_infinite_0.2s] h-3/4"></div>
               </div>
               <span className="text-[10px] font-black text-[#FFD400] uppercase tracking-widest">Playing Now</span>
             </div>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-widest">
          {video.duration || "12:40"}
        </div>
      </div>

      <div className="px-4 py-4 flex space-x-3">
        {/* Creator logo is now always the app logo */}
        <OfficialAppAvatar size={40} />
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-[15px] font-black text-white leading-tight line-clamp-2 pr-4 uppercase tracking-tight">
              {video.title}
            </h3>
            <button onClick={() => onShowOptions(video)} className="p-1 -mr-1 text-[#555550]">
              <MoreVertical size={18} />
            </button>
          </div>
          <div className="mt-1.5 flex items-center">
            <div className="flex items-center">
              <span className="text-[11px] font-black text-[#FFD400] uppercase tracking-tighter">{APP_NAME}</span>
              <VerifiedBadge size={10} />
            </div>
            <span className="text-[#555550] text-[10px] mx-2">•</span>
            <span className="text-[11px] font-bold text-[#555550] uppercase">{views} Views</span>
            <span className="text-[#555550] text-[10px] mx-2">•</span>
            <span className="text-[11px] font-bold text-[#555550] uppercase">Just Now</span>
          </div>

          <div className="mt-5 flex items-center space-x-8">
            <button 
              onClick={handleToggleLike}
              className={`flex items-center space-x-2.5 transition-all group ${hasLiked ? 'text-[#FFD400]' : 'text-[#A0A096]'}`}
            >
              <Heart 
                size={22} 
                strokeWidth={2.5}
                className={`group-active:scale-125 transition-transform ${hasLiked ? 'fill-[#FFD400]' : ''}`} 
              />
              <span className="text-[13px] font-black uppercase tracking-widest">{getDisplayLikes()}</span>
            </button>
            <button className="flex items-center space-x-2.5 text-[#A0A096] active:text-white transition-colors">
              <Share2 size={22} strokeWidth={2.5} />
              <span className="text-[13px] font-black uppercase tracking-widest">SHARE</span>
            </button>
            <button 
              onClick={handleToggleSave}
              className={`flex items-center space-x-2.5 transition-all group ${hasSaved ? 'text-[#FFD400]' : 'text-[#A0A096]'}`}
            >
              <Bookmark 
                size={22} 
                strokeWidth={2.5}
                className={`group-active:scale-125 transition-transform ${hasSaved ? 'fill-[#FFD400]' : ''}`} 
              />
              <span className="text-[13px] font-black uppercase tracking-widest">SAVE</span>
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes music {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};

const Home: React.FC<{ onPostClick?: (p: any) => void }> = ({ onPostClick }) => {
  const [activeVideo, setActiveVideo] = useState<ContentCard | null>(null);
  const [selectedOptionsVideo, setSelectedOptionsVideo] = useState<ContentCard | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleVideoSelect = (video: ContentCard) => {
    setActiveVideo(video);
  };

  return (
    <div className="flex flex-col h-full bg-black relative">
      <div className={`sticky top-0 z-50 bg-black transition-all ${isFullscreen ? 'h-full flex items-center bg-black' : ''}`}>
        {activeVideo && (
          <div className={`w-full ${isFullscreen ? 'h-screen' : 'shadow-2xl'}`}>
            <StickyPlayer 
              video={activeVideo} 
              onClose={() => { setActiveVideo(null); setIsFullscreen(false); }}
              onFullscreen={() => setIsFullscreen(!isFullscreen)}
            />
            {!isFullscreen && (
              <div className="bg-[#161612] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                 <div className="flex flex-col flex-1 truncate pr-4">
                   <h4 className="text-[12px] font-black text-white uppercase truncate tracking-tight">{activeVideo.title}</h4>
                   <div className="flex items-center mt-0.5">
                     <span className="text-[9px] font-bold text-[#FFD400] uppercase">{APP_NAME}</span>
                     <VerifiedBadge size={10} />
                   </div>
                 </div>
                 <button onClick={() => setSelectedOptionsVideo(activeVideo)} className="text-[#555550]">
                   <MoreVertical size={16} />
                 </button>
              </div>
            )}
          </div>
        )}
      </div>

      {!isFullscreen && (
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {LONG_VIDEOS_DATA.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              isCurrentlyPlaying={activeVideo?.id === video.id}
              onSelect={handleVideoSelect}
              onShowOptions={(v) => setSelectedOptionsVideo(v)}
            />
          ))}

          <div className="py-20 flex flex-col items-center opacity-10">
            <div className="w-1.5 h-1.5 rounded-full bg-white mb-4 animate-pulse"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Infinite Wisdom Loading</p>
          </div>
        </div>
      )}

      {selectedOptionsVideo && (
        <VideoOptionsDrawer 
          isOpen={!!selectedOptionsVideo} 
          onClose={() => setSelectedOptionsVideo(null)} 
          video={selectedOptionsVideo} 
        />
      )}
    </div>
  );
};

export default Home;
