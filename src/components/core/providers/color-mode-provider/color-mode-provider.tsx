import { ReactNode, createContext, useState } from 'react';
import { ColorMode } from './color-mode.enum';

interface ColorModeContextI {
    colorMode: ColorMode;
    toggleColorMode: () => void;
}

const defaultContext = {
    colorMode: ColorMode.Dark,
    toggleColorMode: () => {},
};

export const ColorModeContext = createContext<ColorModeContextI>(defaultContext);

interface ColorThemeProviderProps {
    children: ReactNode;
}

export function ColorThemeProvider({ children }: ColorThemeProviderProps) {
    const [colorMode, setColorMode] = useState(defaultContext.colorMode);

    function toggleColorMode() {
        const newMode = colorMode === ColorMode.Dark ? ColorMode.Light : ColorMode.Dark;
        document.getElementById('root')?.classList.remove(colorMode);
        document.getElementById('root')?.classList.add(newMode);
        setColorMode(newMode);
    }

    return <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>{children}</ColorModeContext.Provider>;
}
