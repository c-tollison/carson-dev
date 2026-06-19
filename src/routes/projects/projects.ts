export interface Project {
    title: string;
    description: string;
    thumbnail: string;
    link?: string;
    githubLink?: string;
    topics: string[];
    embeddable?: boolean;
}

const projects: Project[] = [
    {
        title: 'BidForge',
        description: `Web app that replaced a spreadsheet bidding workflow for a construction company. The team configures reusable bid templates once, then the platform auto-fills line items from live inventory pricing, versions every document, and converts approved bids directly into client invoices. Next.js + Tailwind frontend, Python API on Lambda behind API Gateway, Postgres on RDS.`,
        topics: ['Python', 'Next.js', 'PostgreSQL', 'AWS Lambda', 'S3'],
        thumbnail: 'eagle-dashboard.webp',
    },
    {
        title: 'DSA Randomizer',
        description: `Go CLI that picks my next algorithm problem to practice using spaced-repetition weighting. Anything I haven't touched in a while bubbles to the top.`,
        topics: ['Go', 'SQLite', 'CLI', 'Data Structures'],
        githubLink: 'https://github.com/c-tollison/dsa-randomizer',
        thumbnail: 'dsa-randomizer.webp',
    },
    {
        title: 'Unbeatable AI',
        description: `Tic-Tac-Toe where the player cannot win. I built the AI using the minimax algo. Computah always picks the best move. A small project to get a better feel for recursion and game theory.`,
        topics: ['JavaScript', 'Algorithms', 'Game Theory'],
        link: 'https://c-tollison.github.io/unbeatable-ai/',
        githubLink: 'https://github.com/c-tollison/unbeatable-ai',
        thumbnail: 'unbeatable-ai.webp',
        embeddable: true,
    },
];

export default projects;
