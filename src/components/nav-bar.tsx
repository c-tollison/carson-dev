import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavBarPages } from '../enums/NavBarPages.enum';

export default function NavBar() {
    const location = useLocation();
    const [activePage, setActivePage] = useState<NavBarPages>(NavBarPages.Home);

    useEffect(() => {
        const base = location.pathname.split('/')[1];
        setActivePage(base === 'log' ? NavBarPages.Log : NavBarPages.Home);
    }, [location]);

    const navLinkClass = (page: NavBarPages) =>
        `relative font-medium text-[15px] tracking-wide transition-colors ${
            activePage === page ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`;

    return (
        <nav className='flex justify-between items-center w-full border-b border-border py-5'>
            <Link
                to='/'
                aria-label='Home'
                className={navLinkClass(NavBarPages.Home)}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    focusable='false'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-[18px] h-[18px]'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                    />
                </svg>
            </Link>
            <Link
                to='/log'
                className={navLinkClass(NavBarPages.Log)}
            >
                Dev Logs
            </Link>
        </nav>
    );
}
