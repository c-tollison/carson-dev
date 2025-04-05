import PageWrapper from '../components/page-wrapper';
import WorkExperience from '../components/work-experience';

export default function Work() {
    return (
        <PageWrapper>
            <div className='py-10'>
                <h1 className='text-primary text-5xl font-bold min-h-[3.5rem]'>Work</h1>
                <h2 className='text-2xl font-semibold text-foreground'>Companies I've gotten a chance to create at</h2>
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
        </PageWrapper>
    );
}
