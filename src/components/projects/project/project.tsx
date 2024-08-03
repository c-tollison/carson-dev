import "./project.css";

export interface ProjectProps {
    title: string;
    imgPath: string;
    openModal: () => void;
}

export default function Project({ title, imgPath, openModal }: ProjectProps) {
    return (
        <div className="projectHolder" onClick={openModal}>
            <img src={imgPath} alt={title} />
            <h2>{title}</h2>
        </div>
    );
}
