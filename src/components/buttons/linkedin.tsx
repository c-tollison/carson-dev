import LinkedInIcon from '../icons/linkedin-icon';

export default function LinkedIn() {
    return (
        <a
            href='https://www.linkedin.com/in/carson-tollison/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='LinkedIn'
            className='text-muted-foreground hover:text-primary transition-colors duration-200'
        >
            <LinkedInIcon className='w-8 h-8' />
        </a>
    );
}
