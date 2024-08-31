import WorkExperience, { WorkExperienceProps } from '../../components/work-experience/work-experience';
import './experience.css';

export default function Experience() {
    const workExperience: WorkExperienceProps[] = [
        {
            companyOrProjectName: 'ChiroHD',
            jobTitle: 'Software Engineer',
            location: 'Remote',
            date: 'Dec 2023 - Present',
            details: [
                'Developed an automated SFTP and S3-based system to parse insurance EOBs (X12), speeding up payment processing for 800+ chiropractic offices',
                'Built a full-stack app for managing AWS environments using RDS, Lambda, React, and Terraform, improving deployment efficiency',
                'Implemented E2E testing with CircleCi and Cypress, reducing manual testing and accelerating release cycles',
                'Utilized Docker to create reproducible, stateless testing environments with seed databases',
                'Integrated Twilio for HIPAA-compliant messaging with patient opt-in features',
            ],
        },
        {
            companyOrProjectName: 'Amazon',
            jobTitle: 'Software Development Engineer Intern',
            location: 'Seattle, WA',
            date: 'May - Aug 2023',
            details: [
                "Contributed to Automated Profitability Management team's application, optimizing profitability for millions of ASINs",
                'Architected an event-driven solution with AWS Lambda, S3, and DynamoDB, expediting clawback recommendations for millions of ASINs',
                'Created memory-efficient file reader abstraction in Java, increasing processing speed by 25%',
            ],
        },
        {
            companyOrProjectName: 'Amazon',
            jobTitle: 'Software Development Engineer Intern',
            location: 'Seattle, WA',
            date: 'May - Aug 2022',
            details: [
                'Developed file ingestion component for automating hourly associate scheduling',
                'Implemented event-driven solution with AWS Lambda, SQS, and S3, utilizing AWS CDK for consistent deployments',
                'Automated parsing of large JSON files using Python, eliminating manual scheduling tasks',
            ],
        },
        {
            companyOrProjectName: 'ChiroHD',
            jobTitle: 'Software Engineer Intern',
            location: 'Remote',
            date: 'Nov 2021 - Dec 2023',
            details: [
                'Contributed to a paperwork builder for efficient patient data collection via system triggers and email',
                'Developed healthcare management software with TypeScript, Node.js, Angular, and PostgreSQL',
                'Maintained AWS infrastructure (API Gateway, Lambda, S3, RDS) for scalable healthcare apps',
            ],
        },
    ];

    return (
        <div className='experience-container'>
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
