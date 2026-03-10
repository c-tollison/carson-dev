import { LogCardProps } from '../../components/log/log-card';

import MarkdownToBlogPosts from './markdown-to-devlog';

interface Log extends LogCardProps {
    component: () => JSX.Element;
}

const logs: Log[] = [
    {
        title: 'Markdown to blog posts',
        date: 'Mar 8, 2026',
        route: 'markdown-to-devlog',
        component: MarkdownToBlogPosts,
        topics: ['AST', 'Markdown', 'Idk random'],
    },
];

export default logs;
