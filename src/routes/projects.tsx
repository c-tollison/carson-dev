import PageWrapper from '../components/page-wrapper';
import GitHubIcon from '../components/icons/github-icon';
import projects from './projects/projects';

export default function Projects() {
    return (
        <PageWrapper>
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-foreground'>Projects</h1>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {projects.map((project, index) => (
                    <div
                        key={index}
                        id={project.title.toLowerCase().replace(/\s+/g, '-')}
                        className='flex flex-col rounded-lg bg-card border border-border scroll-mt-24'
                    >
                        {project.thumbnail && (
                            <div className='w-full h-48 overflow-hidden bg-muted flex items-center justify-center rounded-t-lg'>
                                <img
                                    src={project.thumbnail}
                                    alt={`${project.title} thumbnail`}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        )}
                        <div className='p-6 flex flex-col flex-1'>
                            <div className='flex items-center justify-between gap-4 mb-3 min-h-[40px]'>
                                <h3 className='text-base font-semibold text-foreground'>{project.title}</h3>
                                <div className='flex items-center gap-1 flex-shrink-0 -mx-2'>
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='relative group/github text-muted-foreground hover:text-primary transition-colors p-2'
                                            aria-label={`${project.title} GitHub repository`}
                                        >
                                            <GitHubIcon className='w-6 h-6' />
                                            <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-sm whitespace-nowrap opacity-0 group-hover/github:opacity-100 transition-opacity pointer-events-none'>
                                                View source
                                            </span>
                                        </a>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='relative group/live text-primary hover:text-primary/80 transition-colors p-2'
                                            aria-label={`${project.title} live site`}
                                        >
                                            <span className='text-xl font-medium'>↗</span>
                                            <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-popover-foreground bg-popover border border-border rounded shadow-sm whitespace-nowrap opacity-0 group-hover/live:opacity-100 transition-opacity pointer-events-none'>
                                                View live
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className='text-sm text-foreground leading-relaxed mb-4 flex-1'>{project.description}</p>
                            {project.topics && project.topics.length > 0 && (
                                <div className='flex flex-wrap gap-2 mt-auto pt-2'>
                                    {project.topics.map((topic, topicIndex) => (
                                        <span
                                            key={topicIndex}
                                            className='px-2.5 py-1 rounded-full bg-card border border-border text-xs font-medium text-foreground'
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
}
