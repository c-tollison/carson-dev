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
                'A web application for managing construction projects and bids, tailored for a construction company in Washington. It features customizable bid forms that allow contractors to generate project bids and export them as PDFs. Additionally, the application includes an inventory management system to track materials efficiently.',
                'Built with React and styled using Tailwind CSS, the frontend is hosted on AWS Elastic Beanstalk. The backend is developed in Python and deployed with Zappa on AWS Lambda, with a PostgreSQL database managed through AWS RDS.',
                'This project was developed for my senior capstone at Clemson University, commissioned by a client in the construction industry.',
            ],
            tech: ['React', 'Typescript', 'Python', 'AWS', 'PostgreSQL'],
        },
        {
            title: 'Unbeatable AI',
            repoLink: 'https://c-tollison.github.io/unbeatable-ai/',
            imgPath: 'unbeatable-ai.png',
            description: [
                'Tic-Tac-Toe web app that demonstrates the use of the minimax algorithm. The algorithm is implemented to calculate the optimal move for each turn, ensuring the Computer is unbeatable.',
                'Developed using HTML, CSS, and JavaScript.',
            ],
            tech: ['Javascript', 'Algorithms', 'AI', 'HTML', 'CSS'],
        },
        {
            title: 'PostgreSQL Database Manager',
            repoLink: 'https://github.com/c-tollison/db-manager',
            imgPath: 'database-manager-cli.png',
            description: [
                'A CLI built with Node.js and TypeScript designed to simplify PostgreSQL migrations. It automatically generates TypeScript enums and interfaces from PostgreSQL enums and tables, ensuring consistency across the project.',
                'The tool leverages a configuration file to define output paths and manage database migrations, which can be executed or rolled back through a dedicated migrations table. It uses arrow-key navigation. All migrations are ran within a transaction to guarantee that any failure results in a rollback. On first use, the tool creates the necessary migrations table to track changes, and it regenerates interfaces after any database updates to keep them current.',
                'For next steps I am thinking of integrating the tool with Zod to generate interfaces for HTTP methods for each table, which will speed up my creation of endpoints.',
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
