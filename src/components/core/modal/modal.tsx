import React, { useContext } from 'react';
import { ColorModeContext } from '../providers/color-mode-provider/color-mode-provider';
import { ColorMode } from '../providers/color-mode-provider/color-mode.enum';

export interface ModalProps {
    children: React.ReactNode;
    closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
    const colorModeContext = useContext(ColorModeContext);

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center overflow-auto backdrop-blur-lg bg-black bg-opacity-75'
            onClick={closeModal}
        >
            <div
                className='w-11/12 max-w-5xl flex flex-col items-center gap-2 p-8 m-auto bg-card rounded-xl shadow-lg border border-border'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className='w-full flex justify-end'>
                    <svg
                        onClick={closeModal}
                        xmlns='http://www.w3.org/2000/svg'
                        height='26'
                        viewBox='0 -960 960 960'
                        width='26'
                        fill={colorModeContext.colorMode === ColorMode.Dark ? 'white' : 'black'}
                        className='cursor-pointer transition-transform hover:scale-110'
                    >
                        <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
                    </svg>
                </div>
                {children}
            </div>
        </div>
    );
}
