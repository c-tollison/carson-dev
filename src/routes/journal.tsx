import PageWrapper from '../components/page-wrapper';

export default function Journal() {
    return (
        <PageWrapper>
            <div className='py-10'>
                <h1 className='text-primary text-5xl font-bold min-h-[3.5rem]'>Journal</h1>
                <h2 className='text-2xl font-semibold text-foreground'>Recent thoughts</h2>
            </div>
        </PageWrapper>
    );
}
