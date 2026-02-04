
import React from 'react';
import { Mic, Video, Image, Type, Gem, ChevronRight } from 'lucide-react';

export default function CreatePost() {
  const POST_TYPES = [
    { icon: Mic, label: 'Audio Post', desc: 'Share your voice recordings' },
    { icon: Video, label: 'Video Post', desc: 'Short format video content' },
    { icon: Image, label: 'Image Post', desc: 'Visual storytelling' },
    { icon: Type, label: 'Text Post', desc: 'Write your thoughts' },
    { icon: Gem, label: 'VIP Content', desc: 'Multi-item collection post', vip: true },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0E0E0B] px-6 pt-8 pb-32 animate-in fade-in">
      <h1 className="text-2xl font-black uppercase tracking-tighter mb-2 text-white">Create <span className="text-[#FFD400]">Post</span></h1>
      <p className="text-[#555550] text-xs font-bold uppercase tracking-[0.2em] mb-10">Select content format</p>

      <div className="space-y-4">
        {POST_TYPES.map((type) => (
          <button 
            key={type.label}
            className={`w-full p-5 rounded-[28px] border bg-[#161612] flex items-center justify-between group active:scale-[0.98] transition-all ${type.vip ? 'border-[#FFD400]/20' : 'border-[#242420]'}`}
            onClick={() => alert(`Opening ${type.label} editor...`)}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 rounded-2xl bg-[#0E0E0B] border flex items-center justify-center transition-colors ${type.vip ? 'border-[#FFD400]/40 text-[#FFD400]' : 'border-[#242420] text-[#555550] group-hover:text-white'}`}>
                <type.icon size={22} fill={type.vip ? "currentColor" : "none"} fillOpacity={0.1} />
              </div>
              <div className="flex flex-col text-left">
                <span className={`font-black text-sm uppercase tracking-tight ${type.vip ? 'text-[#FFD400]' : 'text-white'}`}>{type.label}</span>
                <span className="text-[10px] font-bold text-[#555550] tracking-widest">{type.desc}</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#242420]" />
          </button>
        ))}
      </div>

      <div className="mt-auto p-6 rounded-[24px] bg-[#1C1C18] border border-[#242420] text-center">
        <p className="text-[10px] text-[#A0A096] leading-relaxed">
          By posting, you agree to our <span className="text-white font-black underline">Community Guidelines</span>. No adult or copyrighted content permitted.
        </p>
      </div>
    </div>
  );
}
