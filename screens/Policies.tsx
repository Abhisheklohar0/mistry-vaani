import React from 'react';
import { ArrowLeft, ShieldCheck, CreditCard, Info, AlertCircle, HelpCircle } from 'lucide-react';
import { APP_NAME } from '../constants';

interface PoliciesProps {
  onBack: () => void;
}

const Policies: React.FC<PoliciesProps> = ({ onBack }) => {
  return (
    <div className="h-full w-full bg-[#0E0E0B] flex flex-col overflow-y-auto hide-scrollbar z-[100] animate-in slide-in-from-bottom-4 duration-500">
      <div className="sticky top-0 bg-[#0E0E0B]/95 backdrop-blur-xl px-6 py-6 flex items-center justify-between z-10 border-b border-[#242420]">
        <button onClick={onBack} className="p-2 bg-[#1C1C18] rounded-full border border-[#242420] text-[#FFD400]">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white">Terms & Policies</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-6 py-8 space-y-10">
        <header className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Subscription & Refund Policy</h2>
          <p className="text-[11px] font-bold text-[#555550] uppercase tracking-widest">Effective Date: October 2023</p>
        </header>

        <section className="space-y-4">
          <div className="flex items-center space-x-3 text-[#FFD400]">
            <Info size={18} />
            <h3 className="text-sm font-black uppercase tracking-widest">1. Subscription Overview</h3>
          </div>
          <div className="bg-[#161612] p-5 rounded-[24px] border border-[#242420]">
            <p className="text-[13px] text-[#A0A096] leading-relaxed">
              {APP_NAME} provides a premium digital content streaming service through various subscription tiers. By subscribing, you gain immediate access to premium audiobooks, music, and exclusive voice content.
            </p>
          </div>
        </section>

        <section className="space-y-4 pb-12 text-center">
          <p className="text-[12px] text-[#A0A096] mb-4">
            For any billing discrepancies or questions regarding your account, please reach out to our dedicated support team.
          </p>
          <a href="mailto:support@vaanifm.com" className="text-[14px] font-black text-[#FFD400] underline tracking-tight">
            support@vaanifm.com
          </a>
        </section>
      </div>
    </div>
  );
};

export default Policies;