import React, { useState } from 'react';
import type { User } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';
import { WethIcon } from '../../components/Icons';
import { sendEth } from '../../services/walletService';

const UserWithdrawal: React.FC<{ user: User }> = ({ user }) => {
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const { showNotification } = useNotification();

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !address) {
            showNotification("Please fill in both fields.", "error");
            return;
        }

        setIsProcessing(true);
        showNotification("Preparing transaction...", "info");

        try {
            await sendEth(amount, address);
            showNotification(`Successfully sent ${amount} ETH.`, "success");
            setAmount('');
            setAddress('');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            showNotification(errorMessage, 'error');
        } finally {
            setIsProcessing(false);
        }
    };
    
    const canWithdraw = user.isWalletConnected && user.balanceEth > 0;

    return (
        <div className="animate-fade-in max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">Withdraw Funds</h1>
            <p className="text-[var(--text-muted)] mb-8">Move your ETH balance from the platform to another wallet.</p>
            
            <div className="bg-[var(--background-secondary)] p-6 rounded-2xl">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[var(--text-muted)]">Available Balance</span>
                    <span className="font-semibold text-lg">{user.balanceEth.toFixed(4)} ETH</span>
                </div>
                <form onSubmit={handleWithdraw} className="mt-6 space-y-4">
                     <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-[var(--text-secondary)]">Amount</label>
                        <div className="relative mt-1">
                             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                               <WethIcon />
                            </div>
                            <input 
                                type="text" 
                                id="amount" 
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                                placeholder="0.0" 
                                className="block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md pl-10 pr-4 sm:text-sm h-12"
                                disabled={!canWithdraw || isProcessing}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-[var(--text-secondary)]">Withdrawal Address</label>
                        <input 
                            type="text" 
                            id="address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="0x..." 
                            className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-12 px-4 font-mono"
                             disabled={!canWithdraw || isProcessing}
                        />
                    </div>
                    <div className="pt-2">
                        <button type="submit" disabled={!canWithdraw || isProcessing} className="w-full bg-[var(--accent-primary)] text-white font-bold py-3 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center justify-center">
                             {isProcessing && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>}
                             {isProcessing ? 'Processing...' : 'Send ETH'}
                        </button>
                    </div>
                     {!canWithdraw && (
                        <p className="text-center text-xs text-yellow-500 mt-2">
                            Please connect your wallet and have a balance to make a withdrawal.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserWithdrawal;