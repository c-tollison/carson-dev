import "./work-experience.css";

export interface WorkExperienceProps {
    companyOrProjectName: string;
    jobTitle: string;
    location: string;
    date: string;
    details: string[];
}

export default function WorkExperience({
    companyOrProjectName,
    jobTitle,
    location,
    date,
    details,
}: WorkExperienceProps) {
    return (
        <div key={companyOrProjectName} className="experience-item">
            <div className="experience-header">
                <h3>{companyOrProjectName}</h3>
                <p className="job-title">{jobTitle}</p>
                <p className="location-date">
                    <span>{location}</span>
                    <span>{date}</span>
                </p>
            </div>
            <ul>
                {details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                ))}
            </ul>
        </div>
    );
}
