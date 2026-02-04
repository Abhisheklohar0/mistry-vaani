
import React, { useState, useEffect, useRef } from 'react';
import { Star, Check, Shield, Play, Crown, Gem, Heart, Bookmark, Zap, Volume2, VolumeX, Sparkles, Lock, ChevronRight } from 'lucide-react';
import { VIP_READ_ALL_POSTS } from '../constants';
import { VipReadAllPost } from '../types';

interface PremiumProps {
  onPaymentSuccess?: (amount: number) => void;
  activePlanAmount: number;
  onVipPostClick?: (post: VipReadAllPost) => void;
}

const Premium: React.FC<PremiumProps> = ({ onPaymentSuccess, activePlanAmount, onVipPostClick }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('vaani_mute') === 'true');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isElite = activePlanAmount >= 15000;
  const isSubscribedToBasic = activePlanAmount === 499;

  useEffect(() => {
    // Initial audio setup for the section (Elite Feed Only)
    if (isElite && VIP_READ_ALL_POSTS.length > 0) {
      const firstPost = VIP_READ_ALL_POSTS[0];
      if (firstPost.audioUrl) {
        audioRef.current = new Audio(firstPost.audioUrl);
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
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isElite]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    localStorage.setItem('vaani_mute', String(nextMuted));
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Upgrade Path: 0 -> 499 -> 15000
      const nextAmount = activePlanAmount === 499 ? 15000 : 499;
      onPaymentSuccess?.(nextAmount);
    }, 2000);
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ELITE FEED (Shown ONLY after 15k plan is active)
  if (isElite) {
    return (
      <div className="flex flex-col h-full bg-[#0E0E0B] overflow-y-auto hide-scrollbar pb-32">
        <div className="sticky top-0 z-50 bg-[#0E0E0B]/80 backdrop-blur-lg px-6 py-4 flex items-center justify-between border-b border-white/[0.03]">
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <Crown size={10} className="text-[#FFD400]" fill="#FFD400" />
              <span className="text-[8px] font-black text-[#FFD400]/60 uppercase tracking-[0.3em]">Elite Membership</span>
            </div>
            <h1 className="text-[18px] font-black text-white tracking-tighter uppercase leading-none mt-0.5">VIP POST FEED</h1>
          </div>
          
          <div className="flex items-center space-x-4">
             <button 
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-[#1C1C18] border border-[#242420] flex items-center justify-center text-[#FFD400] active:scale-90 transition-transform"
             >
               {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
             </button>
             <Gem size={20} className="text-[#FFD400]" />
          </div>
        </div>

        <div className="space-y-12 pt-4">
          {VIP_READ_ALL_POSTS.map((post) => (
            <div key={post.post_id} className="border-b border-white/[0.02] pb-10 animate-in fade-in">
              {/* Aspect Ratio fixed to 4:5 as requested (1080x1350) */}
              <div className="w-full aspect-[4/5] relative cursor-pointer overflow-hidden" onClick={() => onVipPostClick?.(post)}>
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
                
                <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full border border-white/10 flex items-center space-x-1.5 backdrop-blur-md">
                  <Gem size={10} className="text-[#FFD400]" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">VIP SERIES</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                   <h3 className="text-[20px] font-black text-white uppercase tracking-tighter leading-none">{post.title}</h3>
                   <p className="text-[11px] text-[#A0A096] font-medium opacity-80 mt-2 flex items-center">
                     <Play size={10} className="mr-1.5 fill-[#FFD400] text-[#FFD400]" />
                     Tap to expand {post.posts.length} Chapters
                   </p>
                </div>
              </div>

              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <button onClick={(e) => toggleLike(e, post.post_id)} className="text-white active:scale-125 transition-transform">
                    <Heart size={26} className={likedPosts[post.post_id] ? 'text-red-500' : ''} fill={likedPosts[post.post_id] ? 'currentColor' : 'none'} />
                  </button>
                  <button onClick={(e) => toggleSave(e, post.post_id)} className="text-white active:scale-125 transition-transform">
                    <Bookmark size={26} className={savedPosts[post.post_id] ? 'text-[#FFD400]' : ''} fill={savedPosts[post.post_id] ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <button 
                  onClick={() => onVipPostClick?.(post)} 
                  className="bg-[#FFD400] px-6 py-2.5 rounded-full text-[11px] font-black text-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,212,0,0.15)] active:scale-95 transition-all"
                >
                  SEE ALL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SHARED SUBSCRIPTION/UPGRADE UI
  return (
    <div className="flex flex-col h-full bg-[#0E0E0B] overflow-y-auto hide-scrollbar pb-32">
      {/* Dynamic Header State */}
      <div className="px-6 pt-10 text-center animate-in fade-in">
        {isSubscribedToBasic ? (
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight uppercase leading-none text-white">
              YOU ARE <span className="text-[#FFD400]">PRO</span>
            </h1>
            <p className="text-[11px] font-bold text-[#A0A096] uppercase tracking-widest mt-2">Activate Diamond upgrade below</p>
          </div>
        ) : (
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight uppercase leading-none text-white">
              1 Day <span className="text-[#FFD400]">FREE</span> Trial
            </h1>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <div className="flex text-[#FFD400]">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={10} fill="#FFD400" />)}
              </div>
              <span className="text-[10px] text-[#A0A096] font-bold uppercase tracking-widest ml-1">4.6 (10L+ Reviews)</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Preview Card */}
      <div className="px-6 mt-8">
        <div className={`w-full aspect-video rounded-[24px] overflow-hidden relative border shadow-2xl transition-all duration-700 ${isSubscribedToBasic ? 'border-[#FFD400]/40 ring-4 ring-[#FFD400]/5' : 'border-[#242420]'} bg-[#161612]`}>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
             {isSubscribedToBasic ? (
               <div className="flex flex-col items-center">
                 <Gem size={48} className="text-[#FFD400] mb-4 drop-shadow-[0_0_25px_rgba(255,212,0,0.6)] animate-pulse" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">DIAMOND ELITE PREVIEW</span>
               </div>
             ) : (
               <div className="flex flex-col items-center">
                 <Lock size={48} className="text-[#FFD400] mb-4 drop-shadow-[0_0_15px_rgba(255,212,0,0.5)]" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Content Locked</span>
               </div>
             )}
          </div>
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-white uppercase tracking-widest">
               {isSubscribedToBasic ? 'Standard Plan Active' : 'Premium Access Required'}
             </span>
          </div>
        </div>
      </div>

      {/* Feature List & Pricing Info */}
      <div className="px-6 mt-8 space-y-4">
        <div className="bg-[#161612] rounded-[24px] p-6 border border-[#242420] space-y-6">
          <div className="flex items-start space-x-4">
            <Check size={20} className="text-green-500 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[14px] font-black text-white uppercase tracking-tight">
                {isSubscribedToBasic ? 'Upgrade to Diamond VIP' : 'Unlock Home & Shorts Tab'}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isSubscribedToBasic ? 'text-[#FFD400]' : 'text-red-500'}`}>
                {isSubscribedToBasic ? 'Start Diamond Trial for ₹1' : 'Start Trial for ₹1'}
              </span>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Shield size={20} className="text-blue-400 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[14px] font-black text-white uppercase tracking-tight">
                {isSubscribedToBasic ? 'After 1 Day: ₹15,000 auto-debit' : 'After 1 Day: ₹499 auto-debit'}
              </span>
              <span className="text-[10px] text-[#A0A096] font-bold uppercase tracking-widest">
                UPI AutoPay Enabled • Cancel Anytime
              </span>
            </div>
          </div>
        </div>

        {/* Payment CTA Section - Icons always visible for trust */}
        <div className="pt-4 flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <p className="text-[10px] text-[#555550] font-bold uppercase tracking-[0.2em] mb-4">Supported Payment Gateway</p>
            <div className="flex items-center space-x-6 opacity-30 grayscale contrast-125">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="w-full grayscale brightness-200" alt="UPI" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" className="w-full grayscale brightness-200" alt="PhonePe" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg" className="w-full grayscale brightness-200" alt="GPay" />
              </div>
            </div>
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full py-5 rounded-full font-black text-[16px] transition-all uppercase tracking-tighter shadow-2xl flex items-center justify-center space-x-3 ${
              isProcessing 
                ? 'bg-[#1C1C18] text-[#555550]' 
                : 'bg-[#FFD400] text-black active:scale-[0.97] ring-4 ring-[#FFD400]/20'
            }`}
          >
            {isProcessing ? (
              <span>Processing Securely...</span>
            ) : (
              <>
                <span>Pay ₹1 & {isSubscribedToBasic ? 'Upgrade to Diamond Pro' : 'Unlock Full Access'}</span>
                <ChevronRight size={18} />
              </>
            )}
          </button>
          
          <div className="mt-8 flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <Shield size={10} className="text-[#333]" />
              <p className="text-[9px] font-bold text-[#333] uppercase tracking-[0.4em]">Secure Encryption by PhonePe</p>
            </div>
            <p className="text-[8px] text-[#222] font-black uppercase tracking-widest opacity-40">Auto-renewal active from Day 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
