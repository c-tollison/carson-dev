export default function Learnings() {
    return (
        <a
            href='https://go.dev/'
            target='_blank'
        >
            <div className='h-full flex flex-col gap-4 justify-between items-center text-center'>
                <div className='text-2xl '>What I'm learning</div>
                <div className='flex flex-col items-center overflow-hidden'>
                    <img src='./gopher.png' />
                </div>
            </div>
        </a>
    );
}
