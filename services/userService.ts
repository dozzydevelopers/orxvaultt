
import type { User } from '../types';

/**
 * Fetches all users from the backend API.
 * @returns A promise that resolves to an array of User objects.
 */
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch('/api/users');
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        const users: User[] = await response.json();
        return users;
    } catch (error) {
        console.error("Could not fetch users:", error);
        throw new Error(`Could not fetch users:\n${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/**
 * Fetches a specific user's public profile from the backend API.
 * @param userId The ID or wallet address of the user to fetch.
 * @returns A promise that resolves to a User object or null if not found.
 */
export const getUserProfile = async (userId: string): Promise<User | null> => {
    try {
        const response = await fetch(`/api/users/${userId}`);
         if (!response.ok) {
            return null;
        }
        const user: User = await response.json();
        return user;
    } catch (error) {
        console.error(`Could not get user profile for ${userId}:`, error);
        return null;
    }
};