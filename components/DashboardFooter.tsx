
import React from 'react';
import type { NavItem } from '../services/navigationService';
import { navigateTo } from '../services/utils';

interface DashboardFooterProps {
    currentPath: string;
    navItems: NavItem[];
}

const NavItem: React.FC<{ href: string, icon: React.ReactNode, text: string, isActive: boolean }> = ({ href, icon, text, isActive }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo(href);
    };

    return (
        <a href={href} onClick={handleClick} className={`flex flex-col items-center justify-center gap-1 w-full transition-colors ${isActive ? 'text-[var(--accent-text)]' : 'text-[var(--text-muted)] hover:text-[var(--accent-text)]'}`}>
            {icon}
            <span className="text-xs font-medium">{text}</span>
        </a>
    );
};

const DashboardFooter: React.FC<DashboardFooterProps> = ({ currentPath, navItems }) => {
    const footerItems = navItems.filter(item => item.isFooter);

    return (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--background-secondary-translucent)] backdrop-blur-md border-t border-[var(--border-color)] z-20">
            <div className="flex justify-around items-center h-20 px-2">
                {footerItems.map(item => (
                    <NavItem 
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        text={item.text}
                        isActive={currentPath.startsWith(item.href)}
                    />
                ))}
            </div>
        </footer>
    );
};

export default DashboardFooter;