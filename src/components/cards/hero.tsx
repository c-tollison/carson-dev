export default function Hero() {
    return (
        <div className='flex flex-col gap-2'>
            <div className='text-primary text-2xl'>I'm Carson</div>
            <div className='text-3xl lg:text-4xl'>
                Software Engineer @
                <a
                    href='https://www.chirohd.com/'
                    target='_blank'
                    className='text-accent hover:underline'
                >
                    ChiroHD
                </a>
            </div>
        </div>
    );
}
