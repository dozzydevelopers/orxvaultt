import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogoIcon, AtSymbolIcon, KeyIcon, UserIcon, PaperAirplaneIcon } from '../../components/Icons';

const SignUpPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const success = await signup({ username, email, password });
        if (success) {
            setIsSuccess(true);
        }
        setIsLoading(false);
    };

    if (isSuccess) {
        return (
             <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] p-4">
                <div className="max-w-md w-full bg-[var(--background-secondary)] p-8 rounded-2xl shadow-lg border border-[var(--border-color)] animate-fade-in text-center">
                    <PaperAirplaneIcon className="w-16 h-16 text-[var(--accent-text)] mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Check Your Email</h1>
                    <p className="text-[var(--text-muted)] mt-4">
                        We've sent a verification link to <strong>{email}</strong>. Please click the link in the email to activate your account.
                    </p>
                    <div className="mt-8">
                        <a href="/signin" className="text-sm text-[var(--text-faint)] hover:text-[var(--text-primary)] font-semibold">
                            Back to Sign In
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] p-4">
            <div className="max-w-md w-full bg-[var(--background-secondary)] p-8 rounded-2xl shadow-lg border border-[var(--border-color)] animate-fade-in">
                <div className="text-center mb-8">
                     <a href="/" className="inline-flex items-center gap-3 mb-4">
                        <LogoIcon className="w-8 h-8" />
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Create an Account</h1>
                    </a>
                     <p className="text-[var(--text-muted)]">
                        Already have an account? <a href="/signin" className="font-semibold text-[var(--accent-text)] hover:underline">Sign in</a>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-[var(--text-secondary)]">Username</label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <UserIcon className="w-5 h-5 text-[var(--text-faint)]" />
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-12 pl-10"
                            />
                        </div>
                    </div>
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
                                autoComplete="new-password"
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
                            {isLoading ? 'Creating Account...' : 'Create Account'}
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

export default SignUpPage;
