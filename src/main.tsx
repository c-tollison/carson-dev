import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './routes/dashboard/dashboard';
import Experience from './routes/experience/experience';
import Root from './routes/root';
import Articles from './routes/articles/articles';
import { ColorThemeProvider } from './components/core/providers/color-mode-provider/color-mode-provider';
import { articles } from './components/Article/articles-json/articles-array';
import { Article } from './components/Article/article';
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
                path: 'experience',
                Component: Experience,
            },
            {
                path: 'articles',
                Component: Articles,
            },
            ...articles.map((article) => ({
                path: `articles/${article.route}`,
                element: <Article article={article} />,
            })),
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
