import { LogCardProps } from '../../components/log/log-card';

import MarkdownToBlogPosts from './markdown-to-devlog';
import PaginationWithCtes from './pagination-with-ctes';
import MastraWorkflows from './mastra-workflows';
import PosthogForMastra from './posthog-mastra';

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
    {
        title: 'Pagination with CTEs',
        date: 'Apr 17, 2026',
        route: 'pagination-with-ctes',
        component: PaginationWithCtes,
        topics: ['SQL', 'Postgres', 'Performance'],
    },
    {
        title: 'Mastra Workflows',
        date: 'May 3, 2026',
        route: 'mastra-workflows',
        component: MastraWorkflows,
        topics: ['Mastra', 'AI', 'Workflows', 'TypeScript'],
    },
    {
        title: 'PostHog for Mastra',
        date: 'May 5, 2026',
        route: 'posthog-mastra',
        component: PosthogForMastra,
        topics: ['PostHog', 'Mastra', 'Observability', 'AI'],
    },
];

export default logs;
