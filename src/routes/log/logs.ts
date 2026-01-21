import { LogCardProps } from '../../components/log/log-card';

interface Log extends LogCardProps {
    component: () => JSX.Element;
}
// const logs: Log[] = [
//     {
//         title: 'Web Server with Go',
//         date: 'Apr 8th, 2025',
//         route: 'web-server-in-go',
//         component: WebServerInGo,
//         topics: ['Go'],
//         thumbnail: 'go-gopher.png',
//     },
// ];
const logs: Log[] = [];

export default logs;
