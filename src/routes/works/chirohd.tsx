import { Link } from 'react-router-dom';
import PageWrapper from '../../components/page-wrapper';

export default function ChiroHD() {
    return (
        <PageWrapper>
            <div className='py-10 flex flex-row justify-between items-center'>
                <div>
                    <h1 className='text-5xl font-bold text-primary'>ChiroHD</h1>
                    <h2 className='text-2xl font-semibold'>Software Engineer</h2>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 text-muted-foreground'>
                        <h3>Nov 2021 - Present</h3>
                        <h4>Remote/Greenville</h4>
                    </div>
                </div>
                <div className='hidden md:block w-20 h-20 flex-shrink-0'>
                    <img
                        src='./../chirohd_logo.png'
                        alt='Amazon'
                        className='w-full h-full object-contain rounded-md'
                    />
                </div>
            </div>

            <section>
                <h3 className='text-xl font-semibold border-b border-border pb-4 mb-4'>Quick Points</h3>
                <ul className='pl-4 list-disc list-outside mb-4'>
                    <li>
                        Engineered an X12 insurance EOB parser using SFTP and AWS Lambda, accelerating billing for
                        1,000+ chiropractic offices
                    </li>
                    <li>
                        Developed a double-entry accounting system at the line-item level, providing detailed financial
                        insights for enhanced practice management
                    </li>
                    <li>
                        Managed fully serverless AWS architecture serving millions of daily customer interactions,
                        leveraging API Gateway, Lambda, S3, and RDS to ensure scalability and resilience
                    </li>
                    <li>
                        Built an internal application with AWS (RDS, Lambda, ALB), React, and GitHub Actions to automate
                        environment management and streamline deployments
                    </li>
                    <li>
                        Integrated HIPAA-compliant Twilio messaging with opt in/out functionality to secure patient
                        communications
                    </li>
                    <li>
                        Implemented PostgreSQL row-level security to protect data privacy, ensure HIPAA compliance, and
                        address vulnerabilities
                    </li>
                </ul>
            </section>

            <section className='pb-4 mb-4'>
                <h3 className='text-xl font-semibold border-b border-border pb-4 mb-4'>My Experience</h3>
                <div className='leading-relaxed flex flex-col gap-4'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                        pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
                        sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
                        nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                        sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>
                </div>
            </section>
            <Link
                to='/work'
                className='hover:text-primary text-l transition-opacity'
            >
                <span>&#8592;</span> Back
            </Link>
        </PageWrapper>
    );
}
