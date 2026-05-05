import GitHubIcon from './icons/github-icon';
import LinkedInIcon from './icons/linkedin-icon';

export default function Footer() {
    return (
        <footer className='w-full border-t border-border py-8'>
            <div className='flex flex-row justify-between items-center gap-4'>
                <p className='text-sm text-muted-foreground'>&copy; {new Date().getFullYear()} Carson Tollison</p>
                <div className='flex gap-4 items-center'>
                    <a
                        href='https://www.linkedin.com/in/carson-tollison/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-primary transition-colors duration-200'
                        aria-label='LinkedIn'
                    >
                        <LinkedInIcon />
                    </a>
                    <a
                        href='https://github.com/c-tollison'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-primary transition-colors duration-200'
                        aria-label='GitHub'
                    >
                        <GitHubIcon />
                    </a>
                </div>
            </div>
        </footer>
    );
}
