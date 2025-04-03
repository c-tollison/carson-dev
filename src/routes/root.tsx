import { Outlet } from 'react-router-dom';
import NavBar from '../components/nav-bar';

export default function Root() {
    return (
        <div className='min-h-screen w-full bg-background py-4 px-6 flex justify-center text-foreground transition-all duration-300 ease-in-out'>
            <div className='max-w-5xl w-full flex flex-col gap-4'>
                <NavBar />
                <Outlet />
            </div>
        </div>
    );
}
