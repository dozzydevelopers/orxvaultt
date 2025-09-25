
import React, { useState } from 'react';
import type { User, Collection, Nft } from '../types';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardFooter from '../components/DashboardFooter';
import UserDashboard from '../pages/dashboard/UserDashboard';
import UserCollections from '../pages/dashboard/UserCollections';
import UserSettings from '../pages/dashboard/UserSettings';
import { MenuIcon, LogoIcon } from '../components/Icons';
import DashboardMobileMenu from '../components/DashboardMobileMenu';
import UserVerification from '../pages/dashboard/UserVerification';
import UserSales from '../pages/dashboard/UserSales';
import UserTransactions from '../pages/dashboard/UserTransactions';
import UserWithdrawal from '../pages/dashboard/UserWithdrawal';
import { userNavItems } from '../services/navigationService';
import UserAuctions from '../pages/dashboard/UserAuctions';

interface DashboardLayoutProps {
    route: string;
    user: User | null;
    collections: Collection[];
    userNfts: Nft[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
    const { 
        route, user, collections, userNfts
    } = props;
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!user) {
        return (
            <div className="text-center pt-20 animate-fade-in">
                <h1 className="text-4xl font-bold text-[var(--error-text-header)]">Access Denied</h1>
                <p className="text-[var(--text-muted)] mt-4">You must be logged in to view this page.</p>
                <a href="/" className="mt-6 inline-block bg-[var(--accent-primary)] text-white font-bold py-2 px-6 rounded-full hover:bg-[var(--accent-secondary)] transition-colors">
                    Go to Homepage
                </a>
            </div>
        );
    }
    
    const renderContent = () => {
        const subRoute = route.substring('/dashboard'.length);
        switch(subRoute) {
            case '/exhibitions': return <UserCollections collections={collections} />;
            case '/auctions': return <UserAuctions userNfts={userNfts} />;
            case '/verification': return <UserVerification />;
            case '/settings': return <UserSettings user={user} />;
            case '/sales': return <UserSales />;
            case '/transactions': return <UserTransactions />;
            case '/withdrawal': return <UserWithdrawal user={user} />;
            case '':
            default: return <UserDashboard user={user} nfts={userNfts} />;
        }
    }
    

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <DashboardSidebar currentPath={route} navItems={userNavItems} />
            
            <div className="flex-1 flex flex-col">
                 <header className="md:hidden bg-[var(--background-secondary)] h-16 flex items-center justify-between px-4 border-b border-[var(--border-color)] sticky top-0 z-10">
                     <a href="/" className="flex items-center gap-2">
                        <LogoIcon className="w-6 h-6 text-[var(--text-primary)]" />
                        <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Dashboard</span>
                    </a>
                    <button onClick={() => setIsMenuOpen(true)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-2">
                        <MenuIcon className="w-6 h-6" />
                    </button>
                 </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[var(--background-primary)] pb-24 md:pb-8">
                    {renderContent()}
                </main>
            </div>
            
            <DashboardFooter currentPath={route} navItems={userNavItems} />
             <DashboardMobileMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                navItems={userNavItems}
            />
        </div>
    );
};

export default DashboardLayout;