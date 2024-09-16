import Project from './project/project';

export interface ProjectI {
    title: string;
    imgPath: string;
    repoLink?: string;
    description: string[];
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
        },
        {
            title: 'Unbeatable AI',
            repoLink: 'https://c-tollison.github.io/unbeatable-ai/',
            imgPath: 'unbeatable-ai.png',
            description: [
                'A web application for playing Tic-Tac-Toe, developed to showcase the minimax algorithm. This algorithm, a recursive strategy, is employed to determine the optimal move for a player, thereby creating an unbeatable AI opponent for the game.',
                'This project was developed using simple HTML, CSS, and JavaScript.',
            ],
        },
        {
            title: 'Postgres Database Manager',
            repoLink: 'https://github.com/c-tollison/db-manager',
            imgPath: 'database-manager-cli.png',
            description: ['Will add some stuff soon'],
        },
    ];

    return (
        <>
            <div>
                {projects.map((project, index) => (
                    <Project
                        key={index}
                        title={project.title}
                        description={project.description[0]}
                        openModal={() => openModal(project)}
                    />
                ))}
            </div>
        </>
    );
}
