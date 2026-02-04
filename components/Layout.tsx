
import React from 'react';
import { Search, Bell, Tv, Lock, Info } from 'lucide-react';
import { Screen } from '../types';
import { TABS, APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onTabChange: (screen: Screen) => void;
  onToggleDocs: () => void;
  onSearchClick: () => void;
  isPremium: boolean;
  activePlanAmount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onTabChange, onToggleDocs, onSearchClick, isPremium, activePlanAmount }) => {
  const isShorts = activeScreen === Screen.SHORTS;
  const isSearch = activeScreen === Screen.SEARCH;
  const hasBasicPlan = activePlanAmount > 0;

  return (
    <div className="flex flex-col h-full w-full bg-[#0E0E0B] text-white relative">
      {!isShorts && !isSearch && (
        <div className="flex flex-col z-50 sticky top-0 shrink-0">
          {/* Top Brand Bar with Info Button - Restored */}
          <header className="px-6 h-14 flex items-center justify-between bg-black border-b border-white/[0.02]">
            <div className="flex items-center space-x-3">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
                <path d="M15 20L50 85L85 20" stroke="#FFD400" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-black tracking-[0.2em] uppercase text-white/90">{APP_NAME}</span>
            </div>
            <button 
              onClick={onToggleDocs}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#555550] hover:text-[#FFD400] transition-colors"
            >
              <Info size={16} />
            </button>
          </header>

          {/* Action Bar - Logo removed from here as requested */}
          <header className="px-6 h-14 flex items-center justify-between bg-black/95 backdrop-blur-xl border-b border-white/[0.03]">
            <div className="flex items-center">
              <span className="text-lg font-black tracking-tighter uppercase text-white">{APP_NAME}</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Tv size={20} className="text-[#A0A096] opacity-80" />
              <Bell size={20} className="text-[#A0A096] opacity-80" />
              <button onClick={onSearchClick}>
                <Search size={20} className="text-[#A0A096] opacity-80" />
              </button>
            </div>
          </header>
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
