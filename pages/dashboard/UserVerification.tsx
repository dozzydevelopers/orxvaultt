import React from 'react';

const RequirementRow: React.FC<{ title: string, met: boolean, children?: React.ReactNode }> = ({ title, met, children }) => {
    return (
        <div className="py-4 border-b border-[var(--border-color-light)]">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg text-[var(--text-primary)]">{title}</h3>
                    {children && <div className="mt-2 text-sm text-[var(--text-muted)] pl-4">{children}</div>}
                </div>
                <span className={`font-bold text-sm ${met ? 'text-green-400' : 'text-yellow-400'}`}>{met ? 'MET' : 'NOT MET'}</span>
            </div>
        </div>
    );
};


const UserVerification: React.FC = () => {

    return (
        <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Verification</h1>
                 <p className="text-[var(--text-muted)] mt-4">
                    Verification is not available in this demo. In a full application, this page would check on-chain and off-chain criteria to grant a verified status to creators.
                </p>
            </div>
            <div className="bg-[var(--background-secondary)] rounded-2xl p-6 text-center text-[var(--text-muted)] opacity-50">
                Verification checks are disabled.
            </div>
        </div>
    );
};

export default UserVerification;
