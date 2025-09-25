import React, { useState } from 'react';
import type { User } from '../../types';
import { useNotification } from '../../contexts/NotificationContext';
import { LockClosedIcon, EyeIcon, EyeOffIcon, CopyIcon } from '../../components/Icons';

// Sub-components for better organization
const InfoField: React.FC<{ label: string, value: string, onCopy?: () => void }> = ({ label, value, onCopy }) => (
    <div>
        <label className="block text-sm font-medium text-[var(--text-faint)]">{label}</label>
        <div className="relative mt-1">
            <input
                type="text"
                readOnly
                value={value}
                className="w-full h-11 bg-[var(--background-primary)] border border-[var(--border-color-light)] rounded-lg pl-4 pr-12 text-sm text-[var(--text-secondary)] font-mono"
            />
            {onCopy && (
                <button onClick={onCopy} type="button" className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-[var(--text-muted)] hover:text-[var(--text-primary)]" title="Copy">
                    <CopyIcon className="w-5 h-5" />
                </button>
            )}
        </div>
    </div>
);

const ImageUploader: React.FC<{ label: string, onFileChange: (file: File | null) => void }> = ({ label, onFileChange }) => {
    const [fileName, setFileName] = useState('No file chosen');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFileName(file.name);
            onFileChange(file);
        } else {
            setFileName('No file chosen');
            onFileChange(null);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{label} *</label>
            <div className="relative">
                 <input
                    type="text"
                    readOnly
                    value={fileName}
                    className="w-full h-11 bg-[var(--background-primary)] border border-[var(--border-color-light)] rounded-lg pl-32 pr-4 text-sm text-[var(--text-secondary)]"
                />
                 <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute inset-y-0 left-0 m-1 bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 text-sm">
                    Choose File
                </button>
            </div>
        </div>
    );
};

const PasswordField: React.FC<{ id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ id, label, value, onChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)]">{label} *</label>
            <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <LockClosedIcon className="w-5 h-5 text-[var(--text-faint)]" />
                </div>
                <input
                    id={id}
                    name={id}
                    type={isVisible ? 'text' : 'password'}
                    required
                    value={value}
                    onChange={onChange}
                    className="block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-lg h-12 pl-12 pr-12"
                />
                <button type="button" onClick={() => setIsVisible(!isVisible)} className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    {isVisible ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
};


const UserSettings: React.FC<{ user: User }> = ({ user }) => {
    const { showNotification } = useNotification();
    
    // State for profile info
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    
    // State for images
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);

    // State for password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success');
    };

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        showNotification('Profile updated! (Demo)', 'success');
    };
    
    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match.', 'error');
            return;
        }
        showNotification('Password updated! (Demo)', 'success');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const profileLink = `https://orxvault.com/profile/${(user.username || '').toLowerCase().replace(/\s+/g, '')}`;
    const supportId = user.walletAddress.substring(2, 12);

    return (
        <div className="animate-fade-in max-w-3xl mx-auto space-y-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Settings</h1>

             <div className="space-y-6 bg-[var(--background-secondary)] p-6 rounded-2xl">
                 <button type="button" onClick={() => showNotification('Invite link copied! (Demo)')} className="font-bold bg-black text-white dark:bg-white dark:text-black py-2.5 px-6 rounded-lg hover:opacity-80 transition-opacity">
                    Generate Invite
                </button>
                <InfoField label="Profile Link" value={profileLink} onCopy={() => handleCopy(profileLink)} />
                <InfoField label="Support ID" value={supportId} onCopy={() => handleCopy(supportId)} />
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6 bg-[var(--background-secondary)] p-6 rounded-2xl">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-[var(--text-secondary)]">Username *</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-lg h-11 px-4"/>
                </div>
                 <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-[var(--text-secondary)]">Bio</label>
                    <textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} rows={4} className="mt-1 block w-full bg-[var(--background-primary)] border-[var(--border-color-light)] rounded-lg p-4"/>
                </div>
                
                <h2 className="text-2xl font-bold pt-4">Profile Images</h2>
                <ImageUploader label="Banner Image" onFileChange={setBannerFile} />
                <ImageUploader label="Profile Image" onFileChange={setProfileFile} />

                <div className="pt-4">
                    <button type="submit" className="font-bold bg-black text-white dark:bg-white dark:text-black py-3 w-full rounded-lg hover:opacity-80 transition-opacity">
                        Update Profile
                    </button>
                </div>
            </form>
            
            <form onSubmit={handleUpdatePassword} className="space-y-6 bg-[var(--background-secondary)] p-6 rounded-2xl">
                <h2 className="text-2xl font-bold">Change Password</h2>
                <PasswordField id="oldPassword" label="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                <PasswordField id="newPassword" label="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <PasswordField id="confirmPassword" label="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                <div className="pt-4">
                     <button type="submit" className="font-bold bg-black text-white dark:bg-white dark:text-black py-3 w-full rounded-lg hover:opacity-80 transition-opacity">
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserSettings;