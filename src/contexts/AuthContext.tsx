'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, UserStatus, Topic, Article, Comment } from '@/types';
import { mockUsers } from '@/data/users';
import { store } from '@/lib/store';
import { generateId } from '@/lib/utils';

export interface ArticleStat {
  likes: number;
  shares: number;
  comments: number;
  views: number;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
  updateUserRole: (userId: string, role: UserRole) => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  deleteUser: (userId: string) => void;
  addUser: (user: User) => void;
  changeUserPassword: (userId: string, newPassword: string) => void;
  updateProfile: (updates: Partial<Pick<User, 'avatar' | 'coverImage' | 'bio' | 'name'>>) => void;
  upgradePlan: () => void;
  approvePlan: (userId: string) => void;
  rejectPlan: (userId: string) => void;
  // Like / Share (per current user)
  likes: string[];
  shares: string[];
  toggleLike: (articleId: string) => void;
  recordShare: (articleId: string) => void;   // one-way, any visitor
  recordView: (articleId: string) => void;    // any visitor
  isLiked: (articleId: string) => boolean;
  hasShared: (articleId: string) => boolean;  // current session shared?
  // Real stats (global counts)
  articleStats: Record<string, ArticleStat>;
  getStats: (articleId: string) => ArticleStat;
  // Comments (global, persisted)
  allComments: Record<string, Comment[]>;
  addComment: (articleId: string, comment: Comment) => void;
  addReply: (articleId: string, parentId: string, reply: Comment) => void;
  getComments: (articleId: string) => Comment[];
  toggleCommentLike: (articleId: string, commentId: string) => void;
  isCommentLiked: (commentId: string) => boolean;
  // My articles
  myArticles: Article[];
  addArticle: (article: Article) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  articleEdits: Record<string, Partial<Article>>;
  getArticle: (id: string) => Article | undefined;
  // Topics
  topics: Topic[];
  addTopic: (topic: Topic) => void;
  updateTopic: (slug: string, topic: Partial<Topic>) => void;
  deleteTopic: (slug: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [shares, setShares] = useState<string[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [myArticles, setMyArticles] = useState<Article[]>([]);
  const [articleStats, setArticleStats] = useState<Record<string, ArticleStat>>({});
  const [allComments, setAllComments] = useState<Record<string, Comment[]>>({});
  const [articleEdits, setArticleEdits] = useState<Record<string, Partial<Article>>>({});
  const [commentLikes, setCommentLikes] = useState<Record<string, boolean>>({});  // commentId -> liked
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Version gate
    const DATA_VERSION = 'v3';
    const storedVersion = store.get<string>('dataVersion', '');
    if (storedVersion !== DATA_VERSION) {
      store.remove('articleStats');
      store.remove('allComments');
      store.remove('articleEdits');
      store.set('dataVersion', DATA_VERSION);
    }

    const savedUser = store.get<User | null>('currentUser', null);
    const savedUsers = store.get<User[]>('users', mockUsers);
    const savedLikes = store.get<string[]>('likes', []);
    const savedShares = store.get<string[]>('shares', []);
    const savedMyArticles = store.get<Article[]>('myArticles', []);
    const savedStats = store.get<Record<string, ArticleStat>>('articleStats', {});
    const savedComments = store.get<Record<string, Comment[]>>('allComments', {});
    const savedArticleEdits = store.get<Record<string, Partial<Article>>>('articleEdits', {});

    setCurrentUser(savedUser);
    setUsers(savedUsers.length > 0 ? savedUsers : mockUsers);
    setLikes(savedLikes);
    setShares(savedShares);
    setMyArticles(savedMyArticles);
    setArticleStats(savedStats);
    setAllComments(savedComments);
    setArticleEdits(savedArticleEdits);
    setIsHydrated(true);

    // Load topics from Supabase
    fetch('/api/topics')
      .then((r) => r.json())
      .then((data: Array<{ id: string; name: string; slug: string; icon: string; color: string; description: string; article_count: number }>) => {
        if (Array.isArray(data) && data.length > 0) {
          setTopics(data.map((t) => ({
            slug: t.slug,
            name: t.name,
            icon: t.icon,
            color: t.color,
            description: t.description,
            articleCount: t.article_count ?? 0,
          })));
        }
      })
      .catch(() => {/* fallback: keep empty */});
  }, []);

  useEffect(() => {
    if (isHydrated) {
      store.set('currentUser', currentUser);
      store.set('users', users);
      store.set('likes', likes);
      store.set('shares', shares);
      store.set('myArticles', myArticles);
      store.set('articleStats', articleStats);
      store.set('allComments', allComments);
      store.set('articleEdits', articleEdits);
    }
  }, [currentUser, users, likes, shares, myArticles, articleStats, allComments, articleEdits, isHydrated]);

