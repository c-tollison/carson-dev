import { useState } from 'react';
import Hero from '../components/hero';
import PageWrapper from '../components/page-wrapper';
import projects from './projects/projects';

function SectionHeader({ label }: { label: string }) {
    return (
        <h2 className='font-mono mb-10 text-primary text-sm uppercase tracking-[0.25em]'>
            <span className='text-muted-foreground/60'>{'//'}</span> {label}
        </h2>
    );
}

const experience = [
    {
        company: 'Felux',
        title: 'Software Engineer',
        dates: 'Aug 2025 - Present',
        location: 'Remote',
        tools: ['TypeScript', 'SQS', 'ECS Fargate', 'AI/ML', 'PostgreSQL'],
        bullets: [
            'Designed an SQS-based ingestion layer that buffers Microsoft Graph webhook traffic with per-queue worker pools, capping concurrency to protect Postgres load and respect Graph rate limits',
            'Engineered bidirectional sync between an in-app email client and Microsoft Outlook, keeping user actions consistent across both systems with a 50,000-email per-user backfill on signup',
            'Built an ML pipeline that classifies inbound mail, then runs a Mastra-orchestrated Gemini Flash workflow with retries and Zod-validated outputs to extract quote line items and track won/lost state at 98% accuracy',
            "Architected a config-driven job framework on long-lived ECS Fargate tasks triggered by EventBridge, now running all of the team's recurring jobs and replacing a workflow where engineers ran scripts locally against production data",
            'Drove daily active usage from 30% to 75% by shipping a SendGrid-backed daily digest that delivers per-user pipeline analytics, pulling sales teams back into the app to act on AI-extracted data',
        ],
    },
    {
        company: 'ChiroHD',
        title: 'Software Engineer',
        dates: 'Nov 2021 - Aug 2025',
        location: 'Remote',
        tools: ['TypeScript', 'React', 'AWS Lambda', 'Twilio', 'PostgreSQL'],
        bullets: [
            'Eliminated a manual deploy process for 20 engineers with a self-service UI (TypeScript, React, Lambda) that provisioned isolated full-stack environments through GitHub Actions, so engineers could work on parallel branches without conflict',
            'Built an X12 835 ingestion pipeline (SFTP → S3 → Lambda) with a CPT-code mapper supporting per-clinic overrides, auto-matching line items across 1,500+ clinics and routing unmatched records to a human-review queue',
            'Scaled the Twilio SMS layer to several million messages per month by placing a queue in front of direct API calls and webhook handling, absorbing bursts of 100k+ messages and enabling reliable delivery tracking for billing',
            'Architected a double-entry ledger replacing a legacy system into balanced debit/credit pairs and migrating 150,000+ weekly transactions via a gradual network-by-network rollout',
        ],
    },
    {
        company: 'Amazon - APM',
        title: 'Software Development Engineer Intern',
        dates: 'May 2023 - Aug 2023',
        location: 'Hybrid / Seattle, WA',
        tools: ['Java', 'AWS Lambda', 'SQS', 'DynamoDB', 'S3'],
        bullets: [
            'Designed an abstract Java parser framework (Lambda, S3, SQS, DynamoDB) that processed multi-gigabyte CSV and Excel files with millions of SKUs, making new format support a one-class change',
            'Eliminated a serial throughput bottleneck by redesigning ingestion as a concurrent fan-out across S3-event-triggered Lambdas, parallelizing file processing across the pipeline',
        ],
    },
    {
        company: 'Amazon - Pay and Benefits',
        title: 'Software Development Engineer Intern',
        dates: 'May 2022 - Aug 2022',
        location: 'Seattle, WA',
        tools: ['Python', 'SQS', 'AWS Lambda', 'CDK', 'CloudWatch'],
        bullets: [
            "Replaced a manual SQL-script workflow with an event-driven SQS and Python Lambda pipeline that applied paycode and holiday rules to Amazon's global timecard system serving 1M+ employees",
            'Added dead-letter queues and CloudWatch alerting that gave on-call engineers full replay capability, preventing timecard data loss during downstream outages',
        ],
    },
];

function Projects() {
    const [expanded, setExpanded] = useState<string | null>(null);
    return (
        <section>
            <SectionHeader label='projects' />
            <div className='flex flex-col gap-20'>
                {projects.map((project, index) => {
                    const isEven = index % 2 === 0;
                    const isExpanded = expanded === project.title;
                    return (
                        <div
                            key={project.title}
                            className='flex flex-col gap-8'
                        >
                            <div className='flex flex-col md:flex-row gap-8 md:gap-14 items-center'>
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
                                    <h3 className='font-display text-xl font-semibold tracking-tight'>
                                        {project.title}
                                    </h3>
                                    <p className='text-[15px] leading-relaxed text-foreground/80'>
                                        {project.description}
                                    </p>
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
                                            {project.link &&
                                                (project.embeddable ? (
                                                    <button
                                                        type='button'
                                                        onClick={() => setExpanded(isExpanded ? null : project.title)}
                                                        aria-expanded={isExpanded}
                                                        className='w-36 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            viewBox='0 0 20 20'
                                                            fill='currentColor'
                                                            className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                        >
                                                            <path
                                                                fillRule='evenodd'
                                                                d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z'
                                                                clipRule='evenodd'
                                                            />
                                                        </svg>
                                                        {isExpanded ? 'Close Demo' : 'Live Demo'}
                                                    </button>
                                                ) : (
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
                                                ))}
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
                            {project.embeddable && project.link && (
                                <div
                                    className={`grid transition-all duration-500 ease-out ${
                                        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className='overflow-hidden'>
                                        <div className='rounded-xl overflow-hidden border border-border bg-card aspect-[3/4] md:aspect-video'>
                                            {isExpanded && (
                                                <iframe
                                                    src={project.link}
                                                    title={project.title}
                                                    className='w-full h-full'
                                                    sandbox='allow-scripts allow-same-origin'
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
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
            <SectionHeader label='experience' />
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
                            {job.title} | {job.location}
                        </p>
                        <div className='flex flex-wrap gap-2 mt-3'>
                            {job.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className='text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground font-medium'
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                        <ul className='mt-4 flex flex-col gap-2.5'>
                            {job.bullets.map((bullet, i) => (
                                <li
                                    key={i}
                                    className='flex gap-3 text-[14px] leading-relaxed text-foreground/80'
                                >
                                    <span className='text-primary mt-0.5 flex-shrink-0'>-</span>
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
            <div className='flex flex-col gap-16'>
                <div className='flex flex-col gap-8'>
                    <Hero />
                </div>

                <Projects />
                <Experience />
            </div>
        </PageWrapper>
    );
}

export default Dashboard;
