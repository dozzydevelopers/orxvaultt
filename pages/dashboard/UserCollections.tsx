import React from 'react';
import type { Collection } from '../../types';
import { CollectionIcon } from '../../components/Icons';

const CollectionCard: React.FC<{ collection: Collection }> = ({ collection }) => (
    <a href={`/collection/${collection.id}`} className="bg-[var(--background-secondary)] rounded-2xl overflow-hidden group">
        <img src={collection.coverImageUrl} alt={collection.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"/>
        <div className="p-4">
            <h3 className="font-bold text-lg truncate text-[var(--text-primary)]">{collection.name}</h3>
            <p className="text-sm text-[var(--text-muted)]">{collection.itemCount} items</p>
        </div>
    </a>
);

interface UserCollectionsProps {
    collections: Collection[];
}

const UserCollections: React.FC<UserCollectionsProps> = ({ collections }) => {
    
    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">My Hosted Exhibitions</h1>
            </div>
            
            {collections.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {collections.map(col => <CollectionCard key={col.id} collection={col} />)}
                </div>
            ) : (
                <div className="text-center py-20 bg-[var(--background-secondary)] rounded-2xl">
                    <CollectionIcon className="w-12 h-12 mx-auto text-[var(--text-faint)] mb-4" />
                    <h3 className="text-xl font-semibold">No Exhibitions Yet</h3>
                    <p className="text-[var(--text-muted)] mt-2 max-w-md mx-auto">Create an NFT and assign it a new collection name to start your first exhibition.</p>
                     <a href="/create" className="mt-6 inline-block bg-[var(--accent-primary)] text-white font-bold py-2.5 px-6 rounded-full hover:bg-[var(--accent-secondary)] transition-colors">
                        Create an NFT
                    </a>
                </div>
            )}
        </div>
    );
};

export default UserCollections;