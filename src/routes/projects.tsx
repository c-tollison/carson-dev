import { useState, useEffect } from 'react';

export default function Projects() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold'>Projects</h1>
                <p className='text-lg'>Coming soon...</p>
            </div>
        </div>
    );
}
