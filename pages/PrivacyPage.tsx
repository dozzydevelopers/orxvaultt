import React from 'react';

const PrivacyPage: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto page-content">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Privacy Policy</h1>
            <div className="content-body">
                <p className="text-[var(--text-secondary)]">Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                    Orxvault ("us", "we", or "our") operates the Orxvault website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>

                <h2>Information Collection and Use</h2>
                <p>
                    We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, your wallet address when you connect to our platform.
                </p>

                <h2>Use of Data</h2>
                <p>
                    Orxvault uses the collected data for various purposes: to provide and maintain the Service, to notify you about changes to our Service, to allow you to participate in interactive features of our Service when you choose to do so, to provide customer care and support, and to monitor the usage of the Service.
                </p>

                <h2>Security of Data</h2>
                <p>
                    The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
                
                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us.</p>
            </div>
        </div>
    );
};

export default PrivacyPage;