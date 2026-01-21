import PageWrapper from '../components/page-wrapper';
import WorkExperience from '../components/work-experience';
import works from './works/works';

export default function Work() {
    return (
        <PageWrapper>
            <div className='py-8 flex flex-col gap-2 mb-8'>
                <h1 className='text-primary text-3xl font-bold'>Work Experience</h1>
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
