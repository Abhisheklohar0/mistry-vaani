
import React from 'react';
import { Home, Play, Crown, User, PlusSquare } from 'lucide-react';
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

export const APP_NAME = "Vaani FM";
export const TAGLINE = "voice • music • stories";

export const TABS = [
  { id: Screen.HOME, label: 'Home', icon: Home },
  { id: Screen.SHORTS, label: 'Shorts', icon: Play },
  { id: Screen.PREMIUM, label: 'Premium', icon: Crown },
  { id: Screen.PROFILE, label: 'Profile', icon: User },
];

export const CATEGORIES = ['Popular', 'Audiobooks', 'New & Hot', 'Originals'];

export const VIP_READ_ALL_POSTS: VipReadAllPost[] = [
  {
    post_id: "POST_VIP_004",
    uid: "VAANI_ADMIN_01",
    post_type: "VIP_READ_ALL",
    title: "THE PSYCHOLOGY OF LEADERSHIP",
    description: "Master the invisible forces that drive human behavior. Learn how to lead with authority, empathy, and strategic vision.",
    thumbnail: "https://deajqmggc3ke1.cloudfront.net/post/WhatsApp%20Image%202026-02-04%20at%201.06.18%20AM.jpeg",
    isVip: true,
    created_at: "2024-02-04T01:06:18Z",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    posts: [
      { id: "L1", title: "The Command Presence", preview: "Projecting confidence in high-stakes environments...", locked: false, imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600" },
      { id: "L2", title: "Emotional Intelligence Masterclass", preview: "The bridge between logic and loyalty...", locked: false, imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    post_id: "POST_VIP_003",
    uid: "VAANI_ADMIN_01",
    post_type: "VIP_READ_ALL",
    title: "BILLION DOLLAR SECRET",
    description: "The untold strategies and mindsets of the world's most successful leaders. A blueprint for high-performance living.",
    thumbnail: "https://deajqmggc3ke1.cloudfront.net/post/WhatsApp%20Image%202026-02-04%20at%201.05.49%20AM.jpeg",
    isVip: true,
    created_at: "2024-02-04T01:05:49Z",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    posts: [
      { id: "B1", title: "The Wealth Architecture", preview: "Systematic approaches to scaling impact...", locked: false, imageUrl: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=600" },
      { id: "B2", title: "Hyper-Focus Protocols", preview: "How the elite manage cognitive load...", locked: false, imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    post_id: "POST_VIP_002",
    uid: "VAANI_ADMIN_01",
    post_type: "VIP_READ_ALL",
    title: "The Path of Resilience",
    description: "Discover the hidden strength within when faced with life's greatest challenges. A VIP exclusive series on inner power.",
    thumbnail: "https://deajqmggc3ke1.cloudfront.net/post/WhatsApp%20Image%202026-02-04%20at%201.05.26%20AM.jpeg",
    isVip: true,
    created_at: "2024-02-04T01:05:00Z",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    posts: [
      { id: "R1", title: "Embracing the Struggle", preview: "Why growth only happens in discomfort...", locked: false, imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600" },
      { id: "R2", title: "Forging the Will", preview: "The psychology of an unbreakable spirit...", locked: false, imageUrl: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    post_id: "POST_001",
    uid: "VAANI_ADMIN_01",
    post_type: "VIP_READ_ALL",
    title: "Understanding Mind Power",
    description: "A comprehensive collection of insights into how the human mind functions.",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    isVip: true,
    created_at: "2023-10-25T10:00:00Z",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    posts: [
      { id: "P1", title: "The Architecture of Thought", preview: "Exploring synaptic pathways...", locked: false, imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600" },
      { id: "P2", title: "Hidden Truths of Life", preview: "Secrets often overlooked...", locked: false, imageUrl: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=600" },
      { id: "P3", title: "Reality vs Illusion", preview: "Perception meets existence...", locked: false, imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=400" },
      { id: "P4", title: "Manifesting Intent", preview: "Abstract desire into action...", locked: false, imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" }
    ]
  }
];

export const TRENDING_KEYWORDS = [
  'Motivational',
  'Leadership',
  'Success Mindset',
  'Psychology',
  'Billionaire Secret',
  'Discipline'
];

export const SEARCH_RECOMMENDATIONS: ContentCard[] = [
  {
    id: 'sr1',
    title: 'The Art of War',
    creator: 'Sun Tzu',
    thumbnail: 'https://images.unsplash.com/photo-1543003923-99926422dc0d?auto=format&fit=crop&q=80&w=400',
    views: '0 Listeners',
    isPremium: true,
    category: 'History'
  },
  {
    id: 'sr2',
    title: 'Deep Work',
    creator: 'Cal Newport',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    views: '0 Listeners',
    isPremium: false,
    category: 'Self-Help'
  }
];

export const HERO_CONTENT: ContentCard[] = [
  {
    id: 'h1',
    title: 'When life breaks you - powerful motivational speech',
    creator: 'Ben Lionel Scott',
    thumbnail: 'https://deajqmggc3ke1.cloudfront.net/thumblin/broken.jpeg',
    videoUrl: 'https://deajqmggc3ke1.cloudfront.net/video/motivation1.mp4',
    views: '0 Listeners',
    isPremium: true
  },
  {
    id: 'h2',
    title: 'Mahabharat: The Unheard Chapters',
    creator: 'Mythology',
    thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800',
    views: '0 Listeners',
    isPremium: true
  }
];

export const TOP_SHOWS: ContentCard[] = [
  { id: 'ts1', title: 'The Forest King', creator: 'Mythology', thumbnail: 'https://images.unsplash.com/photo-1500462859247-407c51576323?auto=format&fit=crop&q=80&w=400', views: '0 Listeners', rank: 1 },
  { id: 'ts2', title: 'Soul Echoes', creator: 'Spiritual', thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400', views: '0 Listeners', rank: 2 },
  { id: 'ts3', title: 'Code Red', creator: 'Action', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400', views: '0 Listeners', rank: 3 }
];

export const GRID_CONTENT: ContentCard[] = [
  {
    id: 'g1',
    title: 'Ramayan: Exile',
    creator: 'Mythology',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    views: '0 Listeners',
    isPremium: true,
    category: 'Mythology'
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
