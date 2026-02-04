
import React, { useState, useRef } from 'react';
import { HERO_CONTENT, TOP_SHOWS, CATEGORIES } from '../constants';
import { Play, Search, Mic, TrendingUp, Gem, X, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { VipReadAllPost, ContentCard } from '../types';

interface HomeProps {
  onSearchClick?: () => void;
  onPostClick?: (post: VipReadAllPost) => void;
}

const VideoPlayerOverlay: React.FC<{ content: ContentCard; onClose: () => void }> = ({ content, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Prevent right-click to deter downloading
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-300 flex flex-col" onContextMenu={handleContextMenu}>
      {/* Anti-Download Header Info */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 opacity-20 pointer-events-none flex items-center space-x-2">
        <ShieldAlert size={12} className="text-white" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Protected Content • Vaani FM</span>
      </div>

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-40">
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {content.videoUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* The actual video element with no-download restrictions */}
            <video 
              ref={videoRef}
              src={content.videoUrl}
              className="w-full h-auto max-h-full"
              controls
              autoPlay
              muted={isMuted}
              playsInline
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={handleContextMenu}
            />
            
            {/* Transparent overlay to block most direct "Save Video As" attempts on desktop */}
            <div className="absolute inset-0 z-10 bg-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="text-center px-10">
            <Gem size={48} className="text-[#FFD400] mx-auto mb-4 opacity-20" />
            <p className="text-[12px] font-black text-[#555] uppercase tracking-widest">Premium Content Preview</p>
          </div>
        )}
      </div>

      <div className="p-8 bg-gradient-to-t from-black via-black/80 to-transparent relative z-20">
        <div className="flex items-center space-x-2 mb-2">
          {content.isPremium && <Gem size={12} className="text-[#FFD400]" fill="#FFD400" />}
          <span className="text-[10px] font-black text-[#FFD400] uppercase tracking-widest">{content.creator}</span>
        </div>
        <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">{content.title}</h2>
        <div className="mt-4 flex items-center space-x-2 opacity-40">
           <ShieldAlert size={10} className="text-white" />
           <p className="text-[8px] font-bold text-white uppercase tracking-widest">Digital Rights Management Enabled</p>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ onSearchClick }) => {
  const [activeTab, setActiveTab] = useState('Popular');
  const [playingContent, setPlayingContent] = useState<ContentCard | null>(null);

  return (
    <div className="pb-20 animate-in fade-in duration-500 overflow-y-auto h-full hide-scrollbar">
      {/* Search Header */}
      <div className="px-6 pt-4 pb-2 sticky top-0 z-30 bg-[#0E0E0B]/90 backdrop-blur-md">
        <div 
          onClick={onSearchClick}
          className="h-11 bg-[#1C1C18] rounded-full flex items-center px-4 border border-[#242420] active:scale-[0.98] transition-all group cursor-pointer"
        >
          <Search size={18} className="text-[#555550]" />
          <div className="flex-1 px-3 text-[13px] font-medium text-[#555550]">Search stories on VaaniFM</div>
          <Mic size={18} className="text-[#FFD400]" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-6 py-4 overflow-x-auto hide-scrollbar flex items-center space-x-8 whitespace-nowrap border-b border-[#242420]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`text-[12px] font-black tracking-widest uppercase transition-all relative pb-2 ${
              activeTab === cat ? 'text-white' : 'text-[#555550]'
            }`}
          >
            {cat}
            {activeTab === cat && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD400] rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Hero Carousel */}
      <section className="mt-8">
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 space-x-4">
          {HERO_CONTENT.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setPlayingContent(item)}
              className="min-w-[320px] h-[200px] rounded-[32px] relative overflow-hidden snap-center flex-shrink-0 border border-[#242420] group cursor-pointer shadow-2xl"
            >
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center space-x-2 mb-2">
                   {item.isPremium && <Gem size={12} className="text-[#FFD400]" fill="#FFD400" />}
                   <span className="text-[10px] text-[#A0A096] font-black uppercase tracking-[0.2em]">Featured Premium</span>
                </div>
                <h3 className="text-white font-black text-lg leading-none tracking-tighter uppercase line-clamp-2 max-w-[80%] drop-shadow-lg">{item.title}</h3>
                <div className="absolute bottom-6 right-6 w-11 h-11 bg-[#FFD400] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,212,0,0.3)] active:scale-90 transition-transform group-hover:scale-110">
                   <Play size={20} fill="black" className="text-black ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Trending List */}
      <section className="px-6 mt-10">
        <div className="bg-[#161612] rounded-[32px] p-6 border border-[#242420] shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp size={16} className="text-[#FFD400]" />
            <h2 className="text-[14px] font-black uppercase tracking-widest text-white">Trending Now</h2>
          </div>
          <div className="space-y-6">
            {TOP_SHOWS.map((show) => (
              <div key={show.id} className="flex items-center justify-between group active:scale-[0.98] transition-transform">
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-black text-[#242420] italic w-6">{show.rank}</span>
                  <div className="w-14 h-14 rounded-2xl bg-[#0E0E0B] border border-white/5 overflow-hidden">
                    <img src={show.thumbnail} alt={show.title} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div>
                    <h4 className="font-black text-[14px] text-white uppercase tracking-tight leading-none">{show.title}</h4>
                    <p className="text-[10px] text-[#555550] uppercase font-bold tracking-widest mt-1.5">{show.creator}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1C1C18] flex items-center justify-center border border-white/5 active:scale-90 transition-transform">
                  <Play size={14} fill="#FFD400" className="text-[#FFD400]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="mt-16 mb-10 text-center opacity-10">
         <p className="text-[8px] text-white font-black uppercase tracking-[0.6em]">Vaani FM Originals</p>
      </div>

      {playingContent && (
        <VideoPlayerOverlay 
          content={playingContent} 
          onClose={() => setPlayingContent(null)} 
        />
      )}
    </div>
  );
};

export default Home;
