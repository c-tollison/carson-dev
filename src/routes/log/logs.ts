import { LogCardProps } from '../../components/log/log-card';
import WebServerInGo from './web-server-in-go';

interface Log extends LogCardProps {
    component: () => JSX.Element;
}

const logs: Log[] = [
    {
        title: 'Web Server with Go',
        date: 'Apr 8th, 2025',
        route: 'web-server-in-go',
        component: WebServerInGo,
        topics: ['Go'],
        thumbnail: 'go-gopher.png',
    },
];

export default logs;
