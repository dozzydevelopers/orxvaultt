
import type { Category } from '../types';
import { apiFetchWithFallback } from './utils';

/**
 * Fetches all categories from the backend API.
 * @returns A promise that resolves to an array of Category objects.
 */
export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await apiFetchWithFallback('/categories');
        if (!response.ok) {
            const errorBody = await response.text();
            console.error('API Error Body:', errorBody);
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        const categories: Category[] = await response.json();
        return categories;
    } catch (error) {
        console.error('Could not fetch categories:', error);
        throw new Error(`Could not fetch categories:\n${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};