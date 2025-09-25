
import React from 'react';
import { HomeIcon, MarketplaceIcon, PlusIcon, ProfileIcon, SignOutIcon } from './Icons';

const Footer: React.FC<{ route: string }> = ({ route }) => {
  const getIconClass = (path: string) => {
    const baseClass = "hover:text-[var(--accent-text)] transition-colors";
    let isActive = false;
    
    if (path === '/') {
        isActive = route === '/';
    } else if (path === '/marketplace') {
        isActive = route === '/marketplace' || route.startsWith('/category/') || route.startsWith('/asset/');
    } else {
        isActive = route === path;
    }

    return isActive ? `text-[var(--accent-text)] ${baseClass}` : `text-[var(--text-muted)] ${baseClass}`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[var(--background-secondary-translucent)] backdrop-blur-md border-t border-[var(--border-color)] z-50">
      <div className="flex justify-around items-center h-20 px-4">
        <a href="/" className={getIconClass('/')}>
          <HomeIcon />
        </a>
        <a href="/marketplace" className={getIconClass('/marketplace')}>
          <MarketplaceIcon />
        </a>
        <a href="/create" className="bg-[var(--accent-primary)] rounded-full p-3 text-white shadow-lg shadow-[var(--shadow-color)] hover:bg-[var(--accent-secondary)] transform -translate-y-4">
          <PlusIcon />
        </a>
        <a href="/profile" className={getIconClass('/profile')}>
          <ProfileIcon />
        </a>
        <a href="/signout" className="text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors">
          <SignOutIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
