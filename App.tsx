
import React, { useState, useEffect } from 'react';
import { Screen, AuthUser, VipReadAllPost } from './types';
import Layout from './components/Layout';
import HomeContent from './screens/Home';
import ShortsContent from './screens/Shorts';
import CreatePost from './screens/CreatePost';
import PremiumContent from './screens/Premium';
import ProfileContent from './screens/Profile';
import SearchScreen from './screens/Search';
import DesignDocs from './screens/DesignDocs';
import LoginScreen from './screens/Login';
import OTPScreen from './screens/OTP';
import PoliciesScreen from './screens/Policies';
import PostDetail from './screens/PostDetail';
import IntroAnimation from './components/IntroAnimation';

const App: React.FC = () => {
  const [isPremium, setIsPremium] = useState<boolean>(() => localStorage.getItem('vaani_premium_active') === 'true');
  const [activePlanAmount, setActivePlanAmount] = useState<number>(() => Number(localStorage.getItem('vaani_plan_amount')) || 0);
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('vaani_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [activeScreen, setActiveScreen] = useState<Screen>(() => {
    if (!localStorage.getItem('vaani_user')) return Screen.LOGIN;
    const currentPlan = Number(localStorage.getItem('vaani_plan_amount')) || 0;
    return currentPlan > 0 ? Screen.HOME : Screen.PREMIUM;
  });
  const [selectedPost, setSelectedPost] = useState<VipReadAllPost | null>(null);
  const [showDocs, setShowDocs] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(() => !localStorage.getItem('vaani_intro_played'));
  const [pendingPhone, setPendingPhone] = useState('');

  const handleLoginSubmit = (phone: string) => {
    setPendingPhone(phone);
    setActiveScreen(Screen.OTP);
  };

  const handleOTPSuccess = () => {
    const newUser: AuthUser = { 
      uid: `VAANI_${pendingPhone.replace('+', '')}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`, 
      phone: pendingPhone, 
      lastLogin: new Date().toISOString(),
      role: 'admin'
    };
    localStorage.setItem('vaani_user', JSON.stringify(newUser));
    setUser(newUser);
    setActiveScreen(Screen.PREMIUM);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handlePlanActivated = (amount: number) => {
    localStorage.setItem('vaani_premium_active', 'true');
    localStorage.setItem('vaani_plan_amount', amount.toString());
    setIsPremium(true);
    setActivePlanAmount(amount);
    
    if (amount === 499) {
      setActiveScreen(Screen.HOME);
    } else if (amount >= 15000) {
      setActiveScreen(Screen.PREMIUM); 
    }
  };

  const handlePostClick = (post: VipReadAllPost) => {
    setSelectedPost(post);
    setActiveScreen(Screen.POST_DETAIL);
  };

  const handleTabChange = (screen: Screen) => {
    const isLockedTab = screen === Screen.HOME || screen === Screen.SHORTS;
    if (isLockedTab && activePlanAmount === 0) {
      setActiveScreen(Screen.PREMIUM);
      return;
    }
    setActiveScreen(screen);
  };

  const wrapInFrame = (content: React.ReactNode) => (
    <div className="flex items-center justify-center w-full h-screen bg-black overflow-hidden p-0 m-0">
      <div className="mobile-frame w-[393px] h-[852px] bg-[#0E0E0B] relative overflow-hidden rounded-[48px] border-[8px] border-[#1C1C18] shadow-2xl flex flex-col max-[500px]:w-full max-[500px]:h-full max-[500px]:rounded-none max-[500px]:border-none">
        {content}
      </div>
    </div>
  );

  if (isIntroVisible) {
    return wrapInFrame(
      <IntroAnimation onComplete={() => { 
        localStorage.setItem('vaani_intro_played', 'true'); 
        setIsIntroVisible(false); 
      }} />
    );
  }

  if (activeScreen === Screen.LOGIN) return wrapInFrame(<LoginScreen onLogin={handleLoginSubmit} />);
  if (activeScreen === Screen.OTP) return wrapInFrame(<OTPScreen phone={pendingPhone} onSuccess={handleOTPSuccess} onBack={() => setActiveScreen(Screen.LOGIN)} />);

  return wrapInFrame(
    <div className="flex flex-col h-full w-full bg-[#0E0E0B]">
      {showDocs ? (
        <DesignDocs onClose={() => setShowDocs(false)} />
      ) : activeScreen === Screen.POLICIES ? (
        <PoliciesScreen onBack={() => setActiveScreen(Screen.PROFILE)} />
      ) : (
        <Layout 
          activeScreen={activeScreen} 
          onTabChange={handleTabChange} 
          onToggleDocs={() => setShowDocs(true)} 
          onSearchClick={() => setActiveScreen(Screen.SEARCH)}
          isPremium={isPremium}
          activePlanAmount={activePlanAmount}
        >
          {activeScreen === Screen.SEARCH && <SearchScreen onBack={() => setActiveScreen(Screen.HOME)} />}
          {activeScreen === Screen.HOME && <HomeContent onPostClick={handlePostClick} />}
          {activeScreen === Screen.SHORTS && <ShortsContent />}
          {activeScreen === Screen.PREMIUM && (
            <PremiumContent 
              onPaymentSuccess={handlePlanActivated} 
              activePlanAmount={activePlanAmount} 
              onVipPostClick={handlePostClick} 
            />
          )}
          {activeScreen === Screen.PROFILE && (
            <ProfileContent 
              user={user} 
              onLogout={handleLogout} 
              onOpenPolicies={() => setActiveScreen(Screen.POLICIES)} 
              onPlanActivated={handlePlanActivated} 
            />
          )}
          {activeScreen === Screen.POST_DETAIL && selectedPost && (
            <PostDetail 
              post={selectedPost} 
              isPremium={isPremium} 
              onBack={() => setActiveScreen(Screen.PREMIUM)} 
              onPostItemClick={(item) => alert(`Reading: ${item.title}`)}
            />
          )}
        </Layout>
      )}
    </div>
  );
};

export default App;
