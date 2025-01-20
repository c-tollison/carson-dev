import { ReactNode, createContext, useState } from 'react';

interface NavbarContextI {
    isOpen: boolean;
    toggleOpen: () => void;
}

const defaultContext = {
    isOpen: false,
    toggleOpen: () => {},
};

export const NavbarContext = createContext<NavbarContextI>(defaultContext);

interface NavbarProviderProps {
    children: ReactNode;
}

export function NavbarProvider({ children }: NavbarProviderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return <NavbarContext.Provider value={{ isOpen, toggleOpen }}>{children}</NavbarContext.Provider>;
}
