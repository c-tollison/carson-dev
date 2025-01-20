import WorkExperience, { WorkExperienceProps } from '../../components/work-experience/work-experience';

export default function Experience() {
    const workExperience: WorkExperienceProps[] = [
        {
            companyOrProjectName: 'ChiroHD',
            jobTitle: 'Software Engineer',
            location: 'Remote',
            date: 'Dec 2023 - Present',
            details: [
                'Engineered an automated system for parsing insurance EOBs (X12) using SFTP and S3, streamlining payment processing for 800+ chiropractic offices',
                'Developed an internal full-stack app with AWS (RDS, Lambda, ALB), React, and Github actions to automate developer environment management and streamline deployments',
                'Leveraged Docker to create reproducible, stateless testing environments with pre-seeded data. Ran API and end-to-end tests using Jest and Cypress without persisting state between runs',
                'Utilized Redis to cache permissions, reducing database lookups and improving latency for authenticated endpoints',
                'Integrated HIPAA-compliant messaging via Twilio, enabling patient communication with opt-in compliance',
            ],
        },
        {
            companyOrProjectName: 'ChiroHD',
            jobTitle: 'Software Engineer Intern',
            location: 'Remote',
            date: 'Nov 2021 - Dec 2023',
            details: [
                'Enhanced patient data collection with a dynamic paperwork builder triggered by custom system events and emails',
                'Developed healthcare software using TypeScript, Node.js, Angular, and PostgreSQL',
                'Managed AWS infrastructure (API Gateway, Lambda, S3, RDS) for scalable, reliable EHR software',
            ],
        },
        {
            companyOrProjectName: 'Amazon',
            jobTitle: 'Software Development Engineer Intern',
            location: 'Seattle, WA',
            date: 'May - Aug 2023',
            details: [
                'Designed and implemented an event-driven architecture leveraging AWS Lambda, S3, and DynamoDB to process and analyze products, significantly accelerating clawback efforts across millions of ASINS',
                'Engineered a memory-efficient file reader abstraction in Java, resulting in a 25% increase in data processing speed and improved file type handling',
                'Implemented unit and integration tests, achieving over 90% code coverage and enhancing system reliability',
            ],
        },
        {
            companyOrProjectName: 'Amazon',
            jobTitle: 'Software Development Engineer Intern',
            location: 'Seattle, WA',
            date: 'May - Aug 2022',
            details: [
                'Implemented a scalable, event-driven architecture using AWS services (S3, SQS, Lambda) to process time card modifications, holiday schedules, and vacation requests. Utilized AWS CDK for infrastructure as code',
                'Designed a FIFO queue system with SQS to ensure orderly processing of global hourly pay and time requests, significantly improving data consistency and reducing errors',
                'Automated the parsing and processing of large JSON files, using Python, containing employee data, reducing the workload on data engineers and streamlining global time card management',
            ],
        },
    ];

    return (
        <>
            {workExperience.map((job, index) => (
                <WorkExperience
                    companyOrProjectName={job.companyOrProjectName}
                    jobTitle={job.jobTitle}
                    location={job.location}
                    date={job.date}
                    details={job.details}
                    key={index}
                />
            ))}
        </>
    );
}
