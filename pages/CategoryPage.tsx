
import React from 'react';
import type { Nft } from '../types';
import NftCard from '../components/NftCard';
import { ArrowLeftIcon, MarketplaceIcon } from '../components/Icons';
import EmptyState from '../components/EmptyState';

const CategoryPage: React.FC<{ nfts: Nft[]; categoryName: string }> = ({ nfts, categoryName }) => {
    return (
        <div className="animate-fade-in">
            <a href="/marketplace" className="inline-flex items-center gap-2 text-[var(--accent-text)] hover:brightness-125 mb-4 font-semibold">
                <ArrowLeftIcon />
                <span>Back to Marketplace</span>
            </a>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8 capitalize">{categoryName}</h1>
            {nfts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {nfts.map((nft) => (
                        <NftCard key={nft.id} nft={nft} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={<MarketplaceIcon className="w-12 h-12" />}
                    title={`No Assets in ${categoryName}`}
                    message="There are currently no assets listed in this category. Check back later!"
                    actionText="Explore Other Categories"
                    onAction={() => window.history.pushState({}, '', '/marketplace')}
                />
            )}
        </div>
    );
};

export default CategoryPage;
