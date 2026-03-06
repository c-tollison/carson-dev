import Github from './buttons/github';
import LinkedIn from './buttons/linkedin';

export default function Hero() {
    return (
        <div className='flex flex-row gap-4 items-center justify-center md:justify-between'>
            <div className='py-2 md:py-10 flex flex-col items-center md:items-start gap-1 md:gap-3 md:w-1/2 w-full'>
                {/* Mobile circular image - centered above text */}
                <div className='md:hidden w-24 h-24 mb-2'>
                    <img
                        src='ct.webp'
                        alt='Carson'
                        className='w-full h-full object-cover rounded-full shadow-lg'
                    />
                </div>
                <h1 className='text-primary text-3xl md:text-5xl font-bold'>Carson Tollison</h1>
                <h2 className='text-sm md:text-xl font-medium'>Full-Stack Engineer</h2>
                <div className='flex gap-4'>
                    <Github />
                    <LinkedIn />
                </div>
            </div>
            {/* Desktop large image */}
            <div className='hidden md:flex md:w-1/2 justify-end'>
                <div className='w-full max-w-sm aspect-square'>
                    <img
                        src='ct.webp'
                        alt='Carson'
                        className='w-full h-full object-cover rounded-lg shadow-lg'
                    />
                </div>
            </div>
        </div>
    );
}
