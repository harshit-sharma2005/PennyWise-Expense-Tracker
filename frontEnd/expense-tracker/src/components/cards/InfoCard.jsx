import React from 'react'

function InfoCard({icon,label,value,color}) {
  return (
    <div className='flex items-center gap-3 bg-bg-surface p-3 rounded-lg shadow-sm border border-border-default hover:shadow-card hover:border-border-strong hover:-translate-y-0.5 transition-all duration-300 animate-fadeInUp'>
        <div className={`w-10 h-10 flex items-center justify-center text-xl text-text-inverse ${color} rounded-lg drop-shadow-md`}>
            {icon}
        </div>
        <div>
          <h6 className='text-xs text-white mb-0.5'>{label}</h6>
          <span className='text-lg font-semibold text-white font-mono'>${value}</span>
        </div>
    </div>

  )
}

export default InfoCard
