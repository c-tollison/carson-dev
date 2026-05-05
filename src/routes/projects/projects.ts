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
        description: `Full-stack platform I built for a construction company to manage bidding, workflows, and inventory. Python API on Lambda with Postgres, React frontend. Auto-generates bid documents and distributes them as PDFs. Private, no public access.`,
        topics: ['Python', 'REST API', 'PostgreSQL', 'AWS Lambda', 'React'],
        thumbnail: 'eagle-dashboard.webp',
    },
    {
        title: 'DSA Randomizer',
        description: `Go CLI I built to keep myself honest with coding problems using spaced repetition. Problems I haven't touched in a while get weighted higher. Local SQLite storage with clean separation between CLI, logic, and data layers.`,
        topics: ['Go', 'SQLite', 'CLI', 'Data Structures'],
        githubLink: 'https://github.com/c-tollison/dsa-randomizer',
        thumbnail: 'dsa-randomizer.webp',
    },
    {
        title: 'Unbeatable AI',
        description: `Tic-Tac-Toe where the player literally cannot win. I built the AI on minimax. It evaluates every possible game state and always picks the best move. A small project to get a better feel for recursion and game theory.`,
        topics: ['JavaScript', 'Algorithms', 'Game Theory'],
        link: 'https://c-tollison.github.io/unbeatable-ai/',
        githubLink: 'https://github.com/c-tollison/unbeatable-ai',
        thumbnail: 'unbeatable-ai.webp',
    },
];

export default projects;
