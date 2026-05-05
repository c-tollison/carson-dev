import Github from './buttons/github';
import LinkedIn from './buttons/linkedin';

export default function Hero() {
    return (
        <div className='pb-8 mb-4 flex flex-col md:flex-row items-center md:items-center md:justify-between gap-6 w-full'>
            <div className='flex flex-col items-center md:items-start gap-3'>
                <h1 className='font-display text-primary text-4xl md:text-5xl font-bold tracking-tight'>
                    Carson Tollison
                </h1>
                <p className='text-lg font-medium text-muted-foreground tracking-wide'>Full-Stack Engineer</p>
                <div className='flex flex-wrap items-center gap-3 mt-2'>
                    <a
                        href='mailto:tollisoncarson@gmail.com'
                        className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity'
                    >
                        Get In Touch
                    </a>
                    <Github />
                    <LinkedIn />
                </div>
            </div>
            <div className='order-first md:order-last w-32 h-32 md:w-36 md:h-36 flex-shrink-0'>
                <img
                    src='ct.webp'
                    alt='Carson'
                    className='w-full h-full object-cover rounded-full shadow-lg ring-2 ring-border'
                />
            </div>
        </div>
    );
}
