import React from 'react';
import type { Collection } from '../types';
import CollectionCard from '../components/CollectionCard';

interface CollectionsPageProps {
  collections: Collection[];
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({ collections }) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-[var(--text-primary)] my-6">All Collections</h1>
      <p className="text-[var(--text-muted)] mb-8">
        Explore curated collections from various creators in the vault.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
