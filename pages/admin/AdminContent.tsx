
import React, { useState } from 'react';
import type { Nft, Collection, Category } from '../../types';
import { EditIcon, DeleteIcon, FireIcon } from '../../components/Icons';

// Simple modal for editing (can be expanded)
const EditModal: React.FC<{ item: Nft | Collection, type: 'NFT' | 'Collection', onClose: () => void, onSave: (item: any) => void }> = ({ item, type, onClose, onSave }) => {
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);

    const handleSave = () => {
        onSave({ ...item, name, description });
        onClose();
    };

    return (
         <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-[var(--background-secondary)] p-6 rounded-2xl max-w-lg w-full shadow-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold">Edit {type}: {item.name}</h2>
                <div className="my-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full bg-[var(--background-primary)] rounded-md h-10 px-3"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 w-full bg-[var(--background-primary)] rounded-md p-3"/>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 border border-[var(--border-color-light)] font-bold py-2.5 rounded-xl">Cancel</button>
                    <button onClick={handleSave} className="flex-1 bg-[var(--accent-primary)] text-white font-bold py-2.5 rounded-xl">Save Changes</button>
                </div>
            </div>
        </div>
    )
};


const AdminContent: React.FC<{ nfts: Nft[], collections: Collection[], categories: Category[] }> = ({ nfts: initialNfts, collections: initialCollections, categories }) => {
    const [activeTab, setActiveTab] = useState('nfts');
    const [nfts, setNfts] = useState(initialNfts);
    const [collections, setCollections] = useState(initialCollections);
    const [editingItem, setEditingItem] = useState<Nft | Collection | null>(null);
    const [editingType, setEditingType] = useState<'NFT' | 'Collection' | null>(null);

    const handleSave = (updatedItem: Nft | Collection) => {
        if (editingType === 'NFT') {
            setNfts(nfts.map(n => n.id === updatedItem.id ? updatedItem as Nft : n));
        } else if (editingType === 'Collection') {
            setCollections(collections.map(c => c.id === updatedItem.id ? updatedItem as Collection : c));
        }
    };
    
    const handleFeatureToggle = (collectionId: string) => {
        setCollections(collections.map(c => c.id === collectionId ? {...c, isFeatured: !c.isFeatured} : c));
    };

    const handleDelete = (id: string, type: 'NFT' | 'Collection') => {
        if(window.confirm(`Are you sure you want to delete this ${type}?`)){
            if(type === 'NFT') setNfts(nfts.filter(n => n.id !== id));
            if(type === 'Collection') setCollections(collections.filter(c => c.id !== id));
        }
    };

    const renderNfts = () => (
        <table className="w-full text-left min-w-[600px]">
            <thead className="border-b border-[var(--border-color-light)]">
                <tr>
                    <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">NFT</th>
                    <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Creator</th>
                    <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Price</th>
                    <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Actions</th>
                </tr>
            </thead>
            <tbody>
                {nfts.map(nft => (
                    <tr key={nft.id} className="border-b border-[var(--border-color)] last:border-b-0 hover:bg-[var(--background-primary)]">
                        <td className="p-4 flex items-center gap-3">
                            <img src={nft.imageUrl} alt={nft.name} className="w-10 h-10 rounded-md"/>
                            <p className="font-semibold">{nft.name}</p>
                        </td>
                        <td className="p-4 font-mono text-sm">{nft.creatorUsername}</td>
                        <td className="p-4 font-mono text-sm">{nft.priceEth.toFixed(2)} ETH</td>
                        <td className="p-4">
                            <div className="flex gap-2">
                                <button onClick={() => { setEditingItem(nft); setEditingType('NFT');}} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"><EditIcon className="w-5 h-5"/></button>
                                <button onClick={() => handleDelete(nft.id, 'NFT')} className="p-2 text-[var(--text-muted)] hover:text-red-500"><DeleteIcon className="w-5 h-5"/></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    
    const renderCollections = () => (
         <table className="w-full text-left min-w-[600px]">
             <thead className="border-b border-[var(--border-color-light)]">
                <tr>
                    <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Collection</th>
                    <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Creator</th>
                    <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Items</th>
                    <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Actions</th>
                </tr>
            </thead>
             <tbody>
                {collections.map(col => (
                    <tr key={col.id} className="border-b border-[var(--border-color)] last:border-b-0 hover:bg-[var(--background-primary)]">
                        <td className="p-4 flex items-center gap-3"><img src={col.coverImageUrl} alt={col.name} className="w-10 h-10 rounded-md"/><p className="font-semibold">{col.name}</p></td>
                        <td className="p-4 font-mono text-sm">{col.creatorUsername}</td>
                        <td className="p-4 text-sm">{col.itemCount}</td>
                        <td className="p-4">
                            <div className="flex gap-2 items-center">
                                <button onClick={() => handleFeatureToggle(col.id)} className={`p-2 rounded-full ${col.isFeatured ? 'text-yellow-400 bg-yellow-400/20' : 'text-[var(--text-muted)] hover:text-yellow-400'}`} title="Feature Collection"><FireIcon className="w-5 h-5"/></button>
                                <button onClick={() => { setEditingItem(col); setEditingType('Collection');}} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"><EditIcon className="w-5 h-5"/></button>
                                <button onClick={() => handleDelete(col.id, 'Collection')} className="p-2 text-[var(--text-muted)] hover:text-red-500"><DeleteIcon className="w-5 h-5"/></button>
                            </div>
                        </td>
                    </tr>
                ))}
             </tbody>
         </table>
    );

    return (
        <div className="animate-fade-in space-y-8">
            {editingItem && editingType && <EditModal item={editingItem} type={editingType} onClose={() => setEditingItem(null)} onSave={handleSave} />}
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Manage Content</h1>
            <div className="border-b border-[var(--border-color-light)] flex gap-4">
                <button onClick={() => setActiveTab('nfts')} className={`py-2 px-4 font-semibold ${activeTab === 'nfts' ? 'border-b-2 border-[var(--accent-text)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>NFTs</button>
                <button onClick={() => setActiveTab('collections')} className={`py-2 px-4 font-semibold ${activeTab === 'collections' ? 'border-b-2 border-[var(--accent-text)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>Collections</button>
            </div>
            <div className="bg-[var(--background-secondary)] rounded-2xl overflow-x-auto">
                {activeTab === 'nfts' && renderNfts()}
                {activeTab === 'collections' && renderCollections()}
            </div>
        </div>
    );
};

export default AdminContent;