
import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>(1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1200),
      setTimeout(() => setStage(4), 1800),
      setTimeout(() => setStage(5), 2400),
      setTimeout(() => setStage(6), 3000),
      setTimeout(() => setStage(7), 3600),
      setTimeout(() => setStage(8), 4200),
      setTimeout(() => setStage(9), 4800),
      setTimeout(() => onComplete(), 5200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-[2000] bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-out
        ${stage <= 2 ? 'opacity-100 scale-100 rotate-1' : stage <= 4 ? 'opacity-30 scale-95 -rotate-2 blur-sm' : 'opacity-0 scale-75 blur-2xl'}`}>
        <div className={`w-[240px] h-[360px] bg-[#111] rounded-lg border border-white/5 shadow-2xl relative p-6 transition-all duration-700
          ${stage >= 2 ? 'translate-y-0 scale-100' : 'translate-y-8 scale-90 opacity-0'}`}>
          <svg width="100%" height="100%" viewBox="0 0 200 300" className="stroke-[#555] stroke-[1] fill-none">
            <path d="M20 20 L180 20" strokeDasharray="5 5" className="animate-draw" />
            <rect x="20" y="50" width="160" height="30" rx="2" strokeDasharray="3 7" />
            <rect x="20" y="90" width="75" height="100" rx="2" strokeDasharray="4 4" />
            <rect x="105" y="90" width="75" height="100" rx="2" strokeDasharray="4 4" />
            {/* Logo Preview */}
            <path d="M80 120 L100 160 L120 120" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          </svg>
          <div className="absolute bottom-4 left-6 font-mono text-[8px] text-[#444] uppercase tracking-widest">
            Model v1.0 / concept_04
          </div>
        </div>
      </div>

      <div className={`absolute inset-x-0 flex flex-col items-center transition-all duration-700 cubic-apple
        ${stage === 3 ? 'opacity-100 translate-y-0' : stage === 4 ? 'opacity-100 -translate-y-12' : 'opacity-0 translate-y-24 blur-xl'}`}>
        <div className="w-[280px] h-12 bg-[#1C1C18] rounded-full border border-white/10 flex items-center px-5 shadow-2xl relative overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFD400] mr-4 shadow-[0_0_10px_#FFD400]"></div>
          <div className="flex-1 overflow-hidden relative">
            <span className="text-[13px] text-[#A0A096] font-medium tracking-tight whitespace-nowrap">
              {stage >= 3 ? "Analyzing your voice query..." : ""}
            </span>
            {stage === 3 && <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#FFD400] animate-pulse"></div>}
          </div>
        </div>

        <div className={`mt-8 space-y-3 w-[260px] transition-all duration-700 delay-200
          ${stage === 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-14 bg-[#111] rounded-2xl border border-white/5 flex items-center px-4 space-x-4">
              <div className="w-8 h-8 rounded-lg bg-[#1C1C18] flex items-center justify-center">
                <div className="w-3 h-3 border border-[#FFD400]/40 rounded-sm"></div>
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="h-1.5 w-2/3 bg-white/10 rounded-full"></div>
                <div className="h-1.5 w-1/3 bg-white/5 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`absolute w-[280px] aspect-[3/4] transition-all duration-1000 cubic-apple
        ${stage === 5 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 blur-3xl'}`}>
        <div className="w-full h-full bg-[#1C1C18] rounded-[32px] border border-[#FFD400]/20 shadow-[0_0_50px_rgba(255,212,0,0.05)] relative overflow-hidden p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD400]/10 flex items-center justify-center mb-6">
             <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
               <path d="M15 20L50 85L85 20" stroke="#FFD400" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M30 20L50 60L70 20" stroke="#FFD400" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
             </svg>
          </div>
          <div className="h-3 w-32 bg-white/10 rounded-full mb-3"></div>
          <div className="h-2 w-48 bg-white/5 rounded-full mb-8"></div>
          <div className="flex-1 w-full space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-1 bg-white/[0.03] rounded-full w-full"></div>
            ))}
          </div>
        </div>
      </div>

      <div className={`relative flex flex-col items-center transition-all duration-[1200ms] cubic-apple
        ${stage <= 5 ? 'opacity-0 scale-50 blur-3xl' : stage >= 7 ? 'scale-100 opacity-100' : 'scale-125 opacity-100'}`}>
        
        <div className="relative group">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer V Animation */}
            <path 
              d="M15 20L50 85L85 20" 
              stroke="#FFD400" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={`transition-all duration-[1500ms] ${stage >= 7 ? 'dash-complete' : 'dash-hidden'}`}
              style={{ 
                strokeDasharray: 400, 
                strokeDashoffset: stage <= 6 ? 400 : 0 
              }}
            />
            {/* Inner V Detail */}
            <path 
              d="M30 20L50 60L70 20" 
              stroke="#FFD400" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={`transition-opacity duration-[2000ms] delay-500 ${stage >= 8 ? 'opacity-60' : 'opacity-0'}`}
            />
            {/* Sparkles appearing at the end */}
            <circle cx="15" cy="20" r="5" fill="white" className={`transition-all duration-[1000ms] delay-700 shadow-xl ${stage >= 8 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
            <circle cx="85" cy="20" r="5" fill="white" className={`transition-all duration-[1000ms] delay-800 shadow-xl ${stage >= 8 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
          </svg>
          <div className={`absolute inset-0 bg-[#FFD400] blur-[60px] rounded-full scale-150 transition-all duration-[2500ms]
            ${stage >= 8 ? 'opacity-[0.1]' : 'opacity-0'}`}></div>
        </div>

        <div className={`mt-10 flex flex-col items-center transition-all duration-[1500ms] ease-out
          ${stage >= 8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-white">Vaani FM</h1>
          <div className={`h-0.5 bg-[#FFD400] mt-3 rounded-full transition-all duration-[1500ms] delay-500
            ${stage >= 8 ? 'w-16 opacity-100' : 'w-0 opacity-0'}`}></div>
          <p className="mt-4 text-[10px] font-black text-[#555] uppercase tracking-[0.5em] opacity-80">Knowledge in High-Fidelity</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cubic-apple {
          transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
        }
        @keyframes draw {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw {
          stroke-dasharray: 200;
          animation: draw 2s ease forwards;
        }
        .dash-complete {
          transition: stroke-dashoffset 1.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .dash-hidden {
          stroke-dashoffset: 400;
        }
      `}} />
    </div>
  );
};

export default IntroAnimation;
