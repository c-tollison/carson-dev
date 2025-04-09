import { JournalCardProps } from '../../components/journal-card';
import WebServerInGo from './web-server-in-go';

interface Journal extends JournalCardProps {
    component: () => JSX.Element;
}

const journals: Journal[] = [
    {
        title: 'Web Server with Go',
        date: 'Apr 8th, 2025',
        route: 'web-server-in-go',
        component: WebServerInGo,
        topics: ['Go'],
        thumbnail: 'go-gopher.png',
    },
];

export default journals;
