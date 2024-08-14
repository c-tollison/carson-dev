import WorkExperience, {
    WorkExperienceProps,
} from "../../components/work-experience/work-experience";
import "./experience.css";

export default function Experience() {
    const workExperience = [
        {
            companyOrProjectName: "ChiroHD",
            jobTitle: "Software Engineer",
            location: "Remote",
            date: "Dec 2023 - Present",
            details: [
                "Engineered an SFTP and S3-based EOB process, reducing manual entry by 80% and accelerating payment processing for 700+ offices",
                "Implemented end-to-end testing with CircleCI and Cypress, cutting manual testing by 50% and speeding up release cycles by 30%",
                "Developed repeatable database cloning system using PostgreSQL and bash scripts for efficient testing",
                "Integrated Twilio opt-in messaging, doubling testing efficiency and ensuring compliance",
            ],
        },
        {
            companyOrProjectName: "Amazon",
            jobTitle: "Software Development Engineer Intern",
            location: "Seattle, WA",
            date: "May - Aug 2023",
            details: [
                "Contributed to Automated Profitability Management team's application, optimizing profitability for millions of ASINs",
                "Architected an event-driven solution with AWS Lambda, S3, and DynamoDB, expediting clawback recommendations for millions of ASINs",
                "Created memory-efficient file reader abstraction in Java, increasing processing speed by 25%",
            ],
        },
        {
            companyOrProjectName: "Amazon",
            jobTitle: "Software Development Engineer Intern",
            location: "Seattle, WA",
            date: "May - Aug 2022",
            details: [
                "Developed file ingestion component for automating hourly associate scheduling",
                "Implemented event-driven solution with AWS Lambda, SQS, and S3, utilizing AWS CDK for consistent deployments",
                "Automated parsing of large JSON files using Python, eliminating manual scheduling tasks",
            ],
        },
        {
            companyOrProjectName: "ChiroHD",
            jobTitle: "Software Engineer Intern",
            location: "Remote",
            date: "Nov 2021 - Dec 2023",
            details: [
                "Contributed to a custom paperwork builder for personalized form distribution via system triggers and email, collecting patient data efficiently",
                "Developed healthcare management software using TypeScript, Node.js, Angular, and PostgreSQL",
                "Implemented and maintained AWS infrastructure (API Gateway, Lambda, S3, RDS) for scalable healthcare applications",
            ],
        },
    ];

    const projectExperience = [
        {
            companyOrProjectName: "Bid Creator Web App",
            jobTitle: "Full-stack Developer, Scrum Manager",
            location: "Clemson, SC",
            date: "Aug 2023 - Dec 2023",
            details: [
                "Led 5-person team in front-end development and Scrum management, designing UI in Figma",
                "Built React/Python Flask web app for contracting bid templates and inventory management, reducing bid creation time by 70%",
                "Deployed on AWS (Elastic Beanstalk, Lambda, Zappa) with Cognito authentication, optimizing for low infrastructure costs",
            ],
        },
    ];

    return (
        <div className="experience-container">
            <h2>Work Experience</h2>
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

            <h2>Project Experience</h2>
            {projectExperience.map((project, index) => (
                <WorkExperience
                    companyOrProjectName={project.companyOrProjectName}
                    jobTitle={project.jobTitle}
                    location={project.location}
                    date={project.date}
                    details={project.details}
                    key={index}
                />
            ))}
        </div>
    );
}
