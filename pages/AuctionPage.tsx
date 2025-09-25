import React, { useState } from 'react';
import type { Nft } from '../types';
import AuctionNftCard from '../components/AuctionNftCard';
import SearchBar from '../components/SearchBar';
import PromoBanner from '../components/PromoBanner';
import { PlusIcon } from '../components/Icons';

interface AuctionPageProps {
    nfts: Nft[];
    isConnected: boolean;
    onUpdateBid: (nftId: string, bid: number) => void;
}

const AuctionPage: React.FC<AuctionPageProps> = ({ nfts, isConnected, onUpdateBid }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('my');

    const promoBanner = {
        title: "Collect And Sell<br />Extraordinary NFTs",
        subtitle: "Discover exclusive artwork to buy or sell.",
        buttonText: "Create NFT",
        link: "/create",
        imageUrl: "https://images.unsplash.com/photo-1634695062423-958742c388e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    };

    const TabButton: React.FC<{ tab: string; label: string; }> = ({ tab, label }) => (
         <button
            onClick={() => setActiveTab(tab)}
            className={`w-1/2 py-3 font-semibold text-center transition-colors ${
                activeTab === tab 
                ? 'border-b-2 border-[var(--text-primary)] text-[var(--text-primary)]' 
                : 'text-[var(--text-muted)]'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">Auctions</h1>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <PromoBanner promoBanner={promoBanner} />
            
            <div className="flex border-b border-[var(--border-color-light)] my-6">
                <TabButton tab="my" label="My Auctions" />
                <TabButton tab="ongoing" label="Ongoing Auctions" />
            </div>

            {activeTab === 'my' && (
                <div className="animate-fade-in">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">My Auctions</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <a href="/create" className="flex flex-col items-center justify-center bg-[var(--background-secondary)] rounded-2xl aspect-square text-center p-4 group hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-[var(--border-color-light)] flex items-center justify-center mb-4 group-hover:bg-[var(--border-color)] transition-colors">
                                <PlusIcon className="w-8 h-8 text-[var(--text-faint)]" />
                            </div>
                            <p className="font-semibold text-[var(--text-secondary)]">Auction An NFT</p>
                        </a>
                    </div>
                </div>
            )}

            {activeTab === 'ongoing' && (
                <div className="animate-fade-in">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Ongoing Auctions</h2>
                    {nfts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {nfts.map((nft) => (
                                <AuctionNftCard 
                                    key={nft.id} 
                                    nft={nft} 
                                    isConnected={isConnected}
                                    onPlaceBid={onUpdateBid}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-[var(--background-secondary)] rounded-xl">
                            <p className="text-[var(--text-muted)]">There are no live auctions at the moment.</p>
                            <a href="/marketplace" className="mt-4 inline-block bg-[var(--accent-primary)] text-white font-bold py-2 px-6 rounded-full hover:bg-[var(--accent-secondary)] transition-colors text-sm">
                                Explore Marketplace
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AuctionPage;
