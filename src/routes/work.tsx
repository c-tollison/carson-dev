import PageWrapper from '../components/page-wrapper';
import WorkExperience from '../components/work-experience';
import works from './works/works';

export default function Work() {
    return (
        <PageWrapper>
            <div className='mb-8'>
                <h1 className='font-display text-3xl font-bold tracking-tight text-foreground'>Work Experience</h1>
            </div>

            <div className='flex flex-col gap-3'>
                {works.map((work) => (
                    <WorkExperience
                        key={work.route}
                        route={work.route}
                        name={work.name}
                        title={work.title}
                        date={work.date}
                        profileImage={work.profileImage}
                    />
                ))}
            </div>
        </PageWrapper>
    );
}
