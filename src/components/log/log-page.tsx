import { Link } from 'react-router-dom';
import PageWrapper from '../page-wrapper';

export interface LogPageProps {
    title: string;
    date: string;
    topics: string[];
    children: React.ReactNode;
}

export default function LogPage({ title, date, topics, children }: LogPageProps) {
    return (
        <PageWrapper>
            <Link
                to='/log'
                className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors'
            >
                <span>&#8592;</span> Back
            </Link>
            <div className='py-10 flex flex-row justify-between items-start gap-6 mb-2'>
                <div className='flex-1 min-w-0'>
                    <h1 className='font-display text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3'>
                        {title}
                    </h1>
                    <p className='text-sm text-muted-foreground mb-4'>{date}</p>
                    <div className='flex flex-wrap gap-1.5'>
                        {topics.map((topic, index) => (
                            <span
                                key={index}
                                className='px-2 py-0.5 rounded-full border border-border text-[11px] font-medium text-muted-foreground'
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <section className='pb-4 mb-8'>
                <div className='leading-relaxed flex flex-col gap-4 text-sm text-foreground/90'>{children}</div>
            </section>
            <Link
                to='/log'
                className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors'
            >
                <span>&#8592;</span> Back
            </Link>
        </PageWrapper>
    );
}
