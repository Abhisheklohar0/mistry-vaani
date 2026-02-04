
import { Home, Play, Crown, User } from 'lucide-react';
import { Screen, ContentCard, Short, VipReadAllPost } from './types';

export const THEME = {
  primaryBg: '#0E0E0B',
  secondaryBg: '#161612',
  cardBg: '#1C1C18',
  divider: '#242420',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A096',
  disabledText: '#555550',
  accentYellow: '#FFD400',
  secondaryYellow: '#FFB000',
  accentGradient: 'from-[#FFD400] to-[#FFB000]',
};

export const APP_NAME = "VaaniFM";
export const TAGLINE = "voice • music • stories";

export const TABS = [
  { id: Screen.HOME, label: 'Home', icon: Home },
  { id: Screen.SHORTS, label: 'Shorts', icon: Play },
  { id: Screen.PREMIUM, label: 'Premium', icon: Crown },
  { id: Screen.PROFILE, label: 'Profile', icon: User },
];

export const CATEGORIES = ['Popular', 'Audiobooks', 'New & Hot', 'Originals'];

export const LONG_VIDEOS_DATA: ContentCard[] = [
  {
    id: 'lv1',
    title: 'THE ART OF DISCIPLINE: How to Master Your Mind and Achieve Greatness',
    creator: 'VaaniFM',
    creatorAvatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop',
    thumbnail: 'https://deajqmggc3ke1.cloudfront.net/thumblin/broken.jpeg',
    videoUrl: 'https://deajqmggc3ke1.cloudfront.net/video/motivation1.mp4',
    views: '1.4M views',
    timeAgo: '2 days ago',
    likesCount: '45K',
    description: 'In this powerful session, we dive deep into the mechanics of self-discipline. Learn how the elite performers manage their focus and why motivation is a myth. This is your blueprint for success.',
    isPremium: true
  },
  {
    id: 'lv2',
    title: 'Mahabharat Episode 42: The Strategy of Krishna at Kurukshetra',
    creator: 'VaaniFM',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: '890K views',
    timeAgo: '5 hours ago',
    likesCount: '12K',
    description: 'Explore the tactical brilliance of Lord Krishna during the Great War. We analyze the psychological warfare and the divine intervention that shaped history.',
    isPremium: false
  },
  {
    id: 'lv3',
    title: 'Why Most Startups Fail in the First 12 Months',
    creator: 'VaaniFM',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://deajqmggc3ke1.cloudfront.net/video/motivation1.mp4',
    views: '2.1M views',
    timeAgo: '1 week ago',
    likesCount: '110K',
    description: 'Success leaves clues, but failure leaves warnings. In this video, we dissect 5 real-world case studies of failed ventures to ensure you don\'t make the same mistakes.',
    isPremium: true
  }
];

export const SHORTS_DATA: Short[] = [
  {
    id: 's3',
    title: 'TRAVEL PHI PHI ISLAND',
    creator: 'VaaniFM',
    category: 'TRAVEL',
    videoThumbnail: 'https://images.unsplash.com/photo-1528181304800-2f143c8c798d?auto=format&fit=crop&q=80&w=1080',
    videoUrl: 'https://deajqmggc3ke1.cloudfront.net/shorts/TRAVEL.mp4',
    likes: 0,
    comments: 0,
    initialComments: []
  },
  {
    id: 's1',
    title: 'Motivation',
    creator: 'VaaniFM',
    category: 'Inspiration',
    videoThumbnail: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&q=80&w=1080',
    videoUrl: 'https://deajqmggc3ke1.cloudfront.net/shorts/do.mp4',
    likes: 0,
    comments: 0,
    initialComments: []
  },
  {
    id: 's2',
    title: 'I have reached the destination but at what price🥀🌹',
    creator: 'VaaniFM',
    category: 'MOTIVATION',
    videoThumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1080',
    videoUrl: 'https://deajqmggc3ke1.cloudfront.net/shorts/2.mp4',
    likes: 0,
    comments: 0,
    initialComments: []
  }
];

export const VIP_READ_ALL_POSTS: VipReadAllPost[] = [
  {
    post_id: 'vip1',
    uid: 'vaani_admin',
    post_type: 'VIP_READ_ALL',
    title: 'THE 48 LAWS OF POWER',
    description: 'A comprehensive audio journey through the most influential book on strategy and leadership. Each chapter decoded for the modern world.',
    thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1080',
    isVip: true,
    created_at: new Date().toISOString(),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    posts: [
      {
        id: 'c1_1',
        title: 'Law 1: Never Outshine the Master',
        preview: 'Always make those above you feel comfortably superior. In your desire to please and impress them, do not go too far in displaying your talents.',
        locked: false,
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'c1_2',
        title: 'Law 2: Never Put Too Much Trust in Friends',
        preview: 'Be wary of friends—they will betray you more quickly, for they are easily aroused to envy. They also become spoiled and tyrannical.',
        locked: true,
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    post_id: 'vip2',
    uid: 'vaani_admin',
    post_type: 'VIP_READ_ALL',
    title: 'RAMAYANA: THE EPIC JOURNEY',
    description: 'Experience the timeless epic of Lord Rama in a high-fidelity cinematic audio format. Ancient wisdom narrated for the new generation.',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1080',
    isVip: true,
    created_at: new Date().toISOString(),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    posts: [
      {
        id: 'c2_1',
        title: 'Bala Kanda: The Early Life',
        preview: 'The birth of the four sons of King Dasharatha and the early training of Rama under Sage Vishwamitra.',
        locked: false,
        imageUrl: 'https://images.unsplash.com/photo-1608306448197-e83633f1261c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'c2_2',
        title: 'Ayodhya Kanda: The Exile',
        preview: 'The preparations for Rama\'s coronation and the tragic turn of events leading to his 14-year exile.',
        locked: true,
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    post_id: 'vip3',
    uid: 'vaani_admin',
    post_type: 'VIP_READ_ALL',
    title: 'MINDSET OF A CHAMPION',
    description: 'What separates the 1% from the rest? Discover the psychological frameworks of world-class athletes and business titans.',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1080',
    isVip: true,
    created_at: new Date().toISOString(),
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    posts: [
      {
        id: 'c3_1',
        title: 'The Resilience Protocol',
        preview: 'How to maintain focus under extreme pressure and use setbacks as fuel for future victories.',
        locked: false,
        imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];

// Re-exporting legacy constants for compatibility
export const TRENDING_KEYWORDS = ['Motivational', 'Leadership', 'Success', 'Psychology'];
export const SEARCH_RECOMMENDATIONS = [];
export const HERO_CONTENT = [];
export const TOP_SHOWS = [];
export const GRID_CONTENT = [];
