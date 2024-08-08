import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./routes/dashboard/dashboard";
import Experience from "./routes/experience/experience";
import Root from "./routes/root";
import Contact from "./routes/contact/contact";
import Articles from "./routes/articles/articles";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Dashboard,
            },
            {
                path: "experience",
                Component: Experience,
            },
            {
                path: "contact",
                Component: Contact,
            },
            {
                path: "articles",
                Component: Articles,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
