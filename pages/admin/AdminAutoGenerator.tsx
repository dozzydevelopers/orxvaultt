import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Nft, Category } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import * as geminiService from '../../services/geminiService';
import * as walletService from '../../services/walletService';
import { SparklesIcon } from '../../components/Icons';
import NftCard from '../../components/NftCard';

type Stage = 'idle' | 'generating' | 'ready_to_mint' | 'minting' | 'error';

interface PreviewData {
    image: string;
    name: string;
    description: string;
    imageFile: File | null;
    concept: string;
}

const AdminAutoGenerator: React.FC<{ categories: Category[] }> = ({ categories }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [stage, setStage] = useState<Stage>('idle');
    const [statusLog, setStatusLog] = useState<string[]>([]);
    const [previewData, setPreviewData] = useState<PreviewData | null>(null);
    const [mintedNfts, setMintedNfts] = useState<Nft[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [price, setPrice] = useState('0.01');
    const [category, setCategory] = useState(categories[0]?.name || 'Art');

    const { user } = useAuth();
    const { showNotification } = useNotification();
    const isGeneratingRef = useRef(false);

    const log = (message: string) => {
        setStatusLog(prev => [message, ...prev]);
    };

    const runGenerationCycle = useCallback(async () => {
        if (isGeneratingRef.current) return;
        isGeneratingRef.current = true;
        setStage('generating');
        setError(null);
        setPreviewData(null);
        log('Starting new generation cycle...');
        try {
            log('1. Generating artistic concept...');
            const concept = await geminiService.generateArtisticConcept();
            log(`Concept: "${concept}"`);

            log('2. Generating NFT name...');
            const name = await geminiService.generateNftName(concept);
            log(`Name: "${name}"`);

            log('3. Generating image...');
            const base64Image = await geminiService.generateImage(concept);
            const dataUrl = `data:image/jpeg;base64,${base64Image}`;
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const imageFile = new File([blob], `${name.replace(/\s+/g, '-')}.jpg`, { type: 'image/jpeg' });
            log('Image generated successfully.');

            log('4. Generating description...');
            const description = await geminiService.generateDescription(name, category);
            log('Description generated.');

            setPreviewData({ image: dataUrl, name, description, imageFile, concept });
            setStage('ready_to_mint');
            log('NFT ready for minting.');
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(errorMessage);
            setStage('error');
            log(`Error: ${errorMessage}`);
            setIsRunning(false);
        } finally {
            isGeneratingRef.current = false;
        }
    }, [category]);

    useEffect(() => {
        if (isRunning && stage !== 'generating' && stage !== 'minting') {
            runGenerationCycle();
        }
    }, [isRunning, stage, runGenerationCycle]);

    const handleMintAndContinue = async () => {
        if (!previewData || !previewData.imageFile || !user) return;
        
        setStage('minting');
        setError(null);
        log('Minting process started...');

        try {
            log('Initiating on-chain minting process...');
            await walletService.mintNft({
                name: previewData.name,
                description: previewData.description,
                imageFile: previewData.imageFile,
                price,
                category,
            }, log);

            const newNft: Nft = {
                id: `minted-${Date.now()}`,
                tokenId: 'pending...',
                nftContract: 'pending...',
                name: previewData.name,
                creator: user.walletAddress,
                owner: user.walletAddress,
                priceEth: parseFloat(price) || 0,
                priceUsd: (parseFloat(price) || 0) * 3000, // Dummy conversion
                imageUrl: previewData.image,
                category,
                isVerified: user.isVerified,
                description: previewData.description,
                createdAt: new Date().toISOString(),
                creatorUsername: user.username,
                creatorAvatar: user.avatarUrl,
                ownerUsername: user.username,
            };

            setMintedNfts(prev => [newNft, ...prev]);
            showNotification(`${previewData.name} minted successfully!`, 'success');
            log('Mint successful!');

            if (isRunning) {
                runGenerationCycle();
            } else {
                setStage('idle');
            }

        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during minting.';
            setError(errorMessage);
            setStage('error');
            log(`Error: ${errorMessage}`);
            setIsRunning(false);
        }
    };
    
    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">AI Content Engine</h1>
                <p className="text-[var(--text-muted)] mt-2">Use generative AI to create and mint unique NFTs directly to the marketplace. This is a powerful tool for seeding content and kickstarting collections.</p>
            </div>
            
            <div className="bg-[var(--background-secondary)] p-6 rounded-2xl flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[200px]">
                    <label htmlFor="price" className="block text-sm font-medium text-[var(--text-secondary)]">Mint Price (ETH)</label>
                    <input type="text" id="price" value={price} onChange={e => setPrice(e.target.value.replace(/[^0-9.]/g, ''))} className="mt-1 w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3"/>
                </div>
                 <div className="flex-1 min-w-[200px]">
                    <label htmlFor="category" className="block text-sm font-medium text-[var(--text-secondary)]">Category</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3">
                        {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                </div>
                <div className="self-end">
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`w-full md:w-auto font-bold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 ${isRunning ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                    >
                        <SparklesIcon className="w-5 h-5"/>
                        {isRunning ? 'Stop Process' : 'Start Process'}
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Live Status</h2>
                    <div className="bg-[var(--background-secondary)] h-96 rounded-2xl p-4 flex flex-col-reverse overflow-y-auto">
                        <ul className="space-y-2 text-sm">
                            {statusLog.map((msg, i) => <li key={i} className="font-mono text-[var(--text-muted)] animate-fade-in">{msg}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="space-y-4">
                     <h2 className="text-xl font-bold">Preview & Action</h2>
                     <div className="bg-[var(--background-secondary)] h-96 rounded-2xl p-4 flex items-center justify-center">
                        {stage === 'generating' && <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-secondary)]"></div>}
                        {stage === 'error' && <div className="text-center text-[var(--error-text-body)] p-4">{error}</div>}
                        {stage === 'idle' && <div className="text-center text-[var(--text-muted)]">Start the process to begin.</div>}
                        {stage === 'ready_to_mint' && previewData && (
                            <div className="text-center">
                                <div className="w-48 mx-auto">
                                    <NftCard nft={{
                                        id: 'preview', tokenId: 'preview', nftContract: '0x...', name: previewData.name, creator: user!.walletAddress, owner: user!.walletAddress,
                                        priceEth: parseFloat(price), priceUsd: 0, imageUrl: previewData.image, category, isVerified: true, description: previewData.description, createdAt: new Date().toISOString()
                                    }}/>
                                </div>
                                 <button onClick={handleMintAndContinue} className="mt-4 bg-[var(--accent-primary)] text-white font-bold py-2.5 px-6 rounded-full hover:bg-[var(--accent-secondary)]">
                                    Mint & Generate Next
                                </button>
                            </div>
                        )}
                         {stage === 'minting' && (
                             <div className="text-center text-[var(--text-muted)]">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-secondary)] mb-4"></div>
                                <p>Minting in progress...</p>
                                <p className="text-xs">Please confirm in your wallet.</p>
                            </div>
                         )}
                     </div>
                </div>
            </div>
             <div>
                <h2 className="text-2xl font-bold mb-4">Recently Generated NFTs</h2>
                {mintedNfts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {mintedNfts.map(nft => <NftCard key={nft.id} nft={nft} />)}
                    </div>
                ) : (
                    <div className="bg-[var(--background-secondary)] p-8 rounded-lg text-center">
                        <p className="text-[var(--text-muted)]">Successfully minted NFTs will appear here.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminAutoGenerator;