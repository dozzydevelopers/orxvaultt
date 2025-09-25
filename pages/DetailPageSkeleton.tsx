
import React from 'react';

const DetailPageSkeleton: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full aspect-square bg-[var(--background-secondary)] rounded-2xl"></div>
            
            <div className="my-6">
                {/* Category and Share Skeleton */}
                <div className="flex justify-between items-center">
                     <div className="h-5 w-24 bg-[var(--background-secondary)] rounded"></div>
                     <div className="h-8 w-8 bg-[var(--background-secondary)] rounded-full"></div>
                </div>
                {/* Title Skeleton */}
                <div className="h-10 w-3/4 bg-[var(--background-secondary)] rounded mt-2"></div>
                {/* Owner Skeleton */}
                <div className="h-4 w-1/3 bg-[var(--background-secondary)] rounded mt-4"></div>
            </div>

            {/* Price/Button Box Skeleton */}
            <div className="bg-[var(--background-secondary)] rounded-2xl p-6 my-6">
                 <div className="h-20 w-full bg-[var(--background-primary)] rounded-lg"></div>
            </div>

            {/* Accordion Sections Skeleton */}
            <div>
                <div className="h-14 w-full bg-[var(--background-secondary)] rounded-lg mb-2"></div>
                <div className="h-14 w-full bg-[var(--background-secondary)] rounded-lg mb-2"></div>
                <div className="h-14 w-full bg-[var(--background-secondary)] rounded-lg"></div>
            </div>
        </div>
    );
};

export default DetailPageSkeleton;
