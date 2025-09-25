import React from 'react';
import type { Collection } from '../types';

interface ExhibitionCardProps {
  collection: Collection;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ collection }) => {
  return (
    <a href={`/collection/${collection.id}`} className="block relative rounded-2xl overflow-hidden group aspect-video">
      <img src={collection.coverImageUrl} alt={collection.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold">{collection.name}</h3>
        <p className="text-sm">by {collection.creator}</p>
      </div>
    </a>
  );
};

export default ExhibitionCard;
