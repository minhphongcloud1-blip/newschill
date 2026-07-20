'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RightPanelSearchProps {
  placeholder?: string;
}

export default function RightPanelSearch({ placeholder = 'Tìm kiếm tin tức...' }: RightPanelSearchProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      {/* Search icon */}
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors"
        style={{ color: 'var(--text-secondary)' }}
      />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-9 rounded-2xl text-sm focus:outline-none transition-all"
        style={{
          background: 'var(--bg-secondary)',
          border: '1.5px solid var(--border-primary)',
          color: 'var(--text-primary)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#F97316';
          e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-primary)';
          e.target.style.boxShadow = 'none';
        }}
      />

      {/* Clear button */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full transition-colors hover:bg-[var(--bg-hover-md)]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}
