import './modal.css';

export interface ModalProps {
    children: React.ReactNode;
    closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
    return (
        <div
            className='modal'
            onClick={closeModal}
        >
            <div
                className='modal-content'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className='close'>
                    <svg
                        onClick={closeModal}
                        xmlns='http://www.w3.org/2000/svg'
                        height='26px'
                        viewBox='0 -960 960 960'
                        width='26px'
                        fill='#f0f0f0'
                    >
                        <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
                    </svg>
                </div>
                {children}
            </div>
        </div>
    );
}
