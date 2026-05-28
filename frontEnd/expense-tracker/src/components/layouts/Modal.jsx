import React from 'react'
import { LuX } from 'react-icons/lu'

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] overflow-y-auto p-4 animate-fadeIn' onClick={onClose}>
            <div className='bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fadeInUp' onClick={(e) => e.stopPropagation()}>
                <button className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer' onClick={onClose}>
                    <LuX size={20} />
                </button>
                <h5 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h5>
                {children}
            </div>
        </div>
    )
}

export default Modal
