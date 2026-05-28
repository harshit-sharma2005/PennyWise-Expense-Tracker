import React, { useState, useRef, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const pickerRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        if (isOpen) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    return (
        <div className='flex flex-col items-center mb-6' ref={pickerRef}>
            <div
                className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 rounded-full cursor-pointer hover:bg-purple-100'
                onClick={() => setIsOpen(!isOpen)}
            >
                {icon || "😊"}
            </div>
            {isOpen && (
                <div className='relative z-50 mt-2'>
                    <EmojiPicker
                        onEmojiClick={(emojiData) => {
                            onSelect(emojiData?.emoji)
                            setIsOpen(false)
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup
