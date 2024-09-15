import Card from '../../components/core/card/card';
import NavBar from '../../components/nav-bar/nav-bar';

function Dashboard() {
    return (
        <div className='h-full w-full grid grid-cols-1 lg:grid-cols-7 lg:grid-rows-9 gap-4'>
            <Card
                cols='col-span-full'
                rows='lg:row-span-1'
                className='w-full h-full flex justify-center'
            >
                <NavBar />
            </Card>
            <Card
                cols='col-span-full lg:col-span-3'
                rows='lg:row-span-5'
            ></Card>
            <Card
                cols='col-span-full lg:col-span-2'
                rows='lg:row-span-5'
            ></Card>
            <Card
                cols='col-span-full lg:col-span-2'
                rows='lg:row-span-6'
            ></Card>
            <Card
                cols='col-span-full lg:col-span-2'
                rows='lg:row-span-3'
            ></Card>
            <Card
                cols='col-span-full lg:col-span-3'
                rows='lg:row-span-3'
            ></Card>
            <Card
                cols='col-span-full lg:col-span-2'
                rows='lg:row-span-2'
            ></Card>
        </div>
    );
}

export default Dashboard;
