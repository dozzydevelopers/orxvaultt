
import type { User } from '../types';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials extends LoginCredentials {
    username: string;
}

interface AuthResponse {
    token: string;
    user: User;
}

interface SuccessResponse {
    success: boolean;
    message: string;
}

export class VerificationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'VerificationError';
    }
}

/**
 * Logs in a user by calling the backend API.
 * @param credentials The user's email and password.
 * @returns A promise that resolves to the auth token and user object.
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Local mock login: accept any email/password and create a user from users.json
    const usersRes = await fetch('/users.json');
    const users: User[] = usersRes.ok ? await usersRes.json() : [];
    const mockUser = users[0] || {
        id: '0x0000000000000000000000000000000000000000',
        walletAddress: '',
        username: credentials.email.split('@')[0],
        role: 'User',
        avatarUrl: `https://api.dicebear.com/8.x/avataaars/svg?seed=${credentials.email}`,
        bio: '',
        isVerified: true,
        balanceEth: 0,
        isWalletConnected: false,
      } as User;

    const token = `mock-token-${Date.now()}`;
    localStorage.setItem('authToken', token);
    return { token, user: mockUser };
};

/**
 * Signs up a new user by calling the backend API.
 * This will create the user and trigger a verification email, but not log them in.
 * @param credentials The new user's username, email, and password.
 * @returns A promise that resolves to a success message.
 */
export const signup = async (credentials: SignupCredentials): Promise<SuccessResponse> => {
    // Local mock signup
    return { success: true, message: 'Signup successful. Please verify your email.' };
};

/**
 * Logs out the current user by removing the auth token.
 */
export const logout = (): void => {
    localStorage.removeItem('authToken');
};

/**
 * Fetches the current user's data by verifying the stored token with the backend.
 * @returns A promise that resolves to the user object.
 */
export const getCurrentUser = async (): Promise<{ user: User }> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('No auth token found.');
    }
    // Return a simple mock user session
    const usersRes = await fetch('/users.json');
    const users: User[] = usersRes.ok ? await usersRes.json() : [];
    const user = users[0] || {
        id: '0x0000000000000000000000000000000000000000',
        walletAddress: '',
        username: 'User',
        role: 'User',
        avatarUrl: `https://api.dicebear.com/8.x/avataaars/svg?seed=user`;
        bio: '',
        isVerified: true,
        balanceEth: 0,
        isWalletConnected: false,
      } as User;
    return { user };
};

/**
 * Sends a verification token to the backend to activate a user's account.
 * @param token The verification token from the email link.
 * @returns A promise that resolves if the verification is successful.
 */
export const verifyEmail = async (_token: string): Promise<SuccessResponse> => {
    return { success: true, message: 'Email verified.' };
};


/**
 * Requests the backend to resend a verification email.
 * @param email The user's email address.
 * @returns A promise that resolves if the request is successful.
 */
export const resendVerificationEmail = async (_email: string): Promise<SuccessResponse> => {
    return { success: true, message: 'Verification email sent.' };
};

/**
 * Links a wallet address to the currently authenticated user's account.
 * @param walletAddress The address to link.
 * @returns A promise that resolves with the updated user object.
 */
export const linkWallet = async (walletAddress: string): Promise<{ user: User }> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Authentication required to link wallet.');
    }
    // Update a mock user with wallet link
    const { user } = await getCurrentUser();
    const updatedUser: User = { ...user, walletAddress };
    return { user: updatedUser };
};