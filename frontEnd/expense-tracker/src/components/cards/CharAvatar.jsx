import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({ fullName, width, height, style }) => {
    return (
        <div className={`${width || "w-12"} ${height || "h-12"} ${style || "bg-slate-500 text-white rounded-full flex items-center justify-center font-semibold"}`}>
            {getInitials(fullName || "")}
        </div>
    )
}

export default CharAvatar