import { useState, useEffect } from 'react';
import Hero from '../components/hero';

function Dashboard() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Hero />
        </div>
    );
}

export default Dashboard;
