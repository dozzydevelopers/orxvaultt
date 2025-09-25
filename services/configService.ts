import type { SiteSettings } from '../types';

let mockSettings: SiteSettings = {
    mintingFee: 0.05,
    listingFee: 0.02,
    salesFeePercent: 2.5,
    promoBanner: {
        title: "Secure & Trade Premier Digital Assets",
        subtitle: "Explore the vault of the most exclusive digital collections.",
        buttonText: "Get Started",
        link: "/marketplace",
        // FIX: Added missing imageUrl property to satisfy the SiteSettings type.
        imageUrl: "web/images/banner/promo-banner.webp",
    },
    socialLinks: {
        twitter: "#",
        discord: "#"
    }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
    console.log('Fetching site settings');
    return Promise.resolve(mockSettings);
};

export const updateSiteSettings = async (settings: SiteSettings) => {
    console.log('Updating site settings', settings);
    mockSettings = settings;
    return Promise.resolve({ success: true });
};