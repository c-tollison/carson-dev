import WorkExperience, {
    WorkExperienceProps,
} from "../../components/work-experience/work-experience";
import "./experience.css";

export default function Experience() {
    const workExperience: WorkExperienceProps[] = [
        {
            companyOrProjectName: "ChiroHD",
            jobTitle: "Software Engineer",
            location: "Remote",
            date: "Nov '21 - Present",
            details: [
                "Enhanced EOB processing using SFTP file servers and S3 triggers, reducing manual entry by 80% and expediting payment processing. Bringing insurance processing to over 700 offices.",
                "Led integration of end-to-end testing, cutting manual testing by 50% and accelerating release cycles by 30% using CircleCi for CI/CD and Cypress for testing.",
                "Integrated Twilio opt-in messaging and developed a robust texting environment, doubling testing efficiency, ensuring government compliance, and streamlining communication.",
                "Developed healthcare management software using TypeScript, Node.js, Angular, and PostgreSQL.",
                "Implemented and maintained AWS infrastructure, leveraging services like Lambda, S3, and RDS.",
            ],
        },
        {
            companyOrProjectName: "Amazon",
            jobTitle: "Software Development Engineer Intern",
            location: "Seattle, WA",
            date: "May - Aug '22 & '23",
            details: [
                "Engineered scalable automation solutions using Python and Java, enhancing workflow efficiency by 40% and improving system reusability across multiple teams.",
                "Utilized AWS services (Lambda, SQS, DynamoDB) to build and optimize a real-time data processing project, ensuring consistent deployments with AWS CDK.",
                "Designed memory-efficient file reader abstractions, eliminating manual entry errors and increasing processing speed by 25%.",
            ],
        },
    ];

    const projectExperience: WorkExperienceProps[] = [
        {
            companyOrProjectName:
                "Bid Creator Web App - Eagle Building Company",
            jobTitle: "Full-stack Developer, Scrum Manager",
            location: "Clemson, SC",
            date: "Aug '23 - Dec '23",
            details: [
                "Led front-end development and Scrum processes for a 5-person team, designing the UI with Figma.",
                "Developed a web app for creating contracting bid templates using React and Python/Flask, streamlining bid creation by 40%.",
                "Deployed front-end on AWS Elastic Beanstalk and back-end serverless via Lambda and Zappa, with secure login through AWS Cognito.",
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
