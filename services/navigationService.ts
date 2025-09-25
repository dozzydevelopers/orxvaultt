

import React from 'react';
import { 
    MarketplaceIcon, StatsIcon, DashboardIcon, ProfileIcon, CollectionIcon, 
    SalesIcon, BillingIcon, WithdrawalIcon, ShieldCheckIcon, SettingsIcon,
    UsersIcon, ContentIcon, RocketIcon, SparklesIcon, FireIcon, PlusIcon
} from '../components/Icons';

// FIX: Rewrote GavelIcon and CurrencyDollarIcon to use React.createElement instead of JSX syntax,
// which is not allowed in .ts files. This resolves the multiple TypeScript errors.
const GavelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    React.createElement('svg', { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" }),
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21.75c-2.39 0-4.45-1.5-5.25-3.5h10.5c-.8 2-2.86 3.5-5.25 3.5Z" }),
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5.625 18a10.45 10.45 0 0 1-1.34-1.343 10.45 10.45 0 0 1-1.343-1.34 10.45 10.45 0 0 1-1.34-1.343M18.375 18a10.45 10.45 0 0 0 1.34-1.343 10.45 10.45 0 0 0 1.343-1.34 10.45 10.45 0 0 0 1.34-1.343M2.25 12c0-1.63.46-3.15 1.25-4.5M21.75 12c0-1.63-.46-3.15-1.25-4.5" })
    )
);
const CurrencyDollarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    React.createElement('svg', { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0l.879-.659M7.5 12l3-2.25m0 0 3 2.25M7.5 12l3 2.25M12 15v3.75" })
    )
);


export interface NavItem {
    href: string;
    icon: React.ReactNode;
    text: string;
    section: 'main' | 'account' | 'site';
    isFooter?: boolean;
}

export const userNavItems: NavItem[] = [
    { href: '/dashboard', icon: React.createElement(DashboardIcon, { className: "w-6 h-6" }), text: 'Dashboard', section: 'main', isFooter: true },
    { href: '/profile', icon: React.createElement(ProfileIcon, { className: "w-6 h-6" }), text: 'My Collection', section: 'main' },
    { href: '/dashboard/exhibitions', icon: React.createElement(CollectionIcon, { className: "w-6 h-6" }), text: 'Exhibitions', section: 'main', isFooter: true },
    { href: '/dashboard/auctions', icon: React.createElement(FireIcon, { className: "w-5 h-5" }), text: 'Auctions', section: 'main' },
    { href: '/dashboard/sales', icon: React.createElement(SalesIcon, { className: "w-6 h-6" }), text: 'Sales', section: 'main', isFooter: true },
    { href: '/dashboard/transactions', icon: React.createElement(BillingIcon, { className: "w-5 h-5" }), text: 'Transactions', section: 'main' },
    { href: '/dashboard/withdrawal', icon: React.createElement(WithdrawalIcon, { className: "w-5 h-5" }), text: 'Withdrawal', section: 'main' },
    { href: '/dashboard/verification', icon: React.createElement(ShieldCheckIcon, { className: "w-5 h-5" }), text: 'Verification', section: 'account' },
    { href: '/dashboard/settings', icon: React.createElement(SettingsIcon, { className: "w-6 h-6" }), text: 'Settings', section: 'account', isFooter: true },
    { href: '/marketplace', icon: React.createElement(MarketplaceIcon, { className: "w-5 h-5" }), text: 'Marketplace', section: 'site' },
    { href: '/stats', icon: React.createElement(StatsIcon, { className: "w-5 h-5" }), text: 'Stats', section: 'site' },
];

export const adminNavItems: NavItem[] = [
    { href: '/admin/dashboard', icon: React.createElement(DashboardIcon, { className: "w-6 h-6" }), text: 'Dashboard', section: 'main', isFooter: true },
    { href: '/admin/feed', icon: React.createElement(StatsIcon, { className: "w-5 h-5" }), text: 'Activity Feed', section: 'main' },
    { href: '/admin/users', icon: React.createElement(UsersIcon, { className: "w-6 h-6" }), text: 'User Management', section: 'main', isFooter: true },
    { href: '/admin/content', icon: React.createElement(ContentIcon, { className: "w-6 h-6" }), text: 'Content', section: 'main', isFooter: true },
    { href: '/admin/moderation', icon: React.createElement(GavelIcon, { className: "w-5 h-5" }), text: 'Moderation Queue', section: 'main' },
    { href: '/admin/transactions', icon: React.createElement(CurrencyDollarIcon, { className: "w-5 h-5" }), text: 'Transactions', section: 'main' },
    { href: '/admin/create-nft', icon: React.createElement(PlusIcon, { className: "w-5 h-5" }), text: 'Create NFT', section: 'main' },
    { href: '/admin/ai-generator', icon: React.createElement(SparklesIcon, { className: "w-5 h-5" }), text: 'AI Content Engine', section: 'main' },
    { href: '/admin/settings', icon: React.createElement(SettingsIcon, { className: "w-6 h-6" }), text: 'Settings', section: 'account', isFooter: true },
    { href: '/marketplace', icon: React.createElement(MarketplaceIcon, { className: "w-5 h-5" }), text: 'Back to Site', section: 'site' },
];
