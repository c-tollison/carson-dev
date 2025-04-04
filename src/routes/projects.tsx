import { useState, useEffect } from 'react';

export default function Projects() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <h1 className='text-4xl font-bold mb-4'>Projects</h1>
                <p className='text-lg text-gray-700 mb-8'>Here are some of my projects:</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>{/* Add your project cards here */}</div>
            </div>
        </div>
    );
}
