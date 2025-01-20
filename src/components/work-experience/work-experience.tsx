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
        <div
            key={companyOrProjectName}
            className='col-span-full row-auto p-8 flex flex-col gap-4 border bg-card rounded-md border border-border shadow-md transition transform duration-300 ease-in-out'
        >
            <div className='border-b pb-4 border-accent'>
                <h3 className='text-xl font-semibold'>{companyOrProjectName}</h3>
                <p className='text-sm'>{jobTitle}</p>
                <p className='text-sm text-muted-foreground'>
                    <span>{location}</span> • <span>{date}</span>
                </p>
            </div>
            <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
                {details.map((detail, detailIndex) => (
                    <li
                        key={`${jobTitle}-${detailIndex}`}
                        className='text-sm'
                    >
                        {detail}
                    </li>
                ))}
            </ul>
        </div>
    );
}
