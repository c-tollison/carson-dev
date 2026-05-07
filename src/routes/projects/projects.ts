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
        title: 'Chrono',
        description: `AI inbox that turns Instagram DMs into a structured booking pipeline. Ingests messages via Instagram Graph API webhooks and runs each thread through a Gemini pipeline that classifies intent, extracts pricing and booking details into typed lead cards, and drafts replies seeded with live availability from the Google Calendar API. Confirmed bookings collect a Stripe deposit and write back to the calendar. Node/TypeScript on AWS Lambda, Postgres on RDS.`,
        topics: ['TypeScript', 'AWS Lambda', 'PostgreSQL', 'Stripe', 'Instagram Graph API'],
        thumbnail: 'chrono.jpeg',
    },
    {
        title: 'BidForge',
        description: `Operations platform that replaced a spreadsheet-and-tribal-knowledge bidding workflow for a construction company. The team configures reusable bid templates once, then the platform auto-fills line items from live inventory pricing, versions every revision, and converts approved bids directly into client invoices. Next.js + Tailwind frontend, Python API on Lambda behind API Gateway, Postgres on RDS, documents versioned in S3.`,
        topics: ['Python', 'Next.js', 'PostgreSQL', 'AWS Lambda', 'S3'],
        thumbnail: 'eagle-dashboard.webp',
    },
    {
        title: 'DSA Randomizer',
        description: `Go CLI that picks my next algorithm problem using spaced-repetition weighting. Anything I haven't touched in a while bubbles to the top. Local SQLite store with clean separation between the CLI, scheduling logic, and persistence layers.`,
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
        embeddable: true,
    },
];

export default projects;
