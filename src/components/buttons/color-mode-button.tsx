import { useContext } from 'react';
import { ColorModeContext } from '../core/providers/color-mode-provider/color-mode-provider';
import BaseButton from '../core/buttons/base-button';
import { ColorMode } from '../core/providers/color-mode-provider/color-mode.enum';
import { ButtonColors } from '../core/buttons/button-color.enum';

export default function ColorModeButton() {
    const colorModeContext = useContext(ColorModeContext);
    return (
        <BaseButton
            onClick={() => {
                colorModeContext.toggleColorMode();
            }}
            backgroundColor={ButtonColors.background}
        >
            {colorModeContext.colorMode === ColorMode.Dark ? (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='white'
                    className='w-6 h-6'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <circle
                        cx='12'
                        cy='12'
                        r='5'
                    />
                    <line
                        x1='12'
                        y1='1'
                        x2='12'
                        y2='3'
                    />
                    <line
                        x1='12'
                        y1='21'
                        x2='12'
                        y2='23'
                    />
                    <line
                        x1='4.22'
                        y1='4.22'
                        x2='5.64'
                        y2='5.64'
                    />
                    <line
                        x1='18.36'
                        y1='18.36'
                        x2='19.78'
                        y2='19.78'
                    />
                    <line
                        x1='1'
                        y1='12'
                        x2='3'
                        y2='12'
                    />
                    <line
                        x1='21'
                        y1='12'
                        x2='23'
                        y2='12'
                    />
                    <line
                        x1='4.22'
                        y1='19.78'
                        x2='5.64'
                        y2='18.36'
                    />
                    <line
                        x1='18.36'
                        y1='5.64'
                        x2='19.78'
                        y2='4.22'
                    />
                </svg>
            ) : (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='black'
                    className='w-6 h-6'
                >
                    <path d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z' />
                </svg>
            )}
        </BaseButton>
    );
}
