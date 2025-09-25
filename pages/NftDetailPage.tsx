import React, { useState } from 'react';
import type { Nft, User } from '../types';
import NftCard from '../components/NftCard';
import { WethIcon, VerifiedIcon, CopyIcon, ChevronDownIcon, InformationCircleIcon, CloseIcon } from '../components/Icons';
import { useNotification } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import { buyNft } from '../services/nftService';
import { navigateTo } from '../services/utils';

const Accordion: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-[var(--border-color-light)]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-5 text-left"
            >
                <h3 className="font-bold text-xl text-[var(--text-primary)]">{title}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-[var(--text-faint)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-5 animate-fade-in">
                    <div className="text-[var(--text-secondary)] leading-relaxed">{children}</div>
                </div>
            )}
        </div>
    );
};

const UrlCopier: React.FC<{ url: string }> = ({ url }) => {
    const { showNotification } = useNotification();
    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        showNotification('Link copied to clipboard!', 'success');
    };
    return (
        <div className="relative mt-4 bg-[var(--background-secondary)] border border-[var(--border-color-light)] rounded-lg flex items-center h-12">
            <input 
                type="text" 
                readOnly 
                value={url} 
                className="flex-grow bg-transparent h-full pl-4 pr-20 text-sm text-[var(--text-muted)] focus:outline-none"
            />
            <button onClick={handleCopy} className="absolute right-1 top-1 bottom-1 w-20 bg-[var(--background-primary)] rounded-md text-[var(--text-secondary)] font-semibold text-sm hover:bg-[var(--border-color)] transition-colors">
                Copy
            </button>
        </div>
    );
}

const PurchaseModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    nft: Nft;
}> = ({ isOpen, onClose, onConfirm, nft }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="absolute bottom-0 left-0 right-0 bg-[var(--background-primary)] rounded-t-2xl p-6 animate-slide-in-up border-t border-[var(--border-color-light)]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Purchase Details</h2>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <img src={nft.imageUrl} alt={nft.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                            <p className="text-sm text-[var(--text-muted)]">{nft.creatorUsername}</p>
                            <h3 className="font-bold text-lg">{nft.name}</h3>
                            <p className="text-sm text-[var(--text-muted)]">Quantity: 1</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-[var(--text-muted)]">Offer</p>
                        <div className="flex items-center gap-1.5">
                             <WethIcon className="w-4 h-auto" />
                            <p className="font-bold text-lg">{nft.priceEth.toFixed(2)} WETH</p>
                        </div>
                        <p className="text-xs text-[var(--text-faint)]">${nft.priceUsd.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-[var(--background-secondary)] p-4 rounded-xl mb-6 space-y-2">
                    <h4 className="font-semibold text-[var(--text-secondary)]">Send to Orxvault Wallet</h4>
                    <div className="bg-[var(--background-primary)] p-3 rounded-lg text-center font-mono text-sm text-[var(--text-muted)] break-all border border-[var(--border-color)]">
                        0x7b775a939852db663097641be17b46a0f808
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 bg-white/10 border border-white/10 text-white font-bold py-3.5 rounded-xl hover:bg-white/20">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] font-bold py-3.5 rounded-xl hover:opacity-90">Buy NFT</button>
                </div>
            </div>
        </div>
    );
};

const ErrorBanner: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
    <div className="bg-[var(--error-bg)] border border-[var(--error-border)] rounded-xl p-3 flex items-center gap-3 my-4 animate-fade-in">
        <InformationCircleIcon className="w-6 h-6 text-[var(--error-border)] flex-shrink-0" />
        <p className="flex-1 text-sm text-[var(--error-text-body)] font-medium">
            <span className="font-bold text-[var(--error-text-header)]">Error!</span> {message}
        </p>
        <button onClick={onClose} className="text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]">
             <CloseIcon className="w-5 h-5" />
        </button>
    </div>
);


interface NftDetailPageProps {
    nft: Nft;
    allNfts: Nft[];
    onPurchaseSuccess: () => void;
}

