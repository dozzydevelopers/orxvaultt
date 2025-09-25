
import React from 'react';
import type { Nft } from '../types';
import NftCard from './NftCard';

interface NftSectionProps {
  title: string;
  nfts: Nft[];
}

const NftSection: React.FC<NftSectionProps> = ({ title, nfts }) => {
  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-2xl font-bold text-[var(--text-primary)] capitalize">{title}</h4>
        <a href={`/category/${encodeURIComponent(title)}`} className="text-sm font-semibold text-[var(--accent-text)] hover:brightness-125">
          See All
        </a>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
        {nfts.map((nft) => (
          <div key={nft.id} className="w-64 flex-shrink-0">
            <NftCard nft={nft} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NftSection;
