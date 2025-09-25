// Placeholder for triggering backend email services

export const sendVerificationEmail = async (email: string) => {
    console.log(`Sending verification email to: ${email}`);
    return { success: true };
};

export const sendPasswordResetEmail = async (email: string) => {
    console.log(`Sending password reset email to: ${email}`);
    return { success: true };
};

export const sendAdminLoginNotification = async (email: string) => {
    console.log(`(MOCK) Sending admin login notification to: ${email}`);
    // In a real app, this would trigger a backend service to send an email.
    return Promise.resolve({ success: true });
};