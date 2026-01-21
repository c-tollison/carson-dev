import { useEffect, useRef, useState } from 'react';
import Github from './buttons/github';
import LinkedIn from './buttons/linkedin';

export default function Hero() {
    const heroText = "Hi, I'm Carson";
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (indexRef.current < heroText.length) {
                setDisplayedText(heroText.slice(0, indexRef.current + 1));
                indexRef.current++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-row gap-4 items-center justify-center md:justify-between'>
            <div className='py-6 md:py-10 flex flex-col items-center md:items-start gap-2 md:gap-3 md:w-1/2 w-full'>
                {/* Mobile circular image - centered above text */}
                <div className='md:hidden w-24 h-24 mb-2'>
                    <img
                        src='ct.jpg'
                        alt='Carson'
                        className='w-full h-full object-cover rounded-full shadow-lg'
                    />
                </div>
                <h1 className='text-primary text-3xl md:text-5xl font-bold'>{displayedText}</h1>
                <h2 className='text-sm md:text-xl font-medium'>Full-Stack Engineer | Backend Specialist</h2>
                <div className='flex gap-4'>
                    <Github />
                    <LinkedIn />
                </div>
            </div>
            {/* Desktop large image */}
            <div className='hidden md:flex md:w-1/2 justify-end'>
                <div className='w-full max-w-sm aspect-square'>
                    <img
                        src='ct.jpg'
                        alt='Carson'
                        className='w-full h-full object-cover rounded-lg shadow-lg'
                    />
                </div>
            </div>
        </div>
    );
}
