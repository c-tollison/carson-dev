import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <div className='p-4 min-h-screen lg:h-screen w-full bg-background dark:text-white text-black'>
            <Outlet />
        </div>
    );
}
