import { useState } from 'react';
import Card from '../../components/core/card/card';
import NavBar from '../../components/nav-bar/nav-bar';
import Footer from '../../components/footer/footer';
import Projects, { ProjectI } from '../../components/projects/projects';
import ProjectModal from '../../components/projects/project-modal/project-modal';
import ContactInfo from '../../components/cards/contact-info';
import Learnings from '../../components/cards/learnings';
import Hero from '../../components/cards/hero';

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
            <div className='p-4 flex md:h-screen h-full justify-center items-center'>
                <div className='h-full w-full grid grid-cols-1 lg:grid-cols-7 lg:grid-rows-[75px_repeat(8,_1fr)] gap-4 max-w-[1600px]'>
                    <Card
                        cols='col-span-full'
                        rows='lg:row-span-1'
                        className='w-full h-[75px] flex justify-center'
                    >
                        <NavBar />
                    </Card>
                    <Card
                        cols='col-span-full lg:col-span-3'
                        rows='lg:row-span-5'
                    >
                        <Hero />
                    </Card>
                    <Card
                        cols='col-span-full lg:col-span-2'
                        rows='lg:row-span-5'
                        className='overflow-hidden'
                    >
                        <div className='relative w-full h-full pb-[75%]'>
                            <img
                                src={'yang.jpg'}
                                className='absolute inset-0 w-full h-full object-cover rounded-md'
                            />
                        </div>
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
                        className='pb-0 hover:scale-95 cursor-pointer'
                    >
                        <Learnings />
                    </Card>
                    <Card
                        cols='col-span-full lg:col-span-3'
                        rows='lg:row-span-3'
                        className='bg-primary text-white dark:text-black text-xl hover:scale-95 cursor-pointer'
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
                </div>
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

export default Dashboard;
