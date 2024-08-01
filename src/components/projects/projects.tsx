import Project, { ProjectProps } from "./project/project";
import "./projects.css";

export default function Projects() {
    const projects: ProjectProps[] = [
        { title: "Giyu Tomioka", imgPath: "giyu.jpg" },
        { title: "Mitsuri Kanroji", imgPath: "mitsuri.jpg" },
        { title: "Obanai Iguro", imgPath: "obanai.jpg" },
        { title: "Sanemi Shinazugawa", imgPath: "sanemi.jpg" },
    ];

    return (
        <section className="carousel-wrapper">
            <div className="carousel">
                {projects.map((project, index) => (
                    <Project
                        title={project.title}
                        imgPath={project.imgPath}
                        key={index}
                    />
                ))}
            </div>
        </section>
    );
}
