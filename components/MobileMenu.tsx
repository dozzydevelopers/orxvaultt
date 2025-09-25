import React from 'react';
import type { User } from '../types';
import { CloseIcon, ChevronRightIcon, SignOutIcon, WalletIcon, ShieldCheckIcon, KeyIcon } from './Icons';


interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onConnect: () => void; // This will now navigate to /signin
}

const MenuItem: React.FC<{ href?: string; onClick?: () => void; children: React.ReactNode, icon?: React.ReactNode }> = ({ href, onClick, children, icon }) => {
    const content = (
        <div className="bg-[var(--background-secondary)] hover:bg-[var(--border-color-light)] transition-colors rounded-xl p-4 flex justify-between items-center w-full text-left">
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-semibold text-md text-[var(--text-primary)]">{children}</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-[var(--text-faint)]" />
        </div>
    );

    if (href) {
        return <a href={href} onClick={onClick}>{content}</a>;
    }

    return <button onClick={onClick} className="w-full">{content}</button>;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, user, onConnect }) => {
    if (!isOpen) return null;
    
    const handleConnect = () => {
        onConnect();
        onClose();
    };

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

                <div className="space-y-3">
                    {!user && (
                         <MenuItem href="/signup" onClick={onClose} icon={<WalletIcon className="w-5 h-5"/>}>Sign Up</MenuItem>
                    )}
                    
                    <MenuItem href="/privacy" onClick={onClose} icon={<ShieldCheckIcon className="w-5 h-5"/>}>Privacy Policy</MenuItem>
                    <MenuItem href="/terms" onClick={onClose} icon={<KeyIcon className="w-5 h-5"/>}>Terms Of Service</MenuItem>
                
                    {user && (
                        <div className="!mt-6 pt-4 border-t border-[var(--border-color-light)] space-y-3">
                            <MenuItem href="/signout" onClick={onClose} icon={<SignOutIcon className="w-5 h-5"/>}>Sign Out</MenuItem>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
