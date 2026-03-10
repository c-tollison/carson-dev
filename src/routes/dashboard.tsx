import { Link } from 'react-router-dom';
import Hero from '../components/hero';
import PageWrapper from '../components/page-wrapper';
import logs from './converted-logs/logs';
import projects from './projects/projects';

function DevLogs({ latestLogs }: { latestLogs: typeof logs }) {
    return (
        <div>
            <h3 className='flex justify-between items-end border-b pb-4 border-border text-xl'>
                <span>Recent Dev Logs</span>
                <span className='text-sm'>
                    <Link
                        to='/log'
                        className='text-muted-foreground hover:text-primary transition-colors'
                    >
                        More
                    </Link>
                </span>
            </h3>

            <ul className='mt-6 flex flex-col gap-4'>
                {latestLogs.length === 0 ? (
                    <li className='text-muted-foreground py-2'>No dev logs yet.</li>
                ) : (
                    latestLogs.map((log) => (
                        <li key={log.route}>
                            <Link
                                to={`/log/${log.route}`}
                                className='group flex justify-between items-center transition-all duration-300 ease-in-out'
                            >
                                <div>
                                    <h4 className='text-base font-semibold text-foreground group-hover:underline'>
                                        {log.title}
                                    </h4>
                                    <p className='text-sm text-muted-foreground'>{log.date}</p>
                                </div>
                                <div className='text-primary text-base opacity-0 group-hover:opacity-100 transition-opacity'>
                                    &#8594;
                                </div>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

function ProjectsList() {
    return (
        <div>
            <h3 className='flex justify-between items-end border-b pb-4 border-border text-xl'>
                <span>Projects</span>
                <span className='text-sm'>
                    <Link
                        to='/projects'
                        className='text-muted-foreground hover:text-primary transition-colors'
                    >
                        More
                    </Link>
                </span>
            </h3>
            <ul className='mt-6 flex flex-col gap-4'>
                {projects.slice(0, 3).map((project) => (
                    <li key={project.title}>
                        <Link
                            to={`/projects#${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className='group flex justify-between items-center transition-all duration-300 ease-in-out'
                        >
                            <div>
                                <h4 className='text-base font-semibold text-foreground group-hover:underline'>
                                    {project.title}
                                </h4>
                                <div className='mt-1 flex flex-wrap gap-2'>
                                    {project.topics.slice(0, 3).map((topic) => (
                                        <span
                                            key={topic}
                                            className='text-[11px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground'
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='text-primary text-base opacity-0 group-hover:opacity-100 transition-opacity'>
                                &#8594;
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Dashboard() {
    const latestLogs = logs.slice(-10).reverse();

    return (
        <PageWrapper>
            {/* Desktop: two-column layout */}
            <div className='hidden md:flex md:flex-row md:items-stretch md:gap-8'>
                <div className='md:w-3/5 flex flex-col gap-10'>
                    <Hero />
                    <div>
                        <h3 className='border-b pb-4 border-border text-xl'>About Me</h3>
                        <p className='mt-6 text-md leading-relaxed'>
                            I build Software. When I'm not, I'm traveling with my wife, getting tattooed, or watching
                            anime.
                        </p>
                    </div>
                    <ProjectsList />
                </div>
                <div className='md:w-2/5 md:border-l md:border-border md:pl-8'>
                    <DevLogs latestLogs={latestLogs} />
                </div>
            </div>

            {/* Mobile: stacked in custom order */}
            <div className='flex flex-col gap-10 md:hidden'>
                <Hero />
                <div>
                    <h3 className='border-b pb-4 border-border text-xl'>About Me</h3>
                    <p className='mt-6 text-md leading-relaxed'>
                        I build Software. When I'm not, I'm traveling with my wife, getting tattooed, or watching anime.
                    </p>
                </div>
                <DevLogs latestLogs={latestLogs} />
                <ProjectsList />
            </div>
        </PageWrapper>
    );
}

export default Dashboard;
