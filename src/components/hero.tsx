import Github from './buttons/github';
import LinkedIn from './buttons/linkedin';

export default function Hero() {
    return (
        <div className='pb-6 mb-2 flex flex-col md:flex-row items-center md:items-center md:justify-between gap-4 w-full'>
            <div className='flex flex-col items-center md:items-start gap-2'>
                <h1 className='text-primary text-3xl md:text-5xl font-bold'>Carson Tollison</h1>
                <h2 className='text-xl font-medium'>Full-Stack Engineer</h2>
                <div className='flex gap-4'>
                    <Github />
                    <LinkedIn />
                </div>
            </div>
            <div className='order-first md:order-last w-28 h-28 flex-shrink-0'>
                <img
                    src='ct.webp'
                    alt='Carson'
                    className='w-full h-full object-cover rounded-full shadow-lg'
                />
            </div>
        </div>
    );
}
