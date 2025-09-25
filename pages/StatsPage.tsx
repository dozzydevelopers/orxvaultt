

import React, { useState, useMemo } from 'react';
import type { Nft, Collection, User } from '../types';

interface StatsPageProps {
    nfts: Nft[];
    collections: Collection[];
    users: User[];
}

const StatCard: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="bg-[var(--background-secondary)] p-6 rounded-2xl">
        <p className="text-sm text-[var(--text-muted)]">{label}</p>
        <p className="text-3xl font-bold text-[var(--text-primary)] mt-1">{value}</p>
    </div>
);

const RankingRow: React.FC<{ rank: number; name: string; avatar: string; volume: number; isHeader?: boolean; href: string }> = ({ rank, name, avatar, volume, isHeader = false, href }) => {
     const content = (
        <>
            <div className="col-span-1 font-semibold text-center">{rank}</div>
            <div className="col-span-7 flex items-center gap-3">
                <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover"/>
                <span className="font-semibold truncate">{name}</span>
            </div>
            <div className="col-span-4 text-right font-mono">{volume.toFixed(2)} ETH</div>
        </>
    );

    if (isHeader) {
        return (
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-semibold text-[var(--text-muted)]">
               <div className="col-span-1 text-center">#</div>
               <div className="col-span-7">Collection / Creator</div>
               <div className="col-span-4 text-right">Volume</div>
           </div>
        )
    }

    return (
        <a href={href} className="grid grid-cols-12 gap-4 items-center px-4 py-3 border-t border-[var(--border-color)] hover:bg-[var(--background-primary)] transition-colors">
            {content}
        </a>
    )
};


const StatsPage: React.FC<StatsPageProps> = ({ nfts, collections, users }) => {
    
    const { topCollections, topCreators, totalVolume, uniqueCreators } = useMemo(() => {
        const collectionVolume: Record<string, number> = {};
        const creatorVolume: Record<string, number> = {};
        const creatorSet = new Set<string>();

        let totalListedVolume = 0;

        for (const nft of nfts) {
            totalListedVolume += nft.priceEth;
            const creatorAddress = nft.creator.toLowerCase();
            creatorSet.add(creatorAddress);
            
            if (nft.collectionId) {
                collectionVolume[nft.collectionId] = (collectionVolume[nft.collectionId] || 0) + nft.priceEth;
            }
            creatorVolume[creatorAddress] = (creatorVolume[creatorAddress] || 0) + nft.priceEth;
        }
        
        const sortedCollections = collections
            .map(c => ({...c, volume: collectionVolume[c.id] || 0 }))
            .sort((a,b) => b.volume - a.volume)
            .slice(0, 10);

        const sortedCreators = users
            .filter(user => creatorSet.has(user.walletAddress.toLowerCase()))
            .map(user => ({
                ...user,
                volume: creatorVolume[user.walletAddress.toLowerCase()] || 0
            }))
            .sort((a,b) => b.volume - a.volume)
            .slice(0, 10);
            
        return { 
            topCollections: sortedCollections, 
            topCreators: sortedCreators, 
            totalVolume: totalListedVolume,
            uniqueCreators: creatorSet.size
        };

    }, [nfts, collections, users]);

    return (
        <div className="animate-fade-in max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] my-6">Marketplace Stats</h1>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard label="Total Listed Volume" value={`${totalVolume.toFixed(2)} ETH`} />
                <StatCard label="Total NFTs" value={nfts.length.toLocaleString()} />
                <StatCard label="Collections" value={collections.length.toLocaleString()} />
                <StatCard label="Creators" value={uniqueCreators.toLocaleString()} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Top Collections</h2>
                     <div className="bg-[var(--background-secondary)] rounded-2xl overflow-hidden">
                        <RankingRow isHeader rank={0} name="" avatar="" volume={0} href="#"/>
                        {topCollections.map((col, index) => (
                            <RankingRow key={col.id} rank={index+1} name={col.name} avatar={col.coverImageUrl} volume={col.volume} href={`/collection/${col.id}`} />
                        ))}
                    </div>
                </div>
                 <div>
                    <h2 className="text-2xl font-bold mb-4">Top Creators</h2>
                     <div className="bg-[var(--background-secondary)] rounded-2xl overflow-hidden">
                        <RankingRow isHeader rank={0} name="" avatar="" volume={0} href="#"/>
                        {topCreators.map((user, index) => (
                            <RankingRow key={user.id} rank={index+1} name={user.username} avatar={user.avatarUrl} volume={user.volume} href={`/creator/${user.id}`} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StatsPage;