  const login = useCallback((email: string, password: string) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Email hoặc mật khẩu không đúng' };
    if (user.status === 'blocked') return { success: false, message: 'Tài khoản đã bị khóa' };
    setCurrentUser(user);
    return { success: true, message: 'Đăng nhập thành công' };
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    store.remove('currentUser');
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'Email đã được sử dụng' };
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      bio: '',
      role: 'reader',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: 'Đăng ký thành công' };
  }, [users]);

  const updateUserRole = useCallback((userId: string, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    if (currentUser?.id === userId) {
      setCurrentUser((prev) => prev ? { ...prev, role } : null);
    }
  }, [currentUser]);

  const updateUserStatus = useCallback((userId: string, status: UserStatus) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
  }, []);

  const deleteUser = useCallback((userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  }, []);

  const addUser = useCallback((user: User) => {
    setUsers((prev) => [...prev, user]);
  }, []);

  const changeUserPassword = useCallback((userId: string, newPassword: string) => {
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, password: newPassword } : u));
    if (currentUser?.id === userId) {
      setCurrentUser((prev) => prev ? { ...prev, password: newPassword } : null);
    }
  }, [currentUser?.id]);

  const updateProfile = useCallback((updates: Partial<Pick<User, 'avatar' | 'coverImage' | 'bio' | 'name'>>) => {
    setCurrentUser((prev) => prev ? { ...prev, ...updates } : null);
    setUsers((prev) => prev.map((u) => u.id === currentUser?.id ? { ...u, ...updates } : u));
  }, [currentUser?.id]);

  const upgradePlan = useCallback(() => {
    // Only set pending — admin must approve before becoming pro
    setCurrentUser((prev) => prev ? { ...prev, plan: 'pending_pro' } : null);
    setUsers((prev) => prev.map((u) => u.id === currentUser?.id ? { ...u, plan: 'pending_pro' } : u));
  }, [currentUser?.id]);

  const approvePlan = useCallback((userId: string) => {
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, plan: 'pro', role: 'editor' } : u));
    // If approving current user, update their session too
    setCurrentUser((prev) => prev?.id === userId ? { ...prev, plan: 'pro', role: 'editor' } : prev);
  }, []);

  const rejectPlan = useCallback((userId: string) => {
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, plan: 'free' } : u));
    setCurrentUser((prev) => prev?.id === userId ? { ...prev, plan: 'free' } : prev);
  }, []);

  const toggleLike = useCallback((articleId: string) => {
    setLikes((prev) => {
      const alreadyLiked = prev.includes(articleId);
      setArticleStats((stats) => ({
        ...stats,
        [articleId]: {
          ...(stats[articleId] ?? { likes: 0, shares: 0, comments: 0 }),
          likes: Math.max(0, (stats[articleId]?.likes ?? 0) + (alreadyLiked ? -1 : 1)),
        },
      }));
      return alreadyLiked ? prev.filter((id) => id !== articleId) : [...prev, articleId];
    });
  }, []);

  const recordShare = useCallback((articleId: string) => {
    // One-way: cannot "unshare". Works for guests too.
    // Use sessionStorage to avoid double-counting within the same tab session.
    const sessionKey = `shared_${articleId}`;
    if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) return;
    if (typeof window !== 'undefined') sessionStorage.setItem(sessionKey, '1');

    // Track in user's shares list if logged in (for UI indicator)
    setShares((prev) => prev.includes(articleId) ? prev : [...prev, articleId]);

    // Always increment the stat
    setArticleStats((stats) => ({
      ...stats,
      [articleId]: {
        ...(stats[articleId] ?? { likes: 0, shares: 0, comments: 0, views: 0 }),
        shares: (stats[articleId]?.shares ?? 0) + 1,
      },
    }));
  }, []);

  const recordView = useCallback((articleId: string) => {
    // Count every unique article open per session (guest or logged in)
    const sessionKey = `viewed_${articleId}`;
    if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) return;
    if (typeof window !== 'undefined') sessionStorage.setItem(sessionKey, '1');
    setArticleStats((stats) => ({
      ...stats,
      [articleId]: {
        ...(stats[articleId] ?? { likes: 0, shares: 0, comments: 0, views: 0 }),
        views: (stats[articleId]?.views ?? 0) + 1,
      },
    }));
  }, []);

  const isLiked = useCallback((articleId: string) => likes.includes(articleId), [likes]);
  const hasShared = useCallback((articleId: string) => shares.includes(articleId), [shares]);

  const getStats = useCallback((articleId: string): ArticleStat => {
    return articleStats[articleId] ?? { likes: 0, shares: 0, comments: 0 };
  }, [articleStats]);

  const addComment = useCallback((articleId: string, comment: Comment) => {
    setAllComments((prev) => ({
      ...prev,
      [articleId]: [comment, ...(prev[articleId] ?? [])],
    }));
    setArticleStats((stats) => ({
      ...stats,
      [articleId]: {
        ...(stats[articleId] ?? { likes: 0, shares: 0, comments: 0 }),
        comments: (stats[articleId]?.comments ?? 0) + 1,
      },
    }));
  }, []);

  const addReply = useCallback((articleId: string, parentId: string, reply: Comment) => {
    setAllComments((prev) => ({
      ...prev,
      [articleId]: (prev[articleId] ?? []).map((c) =>
        c.id === parentId ? { ...c, replies: [...(c.replies ?? []), reply] } : c
      ),
    }));
    setArticleStats((stats) => ({
      ...stats,
      [articleId]: {
        ...(stats[articleId] ?? { likes: 0, shares: 0, comments: 0 }),
        comments: (stats[articleId]?.comments ?? 0) + 1,
      },
    }));
  }, []);

  const getComments = useCallback((articleId: string): Comment[] => {
    return allComments[articleId] ?? [];
  }, [allComments]);

  const toggleCommentLike = useCallback((articleId: string, commentId: string) => {
    setCommentLikes((prev) => {
      const alreadyLiked = !!prev[commentId];
      setAllComments((comments) => ({
        ...comments,
        [articleId]: (comments[articleId] ?? []).map((c) => {
          if (c.id === commentId) {
            return { ...c, likesCount: Math.max(0, (c.likesCount ?? 0) + (alreadyLiked ? -1 : 1)) };
          }
          if (c.replies?.some((r) => r.id === commentId)) {
            return {
              ...c,
              replies: c.replies.map((r) =>
                r.id === commentId
                  ? { ...r, likesCount: Math.max(0, (r.likesCount ?? 0) + (alreadyLiked ? -1 : 1)) }
                  : r
              ),
            };
          }
          return c;
        }),
      }));
      return { ...prev, [commentId]: !alreadyLiked };
    });
  }, []);

  const isCommentLiked = useCallback((commentId: string) => !!commentLikes[commentId], [commentLikes]);

  const addTopic = useCallback(async (topic: Topic) => {
    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: topic.name, slug: topic.slug, icon: topic.icon, color: topic.color, description: topic.description }),
      });
      if (res.ok) {
        // Refresh topics from Supabase
        const refreshed = await fetch('/api/topics').then(r => r.json());
        if (Array.isArray(refreshed)) {
          setTopics(refreshed.map((t: { slug: string; name: string; icon: string; color: string; description: string; article_count: number }) => ({
            slug: t.slug, name: t.name, icon: t.icon, color: t.color,
            description: t.description, articleCount: t.article_count ?? 0,
          })));
        }
      }
    } catch { setTopics((prev) => [...prev, topic]); }
  }, []);

  const updateTopic = useCallback((slug: string, updates: Partial<Topic>) => {
    setTopics((prev) => prev.map((t) => (t.slug === slug ? { ...t, ...updates } : t)));
  }, []);

  const deleteTopic = useCallback((slug: string) => {
    setTopics((prev) => prev.filter((t) => t.slug !== slug));
  }, []);

  const addArticle = useCallback((article: Article) => {
    setMyArticles((prev) => [article, ...prev]);
    setArticleStats((stats) => ({
      ...stats,
      [article.id]: { likes: 0, shares: 0, comments: 0, views: 0 },
    }));
    // Also persist to Supabase
    fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: article.title, excerpt: article.excerpt, content: article.content,
        coverImage: article.coverImage, authorName: article.author?.name ?? 'Admin',
        authorAvatar: article.author?.avatar ?? '',
      }),
    }).catch(() => {});
  }, []);

  const updateArticle = useCallback((id: string, updates: Partial<Article>) => {
    // If in myArticles → update there; otherwise store override for mock articles
    setMyArticles((prev) => {
      const inMine = prev.some((a) => a.id === id);
      if (inMine) return prev.map((a) => a.id === id ? { ...a, ...updates } : a);
      return prev;
    });
    // Always persist edits for admin overrides of mock articles
    setArticleEdits((prev) => ({ ...prev, [id]: { ...(prev[id] ?? {}), ...updates } }));
  }, []);

  /** Get a single article from myArticles + admin edits (Supabase articles fetched separately) */
  const getArticle = useCallback((id: string): Article | undefined => {
    const mine = myArticles.find((a) => a.id === id);
    if (!mine) return undefined;
    const edits = articleEdits[id];
    return edits ? { ...mine, ...edits } : mine;
  }, [myArticles, articleEdits]);

  if (!isHydrated) return null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        users,
        login,
        logout,
        register,
        updateUserRole,
        updateUserStatus,
        deleteUser,
        addUser,
        changeUserPassword,
        updateProfile,
        upgradePlan,
        approvePlan,
        rejectPlan,
        likes,
        shares,
        toggleLike,
        recordShare,
        recordView,
        isLiked,
        hasShared,
        articleStats,
        getStats,
        allComments,
        addComment,
        addReply,
        getComments,
        toggleCommentLike,
        isCommentLiked,
        myArticles,
        addArticle,
        updateArticle,
        articleEdits,
        getArticle,
        topics,
        addTopic,
        updateTopic,
        deleteTopic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
