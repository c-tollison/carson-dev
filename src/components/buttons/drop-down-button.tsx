import { useContext } from 'react';
import { ColorModeContext } from '../core/providers/color-mode-provider/color-mode-provider';
import { ColorMode } from '../core/providers/color-mode-provider/color-mode.enum';

interface DropDownButtonProps {
    onClick: () => void;
}

export default function DropDownButton({ onClick }: DropDownButtonProps) {
    const colorModeContext = useContext(ColorModeContext);

    return (
        <div
            onClick={onClick}
            className='p-2 rounded-md border border-border cursor-pointer m-0'
        >
            <svg
                className='w-6 h-6'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M4 18L20 18'
                    stroke={colorModeContext.colorMode === ColorMode.Dark ? 'white' : 'black'}
                    strokeWidth='2'
                    strokeLinecap='round'
                />
                <path
                    d='M4 12L20 12'
                    stroke={colorModeContext.colorMode === ColorMode.Dark ? 'white' : 'black'}
                    strokeWidth='2'
                    strokeLinecap='round'
                />
                <path
                    d='M4 6L20 6'
                    stroke={colorModeContext.colorMode === ColorMode.Dark ? 'white' : 'black'}
                    strokeWidth='2'
                    strokeLinecap='round'
                />
            </svg>
        </div>
    );
}
