import React from 'react';
import NftCardSkeleton from '../components/NftCardSkeleton';

const HomePageSkeleton: React.FC = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero Skeleton */}
            <div className="relative rounded-2xl overflow-hidden my-8 min-h-[400px] md:min-h-[450px] bg-[var(--background-secondary)] animate-pulse"></div>

            {/* Category Carousel Skeleton */}
            <div className="my-8">
                <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex-shrink-0 flex flex-col items-center space-y-2">
                            <div className="w-20 h-20 rounded-2xl bg-[var(--background-secondary)] animate-pulse"></div>
                            <div className="h-4 w-16 rounded bg-[var(--background-secondary)] animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Promo Banner Skeleton */}
            <div className="relative my-8 p-6 rounded-2xl overflow-hidden bg-[var(--background-secondary)] min-h-[180px] animate-pulse"></div>
            
            {/* Nft Section Skeleton */}
            <section className="my-8">
                <div className="h-8 w-48 bg-[var(--background-secondary)] rounded animate-pulse mb-4"></div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                         <div key={i} className="w-64 flex-shrink-0">
                            <NftCardSkeleton />
                        </div>
                    ))}
                </div>
            </section>
             <section className="my-8">
                <div className="h-8 w-48 bg-[var(--background-secondary)] rounded animate-pulse mb-4"></div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                         <div key={i} className="w-64 flex-shrink-0">
                            <NftCardSkeleton />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePageSkeleton;
