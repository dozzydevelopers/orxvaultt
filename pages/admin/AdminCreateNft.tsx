
import React, { useState } from 'react';
import type { Nft, Category, User } from '../../types';
import NftCard from '../../components/NftCard';
import { WethIcon, SparklesIcon } from '../../components/Icons';
import { generateImage, generateDescription, generateNftNames } from '../../services/geminiService';
import AIAssistantModal from '../../components/AIAssistantModal';
import { mintNft } from '../../services/walletService';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import NameSuggestionModal from '../../components/NameSuggestionModal';

interface AdminCreateNftProps {
    users: User[];
    categories: Category[];
    onMintSuccess: () => void;
}

type SubmissionStatus = 'idle' | 'uploading' | 'confirming' | 'minting' | 'error';

const AdminCreateNft: React.FC<AdminCreateNftProps> = ({ users, categories, onMintSuccess }) => {
    const [imagePreview, setImagePreview] = useState<string | null>('https://picsum.photos/seed/placeholder/600');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [name, setName] = useState('AI Generated Masterpiece');
    const [description, setDescription] = useState('A unique digital asset, conceived by AI and minted by an administrator.');
    const [category, setCategory] = useState(categories.length > 0 ? categories[0].name : '');
    const [price, setPrice] = useState('0.01');
    const [selectedCreatorId, setSelectedCreatorId] = useState<string>(users.length > 0 ? users[0].walletAddress : '');
    
    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const { showNotification } = useNotification();
    const { user: adminUser } = useAuth();

    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [assistantText, setAssistantText] = useState('');
    const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
    const [isGeneratingName, setIsGeneratingName] = useState(false);
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [generatedNames, setGeneratedNames] = useState<string[]>([]);
    const [nameGenerationError, setNameGenerationError] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => setImagePreview(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateImage = async () => {
        if (!prompt.trim()) return;
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
        if (!description.trim()) return;
        setIsGeneratingName(true);
        setNameGenerationError(null);
        setGeneratedNames([]);
        setIsNameModalOpen(true);
        try {
            const names = await generateNftNames(description, category);
            setGeneratedNames(names);
        } catch (error) {
            setNameGenerationError(error instanceof Error ? error.message : "Failed to generate names.");
        } finally {
            setIsGeneratingName(false);
        }
    };

    const applyAIDescription = () => {
        setDescription(assistantText);
        setIsAssistantOpen(false);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            showNotification('Please upload or generate an image.', 'error');
            return;
        }
        if (!selectedCreatorId) {
            showNotification('Please select a creator.', 'error');
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
            }, setStatusMessage, selectedCreatorId);
            onMintSuccess();
            showNotification('NFT created successfully on behalf of user!', 'success');
        } catch (error) {
            showNotification(error instanceof Error ? error.message : 'Creation failed.', 'error');
        } finally {
            setSubmissionStatus('idle');
            setStatusMessage('');
        }
    };
    
    const isSubmitting = submissionStatus !== 'idle';
    const selectedCreator = users.find(u => u.walletAddress === selectedCreatorId);

    const mockNft: Nft = {
        id: 'preview', tokenId: 'preview', nftContract: '0x...', name: name || 'Untitled',
        creator: selectedCreatorId, owner: adminUser?.walletAddress || '0x...', priceEth: parseFloat(price) || 0,
        priceUsd: (parseFloat(price) || 0) * 3000, imageUrl: imagePreview || '', category,
        isVerified: selectedCreator?.isVerified || false, description, createdAt: new Date().toISOString(),
        creatorUsername: selectedCreator?.username, creatorAvatar: selectedCreator?.avatarUrl,
    };

    return (
        <div className="animate-fade-in max-w-6xl mx-auto">
            {isAssistantOpen && <AIAssistantModal title="AI Description" content={assistantText} onClose={() => setIsAssistantOpen(false)} onApply={applyAIDescription} isLoading={isGeneratingDesc} />}
            {isNameModalOpen && <NameSuggestionModal title="AI Name Suggestions" names={generatedNames} isLoading={isGeneratingName} error={nameGenerationError} onClose={() => setIsNameModalOpen(false)} onSelect={setName} />}
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Create NFT as Admin</h1>
            <div className="grid md:grid-cols-2 gap-12">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Creator Selection */}
                    <div>
                        <label htmlFor="creator" className="block text-sm font-medium text-[var(--text-secondary)]">Assign Creator</label>
                        <select id="creator" value={selectedCreatorId} onChange={(e) => setSelectedCreatorId(e.target.value)} className="mt-1 block w-full bg-[var(--background-secondary)] border-[var(--border-color-light)] rounded-md shadow-sm h-10 px-3">
                            {users.map(user => <option key={user.id} value={user.walletAddress}>{user.username} - {user.walletAddress.slice(0, 8)}...</option>)}
                        </select>
                    </div>

                    {/* AI Image Generation */}
                    <div>
                        <label htmlFor="ai-prompt" className="flex items-center text-sm font-medium text-[var(--text-secondary)] mb-2">Generate Image with AI</label>
                        <textarea id="ai-prompt" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} className="mt-1 block w-full bg-[var(--background-secondary)] p-3" placeholder="e.g., A biomechanical hummingbird..." />
                        <button type="button" onClick={handleGenerateImage} disabled={isGenerating} className="mt-3 w-full flex items-center justify-center gap-2 bg-[var(--accent-primary)] text-white font-bold py-2.5 rounded-xl">
                            {isGenerating ? 'Generating...' : <><SparklesIcon className="w-5 h-5" /> Generate Image</>}
                        </button>
                        {generationError && <p className="mt-2 text-sm text-red-500">{generationError}</p>}
                    </div>
                     
                    <div className="relative flex items-center my-2"><div className="flex-grow border-t border-[var(--border-color-light)]"></div><span className="flex-shrink mx-4 text-sm text-[var(--text-faint)]">OR</span><div className="flex-grow border-t border-[var(--border-color-light)]"></div></div>

                    {/* Manual Upload */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Upload Manually</label>
                        <input type="file" onChange={handleImageUpload} accept="image/*" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                    </div>

                    {/* Other fields */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)]">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full bg-[var(--background-secondary)] h-10 px-3" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-[var(--text-secondary)]">Description</label>
                        <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full bg-[var(--background-secondary)] p-3" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-[var(--text-secondary)]">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full bg-[var(--background-secondary)] h-10 px-3">
                            {categories.map(cat => <option key={cat.name}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-[var(--text-secondary)]">Price</label>
                        <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))} className="mt-1 block w-full bg-[var(--background-secondary)] h-10 px-3" placeholder="0.00" required />
                    </div>
                    
                    <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl mt-4">
                        {isSubmitting ? statusMessage || 'Processing...' : 'Create & List Asset'}
                    </button>
                </form>

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

export default AdminCreateNft;
