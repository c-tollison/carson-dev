import WorkPage from '../../components/work-page';

export default function AmazonPt2() {
    const points: string[] = [
        `Devised and executed an event-driven architecture with AWS Lambda, S3, and DynamoDB to 
         process and analyze product data, expediting clawback initiatives for millions of ASINs`,
        `Engineered a memory-efficient file reader in Java, boosting data processing speed by
         25% and improving file type handling`,
        `Implemented comprehensive unit and integration tests, achieving 100% code coverage to
         strengthen system reliability`,
    ];

    return (
        <WorkPage
            company={'Amazon - APM'}
            title={'Software Development Engineer Intern'}
            dates={'May 2023 - Aug 2023'}
            location={'Hybrid/Seattle, WA'}
            imageUrl={'./../amazon.png'}
            points={points}
        >
            <p>
                Summer 2023 took me back to Seattle for the second time, once again joined by my fiancée. This time, I
                wasn't fully remote — we had a hybrid schedule of three days in the office and two days remote. With
                COVID finally behind us, we were excited to explore everything Seattle had to offer. We lived right
                beside the University of Washington, which felt a little more like home since we had been living in
                Clemson prior.
            </p>

            <p>
                I joined the Automated Profitability Management (APM) team. I came into this internship much more
                prepared than my first time at Amazon. By this point, I was familiar with the internal tools, and I had
                also completed another rotation at ChiroHD. I was ready to show what I could do and hopefully secure a
                return offer for after graduation. The tech stack was microservices and Java — and I quickly learned I
                wasn't a huge fan of either. Java feels like it writes itself, but man, it's verbose. Still, I got to
                work on some cool projects, and I feel like this experience really hammered solid OOP principles into my
                brain.
            </p>

            <p>
                Being back in the office was such a refreshing change of pace. After doing remote internships for a
                while, it felt great to work alongside teammates in person. Some of us would grab a room together to do
                system design sessions or just grind through our work. And free coffee! Every couple of weeks, we'd have
                team parties or game nights, which made work fun. Though I will say — those long bus rides home were
                brutal.
            </p>

            <div className='w-full flex justify-center items-center flex-shrink-0'>
                <img
                    src='./../riding-home.jpg'
                    alt='Seattle bridge on commute home'
                    className='w-72 object-contain rounded-lg shadow-lg'
                />
            </div>

            <p>
                This internship was the first time I truly felt like a developer. I was making decisions, planning
                improvements, and contributing as a collaborator instead of just an intern. The skills I gained here
                gave me a clear vision of what good software should look like. And all the hard work paid off — I
                received a "Inclined to Hire" rating and got an offer around graduation. I ultimately decided not to
                join the team, since it would have required moving across the country. But I have to say, this team was
                incredible, and both of my internships with Amazon played a huge role in shaping the developer I am
                today.
            </p>
        </WorkPage>
    );
}
