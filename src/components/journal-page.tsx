import { Link } from 'react-router-dom';
import PageWrapper from './page-wrapper';

export interface JournalPageProps {
    title: string;
    date: string;
    topics: string[];
    thumbnail: string;
    children: React.ReactNode;
}

export default function JournalPage({ title, date, topics, thumbnail, children }: JournalPageProps) {
    return (
        <PageWrapper>
            <Link
                to='/journal'
                className='hover:text-primary text-l transition-opacity'
            >
                <span>&#8592;</span> Back
            </Link>
            <div className='py-10 flex flex-row justify-between items-center'>
                <div>
                    <h1 className='text-5xl font-bold text-primary'>{title}</h1>
                    <h2 className='text-2xl font-semibold'>{date}</h2>
                    <div className='mt-2 flex flex-wrap gap-2'>
                        {topics.map((topic, index) => (
                            <span
                                key={index}
                                className='px-2 py-1 rounded-full bg-card border border-border text-sm transition-colors duration-300 ease-in-out text-foreground'
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='hidden md:block w-20 h-20 flex-shrink-0'>
                    <img
                        src={thumbnail}
                        alt='Company Logo'
                        className='w-full h-full object-contain rounded-md'
                    />
                </div>
            </div>

            <section className='pb-4 mb-4'>
                <h3 className='text-xl font-semibold border-b border-border  mb-4'></h3>
                <div className='leading-relaxed flex flex-col gap-4'>{children}</div>
            </section>
            <Link
                to='/journal'
                className='hover:text-primary text-l transition-opacity'
            >
                <span>&#8592;</span> Back
            </Link>
        </PageWrapper>
    );
}
