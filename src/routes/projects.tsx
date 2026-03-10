import PageWrapper from '../components/page-wrapper';
import GitHubIcon from '../components/icons/github-icon';
import projects from './projects/projects';

export default function Projects() {
    return (
        <PageWrapper>
            <div className='mb-8'>
                <h1 className='font-display text-3xl font-bold tracking-tight text-foreground'>Projects</h1>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {projects.map((project, index) => (
                    <div
                        key={index}
                        id={project.title.toLowerCase().replace(/\s+/g, '-')}
                        className='group flex flex-col rounded-lg bg-card border border-border hover:border-primary/20 transition-all duration-200 scroll-mt-24 overflow-hidden'
                    >
                        {project.thumbnail && (
                            <div className='w-full h-48 overflow-hidden bg-muted'>
                                <img
                                    src={project.thumbnail}
                                    alt={`${project.title} thumbnail`}
                                    className='w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300'
                                />
                            </div>
                        )}
                        <div className='p-6 flex flex-col flex-1'>
                            <div className='flex items-center justify-between gap-4 mb-3'>
                                <h3 className='font-display text-base font-semibold text-foreground tracking-tight'>
                                    {project.title}
                                </h3>
                                <div className='flex items-center gap-0.5 flex-shrink-0'>
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='relative group/github text-muted-foreground hover:text-primary transition-colors p-1.5'
                                            aria-label={`${project.title} GitHub repository`}
                                        >
                                            <GitHubIcon className='w-5 h-5' />
                                            <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[11px] font-medium text-popover-foreground bg-popover border border-border rounded shadow-sm whitespace-nowrap opacity-0 group-hover/github:opacity-100 transition-opacity pointer-events-none'>
                                                View source
                                            </span>
                                        </a>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='relative group/live text-primary hover:text-primary/70 transition-colors p-1.5'
                                            aria-label={`${project.title} live site`}
                                        >
                                            <span className='text-lg font-medium leading-none'>&#8599;</span>
                                            <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[11px] font-medium text-popover-foreground bg-popover border border-border rounded shadow-sm whitespace-nowrap opacity-0 group-hover/live:opacity-100 transition-opacity pointer-events-none'>
                                                View live
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className='text-sm text-foreground/80 leading-relaxed mb-4 flex-1'>
                                {project.description}
                            </p>
                            {project.topics && project.topics.length > 0 && (
                                <div className='flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border'>
                                    {project.topics.map((topic, topicIndex) => (
                                        <span
                                            key={topicIndex}
                                            className='px-2 py-0.5 rounded-full border border-border text-[11px] font-medium text-muted-foreground'
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
