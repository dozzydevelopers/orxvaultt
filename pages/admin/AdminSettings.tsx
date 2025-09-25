
import React, { useState } from 'react';
import type { SiteSettings } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';

interface AdminSettingsProps {
    settings: SiteSettings;
    onSave: (newSettings: SiteSettings) => void;
}

const SettingsSection: React.FC<{ title: string, description: string, children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-[var(--background-secondary)] p-6 rounded-2xl">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-[var(--text-muted)] mt-1 text-sm">{description}</p>
        <div className="mt-6 border-t border-[var(--border-color-light)] pt-6">
            {children}
        </div>
    </div>
);

const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onSave }) => {
    const [formData, setFormData] = useState(settings);
    const [isSaving, setIsSaving] = useState(false);
    const { showNotification } = useNotification();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? parseFloat(value) : value;
        const keys = name.split('.');
        if (keys.length > 1) {
            setFormData(prev => ({
                ...prev,
                [keys[0]]: {
                    ...prev[keys[0] as keyof SiteSettings] as object,
                    [keys[1]]: parsedValue
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: parsedValue }));
        }
    };
    
    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // In a real app, this would also make an API call to a secure backend endpoint.
        // For this demo, we'll update the app state directly.
        onSave(formData);
        
        setTimeout(() => { // Simulate network latency
            setIsSaving(false);
            showNotification('Site settings updated successfully!', 'success');
        }, 500);
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Site Settings</h1>
            
            <form onSubmit={handleSaveChanges} className="space-y-8">
                <SettingsSection title="Marketplace Fees" description="Configure the fees for minting, listing, and sales.">
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="mintingFee" className="block text-sm font-medium text-[var(--text-secondary)]">Minting Fee (ETH)</label>
                            <input type="number" step="0.01" name="mintingFee" value={formData.mintingFee} onChange={handleChange} className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3"/>
                        </div>
                        <div>
                            <label htmlFor="listingFee" className="block text-sm font-medium text-[var(--text-secondary)]">Listing Fee (ETH)</label>
                            <input type="number" step="0.01" name="listingFee" value={formData.listingFee} onChange={handleChange} className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3"/>
                        </div>
                        <div>
                            <label htmlFor="salesFeePercent" className="block text-sm font-medium text-[var(--text-secondary)]">Sales Fee (%)</label>
                            <input type="number" step="0.1" name="salesFeePercent" value={formData.salesFeePercent} onChange={handleChange} className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3"/>
                        </div>
                    </div>
                </SettingsSection>

                <SettingsSection title="Promotional Banner" description="Update the content of the homepage promo banner.">
                     <div className="space-y-4">
                         <div>
                            <label htmlFor="promoBanner.title" className="block text-sm font-medium text-[var(--text-secondary)]">Title</label>
                            <input type="text" name="promoBanner.title" value={formData.promoBanner.title} onChange={handleChange} className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3"/>
                        </div>
                        <div>
                            <label htmlFor="promoBanner.subtitle" className="block text-sm font-medium text-[var(--text-secondary)]">Subtitle</label>
                            <input type="text" name="promoBanner.subtitle" value={formData.promoBanner.subtitle} onChange={handleChange} className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3"/>
                        </div>
                         <div>
                            <label htmlFor="promoBanner.buttonText" className="block text-sm font-medium text-[var(--text-secondary)]">Button Text</label>
                            <input type="text" name="promoBanner.buttonText" value={formData.promoBanner.buttonText} onChange={handleChange} className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3"/>
                        </div>
                        <div>
                            <label htmlFor="promoBanner.imageUrl" className="block text-sm font-medium text-[var(--text-secondary)]">Banner Image URL</label>
                            <input type="text" name="promoBanner.imageUrl" value={formData.promoBanner.imageUrl} onChange={handleChange} className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-md h-10 px-3"/>
                        </div>
                     </div>
                </SettingsSection>
                
                 <div className="flex justify-end pt-4">
                     <button type="submit" disabled={isSaving} className="bg-[var(--accent-primary)] text-white font-bold py-2.5 px-6 rounded-full hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-70 disabled:cursor-wait">
                        {isSaving ? 'Saving...' : 'Save All Settings'}
                     </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSettings;