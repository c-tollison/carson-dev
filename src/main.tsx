import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './routes/dashboard';
import Work from './routes/work';
import Root from './routes/root';
import Journal from './routes/journal';
import { ColorThemeProvider } from './components/core/providers/color-mode-provider/color-mode-provider';
import Projects from './routes/projects';
import works from './routes/works/works';
import journals from './routes/journals/journals';

const workChildRoutes = works.map((work) => ({
    path: `work/${work.route}`,
    Component: work.component,
}));

const journalChildRoutes = journals.map((journal) => ({
    path: `journal/${journal.route}`,
    Component: journal.component,
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
                path: 'journal',
                Component: Journal,
            },
            {
                path: 'projects',
                Component: Projects,
            },
            ...workChildRoutes,
            ...journalChildRoutes,
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
