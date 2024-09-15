import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
    cols: string;
    rows: string;
}

export default function Card({ children, className, cols, rows, ...props }: CardProps) {
    return (
        <div
            {...props}
            className={`p-4 bg-card rounded-md border border-accent shadow-md ${cols} ${rows} ${className}`}
        >
            {children}
        </div>
    );
}
