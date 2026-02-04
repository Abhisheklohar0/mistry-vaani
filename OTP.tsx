import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

interface OTPProps {
  phone: string;
  onSuccess: () => void;
  onBack: () => void;
}

const OTPScreen: React.FC<OTPProps> = ({ phone, onSuccess, onBack }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = () => {
    if (otp.length === 4) {
      onSuccess();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0E0E0B] px-8 pt-12 animate-in slide-in-from-right duration-500">
      <button onClick={onBack} className="p-2 -ml-2 mb-10 w-fit text-[#A0A096] hover:text-[#FFD400] transition-colors">
        <ArrowLeft size={24} />
      </button>

      <div className="mb-12">
        <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Verify Phone</h2>
        <p className="text-[#A0A096] text-sm font-medium">
          Sent a 4-digit OTP to <span className="text-white font-bold">{phone}</span>
        </p>
      </div>

      <div className="space-y-10 flex-1">
        <div className="flex justify-between max-w-[280px] mx-auto">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`w-14 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                otp.length === i 
                  ? 'border-[#FFD400] bg-[#FFD400]/5 shadow-[0_0_15px_rgba(255,212,0,0.1)]' 
                  : (otp.length > i ? 'border-[#FFD400]/40 bg-transparent text-[#FFD400]' : 'border-[#242420] bg-[#161612]')
              }`}
            >
              {otp[i] || ''}
              {otp.length === i && <div className="w-0.5 h-6 bg-[#FFD400] animate-pulse"></div>}
            </div>
          ))}
          <input 
            type="tel"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="absolute opacity-0 pointer-events-none"
            autoFocus
          />
        </div>

        <div className="text-center">
          {timer > 0 ? (
            <p className="text-[12px] font-bold text-[#555550] uppercase tracking-widest">
              Resend OTP in <span className="text-white">{timer}s</span>
            </p>
          ) : (
            <button className="flex items-center space-x-2 mx-auto text-[12px] font-black text-[#FFD400] uppercase tracking-widest hover:opacity-80 transition-opacity">
              <RefreshCw size={12} />
              <span>Resend Now</span>
            </button>
          )}
        </div>
      </div>

      <div className="pb-12">
        <button 
          onClick={handleVerify}
          disabled={otp.length !== 4}
          className={`w-full py-4 rounded-full font-black text-[16px] uppercase tracking-tighter transition-all flex items-center justify-center space-x-2 ${
            otp.length === 4 
              ? 'bg-[#FFD400] text-black shadow-lg shadow-[#FFD400]/20 active:scale-95' 
              : 'bg-[#1C1C18] text-[#555550] opacity-50 cursor-not-allowed'
          }`}
        >
          <span>Verify & Log In</span>
          <CheckCircle2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default OTPScreen;