import React from 'react';
import NftCardSkeleton from '../components/NftCardSkeleton';

const MarketplacePageSkeleton: React.FC = () => (
    <div className="animate-fade-in">
        <div className="h-10 w-64 bg-[var(--background-secondary)] rounded animate-pulse my-6"></div>
        <div className="grid lg:grid-cols-4 gap-8 items-start">
            {/* Filter Sidebar Skeleton */}
            <div className="hidden lg:block lg:col-span-1">
                 <div className="bg-[var(--background-secondary)] p-6 rounded-2xl h-fit sticky top-24 animate-pulse">
                    <div className="h-6 w-1/3 rounded bg-[var(--border-color-light)] mb-6"></div>
                    <div className="space-y-6">
                        <div className="h-20 w-full rounded bg-[var(--border-color-light)]"></div>
                        <div className="h-20 w-full rounded bg-[var(--border-color-light)]"></div>
                        <div className="h-24 w-full rounded bg-[var(--border-color-light)]"></div>
                    </div>
                </div>
            </div>
            
            <div className="lg:col-span-3">
                <div className="h-5 w-full bg-[var(--background-secondary)] rounded animate-pulse mb-8"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <NftCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default MarketplacePageSkeleton;
