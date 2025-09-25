
interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
    bio: string;
}

const teamMembers: TeamMember[] = [
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


export const getTeamMembers = async (): Promise<TeamMember[]> => {
    return Promise.resolve(teamMembers);
};