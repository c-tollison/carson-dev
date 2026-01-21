import { Link } from 'react-router-dom';
import Hero from '../components/hero';
import PageWrapper from '../components/page-wrapper';
import logs from './log/logs';

function Dashboard() {
    const latestLogs = logs.slice(logs.length - 5).reverse();

    return (
        <PageWrapper>
            <Hero />
            <div className='flex flex-col md:flex-row md:gap-4'>
                <div className='mt-4 md:w-2/6 w-full'>
                    <h3 className='flex justify-between items-end border-b pb-4 border-border text-xl'>
                        <span>Recent Logs</span>
                        <span className='text-sm'>
                            <Link to='/log'>More</Link>
                        </span>
                    </h3>

                    <ul className='mt-4 flex flex-col'>
                        {latestLogs.map((log) => (
                            <li key={log.route}>
                                <Link
                                    to={`/log/${log.route}`}
                                    className='group flex justify-between items-center py-2 transition-all duration-300 ease-in-out'
                                >
                                    <div>
                                        <h4 className='text-xl font-bold text-foreground'>{log.title}</h4>
                                        <p className='text-sm text-muted-foreground'>{log.date}</p>
                                    </div>
                                    <div className='text-primary text-xl opacity-0 group-hover:opacity-100 transition-opacity'>
                                        &#8594;
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='mt-4 md:w-4/6 w-full'>
                    <h3 className='border-b pb-4 border-border text-xl'>About Me</h3>
                    <p className='mt-4 text-xl leading-relaxed'>
                        I am a software engineer specializing in software architecture and backend systems. I graduated
                        from Clemson University with a B.S. in Computer Science and have since contributed to projects
                        in the healthcare sector. I enjoy working with TypeScript and Go, and I'm passionate about
                        building scalable systems. Outside of work, I like to watch anime, get tattoos, or travel with
                        my wife.
                    </p>
                </div>
            </div>
        </PageWrapper>
    );
}

export default Dashboard;
