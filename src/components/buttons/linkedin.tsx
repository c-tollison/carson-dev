import LinkedInIcon from '../icons/linkedin-icon';

export default function LinkedIn() {
    return (
        <a
            href='https://www.linkedin.com/in/carson-tollison/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='LinkedIn'
            className='text-muted-foreground hover:text-primary transition-colors'
        >
            <LinkedInIcon className='w-12 h-12' />
        </a>
    );
}
