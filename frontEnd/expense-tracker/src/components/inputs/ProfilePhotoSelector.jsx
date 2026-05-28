import React from 'react'
import {useState,useRef} from 'react'
import {LuUser , LuUpload , LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({image,setImage}) => {
    const inputRef=useRef(null)
    const [previewURL,setPreviewURL]=useState(null)

    const handleRemoveChange=()=>{
        setImage(null)
        setPreviewURL(null)

        if (inputRef.current) {
        inputRef.current.value = null;
        }//internally bhi delete krna hai file ko jisse wapis upload kr ske image
    }

    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        if(file){
            setImage(file);
            const preview=URL.createObjectURL(file);
            setPreviewURL(preview)
        }
    }

    const onChoosefile=()=>{
        inputRef.current.click()
    }

    return (
        <div className="flex justify-center mb-6">
            <input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

        {!image ? (<div className='w-20 h-20 flex items-center justify-center bg-bg-elevated border border-border-default rounded-full relative'>
            <LuUser className='text-4xl text-text-secondary'/>
            <button type='button' className='w-8 h-8 flex items-center justify-center bg-accent-primary text-text-inverse rounded-full absolute -bottom-1 -right-1 shadow-md shadow-accent-primary-glow cursor-pointer hover:bg-accent-primary-dim transition-colors' onClick={onChoosefile}>
                <LuUpload size={14}/>
            </button>
            </div> ) : (
                <div className='relative w-20 h-20'>
                    <img src={previewURL} alt="profilePhoto" className='w-20 h-20 rounded-full object-cover border border-border-strong'/>
                    <button type='button' className="w-8 h-8 flex items-center justify-center bg-danger text-text-inverse rounded-full absolute -bottom-1 -right-1 cursor-pointer hover:bg-danger/80 transition-colors" onClick={handleRemoveChange}>
                        <LuTrash size={14}/>
                    </button>
                </div>
            )}




        </div>
    )
}

export default ProfilePhotoSelector