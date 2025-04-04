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
import ChiroHD from './routes/works/chirohd';
import AmazonPt1 from './routes/works/amazon-pt1';
import AmazonPt2 from './routes/works/amazon-pt2';

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
            {
                path: 'work/chirohd',
                Component: ChiroHD,
            },
            {
                path: 'work/amazon-pt1',
                Component: AmazonPt1,
            },
            {
                path: 'work/amazon-pt2',
                Component: AmazonPt2,
            },
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
