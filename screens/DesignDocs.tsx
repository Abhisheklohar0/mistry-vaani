
import React from 'react';
import { ArrowLeft, Instagram, ExternalLink, User, ShieldCheck, Globe } from 'lucide-react';
import { THEME, APP_NAME } from '../constants';

const VaaniLogo = ({ size = 64, color = "#FFD400" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 20L50 85L85 20" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 20L50 60L70 20" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    <circle cx="15" cy="20" r="4" fill="white" className="animate-pulse" />
    <circle cx="85" cy="20" r="4" fill="white" className="animate-pulse" />
  </svg>
);

const DesignDocs: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="h-full w-full bg-[#0E0E0B] flex flex-col overflow-y-auto hide-scrollbar z-[100] animate-in slide-in-from-right duration-500 pb-10">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-[#0E0E0B]/95 backdrop-blur-xl px-6 py-6 flex items-center justify-between z-10 border-b border-[#242420]">
        <button onClick={onClose} className="p-2 bg-[#1C1C18] rounded-full border border-[#242420] active:scale-90 transition-transform">
          <ArrowLeft size={20} className="text-[#FFD400]" />
        </button>
        <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white">App Information</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-6 space-y-8 py-8">
        {/* Branding Section */}
        <div className="flex flex-col items-center text-center py-6">
          <div className="relative">
            <VaaniLogo size={60} />
            <div className="absolute -inset-4 bg-[#FFD400]/10 blur-2xl rounded-full -z-10"></div>
          </div>
          <h2 className="text-2xl font-black tracking-tighter mt-4 uppercase text-white">{APP_NAME}</h2>
          <p className="text-[9px] font-black text-[#555550] uppercase tracking-[0.4em] mt-1">Version 2.4.0 (PRO)</p>
        </div>

        {/* SECTION 1: APP OWNER */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-[#FFD400]">
            <User size={14} className="opacity-70" />
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-70">App Owner</h3>
          </div>
          <div className="p-5 rounded-[24px] bg-[#161612] border border-[#242420] flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1C1C18] border border-[#242420] flex items-center justify-center">
                <User size={22} className="text-[#555550] group-hover:text-[#FFD400] transition-colors" />
              </div>
              <div>
                <h4 className="font-bold text-white text-[16px] tracking-tight">Abhishek Lohar</h4>
                <div className="flex items-center space-x-1.5 mt-1">
                  <div className="p-1 bg-[#FFD400]/10 rounded-md">
                    <Instagram size={10} className="text-[#FFD400]" />
                  </div>
                  <span className="text-[12px] text-[#A0A096] font-semibold tracking-tight">@Abhisheklohar.in</span>
                </div>
              </div>
            </div>
            <a 
              href="https://www.instagram.com/Abhisheklohar.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-[#1C1C18] rounded-xl border border-[#242420] text-[#A0A096] hover:text-[#FFD400] hover:border-[#FFD400]/30 transition-all active:scale-90"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </section>

        {/* SECTION 2: OFFICIAL APP ACCOUNT */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-[#FFD400]">
            <ShieldCheck size={14} className="opacity-70" />
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-70">Official Instagram</h3>
          </div>
          <div className="p-5 rounded-[24px] bg-[#161612] border border-[#242420] flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD400]/5 border border-[#FFD400]/10 flex items-center justify-center shadow-lg">
                <VaaniLogo size={26} />
              </div>
              <div>
                <h4 className="font-bold text-white text-[16px] tracking-tight">{APP_NAME} Official</h4>
                <div className="flex items-center space-x-1.5 mt-1">
                  <div className="p-1 bg-[#FFD400]/20 rounded-md">
                    <Instagram size={10} className="text-[#FFD400]" />
                  </div>
                  <span className="text-[12px] text-[#FFD400] font-black tracking-tight">@VaaniFm.in</span>
                </div>
              </div>
            </div>
            <a 
              href="https://instagram.com/VaaniFm.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-[#FFD400]/10 rounded-xl border border-[#FFD400]/20 text-[#FFD400] hover:bg-[#FFD400]/20 transition-all active:scale-90"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </section>

        {/* SECTION 3: PORTFOLIO */}
        <section className="pt-12 flex flex-col items-center">
          <a 
            href="https://abhisheklohar.netlify.app/" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-3 px-8 py-3.5 rounded-full bg-transparent border border-[#242420] hover:border-[#FFD400]/30 transition-all active:scale-95 shadow-xl"
          >
            <Globe size={14} className="text-[#555550] group-hover:text-[#FFD400] transition-colors" />
            <span className="text-[10px] font-black text-[#555550] uppercase tracking-[0.25em] group-hover:text-white transition-colors">View Portfolio</span>
          </a>
          
          <div className="mt-12 flex flex-col items-center space-y-4">
             <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#242420] to-transparent rounded-full"></div>
             <p className="text-[8px] text-[#333] font-black uppercase tracking-[0.4em] text-center max-w-[220px] leading-relaxed">
               Securely Crafted for Premium Listeners
             </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignDocs;
