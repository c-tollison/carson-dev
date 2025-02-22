import { useContext, useEffect, useState } from 'react';
import { ColorModeContext } from '../../core/providers/color-mode-provider/color-mode-provider';
import { ColorMode } from '../../core/providers/color-mode-provider/color-mode.enum';

export interface ProjectProps {
    title: string;
    description: string;
    tech: string[];
    openModal: () => void;
}

export default function Project({ title, description, tech, openModal }: ProjectProps) {
    const colorModeContext = useContext(ColorModeContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        const handleResize = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleResize();
        mediaQuery.addEventListener('change', handleResize);

        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    return (
        <div
            className='py-6 px-4 border-b border-accent last:border-b-0 cursor-pointer'
            onClick={openModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className='text-xl font-semibold flex items-center justify-between'>
                {isMobile ? (
                    <>
                        <div>{title}</div>
                        <div>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='2'
                                stroke={colorModeContext.colorMode === ColorMode.Dark ? 'white' : 'black'}
                                className='w-6 h-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M9 5l7 7-7 7'
                                />
                            </svg>
                        </div>
                    </>
                ) : (
                    <div className={`${isHovered ? 'underline' : ''}`}>{title}</div>
                )}
            </h2>
            {isHovered && !isMobile && (
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
