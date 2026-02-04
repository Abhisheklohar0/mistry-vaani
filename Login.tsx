
import React, { useState } from 'react';
import { ChevronRight, Phone } from 'lucide-react';
import { APP_NAME } from '../constants';

interface LoginProps {
  onLogin: (phone: string) => void;
}

const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      onLogin(`+91${phone}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0E0E0B] px-8 pt-20 animate-in fade-in">
      <div className="flex flex-col items-center mb-16">
        <div className="w-24 h-24 rounded-[32px] bg-[#1C1C18] border border-[#242420] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,212,0,0.1)] relative group">
          <div className="absolute inset-0 bg-[#FFD400]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
            {/* Main V */}
            <path d="M15 20L50 85L85 20" stroke="#FFD400" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Detail V */}
            <path d="M30 20L50 60L70 20" stroke="#FFD400" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            {/* Sparkles */}
            <circle cx="15" cy="20" r="4" fill="white" className="animate-pulse" />
            <circle cx="85" cy="20" r="4" fill="white" className="animate-pulse" />
          </svg>
        </div>
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 text-white">{APP_NAME}</h1>
        <p className="text-[#A0A096] text-[10px] font-black uppercase tracking-[0.4em]">Sign in to your voice</p>
      </div>

      <div className="space-y-8 flex-1">
        <div className="space-y-4">
          <label className="text-[11px] font-black text-[#555550] uppercase tracking-[0.2em] ml-1">Enter Mobile Number</label>
          <div className="flex items-center bg-[#161612] border border-[#242420] rounded-2xl overflow-hidden focus-within:border-[#FFD400]/40 transition-all">
            <div className="px-5 py-4 text-[#A0A096] font-bold border-r border-[#242420] bg-black/20">
              +91
            </div>
            <input 
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="00000 00000"
              className="bg-transparent border-none outline-none flex-1 px-5 py-4 text-lg font-black tracking-widest text-white placeholder-[#242420]"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="pb-16">
        <button 
          onClick={handleSubmit}
          disabled={phone.length !== 10}
          className={`w-full py-5 rounded-full font-black text-[16px] uppercase tracking-tighter transition-all flex items-center justify-center space-x-2 ${
            phone.length === 10 
              ? 'bg-[#FFD400] text-black shadow-xl active:scale-95' 
              : 'bg-[#1C1C18] text-[#555550] opacity-50 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
