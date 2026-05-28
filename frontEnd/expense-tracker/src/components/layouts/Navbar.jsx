import React, { useState } from 'react'
import {HiOutlineMenu , HiOutlineX} from 'react-icons/hi'
import SideMenu from './SideMenu'

function Navbar({activeMenu}) {
    const [openSideMenu,setOpenSideMenu]=useState(false)
    return (
        <div className='flex gap-5 items-center bg-bg-surface border-b border-border-default py-4 px-7 sticky top-0 z-30'>
            <button className='block lg:hidden text-text-primary cursor-pointer'
            onClick={()=>{
                setOpenSideMenu(!openSideMenu)
            }}
            >
                {openSideMenu ? <HiOutlineX className='text-2xl'/> : <HiOutlineMenu className='text-2xl'/>}
            </button>

            <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center text-text-inverse text-sm font-bold shadow-md shadow-accent-primary-glow'>P</div>
                <h2 className='text-lg font-semibold text-text-primary'>PennyWise</h2>
            </div>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-bg-sidebar'>
                    <SideMenu activeMenu={activeMenu}/>
                </div>
            )}
        </div>
  )
}

export default Navbar