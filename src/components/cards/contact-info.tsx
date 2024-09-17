import { useContext } from 'react';
import { ColorModeContext } from '../core/providers/color-mode-provider/color-mode-provider';
import { ColorMode } from '../core/providers/color-mode-provider/color-mode.enum';

export default function ContactInfo() {
    const colorModeContext = useContext(ColorModeContext);

    return (
        <a href='mailto:tollisoncarson@gmail.com'>
            <div className='h-full flex flex-col justify-between'>
                <div className='flex justify-between'>
                    <div className='text-wrap w-[100px]'>Want to connect?</div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        className='w-6 h-6'
                        fill={colorModeContext.colorMode === ColorMode.Dark ? 'black' : 'white'}
                    >
                        <path
                            d='M31 0H15v2h13.59L.29 30.29 1.7 31.7 30 3.41V16h2V1a1 1 0 0 0-1-1z'
                            data-name='5-Arrow Up'
                        />
                    </svg>
                </div>
                <div className='text-6xl'>
                    Contact <span className='italic'>me</span>
                </div>
            </div>
        </a>
    );
}
