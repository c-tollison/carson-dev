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

    const navLinkClass = (page: NavBarPages) =>
        `relative font-medium text-[15px] tracking-wide transition-colors ${
            activePage === page ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`;

    return (
        <div className='relative'>
            <nav className='flex justify-between items-center w-full border-b border-border py-5'>
                <Link
                    to='/'
                    onClick={() => {
                        if (navbarOpen) toggleNavBar();
                    }}
                    className={navLinkClass(NavBarPages.Home)}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
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
                <div className='flex gap-3 items-center md:hidden'>
                    <DropDownButton onClick={toggleNavBar} />
                </div>
                <ul className='hidden md:flex flex-row items-center gap-6'>
                    <li>
                        <Link
                            to='/work'
                            className={navLinkClass(NavBarPages.Work)}
                        >
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/log'
                            className={navLinkClass(NavBarPages.Log)}
                        >
                            Dev Logs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/projects'
                            className={navLinkClass(NavBarPages.Projects)}
                        >
                            Projects
                        </Link>
                    </li>
                </ul>
            </nav>
            {navbarOpen && (
                <>
                    <div
                        className='md:hidden fixed inset-0 top-0 z-10 bg-background/60 backdrop-blur-sm'
                        onClick={toggleNavBar}
                    />
                    <div className='md:hidden absolute right-0 top-full mt-2 z-20 w-44 rounded-lg bg-card border border-border shadow-xl'>
                        <div className='flex flex-col py-2'>
                            <Link
                                to='work'
                                className='px-5 py-3 text-sm font-medium hover:bg-muted transition-colors'
                                onClick={toggleNavBar}
                            >
                                Work
                            </Link>
                            <Link
                                to='log'
                                className='px-5 py-3 text-sm font-medium hover:bg-muted transition-colors'
                                onClick={toggleNavBar}
                            >
                                Dev Logs
                            </Link>
                            <Link
                                to='projects'
                                className='px-5 py-3 text-sm font-medium hover:bg-muted transition-colors'
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
