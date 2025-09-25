
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import type { Nft } from '../../types';

interface AdminDashboardProps {
    stats: { nfts: number; collections: number; users: number; totalVolume: number };
    allNfts: Nft[];
}

const StatCard: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="bg-[var(--background-secondary)] p-6 rounded-2xl">
        <p className="text-sm text-[var(--text-muted)]">{label}</p>
        <p className="text-3xl font-bold text-[var(--text-primary)] mt-1">{value}</p>
    </div>
);

// Custom theme colors for charts
const COLORS = ['#D97706', '#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A', '#FEF3C7'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stats, allNfts }) => {
    
    // Process data for sales volume chart (mocking sales data from creation dates)
    const salesData = allNfts
        .map(nft => ({
            date: new Date(nft.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' }),
            volume: nft.priceEth
        }))
        .reduce((acc, { date, volume }) => {
            acc[date] = (acc[date] || 0) + volume;
            return acc;
        }, {} as Record<string, number>);

    const chartSalesData = Object.entries(salesData)
        // FIX: Cast `volume` to `number` to resolve TypeScript error where it was inferred as `unknown`.
        .map(([name, volume]) => ({ name, volume: parseFloat((volume as number).toFixed(2)) }))
        .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    // Process data for category distribution pie chart
    const categoryData = allNfts.reduce((acc, nft) => {
        acc[nft.category] = (acc[nft.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const chartCategoryData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));
    

    return (
        <div className="animate-fade-in space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total NFTs" value={stats.nfts.toLocaleString()} />
                <StatCard label="Total Users" value={stats.users.toLocaleString()} />
                <StatCard label="Total Collections" value={stats.collections.toLocaleString()} />
                <StatCard label="Total Volume" value={`${stats.totalVolume.toFixed(2)} ETH`} />
            </div>
             <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-[var(--background-secondary)] p-6 rounded-2xl">
                     <h2 className="text-xl font-bold mb-4">Sales Volume (ETH)</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartSalesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color-light)" />
                            <XAxis dataKey="name" stroke="var(--text-muted)" />
                            <YAxis stroke="var(--text-muted)" />
                            <Tooltip contentStyle={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-color)' }}/>
                            <Legend />
                            <Bar dataKey="volume" fill="var(--accent-primary)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="lg:col-span-2 bg-[var(--background-secondary)] p-6 rounded-2xl">
                    <h2 className="text-xl font-bold mb-4">NFTs by Category</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartCategoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {chartCategoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip contentStyle={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-color)' }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
