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
        description: `The application was designed for a Washington-based construction company to manage projects and bids, featuring customizable bid forms that generate and export bids as PDFs. It also includes an inventory management system for tracking materials. Built with React and Tailwind CSS for the frontend and a Python backend deployed on AWS Lambda using Zappa, it utilizes AWS Elastic Beanstalk and AWS RDS with PostgreSQL, and was developed as a senior capstone project at Clemson University for a construction industry client.`,
        topics: ['Typescript', 'React', 'Python', 'AWS'],
        thumbnail: 'eagle-dashboard.png',
    },
    {
        title: 'Unbeatable AI',
        description: `Tic-Tac-Toe web app with a twist — its computer opponent is powered by the minimax algorithm, ensuring each move is calculated for optimal play. Developed using HTML, CSS, and JavaScript, the app serves as a demonstration of artificial intelligence in action.`,
        topics: ['HTML', 'CSS', 'Javascript', 'Algorithms'],
        link: 'https://c-tollison.github.io/unbeatable-ai/',
        thumbnail: 'unbeatable-ai.png',
    },
    {
        title: 'DSA Randomizer',
        description: `This CLI tool is a side project designed to both familiarize me with new concepts in Go and serve as a personalized tracker for code challenge problems. Users can input the challenges they've solved, and each day the app randomly picks one to review — keeping you sharp on a variety of concepts. It uses Go and an SQLite database, this project offers a practical way to continuously work on DSA skills.`,
        topics: ['Go', 'Sqlite', 'Algorithms', 'Data structures'],
        link: 'https://github.com/c-tollison/dsa-randomizer',
        thumbnail: 'dsa-randomizer.png',
    },
];

export default projects;
