import { useState } from 'react';

const EMAIL = 'tollison.carson@gmail.com';

export default function CopyEmail() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // clipboard API unavailable; fall back to noop
        }
    };

    return (
        <button
            type='button'
            onClick={handleCopy}
            aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
            className='group relative inline-flex items-center justify-center p-0 leading-none bg-transparent border-0 text-muted-foreground hover:text-primary transition-colors duration-200'
        >
            {copied ? (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='w-8 h-8 text-accent'
                >
                    <polyline points='20 6 9 17 4 12' />
                </svg>
            ) : (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='w-8 h-8'
                >
                    <rect
                        x='8'
                        y='8'
                        width='14'
                        height='14'
                        rx='2'
                    />
                    <path d='M16 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4' />
                </svg>
            )}
            <span
                aria-hidden='true'
                className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap rounded-md border border-border bg-card px-2 py-0.5 text-[11px] font-medium shadow-sm transition-opacity duration-200 ${
                    copied ? 'opacity-100 text-accent' : 'opacity-0 group-hover:opacity-100 text-foreground/80'
                }`}
            >
                {copied ? 'Copied' : 'Copy email'}
            </span>
        </button>
    );
}
