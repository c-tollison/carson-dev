export default function Hero() {
    return (
        <div className='py-16 flex flex-col gap-4'>
            <h1 className='text-primary text-5xl font-bold'>I'm Carson</h1>
            <h2 className='text-2xl font-medium'>
                Software Engineer based in Simpsonville, SC&nbsp;
                <span>@</span>
                <a
                    href='https://www.chirohd.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-secondary hover:underline font-semibold'
                >
                    ChiroHD
                </a>
            </h2>
        </div>
    );
}
