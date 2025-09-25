import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { User } from '../types';
import * as authService from '../services/authService';
import * as walletService from '../services/walletService';
import { useNotification } from './NotificationContext';
import { navigateTo } from '../services/utils';
import { ADMIN_ADDRESSES } from '../constants';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    token: string | null;
    login: (credentials: authService.LoginCredentials) => Promise<void>;
    signup: (credentials: authService.SignupCredentials) => Promise<boolean>;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    linkWallet: () => Promise<boolean>;
    loginWithAdminWallet: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
    const [isLoading, setIsLoading] = useState(true);
    const { showNotification } = useNotification();

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setToken(null);
        showNotification("You have been signed out.", "info");
    }, [showNotification]);

    const login = async (credentials: authService.LoginCredentials) => {
        setIsLoading(true);
        try {
            const data = await authService.login(credentials);
            setUser(data.user);
            setToken(data.token);
            showNotification(`Welcome back, ${data.user.username}!`, 'success');
            navigateTo('/');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            if (!(error instanceof authService.VerificationError)) {
                 showNotification(message, 'error');
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (credentials: authService.SignupCredentials) => {
        setIsLoading(true);
        try {
            await authService.signup(credentials);
            return true;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Sign up failed';
            showNotification(message, 'error');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const linkWallet = async (): Promise<boolean> => {
        setIsLoading(true);
        try {
            const { address, provider } = await walletService.connectRealWallet();
            const { user: updatedUser } = await authService.linkWallet(address);
            
            // Fetch balance after linking
            const balance = await walletService.getWalletBalance(provider, address);
            updatedUser.balanceEth = balance;
            updatedUser.isWalletConnected = true;

            setUser(updatedUser);
            showNotification('Wallet linked successfully!', 'success');
            return true;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to link wallet.';
            showNotification(message, 'error');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithAdminWallet = async (): Promise<boolean> => {
        setIsLoading(true);
        try {
            const { address, provider } = await walletService.connectRealWallet();
            const isAdmin = ADMIN_ADDRESSES.map(a => a.toLowerCase()).includes(address.toLowerCase());

            if (!isAdmin) {
                throw new Error('This wallet is not authorized for admin access.');
            }

            const balance = await walletService.getWalletBalance(provider, address);
            const adminUser: User = {
                id: address,
                walletAddress: address,
                username: 'Admin',
                role: 'Admin',
                avatarUrl: `https://api.dicebear.com/8.x/avataaars/svg?seed=${address}`,
                bio: 'Platform Administrator',
                isVerified: true,
                balanceEth: balance,
                isWalletConnected: true,
            };

            setUser(adminUser);
            const adminToken = 'admin-wallet-session';
            setToken(adminToken);
            localStorage.setItem('authToken', adminToken);

            showNotification('Admin wallet connected.', 'success');
            navigateTo('/admin/dashboard');
            return true;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to connect wallet.';
            showNotification(message, 'error');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const verifyToken = async () => {
            const currentToken = localStorage.getItem('authToken');
            if (currentToken && !currentToken.startsWith('admin-wallet-session')) {
                try {
                    const data = await authService.getCurrentUser();
                    const userAccount = data.user;
                    
                    if (userAccount.walletAddress) {
                        try {
                            const { provider } = await walletService.connectRealWallet();
                            const balance = await walletService.getWalletBalance(provider, userAccount.walletAddress);
                            userAccount.balanceEth = balance;
                            userAccount.isWalletConnected = true;
                        } catch (walletError) {
                            console.warn("Could not auto-connect to wallet for balance update, but session is valid.");
                            userAccount.isWalletConnected = false;
                            userAccount.balanceEth = 0;
                        }
                    } else {
                        userAccount.isWalletConnected = false;
                        userAccount.balanceEth = 0;
                    }
                    
                    setUser(userAccount);
                } catch (error) {
                    console.log("Session expired or invalid, logging out.");
                    logout();
                }
            }
            setIsLoading(false);
        };
        verifyToken();
    }, [logout]);
    
    return (
        <AuthContext.Provider value={{ user, isLoading, token, login, signup, logout, setUser, linkWallet, loginWithAdminWallet }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};