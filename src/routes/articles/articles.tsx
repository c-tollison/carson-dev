import Card from '../../components/core/card/card';
import NavBar from '../../components/nav-bar/nav-bar';

export default function Articles() {
    return (
        <>
            <div className='flex h-full justify-center items-center p-4'>
                <div className='h-full w-full grid grid-cols-1 lg:grid-cols-1 grid-flow-row auto-rows-auto gap-4 max-w-[1600px] grid-rows-[75px_auto]'>
                    <Card
                        cols='col-span-full'
                        rows='lg:row-span-1'
                        className={`w-full h-full flex justify-center `}
                    >
                        <NavBar />
                    </Card>

                    <div className='text-center w-full'>Building 🛠️</div>
                </div>
            </div>
        </>
    );
}
