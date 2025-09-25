
import React from 'react';
import type { Collection, Nft } from '../types';
import NftCard from '../components/NftCard';
import { ArrowLeftIcon } from '../components/Icons';

interface CollectionDetailPageProps {
  collection: Collection;
  nfts: Nft[];
}

const CollectionDetailPage: React.FC<CollectionDetailPageProps> = ({ collection, nfts }) => {
  return (
    <div className="animate-fade-in">
      <a href="/collections" className="inline-flex items-center gap-2 text-[var(--accent-text)] hover:brightness-125 mb-4 font-semibold">
        <ArrowLeftIcon />
        <span>Back to Collections</span>
      </a>
      
      <div className="mb-8">
        <div className="h-64 bg-[var(--background-secondary)] rounded-2xl bg-cover bg-center mb-4" style={{ backgroundImage: `url(${collection.coverImageUrl})`}}></div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">{collection.name}</h1>
        <p className="text-[var(--text-muted)] mt-2">by {collection.creatorUsername || collection.creator}</p>
        <p className="text-[var(--text-secondary)] mt-4 max-w-2xl">{collection.description}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Items in Collection ({nfts.length})</h2>
      {nfts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
          {nfts.map((nft) => (
            <NftCard key={nft.id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-[var(--background-secondary)] rounded-xl">
          <p className="text-[var(--text-muted)]">There are no items in this collection yet.</p>
        </div>
      )}
    </div>
  );
};

export default CollectionDetailPage;
