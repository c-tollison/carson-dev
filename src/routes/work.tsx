import { useEffect, useState } from 'react';
import WorkExperience from '../components/work-experience/work-experience';

export default function Work() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className='py-10 md:w-1/2'>
                <h1 className='text-primary text-5xl font-bold min-h-[3.5rem]'>Work</h1>
                <h2 className='text-2xl font-medium'>Companies I've gotten a chance to create at</h2>
            </div>

            <div className='flex flex-col gap-4'>
                <WorkExperience
                    route='chirohd'
                    name='ChiroHD'
                    title='Software Engineer'
                    date='Nov 2021 - Present'
                    imageUrl='chirohd_logo.png'
                />
                <WorkExperience
                    route='amazon-pt2'
                    name='Amazon - APM'
                    title='Software Development Engineer Intern'
                    date='May 2023 - Aug 2023'
                    imageUrl='amazon.png'
                />
                <WorkExperience
                    route='amazon-pt1'
                    name='Amazon - Benefits'
                    title='Software Development Engineer Intern'
                    date='May 2022 - Aug 2022'
                    imageUrl='amazon.png'
                />
            </div>
        </div>
    );
}
