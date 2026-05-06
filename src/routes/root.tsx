import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';

export default function Root() {
    return (
        <div className='min-h-screen w-screen bg-background px-6 md:px-8 flex justify-center font-body text-foreground transition-colors duration-300 ease-in-out'>
            <div className='max-w-5xl w-full flex flex-col min-h-screen'>
                <main className='flex-grow py-10'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
