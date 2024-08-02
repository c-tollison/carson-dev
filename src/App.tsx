import "./App.css";
import Hero from "./components/hero/hero";
import NavBar from "./components/nav-bar/nav-bar";
import Projects from "./components/projects/projects";
import Footer from "./components/footer/footer";

function App() {
    return (
        <>
            <NavBar />
            <Hero />
            <Projects />
            <Footer />
        </>
    );
}

export default App;
