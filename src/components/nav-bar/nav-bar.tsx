import ColorModeButton from '../buttons/color-mode-button';

import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className='flex flex-row justify-between items-center w-full'>
            <h1>
                <Link to={'/'}>
                    Carson<span className='text-primary'> Tollison</span>
                </Link>
            </h1>
            <ul className='flex flex-wrap gap-4 items-center'>
                <li>
                    <Link to={'/experience'}>Experience</Link>
                </li>
                <li>
                    <Link to={'/articles'}>Articles</Link>
                </li>
                <li>
                    <ColorModeButton />
                </li>
            </ul>
        </nav>
    );
}
