
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
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 403 && data.error === 'email_not_verified') {
            throw new VerificationError(data.message || 'Email not verified.');
        }
        throw new Error(data.message || 'Login failed. Please check your credentials.');
    }

    const authData: AuthResponse = data;
    localStorage.setItem('authToken', authData.token);
    return authData;
};

/**
 * Signs up a new user by calling the backend API.
 * This will create the user and trigger a verification email, but not log them in.
 * @param credentials The new user's username, email, and password.
 * @returns A promise that resolves to a success message.
 */
export const signup = async (credentials: SignupCredentials): Promise<SuccessResponse> => {
    const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        let errorMessage = 'Signup failed. Please try again.';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
             // Ignore if response is not json
        }
        throw new Error(errorMessage);
    }

    const data: SuccessResponse = await response.json();
    return data;
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
        throw new Error("No auth token found.");
    }
    
    // The admin-wallet-session is a special frontend-only token for the demo.
    // We should not send it to a real backend.
    if (token.startsWith('admin-wallet-session')) {
         throw new Error("Admin wallet session is not a valid user session for this API.");
    }

    const response = await fetch(`/api/auth/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        // Token is invalid or expired, remove it.
        localStorage.removeItem('authToken');
        throw new Error("Session expired or invalid.");
    }
    
    const data: { user: User } = await response.json();
    return data;
};

/**
 * Sends a verification token to the backend to activate a user's account.
 * @param token The verification token from the email link.
 * @returns A promise that resolves if the verification is successful.
 */
export const verifyEmail = async (token: string): Promise<SuccessResponse> => {
    const response = await fetch(`/api/auth/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Email verification failed.');
    }
    return data;
};


/**
 * Requests the backend to resend a verification email.
 * @param email The user's email address.
 * @returns A promise that resolves if the request is successful.
 */
export const resendVerificationEmail = async (email: string): Promise<SuccessResponse> => {
    const response = await fetch(`/api/auth/resend-verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to resend verification email.');
    }
    return data;
};

/**
 * Links a wallet address to the currently authenticated user's account.
 * @param walletAddress The address to link.
 * @returns A promise that resolves with the updated user object.
 */
export const linkWallet = async (walletAddress: string): Promise<{ user: User }> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error("Authentication required to link wallet.");
    }

    const response = await fetch(`/api/users/link-wallet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to link wallet.");
    }

    const data: { user: User } = await response.json();
    return data;
};