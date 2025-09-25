
import React from 'react';
import type { Nft, SiteSettings, Category } from '../types';
import CategoryCarousel from '../components/CategoryCarousel';
import PromoBanner from '../components/PromoBanner';
import NftSection from '../components/NftSection';
import Hero from '../components/Hero';

const HomePage: React.FC<{
    groupedNfts: Record<string, Nft[]>;
    promoBanner: SiteSettings['promoBanner'];
    nfts: Nft[];
    categories: Category[];
}> = ({ groupedNfts, promoBanner, nfts, categories }) => {
    const featuredNfts = nfts.slice(0, 5);
    return (
        <div className="animate-fade-in">
            <Hero nfts={featuredNfts} />
            <CategoryCarousel categories={categories} />
            <PromoBanner promoBanner={promoBanner}/>
            <div className="space-y-8">
                {categories.map(category => category.name).map(categoryName => (
                    groupedNfts[categoryName] && groupedNfts[categoryName].length > 0 && 
                    <NftSection key={categoryName} title={categoryName} nfts={groupedNfts[categoryName]} />
                ))}
            </div>
        </div>
    )
};

export default HomePage;
