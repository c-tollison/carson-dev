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
        switch (location.pathname) {
            case '/':
                setActivePage(NavBarPages.Home);
                break;
            case '/work':
                setActivePage(NavBarPages.Work);
                break;
            case '/journal':
                setActivePage(NavBarPages.Journal);
                break;
            case '/projects':
                setActivePage(NavBarPages.Projects);
                break;
            default:
                setActivePage(NavBarPages.Home);
        }
    }, [location]);

    return (
        <>
            <nav className='flex justify-between items-center w-full border-b pb-4 border-border'>
                <div className='flex justify-between items-center w-full'>
                    <h1 className='text-xl '>
                        <Link to={'/'}>
                            Carson<span className='text-primary'> Tollison</span>
                        </Link>
                    </h1>
                    <div className='flex gap-4 h-full justify-center items-center md:hidden'>
                        <ColorModeButton />
                        <DropDownButton onClick={toggleNavBar} />
                    </div>
                </div>
                <ul className='hidden md:flex flex-col md:flex-row md:items-center md:gap-4 w-full md:w-auto'>
                    <li>
                        <Link
                            to='/work'
                            className={`${activePage === NavBarPages.Work ? 'text-primary' : 'text-muted-foreground '} hover:text-primary transition-colors`}
                        >
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/journal'
                            className={`${activePage === NavBarPages.Journal ? 'text-primary' : 'text-muted-foreground '} hover:text-primary transition-colors`}
                        >
                            Journal
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/projects'
                            className={`${activePage === NavBarPages.Projects ? 'text-primary' : 'text-muted-foreground '} hover:text-primary transition-colors`}
                        >
                            Projects
                        </Link>
                    </li>
                    <ColorModeButton />
                </ul>
            </nav>
        </>
    );
}
