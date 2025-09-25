import React from 'react';

const teamMembers = [
    {
        name: 'Alex Johnson',
        role: 'Founder & CEO',
        imageUrl: 'https://i.pravatar.cc/150?u=alex',
        bio: 'Visionary leader with a passion for decentralization and digital art. Driving the future of asset ownership.'
    },
    {
        name: 'Maria Garcia',
        role: 'Lead Blockchain Engineer',
        imageUrl: 'https://i.pravatar.cc/150?u=maria',
        bio: 'Expert in smart contract development and blockchain architecture, ensuring the security and integrity of our platform.'
    },
    {
        name: 'Sam Chen',
        role: 'Head of Design',
        imageUrl: 'https://i.pravatar.cc/150?u=sam',
        bio: 'Creative mind behind our user experience, crafting intuitive and beautiful interfaces for the community.'
    },
     {
        name: 'Emily White',
        role: 'Community Manager',
        imageUrl: 'https://i.pravatar.cc/150?u=emily',
        bio: 'Dedicated to fostering a vibrant and supportive community. The bridge between our users and the team.'
    }
];

const TeamMemberCard: React.FC<typeof teamMembers[0]> = ({ name, role, imageUrl, bio }) => (
    <div className="bg-[var(--background-secondary)] rounded-2xl p-6 text-center flex flex-col items-center">
        <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full mb-4 border-2 border-[var(--accent-primary)]"/>
        <h3 className="text-xl font-bold text-[var(--text-primary)]">{name}</h3>
        <p className="text-[var(--accent-text)] font-semibold">{role}</p>
        <p className="text-[var(--text-muted)] mt-2 text-sm">{bio}</p>
    </div>
);

const TeamPage: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[var(--text-primary)]">Meet the Team</h1>
                <p className="text-[var(--text-muted)] mt-4">The passionate minds behind Orxvault, dedicated to revolutionizing digital ownership.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map(member => (
                    <TeamMemberCard key={member.name} {...member} />
                ))}
            </div>
        </div>
    );
};

export default TeamPage;