

import React, { useState } from 'react';
import type { User, Nft, Collection, Category, SiteSettings } from '../types';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminContent from '../pages/admin/AdminContent';
import AdminSettings from '../pages/admin/AdminSettings';
import { LogoIcon, MenuIcon } from '../components/Icons';
import AdminMobileMenu from '../components/admin/AdminMobileMenu';
import AdminFeed from '../pages/admin/AdminFeed';
import AdminAutoGenerator from '../pages/admin/AdminAutoGenerator';
import { adminNavItems } from '../services/navigationService';
import DashboardFooter from '../components/DashboardFooter';
import AdminModerationQueue from '../pages/admin/AdminModerationQueue';
import AdminTransactions from '../pages/admin/AdminTransactions';
import AdminCreateNft from '../pages/admin/AdminCreateNft';

interface AdminLayoutProps {
    route: string;
    isAdmin: boolean;
    stats: { nfts: number; collections: number; users: number; totalVolume: number };
    allUsers: User[];
    allNfts: Nft[];
    allCollections: Collection[];
    allCategories: Category[];
    siteSettings: SiteSettings;
    setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
    onMintSuccess: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const renderContent = () => {
        const subRoute = props.route.substring('/admin'.length);
        switch(subRoute) {
            case '/users': return <AdminUsers users={props.allUsers} />;
            case '/content': return <AdminContent nfts={props.allNfts} collections={props.allCollections} categories={props.allCategories} />;
            case '/moderation': return <AdminModerationQueue nfts={props.allNfts} />;
            case '/transactions': return <AdminTransactions nfts={props.allNfts} users={props.allUsers} />;
            case '/create-nft': return <AdminCreateNft users={props.allUsers} categories={props.allCategories} onMintSuccess={props.onMintSuccess} />;
            case '/ai-generator': return <AdminAutoGenerator categories={props.allCategories} />;
            case '/settings': return <AdminSettings settings={props.siteSettings} onSave={props.setSiteSettings} />;
            case '/feed': return <AdminFeed allNfts={props.allNfts} allUsers={props.allUsers} />;
            case '/dashboard':
            default: return <AdminDashboard stats={props.stats} allNfts={props.allNfts} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <AdminSidebar currentPath={props.route} navItems={adminNavItems} />
            
            <div className="flex-1 flex flex-col">
                 <header className="md:hidden bg-[var(--background-secondary)] h-16 flex items-center justify-between px-4 border-b border-[var(--border-color)] sticky top-0 z-10">
                     <a href="/admin/dashboard" className="flex items-center gap-2">
                        <LogoIcon className="w-6 h-6 text-[var(--text-primary)]" />
                        <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Admin</span>
                    </a>
                    <button onClick={() => setIsMenuOpen(true)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-2">
                        <MenuIcon className="w-6 h-6" />
                    </button>
                 </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[var(--background-primary)] pb-24 md:pb-8">
                    {renderContent()}
                </main>
            </div>
            
            <DashboardFooter currentPath={props.route} navItems={adminNavItems} />
             <AdminMobileMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                navItems={adminNavItems}
            />
        </div>
    );
};

export default AdminLayout;
