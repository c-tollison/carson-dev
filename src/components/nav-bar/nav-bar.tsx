import ColorModeButton from '../buttons/color-mode-button';
import { Link } from 'react-router-dom';
import DropDownButton from '../buttons/drop-down-button';
import { useState } from 'react';

export default function NavBar() {
    const [navbarOpen, setNavBarOpen] = useState<boolean>(false);

    const toggleNavBar = () => {
        setNavBarOpen(!navbarOpen);
    };

    return (
        <>
            <nav className='flex justify-between items-center w-full border-b pb-4 border-border'>
                <div className='flex justify-between items-center w-full'>
                    <h1 className='text-xl '>
                        <Link to={'/'}>
                            Carson<span className='text-secondary'> Tollison</span>
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
                            className='text-muted-foreground hover:text-primary transition-colors'
                        >
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/journal'
                            className='text-muted-foreground hover:text-primary transition-colors'
                        >
                            Journal
                        </Link>
                    </li>
                    <ColorModeButton />
                </ul>
            </nav>
        </>
    );
}
