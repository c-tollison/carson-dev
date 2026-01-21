export interface Project {
    title: string;
    description: string;
    thumbnail: string;
    link?: string;
    topics: string[];
}

const projects: Project[] = [
    {
        title: 'Eagle Building Company',
        description: `A project management system for a construction company in Washington. Handles bids, projects, and inventory tracking. The bid forms are customizable and export directly to PDF. Built with React and Tailwind CSS on the frontend, Python backend deployed on AWS Lambda with Zappa. Uses AWS Elastic Beanstalk and RDS with PostgreSQL. This was my senior capstone project at Clemson University, built for a real construction client.`,
        topics: ['Typescript', 'React', 'Python', 'AWS'],
        thumbnail: 'eagle-dashboard.png',
    },
    {
        title: 'Unbeatable AI',
        description: `A Tic-Tac-Toe game where the computer opponent uses the minimax algorithm to play perfectly every time. Built with HTML, CSS, and JavaScript as a way to explore how game theory algorithms work in practice.`,
        topics: ['HTML', 'CSS', 'Javascript', 'Algorithms'],
        link: 'https://c-tollison.github.io/unbeatable-ai/',
        thumbnail: 'unbeatable-ai.png',
    },
    {
        title: 'DSA Randomizer',
        description: `A CLI tool I built while learning Go to track coding challenge problems I've solved. You log the problems you complete, and each day it randomly selects one to review. Keeps problem solving skills fresh across different topics. Built with Go and SQLite.`,
        topics: ['Go', 'Sqlite', 'Algorithms', 'Data structures'],
        link: 'https://github.com/c-tollison/dsa-randomizer',
        thumbnail: 'dsa-randomizer.png',
    },
];

export default projects;
