import { Link, Outlet } from 'react-router-dom';
import Card from '../components/core/card/card';
import NavBar from '../components/nav-bar/nav-bar';
import { useContext } from 'react';
import { NavbarContext } from '../components/core/providers/navbar-provider/navbar-provider';

export default function Root() {
    const navbarContext = useContext(NavbarContext);

    return (
        <div className='min-h-screen w-full bg-background dark:text-white text-black'>
            <div className='p-4 flex lg:h-screen h-full justify-center items-center'>
                <div className='h-full w-full grid grid-cols-1 lg:grid-cols-7 lg:grid-rows-[75px_repeat(8,_1fr)] gap-4 max-w-[1600px]'>
                    <Card
                        cols='col-span-full'
                        rows='lg:row-span-1'
                        className='w-full h-[75px] flex justify-center'
                    >
                        <NavBar />
                    </Card>
                    {navbarContext.isOpen && (
                        <>
                            <Link
                                to={'/experience'}
                                onClick={navbarContext.toggleOpen}
                            >
                                <Card
                                    cols='col-span-full'
                                    rows='lg:row-span-1'
                                    className='w-full h-[75px] flex justify-center items-center md:hidden'
                                >
                                    Experience
                                </Card>
                            </Link>
                            <Link
                                to={'/articles'}
                                onClick={navbarContext.toggleOpen}
                            >
                                <Card
                                    cols='col-span-full'
                                    rows='lg:row-span-1'
                                    className='w-full h-[75px] flex justify-center items-center md:hidden'
                                >
                                    Articles
                                </Card>
                            </Link>
                        </>
                    )}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
