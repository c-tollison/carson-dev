import ColorModeButton from '../buttons/color-mode-button';
import { Link } from 'react-router-dom';
import DropDownButton from '../buttons/drop-down-button';
import { useContext } from 'react';
import { NavbarContext } from '../core/providers/navbar-provider/navbar-provider';

export default function NavBar() {
    const navbarContext = useContext(NavbarContext);

    return (
        <>
            <nav className='flex justify-between items-center w-full'>
                <div className='flex justify-between items-center w-full'>
                    <h1 className='text-xl'>
                        <Link to={'/'}>
                            Carson<span className='text-primary'> Tollison</span>
                        </Link>
                    </h1>
                    <div className='flex gap-4 h-full justify-center items-center md:hidden'>
                        <ColorModeButton />
                        <DropDownButton onClick={navbarContext.toggleOpen} />
                    </div>
                </div>
                <ul className={`hidden md:flex flex-col md:flex-row md:items-center md:gap-4 w-full md:w-auto`}>
                    <li>
                        <Link to={'/experience'}>Experience</Link>
                    </li>
                    <li>
                        <Link to={'/articles'}>Articles</Link>
                    </li>
                    <ColorModeButton />
                </ul>
            </nav>
        </>
    );
}
