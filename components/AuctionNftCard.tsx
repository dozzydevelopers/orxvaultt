

import React, { useState, useEffect } from 'react';
import type { Nft } from '../types';
import { VerifiedIcon, WethIcon } from './Icons';
import CountdownTimer from './CountdownTimer';


interface AuctionNftCardProps {
    nft: Nft;
    isConnected: boolean;
    onPlaceBid: (nftId: string, bid: number) => void;
}


const AuctionNftCard: React.FC<AuctionNftCardProps> = ({ nft, isConnected, onPlaceBid }) => {
    const [bidAmount, setBidAmount] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const currentBid = nft.currentBidEth || nft.priceEth;

    const handlePlaceBid = (e: React.FormEvent) => {
        e.preventDefault();
        onPlaceBid(nft.id, parseFloat(bidAmount));
    };

    return (
        <div className="relative flex flex-col bg-[var(--background-secondary)] rounded-2xl w-full overflow-hidden shadow-lg hover:shadow-[var(--shadow-color)] transition-all duration-300 transform hover:-translate-y-1">
            <a href={`/asset/${nft.id}`} className="block">
                <div className="w-full aspect-square">
                    <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover" />
                </div>
            </a>
            <div className="p-4 flex flex-col flex-grow">
                <a href={`/asset/${nft.id}`} className="block">
                    <h5 className="text-[var(--text-primary)] font-bold truncate text-lg">{nft.name}</h5>
                    <div className="flex items-center mt-2 text-sm text-[var(--text-muted)]">
                        <span className="truncate">{nft.creatorUsername || nft.creator}</span>
                        {nft.isVerified && <VerifiedIcon className="ml-1.5 h-4 w-4" />}
                    </div>
                </a>
                <div className="mt-4 border-t border-[var(--border-color-light)] pt-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                        <div className="text-sm text-[var(--text-muted)]">Current Bid</div>
                        <div className="flex items-center gap-2">
                          <WethIcon />
                          <p className="text-[var(--text-primary)] font-semibold">
                            {currentBid.toFixed(2)} WETH
                          </p>
                        </div>
                    </div>
                    <div className="text-sm text-[var(--text-muted)] mb-2">Auction Ends In</div>
                    {nft.auctionEnd && <CountdownTimer targetDate={nft.auctionEnd} />}
                    
                    <div className="mt-auto pt-4">
                        {isConnected ? (
                            <form onSubmit={handlePlaceBid}>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                       <WethIcon />
                                    </div>
                                    <input 
                                        type="number"
                                        step="0.01"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        placeholder={`> ${currentBid.toFixed(2)}`}
                                        className="block w-full bg-[var(--background-primary)] border border-[var(--border-color-light)] rounded-md pl-10 pr-4 py-2 sm:text-sm h-10 disabled:opacity-50"
                                        disabled
                                    />
                                </div>
                                {error && <p className="text-xs text-[var(--error-text-body)] mt-1">{error}</p>}
                                <button
                                    type="submit"
                                    disabled
                                    className="mt-2 w-full bg-[var(--accent-primary)] text-white font-bold py-2 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Bidding Unavailable
                                </button>
                            </form>
                        ) : (
                            <div className="text-center text-sm text-[var(--accent-text)] p-2 bg-[var(--accent-primary-translucent)] rounded-md">
                                Please connect wallet to bid.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showConfirmation && (
                <div 
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 w-max bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg animate-fade-in-out pointer-events-none"
                    role="alert"
                >
                    Bid placed successfully!
                </div>
            )}
        </div>
    );
};

export default AuctionNftCard;