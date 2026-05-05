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
        description: `Full-stack platform I built for a construction company to manage their bidding, workflows, and inventory. The backend is a Python API running on Lambda with PostgreSQL, and it handles things like automatically generating bid documents and distributing them as PDFs.`,
        topics: ['Python', 'REST API', 'PostgreSQL', 'AWS Lambda', 'React'],
        thumbnail: 'eagle-dashboard.webp',
    },
    {
        title: 'DSA Randomizer',
        description: `CLI tool I wrote in Go to keep me honest with coding problems. It uses spaced repetition, so problems you haven't touched in a while get weighted higher. Everything is stored locally in SQLite, and I tried to keep the architecture clean with separate layers for the CLI, logic, and data access.`,
        topics: ['Go', 'SQLite', 'CLI', 'Data Structures'],
        githubLink: 'https://github.com/c-tollison/dsa-randomizer',
        thumbnail: 'dsa-randomizer.webp',
    },
    {
        title: 'Unbeatable AI',
        description: `Tic-Tac-Toe where you literally cannot win. The AI uses the minimax algorithm to evaluate every possible game state and always picks the best move. I built it to get a better feel for recursion and game theory.`,
        topics: ['JavaScript', 'Algorithms', 'Game Theory'],
        link: 'https://c-tollison.github.io/unbeatable-ai/',
        githubLink: 'https://github.com/c-tollison/unbeatable-ai',
        thumbnail: 'unbeatable-ai.webp',
    },
];

export default projects;
