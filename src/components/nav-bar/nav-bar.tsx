import { useState } from "react";
import "./nav-bar.css";

export default function NavBar() {
    const [sideNavBar, setSideNavBar] = useState(false);

    function showSideNavBar() {
        setSideNavBar(!sideNavBar);
    }

    return (
        <header>
            <nav className="navbar">
                <h1>
                    <a href="#">
                        Carson<span className="accent">-dev</span>
                    </a>
                </h1>
                <ul className="navbar-buttons">
                    <li className="hide-on-mobile">
                        <a href="#">Experience</a>
                    </li>
                    <li className="hide-on-mobile">
                        <a href="#">Contact</a>
                    </li>
                    <li className="hide-on-mobile">
                        <a href="#">Articles</a>
                    </li>
                    <li className="menu-button" onClick={showSideNavBar}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="26px"
                            viewBox="0 -960 960 960"
                            width="26px"
                            fill="#f0f0f0"
                        >
                            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                        </svg>
                    </li>
                </ul>
                {sideNavBar && (
                    <ul className="side-navbar-buttons">
                        <svg
                            onClick={showSideNavBar}
                            xmlns="http://www.w3.org/2000/svg"
                            height="26px"
                            viewBox="0 -960 960 960"
                            width="26px"
                            fill="#f0f0f0"
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                        <li>
                            <a href="#">Experience</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                        <li>
                            <a href="#">Articles</a>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}
