import { Link } from 'react-router-dom';

export interface JournalCardProps {
    title: string;
    date: string;
    route: string;
    topics: string[];
    thumbnail?: string;
}

export default function JournalCard({ title, date, route, thumbnail, topics }: JournalCardProps) {
    return (
        <Link to={`/journal/${route}`}>
            <div className='group w-full flex items-center gap-6 p-8 rounded-lg bg-card hover:bg-popover hover:shadow-lg transition-all duration-300 ease-in-out border border-border'>
                {thumbnail && (
                    <div className='w-16 h-16 flex-shrink-0'>
                        <img
                            src={thumbnail}
                            alt={`${title} thumbnail`}
                            className='w-full h-full object-contain rounded-md'
                        />
                    </div>
                )}
                <div className='flex justify-between items-center w-full'>
                    <div>
                        <h4 className='text-xl font-bold text-foreground'>{title}</h4>
                        <p className='text-sm text-muted-foreground'>{date}</p>
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
                    <div className='text-primary text-xl opacity-0 group-hover:opacity-100 transition-opacity'>
                        &#8594;
                    </div>
                </div>
            </div>
        </Link>
    );
}
