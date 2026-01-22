import GitHubIcon from './icons/github-icon';
import LinkedInIcon from './icons/linkedin-icon';

export default function Footer() {
    return (
        <footer className='w-full border-t border-border py-8'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4'>
                <div className='flex flex-col items-center md:items-start gap-2'>
                    <div className='flex gap-4 items-center'>
                        <a
                            href='mailto:tollison.carson@gmail.com'
                            className='text-muted-foreground hover:text-primary transition-colors text-sm'
                        >
                            tollison.carson@gmail.com
                        </a>
                        <a
                            href='https://www.linkedin.com/in/carson-tollison/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-muted-foreground hover:text-primary transition-colors'
                            aria-label='LinkedIn'
                        >
                            <LinkedInIcon />
                        </a>
                        <a
                            href='https://github.com/c-tollison'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-muted-foreground hover:text-primary transition-colors'
                            aria-label='GitHub'
                        >
                            <GitHubIcon />
                        </a>
                    </div>
                </div>
                <div className='text-sm text-muted-foreground'>
                    © {new Date().getFullYear()} Carson Tollison
                </div>
            </div>
        </footer>
    );
}
