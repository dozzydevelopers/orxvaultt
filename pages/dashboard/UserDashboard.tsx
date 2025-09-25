import React, { useState } from 'react';
import type { User, Nft } from '../../types';
import { EthIcon, WethIcon, WalletConnectIcon } from '../../components/Icons';
import DepositModal from '../../components/dashboard/DepositModal';
import { useAuth } from '../../contexts/AuthContext';

const ConnectWalletPrompt: React.FC<{ onConnect: () => Promise<boolean> }> = ({ onConnect }) => {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        setIsConnecting(true);
        await onConnect();
        setIsConnecting(false);
    }
    
    return (
        <div className="bg-[var(--background-secondary)] p-6 rounded-2xl text-center">
            <WalletConnectIcon className="w-12 h-12 mx-auto text-[var(--accent-text)]" />
            <h3 className="text-2xl font-bold mt-4">Connect Your Wallet</h3>
            <p className="text-[var(--text-muted)] mt-2 max-w-sm mx-auto">
                Link your crypto wallet to your Orxvault account to start minting, buying, and selling NFTs.
            </p>
            <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="mt-6 inline-flex items-center justify-center gap-2 bg-[var(--accent-primary)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-50"
            >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
        </div>
    );
};


const UserDashboard: React.FC<{ user: User, nfts: Nft[] }> = ({ user }) => {
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const { linkWallet } = useAuth();

    if (!user.isWalletConnected) {
        return (
             <div className="animate-fade-in space-y-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Welcome, {user.username}</h1>
                <ConnectWalletPrompt onConnect={linkWallet} />
            </div>
        )
    }

    return (
        <div className="animate-fade-in space-y-8">
            {isDepositModalOpen && user.walletAddress && <DepositModal address={user.walletAddress} onClose={() => setIsDepositModalOpen(false)} />}
            
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Dashboard</h1>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[var(--background-secondary)] p-6 rounded-2xl space-y-4">
                    <p className="text-[var(--text-faint)] font-medium">Account Balance</p>
                    <p className="text-4xl font-bold">USDT</p>
                    <div className="flex gap-3">
                        <button onClick={() => setIsDepositModalOpen(true)} className="flex-1 bg-black text-white dark:bg-white dark:text-black font-bold py-2.5 rounded-lg text-sm">Deposit</button>
                        <a href="/create" className="flex-1 text-center bg-black text-white dark:bg-white dark:text-black font-bold py-2.5 rounded-lg text-sm">Mint</a>
                        <a href="/dashboard/withdrawal" className="flex-1 text-center bg-black text-white dark:bg-white dark:text-black font-bold py-2.5 rounded-lg text-sm">Withdraw</a>
                    </div>
                </div>

                <div className="bg-[var(--background-secondary)] p-6 rounded-2xl space-y-4">
                    <p className="font-bold">Coin</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                               <EthIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold">{user.balanceEth.toFixed(4)} ETH</span>
                        </div>
                        <span className="text-sm text-[var(--text-faint)]">(USDT)</span>
                    </div>
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                               <WethIcon className="w-4 h-auto text-white" />
                            </div>
                            <span className="font-semibold">2.5000 WETH</span>
                        </div>
                        <span className="text-sm text-[var(--text-faint)]">(USDT)</span>
                    </div>
                </div>
            </div>

            <div 
                className="relative p-6 rounded-2xl overflow-hidden bg-cover bg-center min-h-[180px] flex flex-col justify-between"
                style={{ backgroundImage: `url('https://picsum.photos/seed/dashboard-cta/600/200')` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white">Collect And Sell Extraordinary NFTs</h3>
                    <p className="text-sm text-gray-300 mt-2">Discover exclusive artwork to buy or sell.</p>
                </div>
                <a href="/create" className="relative z-10 mt-4 bg-white text-black font-bold py-2 px-5 rounded-lg self-start text-sm">
                    Create NFT
                </a>
            </div>
        </div>
    );
};

export default UserDashboard;