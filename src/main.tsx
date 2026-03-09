import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './routes/dashboard';
import Work from './routes/work';
import Root from './routes/root';
import Log from './routes/log';
import { ColorThemeProvider } from './components/core/providers/color-mode-provider/color-mode-provider';
import Projects from './routes/projects';
import works from './routes/works/works';
import logs from './routes/converted-logs/logs';

const workChildRoutes = works.map((work) => ({
    path: `work/${work.route}`,
    Component: work.component,
}));

const logChildRoutes = logs.map((log) => ({
    path: `log/${log.route}`,
    Component: log.component,
}));

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Dashboard,
            },
            {
                path: 'work',
                Component: Work,
            },
            {
                path: 'log',
                Component: Log,
            },
            {
                path: 'projects',
                Component: Projects,
            },
            ...workChildRoutes,
            ...logChildRoutes,
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ColorThemeProvider>
            <RouterProvider router={router} />
        </ColorThemeProvider>
    </React.StrictMode>,
);
