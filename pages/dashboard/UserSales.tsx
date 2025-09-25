
import React from 'react';
import EmptyState from '../../components/EmptyState';
import { SalesIcon } from '../../components/Icons';

const UserSales: React.FC = () => {
    // In a real application, you would fetch sales data here.
    const sales: any[] = [];

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">Sales History</h1>
            {sales.length > 0 ? (
                <div>
                    {/* Table or list of sales would go here */}
                </div>
            ) : (
                <EmptyState
                    icon={<SalesIcon className="w-12 h-12" />}
                    title="No Sales Yet"
                    message="When you sell one of your created NFTs, the transaction will appear here."
                />
            )}
        </div>
    );
};

export default UserSales;
