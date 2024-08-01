import { useEffect, useState } from "react";
import "./App.css";
import Hero from "./components/hero/hero";
import NavBar from "./components/nav-bar/nav-bar";
import Projects from "./components/projects/projects";
import Footer from "./components/footer/footer";

function App() {
    const [stopScroll, setStopScroll] = useState(false);

    function handleScroll() {
        setStopScroll(!stopScroll);
    }

    useEffect(() => {
        if (stopScroll) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [stopScroll]);

    return (
        <>
            <NavBar handleScroll={handleScroll} />
            <Hero />
            <Projects />
            <Footer />
        </>
    );
}

export default App;
