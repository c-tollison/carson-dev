import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonColors } from './button-color.enum';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    backgroundColor: ButtonColors;
}

export default function BaseButton({ children, backgroundColor, ...props }: BaseButtonProps) {
    return (
        <button
            {...props}
            className={`${backgroundColor} p-2 dark:text-white text-black rounded-md border shadow-sm border-accent`}
        >
            {children}
        </button>
    );
}
