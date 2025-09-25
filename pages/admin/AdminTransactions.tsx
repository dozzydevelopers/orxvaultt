

import React, { useMemo } from 'react';
import type { Nft, User, Transaction } from '../../types';
import { ArrowDownLeftIcon, ArrowUpRightIcon, PlusIcon } from '../../components/Icons';

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const getIcon = () => {
        switch(transaction.type) {
            case 'Sale': return <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><ArrowDownLeftIcon className="w-4 h-4 text-green-400" /></div>;
            case 'Mint': return <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><PlusIcon className="w-4 h-4 text-blue-400" /></div>;
            case 'Transfer': return <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center"><ArrowUpRightIcon className="w-4 h-4 text-yellow-400" /></div>;
        }
    }
    return (
        <tr className="border-b border-[var(--border-color)] last:border-b-0 hover:bg-[var(--background-primary)]">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    {getIcon()}
                    <div>
                        <p className="font-semibold">{transaction.type}</p>
                        <p className="text-xs text-[var(--text-muted)]">{new Date(transaction.timestamp).toLocaleDateString()}</p>
                    </div>
                </div>
            </td>
            <td className="p-4">
                 <div className="flex items-center gap-3">
                    <img src={transaction.nft.imageUrl} alt={transaction.nft.name} className="w-10 h-10 rounded-md"/>
                    <p className="font-semibold truncate">{transaction.nft.name}</p>
                </div>
            </td>
            <td className="p-4 font-mono text-sm text-right">{transaction.amountEth.toFixed(2)} ETH</td>
            <td className="p-4 font-mono text-sm">{transaction.from.username}</td>
            <td className="p-4 font-mono text-sm">{transaction.to.username}</td>
        </tr>
    )
};


const AdminTransactions: React.FC<{ nfts: Nft[], users: User[] }> = ({ nfts, users }) => {

    const transactions = useMemo((): Transaction[] => {
        if (users.length === 0) return [];
        
        // FIX: Explicitly type the transaction object to ensure the 'type' property is correctly inferred as 'Mint' | 'Sale' instead of the wider 'string' type.
        return nfts.map(nft => {
            const creator = users.find(u => u.walletAddress.toLowerCase() === nft.creator.toLowerCase()) || users[0];
            const owner = users.find(u => u.walletAddress.toLowerCase() === nft.owner.toLowerCase()) || users[1] || users[0];

            if(creator.id === owner.id) {
                const transaction: Transaction = {
                    id: `mint-${nft.id}`,
                    type: 'Mint',
                    nft,
                    amountEth: nft.priceEth,
                    from: creator,
                    to: creator,
                    timestamp: nft.createdAt
                }
                return transaction;
            } else {
                 const transaction: Transaction = {
                    id: `sale-${nft.id}`,
                    type: 'Sale',
                    nft,
                    amountEth: nft.priceEth,
                    from: creator,
                    to: owner,
                    timestamp: new Date(new Date(nft.createdAt).getTime() + 86400000).toISOString() // Assume sale happened 1 day after mint
                }
                return transaction;
            }
        }).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    }, [nfts, users]);

    return (
        <div className="animate-fade-in space-y-8">
             <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Transactions</h1>
                <p className="text-[var(--text-muted)] mt-2">A complete log of all sales and mints across the platform.</p>
            </div>
             <div className="bg-[var(--background-secondary)] rounded-2xl overflow-x-auto">
                 <table className="w-full text-left min-w-[800px]">
                    <thead className="border-b border-[var(--border-color-light)]">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Event</th>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Item</th>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)] text-right">Amount</th>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">From</th>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};

export default AdminTransactions;