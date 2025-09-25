import React from 'react';
import type { Nft } from '../types';
import { VerifiedIcon, WethIcon } from './Icons';

interface NftCardProps {
  nft: Nft;
}

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  
  return (
    <a href={`/asset/${nft.id}`} className="block bg-transparent rounded-2xl w-full overflow-hidden transition-all duration-300 group h-full">
      <div className="flex flex-col h-full">
        {/* Image */}
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[var(--background-secondary)]">
          <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Content */}
        <div className="pt-4 flex flex-col flex-grow">
          <h5 className="text-[var(--text-primary)] font-bold truncate text-lg">{nft.name}</h5>
          
          {/* Creator Info with Avatar */}
          {nft.creatorUsername && (
            <div className="flex items-center gap-2 mt-2 text-sm text-[var(--text-muted)]">
              <img 
                src={nft.creatorAvatar ?? `https://api.dicebear.com/8.x/avataaars/svg?seed=${nft.creator}`} 
                alt={nft.creatorUsername} 
                className="w-6 h-6 rounded-full bg-[var(--background-primary)]" 
              />
              <span className="truncate">{nft.creatorUsername}</span>
              {nft.isVerified && <VerifiedIcon className="ml-1 h-4 w-4 flex-shrink-0" />}
            </div>
          )}

          {/* Price Info - Pushed to the bottom and aligned right */}
          <div className="mt-auto pt-3 text-right">
            <div className="flex items-center justify-end gap-1.5">
              <WethIcon className="w-4 h-auto text-[var(--text-muted)]" />
              <p className="text-[var(--text-primary)] font-semibold">
                {nft.priceEth.toFixed(2)} WETH
              </p>
            </div>
            <span className="text-[var(--text-faint)] text-xs">
              (${nft.priceUsd.toLocaleString()})
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NftCard;