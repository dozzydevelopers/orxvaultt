
import React, { useState } from 'react';

interface WithdrawModalProps {
    balance: number;
    onClose: () => void;
    onWithdraw: (amount: string, address: string) => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ balance, onClose, onWithdraw }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
            setError('Please enter a valid Ethereum address.');
            return;
        }
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (numAmount > balance) {
            setError('Withdrawal amount cannot exceed your balance.');
            return;
        }
        onWithdraw(amount, address);
    }
    
    return (
         <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
            <div className="bg-[var(--background-secondary)] p-6 rounded-2xl max-w-md w-full shadow-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold">New Withdrawal</h2>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-[var(--text-secondary)]">Recipient Address</label>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="0x..." className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3 font-mono" required />
                    </div>
                     <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-[var(--text-secondary)]">Amount (ETH)</label>
                        <input type="number" step="any" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.0" className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3" required />
                        <p className="text-xs text-[var(--text-faint)] mt-1">Available: {balance.toFixed(3)} ETH</p>
                    </div>
                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 border border-[var(--border-color-light)] text-[var(--text-secondary)] font-bold py-2.5 rounded-xl hover:bg-[var(--background-primary)] transition-colors">Cancel</button>
                        <button type="submit" className="flex-1 bg-[var(--accent-primary)] text-white font-bold py-2.5 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors">Request Withdrawal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithdrawModal;