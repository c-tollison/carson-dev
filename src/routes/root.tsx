import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <div className='p-4 min-h-screen bg-background'>
            <Outlet />
        </div>
    );
}
