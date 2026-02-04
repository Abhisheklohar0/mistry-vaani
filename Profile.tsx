import React, { useState } from 'react';
import { APP_NAME } from '../constants';
import { Settings, LogOut, ChevronRight, Zap, ChevronDown, ChevronUp, FileText, CreditCard, User, History, Download, Mic, CheckCircle2 } from 'lucide-react';
import { AuthUser } from '../types';

interface ProfileProps {
  user: AuthUser | null;
  onLogout: () => void;
  onOpenPolicies?: () => void;
  onPlanActivated?: (amount: number) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onOpenPolicies, onPlanActivated }) => {
  const [isPlansExpanded, setIsPlansExpanded] = useState(false);

  const PLANS = [
    { amount: 1000, label: 'Starter Pro' },
    { amount: 5000, label: 'Silver Pro' },
    { amount: 10000, label: 'Gold Pro' },
    { amount: 15000, label: 'Diamond Pro', isElite: true },
    { amount: 20000, label: 'Elite Pro', isElite: true },
  ];

  const handleAdminActivate = (amount: number) => {
    onPlanActivated?.(amount);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-32 overflow-y-auto h-full hide-scrollbar">
      {/* Header Identity with Premium Styling */}
      <div className="px-6 pt-12 flex flex-col items-center">
        <div className="absolute top-6 right-8 text-right">
          <p className="text-[10px] font-black text-[#555550] uppercase tracking-widest leading-none">Voice Hub</p>
          <p className="text-[12px] font-black text-white tracking-tight mt-1">{user?.phone || '+91 XXXX'}</p>
        </div>

        <div className="relative group">
          {/* Subtle Glow behind profile */}
          <div className="absolute inset-0 bg-[#FFD400]/10 blur-3xl rounded-full transition-opacity group-hover:opacity-100"></div>
          
          <div className="w-24 h-24 rounded-full border-2 border-[#242420] overflow-hidden p-1.5 bg-[#1C1C18] relative z-10 shadow-2xl">
            <div className="w-full h-full rounded-full bg-[#161612] flex items-center justify-center border border-white/5 shadow-inner">
              <User size={40} className="text-[#FFD400] opacity-40" />
            </div>
          </div>
          
          <div className="absolute bottom-1 right-1 bg-[#FFD400] p-1 rounded-full border-2 border-[#0E0E0B] z-20 shadow-lg">
            <CheckCircle2 size={12} className="text-black" />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-1">
             <div className="w-1 h-1 rounded-full bg-[#FFD400]/40"></div>
             <span className="text-[9px] font-black text-[#FFD400] uppercase tracking-[0.4em] opacity-80">Authenticated</span>
             <div className="w-1 h-1 rounded-full bg-[#FFD400]/40"></div>
          </div>
          
          <h2 className="text-2xl font-serif font-black uppercase tracking-tight text-center flex flex-col items-center">
            <span className="text-white text-lg tracking-[0.1em] opacity-90">Verified</span>
            <span className="premium-gold-text text-3xl leading-none mt-1">Listener</span>
          </h2>
        </div>

        <p className="text-[10px] font-mono text-[#333] tracking-[0.3em] mt-4 opacity-60 bg-[#1C1C18]/40 px-3 py-1 rounded-full border border-white/5">
          VAANI-ID: {user?.uid?.split('_')[2] || 'OFFICIAL'}
        </p>
      </div>

      <div className="px-6 space-y-3 mt-12">
        <MenuHeader label="My Collection" />
        <MenuItem icon={Mic} label="My Recordings" badge="0" />
        <MenuItem icon={Download} label="Offline Access" badge="Ready" />
        <MenuItem icon={History} label="Listening History" />

        <div className="h-4"></div>
        <MenuHeader label="Subscription & Elite Hub" />
        
        {/* Expandable Subscription Plan (Admin Mode Friendly) */}
        <div className="mt-2">
          <button 
            onClick={() => setIsPlansExpanded(!isPlansExpanded)}
            className={`w-full text-left p-5 rounded-[24px] bg-[#1C1C18] border transition-all ${isPlansExpanded ? 'border-[#FFD400]/40 ring-1 ring-[#FFD400]/10 shadow-xl' : 'border-[#242420]'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-xl bg-[#0E0E0B] text-[#FFD400]">
                  <Zap size={20} fill="#FFD400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-white text-sm uppercase tracking-tight">Subscription Plans</span>
                  <span className="text-[10px] font-bold text-[#555550]">₹1 Trial • Auto-debit from Day 2</span>
                </div>
              </div>
              {isPlansExpanded ? <ChevronUp size={20} className="text-[#FFD400]" /> : <ChevronDown size={20} className="text-[#555550]" />}
            </div>

            {isPlansExpanded && (
              <div className="mt-6 space-y-3 pt-6 border-t border-[#242420] animate-in slide-in-from-top-2">
                {PLANS.map((plan) => (
                  <div key={plan.label} className={`flex items-center justify-between p-4 rounded-2xl bg-[#0E0E0B] border hover:border-[#FFD400]/20 transition-all ${plan.isElite ? 'border-white/5' : 'border-transparent'}`}>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-white text-[13px]">{plan.label}</h4>
                      <p className="text-[9px] text-[#A0A096] font-medium mt-0.5">₹1 Trial • ₹{plan.amount.toLocaleString()} Auto-debit</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAdminActivate(plan.amount); }}
                      className="px-4 py-2 rounded-full bg-[#FFD400] text-black text-[10px] font-black uppercase tracking-tight active:scale-95 transition-transform"
                    >
                      Activate
                    </button>
                  </div>
                ))}
              </div>
            )}
          </button>
        </div>

        <div className="h-4"></div>
        <MenuHeader label="System Settings" />
        <MenuItem icon={CreditCard} label="Billing History" />
        <MenuItem icon={Settings} label="App Preferences" />
        <MenuItem icon={FileText} label="Terms & Policies" onClick={onOpenPolicies} />
        
        <button onClick={onLogout} className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10 mt-6 active:bg-red-500/10 transition-colors">
          <LogOut size={18} className="text-red-500/80" />
          <span className="font-bold text-sm text-red-500/80 uppercase tracking-widest">Logout from VaaniFM</span>
        </button>
      </div>

      <div className="py-20 text-center opacity-5">
        <p className="text-[8px] font-black uppercase tracking-[0.8em]">Secure Craftsmanship @ 2024</p>
      </div>
    </div>
  );
};

const MenuHeader = ({ label }: { label: string }) => (
  <h3 className="text-[11px] font-black text-[#555550] uppercase tracking-[0.25em] mb-2 ml-4">{label}</h3>
);

const MenuItem = ({ icon: Icon, label, badge, onClick }: any) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#1C1C18]/60 border border-[#242420] active:bg-white/[0.03] transition-all">
    <div className="flex items-center space-x-4">
      <Icon size={18} className="text-[#555550]" />
      <span className="font-bold text-sm text-white uppercase tracking-tight">{label}</span>
    </div>
    <div className="flex items-center space-x-3">
      {badge && <span className="bg-[#FFD400] text-black text-[10px] font-black px-2 py-0.5 rounded-full">{badge}</span>}
      <ChevronRight size={18} className="text-[#242420]" />
    </div>
  </button>
);

export default Profile;