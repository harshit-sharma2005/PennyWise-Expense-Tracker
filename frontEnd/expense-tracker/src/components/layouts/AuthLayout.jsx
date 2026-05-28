import React from 'react'
import CARD_2 from"../../assets/images/card2.png"
import {LuTrendingUpDown} from "react-icons/lu"

const AuthLayout= ({children})=>{
    return <div className='flex bg-bg-base text-text-primary min-h-screen'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-bg-base flex flex-col'>
            <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center text-text-inverse text-sm font-bold shadow-md shadow-accent-primary-glow'>P</div>
                <h2 className='text-lg font-semibold text-text-primary'>PennyWise</h2>
            </div>
            <div className='flex-grow flex flex-col justify-center'>{children}</div>
        </div>

        <div className='hidden md:block w-[40vw] h-screen bg-bg-sidebar bg-auth-bg-image bg-cover bg-no-repeat bg-center relative overflow-hidden p-8 border-l border-border-default'>
            <div className='w-48 h-48 rounded-[40px] bg-accent-primary-subtle border border-border-default absolute -top-7 -left-5 -z-0' />
            <div className='w-48 h-56 rounded-[40px] border-[20px] border-border-strong/30 absolute top-[30%] -right-[10%] ' />
            <div className='w-48 h-48 rounded-[40px] bg-bg-elevated border border-border-strong absolute -bottom-7 -left-5' />
            
            <div className="grid grid-cols-1 z-20">
                <StatsInfoCard icon={<LuTrendingUpDown/>} label="Track Your Income & Expenses" value="$43,000" color="bg-accent-primary" />
            </div>


            <img src={CARD_2} className="w-90 lg:w-[90%] rounded-[10px] absolute bottom-10 shadow-xl shadow-black/40 border border-border-default"/>
        </div>
    </div>


}

const StatsInfoCard =({icon,label,value,color})=>{
    return <div className='flex w-135 bg-bg-surface gap-6 p-4 absolute rounded-xl shadow-md border border-border-default'>
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-text-inverse ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className='text-xs text-text-secondary mb-1'>{label}</h6>
            <span className='text-[20px] font-semibold text-text-primary font-mono'>{value}</span>
        </div>
    </div>
}

export default AuthLayout