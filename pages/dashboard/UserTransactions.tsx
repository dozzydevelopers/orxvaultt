
import React from 'react';
import EmptyState from '../../components/EmptyState';
import { BillingIcon } from '../../components/Icons';

const UserTransactions: React.FC = () => {
    // In a real application, you would fetch transaction data here.
    const transactions: any[] = [];

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">Transaction History</h1>
            {transactions.length > 0 ? (
                <div>
                    {/* Table or list of transactions would go here */}
                </div>
            ) : (
                <EmptyState
                    icon={<BillingIcon className="w-12 h-12" />}
                    title="No Transactions Found"
                    message="Your history of purchases, sales, and mints will be displayed here. This feature is coming soon."
                />
            )}
        </div>
    );
};

export default UserTransactions;
