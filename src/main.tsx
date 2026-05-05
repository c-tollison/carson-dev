import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './routes/dashboard';
import Root from './routes/root';
import Log from './routes/log';
import NotFound from './routes/not-found';
import logs from './routes/converted-logs/logs';

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
                path: 'log',
                Component: Log,
            },
            ...logChildRoutes,
            {
                path: '*',
                Component: NotFound,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
