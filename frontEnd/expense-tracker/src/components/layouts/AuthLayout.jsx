import React from 'react'
import CARD_2 from"../../assets/images/card2.png"
import {LuTrendingUpDown} from "react-icons/lu"

const AuthLayout= ({children})=>{
    return <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md shadow-purple-500/20'>P</div>
                <h2 className='text-lg font-semibold text-gray-800'>PennyWise</h2>
            </div>
            {children}
        </div>

        <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-image bg-cover bg-no-repeat bg-center relative overflow-hidden p-8'>
            <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 -z-0' />
            <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-[10%] ' />
            <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5' />
            
            <div className="grid grid-cols-1 z-20">
                <StatsInfoCard icon={<LuTrendingUpDown/>} label="Track Your Income & Expenses" value="$430000" color="bg-primary" />
            </div>


            <img src={CARD_2} className="w-90 lg:w-[90%] rounded-[10px] absolute bottom-10 shadow-lg shadow-blue-400/15"/>
        </div>
    </div>


}

const StatsInfoCard =({icon,label,value,color})=>{
    return <div className='flex w-135 bg-white gap-6 p-4 absolute rounded-xl shadow-md shadow-purple-40 border border-gray-200/50'>
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
            <span className='text-[20px]'>{value}</span>
        </div>
    </div>
}

export default AuthLayout