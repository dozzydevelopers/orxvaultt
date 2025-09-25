
import React from 'react';
import { CloseIcon, ChevronRightIcon } from './Icons';
import type { NavItem } from '../services/navigationService';
import { navigateTo } from '../services/utils';

interface DashboardMobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navItems: NavItem[];
}

const MenuItem: React.FC<{ href: string; onClick: () => void; children: React.ReactNode }> = ({ href, onClick, children }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo(href);
        onClick();
    };

    return (
        <a href={href} onClick={handleClick} className="bg-[var(--background-secondary)] hover:bg-[var(--border-color-light)] transition-colors rounded-xl p-4 flex justify-between items-center w-full text-left">
            <span className="font-semibold text-md text-[var(--text-primary)]">{children}</span>
            <ChevronRightIcon className="w-5 h-5 text-[var(--text-faint)]" />
        </a>
    );
};

const DashboardMobileMenu: React.FC<DashboardMobileMenuProps> = ({ isOpen, onClose, navItems }) => {
    if (!isOpen) return null;

    const sections = navItems.reduce((acc, item) => {
        acc[item.section] = acc[item.section] || [];
        acc[item.section].push(item);
        return acc;
    }, {} as Record<string, NavItem[]>);

    return (
        <div 
            className="fixed inset-0 z-[100] bg-[var(--background-primary-translucent)] backdrop-blur-md animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-[var(--background-primary)] w-full h-auto absolute bottom-0 rounded-t-2xl p-4 shadow-2xl animate-slide-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6 px-2">
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Menu</h2>
                    <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-3 pb-24">
                    {sections.main?.map(item => <MenuItem key={item.href} href={item.href} onClick={onClose}>{item.text}</MenuItem>)}
                    
                    {sections.account && <div className="h-px bg-[var(--border-color-light)] !my-3"></div>}
                    {sections.account?.map(item => <MenuItem key={item.href} href={item.href} onClick={onClose}>{item.text}</MenuItem>)}
                    
                    {sections.site && <div className="h-px bg-[var(--border-color-light)] !my-3"></div>}
                    {sections.site?.map(item => <MenuItem key={item.href} href={item.href} onClick={onClose}>{item.text}</MenuItem>)}

                    <div className="!mt-6 pt-4 border-t border-[var(--border-color-light)] space-y-3">
                        <MenuItem href="/help" onClick={onClose}>Help Center</MenuItem>
                        <MenuItem href="/signout" onClick={onClose}>Sign Out</MenuItem>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMobileMenu;