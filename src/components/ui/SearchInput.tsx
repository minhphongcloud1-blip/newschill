import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative flex-1 min-w-[180px] ${className}`}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        style={{ color: 'var(--text-secondary)' }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-10 pl-10 pr-8 rounded-xl border text-sm focus:outline-none transition-colors`}
        style={{
          background: 'var(--bg-glass-strong)',
          backdropFilter: 'var(--glass-blur)',
          borderColor: 'var(--border-glass)',
          boxShadow: 'var(--shadow-glass)',
          color: 'var(--text-primary)',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#F97316')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/10"
          style={{ color: 'var(--text-secondary)' }}
          type="button"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
