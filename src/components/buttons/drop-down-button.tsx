interface DropDownButtonProps {
    onClick: () => void;
}

export default function DropDownButton({ onClick }: DropDownButtonProps) {
    return (
        <button
            onClick={onClick}
            className='p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 cursor-pointer transition-colors duration-200'
            aria-label='Toggle menu'
        >
            <svg
                className='w-4 h-4'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M4 18L20 18'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                />
                <path
                    d='M4 12L20 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                />
                <path
                    d='M4 6L20 6'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                />
            </svg>
        </button>
    );
}
