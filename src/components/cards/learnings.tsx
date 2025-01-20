export default function Learnings() {
    return (
        <div className='h-full flex flex-col items-center'>
            <h2 className='text-2xl font-semibold'>What I'm Using</h2>
            <div className='flex flex-row h-full items-center justify-center gap-8'>
                <a
                    href='https://hono.dev/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='md:transition-transform md:duration-200 md:hover:scale-105'
                >
                    <img
                        src='./hono-logo.png'
                        alt='Hono Logo'
                        className='w-24 h-24 object-contain'
                    />
                </a>
                <div className='h-24 border-l border-accent' />
                <a
                    href='https://www.postgresql.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='md:transition-transform md:duration-200 md:hover:scale-105'
                >
                    <img
                        src='./postgres-logo.png'
                        alt='Postgres Logo'
                        className='w-24 h-24 object-contain'
                    />
                </a>
                <div className='h-24 border-l border-accent' />
                <a
                    href='https://bun.sh/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='md:transition-transform md:duration-200 md:hover:scale-105'
                >
                    <img
                        src='./bun-logo.png'
                        alt='Bun Logo'
                        className='w-24 h-24 object-contain'
                    />
                </a>
            </div>
        </div>
    );
}
