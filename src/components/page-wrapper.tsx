import { useEffect, useState } from 'react';
import ScrollToTop from './scroll-to-top';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ScrollToTop />
            {children}
        </div>
    );
}
