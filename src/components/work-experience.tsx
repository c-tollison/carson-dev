import { Link } from 'react-router-dom';

export interface WorkExperienceProps {
    route: string;
    name: string;
    title: string;
    date: string;
    imageUrl: string;
}

export default function WorkExperience({ route, name, title, date, imageUrl }: WorkExperienceProps) {
    return (
        <Link to={`/work/${route}`}>
            <div className='group w-full flex items-center gap-6 p-12 rounded-lg bg-card hover:bg-popover hover:shadow-lg transition-all duration-300 ease-in-out border border-border'>
                <div className='w-16 h-16 flex-shrink-0'>
                    <img
                        src={imageUrl}
                        alt='Company logo'
                        className='w-full h-full object-contain rounded-md'
                    />
                </div>
                <div className='flex-1'>
                    <h3 className='text-2xl font-bold text-foreground group-hover:text-primary transition-colors'>
                        {name}
                    </h3>
                    <p className='text-muted-foreground'>{title}</p>
                    <p className='text-muted-foreground'>{date}</p>
                </div>
                <div className='text-primary text-xl opacity-0 group-hover:opacity-100 transition-opacity'>&#8594;</div>
            </div>
        </Link>
    );
}
