// ==========================================
// NewsX - Type Definitions
// ==========================================

export type UserRole = 'admin' | 'editor' | 'reader';
export type UserStatus = 'active' | 'pending' | 'blocked';
export type UserPlan = 'free' | 'pending_pro' | 'pro';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  coverImage?: string;
  plan?: UserPlan;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: User;
  topic: Topic;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  articleId: string;
  parentId: string | null;
  createdAt: string;
  likesCount: number;
  replies?: Comment[];
}

export interface Topic {
  slug: string;
  name: string;
  icon: string;
  description: string;
  articleCount: number;
  color: string;
}
