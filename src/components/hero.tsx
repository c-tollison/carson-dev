import { useEffect, useRef, useState } from 'react';
import Github from './buttons/github';
import LinkedIn from './buttons/linkedin';

export default function Hero() {
    const heroText = "Hey, I'm Carson";
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
        <div className='flex flex-col md:flex-row items-center md:justify-between'>
            <div className='py-10 flex flex-col gap-3 md:w-1/2'>
                <h1 className='text-primary text-5xl font-bold min-h-[3.5rem]'>{displayedText}</h1>
                <h2 className='text-2xl font-medium'>Software Engineer out of Greenville, SC</h2>
                <div className='flex gap-4'>
                    <Github />
                    <LinkedIn />
                </div>
            </div>
            <div className='md:w-1/2 flex justify-end'>
                <div className='w-full max-w-md aspect-square'>
                    <img
                        src='ct.jpeg'
                        alt='Carson'
                        className='w-full h-full object-cover rounded-lg shadow-lg'
                    />
                </div>
            </div>
        </div>
    );
}
