import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogoIcon, AtSymbolIcon, KeyIcon, InformationCircleIcon } from '../../components/Icons';
import { VerificationError, resendVerificationEmail } from '../../services/authService';
import { useNotification } from '../../contexts/NotificationContext';


const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { showNotification } = useNotification();
    const [isVerificationNeeded, setIsVerificationNeeded] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsVerificationNeeded(false);
        setVerificationMessage('');
        
        try {
            await login({ email, password });
        } catch (error) {
            if (error instanceof VerificationError) {
                setIsVerificationNeeded(true);
                setVerificationMessage(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendEmail = async () => {
        setIsResending(true);
        try {
            const response = await resendVerificationEmail(email);
            showNotification(response.message, 'success');
            setIsVerificationNeeded(false);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to resend email.';
            showNotification(message, 'error');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] p-4">
            <div className="max-w-md w-full bg-[var(--background-secondary)] p-8 rounded-2xl shadow-lg border border-[var(--border-color)] animate-fade-in">
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center gap-3 mb-4">
                        <LogoIcon className="w-8 h-8" />
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Sign In</h1>
                    </a>
                    <p className="text-[var(--text-muted)]">
                        Don't have an account? <a href="/signup" className="font-semibold text-[var(--accent-text)] hover:underline">Sign up</a>
                    </p>
                </div>

                {isVerificationNeeded && (
                    <div className="mb-6 p-4 bg-[var(--error-bg)] border border-[var(--error-border)] rounded-lg text-sm">
                        <div className="flex">
                            <InformationCircleIcon className="w-5 h-5 text-[var(--error-text-header)] mr-3 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-[var(--error-text-header)]">Email Verification Required</h3>
                                <p className="mt-1 text-[var(--error-text-body)]">{verificationMessage}</p>
                                <button
                                    onClick={handleResendEmail}
                                    disabled={isResending}
                                    className="mt-3 font-semibold text-[var(--accent-text)] hover:underline disabled:opacity-50"
                                >
                                    {isResending ? 'Sending...' : 'Resend verification email'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)]">Email Address</label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <AtSymbolIcon className="w-5 h-5 text-[var(--text-faint)]" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-12 pl-10"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)]">Password</label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <KeyIcon className="w-5 h-5 text-[var(--text-faint)]" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-12 pl-10"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-secondary)] disabled:opacity-50"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <a href="/" className="text-sm text-[var(--text-faint)] hover:text-[var(--text-primary)] font-semibold">
                        &larr; Back to Marketplace
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;