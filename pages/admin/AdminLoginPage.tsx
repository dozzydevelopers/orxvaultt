
import React, { useState, useEffect } from 'react';
import { LogoIcon, ShieldCheckIcon, SignOutIcon } from '../../components/Icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';


const AdminLoginPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { loginWithAdminWallet, user, logout } = useAuth();
    const { showNotification } = useNotification();

    const handleAdminLogin = async () => {
        setIsLoading(true);
        await loginWithAdminWallet();
        setIsLoading(false);
    };
    
    useEffect(() => {
        // If there's no user logged in, automatically attempt the admin wallet connection.
        if (!user) {
            handleAdminLogin();
        }
    }, []); // The empty dependency array ensures this runs only once when the component mounts.

    const handleDisconnect = () => {
        logout();
        showNotification("Wallet disconnected.", "info");
    };

    const isConnectedButNotAdmin = user && user.role !== 'Admin';

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] p-4">
            <div className="max-w-md w-full bg-[var(--background-secondary)] p-8 rounded-2xl shadow-lg border border-[var(--border-color)] text-center animate-fade-in">
                <div className="flex justify-center items-center gap-3 mb-4">
                    <LogoIcon className="w-8 h-8" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Orxvault Admin</h1>
                </div>
                <p className="text-[var(--text-muted)] mb-8">
                    Please connect an authorized administrator wallet to access the panel.
                </p>

                {!user && (
                    <button
                        onClick={handleAdminLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-[var(--accent-primary)] text-white font-bold py-3 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                        <ShieldCheckIcon className="w-6 h-6" />
                        {isLoading ? 'Connecting...' : 'Connect Admin Wallet'}
                    </button>
                )}

                {isConnectedButNotAdmin && (
                    <div className="mt-6 text-sm p-3 bg-[var(--error-bg)] border border-[var(--error-border)] rounded-md space-y-3">
                        <div>
                            <p className="font-semibold text-[var(--error-text-header)]">Authorization Failed</p>
                            <p className="text-[var(--error-text-body)] mt-1">The connected wallet is not an administrator.</p>
                        </div>
                         <button
                            onClick={handleDisconnect}
                            className="w-full flex items-center justify-center gap-2 bg-[var(--background-primary)] text-[var(--text-secondary)] font-semibold py-2 rounded-md hover:bg-[var(--border-color-light)] transition-colors text-sm"
                        >
                            <SignOutIcon className="w-4 h-4"/>
                            Disconnect and Try Again
                        </button>
                    </div>
                )}
                 <div className="mt-8">
                    <a href="/" className="text-sm text-[var(--text-faint)] hover:text-[var(--text-primary)] font-semibold">
                        &larr; Back to Marketplace
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;