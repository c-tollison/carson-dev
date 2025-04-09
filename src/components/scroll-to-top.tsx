import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        const element = document.documentElement || document.body;
        element.scrollTop = 0;
    }, [location]);

    return null;
}
