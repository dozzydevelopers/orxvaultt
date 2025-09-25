import React from 'react';
import type { Nft } from '../types';

const TopNftCard: React.FC<{ nft: Nft; rank: number }> = ({ nft, rank }) => (
    <a href={`/asset/${nft.id}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--background-secondary)] transition-colors">
        <span className="text-lg font-bold w-6 text-center text-[var(--text-muted)]">{rank}</span>
        <img src={nft.imageUrl} alt={nft.name} className="w-14 h-14 rounded-lg object-cover" />
        <div className="flex-1 overflow-hidden">
            <h5 className="font-bold truncate">{nft.name}</h5>
            <p className="text-sm text-[var(--text-faint)]">by {nft.creator}</p>
        </div>
        <p className="font-semibold font-mono">{nft.priceEth.toFixed(2)} ETH</p>
    </a>
);


const TopNftSection: React.FC<{ title: string; nfts: Nft[] }> = ({ title, nfts }) => {
    return (
        <section className="my-8">
            <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{title}</h4>
            <div className="space-y-2">
                {nfts.slice(0, 5).map((nft, index) => (
                    <TopNftCard key={nft.id} nft={nft} rank={index + 1} />
                ))}
            </div>
        </section>
    );
};

export default TopNftSection;
