import { useState } from "react";
import "./nav-bar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
    const [sideNavBar, setSideNavBar] = useState(false);

    function showSideNavBar() {
        document.body.style.overflow = "hidden";
        setSideNavBar(true);
    }

    function hideSideNavBar() {
        document.body.style.overflow = "auto";
        setSideNavBar(false);
    }

    return (
        <header>
            <nav className="navbar">
                <h1>
                    <Link to={"/"}>
                        Carson<span className="accent">-dev</span>
                    </Link>
                </h1>
                <ul className="navbar-buttons">
                    <li className="hide-on-mobile">
                        <Link to={"experience"}>Experience</Link>
                    </li>
                    <li className="hide-on-mobile">
                        <Link to={"articles"}>Articles</Link>
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
                    <ul
                        className="side-navbar-buttons"
                        onClick={hideSideNavBar}
                    >
                        <svg
                            onClick={hideSideNavBar}
                            xmlns="http://www.w3.org/2000/svg"
                            height="26px"
                            viewBox="0 -960 960 960"
                            width="26px"
                            fill="#f0f0f0"
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                        <Link to={"experience"} className="link">
                            <li>Experience</li>
                        </Link>
                        <Link to={"articles"} className="link">
                            <li>Articles</li>
                        </Link>
                    </ul>
                )}
            </nav>
        </header>
    );
}
