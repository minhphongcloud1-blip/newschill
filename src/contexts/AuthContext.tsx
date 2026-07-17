'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, UserStatus, Topic } from '@/types';
import { mockUsers } from '@/data/users';
import { mockTopics } from '@/data/topics';
import { store } from '@/lib/store';
import { generateId } from '@/lib/utils';

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
  likes: string[];
  shares: string[];
  toggleLike: (articleId: string) => void;
  toggleShare: (articleId: string) => void;
  isLiked: (articleId: string) => boolean;
  isShared: (articleId: string) => boolean;
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedUser = store.get<User | null>('currentUser', null);
    const savedUsers = store.get<User[]>('users', mockUsers);
    const savedLikes = store.get<string[]>('likes', []);
    const savedShares = store.get<string[]>('shares', []);
    const savedTopics = store.get<Topic[]>('topics', mockTopics);
    
    setCurrentUser(savedUser);
    setUsers(savedUsers.length > 0 ? savedUsers : mockUsers);
    setLikes(savedLikes);
    setShares(savedShares);
    setTopics(savedTopics.length > 0 ? savedTopics : mockTopics);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      store.set('currentUser', currentUser);
      store.set('users', users);
      store.set('likes', likes);
      store.set('shares', shares);
      store.set('topics', topics);
    }
  }, [currentUser, users, likes, shares, topics, isHydrated]);

  const login = useCallback((email: string, password: string) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Email hoặc mật khẩu không đúng' };
    if (user.status === 'pending') return { success: false, message: 'Tài khoản đang chờ duyệt' };
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
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u))
    );
    if (currentUser?.id === userId) {
      setCurrentUser((prev) => prev ? { ...prev, role } : null);
    }
  }, [currentUser]);

  const updateUserStatus = useCallback((userId: string, status: UserStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );
  }, []);

  const deleteUser = useCallback((userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  }, []);

  const addUser = useCallback((user: User) => {
    setUsers((prev) => [...prev, user]);
  }, []);

  const toggleLike = useCallback((articleId: string) => {
    setLikes((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  }, []);

  const toggleShare = useCallback((articleId: string) => {
    setShares((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  }, []);

  const isLiked = useCallback((articleId: string) => likes.includes(articleId), [likes]);
  const isShared = useCallback((articleId: string) => shares.includes(articleId), [shares]);

  const addTopic = useCallback((topic: Topic) => {
    setTopics((prev) => [...prev, topic]);
  }, []);

  const updateTopic = useCallback((slug: string, updates: Partial<Topic>) => {
    setTopics((prev) =>
      prev.map((t) => (t.slug === slug ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTopic = useCallback((slug: string) => {
    setTopics((prev) => prev.filter((t) => t.slug !== slug));
  }, []);

  if (!isHydrated) {
    return null;
  }

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
        likes,
        shares,
        toggleLike,
        toggleShare,
        isLiked,
        isShared,
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
