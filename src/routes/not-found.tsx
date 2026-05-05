import { Link } from 'react-router-dom';
import PageWrapper from '../components/page-wrapper';

export default function NotFound() {
    return (
        <PageWrapper>
            <div className='flex flex-col items-center justify-center text-center py-24 gap-6'>
                <p className='font-mono text-primary text-sm tracking-widest opacity-70'>404 — NOT FOUND</p>
                <h1 className='font-display text-4xl md:text-5xl font-bold tracking-tight'>Nothing here.</h1>
                <p className='text-[15px] text-muted-foreground max-w-md leading-relaxed'>
                    The page you're looking for doesn't exist, or it moved somewhere I forgot about.
                </p>
                <Link
                    to='/'
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity mt-2'
                >
                    Back to home
                </Link>
            </div>
        </PageWrapper>
    );
}
