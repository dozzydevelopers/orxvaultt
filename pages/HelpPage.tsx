





import React, { useState } from 'react';
import { ChevronDownIcon, TwitterIcon } from '../components/Icons';

const faqData = [
    {
        category: 'Getting Started',
        questions: [
            {
                q: 'What is a crypto wallet?',
                a: 'A crypto wallet is a digital wallet that allows you to securely store, manage, and interact with your cryptocurrencies and digital assets like NFTs. You need a wallet to connect to Orxvault and buy or sell items.'
            },
            {
                q: 'How do I connect my wallet?',
                a: 'Click the "Connect Wallet" button in the header. You can choose to connect with MetaMask, a popular browser extension wallet, or use WalletConnect to link to a variety of other mobile and desktop wallets.'
            },
            {
                q: 'Do I need cryptocurrency to use Orxvault?',
                a: 'Yes, all transactions on Orxvault are conducted using Ether (ETH) on the Ethereum blockchain. You will need to have ETH in your wallet to purchase NFTs and pay for transaction fees (gas).'
            }
        ]
    },
    {
        category: 'Buying & Selling',
        questions: [
            {
                q: 'How do I create (mint) an NFT?',
                a: 'Navigate to the "Create" page, upload your digital file, fill in the details like name, description, and price, and then follow the prompts in your wallet to sign and confirm the creation. You will need to pay a one-time listing fee and a gas fee for the transaction.'
            },
            {
                q: 'What are the fees on Orxvault?',
                a: 'Orxvault charges a platform fee on all successful sales. This fee is deducted from the final sale price. There is also a one-time listing fee paid to the smart contract when you mint an item. Please refer to the dashboard for the most current fee structure.'
            },
            {
                q: 'How long does a transaction take?',
                a: 'Transactions on the Ethereum blockchain can vary in time depending on network congestion. Typically, it can take anywhere from a few seconds to several minutes for a transaction to be confirmed.'
            }
        ]
    },
    {
        category: 'Account & Security',
        questions: [
            {
                q: 'Is my personal information safe?',
                a: 'Orxvault is a decentralized platform. We primarily identify users by their public wallet address. We do not store private keys and will never ask for them. For more details, please review our Privacy Policy.'
            },
            {
                q: 'How can I keep my account secure?',
                a: 'Never share your wallet\'s private key or seed phrase with anyone. Be wary of phishing scams and only connect your wallet to trusted sites. Always double-check transaction details in your wallet before confirming.'
            }
        ]
    }
];

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-[var(--border-color-light)]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-4 text-left"
            >
                <h3 className="font-semibold text-lg text-[var(--text-primary)]">{question}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-[var(--text-faint)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 animate-fade-in">
                    <p className="text-[var(--text-secondary)] leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
};

const HelpPage: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto page-content">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[var(--text-primary)]">Help Center</h1>
                <p className="text-[var(--text-muted)] mt-4 max-w-2xl mx-auto">
                    Find answers to your questions about creating, collecting, and trading on Orxvault.
                </p>
            </div>
            
            <div className="space-y-12">
                {faqData.map(category => (
                    <div key={category.category}>
                        <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">{category.category}</h2>
                        <div className="bg-[var(--background-secondary)] p-6 rounded-2xl">
                            {category.questions.map(item => (
                                <FaqItem key={item.q} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </div>
                ))}

                 <div>
                    <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Contact Us</h2>
                    <div className="bg-[var(--background-secondary)] p-6 rounded-2xl">
                        <p className="text-[var(--text-muted)] mb-6">Can't find the answer you're looking for? Reach out to our support team.</p>
                        <div className="space-y-4">
                            <div className="p-4 bg-[var(--background-primary)] rounded-lg">
                                <p className="font-semibold">Phone Support</p>
                                <a href="tel:+1-555-123-4567" className="text-[var(--accent-text)] hover:underline">+1 (555) 123-4567</a>
                            </div>
                             <div className="p-4 bg-[var(--background-primary)] rounded-lg">
                                <p className="font-semibold">Community & Support</p>
                                <a href="#" className="text-[var(--accent-text)] hover:underline">Join our Discord Server</a>
                            </div>
                            <div className="p-4 bg-[var(--background-primary)] rounded-lg">
                                <p className="font-semibold">Social Media</p>
                                 <a href="#" className="flex items-center gap-2 text-[var(--accent-text)] hover:underline">
                                    <TwitterIcon className="w-5 h-5" /> Follow us on X
                                 </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HelpPage;