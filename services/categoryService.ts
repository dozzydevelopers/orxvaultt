
import type { Category } from '../types';

/**
 * Fetches all categories from the backend API.
 * @returns A promise that resolves to an array of Category objects.
 */
export const getCategories = async (): Promise<Category[]> => {
    try {
        // Use local static JSON fallback to avoid broken /api backend
        const response = await fetch('/categories.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        const categories: Category[] = await response.json();
        return categories;
    } catch (error) {
        console.error('Could not fetch categories:', error);
        throw new Error(`Could not fetch categories:\n${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};