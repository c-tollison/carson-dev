import Github from './buttons/github';
import LinkedIn from './buttons/linkedin';

export default function Hero() {
    return (
        <div className='mb-4 w-full'>
            <div className='relative flex flex-col md:flex-row items-center md:justify-between gap-6 overflow-hidden'>
                <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-0 overflow-hidden'
                >
                    <img
                        src='linked-in-header.png'
                        alt=''
                        className='absolute top-1/2 left-1/2 md:left-[70%] max-w-none w-full h-auto md:w-auto md:h-[1400px] -translate-x-1/2 -translate-y-1/2 md:-rotate-90 opacity-40 md:opacity-55 mix-blend-screen'
                        style={{ filter: 'sepia(0.9) saturate(2) hue-rotate(-8deg) brightness(1.15) contrast(1.1)' }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-background via-transparent to-background' />
                    <div className='absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60' />
                </div>
                <div className='relative z-10 flex flex-col items-center md:items-start gap-3'>
                    <h1 className='font-display text-primary text-4xl md:text-5xl font-bold tracking-tight'>
                        Carson Tollison
                    </h1>
                    <p className='text-lg font-medium text-muted-foreground tracking-wide'>
                        Full-stack engineer{' '}
                        <a
                            href='https://felux.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-accent hover:underline underline-offset-4'
                        >
                            @Felux
                        </a>
                    </p>
                    <div className='flex flex-wrap items-center gap-3 mt-2'>
                        <a
                            href='mailto:tollison.carson@gmail.com'
                            className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity'
                        >
                            Get In Touch
                        </a>
                        <Github />
                        <LinkedIn />
                    </div>
                </div>
                <div className='order-first md:order-last relative z-10 w-28 h-28 md:w-32 md:h-32 flex-shrink-0 md:mr-2'>
                    <img
                        src='profile-pic.jpeg'
                        alt='Carson'
                        className='w-full h-full object-cover rounded-full shadow-lg ring-2 ring-border'
                    />
                </div>
            </div>
        </div>
    );
}
