import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './routes/dashboard/dashboard';
import Work from './routes/work/work';
import Root from './routes/root';
import Journal from './routes/journal/journal';
import { ColorThemeProvider } from './components/core/providers/color-mode-provider/color-mode-provider';
import { NavbarProvider } from './components/core/providers/navbar-provider/navbar-provider';

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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ColorThemeProvider>
            <NavbarProvider>
                <RouterProvider router={router} />
            </NavbarProvider>
        </ColorThemeProvider>
    </React.StrictMode>,
);
