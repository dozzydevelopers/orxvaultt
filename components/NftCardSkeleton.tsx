import React from 'react';

const NftCardSkeleton: React.FC = () => (
    <div className="bg-[var(--background-secondary)] rounded-2xl w-full overflow-hidden animate-pulse">
        <div className="w-full aspect-square bg-[var(--border-color-light)]"></div>
        <div className="p-4">
            <div className="h-5 bg-[var(--border-color-light)] rounded w-3/4"></div>
            <div className="h-4 bg-[var(--border-color-light)] rounded w-1/2 mt-3"></div>
            <div className="h-6 bg-[var(--border-color-light)] rounded w-1/3 mt-4"></div>
        </div>
    </div>
);

export default NftCardSkeleton;
