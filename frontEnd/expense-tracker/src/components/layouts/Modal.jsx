import React from 'react'
import { LuX } from 'react-icons/lu'

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-bg-overlay backdrop-blur-[4px] overflow-y-auto p-4 animate-fadeIn' onClick={onClose}>
            <div className='bg-bg-surface border border-border-default rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fadeInUp' onClick={(e) => e.stopPropagation()}>
                <button className='absolute top-4 right-4 text-text-secondary hover:text-text-primary cursor-pointer' onClick={onClose}>
                    <LuX size={20} />
                </button>
                <h5 className='text-md font-semibold text-text-primary mb-4'>{title}</h5>
                {children}
            </div>
        </div>
    )
}

export default Modal
