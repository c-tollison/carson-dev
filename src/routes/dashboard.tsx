import { Link } from 'react-router-dom';
import Hero from '../components/hero';
import PageWrapper from '../components/page-wrapper';
import logs from './converted-logs/logs';
import projects from './projects/projects';

function DevLogs({ latestLogs }: { latestLogs: typeof logs }) {
    return (
        <div>
            <h3 className='flex justify-between items-end border-b pb-4 border-border font-display text-lg font-semibold tracking-tight'>
                <span>Recent Dev Logs</span>
                <Link
                    to='/log'
                    className='text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors'
                >
                    View all
                </Link>
            </h3>

            <ul className='mt-6 flex flex-col gap-1'>
                {latestLogs.length === 0 ? (
                    <li className='text-muted-foreground py-2 text-sm'>No dev logs yet.</li>
                ) : (
                    latestLogs.map((log) => (
                        <li key={log.route}>
                            <Link
                                to={`/log/${log.route}`}
                                className='group flex justify-between items-center py-3 transition-colors duration-200'
                            >
                                <div className='min-w-0'>
                                    <h4 className='text-[15px] font-medium text-foreground group-hover:text-primary transition-colors'>
                                        {log.title}
                                    </h4>
                                    <p className='text-sm text-muted-foreground mt-0.5'>{log.date}</p>
                                </div>
                                <div className='text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3'>
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
            <h3 className='flex justify-between items-end border-b pb-4 border-border font-display text-lg font-semibold tracking-tight'>
                <span>Projects</span>
                <Link
                    to='/projects'
                    className='text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors'
                >
                    View all
                </Link>
            </h3>
            <ul className='mt-6 flex flex-col gap-1'>
                {projects.slice(0, 3).map((project) => (
                    <li key={project.title}>
                        <Link
                            to={`/projects#${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className='group flex justify-between items-center py-3 transition-colors duration-200'
                        >
                            <div className='min-w-0'>
                                <h4 className='text-[15px] font-medium text-foreground group-hover:text-primary transition-colors'>
                                    {project.title}
                                </h4>
                                <div className='mt-1.5 flex flex-wrap gap-1.5'>
                                    {project.topics.slice(0, 3).map((topic) => (
                                        <span
                                            key={topic}
                                            className='text-[11px] px-2 py-0.5 rounded-full border border-border text-muted-foreground font-medium'
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3'>
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
            <div className='hidden md:flex md:flex-row md:items-stretch md:gap-12'>
                <div className='md:w-3/5 flex flex-col gap-12'>
                    <Hero />
                    <div>
                        <h3 className='border-b pb-4 border-border font-display text-lg font-semibold tracking-tight'>
                            About Me
                        </h3>
                        <p className='mt-6 text-[15px] leading-relaxed text-foreground/90'>
                            I build Software. When I'm not, I'm traveling with my wife, getting tattooed, or watching
                            anime.
                        </p>
                    </div>
                    <ProjectsList />
                </div>
                <div className='md:w-2/5 md:border-l md:border-border md:pl-12'>
                    <DevLogs latestLogs={latestLogs} />
                </div>
            </div>

            {/* Mobile: stacked in custom order */}
            <div className='flex flex-col gap-12 md:hidden'>
                <Hero />
                <div>
                    <h3 className='border-b pb-4 border-border font-display text-lg font-semibold tracking-tight'>
                        About Me
                    </h3>
                    <p className='mt-6 text-[15px] leading-relaxed text-foreground/90'>
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
