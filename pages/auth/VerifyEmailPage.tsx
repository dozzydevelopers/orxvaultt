import React, { useState, useEffect } from 'react';
import { verifyEmail } from '../../services/authService';
import { LogoIcon, CheckCircleIcon, XCircleIcon } from '../../components/Icons';
import { navigateTo } from '../../services/utils';

const VerifyEmailPage: React.FC = () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email address...');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            setStatus('error');
            setMessage('Verification token not found. Please check the link in your email.');
            return;
        }

        const verify = async () => {
            try {
                const response = await verifyEmail(token);
                setStatus('success');
                setMessage(response.message || 'Your email has been successfully verified!');
            } catch (error) {
                setStatus('error');
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
                setMessage(errorMessage);
            }
        };

        verify();
    }, []);
    
    const renderStatus = () => {
        switch (status) {
            case 'loading':
                return (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-secondary)] mb-6"></div>
                        <h2 className="text-2xl font-bold">Verifying...</h2>
                    </>
                );
            case 'success':
                return (
                    <>
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mb-6" />
                        <h2 className="text-2xl font-bold">Verification Successful!</h2>
                        <p className="text-[var(--text-muted)] mt-2">{message}</p>
                        <button
                            onClick={() => navigateTo('/signin')}
                            className="mt-6 w-full bg-[var(--accent-primary)] text-white font-bold py-3 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors"
                        >
                            Proceed to Sign In
                        </button>
                    </>
                );
            case 'error':
                 return (
                    <>
                        <XCircleIcon className="w-16 h-16 text-red-500 mb-6" />
                        <h2 className="text-2xl font-bold">Verification Failed</h2>
                        <p className="text-[var(--text-muted)] mt-2">{message}</p>
                         <a
                            href="/signin"
                            className="mt-6 inline-block text-sm text-[var(--text-faint)] hover:text-[var(--text-primary)] font-semibold"
                        >
                            Try signing in again
                        </a>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] p-4">
            <div className="max-w-md w-full bg-[var(--background-secondary)] p-8 rounded-2xl shadow-lg border border-[var(--border-color)] animate-fade-in text-center">
                 <a href="/" className="inline-flex items-center gap-3 mb-6">
                    <LogoIcon className="w-8 h-8" />
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Orxvault</h1>
                </a>
                
                {renderStatus()}
            </div>
        </div>
    );
};

export default VerifyEmailPage;