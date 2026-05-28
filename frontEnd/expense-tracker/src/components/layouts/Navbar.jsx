import React, { useState } from 'react'
import {HiOutlineMenu , HiOutlineX} from 'react-icons/hi'
import SideMenu from './SideMenu'

function Navbar({activeMenu}) {
    const [openSideMenu,setOpenSideMenu]=useState(false)
    return (
        <div className='flex gap-5 items-center bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
            <button className='block lg:hidden text-black'
            onClick={()=>{
                setOpenSideMenu(!openSideMenu)
            }}
            >
                {openSideMenu ? <HiOutlineX className='text-2xl'/> : <HiOutlineMenu className='text-2xl'/>}
            </button>

            <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md shadow-purple-500/20'>P</div>
                <h2 className='text-lg font-semibold text-gray-800'>PennyWise</h2>
            </div>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu}/>
                </div>
            )}
        </div>
  )
}

export default Navbar