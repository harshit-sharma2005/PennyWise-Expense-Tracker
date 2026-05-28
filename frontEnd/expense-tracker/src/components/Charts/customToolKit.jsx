import React from 'react'

const customToolKit = ({active,payload}) => {
  if(active && payload && payload.length){
    return (
    <div className='bg-bg-elevated shadow-md rounded-lg p-2 border border-border-default'>
        <p className='text-xs font-semibold text-accent-primary mb-1'>{payload[0].name}</p>
        <p className='text-xs text-text-secondary'>
            Amount= <span className='text-xs font-semibold text-text-primary font-mono'>${payload[0].value}</span>
        </p>
    </div>
  )}
  return null;
}

export default customToolKit
