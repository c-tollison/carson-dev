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
        description: `Full-stack platform for a construction company managing bidding, workflows, and inventory. Python API on Lambda with Postgres. Auto-generates bid documents and distributes them as PDFs.`,
        topics: ['Python', 'REST API', 'PostgreSQL', 'AWS Lambda', 'React'],
        thumbnail: 'eagle-dashboard.webp',
    },
    {
        title: 'DSA Randomizer',
        description: `Go CLI that keeps me honest with coding problems using spaced repetition. Problems you haven't touched in a while get weighted higher. Local SQLite storage with clean separation between CLI, logic, and data layers.`,
        topics: ['Go', 'SQLite', 'CLI', 'Data Structures'],
        githubLink: 'https://github.com/c-tollison/dsa-randomizer',
        thumbnail: 'dsa-randomizer.webp',
    },
    {
        title: 'Unbeatable AI',
        description: `Tic-Tac-Toe where you literally cannot win. The AI uses minimax to evaluate every possible game state and always picks the best move. Built to get a better feel for recursion and game theory.`,
        topics: ['JavaScript', 'Algorithms', 'Game Theory'],
        link: 'https://c-tollison.github.io/unbeatable-ai/',
        githubLink: 'https://github.com/c-tollison/unbeatable-ai',
        thumbnail: 'unbeatable-ai.webp',
    },
];

export default projects;
