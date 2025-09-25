
import React, { useState } from 'react';
import MobileMenu from './MobileMenu';
import type { User } from '../types';
import { MenuIcon, LogoIcon, SunIcon, MoonIcon, WalletIcon, ProfileIcon, DashboardIcon, SignOutIcon } from './Icons';
import { navigateTo } from '../services/utils';

interface HeaderProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  theme: string;
  onToggleTheme: () => void;
}


const ProfileMenu: React.FC<{ user: User; onClose: () => void; onSignOut: () => void; }> = ({ user, onClose, onSignOut }) => {
  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSignOut();
    onClose();
  };

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigateTo(path);
    onClose();
  };


  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-2 w-72 bg-[var(--background-secondary)] rounded-2xl shadow-lg border border-[var(--border-color-light)] z-50 animate-fade-in py-2">
        <div className="px-4 py-3 border-b border-[var(--border-color-light)]">
          <p className="font-bold text-lg truncate">{user.username}</p>
          <p className="text-sm text-[var(--text-muted)] font-mono break-all">{user.walletAddress || user.id}</p>
        </div>
        <div className="p-2">
          <a href="/profile" onClick={(e) => handleNavigate(e, '/profile')} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[var(--background-primary)] text-left">
            <ProfileIcon className="w-5 h-5 text-[var(--text-muted)]" />
            <span className="text-[var(--text-secondary)]">My Collection</span>
          </a>
          <a href={'/dashboard'} onClick={(e) => handleNavigate(e, '/dashboard')} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[var(--background-primary)] text-left">
            <DashboardIcon className="w-5 h-5 text-[var(--text-muted)]" />
            <span className="text-[var(--text-secondary)]">Dashboard</span>
          </a>
        </div>
        <div className="p-2 border-t border-[var(--border-color-light)]">
          <a href="/signout" onClick={handleSignOut} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[var(--background-primary)] text-left">
            <SignOutIcon className="w-5 h-5 text-[var(--text-muted)]" />
            <span className="text-[var(--text-secondary)]">Sign Out</span>
          </a>
        </div>
      </div>
    </>
  );
};

const Header: React.FC<HeaderProps> = ({ user, onSignIn, onSignOut, theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[var(--background-primary)] fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <LogoIcon className="w-6 h-6 text-[var(--text-primary)]" />
            <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Orxvault</span>
          </a>
        </div>

        <div className="flex items-center gap-2">
           <button 
             onClick={onToggleTheme}
             className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-2"
             title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
           >
             {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
           </button>
           
           {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(prev => !prev)}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--background-primary)] focus:ring-[var(--accent-secondary)]"
                aria-label="Open user menu"
                aria-expanded={isProfileMenuOpen}
              >
                <img src={user.avatarUrl} alt="User avatar" className="w-8 h-8 rounded-full" />
              </button>
              {isProfileMenuOpen && <ProfileMenu user={user} onClose={() => setIsProfileMenuOpen(false)} onSignOut={onSignOut} />}
            </div>
          ) : (
            <button
                onClick={onSignIn}
                className="flex items-center justify-center gap-2 bg-[var(--accent-primary)] text-white font-bold h-10 w-10 sm:w-auto sm:px-4 rounded-full hover:bg-[var(--accent-secondary)] transition-colors text-sm sm:bg-transparent sm:border sm:border-[var(--accent-primary)] sm:text-[var(--accent-text)] sm:hover:bg-[var(--accent-primary-translucent)] sm:hover:text-[var(--accent-text)]"
            >
                <WalletIcon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          <button onClick={() => setIsMenuOpen(true)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-2">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </header>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        onConnect={onSignIn}
      />
    </>
  );
};

export default Header;