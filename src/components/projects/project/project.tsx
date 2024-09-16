import { useState } from 'react';

export interface ProjectProps {
    title: string;
    description: string;
    openModal: () => void;
}

export default function Project({ title, description, openModal }: ProjectProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='py-4 px-6 border-b border-accent last:border-b-0 cursor-pointer hover:bg-accent'
            onClick={openModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className='text-xl font-semibold mb-2'>{title}</h2>
            {isHovered && <p className='text-sm text-muted-foreground truncate'>{description}</p>}
        </div>
    );
}
