
import React, { useState, useRef, useEffect } from 'react';
import { SHORTS_DATA, APP_NAME } from '../constants';
import { Heart, MessageCircle, Share2, Volume2, VolumeX, Play, Pause, X, Send, User, CheckCircle2 } from 'lucide-react';
import { Short, Comment } from '../types';

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (text: string) => void;
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({ isOpen, onClose, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] animate-in slide-in-from-bottom duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-[#161612] rounded-t-[32px] border-t border-white/10 flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#161612]">
          <div className="flex flex-col">
            <h3 className="text-[16px] font-black text-white uppercase tracking-tighter">Community Voice</h3>
            <span className="text-[10px] text-[#555550] font-bold uppercase tracking-widest">{comments.length} Comments</span>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full border border-white/5 active:scale-90 transition-transform">
            <X size={20} className="text-[#A0A096]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar bg-[#161612]">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4 animate-in fade-in slide-in-from-left-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD400]/20 to-[#1C1C18] border border-white/5 flex items-center justify-center flex-shrink-0">
                 <User size={16} className="text-[#FFD400]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-black text-white tracking-tight uppercase">{comment.userName}</span>
                  <span className="text-[9px] text-[#555550] font-medium">{comment.timestamp}</span>
                </div>
                <p className="text-[13px] text-[#A0A096] leading-relaxed font-medium">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
              <MessageCircle size={48} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest">No voices yet. Start the talk.</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-[#0E0E0B] border-t border-white/5 flex items-center space-x-3">
          <div className="flex-1 h-12 bg-[#1C1C18] rounded-full border border-white/10 flex items-center px-5 focus-within:border-[#FFD400]/40 transition-all">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What's your take?"
              className="bg-transparent border-none outline-none flex-1 text-sm text-white placeholder-[#333] font-medium"
            />
          </div>
          <button 
            type="submit"
            disabled={!newComment.trim()}
            className="w-12 h-12 bg-[#FFD400] rounded-full flex items-center justify-center text-black disabled:opacity-30 active:scale-95 transition-transform"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

interface ShortVideoItemProps {
  short: Short;
  isMuted: boolean;
  onToggleMute: () => void;
  isActive: boolean;
}

const ShortVideoItem: React.FC<ShortVideoItemProps> = ({ short, isMuted, onToggleMute, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [hasLiked, setHasLiked] = useState(() => localStorage.getItem(`vaani_real_liked_${short.id}`) === 'true');
  const [localComments, setLocalComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`vaani_real_comments_${short.id}`);
    return saved ? JSON.parse(saved) : (short.initialComments || []);
  });

  const [showStatusIndicator, setShowStatusIndicator] = useState<'play' | 'pause' | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(e => console.log("Auto-play blocked:", e));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !hasLiked;
    setHasLiked(newState);
    localStorage.setItem(`vaani_real_liked_${short.id}`, String(newState));
  };

  const togglePlayback = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.side-actions') || (e.target as HTMLElement).closest('.bottom-comment-bar')) return;
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        triggerIndicator('pause');
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        triggerIndicator('play');
      }
    }
  };

  const triggerIndicator = (type: 'play' | 'pause') => {
    setShowStatusIndicator(type);
    setTimeout(() => setShowStatusIndicator(null), 800);
  };

  const handleAddComment = (text: string) => {
    const savedUser = localStorage.getItem('vaani_user');
    const userData = savedUser ? JSON.parse(savedUser) : null;
    const phonePart = userData?.phone ? userData.phone.slice(-4) : 'User';
    const newCommentObj: Comment = { id: Date.now().toString(), userName: `V_${phonePart}`, text: text, timestamp: 'Just now' };
    const updatedComments = [newCommentObj, ...localComments];
    setLocalComments(updatedComments);
    localStorage.setItem(`vaani_real_comments_${short.id}`, JSON.stringify(updatedComments));
  };

  return (
    <div 
      data-id={short.id}
      className="h-full w-full relative snap-start snap-always overflow-hidden bg-black flex flex-col"
      onClick={togglePlayback}
    >
      <div className="flex-1 w-full relative flex items-center justify-center bg-black">
        {short.videoUrl ? (
          <video 
            ref={videoRef}
            src={short.videoUrl} 
            className="w-full h-full object-contain" 
            loop 
            muted={isMuted}
            playsInline
            poster={short.videoThumbnail}
          />
        ) : (
          <img src={short.videoThumbnail} alt={short.title} className="w-full h-full object-contain" />
        )}
        
        {showStatusIndicator && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none animate-in zoom-in fade-out duration-500">
            <div className="bg-black/40 p-8 rounded-full backdrop-blur-sm">
              {showStatusIndicator === 'play' ? <Play size={48} className="text-white fill-white" /> : <Pause size={48} className="text-white fill-white" />}
            </div>
          </div>
        )}
      </div>

      <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6 z-30 side-actions">
        <button onClick={toggleLike} className="flex flex-col items-center">
          <Heart size={28} className={hasLiked ? 'text-[#FFD400] drop-shadow-lg' : 'text-white'} fill={hasLiked ? '#FFD400' : 'none'} />
          <span className="text-[11px] font-bold text-white mt-1 uppercase">{hasLiked ? 1 : 0}</span>
        </button>
        <button onClick={() => setIsCommentsOpen(true)} className="flex flex-col items-center">
          <MessageCircle size={28} className="text-white" />
          <span className="text-[11px] font-bold text-white mt-1 uppercase">{localComments.length}</span>
        </button>
        <Share2 size={28} className="text-white" />
      </div>

      <div className="absolute bottom-28 left-6 right-20 z-30 pointer-events-none">
        <div className="flex items-center space-x-2 mb-2">
          <div className="px-2 py-0.5 rounded-md bg-[#FFD400] text-black text-[8px] font-black tracking-widest uppercase shadow-lg">
            {short.category}
          </div>
          <div className="flex items-center">
            <span className="text-[13px] font-black text-white uppercase tracking-tight">{APP_NAME}</span>
            <CheckCircle2 
              size={13} 
              className="text-[#FFD400] ml-1" 
              fill="#FFD400" 
              fillOpacity={0.2}
              strokeWidth={3}
            />
          </div>
        </div>
        <h3 className="text-[16px] font-bold text-white leading-tight drop-shadow-md uppercase tracking-tight">{short.title}</h3>
      </div>

      <div className="h-20 bg-black flex items-center justify-center px-4 bottom-comment-bar border-t border-white/[0.03]">
        <div 
          onClick={() => setIsCommentsOpen(true)}
          className="w-full h-11 bg-[#1C1C18] rounded-full flex items-center px-6 cursor-pointer border border-white/5"
        >
          <span className="text-[#555550] text-[13px] font-black uppercase tracking-widest">Add a voice...</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-40">
        <button onClick={(e) => { e.stopPropagation(); onToggleMute(); }} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <CommentDrawer 
        isOpen={isCommentsOpen} 
        onClose={() => setIsCommentsOpen(false)} 
        comments={localComments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default function Shorts() {
  const [isMuted, setIsMuted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(SHORTS_DATA[0]?.id || null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          if (id) setActiveId(id);
        }
      });
    }, { root: containerRef.current, threshold: 0.8 });
    const elements = containerRef.current?.querySelectorAll('[data-id]');
    elements?.forEach((el) => observer.observe(el));
    return () => elements?.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar bg-black">
      {SHORTS_DATA.map((short) => (
        <ShortVideoItem 
          key={short.id} 
          short={short} 
          isMuted={isMuted}
          isActive={activeId === short.id}
          onToggleMute={() => setIsMuted(!isMuted)}
        />
      ))}
    </div>
  );
}
