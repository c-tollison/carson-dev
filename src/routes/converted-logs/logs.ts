import { LogCardProps } from '../../components/log/log-card';

import MarkdownToBlogPosts from './markdown-to-devlog';

interface Log extends LogCardProps {
    component: () => JSX.Element;
}

const logs: Log[] = [
    {
        title: 'Markdown to Blog Posts',
        date: 'Mar 9, 2026',
        route: 'markdown-to-devlog',
        component: MarkdownToBlogPosts,
        topics: ['AST', 'Markdown', 'Tooling'],
    },
];

export default logs;
