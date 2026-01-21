import PageWrapper from '../components/page-wrapper';
import projects from './projects/projects';

export default function Projects() {
    return (
        <PageWrapper>
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-foreground'>Projects</h1>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {projects.map((project, index) => {
                    const CardContent = (
                        <>
                            {project.thumbnail && (
                                <div className='w-full h-48 overflow-hidden bg-muted flex items-center justify-center'>
                                    <img
                                        src={project.thumbnail}
                                        alt={`${project.title} thumbnail`}
                                        className={`w-full h-full object-cover transition-transform duration-300 ${
                                            project.link ? 'group-hover:scale-105' : ''
                                        }`}
                                    />
                                </div>
                            )}
                            <div className='p-6 flex flex-col flex-1'>
                                <div className='flex items-start justify-between gap-4 mb-3'>
                                    <h3
                                        className={`text-base font-semibold text-foreground transition-colors ${
                                            project.link ? 'group-hover:text-primary' : ''
                                        }`}
                                    >
                                        {project.title}
                                    </h3>
                                    {project.link && (
                                        <span className='text-primary flex-shrink-0 mt-0.5 text-lg font-medium'>
                                            ↗
                                        </span>
                                    )}
                                </div>
                                <p className='text-sm text-foreground leading-relaxed mb-4 flex-1'>
                                    {project.description}
                                </p>
                                {project.topics && project.topics.length > 0 && (
                                    <div className='flex flex-wrap gap-2 mt-auto pt-2'>
                                        {project.topics.map((topic, topicIndex) => (
                                            <span
                                                key={topicIndex}
                                                className='px-2.5 py-1 rounded-full bg-card border border-border text-xs font-medium text-foreground transition-colors duration-300'
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    );

                    return project.link ? (
                        <a
                            key={index}
                            href={project.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col rounded-lg bg-card border border-border hover:bg-popover hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden cursor-pointer'
                        >
                            {CardContent}
                        </a>
                    ) : (
                        <div
                            key={index}
                            className='flex flex-col rounded-lg bg-card border border-border overflow-hidden transition-colors duration-300 ease-in-out'
                        >
                            {CardContent}
                        </div>
                    );
                })}
            </div>
        </PageWrapper>
    );
}
