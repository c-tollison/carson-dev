import { Link } from 'react-router-dom';
import Hero from '../components/hero';
import PageWrapper from '../components/page-wrapper';
import journals from './journals/journals';

function Dashboard() {
    const latestJournals = journals.slice(journals.length - 5).reverse();

    return (
        <PageWrapper>
            <Hero />
            <div className='flex flex-col md:flex-row md:gap-4'>
                <div className='mt-4 md:w-2/6 w-full'>
                    <h3 className='mx-auto flex justify-between items-end border-b pb-4 border-border text-xl'>
                        <span>Recent Journals</span>
                        <span className='text-sm'>
                            <Link to='/journal'>More</Link>
                        </span>
                    </h3>

                    <ul className='mt-4 flex flex-col'>
                        {latestJournals.map((journal, i) => (
                            <li key={i}>
                                <Link
                                    to={`/journal/${journal.route}`}
                                    className='group flex justify-between items-center py-2 duration transition-all duration-300 ease-in-out'
                                >
                                    <div>
                                        <h4 className='text-xl font-bold text-foreground'>{journal.title}</h4>
                                        <p className='text-sm text-muted-foreground'>{journal.date}</p>
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
                    <h3 className='mx-auto border-b pb-4 border-border text-xl'>About Me</h3>
                    <p className='mt-4 text-xl leading-relaxed'>
                        I am a software engineer specializing in software architecture and backend systems. I graduated
                        from Clemson University with a B.S. in Computer Science and have since contributed to projects
                        in the healthcare sector. I enjoy working with TypeScript and Go, and I'm passionate about
                        building scalable systems. Outside of work, I like to watch anime, get tattoos, or travel with
                        my fiancée.
                    </p>
                </div>
            </div>
            <div className='w-full mt-4'>
                <h3 className='flex justify-between items-end border-b pb-4 border-border text-xl'>
                    <span>Something Fun</span>
                    <span className='text-sm'>
                        <Link to='/projects'>More</Link>
                    </span>
                </h3>

                <ul className='mt-4 flex flex-col'></ul>
            </div>
        </PageWrapper>
    );
}

export default Dashboard;
