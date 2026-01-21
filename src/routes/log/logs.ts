import { LogCardProps } from '../../components/log/log-card';

interface Log extends LogCardProps {
    component: () => JSX.Element;
}

const logs: Log[] = [
    // {
    //     title: 'Building a Web Server with Go',
    //     date: 'Jan 15th, 2026',
    //     route: 'web-server-in-go',
    //     component: PlaceholderComponent,
    //     topics: ['Go', 'Backend', 'HTTP'],
    //     thumbnail: 'go-gopher.png',
    // },
];

export default logs;
