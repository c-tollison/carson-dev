import { Link } from 'react-router-dom';

export interface WorkExperienceProps {
    route: string;
    name: string;
    title: string;
    date: string;
    profileImage: string | React.ComponentType<{ className?: string }>;
}

export default function WorkExperience({ route, name, title, date, profileImage }: WorkExperienceProps) {
    const renderProfileImage = () => {
        if (typeof profileImage === 'string') {
            return (
                <img
                    src={profileImage}
                    alt='Company logo'
                    className='w-full h-full object-contain rounded-md'
                />
            );
        } else {
            const ImageComponent = profileImage;
            return <ImageComponent className='w-full h-full object-contain rounded-md' />;
        }
    };

    return (
        <Link to={`/work/${route}`}>
            <div className='group w-full flex items-center gap-5 p-6 rounded-lg bg-card hover:bg-popover hover:shadow-lg transition-all duration-300 ease-in-out border border-border'>
                <div className='w-14 h-14 flex-shrink-0'>
                    {renderProfileImage()}
                </div>
                <div className='flex-1 min-w-0'>
                    <h3 className='text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate'>
                        {name}
                    </h3>
                    <p className='text-sm text-foreground font-medium mt-0.5'>{title}</p>
                    <p className='text-sm text-muted-foreground mt-1'>{date}</p>
                </div>
                <div className='text-primary text-lg opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0'>&#8594;</div>
            </div>
        </Link>
    );
}
