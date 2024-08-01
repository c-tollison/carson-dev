import "./project.css";

export interface ProjectProps {
    title: string;
    imgPath: string;
}

export default function Project({ title, imgPath }: ProjectProps) {
    return (
        <div className="projectHolder">
            <img src={imgPath} alt={title} />
            <h2>{title}</h2>
        </div>
    );
}
