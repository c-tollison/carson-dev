import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
    cols?: string;
    rows?: string;
    waves?: boolean;
}

export default function Card({ children, className, cols, rows, waves, ...props }: CardProps) {
    return (
        <div
            {...props}
            className={`relative p-8 bg-card rounded-md border border-border shadow-md transition transform duration-300 ease-in-out overflow-hidden ${cols} ${rows} ${className}`}
        >
            {waves ? (
                <>
                    <svg
                        viewBox='0 0 900 300'
                        xmlns='http://www.w3.org/2000/svg'
                        className='absolute w-full top-0 left-0 h-24 md:h-32'
                        preserveAspectRatio='none'
                    >
                        <defs>
                            <linearGradient
                                id='waveGradient'
                                x1='0%'
                                y1='0%'
                                x2='100%'
                                y2='0%'
                            >
                                <stop
                                    offset='0%'
                                    style={{ stopColor: '#0066FF', stopOpacity: 1 }}
                                />
                                <stop
                                    offset='100%'
                                    style={{ stopColor: '#0044AA', stopOpacity: 1 }}
                                />
                            </linearGradient>
                        </defs>
                        <path
                            d='M0 0 L900 0 L900 120 C750 180, 550 80, 400 120 C250 180, 50 80, 0 120 Z'
                            fill='url(#waveGradient)'
                            opacity='0.3'
                        />
                        <path
                            d='M0 0 L900 0 L900 100 C700 160, 500 60, 300 100 C100 160, 0 60, 0 100 Z'
                            fill='url(#waveGradient)'
                            opacity='0.5'
                        />
                        <path
                            d='M0 0 L900 0 L900 80 C650 140, 450 40, 250 80 C50 140, 0 40, 0 80 Z'
                            fill='url(#waveGradient)'
                            opacity='0.7'
                        />
                    </svg>
                    <div className='relative z-10 p-8 pt-28 md:pt-36'>{children}</div>
                </>
            ) : (
                <>{children}</>
            )}
        </div>
    );
}
