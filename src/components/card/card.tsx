import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className: string;
}

export default function Card({ className, children }: CardProps) {
    return <div className={`${className}`}>{children}</div>;
}
