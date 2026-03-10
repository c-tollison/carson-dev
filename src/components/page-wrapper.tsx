import { useEffect, useState } from 'react';
import ScrollToTop from './scroll-to-top';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div
            className={`transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
        >
            <ScrollToTop />
            {children}
        </div>
    );
}
