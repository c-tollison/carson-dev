import { ReactNode, useState, useEffect } from 'react';
import { ColorMode } from './color-mode.enum';
import { ColorModeContext, defaultContext } from './color-mode-context';

interface ColorThemeProviderProps {
    children: ReactNode;
}

export function ColorThemeProvider({ children }: ColorThemeProviderProps) {
    const [colorMode, setColorMode] = useState<ColorMode>(() => {
        const savedMode = localStorage.getItem('colorMode');
        return savedMode ? (savedMode as ColorMode) : defaultContext.colorMode;
    });

    useEffect(() => {
        applyColorMode(colorMode);
    }, [colorMode]);

    function applyColorMode(mode: ColorMode) {
        document.getElementById('root')?.classList.remove(ColorMode.Dark, ColorMode.Light);
        document.documentElement.style.backgroundColor =
            mode === ColorMode.Dark ? 'hsl(120, 10%, 10%)' : 'hsl(120, 13%, 96%)';
        document.getElementById('root')?.classList.add(mode);
        localStorage.setItem('colorMode', mode);
    }

    function toggleColorMode() {
        const newMode = colorMode === ColorMode.Dark ? ColorMode.Light : ColorMode.Dark;
        setColorMode(newMode);
    }

    return <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>{children}</ColorModeContext.Provider>;
}
