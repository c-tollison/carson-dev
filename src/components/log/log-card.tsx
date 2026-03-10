import { Link } from 'react-router-dom';

export interface LogCardProps {
    title: string;
    date: string;
    route: string;
    topics: string[];
}

export default function LogCard({ title, date, route, topics }: LogCardProps) {
    return (
        <Link to={`/log/${route}`}>
            <div className='group w-full flex items-center gap-5 p-5 md:p-6 rounded-lg bg-card hover:bg-card/80 border border-border hover:border-primary/20 transition-all duration-200'>
                <div className='flex justify-between items-center w-full min-w-0'>
                    <div className='flex-1 min-w-0'>
                        <h4 className='text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors truncate'>
                            {title}
                        </h4>
                        <p className='text-sm text-muted-foreground mt-1'>{date}</p>
                        <div className='mt-2.5 flex flex-wrap gap-1.5'>
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
                    <div className='text-primary text-base opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4'>
                        &#8594;
                    </div>
                </div>
            </div>
        </Link>
    );
}
