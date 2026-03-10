import GitHubIcon from '../icons/github-icon';

export default function Github() {
    return (
        <a
            href='https://github.com/c-tollison'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub'
            className='text-muted-foreground hover:text-primary transition-colors duration-200'
        >
            <GitHubIcon className='w-8 h-8' />
        </a>
    );
}
