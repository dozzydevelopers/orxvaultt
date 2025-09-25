import React from 'react';

const TermsPage: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto page-content">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Terms of Service</h1>
            <div className="content-body">
                <p className="text-[var(--text-secondary)]">Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                    Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Orxvault website (the "Service") operated by Orxvault ("us", "we", or "our").
                </p>

                <h2>Agreement to Terms</h2>
                <p>
                    By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                </p>

                <h2>Accounts</h2>
                <p>
                    When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                    The Service and its original content, features and functionality are and will remain the exclusive property of Orxvault and its licensors.
                </p>

                 <h2>Disclaimer</h2>
                <p>
                    Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
                </p>

                <h2>Governing Law</h2>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of the jurisdiction, without regard to its conflict of law provisions.
                </p>
                
                <h2>Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us.</p>
            </div>
        </div>
    );
};

export default TermsPage;