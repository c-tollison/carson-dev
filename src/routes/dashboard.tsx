import Hero from '../components/hero';
import PageWrapper from '../components/page-wrapper';
import projects from './projects/projects';

const experience = [
    {
        company: 'Felux',
        title: 'Founding Software Engineer',
        dates: 'Aug 2025 – Present',
        location: 'Remote',
        bullets: [
            'Architected and built a full-stack SaaS platform from scratch: Vue web app, Hono/Drizzle API on ECS Fargate, PostgreSQL via Supabase, and AWS infrastructure managed with CDK',
            'Built an end-to-end email ingestion pipeline that syncs Outlook inboxes via the Microsoft Graph API, processing 100k+ emails with a per-user historical backfill of around 25,000 messages on first sign-in',
            'Designed a two-stage AI pipeline where a custom ML model (Cognita) triages incoming emails and routes transactions to Gemini Flash for structured extraction, achieving 95% successful extraction at production volume',
            'Shipped an in-product realtime collaboration layer with transaction-scoped chat and @-tagging, using websockets via Supabase Realtime to push live state changes across email threads, transactions, and chat',
        ],
    },
    {
        company: 'ChiroHD',
        title: 'Software Engineer',
        dates: 'Nov 2021 – Aug 2025',
        location: 'Remote',
        bullets: [
            'Built a private internal web app (TypeScript, React, Drizzle, Lambda) that let any engineer provision a fully isolated cloud environment from a UI, spinning up the entire stack (frontend, API, Postgres, backing AWS services) per-dev; adopted by all 20 engineers as the standard concurrent-development workflow',
            'Architected a double-entry accounting system with line-item-level tracking and balance reconciliation, processing 150,000+ transactions weekly with full audit compliance; migrated all historical data off a legacy multi-table schema',
            'Built an automated X12 insurance claims parser with SFTP integrations, eliminating manual claim data entry for 2,500+ chiropractic clinics and reducing claim rejection rate to 10%',
            'Designed a high-throughput Twilio SMS system on a queue-based architecture to absorb peak-hour traffic spikes, reliably handling 100k+ inbound and outbound messages per month',
        ],
    },
    {
        company: 'Amazon – APM',
        title: 'Software Development Engineer Intern',
        dates: 'May 2023 – Aug 2023',
        location: 'Hybrid / Seattle, WA',
        bullets: [
            'Designed an abstract Java parser and ingestion framework that processed multi-gigabyte CSV and Excel files with millions of SKUs behind a single interface, built on AWS Lambda, S3, SQS, and DynamoDB',
            'Resolved a throughput bottleneck by fanning ingestion across concurrent S3-event-triggered Lambdas, increasing data throughput by 25% while reducing memory consumption',
        ],
    },
    {
        company: 'Amazon – Benefits',
        title: 'Software Development Engineer Intern',
        dates: 'May 2022 – Aug 2022',
        location: 'Remote',
        bullets: [
            "Designed a CDK-based event-driven worker (SQS + Python Lambda) that applied paycode and holiday rules to Amazon's global timecard system serving 1M+ employees, replacing a manual SQL-script workflow",
            'Built dead-letter queues and CloudWatch alerting that let on-call detect and replay failed jobs when downstream services were unavailable, preventing data loss',
        ],
    },
];

function Projects() {
    return (
        <section>
            <h2 className='font-display text-2xl font-semibold tracking-tight border-b border-border pb-4 mb-12'>
                Projects
            </h2>
            <div className='flex flex-col gap-20'>
                {projects.map((project, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div
                            key={project.title}
                            className='flex flex-col md:flex-row gap-8 md:gap-14 items-center'
                        >
                            <div className={`w-full md:w-1/2 flex-shrink-0 ${!isEven ? 'md:order-last' : ''}`}>
                                <div className='relative'>
                                    <span
                                        aria-hidden='true'
                                        className='pointer-events-none absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-primary/50 z-10'
                                    />
                                    <span
                                        aria-hidden='true'
                                        className='pointer-events-none absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-primary/50 z-10'
                                    />
                                    <span
                                        aria-hidden='true'
                                        className='pointer-events-none absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-primary/50 z-10'
                                    />
                                    <span
                                        aria-hidden='true'
                                        className='pointer-events-none absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-primary/50 z-10'
                                    />
                                    <div className='rounded-xl overflow-hidden border border-border bg-card aspect-video'>
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='w-full md:w-1/2 flex flex-col gap-4'>
                                <h3 className='font-display text-xl font-semibold tracking-tight'>{project.title}</h3>
                                <p className='text-[15px] leading-relaxed text-foreground/80'>{project.description}</p>
                                <div className='flex flex-wrap gap-2'>
                                    {project.topics.map((topic) => (
                                        <span
                                            key={topic}
                                            className='text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground font-medium'
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                                {(project.link || project.githubLink) && (
                                    <div className='flex gap-3 mt-1'>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='w-36 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity'
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'
                                                    className='w-3.5 h-3.5'
                                                >
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z'
                                                        clipRule='evenodd'
                                                    />
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z'
                                                        clipRule='evenodd'
                                                    />
                                                </svg>
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='w-36 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground text-sm font-medium hover:text-foreground hover:border-foreground/30 transition-colors'
                                            >
                                                <svg
                                                    className='w-3.5 h-3.5'
                                                    viewBox='0 0 24 24'
                                                    fill='currentColor'
                                                >
                                                    <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
                                                </svg>
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function Experience() {
    return (
        <section>
            <h2 className='font-display text-2xl font-semibold tracking-tight border-b border-border pb-4 mb-10'>
                Experience
            </h2>
            <div className='flex flex-col gap-10'>
                {experience.map((job) => (
                    <div
                        key={job.company}
                        className='pl-5 border-l-2 border-primary/40'
                    >
                        <div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1'>
                            <span className='font-display font-semibold text-[17px] tracking-tight'>{job.company}</span>
                            <span className='text-sm text-muted-foreground flex-shrink-0'>{job.dates}</span>
                        </div>
                        <p className='text-sm text-muted-foreground mt-0.5'>
                            {job.title} · {job.location}
                        </p>
                        <ul className='mt-4 flex flex-col gap-2.5'>
                            {job.bullets.map((bullet, i) => (
                                <li
                                    key={i}
                                    className='flex gap-3 text-[14px] leading-relaxed text-foreground/80'
                                >
                                    <span className='text-primary mt-0.5 flex-shrink-0'>–</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Dashboard() {
    return (
        <PageWrapper>
            <div className='flex flex-col gap-24'>
                <div className='flex flex-col gap-8'>
                    <Hero />
                    <p className='text-[15px] leading-relaxed text-foreground/80'>
                        Full-Stack Engineer based in South Carolina. I build developer tooling, design cloud
                        infrastructure, and ship data pipelines across the stack — primarily in TypeScript. Clemson
                        grad.
                    </p>
                </div>

                <Projects />
                <Experience />
            </div>
        </PageWrapper>
    );
}

export default Dashboard;
