import React, { useState, useEffect, useCallback } from 'react';
import type { AdminFeedEvent, Nft, User } from '../../types';
import { UserIcon, PlusIcon, SalesIcon, FireIcon } from '../../components/Icons';
import { generateUUID } from '../../services/utils';

interface AdminFeedProps {
    allNfts: Nft[];
    allUsers: User[];
}

const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
}

const EventIcon: React.FC<{ type: AdminFeedEvent['type'] }> = ({ type }) => {
    const iconMap = {
        new_user: <UserIcon className="w-5 h-5 text-blue-400" />,
        nft_mint: <PlusIcon className="w-5 h-5 text-green-400" />,
        nft_sale: <SalesIcon className="w-5 h-5 text-purple-400" />,
        high_listing: <FireIcon className="w-5 h-5 text-orange-400" />,
    };
    return <div className="w-10 h-10 rounded-full bg-[var(--background-primary)] flex items-center justify-center flex-shrink-0">{iconMap[type]}</div>;
};

const EventItem: React.FC<{ event: AdminFeedEvent }> = ({ event }) => {
    const renderContent = () => {
        switch (event.type) {
            case 'new_user':
                return (
                    <p>
                        New user <a href={`/creator/${event.user?.walletAddress}`} className="font-semibold text-[var(--accent-text)] hover:underline">{event.user?.username}</a> just joined the platform.
                    </p>
                );
            case 'nft_mint':
                return (
                    <p>
                        <a href={`/asset/${event.nft?.id}`} className="font-semibold text-[var(--accent-text)] hover:underline">{event.nft?.name}</a> was just minted by <a href={`/creator/${event.nft?.creator}`} className="font-semibold text-[var(--accent-text)] hover:underline">{event.nft?.creatorUsername}</a>.
                    </p>
                );
            case 'nft_sale':
                return (
                    <p>
                        <a href={`/asset/${event.nft?.id}`} className="font-semibold text-[var(--accent-text)] hover:underline">{event.nft?.name}</a> was sold to <a href={`/creator/${event.details?.buyer?.walletAddress}`} className="font-semibold text-[var(--accent-text)] hover:underline">{event.details?.buyer?.username}</a> for {event.details?.price?.toFixed(2)} ETH.
                    </p>
                );
            case 'high_listing':
                 return (
                    <p>
                        High-value item <a href={`/asset/${event.nft?.id}`} className="font-semibold text-[var(--accent-text)] hover:underline">{event.nft?.name}</a> was listed for {event.details?.price?.toFixed(2)} ETH.
                    </p>
                );
            default:
                return null;
        }
    };
    return (
        <div className="flex gap-4 p-4 border-b border-[var(--border-color)] animate-fade-in">
            <EventIcon type={event.type} />
            <div className="flex-1 text-sm text-[var(--text-secondary)]">
                {renderContent()}
                <p className="text-xs text-[var(--text-faint)] mt-1">{formatTimeAgo(event.timestamp)}</p>
            </div>
        </div>
    );
};


const AdminFeed: React.FC<AdminFeedProps> = ({ allNfts, allUsers }) => {
    const [events, setEvents] = useState<AdminFeedEvent[]>([]);

    const generateRandomEvent = useCallback((): AdminFeedEvent | null => {
        if (allNfts.length === 0 || allUsers.length === 0) return null;

        const eventTypes: AdminFeedEvent['type'][] = ['new_user', 'nft_mint', 'nft_sale', 'high_listing'];
        const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        const randomUser = () => allUsers[Math.floor(Math.random() * allUsers.length)];
        const randomNft = () => allNfts[Math.floor(Math.random() * allNfts.length)];

        let event: AdminFeedEvent = {
            id: generateUUID(),
            type: randomType,
            timestamp: new Date(),
        };

        switch (randomType) {
            case 'new_user':
                event.user = randomUser();
                break;
            case 'nft_mint':
                event.nft = randomNft();
                break;
            case 'nft_sale':
                event.nft = randomNft();
                event.details = { price: event.nft.priceEth, buyer: randomUser() };
                break;
            case 'high_listing':
                const highValueNfts = allNfts.filter(n => n.priceEth > 1);
                event.nft = highValueNfts.length > 0 ? highValueNfts[Math.floor(Math.random() * highValueNfts.length)] : randomNft();
                event.details = { price: event.nft.priceEth };
                break;
        }
        return event;
    }, [allNfts, allUsers]);

    useEffect(() => {
        // Generate initial batch of events
        const initialEvents = Array.from({ length: 10 }, generateRandomEvent)
            .filter((e): e is AdminFeedEvent => e !== null)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        setEvents(initialEvents);

        // Add a new event every few seconds
        const interval = setInterval(() => {
            const newEvent = generateRandomEvent();
            if (newEvent) {
                setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Keep the list to a max of 50
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [generateRandomEvent]);
    

    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Activity Feed</h1>
                <p className="text-[var(--text-muted)] mt-2">A real-time stream of the latest events on the platform.</p>
            </div>
            <div className="bg-[var(--background-secondary)] rounded-2xl max-h-[calc(100vh-200px)] overflow-y-auto">
                {events.length > 0 ? (
                    events.map(event => <EventItem key={event.id} event={event} />)
                ) : (
                    <div className="p-8 text-center text-[var(--text-muted)]">
                        Awaiting platform activity...
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFeed;
