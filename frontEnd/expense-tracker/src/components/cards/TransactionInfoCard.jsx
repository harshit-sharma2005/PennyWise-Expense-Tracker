import React from 'react'
import { LuTrendingUp, LuTrendingDown, LuUtensils, LuTrash2, LuPencil } from 'react-icons/lu'


const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete, onEdit }) => {
    const getAmountStyles = () => type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"

    return (
        <div className='group relative flex items-center gap-3 mt-1.5 p-1.5 rounded-lg hover:bg-gray-50 transition-all duration-200'>
            <div className='w-9 h-9 flex items-center justify-center text-base text-gray-800 bg-gray-100 rounded-lg'>
                {icon ? (<span className='text-xl'>{icon}</span>) : (<LuUtensils size={14} />)}
            </div>

            <div className='flex flex-1 items-center justify-between'>
                <div>
                    <p className='text-xs text-gray-700 font-medium'>{title}</p>
                    <p className='text-[10px] text-gray-400 mt-0.5'>{date}</p>
                </div>
                <div className='flex items-center gap-2'>
                    {!hideDeleteBtn && (
                        <button className='text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={onEdit}>
                            <LuPencil size={15} />
                        </button>
                    )}
                    {!hideDeleteBtn && (
                        <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={onDelete}>
                            <LuTrash2 size={15} />
                        </button>
                    )}
                    <div className={`flex items-center gap-1 px-2 py-1 rounded ${getAmountStyles()}`}>
                        <h6 className='text-[11px] font-medium'>
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

