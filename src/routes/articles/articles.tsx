import { useState } from 'react';
import Card from '../../components/core/card/card';
import NavBar from '../../components/nav-bar/nav-bar';
import { Link } from 'react-router-dom';

export default function Articles() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className='flex h-full justify-center items-center p-4'>
                <div className='h-full w-full grid grid-cols-1 lg:grid-cols-1 grid-flow-row auto-rows-auto gap-4 max-w-[1600px] grid-rows-[75px_auto]'>
                    <Card
                        cols='col-span-full'
                        rows='lg:row-span-1'
                        className='w-full h-[75px] flex justify-center'
                    >
                        <NavBar setIsOpen={toggleOpen} />
                    </Card>
                    {isOpen && (
                        <>
                            <Link to={'/experience'}>
                                <Card
                                    cols='col-span-full'
                                    rows='lg:row-span-1'
                                    className='w-full h-[75px] flex justify-center items-center md:hidden'
                                >
                                    Experience
                                </Card>
                            </Link>
                            <Link to={'/articles'}>
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

                    <div className='text-center w-full'>Building 🛠️</div>
                </div>
            </div>
        </>
    );
}
