
import React from 'react';
import { LogoIcon, SignOutIcon } from './Icons';
import type { NavItem } from '../services/navigationService';
import { navigateTo } from '../services/utils';


interface DashboardSidebarProps {
    currentPath: string;
    navItems: NavItem[];
}

const NavLink: React.FC<{ href: string; icon: React.ReactNode; text: string; isActive: boolean }> = ({ href, icon, text, isActive }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo(href);
    };
    
    return (
        <a 
            href={href}
            onClick={handleClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                ? 'bg-[var(--accent-primary-translucent)] text-[var(--accent-text)]' 
                : 'text-[var(--text-muted)] hover:bg-[var(--background-primary)] hover:text-[var(--text-primary)]'
            }`}
        >
            {icon}
            <span className="font-semibold">{text}</span>
        </a>
    );
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ currentPath, navItems }) => {
    
    const mainItems = navItems.filter(item => item.section === 'main');
    const accountItems = navItems.filter(item => item.section === 'account');
    const siteItems = navItems.filter(item => item.section === 'site');

    return (
        <aside className="hidden md:flex flex-col w-64 bg-[var(--background-secondary)] p-4 border-r border-[var(--border-color)]">
            <div className="flex items-center gap-2 p-4">
                <LogoIcon className="w-8 h-8 text-[var(--text-primary)]" />
                <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Orxvault</span>
            </div>
            
            <nav className="flex flex-col gap-2 mt-8 flex-grow">
                 {mainItems.map(item => (
                    <NavLink key={item.href} href={item.href} icon={item.icon} text={item.text} isActive={currentPath.startsWith(item.href)} />
                ))}
                
                {(accountItems.length > 0) && <div className="h-px bg-[var(--border-color-light)] my-2"></div>}
                {accountItems.map(item => (
                    <NavLink key={item.href} href={item.href} icon={item.icon} text={item.text} isActive={currentPath.startsWith(item.href)} />
                ))}

                {(siteItems.length > 0) && <div className="h-px bg-[var(--border-color-light)] my-2"></div>}
                {siteItems.map(item => (
                    <NavLink key={item.href} href={item.href} icon={item.icon} text={item.text} isActive={currentPath === item.href} />
                ))}
            </nav>
            
            <div className="flex flex-col gap-2 border-t border-[var(--border-color-light)] pt-4">
                 <NavLink href="/signout" icon={<SignOutIcon className="w-5 h-5"/>} text="Sign Out" isActive={false} />
            </div>
        </aside>
    );
};

export default DashboardSidebar;