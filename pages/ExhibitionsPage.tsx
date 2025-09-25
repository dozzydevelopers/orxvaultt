import React, { useState } from 'react';
import type { Collection } from '../types';
import ExhibitionCard from '../components/ExhibitionCard';
import SearchBar from '../components/SearchBar';
import PromoBanner from '../components/PromoBanner';
import { PlusIcon } from '../components/Icons';

interface ExhibitionsPageProps {
  collections: Collection[];
}

const ExhibitionsPage: React.FC<ExhibitionsPageProps> = ({ collections }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('hosted');

    const promoBanner = {
        title: "Collect And Sell<br />Extraordinary NFTs",
        subtitle: "Discover exclusive artwork to buy or sell.",
        buttonText: "Create NFT",
        link: "/create",
        imageUrl: "https://images.unsplash.com/photo-1634695062423-958742c388e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    };

    const TabButton: React.FC<{ tab: string; label: string; }> = ({ tab, label }) => (
         <button
            onClick={() => setActiveTab(tab)}
            className={`w-1/2 py-3 font-semibold text-center transition-colors ${
                activeTab === tab 
                ? 'border-b-2 border-[var(--text-primary)] text-[var(--text-primary)]' 
                : 'text-[var(--text-muted)]'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] my-6">Exhibitions</h1>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <PromoBanner promoBanner={promoBanner} />

            <div className="flex border-b border-[var(--border-color-light)] my-6">
                <TabButton tab="hosted" label="Hosted Exhibitions" />
                <TabButton tab="ongoing" label="Ongoing Exhibitions" />
            </div>

            {activeTab === 'hosted' && (
                <div className="animate-fade-in">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Hosted Exhibitions</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                         <a href="/create" className="flex flex-col items-center justify-center bg-[var(--background-secondary)] rounded-2xl aspect-square text-center p-4 group hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-[var(--border-color-light)] flex items-center justify-center mb-4 group-hover:bg-[var(--border-color)] transition-colors">
                                <PlusIcon className="w-8 h-8 text-[var(--text-faint)]" />
                            </div>
                            <p className="font-semibold text-[var(--text-secondary)]">Create Exhibition</p>
                        </a>
                    </div>
                </div>
            )}

            {activeTab === 'ongoing' && (
                <div className="animate-fade-in">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Ongoing Exhibitions</h2>
                     {collections.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {collections.filter(c => c.isFeatured).map((collection) => (
                              <ExhibitionCard key={collection.id} collection={collection} />
                            ))}
                        </div>
                    ) : (
                         <p className="text-[var(--text-muted)] text-center py-10">No ongoing exhibitions found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExhibitionsPage;
