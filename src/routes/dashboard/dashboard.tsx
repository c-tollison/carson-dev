import { useContext, useState } from 'react';
import Card from '../../components/core/card/card';
import { ColorModeContext } from '../../components/core/providers/color-mode-provider/color-mode-provider';
import NavBar from '../../components/nav-bar/nav-bar';
import { ColorMode } from '../../components/core/providers/color-mode-provider/color-mode.enum';
import Footer from '../../components/footer/footer';
import Projects, { ProjectI } from '../../components/projects/projects';
import ProjectModal from '../../components/projects/project-modal/project-modal';

function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectI | null>(null);
    const colorModeContext = useContext(ColorModeContext);

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
            <div className='flex h-full justify-center items-center'>
                <div className='h-full w-full grid grid-cols-1 lg:grid-cols-7 lg:grid-rows-9 gap-4 max-w-[1600px]'>
                    <Card
                        cols='col-span-full'
                        rows='lg:row-span-1'
                        className='w-full h-full flex justify-center'
                    >
                        <NavBar />
                    </Card>
                    <Card
                        cols='col-span-full lg:col-span-3'
                        rows='lg:row-span-5'
                    ></Card>
                    <Card
                        cols='col-span-full lg:col-span-2'
                        rows='lg:row-span-5'
                    ></Card>
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
                        <a
                            href='https://go.dev/'
                            target='_blank'
                        >
                            <div className='h-full flex flex-col gap-4 justify-between items-center text-center'>
                                <div className='text-2xl '>What am I learning?</div>
                                <div className='flex flex-col items-center overflow-hidden'>
                                    <img src='./gopher.png' />
                                </div>
                            </div>
                        </a>
                    </Card>
                    <Card
                        cols='col-span-full lg:col-span-3'
                        rows='lg:row-span-3'
                        className='bg-primary text-white dark:text-black text-xl hover:scale-95 cursor-pointer'
                    >
                        <a href='mailto:tollisoncarson@gmail.com'>
                            <div className='h-full flex flex-col justify-between'>
                                <div className='flex justify-between'>
                                    <div className='text-wrap w-[100px]'>Want to connect?</div>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 32 32'
                                        className='w-6 h-6'
                                        fill={colorModeContext.colorMode === ColorMode.Dark ? 'black' : 'white'}
                                    >
                                        <path
                                            d='M31 0H15v2h13.59L.29 30.29 1.7 31.7 30 3.41V16h2V1a1 1 0 0 0-1-1z'
                                            data-name='5-Arrow Up'
                                        />
                                    </svg>
                                </div>
                                <div className='text-6xl'>
                                    Contact <span className='italic'>me</span>
                                </div>
                            </div>
                        </a>
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
