import ColorModeButton from './buttons/color-mode-button';
import { Link, useLocation } from 'react-router-dom';
import DropDownButton from './buttons/drop-down-button';
import { useEffect, useState } from 'react';
import { NavBarPages } from '../enums/NavBarPages.enum';

export default function NavBar() {
    const location = useLocation();
    const [navbarOpen, setNavBarOpen] = useState<boolean>(false);
    const [activePage, setActivePage] = useState<NavBarPages>(NavBarPages.Home);

    const toggleNavBar = () => {
        setNavBarOpen(!navbarOpen);
    };

    useEffect(() => {
        const base = location.pathname.split('/')[1];
        switch (base) {
            case '':
                setActivePage(NavBarPages.Home);
                break;
            case 'work':
                setActivePage(NavBarPages.Work);
                break;
            case 'log':
                setActivePage(NavBarPages.Log);
                break;
            case 'projects':
                setActivePage(NavBarPages.Projects);
                break;
            default:
                setActivePage(NavBarPages.Home);
        }
    }, [location]);

    return (
        <div className='relative'>
            <nav className='flex justify-between items-center w-full border-b py-4 border-border'>
                <div className='flex justify-between items-center w-full'>
                    <Link
                        to='/'
                        onClick={() => {
                            if (navbarOpen) {
                                toggleNavBar();
                            }
                        }}
                        className={`${activePage === NavBarPages.Home ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors text-sm`}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-4 h-4'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                            />
                        </svg>
                    </Link>
                    <div className='flex gap-4 h-full justify-center items-center md:hidden'>
                        <ColorModeButton />
                        <DropDownButton onClick={toggleNavBar} />
                    </div>
                </div>
                <ul className='hidden md:flex flex-col md:flex-row md:items-center md:gap-4 w-full md:w-auto'>
                    <li>
                        <Link
                            to='/work'
                            className={`${activePage === NavBarPages.Work ? 'text-primary' : 'text-muted-foreground '} hover:text-primary transition-colors text-sm`}
                        >
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/log'
                            className={`${activePage === NavBarPages.Log ? 'text-primary' : 'text-muted-foreground '} hover:text-primary transition-colors text-sm whitespace-nowrap`}
                        >
                            Dev Logs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/projects'
                            className={`${activePage === NavBarPages.Projects ? 'text-primary' : 'text-muted-foreground '} hover:text-primary transition-colors text-sm`}
                        >
                            Projects
                        </Link>
                    </li>
                    <ColorModeButton />
                </ul>
            </nav>
            {navbarOpen && (
                <>
                    <div
                        className='md:hidden fixed inset-0 top-0 z-10'
                        onClick={toggleNavBar}
                    />
                    <div className='md:hidden absolute right-0 top-full mt-2 z-20 w-40 rounded-lg bg-card border border-border shadow-lg'>
                        <div className='flex flex-col py-1'>
                            <Link
                                to='work'
                                className='px-4 py-2.5 hover:bg-popover transition-colors text-sm'
                                onClick={toggleNavBar}
                            >
                                Work
                            </Link>
                            <Link
                                to='log'
                                className='px-4 py-2.5 hover:bg-popover transition-colors text-sm'
                                onClick={toggleNavBar}
                            >
                                Dev Logs
                            </Link>
                            <Link
                                to='projects'
                                className='px-4 py-2.5 hover:bg-popover transition-colors text-sm'
                                onClick={toggleNavBar}
                            >
                                Projects
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
