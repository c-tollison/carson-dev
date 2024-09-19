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
                            d='M0 0 L900 0 L900 150 C750 200, 550 120, 400 150 C250 200, 50 120, 0 150 Z'
                            fill='url(#waveGradient)'
                            opacity='0.3'
                        >
                            <animate
                                attributeName='d'
                                dur='12s'
                                repeatCount='indefinite'
                                values='
                                    M0 0 L900 0 L900 150 C750 200, 550 120, 400 150 C250 200, 50 120, 0 150 Z;
                                    M0 0 L900 0 L900 180 C750 220, 550 150, 400 180 C250 220, 50 150, 0 180 Z;
                                    M0 0 L900 0 L900 150 C750 200, 550 120, 400 150 C250 200, 50 120, 0 150 Z'
                            />
                        </path>
                        <path
                            d='M0 0 L900 0 L900 120 C700 180, 500 100, 300 120 C100 180, 0 100, 0 120 Z'
                            fill='url(#waveGradient)'
                            opacity='0.5'
                        >
                            <animate
                                attributeName='d'
                                dur='10s'
                                repeatCount='indefinite'
                                values='
                                    M0 0 L900 0 L900 120 C700 180, 500 100, 300 120 C100 180, 0 100, 0 120 Z;
                                    M0 0 L900 0 L900 140 C700 200, 500 120, 300 140 C100 200, 0 120, 0 140 Z;
                                    M0 0 L900 0 L900 120 C700 180, 500 100, 300 120 C100 180, 0 100, 0 120 Z'
                            />
                        </path>
                        <path
                            d='M0 0 L900 0 L900 90 C650 160, 450 70, 250 90 C50 160, 0 70, 0 90 Z'
                            fill='url(#waveGradient)'
                            opacity='0.7'
                        >
                            <animate
                                attributeName='d'
                                dur='8s'
                                repeatCount='indefinite'
                                values='
                                    M0 0 L900 0 L900 90 C650 160, 450 70, 250 90 C50 160, 0 70, 0 90 Z;
                                    M0 0 L900 0 L900 110 C650 140, 450 80, 250 110 C50 140, 0 80, 0 110 Z;
                                    M0 0 L900 0 L900 90 C650 160, 450 70, 250 90 C50 160, 0 70, 0 90 Z'
                            />
                        </path>
                    </svg>
                    <div className='relative z-10 p-8 pt-28 md:pt-36'>{children}</div>
                </>
            ) : (
                <>{children}</>
            )}
        </div>
    );
}
