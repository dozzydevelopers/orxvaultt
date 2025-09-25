
import React, { useState, useEffect } from 'react';
import type { Nft } from '../types';
import { WethIcon, VerifiedIcon } from './Icons';

interface HeroProps {
  nfts: Nft[];
}

const Hero: React.FC<HeroProps> = ({ nfts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % nfts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [nfts.length]);
  
  if (!nfts || nfts.length === 0) {
    return null;
  }

  const currentNft = nfts[currentIndex];

  return (
    <div className="relative rounded-2xl overflow-hidden my-8 min-h-[400px] md:min-h-[450px] flex items-end p-6 md:p-8 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
          {nfts.map((nft, index) => (
               <img
                    key={nft.id}
                    src={nft.imageUrl}
                    alt={nft.name}
                    className={`w-full h-full object-cover transition-opacity duration-1000 absolute inset-0 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                />
          ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="md:max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {currentNft.name}
          </h1>
          <div className="flex items-center mt-3 text-md text-gray-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span>By {currentNft.creator}</span>
            {currentNft.isVerified && <VerifiedIcon className="ml-2 h-5 w-5" />}
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <p className="text-xs text-gray-300">Current Price</p>
                <div className="flex items-center gap-2 mt-1">
                  <WethIcon className="w-4 h-6"/>
                  <p className="font-bold text-xl">
                    {currentNft.priceEth.toFixed(2)} WETH
                  </p>
                </div>
            </div>
            
             <a href={`/asset/${currentNft.id}`} className="bg-[var(--accent-primary)] text-white font-bold py-3 px-8 rounded-full hover:bg-[var(--accent-secondary)] transition-colors shadow-lg animate-fade-in" style={{ animationDelay: '0.8s' }}>
                View Asset
             </a>
        </div>

      </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {nfts.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    </div>
  );
};

export default Hero;