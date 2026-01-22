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
        description: `Developed full-stack construction management platform with features for bidding, workflow tracking, and inventory control. Built RESTful Python API on AWS Lambda with PostgreSQL (RDS), supporting complex document workflows. Implemented automated bid document generation with persistent PDF storage and distribution features.`,
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
