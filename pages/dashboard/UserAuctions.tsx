import React from 'react';
import type { Nft } from '../../types';
import EmptyState from '../../components/EmptyState';
import { FireIcon } from '../../components/Icons';
import AuctionNftCard from '../../components/AuctionNftCard';

interface UserAuctionsProps {
    userNfts: Nft[];
}

const UserAuctions: React.FC<UserAuctionsProps> = ({ userNfts }) => {
    const userAuctions = userNfts.filter(nft => nft.isAuction && nft.auctionEnd && new Date(nft.auctionEnd) > new Date());

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">My Hosted Auctions</h1>
            {userAuctions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {userAuctions.map((nft) => (
                        <AuctionNftCard 
                            key={nft.id} 
                            nft={nft} 
                            isConnected={true} // In dashboard, so user is connected
                            onPlaceBid={() => {}} // Bidding on own item is disabled anyway
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={<FireIcon className="w-12 h-12" />}
                    title="No Active Auctions"
                    message="You do not have any NFTs that are currently up for auction."
                />
            )}
        </div>
    );
};

export default UserAuctions;