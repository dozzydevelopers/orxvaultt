
import React, { useState, useMemo } from 'react';
import type { Nft, Category } from '../types';
import NftCard from '../components/NftCard';
import FilterSidebar from '../components/FilterSidebar';
import EmptyState from '../components/EmptyState';
import { MarketplaceIcon, CloseIcon } from '../components/Icons';

interface MarketplacePageProps { 
    nfts: Nft[]; 
    searchQuery: string;
    categories: Category[];
}

const FilterModal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] bg-[var(--background-primary-translucent)] backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="bg-[var(--background-primary)] w-full h-auto absolute bottom-0 rounded-t-2xl p-4 shadow-2xl animate-slide-in-up" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Filters</h2>
                     <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

const MarketplacePage: React.FC<MarketplacePageProps> = ({ nfts, searchQuery, categories }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    
    const [appliedFilters, setAppliedFilters] = useState({
        min: '',
        max: '',
        verified: false,
    });
    
    const handleApplyFilters = () => {
        setAppliedFilters({
            min: minPrice,
            max: maxPrice,
            verified: isVerified,
        });
        setIsFilterModalOpen(false); // Close modal on apply
    };
    
    const handleResetFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setIsVerified(false);
        setAppliedFilters({
            min: '',
            max: '',
            verified: false,
        });
        setSelectedCategory('All');
        setSortBy('newest');
        setIsFilterModalOpen(false);
    };

    const displayedNfts = useMemo(() => {
        let filtered = nfts.filter(nft => {
            const min = parseFloat(appliedFilters.min);
            const max = parseFloat(appliedFilters.max);
            
            if (!isNaN(min) && nft.priceEth < min) return false;
            if (!isNaN(max) && nft.priceEth > max) return false;
            if (appliedFilters.verified && !nft.isVerified) return false;
            
            return true;
        });

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(nft => nft.category === selectedCategory);
        }

        switch(sortBy) {
            case 'price_asc':
                return filtered.sort((a, b) => a.priceEth - b.priceEth);
            case 'price_desc':
                return filtered.sort((a, b) => b.priceEth - a.priceEth);
            case 'newest':
            default:
                 return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

    }, [nfts, appliedFilters, selectedCategory, sortBy]);

    const CategoryFilter: React.FC = () => (
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6">
            <button 
                onClick={() => setSelectedCategory('All')} 
                className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                    selectedCategory === 'All' 
                    ? 'bg-[var(--accent-primary)] text-white' 
                    : 'bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-color-light)]'
                }`}
            >
                All
            </button>
            {categories.map(cat => (
                 <button 
                    key={cat.name} 
                    onClick={() => setSelectedCategory(cat.name)}
                     className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                        selectedCategory === cat.name 
                        ? 'bg-[var(--accent-primary)] text-white' 
                        : 'bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-color-light)]'
                    }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );

    const filterSidebarContent = (
         <FilterSidebar 
            minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            isVerified={isVerified} setIsVerified={setIsVerified}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
        />
    );

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] my-6">Marketplace</h1>
            <div className="grid lg:grid-cols-4 gap-8 items-start">
                <div className="hidden lg:block lg:col-span-1">
                    {filterSidebarContent}
                </div>

                <div className="lg:col-span-3">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <p className="text-[var(--text-muted)] text-sm md:text-base">
                            {searchQuery
                                ? `Showing ${displayedNfts.length} results for "${searchQuery}"`
                                : `Explore ${displayedNfts.length} premier digital assets in the vault.`
                            }
                        </p>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button onClick={() => setIsFilterModalOpen(true)} className="lg:hidden flex-1 bg-[var(--background-secondary)] border border-[var(--border-color-light)] rounded-lg h-10 px-4 font-semibold">
                                Filters
                            </button>
                            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="flex-1 h-10 bg-[var(--background-secondary)] border border-[var(--border-color-light)] rounded-lg px-4 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)] w-full md:w-auto">
                                <option value="newest">Sort by: Newest</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <CategoryFilter />
                   
                    {displayedNfts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {displayedNfts.map((nft) => (
                                <NftCard key={nft.id} nft={nft} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState 
                           icon={<MarketplaceIcon className="w-12 h-12" />}
                           title="No Assets Found"
                           message="Try adjusting your search or filter criteria to find what you're looking for."
                           actionText="Reset All Filters"
                           onAction={handleResetFilters}
                        />
                    )}
                </div>
            </div>
             <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
                {filterSidebarContent}
             </FilterModal>
        </div>
    );
};

export default MarketplacePage;
