import React from 'react'
import { LuTrendingUp, LuTrendingDown, LuUtensils, LuTrash2, LuPencil } from 'react-icons/lu'


const TransactionInfoCard = ({ title, icon, date, amount, type, note, hideDeleteBtn, onDelete, onEdit }) => {
    const getAmountStyles = () => type === "income" ? "bg-success-bg text-success border border-success/15" : "bg-danger-bg text-danger border border-danger/15"

    return (
        <div className='group relative flex items-center gap-3 mt-1.5 p-1.5 rounded-lg hover:bg-bg-elevated transition-all duration-200'>
            <div className='w-9 h-9 flex items-center justify-center text-base text-text-primary bg-bg-surface border border-border-default rounded-lg'>
                {icon ? (<span className='text-xl'>{icon}</span>) : (<LuUtensils size={14} className="text-text-secondary" />)}
            </div>

            <div className='flex flex-1 items-center justify-between'>
                <div>
                    <p className='text-xs text-text-primary font-medium'>{title}</p>
                    <p className='text-[10px] text-text-tertiary mt-0.5'>{date}</p>
                    {note && (
                        <p className='text-[10px] text-text-secondary mt-0.5'>{note}</p>
                    )}
                </div>
                <div className='flex items-center gap-2'>
                    {!hideDeleteBtn && (
                        <button className='text-text-secondary hover:text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={onEdit}>
                            <LuPencil size={15} />
                        </button>
                    )}
                    {!hideDeleteBtn && (
                        <button className='text-text-secondary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={onDelete}>
                            <LuTrash2 size={15} />
                        </button>
                    )}
                    <div className={`flex items-center gap-1 px-2 py-1 rounded font-mono ${getAmountStyles()}`}>
                        <h6 className='text-[11px] font-semibold'>
                            {type === "income" ? "+" : "-"}${amount}
                        </h6>
                        {type === "income" ? <LuTrendingUp size={12} /> : <LuTrendingDown size={12} />}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TransactionInfoCard

