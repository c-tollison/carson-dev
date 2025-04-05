import WorkPage from '../../components/work-page';

export default function ChiroHD() {
    const points: string[] = [
        `Engineered an X12 insurance EOB parser using SFTP and AWS Lambda, accelerating billing for
         1,000+ chiropractic offices`,
        `Developed a double-entry accounting system at the line-item level, providing detailed
         financial insights for enhanced practice management`,
        `Managed fully serverless AWS architecture serving millions of daily customer interactions,
         leveraging API Gateway, Lambda, S3, and RDS to ensure scalability and resilience`,
        `Built an internal application with AWS (RDS, Lambda, ALB), React, and GitHub Actions to  
         automate environment management and streamline deployments`,
        `Integrated HIPAA-compliant Twilio messaging with opt in/out functionality to secure patient
         communications`,
        ` Implemented PostgreSQL row-level security to protect data privacy, ensure HIPAA compliance, 
          and address vulnerabilities`,
    ];

    return (
        <WorkPage
            company={'ChiroHD'}
            title={'Software Engineer'}
            dates={'Nov 2021 - Present'}
            location={'Remote/Greenville,SC'}
            imageUrl={'./../chirohd_logo.png'}
            points={points}
        >
            <p>Test</p>
        </WorkPage>
    );
}
