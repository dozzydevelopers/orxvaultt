
import React from 'react';
import type { Nft, User } from '../types';
import NftCard from '../components/NftCard';
import EmptyState from '../components/EmptyState';
import { PlusIcon, UploadIcon, ClockIcon } from '../components/Icons';
import { useNotification } from '../contexts/NotificationContext';


interface ProfilePageProps {
  isConnected: boolean;
  user: User | null;
  userNfts: Nft[]; // owned
  userCreatedNfts: Nft[]; // created
}

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="bg-[var(--background-secondary)] p-4 rounded-xl text-center">
        <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
        <p className="text-sm text-[var(--text-muted)]">{label}</p>
    </div>
);

const CreatedNftItem: React.FC<{ nft: Nft }> = ({ nft }) => {
    const isPending = nft.moderationStatus === 'pending';

    return (
        <div className="relative group">
            <div className={`${isPending ? 'opacity-50' : ''}`}>
                <NftCard nft={nft} />
            </div>
            {isPending && (
                <div className="absolute inset-0 bg-black/70 rounded-2xl flex flex-col items-center justify-center text-center p-4 cursor-help">
                    <ClockIcon className="w-8 h-8 text-yellow-400" />
                    <p className="font-bold text-yellow-400 mt-2">Pending Moderation</p>
                    <p className="text-xs text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">This item is under review.</p>
                </div>
            )}
        </div>
    );
};


const ProfilePage: React.FC<ProfilePageProps> = ({ isConnected, user, userNfts, userCreatedNfts }) => {
    const { showNotification } = useNotification();

    if (!isConnected || !user) {
        return (
            <div className="text-center pt-20 animate-fade-in">
                <h1 className="text-4xl font-bold">My NFTs</h1>
                <p className="text-[var(--text-muted)] mt-4">Please connect your wallet to view your profile and assets.</p>
            </div>
        );
    }
    
    const navigate = (path: string) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            showNotification("Avatar upload is not available in this demo.", "info");
            // In a real app, you would handle the file upload here.
            // For example:
            // const file = e.target.files[0];
            // uploadAvatar(file).then(...)
        }
    };

    const itemsCreated = userCreatedNfts.length;

    return (
        <div className="animate-fade-in">
            <div className="h-48 bg-[var(--background-secondary)] rounded-2xl bg-cover bg-center" style={{ backgroundImage: "https://picsum.photos/seed/profile/1200/200" }}></div>
            <div className="px-8 -mt-16">
                 <div className="relative group w-32 h-32 rounded-full bg-gray-700 border-4 border-[var(--background-primary)] overflow-hidden">
                    <img src={user.avatarUrl} alt="Profile Avatar" className="w-full h-full object-cover" />
                    <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <UploadIcon className="w-8 h-8"/>
                    </label>
                    <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                </div>
                <h1 className="text-3xl font-bold mt-4">{user.username}</h1>
                <p className="text-[var(--text-muted)] font-mono text-sm">{user.walletAddress}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
                <StatCard label="Balance" value={`${user.balanceEth.toFixed(4)} ETH`} />
                <StatCard label="Created" value={itemsCreated.toString()} />
                <StatCard label="Owned" value={userNfts.length.toString()} />
            </div>

            <div className="my-8">
                <h2 className="text-2xl font-bold mb-6">My Created Assets</h2>
                {userCreatedNfts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
                        {userCreatedNfts.map((nft) => (
                            <CreatedNftItem key={nft.id} nft={nft} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<PlusIcon className="w-12 h-12" />}
                        title="No Creations Yet"
                        message="You haven't created any digital assets. Start by minting your first NFT."
                        actionText="Create an Asset"
                        onAction={() => navigate('/create')}
                    />
                )}
            </div>

            <div className="my-8">
                <h2 className="text-2xl font-bold mb-6">My Owned Assets</h2>
                {userNfts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
                        {userNfts.map((nft) => (
                            <NftCard key={nft.id} nft={nft} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<PlusIcon className="w-12 h-12" />}
                        title="No Assets Yet"
                        message="You haven't purchased any digital assets. Explore the marketplace to start your collection."
                        actionText="Explore Marketplace"
                        onAction={() => navigate('/marketplace')}
                    />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
