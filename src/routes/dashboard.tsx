import { Link } from 'react-router-dom';
import Hero from '../components/hero';
import PageWrapper from '../components/page-wrapper';
import logs from './log/logs';

function Dashboard() {
    const latestLogs = logs.slice(logs.length - 5).reverse();

    return (
        <PageWrapper>
            <Hero />
            <div className='mt-8 flex flex-col md:flex-row md:gap-8'>
                <div className='mt-8 md:mt-0 md:w-2/6 w-full order-2 md:order-1'>
                    <h3 className='flex justify-between items-end border-b pb-4 border-border text-xl'>
                        <span>Recent Logs</span>
                        <span className='text-sm'>
                            <Link to='/log' className='text-muted-foreground hover:text-primary transition-colors'>More</Link>
                        </span>
                    </h3>

                    <ul className='mt-6 flex flex-col'>
                        {latestLogs.length === 0 ? (
                            <li className='text-muted-foreground py-2'>No logs yet.</li>
                        ) : (
                            latestLogs.map((log) => (
                                <li key={log.route}>
                                    <Link
                                        to={`/log/${log.route}`}
                                        className='group flex justify-between items-center py-2 transition-all duration-300 ease-in-out'
                                    >
                                        <div>
                                            <h4 className='text-base font-semibold text-foreground'>{log.title}</h4>
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
                <div className='md:w-4/6 w-full order-1 md:order-2'>
                    <h3 className='border-b pb-4 border-border text-xl'>About Me</h3>
                    <p className='mt-6 text-md leading-relaxed'>
                        I'm a backend-leaning software engineer who enjoys designing scalable systems in TypeScript and thinking through backend architecture. I focus on building APIs and data models that hold up in production and are easy to evolve over time. While I lean backend, I've built full production frontends when the project called for it - most recently shipping an entire SaaS application end-to-end. I hold a B.S. in Computer Science from Clemson University and have worked on systems in healthcare and SaaS environments. Outside of engineering, I enjoy traveling with my wife, getting tattoos, and watching anime.
                    </p>

                </div>
            </div>

            <div className='mt-8 md:mt-12 w-full'>
                <h3 className='border-b pb-4 border-border text-xl'>Skills</h3>
                <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-6'>
                    <div>
                        <h4 className='text-sm font-semibold text-muted-foreground mb-2'>Languages</h4>
                        <div className='flex flex-wrap gap-2'>
                            {['TypeScript', 'Go', 'SQL'].map((skill) => (
                                <span key={skill} className='px-3 py-1 rounded-full bg-card border border-border text-sm'>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className='text-sm font-semibold text-muted-foreground mb-2'>Backend</h4>
                        <div className='flex flex-wrap gap-2'>
                            {['REST', 'Postgres', 'DynamoDB', 'Redis'].map((skill) => (
                                <span key={skill} className='px-3 py-1 rounded-full bg-card border border-border text-sm'>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className='text-sm font-semibold text-muted-foreground mb-2'>AWS</h4>
                        <div className='flex flex-wrap gap-2'>
                            {['Lambda', 'S3', 'SQS', 'CDK', 'RDS'].map((skill) => (
                                <span key={skill} className='px-3 py-1 rounded-full bg-card border border-border text-sm'>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className='text-sm font-semibold text-muted-foreground mb-2'>Tools</h4>
                        <div className='flex flex-wrap gap-2'>
                            {['Git', 'CI/CD', 'Docker', 'Terraform'].map((skill) => (
                                <span key={skill} className='px-3 py-1 rounded-full bg-card border border-border text-sm'>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export default Dashboard;
