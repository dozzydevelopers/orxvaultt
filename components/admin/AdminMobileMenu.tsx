

import React from 'react';
import { CloseIcon, ChevronRightIcon } from '../Icons';
import type { NavItem } from '../../services/navigationService';
import { navigateTo } from '../../services/utils';

interface AdminMobileMenuProps {
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

const AdminMobileMenu: React.FC<AdminMobileMenuProps> = ({ isOpen, onClose, navItems }) => {
    if (!isOpen) return null;

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
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Admin Menu</h2>
                    <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-3">
                    {navItems.map(item => (
                        <MenuItem key={item.href} href={item.href} onClick={onClose}>{item.text}</MenuItem>
                    ))}

                    <div className="!mt-6 pt-4 border-t border-[var(--border-color-light)] space-y-3">
                        <MenuItem href="/signout" onClick={onClose}>Sign Out</MenuItem>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMobileMenu;