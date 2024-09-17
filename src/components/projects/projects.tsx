import Project from './project/project';

export interface ProjectI {
    title: string;
    imgPath: string;
    repoLink?: string;
    description: string[];
    tech: string[];
}

interface ProjectsInterface {
    openModal: (_: ProjectI) => void;
}

export default function Projects({ openModal }: ProjectsInterface) {
    const projects: ProjectI[] = [
        {
            title: 'Eagle Building Company',
            imgPath: 'eagle-bid.png',
            description: [
                'A comprehensive web application designed for managing construction projects and bids. This project, developed for a construction company in Washington, includes robust features for creating custom bid forms. Contractors within the company can utilize these forms to generate bids for various construction projects, with the ability to export these bids in PDF format. Additionally, the application incorporates an inventory system to efficiently track materials used in projects.',
                'The project leverages React for the frontend, styled with Tailwind CSS, and is deployed on AWS Elastic Beanstalk. The backend is implemented in Python and deployed using Zappa on AWS Lambda, with a PostgreSQL database hosted on AWS RDS.',
                'This project was undertaken as part of my senior capstone at Clemson University for a client.',
            ],
            tech: ['React', 'Typescript', 'Python', 'AWS', 'PostgreSQL'],
        },
        {
            title: 'Unbeatable AI',
            repoLink: 'https://c-tollison.github.io/unbeatable-ai/',
            imgPath: 'unbeatable-ai.png',
            description: [
                'A web application for playing Tic-Tac-Toe, developed to showcase the minimax algorithm. This algorithm, a recursive strategy, is employed to determine the optimal move for a player, thereby creating an unbeatable AI opponent for the game.',
                'This project was developed using simple HTML, CSS, and JavaScript.',
            ],
            tech: ['Javascript', 'Algorithms', 'AI', 'HTML', 'CSS'],
        },
        {
            title: 'PostgreSQL Database Manager',
            repoLink: 'https://github.com/c-tollison/db-manager',
            imgPath: 'database-manager-cli.png',
            description: [
                'A Node.js/TypeScript CLI tool designed to streamline PostgreSQL instance management. It automatically generates TypeScript enums from PostgreSQL enums, ensuring synchronization across the project.',
                'The CLI operates using a simple config file that specifies output locations and tracks where migrations are stored. It supports running migrations, rolling them back, and maintaining a history in the database through a dedicated migrations table.',
                'With minimal setup, the tool offers arrow-key navigation for user selections, and all migrations are timestamped to guarantee they run in the correct sequence.',
            ],
            tech: ['Node.js', 'Typescript', 'PostgreSQL'],
        },
    ];

    return (
        <>
            <div className='text-2xl text-center mb-2'>Projects</div>
            <div>
                {projects.map((project, index) => (
                    <Project
                        key={index}
                        title={project.title}
                        tech={project.tech}
                        description={project.description[0]}
                        openModal={() => openModal(project)}
                    />
                ))}
            </div>
        </>
    );
}
