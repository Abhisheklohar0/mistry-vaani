
import React from 'react';
import { Search, Mic, Info, Lock } from 'lucide-react';
import { Screen } from '../types';
import { TABS, THEME, APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onTabChange: (screen: Screen) => void;
  onToggleDocs: () => void;
  isPremium: boolean;
  activePlanAmount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onTabChange, onToggleDocs, isPremium, activePlanAmount }) => {
  const isShorts = activeScreen === Screen.SHORTS;
  const isSearch = activeScreen === Screen.SEARCH;
  const hasBasicPlan = activePlanAmount > 0;

  return (
    <div className="flex flex-col h-full w-full bg-[#0E0E0B] text-white relative">
      {!isShorts && !isSearch && (
        <div className="px-6 h-16 flex items-center justify-between z-20 border-b border-[#242420]/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                {/* Outer V */}
                <path d="M15 20L50 85L85 20" stroke="#FFD400" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                {/* Inner V */}
                <path d="M30 20L50 60L70 20" stroke="#FFD400" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                {/* Sparkles */}
                <circle cx="15" cy="20" r="3" fill="white" className="animate-pulse shadow-lg" />
                <circle cx="85" cy="20" r="3" fill="white" className="animate-pulse shadow-lg" />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full bg-[#FFD400]/20 blur-lg rounded-full -z-10"></div>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">{APP_NAME}</span>
          </div>
          <button onClick={onToggleDocs} className="p-2 bg-[#1C1C18] rounded-full border border-[#242420]">
            <Info size={20} className="text-[#A0A096]" />
          </button>
        </div>
      )}

      <main className={`flex-1 relative z-10 ${isShorts || isSearch ? 'pt-0 h-full' : 'pb-20 overflow-y-auto hide-scrollbar'}`}>
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-[#0E0E0B] border-t border-[#242420] flex items-center justify-around z-50">
        {TABS.map((tab) => {
          const isActive = activeScreen === tab.id;
          const isRestricted = (tab.id === Screen.HOME || tab.id === Screen.SHORTS) && !hasBasicPlan;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as Screen)}
              className="flex flex-col items-center justify-center space-y-1 w-full h-full group relative"
            >
              <div className="relative">
                {isRestricted ? (
                  <div className="relative">
                    <Icon size={20} className="text-[#333]" />
                    <div className="absolute -top-1.5 -right-1.5 bg-[#FFD400] rounded-full p-0.5 border border-black">
                      <Lock size={8} className="text-black" fill="currentColor" />
                    </div>
                  </div>
                ) : (
                  <Icon
                    size={20}
                    className={`${isActive ? 'text-[#FFD400]' : 'text-[#555550]'} group-hover:text-white transition-colors`}
                    fill={isActive ? '#FFD400' : 'none'}
                  />
                )}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-[#FFD400]' : 'text-[#555550]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
