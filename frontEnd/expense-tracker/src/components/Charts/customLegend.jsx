import React from 'react'

const customLegend = ({payload}) => {
  return (
    <div className='flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2'>
        {payload.map((entry,index)=>(
            <div key={`legend-${index}`} className='flex items-center gap-1.5'>
                <div className='w-2 h-2 rounded-full' style={{backgroundColor:entry.color}}></div>
                <span className='text-[10px] text-gray-700 font-medium'>{entry.value}</span>
            </div>
        ))}
    </div>
  )
}

export default customLegend