import { createContext } from 'react';
import { ColorMode } from './color-mode.enum';

interface ColorModeContextI {
    colorMode: ColorMode;
    toggleColorMode: () => void;
}

export const defaultContext = {
    colorMode: ColorMode.Light,
    toggleColorMode: () => {},
};

export const ColorModeContext = createContext<ColorModeContextI>(defaultContext);
export type { ColorModeContextI };
