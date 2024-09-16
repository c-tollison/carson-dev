import { useContext } from 'react';
import { ColorModeContext } from '../core/providers/color-mode-provider/color-mode-provider';
import { ColorMode } from '../core/providers/color-mode-provider/color-mode.enum';

export default function Footer() {
    const colorModeContext = useContext(ColorModeContext);

    return (
        <footer className='w-full flex justify-around items-center'>
            <a
                href='https://github.com/c-tollison'
                target='_blank'
            >
                <svg
                    className='w-8 h-8'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16' // Adjusted to fit better in small dimensions
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.2 1.87.86 2.33.66.07-.52.28-.86.51-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.67 7.67 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.64 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z'
                        fill={colorModeContext.colorMode === ColorMode.Dark ? 'white' : 'black'}
                    />
                </svg>
            </a>

            <a
                href='https://www.linkedin.com/in/carson-tollison/'
                target='_blank'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-8 h-8'
                    viewBox='0 0 24 24'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                        fill={colorModeContext.colorMode === ColorMode.Dark ? 'white' : 'black'}
                    />
                </svg>
            </a>
        </footer>
    );
}
