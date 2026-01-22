import WorkPage from '../../components/work-page';

export default function ChiroHD() {
    const points: string[] = [
        `Saved hours of weekly manual reconciliation effort for 1,000+ chiropractic clinics by developing an automated X12 EDI insurance claims parser`,
        `Processed thousands of daily financial transactions with full audit compliance by designing and deploying a double-entry accounting system with line-item tracking`,
        `Scaled serverless architecture to handle millions of monthly API requests by implementing CI/CD pipelines, AWS Lambda functions, and monitoring infrastructure for high availability`,
    ];

    return (
        <WorkPage
            company={'ChiroHD'}
            title={'Software Engineer'}
            dates={'Nov 2021 - Aug 2025'}
            location={'Remote'}
            profileImage={'./../chirohd_logo.png'}
            points={points}
            tldr={"Started as an intern with barely any development experience and joined full time in December 2023. Built customer facing features for thousands of chiropractic offices, from insurance billing to double entry accounting. Working on a small team meant I got thrown into challenges early, which is exactly what I needed. Easily the most rewarding experience of my career so far."}
        >
            <p>
                One day, I got a call from my mom: "Hey Carson, one of my coworker's boyfriends runs a software company
                and you should reach out to him about a job." I was excited, but honestly, I barely knew anything about
                development at the time. I had just started working through The Odin Project in my free time, trying to
                pick up web development. My only real coding experience was in C and Java from my college classes.
            </p>

            <p>
                I emailed my now-CTO, Luke Doty, but somewhere along the way, our emails crossed, and I didn't hear back
                for a while. I kept grinding, figuring the opportunity had passed. Then, out of the blue, Luke reached
                out and told me he'd like to have me on board. I couldn't believe it. I thought I'd missed my chance.
            </p>

            <p>
                From day one, I was thrown into the deep end, but I'm glad I was. On the first day, Luke asked me to
                write code to decode JWT tokens and verify them with Cognito (or something along those lines, it's been
                a couple of years). My first thought was: <em>brother, what is this?</em> There were so many layers of
                abstraction, and the whole serverless Lambda model was brand new to me. But Luke was a great mentor. He sat me down and walked me through
                API Gateway and Lambda until it started to click.
            </p>

            <p>
                Being part of a small team meant I got to jump into many challenges early. In December 2023, I joined
                full-time and since then, I've grown quite a bit. The fast-paced environment doesn't leave you with much
                of a choice.
            </p>

            <div className='w-full flex justify-center items-center flex-shrink-0'>
                <img
                    src='./../junior.jpeg'
                    alt='Dog walking himself on leash'
                    className='h-72 object-contain rounded-lg shadow-lg'
                />
            </div>

            <p>
                Working on our insurance platform was my first customer-facing project at ChiroHD. Before that, I had
                mostly worked on smaller features and internal improvements, like revamping our pipelines and getting
                our testing infrastructure up and running. Stepping into the insurance work gave me real ownership over
                something. More recently, I've shifted toward our ledger system and double entry accounting.
                (Double entry accounting is diabolical.)
            </p>

            <div className='w-full flex justify-center items-center flex-shrink-0'>
                <img
                    src='./../whiteboard.jpeg'
                    alt='My giant whiteboard filled with architecture diagrams'
                    className='w-72 object-contain rounded-lg shadow-lg'
                />
            </div>

            <p>
                ChiroHD has easily been the most rewarding experience of my career so far. We're improving the platforms
                of thousands of chiropractic offices, and I love that our CEO is pushing to use our platform to collect
                meaningful research data for the profession. It's fast-paced, challenging, and every day I feel like I'm
                building something that makes an impact.
            </p>
        </WorkPage>
    );
}
