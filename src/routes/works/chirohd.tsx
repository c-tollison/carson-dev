import WorkPage from '../../components/work-page';

export default function ChiroHD() {
    const points: string[] = [
        `Engineered an X12 insurance EOB parser using SFTP and AWS Lambda, accelerating billing for
         1,000+ chiropractic offices`,
        `Developed a double-entry accounting system at the line-item level, providing detailed
         financial insights for enhanced practice management`,
        `Managed fully serverless AWS architecture serving millions of daily customer requests,
         leveraging API Gateway, Lambda, S3, and RDS to ensure scalability and resilience`,
        `Built an internal application with AWS (RDS, Lambda, ALB), React, and GitHub Actions to  
         automate environment management and streamline deployments.`,
        `Integrated HIPAA-compliant Twilio messaging with opt-in/out functionality to secure patient
         communications`,
        `Implemented PostgreSQL row-level security to protect data privacy, ensure HIPAA compliance, 
         and address vulnerabilities`,
    ];

    return (
        <WorkPage
            company={'ChiroHD'}
            title={'Software Engineer'}
            dates={'Nov 2021 - Present'}
            location={'Remote/Greenville, SC'}
            imageUrl={'./../chirohd_logo.png'}
            points={points}
        >
            <p>
                One day, I got a call from my mom: "Hey Carson, one of my coworker's boyfriends runs a software company
                — you should reach out to him about a job." I was excited, but honestly, I barely knew anything about
                development at the time. I had just started working through The Odin Project in my free time, trying to
                pick up web development. My only real coding experience was in C and Java from my college classes.
            </p>

            <p>
                I emailed my now-CTO, Luke Doty, but somewhere along the way, our emails crossed, and I didn't hear back
                for a while. I kept grinding, figuring the opportunity had passed. Then, out of the blue, Luke reached
                out — he told me he'd like to have me on board. I couldn't believe it. I thought I'd missed my chance.
            </p>

            <p>
                From day one, I was thrown into the deep end, but I'm glad I was. On the first day, Luke asked me to
                write code to decode JWT tokens and verify them with Cognito (or something along those lines — it's been
                a couple of years). My first thought was: <em>brother, what is this?</em> There were so many layers of
                abstraction, and the whole serverless Lambda model was brand new to me. I didn't even realize a server
                didn't have to be a physical computer. But Luke was a great mentor. He sat me down and walked me through
                API Gateway and Lambda until it started to click.
            </p>

            <p>
                Being part of a lean team meant I got to jump into many challenges early. In December 2023, I joined
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
                something. More recently, I've shifted toward our ledger system and double-entry accounting.
                (Double-entry accounting is diabolical.)
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
