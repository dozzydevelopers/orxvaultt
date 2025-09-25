import React from 'react';
import type { Nft, User } from '../types';
import NftCard from '../components/NftCard';

interface CreatorProfilePageProps {
  creatorAddress: string;
  creatorNfts: Nft[];
  creator?: User;
}

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="bg-[var(--background-secondary)] p-4 rounded-xl text-center">
        <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
        <p className="text-sm text-[var(--text-muted)]">{label}</p>
    </div>
);

const CreatorProfilePage: React.FC<CreatorProfilePageProps> = ({ creatorAddress, creatorNfts, creator }) => {
    
    const username = creator?.username || `${creatorAddress.slice(0, 6)}...${creatorAddress.slice(-4)}`;
    const avatarUrl = creator?.avatarUrl || `https://api.dicebear.com/8.x/avataaars/svg?seed=${creatorAddress}`;
    const bio = creator?.bio || "An artist and collector in the Orxvault ecosystem.";
    const bannerUrl = creator?.bannerImageUrl || `https://picsum.photos/seed/${creatorAddress}/1200/200`;

    return (
        <div className="animate-fade-in">
            <div className="h-48 bg-[var(--background-secondary)] rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url('${bannerUrl}')`}}></div>
            <div className="px-8 -mt-16">
                <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-[var(--background-primary)] overflow-hidden">
                    <img src={avatarUrl} alt="Profile Avatar" />
                </div>
                <h1 className="text-3xl font-bold mt-4">{username}</h1>
                <p className="text-[var(--text-muted)] font-mono text-sm">{creatorAddress}</p>
                <p className="text-[var(--text-secondary)] mt-4 max-w-2xl">{bio}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 my-8">
                <StatCard label="Creations" value={creatorNfts.length.toString()} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-6">Created by {username}</h2>
                {creatorNfts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {creatorNfts.map((nft) => (
                            <NftCard key={nft.id} nft={nft} />
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-20 bg-[var(--background-secondary)] rounded-2xl">
                        <h3 className="text-xl font-semibold">No Assets Yet</h3>
                        <p className="text-[var(--text-muted)] mt-2">{username} hasn't created any digital assets yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatorProfilePage;