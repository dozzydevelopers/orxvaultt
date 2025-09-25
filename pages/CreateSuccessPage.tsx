import React from 'react';
import { MarketplaceIcon, PlusIcon } from '../components/Icons';

const CreateSuccessPage: React.FC = () => {
  return (
    <div className="text-center pt-20 animate-fade-in max-w-lg mx-auto">
      <div className="mx-auto w-20 h-20 flex items-center justify-center bg-green-500/20 rounded-full mb-6">
        <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold">Asset Created!</h1>
      <p className="text-[var(--text-muted)] mt-4">
        Your new digital asset has been successfully created and is now available on the marketplace.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a href="/marketplace" className="flex-1 flex items-center justify-center gap-2 bg-[var(--accent-primary)] text-white font-bold py-3 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors">
          <MarketplaceIcon className="w-5 h-5" />
          <span>Explore Marketplace</span>
        </a>
        <a href="/create" className="flex-1 flex items-center justify-center gap-2 border border-[var(--border-color-light)] text-[var(--text-secondary)] font-bold py-3 rounded-xl hover:bg-[var(--background-secondary)] transition-colors">
          <PlusIcon className="w-5 h-5" />
          <span>Create Another</span>
        </a>
      </div>
    </div>
  );
};

export default CreateSuccessPage;
