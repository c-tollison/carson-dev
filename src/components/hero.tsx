import CopyEmail from './buttons/copy-email';
import Github from './buttons/github';
import LinkedIn from './buttons/linkedin';

export default function Hero() {
    return (
        <div className='mb-4 w-full'>
            <div className='flex flex-col md:flex-row items-center md:justify-between gap-6'>
                <div className='flex flex-col items-center md:items-start gap-1.5'>
                    <h1 className='font-display text-primary text-4xl md:text-5xl font-bold tracking-tight'>
                        Carson Tollison
                    </h1>
                    <p className='text-lg font-medium text-foreground/80 tracking-wide'>
                        Software engineer{' '}
                        <a
                            href='https://felux.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-accent hover:underline underline-offset-4'
                        >
                            @Felux
                        </a>
                    </p>
                    <p className='text-sm text-foreground/80 tracking-wide text-center md:text-left'>
                        I'm a software engineer with 3+ years' experience, primarily in TypeScript and Python. Most of
                        my time has been spent at startups, with a couple of pit stops at Amazon as an SDE intern along
                        the way.
                        <br />
                        <br />
                        I specialize in backend systems, having built event-driven pipelines, AI workflows, and
                        developer tooling. Lately I'm focused on AI solutions and helping inform business decisions in
                        the steel industry over at Felux. Outside of work, I've been deep in Go, building systems stuff
                        and learning database internals.
                        <br />
                        <br />I also have a passion for graphic design and music, though I'll keep my day job. Always
                        happy to talk engineering or trade music recommendations.
                    </p>
                    <div className='flex flex-wrap items-center gap-3 mt-1'>
                        <a
                            href='mailto:tollison.carson@gmail.com'
                            className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity'
                        >
                            Get In Touch
                        </a>
                        <Github />
                        <LinkedIn />
                        <CopyEmail />
                    </div>
                </div>
                <div className='order-first md:order-last w-28 h-28 md:w-32 md:h-32 flex-shrink-0 md:mr-2'>
                    <img
                        src='profile-pic.jpeg'
                        alt='Carson'
                        className='w-full h-full object-cover rounded-full shadow-lg ring-2 ring-border'
                    />
                </div>
            </div>
        </div>
    );
}
