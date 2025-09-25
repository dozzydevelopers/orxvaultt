import React from 'react';
import { WethIcon } from './Icons';

interface FilterSidebarProps {
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
  onApply: () => void;
  onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  minPrice, setMinPrice, maxPrice, setMaxPrice, isVerified, setIsVerified, onApply, onReset
}) => {
  return (
    <aside className="bg-[var(--background-secondary)] p-6 rounded-2xl h-fit sticky top-24">
      <h3 className="text-xl font-bold mb-6">Filters</h3>
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="font-semibold mb-3 text-[var(--text-secondary)]">Price Range</h4>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full bg-[var(--background-primary)] border border-[var(--border-color-light)] rounded-lg h-10 pl-3 pr-8 text-sm" />
              <WethIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-5 text-[var(--text-faint)]" />
            </div>
            <span className="text-[var(--text-faint)]">-</span>
            <div className="relative">
              <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full bg-[var(--background-primary)] border border-[var(--border-color-light)] rounded-lg h-10 pl-3 pr-8 text-sm" />
              <WethIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-5 text-[var(--text-faint)]" />
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="font-semibold mb-3 text-[var(--text-secondary)]">Status</h4>
          <div className="flex items-center justify-between p-3 bg-[var(--background-primary)] rounded-lg">
            <label htmlFor="verified-toggle" className="font-medium text-[var(--text-secondary)]">Verified Creator</label>
            <button
              id="verified-toggle"
              onClick={() => setIsVerified(!isVerified)}
              className={`${isVerified ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-color-light)]'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              aria-pressed={isVerified}
            >
              <span className={`${isVerified ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
            </button>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[var(--border-color-light)]">
           <button onClick={onApply} className="w-full bg-[var(--accent-primary)] text-white font-bold py-2.5 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors">Apply</button>
           <button onClick={onReset} className="w-full border border-[var(--border-color-light)] text-[var(--text-secondary)] font-bold py-2.5 rounded-xl hover:bg-[var(--background-primary)] transition-colors">Reset</button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
