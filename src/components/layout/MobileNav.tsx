'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, TrendingUp, Hash, User } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const items = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/trending', icon: TrendingUp, label: 'Trending' },
    { href: '/topics', icon: Hash, label: 'Topics' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t lg:hidden z-50"
      style={{ background: 'var(--bg-glass)', backdropFilter: 'var(--glass-blur-heavy)', WebkitBackdropFilter: 'var(--glass-blur-heavy)', borderColor: 'var(--border-glass)' }}
    >
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg"
            >
              <Icon
                className="w-6 h-6"
                style={{ color: isActive ? '#F97316' : 'var(--text-secondary)' }}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px]" style={{ color: isActive ? '#F97316' : 'var(--text-secondary)' }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
