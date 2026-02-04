
import React, { useState, useEffect, useRef } from 'react';
/* Added Play to the lucide-react imports to fix the missing component error on line 108 */
import { ArrowLeft, Crown, Heart, Bookmark, Gem, ChevronRight, Volume2, VolumeX, Play } from 'lucide-react';
import { VipReadAllPost, PostItem } from '../types';

interface PostDetailProps {
  post: VipReadAllPost;
  isPremium: boolean;
  onBack: () => void;
  onPostItemClick: (item: PostItem) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, isPremium, onBack, onPostItemClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('vaani_mute') === 'true');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Background music for the series
    if (post.audioUrl) {
      audioRef.current = new Audio(post.audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
      audioRef.current.muted = isMuted;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [post.audioUrl]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    localStorage.setItem('vaani_mute', String(nextMuted));
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  return (
    <div className="h-full w-full bg-[#0E0E0B] flex flex-col overflow-y-auto hide-scrollbar animate-in slide-in-from-right duration-400 pb-20">
      {/* Series Hero Section - Strictly fixed to 4:5 aspect ratio (1080x1350) */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0B] via-black/20 to-transparent"></div>
        
        {/* Sticky-like Header Over Image */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
          <button onClick={onBack} className="w-10 h-10 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 active:scale-90 transition-transform">
            <ArrowLeft size={18} className="text-white" />
          </button>
          
          <button 
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-[#FFD400] active:scale-90 transition-transform"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        <div className="absolute bottom-10 left-8 right-8 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 rounded-full bg-[#FFD400] text-black text-[9px] font-black uppercase tracking-widest shadow-lg">
              VIP COLLECTION
            </div>
          </div>
          <h1 className="text-3xl font-black text-white leading-none uppercase tracking-tighter">{post.title}</h1>
          <p className="text-[12px] text-[#A0A096] font-medium leading-relaxed opacity-80 max-w-[80%]">
            {post.description}
          </p>
        </div>
      </div>

      {/* Series Chapters (Strictly related content) */}
      <div className="px-8 py-10 space-y-12">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <h2 className="text-[11px] font-black text-[#555550] uppercase tracking-[0.5em] flex items-center">
            <Gem size={14} className="mr-3 text-[#FFD400]" />
            Series Contents
          </h2>
          <span className="text-[11px] font-black text-[#FFD400] uppercase tracking-widest">{post.posts.length} Items</span>
        </div>
        
        <div className="space-y-16">
          {post.posts.map((chapter, index) => (
            <div 
              key={chapter.id}
              onClick={() => onPostItemClick(chapter)}
              className="flex flex-col space-y-6 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#FFD400] uppercase tracking-[0.3em] mb-1">CHAPTER {index + 1}</span>
                  <h3 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-[#FFD400] transition-colors">{chapter.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1C1C18] border border-white/5 flex items-center justify-center text-[#FFD400]">
                  <Play size={16} fill="currentColor" />
                </div>
              </div>

              {chapter.imageUrl && (
                <div className="w-full aspect-[16/10] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl relative">
                  <img src={chapter.imageUrl} alt={chapter.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center space-x-2">
                     <span className="text-[10px] font-bold text-white uppercase tracking-widest opacity-60">Full Preview Available</span>
                  </div>
                </div>
              )}
              
              <p className="text-[13px] text-[#A0A096] font-medium leading-relaxed italic opacity-60 px-2 border-l border-[#FFD400]/20">
                "{chapter.preview}"
              </p>
            </div>
          ))}

          {/* Luxury Footer */}
          <div className="py-24 flex flex-col items-center">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#FFD400]/20 to-transparent rounded-full mb-6"></div>
            <p className="text-[9px] font-black text-[#333] uppercase tracking-[0.8em]">End of Collection</p>
            <button 
              onClick={onBack}
              className="mt-8 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-[#A0A096] uppercase tracking-widest hover:text-white transition-colors"
            >
              Return to Feed
            </button>
          </div>
        </div>
      </div>

      {/* Action Bar Floating at Bottom (Optional addition for Premium Detail) */}
      <div className="fixed bottom-6 left-8 right-8 flex items-center justify-between bg-black/60 backdrop-blur-2xl px-6 py-4 rounded-full border border-white/10 z-50">
        <div className="flex items-center space-x-6">
          <button onClick={() => setIsLiked(!isLiked)} className={`transition-all ${isLiked ? 'text-red-500 scale-110' : 'text-white'}`}>
            <Heart size={22} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button onClick={() => setIsSaved(!isSaved)} className={`transition-all ${isSaved ? 'text-[#FFD400] scale-110' : 'text-white'}`}>
            <Bookmark size={22} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
        <button className="bg-[#FFD400] text-black px-6 py-2 rounded-full font-black text-[11px] uppercase tracking-widest active:scale-95 transition-transform">
          Add To Library
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
