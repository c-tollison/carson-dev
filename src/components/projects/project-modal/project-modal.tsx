import Modal from "../../core/modal/modal";
import { ProjectI } from "../projects";
import "./project-modal.css";

export interface ProjectModalProps {
    project: ProjectI;
    closeModal: () => void;
}

export default function ProjectModal({
    project,
    closeModal,
}: ProjectModalProps) {
    return (
        <Modal closeModal={closeModal}>
            <img
                src={project.imgPath}
                alt={project.title}
                className="modalImg"
            />

            {project.repoLink ? (
                <h3>
                    <a href={project.repoLink} target="_blank">
                        {project.title}
                    </a>
                    <svg
                        width="26px"
                        height="26px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            id="Vector"
                            d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                            stroke="#f0f0f0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </h3>
            ) : (
                <h3>{project.title}</h3>
            )}

            <ul>
                {project.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                ))}
            </ul>
        </Modal>
    );
}
