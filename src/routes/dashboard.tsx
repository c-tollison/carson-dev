import { Link } from 'react-router-dom';
import Hero from '../components/hero';
import PageWrapper from '../components/page-wrapper';
import journals from './journals/journals';

function Dashboard() {
    const latestJournals = journals.slice(journals.length - 5).reverse();

    return (
        <PageWrapper>
            <Hero />
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='mt-4 md:w-1/4 w-full'>
                    <h3 className='mx-auto border-b pb-4 border-border text-xl'>Recent Journals</h3>
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
                <div className='mt-4 md:w-3/4 w-full'>
                    <h3 className='mx-auto border-b pb-4 border-border text-xl'>About me</h3>
                </div>
            </div>
            <div className='w-full mt-4'>
                <h3 className='border-b pb-4 border-border text-xl'>Projects</h3>
                <ul className='mt-4 flex flex-col'></ul>
            </div>
        </PageWrapper>
    );
}

export default Dashboard;
