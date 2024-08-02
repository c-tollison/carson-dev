import Project from "./project/project";
import "./projects.css";

export default function Projects() {
    const projects = [
        {
            title: "Eagle Building Company",
            imgPath: "eagle-bid.png",
        },
        {
            title: "Unbeatable AI",
            imgPath: "unbeatable-ai.png",
        },
    ];

    return (
        <>
            <div className="carousel">
                {projects.map((project, index) => (
                    <Project
                        title={project.title}
                        imgPath={project.imgPath}
                        key={index}
                    />
                ))}
            </div>
        </>
    );
}
