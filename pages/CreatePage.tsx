
import React, { useState } from 'react';
import type { Nft, Category, SiteSettings } from '../types';
import NftCard from '../components/NftCard';
import { WethIcon, SparklesIcon } from '../components/Icons';
import { generateImage, generateDescription, generateNftNames } from '../services/geminiService';
import AIAssistantModal from '../components/AIAssistantModal';
import { mintNft } from '../services/walletService';
import { useNotification } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import NameSuggestionModal from '../components/NameSuggestionModal';
import { navigateTo } from '../services/utils';


interface CreatePageProps {
    isConnected: boolean;
    categories: Category[];
    onMintSuccess: () => void;
    siteSettings: SiteSettings;
}

type SubmissionStatus = 'idle' | 'uploading' | 'confirming' | 'minting' | 'error';

const CreatePage: React.FC<CreatePageProps> = ({ isConnected, categories, onMintSuccess, siteSettings }) => {
    const [imagePreview, setImagePreview] = useState<string | null>('https://picsum.photos/seed/placeholder/600');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [name, setName] = useState('My Awesome NFT');
    const [description, setDescription] = useState('This is a description of my new amazing digital asset.');
    const [category, setCategory] = useState(categories.length > 0 ? categories[0].name : '');
    const [price, setPrice] = useState('0.01');
    
    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const { showNotification } = useNotification();
    const { user: currentUser } = useAuth();

    // State for AI Image Generation
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);

    // State for AI Description Generation
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [assistantText, setAssistantText] = useState('');
    const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
    
    // States for AI Name Generation
    const [isGeneratingName, setIsGeneratingName] = useState(false);
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [generatedNames, setGeneratedNames] = useState<string[]>([]);
    const [nameGenerationError, setNameGenerationError] = useState<string | null>(null);


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            setGenerationError("Please enter a prompt to generate an image.");
            return;
        }
        setIsGenerating(true);
        setGenerationError(null);
        try {
            const base64Image = await generateImage(prompt);
            const dataUrl = `data:image/jpeg;base64,${base64Image}`;
            setImagePreview(dataUrl);
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const file = new File([blob], `${prompt.slice(0, 20)}.jpg`, { type: 'image/jpeg' });
            setImageFile(file);
        } catch (error) {
            console.error(error);
            setGenerationError(error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
            setIsGenerating(false);
        }
    };

     const handleGenerateDescription = async () => {
        setIsGeneratingDesc(true);
        try {
            const generatedDesc = await generateDescription(name, category);
            setAssistantText(generatedDesc);
            setIsAssistantOpen(true);
        } catch (error) {
             setAssistantText(error instanceof Error ? error.message : "Failed to generate description.");
             setIsAssistantOpen(true);
        } finally {
            setIsGeneratingDesc(false);
        }
    };

    const handleGenerateNames = async () => {
        if (!description.trim()) {
            showNotification("Please provide a description to generate names.", 'error');
            return;
        }
        setIsGeneratingName(true);
        setNameGenerationError(null);
        setGeneratedNames([]);
        setIsNameModalOpen(true);
        try {
            const names = await generateNftNames(description, category);
            setGeneratedNames(names);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to generate names.";
            setNameGenerationError(errorMessage);
        } finally {
            setIsGeneratingName(false);
        }
    };

    const handleNameSelect = (selectedName: string) => {
        setName(selectedName);
        setIsNameModalOpen(false);
    };


    const applyAIDescription = () => {
        setDescription(assistantText);
        setIsAssistantOpen(false);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!imageFile) {
            showNotification('Please upload or generate an image for the NFT.', 'error');
            return;
        }

        if (!currentUser || !currentUser.walletAddress) {
            showNotification('Please sign in and connect your wallet to create an asset.', 'error');
            if (!currentUser) navigateTo('/signin');
            return;
        }
        
        setSubmissionStatus('uploading');
        
        try {
            await mintNft({
                name,
                description,
                imageFile,
                price,
                category,
            }, setStatusMessage, currentUser.walletAddress);

            onMintSuccess();

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during creation.';
            showNotification(errorMessage, 'error');
            console.error(error);
        } finally {
            setSubmissionStatus('idle');
            setStatusMessage('');
        }
    };
    
    const getButtonText = () => {
        switch (submissionStatus) {
            case 'uploading':
            case 'confirming':
            case 'minting':
                return statusMessage || 'Processing...';
            default:
                return 'Create & List Asset';
        }
    }

    const mockNft: Nft = {
        id: 'preview',
        tokenId: 'preview',
        nftContract: '0x...',
        name: name || 'Untitled Asset',
        creator: currentUser?.id || 'user_id',
        owner: currentUser?.id || 'user_id',
        priceEth: parseFloat(price) || 0,
        priceUsd: (parseFloat(price) || 0) * 3000, // Dummy conversion
        imageUrl: imagePreview || '',
        category: category,
        isVerified: true,
        description: description || 'No description yet.',
        createdAt: new Date().toISOString(),
    };

    if (!isConnected) {
        return (
            <div className="text-center pt-20 animate-fade-in">
                <h1 className="text-4xl font-bold">Create Asset</h1>
                <p className="text-[var(--text-muted)] mt-4">Please sign in to create a new digital asset.</p>
                 <a href="/signin" className="mt-6 inline-block bg-[var(--accent-primary)] text-white font-bold py-2 px-6 rounded-full hover:bg-[var(--accent-secondary)] transition-colors">
                    Sign In
                </a>
            </div>
        );
    }

    const isSubmitting = submissionStatus !== 'idle';

    return (
        <div className="animate-fade-in max-w-6xl mx-auto">
            {isAssistantOpen && (
                <AIAssistantModal 
                    title="AI Description Assistant"
                    content={assistantText}
                    onClose={() => setIsAssistantOpen(false)}
                    onApply={applyAIDescription}
                    isLoading={isGeneratingDesc}
                />
            )}
            {isNameModalOpen && (
                <NameSuggestionModal
                    title="AI Name Assistant"
                    names={generatedNames}
                    isLoading={isGeneratingName}
                    error={nameGenerationError}
                    onClose={() => setIsNameModalOpen(false)}
                    onSelect={handleNameSelect}
                />
            )}
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Create New Digital Asset</h1>
            <div className="grid md:grid-cols-2 gap-12">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                     {/* AI Generation Section */}
                     <div>
                        <label htmlFor="ai-prompt" className="flex items-center text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Generate Image with AI
                            <SparklesIcon className="w-4 h-4 ml-1.5 text-[var(--accent-text)]" />
                        </label>
                        <textarea
                            id="ai-prompt"
                            name="ai-prompt"
                            rows={3}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="mt-1 block w-full bg-[var(--background-secondary)] border-[var(--border-color-light)] rounded-md shadow-sm focus:ring-[var(--accent-secondary)] focus:border-[var(--accent-secondary)] sm:text-sm p-3"
                            placeholder="e.g., A crystal wolf howling at a neon moon"
                        />
                        <button
                            type="button"
                            onClick={handleGenerateImage}
                            disabled={isGenerating}
                            className="mt-3 w-full flex items-center justify-center gap-2 bg-[var(--accent-primary)] text-white font-bold py-2.5 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-70 disabled:cursor-wait"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="w-5 h-5" />
                                    <span>Generate Image</span>
                                </>
                            )}
                        </button>
                        {generationError && (
                             <div className="mt-3 text-sm text-center p-3 bg-[var(--error-bg)] border border-[var(--error-border)] rounded-md">
                                <p className="font-semibold text-[var(--error-text-header)]">Generation Failed</p>
                                <p className="text-[var(--error-text-body)] mt-1">{generationError}</p>
                             </div>
                        )}
                    </div>
                     
                    <div className="relative flex items-center my-2">
                        <div className="flex-grow border-t border-[var(--border-color-light)]"></div>
                        <span className="flex-shrink mx-4 text-sm text-[var(--text-faint)]">OR</span>
                        <div className="flex-grow border-t border-[var(--border-color-light)]"></div>
                    </div>

                    <div>
                        <label htmlFor="image-upload" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Upload Manually</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[var(--border-color-light)] border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-[var(--text-faint)]" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-[var(--text-muted)]">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-[var(--background-secondary)] rounded-md font-medium text-[var(--accent-text)] hover:brightness-125 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[var(--background-primary)] focus-within:ring-[var(--accent-secondary)] px-1">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-[var(--text-faint)]">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center">
                           <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)]">Name</label>
                            <button type="button" onClick={handleGenerateNames} disabled={isGeneratingName} className="text-xs flex items-center gap-1 text-[var(--accent-text)] font-semibold hover:brightness-125 disabled:opacity-50">
                                <SparklesIcon className="w-3 h-3"/>
                                {isGeneratingName ? 'Generating...' : 'AI Assistant'}
                            </button>
                        </div>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full bg-[var(--background-secondary)] border-[var(--border-color-light)] rounded-md shadow-sm focus:ring-[var(--accent-secondary)] focus:border-[var(--accent-secondary)] sm:text-sm h-10 px-3" required />
                    </div>
                    
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="description" className="block text-sm font-medium text-[var(--text-secondary)]">Description</label>
                             <button type="button" onClick={handleGenerateDescription} disabled={isGeneratingDesc} className="text-xs flex items-center gap-1 text-[var(--accent-text)] font-semibold hover:brightness-125 disabled:opacity-50">
                                <SparklesIcon className="w-3 h-3"/>
                                {isGeneratingDesc ? 'Generating...' : 'AI Assistant'}
                            </button>
                        </div>
                        <textarea id="description" name="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full bg-[var(--background-secondary)] border-[var(--border-color-light)] rounded-md shadow-sm focus:ring-[var(--accent-secondary)] focus:border-[var(--accent-secondary)] sm:text-sm p-3" required></textarea>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-[var(--text-secondary)]">Category</label>
                        <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full bg-[var(--background-secondary)] border-[var(--border-color-light)] rounded-md shadow-sm focus:ring-[var(--accent-secondary)] focus:border-[var(--accent-secondary)] sm:text-sm h-10 px-3">
                            {categories.map(cat => <option key={cat.name}>{cat.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-[var(--text-secondary)]">Price</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                               <WethIcon />
                            </div>
                            <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))} className="block w-full bg-[var(--background-secondary)] border-[var(--border-color-light)] rounded-md pl-10 pr-12 sm:text-sm h-10" placeholder="0.00" required />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-[var(--text-faint)] sm:text-sm" id="price-currency">ETH</span>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-wait mt-4 flex items-center justify-center">
                        {isSubmitting && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>}
                        {getButtonText()}
                    </button>
                    <div className="text-xs text-center text-[var(--text-faint)] mt-2 space-y-1">
                        <p>By creating, you agree to Orxvault's terms.</p>
                        <p>A {siteSettings.salesFeePercent}% commission will be deducted from all future sales.</p>
                    </div>
                </form>

                {/* Preview Section */}
                <div className="flex flex-col items-center">
                   <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Live Preview</h3>
                   <div className="w-64">
                       <NftCard nft={mockNft} />
                   </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;