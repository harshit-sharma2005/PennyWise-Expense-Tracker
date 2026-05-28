import React,{useState} from 'react'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6'



function Input({value,onChange,placeholder,label,type}) {
    const [showPassword,setShowPassword]=useState(false)
    const toggleShowPassword=() =>{
        setShowPassword(!showPassword)
    }
    return (
    <div>
        <label className='text-xs text-text-secondary font-medium'>{label}</label>
        <div className='input-box'>
            <input
                type={type=='password' ? showPassword ? 'text' :'password' :type }
                placeholder={placeholder}
                className='w-full bg-transparent outline-none text-text-primary placeholder:text-text-tertiary'
                value={value}
                onChange={(e)=>onChange(e)}
            />

            {type==='password' && (
                <>
                {showPassword ? (
                    <FaRegEye
                        size={16}
                        className='text-accent-primary cursor-pointer'
                        onClick={()=> toggleShowPassword()}
                    />
                    )
                    : (<FaRegEyeSlash
                            size={16}
                            className='text-text-tertiary cursor-pointer'
                            onClick={()=>toggleShowPassword()}
                        />
                        )
                }
                </>
            )}
        </div>
    </div>
    )
}

export default Input