import WorkPage from '../../components/work-page';

export default function AmazonPt1() {
    const points: string[] = [
        `Designed and implemented a scalable, event-driven architecture on AWS to process global pay and timecard data, using AWS CDK for infrastructure as code`,
        `Leveraged AWS SQS FIFO queues to handle burst traffic and ensure ordered processing, preventing downstream service overloads`,
        `Automated ingestion and transformation of JSON datasets with Python on AWS Lambda, streamlining global timecard operations and reducing manual data engineering efforts`,
    ];

    return (
        <WorkPage
            company={'Amazon - Benefits'}
            title={'Software Development Engineer Intern'}
            dates={'May 2022 - Aug 2022'}
            location={'Remote/Seattle, WA'}
            imageUrl={'./../amazon.png'}
            points={points}
        >
            <p>
                Summer 2022 was my first time living outside of South Carolina. I applied to this internship while
                waiting for my data structures and algorithms class to start. Honestly, I didn't think I would hear back
                — at the time, I had only been an intern at ChiroHD for maybe two months and didn't have much else on my
                resume. I was still pretty early in my journey as a developer. Little did I know, it would turn out to
                be one of the best summers of my life.
            </p>

            <div className='w-full flex justify-center items-center flex-shrink-0'>
                <img
                    src='./../hello_world.JPG'
                    alt='hello-world'
                    className='w-72 object-contain rounded-lg shadow-lg'
                />
            </div>

            <p>
                My fiancée and I moved out to Seattle about a week before the internship started. We rented a small
                studio apartment in Capitol Hill. The recruiter had told me I needed to be in Seattle before my start
                date, so we packed up and went. When the first day rolled around, I got an email from my manager asking
                me to join a Zoom call bright and early — like 7:30 AM PST. I was a little confused but figured it was
                for onboarding and planning. I suited up, ready to meet my team, but I hadn't been given an office
                address yet. I joined the Zoom call, and there was my manager, sitting outside on his porch in broad
                daylight. Meanwhile, it was pitch black in Seattle. That's when I realized this was going to be an
                interesting experience.
            </p>

            <p>
                Turns out there had been some miscommunication between the recruiters and my team. My team was fully
                remote. So, I had moved all the way across the country to sit in an apartment in a city I'd never been
                to before. It definitely threw me for a loop at first, but I actually grew to enjoy it. I had always
                thought the Amazon Spheres were so cool. I specifically remember watching CNN Student News in my high
                school economics class, and they did a segment about the Spheres. I never thought I'd get to go inside
                and work there. But since my team was remote, I ended up going and working from the Spheres almost every
                day that summer.
            </p>

            <div className='w-full flex justify-center items-center flex-shrink-0'>
                <img
                    src='./../spheres.JPG'
                    alt='amazon-spheres'
                    className='w-72 object-contain rounded-lg shadow-lg'
                />
            </div>

            <p>
                Neil Cutshaw was one of my mentors on the team and the only other member based in Seattle. If you've
                ever read
                <em> Clean Code </em> by Robert Martin (Uncle Bob), Neil was like the walking embodiment of it. I don't
                think there was a single PR I submitted that he didn't pick apart in detail. But honestly, that's
                exactly what I needed at that point in my career. He put in a ton of effort to help me grow. We had a
                lot of system design meetings, and I'll always be grateful for the time and energy he invested in me.
            </p>

            <p>
                This internship was transformative in so many ways. I learned how to write production-level code. I
                started to really understand the serverless model and how to work at a scale I hadn't even imagined
                before. And on top of that, I got to experience Seattle with my fiancée. It'll always feel like our home
                away from home — and it's where I proposed to her.
            </p>
        </WorkPage>
    );
}
