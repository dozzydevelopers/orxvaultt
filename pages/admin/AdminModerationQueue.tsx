
import React, { useState } from 'react';
import type { Nft } from '../../types';
import EmptyState from '../../components/EmptyState';
import { ShieldCheckIcon } from '../../components/Icons';

const ModerationCard: React.FC<{ nft: Nft; onApprove: (id: string) => void; onReject: (id: string) => void; }> = ({ nft, onApprove, onReject }) => (
    <div className="bg-[var(--background-secondary)] rounded-2xl overflow-hidden shadow-lg flex flex-col">
        <img src={nft.imageUrl} alt={nft.name} className="w-full aspect-square object-cover" />
        <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-bold text-lg truncate">{nft.name}</h3>
            <p className="text-sm text-[var(--text-muted)] truncate">by {nft.creatorUsername}</p>
            <div className="mt-auto pt-4 flex gap-3">
                <button onClick={() => onApprove(nft.id)} className="flex-1 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700">Approve</button>
                <button onClick={() => onReject(nft.id)} className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700">Reject</button>
            </div>
        </div>
    </div>
);


const AdminModerationQueue: React.FC<{ nfts: Nft[] }> = ({ nfts: initialNfts }) => {
    const [pendingNfts, setPendingNfts] = useState(initialNfts.filter(n => n.moderationStatus === 'pending'));

    const handleApprove = (id: string) => {
        setPendingNfts(pendingNfts.filter(n => n.id !== id));
    };

    const handleReject = (id: string) => {
        setPendingNfts(pendingNfts.filter(n => n.id !== id));
    };
    
    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Moderation Queue</h1>
                <p className="text-[var(--text-muted)] mt-2">Review and approve or reject newly minted assets before they go public.</p>
            </div>

            {pendingNfts.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pendingNfts.map(nft => (
                        <ModerationCard key={nft.id} nft={nft} onApprove={handleApprove} onReject={handleReject} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={<ShieldCheckIcon className="w-16 h-16"/>}
                    title="Queue is Empty"
                    message="There are no NFTs awaiting moderation at this time."
                />
            )}
        </div>
    );
};

export default AdminModerationQueue;
