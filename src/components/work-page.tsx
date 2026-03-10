import { Link } from 'react-router-dom';
import PageWrapper from './page-wrapper';

export interface WorkPageProps {
    company: string;
    title: string;
    dates: string;
    location: string;
    profileImage: string | React.ComponentType<{ className?: string }>;
    points: string[];
    tldr?: string;
    children: React.ReactNode;
}

export default function WorkPage({
    company,
    title,
    dates,
    location,
    profileImage,
    points,
    tldr,
    children,
}: WorkPageProps) {
    const renderProfileImage = () => {
        if (typeof profileImage === 'string') {
            return (
                <img
                    src={profileImage}
                    alt='Company Logo'
                    className='w-full h-full object-contain rounded-md'
                />
            );
        } else {
            const ImageComponent = profileImage;
            return <ImageComponent className='w-full h-full object-contain rounded-md' />;
        }
    };

    return (
        <PageWrapper>
            <Link
                to='/work'
                className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors'
            >
                <span>&#8592;</span> Back
            </Link>
            <div className='mt-8 flex flex-row justify-between items-start gap-6 mb-10'>
                <div className='flex-1 min-w-0'>
                    <h1 className='font-display text-3xl md:text-4xl font-bold text-primary tracking-tight mb-2'>
                        {company}
                    </h1>
                    <h2 className='text-lg font-semibold text-foreground mb-3'>{title}</h2>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-muted-foreground'>
                        <span>{dates}</span>
                        {location && <span className='hidden sm:inline text-border'>|</span>}
                        <span>{location}</span>
                    </div>
                </div>
                <div className='hidden md:block w-20 h-20 flex-shrink-0'>{renderProfileImage()}</div>
            </div>

            {tldr && (
                <section className='mb-10'>
                    <h3 className='font-display text-lg font-semibold border-b border-border pb-3 mb-5'>TLDR</h3>
                    <p className='text-sm leading-relaxed text-foreground/90'>{tldr}</p>
                </section>
            )}

            <section className='mb-10'>
                <h3 className='font-display text-lg font-semibold border-b border-border pb-3 mb-5'>
                    Key Achievements
                </h3>
                <ul className='pl-5 list-disc list-outside space-y-3 text-sm leading-relaxed'>
                    {points.map((point, index) => (
                        <li
                            key={index}
                            className='text-foreground/90'
                        >
                            {point}
                        </li>
                    ))}
                </ul>
            </section>

            <section className='pb-4 mb-8'>
                <h3 className='font-display text-lg font-semibold border-b border-border pb-3 mb-5'>Experience</h3>
                <div className='leading-relaxed flex flex-col gap-4 text-sm text-foreground/90'>{children}</div>
            </section>
            <Link
                to='/work'
                className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors'
            >
                <span>&#8592;</span> Back
            </Link>
        </PageWrapper>
    );
}
