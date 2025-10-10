
import React, { useEffect, useState } from 'react';

const DepositModal: React.FC<{ address: string; onClose: () => void; expiresAt?: string }> = ({ address, onClose, expiresAt }) => {
    const [remaining, setRemaining] = useState<string>('');
    useEffect(() => {
        const update = () => {
            if (!expiresAt) return setRemaining('');
            const diff = new Date(expiresAt).getTime() - Date.now();
            if (diff <= 0) return setRemaining('Expired');
            const m = Math.floor(diff / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            setRemaining(`${m}:${s.toString().padStart(2, '0')}`);
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [expiresAt]);
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
            <div className="bg-[var(--background-secondary)] p-6 sm:p-8 rounded-2xl max-w-sm w-full shadow-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-center">Deposit ETH</h2>
                <p className="text-center text-[var(--text-muted)] mt-2">Send ETH to this address to fund your account.</p>
                {expiresAt && <p className="text-center text-xs text-[var(--text-faint)] mt-1">This address expires in {remaining}</p>}
                <div className="flex justify-center my-6">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${address}&bgcolor=1C1C24&color=ffffff&qzone=1`} 
                        alt="Deposit QR Code" 
                        className="rounded-lg border-4 border-[var(--border-color-light)]"
                    />
                </div>
                <div className="bg-[var(--background-primary)] p-3 rounded-lg text-center">
                    <p className="text-xs text-[var(--text-faint)]">Your Deposit Address</p>
                    <p className="font-mono text-sm break-all mt-1">{address}</p>
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-[var(--accent-primary)] text-white font-bold py-2.5 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors">
                    Done
                </button>
            </div>
        </div>
    );
};

export default DepositModal;