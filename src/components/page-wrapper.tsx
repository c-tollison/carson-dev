import ScrollToTop from './scroll-to-top';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ScrollToTop />
            {children}
        </>
    );
}
