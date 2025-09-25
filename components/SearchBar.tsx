
import React from 'react';
import { SearchIcon } from './Icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative my-6">
      <input
        type="text"
        placeholder="Search NFT, creator, exhibition..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 bg-[var(--background-secondary)] border border-[var(--border-color-light)] rounded-full pl-5 pr-12 text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)]"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-5">
        <SearchIcon className="text-[var(--text-faint)]" />
      </div>
    </div>
  );
};

export default SearchBar;