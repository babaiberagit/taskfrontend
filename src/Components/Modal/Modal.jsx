import React from 'react';
import './Modal.css'
import closeicon from '../../Assets/svg/close.svg';

const Modal = ({ isOpen, onClose, title, children, width, height }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[536px] h-[440px] rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="heading-2">{title}</h2>
                    <div className=' cursor-pointer' onClick={onClose}>
                        <img src={closeicon} alt="close" />
                    </div>
                </div>

                <hr className='mt-6' />
                <div className="mt-[20px] overflow-y-auto max-h-[80vh] maincontent">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
