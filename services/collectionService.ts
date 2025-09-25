
import type { Collection } from '../types';

/**
 * Fetches all collections from the backend API.
 * @returns A promise that resolves to an array of Collection objects.
 */
export const getCollections = async (): Promise<Collection[]> => {
    try {
        const response = await fetch('/api/collections');
        if (!response.ok) {
            throw new Error(`Failed to fetch collections: ${response.statusText}`);
        }
        const collections: Collection[] = await response.json();
        return collections;
    } catch (error) {
        console.error("Could not fetch collections:", error);
        throw new Error(`Could not fetch collections:\n${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};