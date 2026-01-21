export interface Project {
    title: string;
    description: string;
    thumbnail: string;
    link?: string;
    githubLink?: string;
    topics: string[];
}

const projects: Project[] = [
    {
        title: 'Eagle Building Company',
        description: `Full-stack project management system built for a construction company in Washington. Features include bid management with customizable forms, project tracking, and inventory management. The backend is a Python REST API deployed on AWS Lambda via Zappa, with PostgreSQL on RDS for data persistence. Frontend built with React and Tailwind CSS. Designed the database schema and API architecture to handle complex bid workflows and PDF generation. Senior capstone project at Clemson University, built for a real client.`,
        topics: ['Python', 'REST API', 'PostgreSQL', 'AWS Lambda', 'React'],
        thumbnail: 'eagle-dashboard.png',
    },
    {
        title: 'DSA Randomizer',
        description: `A CLI tool built in Go for spaced repetition of coding problems. Features a SQLite database for local persistence, command-line interface for logging completed problems, and a randomization algorithm that weighs problems by time since last review. Designed with clean separation between the CLI layer, business logic, and data access layer.`,
        topics: ['Go', 'SQLite', 'CLI', 'Data Structures'],
        githubLink: 'https://github.com/c-tollison/dsa-randomizer',
        thumbnail: 'dsa-randomizer.png',
    },
    {
        title: 'Unbeatable AI',
        description: `Tic-Tac-Toe game with an unbeatable AI opponent powered by the minimax algorithm. The algorithm recursively evaluates all possible game states to select the optimal move, guaranteeing a win or draw. Built to explore game theory and recursive algorithms.`,
        topics: ['JavaScript', 'Algorithms', 'Game Theory'],
        link: 'https://c-tollison.github.io/unbeatable-ai/',
        githubLink: 'https://github.com/c-tollison/unbeatable-ai',
        thumbnail: 'unbeatable-ai.png',
    },
];

export default projects;
