import PageWrapper from '../components/page-wrapper';
import projects from './projects/projects';

export default function Projects() {
    return (
        <PageWrapper>
            <div className='py-10 flex flex-col gap-3'>
                <h1 className='text-primary text-5xl font-bold'>Projects</h1>
                <h2 className='text-2xl font-semibold text-foreground'>Hopefully I finish some of these</h2>
            </div>
            <div className=''>
                {projects.map((project, index) => (
                    <div
                        className='flex flex-col md:flex-row items-center gap-4 mt-4'
                        key={index}
                    >
                        <div className={`flex-1 ${index % 2 === 0 ? 'md:order-last' : ''}`}>
                            <h3 className='text-xl font-bold text-primary'>{project.title}</h3>
                            <p className='mt-2 text-foreground'>{project.description}</p>
                            {project.topics && (
                                <div className='mt-2 flex flex-wrap gap-2'>
                                    {project.topics.map((topic, index) => (
                                        <span
                                            key={index}
                                            className='px-2 py-1 rounded-full bg-card border border-border text-sm transition-colors duration-300 ease-in-out text-foreground'
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {project.link && (
                                <div className='mt-2'>
                                    <a
                                        href={project.link}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-secondary hover:underline'
                                    >
                                        Visit Project
                                    </a>
                                </div>
                            )}
                        </div>
                        <div
                            className={`flex-1 ${index % 2 === 0 ? 'md:order-first' : ''} w-full flex justify-center items-center`}
                        >
                            {project.thumbnail && (
                                <img
                                    src={project.thumbnail}
                                    alt={`${project.title} thumbnail`}
                                    className='object-contain rounded-lg shadow-lg'
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
}
