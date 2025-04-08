import { Outlet } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';

export default function Root() {
    return (
        <div className='min-h-screen w-full bg-background px-6 flex justify-center text-foreground transition-all duration-300 ease-in-out'>
            <div className='max-w-5xl w-full flex flex-col gap-4 min-h-screen'>
                <NavBar />
                {/* Wrap the outlet in a <main> tag with flex-grow */}
                <main className='flex-grow'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
