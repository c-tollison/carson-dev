import { useState } from 'react';

export interface ProjectProps {
    title: string;
    description: string;
    tech: string[];
    openModal: () => void;
}

export default function Project({ title, description, tech, openModal }: ProjectProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='py-6 px-4 border-b border-accent last:border-b-0 cursor-pointer'
            onClick={openModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className='text-xl font-semibold '>{title}</h2>
            {isHovered && (
                <>
                    <p className='text-sm text-muted-foreground line-clamp-3'>{description}</p>
                    <div className='mt-2 flex flex-wrap gap-2'>
                        {tech.map((item, index) => (
                            <span
                                key={index}
                                className='px-2 py-1 text-xs font-medium bg-secondary rounded-full '
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
