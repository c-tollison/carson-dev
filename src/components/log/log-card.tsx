import { Link } from 'react-router-dom';

export interface LogCardProps {
    title: string;
    date: string;
    route: string;
    topics: string[];
    thumbnail: string;
}

export default function LogCard({ title, date, route, thumbnail, topics }: LogCardProps) {
    return (
        <Link to={`/log/${route}`}>
            <div className='group w-full flex items-center gap-5 p-6 rounded-lg bg-card hover:bg-popover hover:shadow-lg transition-all duration-300 ease-in-out border border-border'>
                {thumbnail && (
                    <div className='w-14 h-14 flex-shrink-0'>
                        <img
                            src={thumbnail}
                            alt={`${title} thumbnail`}
                            className='w-full h-full object-contain rounded-md'
                        />
                    </div>
                )}
                <div className='flex justify-between items-center w-full min-w-0'>
                    <div className='flex-1 min-w-0'>
                        <h4 className='text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate'>{title}</h4>
                        <p className='text-base text-muted-foreground mt-0.5'>{date}</p>
                        <div className='mt-2 flex flex-wrap gap-2'>
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
                    <div className='text-primary text-lg opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0'>
                        &#8594;
                    </div>
                </div>
            </div>
        </Link>
    );
}
