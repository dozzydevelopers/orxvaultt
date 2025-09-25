
import React, { useState } from 'react';
import type { User } from '../../types';
import { EditIcon, ShieldCheckIcon, UserIcon } from '../../components/Icons';

const RoleModal: React.FC<{ user: User, onClose: () => void, onSave: (role: User['role']) => void }> = ({ user, onClose, onSave }) => {
    const [selectedRole, setSelectedRole] = useState<User['role']>(user.role);
    
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-[var(--background-secondary)] p-6 rounded-2xl max-w-sm w-full shadow-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold">Change Role for {user.username}</h2>
                <div className="my-6 space-y-2">
                    {(['User', 'Creator', 'Moderator', 'Admin'] as User['role'][]).map(role => (
                        <label key={role} className="flex items-center gap-3 p-3 bg-[var(--background-primary)] rounded-lg cursor-pointer">
                            <input type="radio" name="role" value={role} checked={selectedRole === role} onChange={() => setSelectedRole(role)} className="accent-[var(--accent-primary)]"/>
                            <span className="font-semibold">{role}</span>
                        </label>
                    ))}
                </div>
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 border border-[var(--border-color-light)] font-bold py-2.5 rounded-xl">Cancel</button>
                    <button onClick={() => onSave(selectedRole)} className="flex-1 bg-[var(--accent-primary)] text-white font-bold py-2.5 rounded-xl">Save Role</button>
                </div>
            </div>
        </div>
    );
}

const AdminUsers: React.FC<{ users: User[] }> = ({ users: initialUsers }) => {
    const [users, setUsers] = useState(initialUsers);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleBanToggle = (userId: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, isBanned: !u.isBanned } : u));
    };
    
    const handleVerifyToggle = (userId: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, isVerified: !u.isVerified } : u));
    };

    const handleRoleSave = (role: User['role']) => {
        if (selectedUser) {
            setUsers(users.map(u => u.id === selectedUser.id ? { ...u, role } : u));
        }
        setSelectedUser(null);
    };

    return (
        <div className="animate-fade-in space-y-8">
            {selectedUser && <RoleModal user={selectedUser} onClose={() => setSelectedUser(null)} onSave={handleRoleSave} />}
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Manage Users</h1>
            
            <div className="bg-[var(--background-secondary)] rounded-2xl overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                    <thead className="border-b border-[var(--border-color-light)]">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">User</th>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Wallet Address</th>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Role</th>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)]">Status</th>
                            <th className="p-4 text-sm font-semibold text-[var(--text-muted)] text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-[var(--border-color)] last:border-b-0 hover:bg-[var(--background-primary)]">
                                <td className="p-4 flex items-center gap-3">
                                    <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full"/>
                                    <div>
                                        <p className="font-semibold flex items-center">{user.username}</p>
                                    </div>
                                </td>
                                <td className="p-4 font-mono text-sm">{user.walletAddress}</td>
                                <td className="p-4 text-sm">
                                    <button onClick={() => setSelectedUser(user)} className="flex items-center gap-1.5 hover:text-[var(--accent-text)]">
                                        {user.role} <EditIcon className="w-3 h-3 opacity-50"/>
                                    </button>
                                </td>
                                <td className="p-4">
                                     <div className="flex items-center gap-2">
                                        {user.isVerified && <span className="text-xs font-semibold bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Verified</span>}
                                        {user.isBanned && <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded-full">Banned</span>}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2 justify-center">
                                        <button onClick={() => handleVerifyToggle(user.id)} className="font-semibold text-xs border border-[var(--border-color-light)] px-3 py-1.5 rounded-md hover:bg-[var(--border-color)]">{user.isVerified ? 'Unverify' : 'Verify'}</button>
                                        <button onClick={() => handleBanToggle(user.id)} className="font-semibold text-xs border border-[var(--border-color-light)] px-3 py-1.5 rounded-md hover:bg-[var(--border-color)]">{user.isBanned ? 'Unban' : 'Ban'}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;