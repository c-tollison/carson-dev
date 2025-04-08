import { JournalCardProps } from '../../components/journal-card';
import WebServerInGo from './web-server-in-go';

interface Journal extends JournalCardProps {
    component: () => JSX.Element;
}

const journals: Journal[] = [
    {
        title: 'Web Server with Go',
        date: 'March 31st, 2025',
        route: 'web-server-in-go',
        component: WebServerInGo,
        topics: ['Go'],
    },
    {
        title: 'Containerized Go server on AWS',
        date: 'April 1st, 2025',
        route: 'journal-1',
        component: WebServerInGo,
        topics: ['AWS', 'Docker', 'Go'],
    },
    {
        title: 'Concurrency Patterns in Go',
        date: 'April 2nd, 2025',
        route: 'journal-1',
        component: WebServerInGo,
        topics: ['react', 'javascript', 'css'],
    },
    {
        title: 'Real-Time Applications with Go and WebSockets',
        date: 'April 3rd, 2025',
        route: 'journal-1',
        component: WebServerInGo,
        topics: ['react', 'javascript', 'css'],
    },
    {
        title: 'Webserver with Gin ',
        date: 'April 4th, 2025',
        route: 'journal-1',
        component: WebServerInGo,
        topics: ['react', 'javascript', 'css'],
    },
];

export default journals;
