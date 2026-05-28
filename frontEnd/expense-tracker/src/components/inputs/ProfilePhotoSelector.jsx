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

        {!image ? (<div className='w-20 h-20 flex items-center justify-center  bg-purple-100 rounded-full relative'>
            <LuUser className='text-4xl text-primary'/>
            <button type='button' className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1   ' onClick={onChoosefile}>
                <LuUpload/>
            </button>
            </div> ) : (
                <div className='relative'>
                    <img src={previewURL} alt="profilePhoto" className='w-20 h-20 rounded-full object-cover'/>
                    <button type='button' className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full -bottom-1 -right-1" onClick={handleRemoveChange}>
                        <LuTrash/>
                    </button>
                </div>
            )}




        </div>
    )
}

export default ProfilePhotoSelector