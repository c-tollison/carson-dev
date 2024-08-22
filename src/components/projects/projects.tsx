import { useState } from 'react';
import Project from './project/project';
import './projects.css';
import ProjectModal from './project-modal/project-modal';

export interface ProjectI {
    title: string;
    imgPath: string;
    repoLink?: string;
    description: string[];
}

export default function Projects() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectI | null>(null);

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
    ];

    function openModal(project: ProjectI) {
        document.body.style.overflow = 'hidden';
        setSelectedProject(project);
        setModalOpen(true);
    }

    function closeModal() {
        document.body.style.overflow = 'auto';
        setModalOpen(false);
    }

    return (
        <>
            <div className='carousel'>
                {projects.map((project, index) => (
                    <Project
                        title={project.title}
                        imgPath={project.imgPath}
                        key={index}
                        openModal={() => openModal(project)}
                    />
                ))}
            </div>

            {modalOpen && selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    closeModal={closeModal}
                />
            )}
        </>
    );
}
