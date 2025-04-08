import { Link } from 'react-router-dom';
import PageWrapper from './page-wrapper';

export interface WorkPageProps {
    company: string;
    title: string;
    dates: string;
    location: string;
    imageUrl: string;
    points: string[];
    children: React.ReactNode;
}

export default function WorkPage({ company, title, dates, location, imageUrl, points, children }: WorkPageProps) {
    return (
        <PageWrapper>
            <Link
                to='/work'
                className='hover:text-primary text-l transition-opacity'
            >
                <span>&#8592;</span> Back
            </Link>
            <div className='py-10 flex flex-row justify-between items-center'>
                <div>
                    <h1 className='text-5xl font-bold text-primary'>{company}</h1>
                    <h2 className='text-2xl font-semibold'>{title}</h2>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 text-muted-foreground'>
                        <h3>{dates}</h3>
                        <h4>{location}</h4>
                    </div>
                </div>
                <div className='hidden md:block w-20 h-20 flex-shrink-0'>
                    <img
                        src={imageUrl}
                        alt='Company Logo'
                        className='w-full h-full object-contain rounded-md'
                    />
                </div>
            </div>

            <section>
                <h3 className='text-xl font-semibold border-b border-border pb-4 mb-4'>Quick Points</h3>
                <ul className='pl-4 list-disc list-outside mb-4'>
                    {points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </section>

            <section className='pb-4 mb-4'>
                <h3 className='text-xl font-semibold border-b border-border pb-4 mb-4'>My Experience</h3>
                <div className='leading-relaxed flex flex-col gap-4'>{children}</div>
            </section>
            <Link
                to='/work'
                className='hover:text-primary text-l transition-opacity'
            >
                <span>&#8592;</span> Back
            </Link>
        </PageWrapper>
    );
}