const NftDetailPage: React.FC<NftDetailPageProps> = ({ nft, allNfts, onPurchaseSuccess }) => {
    const { showNotification } = useNotification();
    const { user: currentUser } = useAuth();
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [purchaseError, setPurchaseError] = useState<string | null>(null);
    
    const moreFromCreator = allNfts.filter(n => n.creator === nft.creator && n.id !== nft.id).slice(0, 4);
    const moreFromCategory = allNfts.filter(n => n.category === nft.category && n.id !== nft.id).slice(0, 4);

    const ownerAddress = nft.owner;
    const creatorAddress = nft.creator;
    const ownerUsername = nft.ownerUsername || `${ownerAddress.slice(0,6)}...${ownerAddress.slice(-4)}`;
    const creatorUsername = nft.creatorUsername || `${creatorAddress.slice(0,6)}...${creatorAddress.slice(-4)}`;
    const creatorAvatar = nft.creatorAvatar || `https://api.dicebear.com/8.x/avataaars/svg?seed=${creatorAddress}`;
    
    const displayTokenId = nft.tokenId && !isNaN(parseInt(nft.tokenId, 10)) ? nft.tokenId : nft.id;

    const handleInitiatePurchase = () => {
        if (!currentUser) {
            showNotification('Please sign in to purchase.', 'info');
            navigateTo('/signin');
            return;
        }
        setPurchaseError(null);
        setIsPurchaseModalOpen(true);
    };

    const handleConfirmPurchase = async () => {
        setIsPurchaseModalOpen(false);
        setIsPurchasing(true);
        try {
            showNotification('Processing purchase... Please confirm in your wallet.', 'info');
            await buyNft(nft);
            showNotification(`Successfully purchased "${nft.name}"!`, 'success');
            onPurchaseSuccess();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
            setPurchaseError(errorMessage);
        } finally {
            setIsPurchasing(false);
        }
    };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
        <PurchaseModal 
            isOpen={isPurchaseModalOpen}
            onClose={() => setIsPurchaseModalOpen(false)}
            onConfirm={handleConfirmPurchase}
            nft={nft}
        />
        <div className="w-full aspect-square bg-[var(--background-secondary)] rounded-2xl overflow-hidden shadow-lg">
            <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="px-1">
            {purchaseError && <ErrorBanner message={purchaseError} onClose={() => setPurchaseError(null)} />}
            
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-6">{nft.name}</h1>
            <a href={`/creator/${creatorAddress}`} className="font-semibold text-[var(--accent-text)] hover:underline flex items-center gap-1.5 mt-2">
                <span>{creatorUsername}</span>
                {nft.isVerified && <VerifiedIcon className="w-5 h-5" />}
            </a>
            
            <UrlCopier url={`https://orxvault.com/item/${nft.id}`} />

            <div className="my-6 space-y-4">
                 <div className="bg-[var(--background-secondary)] rounded-xl p-4">
                    <p className="text-sm text-[var(--text-faint)]">Current Price</p>
                    <div className="flex items-baseline gap-2 mt-1">
                            <WethIcon className="w-4 h-auto text-[var(--text-muted)]"/>
                        <p className="text-[var(--text-primary)] font-bold text-2xl">
                            {nft.priceEth.toFixed(2)}
                        </p>
                        <span className="text-sm text-[var(--text-muted)]">WETH</span>
                         <span className="text-sm text-[var(--text-faint)]">
                            (${nft.priceUsd.toLocaleString()})
                        </span>
                    </div>
                </div>

                <div className="bg-[var(--background-secondary)] rounded-xl p-4 flex items-center gap-3">
                    <img src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${ownerAddress}`} alt={ownerUsername} className="w-10 h-10 rounded-full bg-[var(--background-primary)]" />
                    <div>
                        <p className="text-sm text-[var(--text-faint)]">Owned by</p>
                        <a href={`/creator/${ownerAddress}`} className="font-semibold text-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] truncate">
                           {ownerUsername}
                        </a>
                    </div>
                </div>
            </div>


            <div className="space-y-3">
                <div className="flex gap-3">
                    <button 
                        className="flex-1 font-bold py-3.5 rounded-xl transition-colors disabled:opacity-80 bg-[var(--button-tertiary-bg)] text-[var(--button-tertiary-text)]"
                        disabled
                    >
                        No Auction
                    </button>
                    <button 
                        onClick={handleInitiatePurchase}
                        disabled={!currentUser || currentUser.walletAddress.toLowerCase() === nft.owner.toLowerCase() || isPurchasing}
                        className="flex-1 bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] font-bold py-3.5 rounded-xl hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                         {isPurchasing && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>}
                        {isPurchasing ? 'Processing...' : 'Buy Now'}
                    </button>
                </div>
                <button className="w-full bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] font-bold py-3.5 rounded-xl">Details</button>

                {!currentUser && <p className="text-center text-xs text-[var(--text-muted)] pt-1">Please sign in to purchase this item.</p>}
                {currentUser?.walletAddress.toLowerCase() === nft.owner.toLowerCase() && <p className="text-center text-xs text-[var(--text-muted)] pt-1">You already own this item.</p>}
            </div>

            <div className="mt-8">
                    <Accordion title="About NFT" defaultOpen>
                    <div className="space-y-4">
                            <div className="flex items-center gap-3">
                            <img src={creatorAvatar} alt={creatorUsername} className="w-12 h-12 rounded-full"/>
                            <div>
                                <p className="font-semibold text-lg text-[var(--text-secondary)]">{creatorUsername}</p>
                                <p className="text-sm text-[var(--text-faint)]">Nova4Future Autumn 2024 Collection</p>
                            </div>
                        </div>
                    </div>
                </Accordion>
                <Accordion title="Details">
                        <div className="space-y-3 text-sm pt-2">
                        <div className="flex justify-between"><span className="text-[var(--text-muted)]">Contract Address</span> <span className="text-[var(--text-secondary)]">Off-Chain</span></div>
                        <div className="flex justify-between"><span className="text-[var(--text-muted)]">Blockchain</span> <span className="text-[var(--text-secondary)]">Ethereum</span></div>
                        <div className="flex justify-between"><span className="text-[var(--text-muted)]">Last Updated</span> <span className="text-[var(--text-secondary)]">{new Date(nft.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
                    </div>
                </Accordion>
            </div>
        </div>

        {moreFromCreator.length > 0 && (
             <section className="my-12 pt-8 border-t border-[var(--border-color)]">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-2xl font-bold">More from {creatorUsername}</h4>
                    <a href={`/creator/${creatorAddress}`} className="text-sm font-semibold text-[var(--accent-text)] hover:brightness-125">
                    See All
                    </a>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    {moreFromCreator.map(item => <NftCard key={item.id} nft={item} />)}
                </div>
            </section>
        )}
        
        {moreFromCategory.length > 0 && (
            <section className="my-12">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-2xl font-bold">More from this category</h4>
                    <a href={`/category/${nft.category}`} className="text-sm font-semibold text-[var(--accent-text)] hover:brightness-125">
                    See All
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {moreFromCategory.map(item => <NftCard key={item.id} nft={item} />)}
                </div>
            </section>
        )}
    </div>
  );
};

export default NftDetailPage;