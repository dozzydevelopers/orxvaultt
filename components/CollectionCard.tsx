
import React from 'react';
import type { Collection } from '../types';

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  return (
    <a href={`/collection/${collection.id}`} className="block bg-[var(--background-secondary)] rounded-2xl overflow-hidden shadow-lg hover:shadow-[var(--shadow-color)] transition-all duration-300 transform hover:-translate-y-1">
      <div className="w-full h-48">
        <img src={collection.coverImageUrl} alt={collection.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h5 className="text-[var(--text-primary)] font-bold truncate text-lg">{collection.name}</h5>
        <p className="text-sm text-[var(--text-muted)] mt-1 truncate">by {collection.creatorUsername || collection.creator}</p>
        <p className="text-sm text-[var(--text-faint)] mt-2">{collection.itemCount} items</p>
      </div>
    </a>
  );
};

export default CollectionCard;
