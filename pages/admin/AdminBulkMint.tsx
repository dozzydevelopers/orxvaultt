import React from 'react';
import { RocketIcon, UploadIcon } from '../../components/Icons';

const AdminBulkMint: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Bulk Mint Tool</h1>
                <p className="text-[var(--text-muted)] mt-4">
                    Efficiently create a large number of NFTs by uploading a folder of assets and a metadata CSV file. This feature is planned for a future update.
                </p>
            </div>

            <div className="bg-[var(--background-secondary)] p-6 rounded-2xl opacity-50">
                <h2 className="text-xl font-bold">1. Upload Assets</h2>
                <div className="mt-4 flex justify-center px-6 pt-10 pb-12 border-2 border-[var(--border-color-light)] border-dashed rounded-md cursor-not-allowed">
                    <div className="space-y-1 text-center">
                        <UploadIcon className="mx-auto h-12 w-12 text-[var(--text-faint)]" />
                        <div className="flex text-sm text-[var(--text-muted)]">
                            <span className="relative cursor-not-allowed bg-[var(--background-secondary)] rounded-md font-medium text-[var(--accent-text)] px-1">
                                <span>Upload a folder</span>
                            </span>
                            <p className="pl-1">or a CSV file</p>
                        </div>
                        <p className="text-xs text-[var(--text-faint)]">This feature is not yet available.</p>
                    </div>
                </div>
            </div>

             <div className="bg-[var(--background-secondary)] p-6 rounded-2xl opacity-50">
                <h2 className="text-xl font-bold">2. Review and Mint</h2>
                <p className="text-[var(--text-muted)] mt-2 text-sm">Once uploaded, you'll be able to review all items before signing the transaction to mint them to the blockchain.</p>
                <div className="mt-6 border-t border-[var(--border-color-light)] pt-6">
                    <button disabled className="w-full flex items-center justify-center gap-3 bg-[var(--accent-primary)] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <RocketIcon className="w-5 h-5" />
                        <span>Start Bulk Mint</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AdminBulkMint;