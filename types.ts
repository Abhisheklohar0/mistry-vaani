
export enum Screen {
  LOGIN = 'LOGIN',
  OTP = 'OTP',
  HOME = 'HOME',
  SHORTS = 'SHORTS',
  POST = 'POST',
  PREMIUM = 'PREMIUM',
  PROFILE = 'PROFILE',
  SEARCH = 'SEARCH',
  DESIGN_DOCS = 'DESIGN_DOCS',
  POLICIES = 'POLICIES',
  POST_DETAIL = 'POST_DETAIL'
}

export interface AuthUser {
  uid: string;
  phone: string;
  lastLogin: string;
  activePlanAmount?: number;
  role: 'user' | 'admin';
}

export interface PostItem {
  id: string;
  title: string;
  preview: string;
  locked: boolean;
  content?: string;
  imageUrl?: string;
}

export interface Comment {
  id: string;
  userName: string;
  text: string;
  timestamp: string;
}

export interface VipReadAllPost {
  post_id: string;
  uid: string;
  post_type: 'VIP_READ_ALL' | 'STANDARD';
  title: string;
  description: string;
  thumbnail: string;
  isVip: boolean;
  posts: PostItem[];
  created_at: string;
  audioUrl?: string; 
}

export interface ContentCard {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  progress?: number;
  duration?: string;
  views?: string;
  isPremium?: boolean;
  category?: string;
  rank?: number;
  videoUrl?: string; // New: Support for long-form video playback
}

export interface Short {
  id: string;
  title: string;
  creator: string;
  category: string;
  videoThumbnail: string;
  videoUrl?: string;
  likes: number; 
  comments: number; 
  initialComments?: Comment[];
}
