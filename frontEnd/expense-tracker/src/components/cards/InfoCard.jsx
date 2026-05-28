import React from 'react'

function InfoCard({icon,label,value,color}) {
  return (
    <div className='flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200/50 hover:shadow-md hover:shadow-gray-200/40 hover:-translate-y-0.5 transition-all duration-300 animate-fadeInUp'>
        <div className={`w-10 h-10 flex items-center justify-center text-xl text-white ${color} rounded-lg drop-shadow-md`}>
            {icon}
        </div>
        <div>
            <h6 className='text-xs text-gray-500 mb-0.5'>{label}</h6>
            <span className='text-lg font-semibold text-gray-800'>${value}</span>
        </div>
    </div>

  )
}

export default InfoCard
