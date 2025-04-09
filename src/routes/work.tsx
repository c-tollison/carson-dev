import PageWrapper from '../components/page-wrapper';
import WorkExperience from '../components/work-experience';
import works from './works/works';

export default function Work() {
    return (
        <PageWrapper>
            <div className='py-10 flex flex-col gap-3'>
                <h1 className='text-primary text-5xl font-bold'>Work</h1>
                <h2 className='text-2xl font-semibold text-foreground'>Companies I've gotten a chance to create at</h2>
            </div>

            <div className='flex flex-col gap-4'>
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
