import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <div className='p-4 h-screen bg-background dark:text-white text-black'>
            <Outlet />
        </div>
    );
}
