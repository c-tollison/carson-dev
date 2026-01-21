import PageWrapper from '../components/page-wrapper';
import WorkExperience from '../components/work-experience';
import works from './works/works';

export default function Work() {
    return (
        <PageWrapper>
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-foreground'>Work Experience</h1>
            </div>

            <div className='flex flex-col gap-3'>
                {works.map((work) => (
                    <WorkExperience
                        key={work.route}
                        route={work.route}
                        name={work.name}
                        title={work.title}
                        date={work.date}
                        imageUrl={work.imageUrl}
                    />
                ))}
            </div>
        </PageWrapper>
    );
}
