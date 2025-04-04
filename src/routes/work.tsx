import { useEffect, useState } from 'react';
import WorkExperience, { WorkExperienceProps } from '../components/work-experience/work-experience';

export default function Work() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const workExperience: WorkExperienceProps[] = [
        {
            companyOrProjectName: 'ChiroHD',
            jobTitle: 'Software Engineer',
            location: 'Remote',
            date: 'Dec 2023 - Present',
            details: [
                'Built an automated system for parsing X12 insurance EOBs and claims using SFTP and AWS Lambda, expediting payment processing for over 900 chiropractic offices',
                'Developed an internal app with AWS (RDS, Lambda, ALB), React, and GitHub Actions to automate environment management and streamline deployments',
                'Utilized Docker to create reproducible, stateless testing environments with pre-seeded data, enabling comprehensive API and end-to-end tests using Jest and Cypress',
                'Implemented Redis caching for user permissions, reducing database lookups and improving response times for authenticated endpoints',
                'Enforced row-level security (RLS) in PostgreSQL to ensure data privacy and maintain HIPAA compliance',
            ],
        },
        {
            companyOrProjectName: 'ChiroHD',
            jobTitle: 'Software Engineer Intern',
            location: 'Remote',
            date: 'Nov 2021 - Dec 2023',
            details: [
                'Engineered healthcare software using TypeScript, Node.js, Angular, and PostgreSQL',
                'Managed AWS infrastructure (API Gateway, Lambda, S3, RDS) to support scalable, reliable EHR functionality',
                'Integrated HIPAA-compliant opt-in/opt-out messaging through Twilio for secure patient communication',
            ],
        },
        {
            companyOrProjectName: 'Amazon',
            jobTitle: 'Software Development Engineer Intern',
            location: 'Seattle, WA',
            date: 'May - Aug 2023',
            details: [
                'Designed and implemented an event-driven architecture using AWS Lambda, S3, and DynamoDB to process and analyze product data, accelerating clawback efforts across millions of ASINs',
                'Developed a memory-efficient file reader abstraction in Java, achieving a 25% increase in data processing speed and improving file type handling',
                'Created thorough unit and integration tests, surpassing 90% code coverage and enhancing system reliability',
            ],
        },
        {
            companyOrProjectName: 'Amazon',
            jobTitle: 'Software Development Engineer Intern',
            location: 'Seattle, WA',
            date: 'May - Aug 2022',
            details: [
                'Implemented a scalable, event-driven architecture with AWS (S3, SQS, Lambda) and AWS CDK for Infrastructure as Code to process time card modifications, holiday schedules, and vacation requests',
                'Designed a FIFO queue system with SQS to ensure orderly processing of global hourly pay and time requests, improving data consistency and minimizing errors',
                'Automated the parsing and processing of large JSON files in Python to streamline global time card management and reduce data engineering workload',
            ],
        },
    ];

    return (
        <div className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
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
        </div>
    );
}
