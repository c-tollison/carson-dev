import { useState } from 'react';
import Card from '../../components/core/card/card';
import Footer from '../../components/footer/footer';
import Projects, { ProjectI } from '../../components/projects/projects';
import ProjectModal from '../../components/projects/project-modal/project-modal';
import ContactInfo from '../../components/cards/contact-info';
import Learnings from '../../components/cards/learnings';
import Hero from '../../components/cards/hero';
import ArticlesList from '../../components/Article/articles-list/articles-list';

function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectI | null>(null);

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
            <Card
                cols='col-span-full lg:col-span-3'
                rows='lg:row-span-5'
                className='overflow-hidden flex flex-row gap-2'
            >
                <div className='flex items-center justify-center w-full md:w-1/2'>
                    <Hero />
                </div>
                <div className='relative w-full md:w-1/2 aspect-[4/3] border rounded-md border-accent'>
                    <img
                        src='ct.jpeg'
                        alt='Sample'
                        className='absolute inset-0 w-full h-full object-cover rounded-md'
                    />
                </div>
            </Card>
            <Card
                cols='col-span-full lg:col-span-2'
                rows='lg:row-span-5'
            >
                <ArticlesList />
            </Card>
            <Card
                cols='col-span-full lg:col-span-2'
                rows='lg:row-span-7'
            >
                <Projects openModal={openModal} />
            </Card>
            <Card
                cols='col-span-full lg:col-span-2'
                rows='lg:row-span-3'
                className='pb-0 h-[250px] lg:h-full'
            >
                <Learnings />
            </Card>
            <Card
                cols='col-span-full lg:col-span-3'
                rows='lg:row-span-3'
                className='bg-primary text-white dark:text-black text-xl md:hover:scale-95 cursor-pointer h-[250px] lg:h-full'
            >
                <ContactInfo />
            </Card>
            <Card
                cols='col-span-full lg:col-span-2'
                rows='lg:row-span-1'
                className='w-full h-full flex justify-center'
            >
                <Footer />
            </Card>

            {modalOpen && selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    closeModal={closeModal}
                />
            )}
        </>
    );
}

export default Dashboard;
