import { Link } from 'react-router-dom';
import PageWrapper from '../page-wrapper';

export interface LogPageProps {
    title: string;
    date: string;
    topics: string[];
    thumbnail: string;
    children: React.ReactNode;
}

export default function LogPage({ title, date, topics, thumbnail, children }: LogPageProps) {
    return (
        <PageWrapper>
            <Link
                to='/log'
                className='hover:text-primary text-sm transition-opacity'
            >
                <span>&#8592;</span> Back
            </Link>
            <div className='py-8 flex flex-row justify-between items-start gap-6 mb-8'>
                <div className='flex-1 min-w-0'>
                    <h1 className='text-3xl font-bold text-primary mb-2'>{title}</h1>
                    <p className='text-sm text-muted-foreground mb-3'>{date}</p>
                    <div className='flex flex-wrap gap-2'>
                        {topics.map((topic, index) => (
                            <span
                                key={index}
                                className='px-2 py-1 rounded-full bg-card border border-border text-xs transition-colors duration-300 ease-in-out text-foreground'
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='hidden md:block w-16 h-16 flex-shrink-0'>
                    <img
                        src={thumbnail}
                        alt='Log thumbnail'
                        className='w-full h-full object-contain rounded-md'
                    />
                </div>
            </div>

            <section className='pb-4 mb-6'>
                <div className='leading-relaxed flex flex-col gap-4 text-sm'>{children}</div>
            </section>
            <Link
                to='/log'
                className='hover:text-primary text-sm transition-opacity'
            >
                <span>&#8592;</span> Back
            </Link>
        </PageWrapper>
    );
}
