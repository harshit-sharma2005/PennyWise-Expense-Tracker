import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { userContext } from '../../context/userContext'
import { useNavigate } from "react-router-dom"
import CharAvatar from "../cards/CharAvatar"

function SideMenu({ activeMenu }) {
    const { user, clearUser } = useContext(userContext)
    const navigate = useNavigate()

    const handleClick = (route) => {
        if (route === "logout") {
            handlelogout();
            return;
        }
        navigate(route)
    }

    const handlelogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login")
    }
    return (<div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>

            <CharAvatar fullName={user?.fullName || ""} width='w-20' height='h-20' style="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-xl shadow-lg shadow-purple-500/20" />

            <h5 className='text-gray-950 font-medium'>
                {user?.fullName || ""}
            </h5>
        </div>

        {SIDE_MENU_DATA.map((item, index) => {
            return <button key={`menu_${index}`} className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-2 transition-all duration-200 ${activeMenu == item.label ? "text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-md shadow-purple-500/20" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                onClick={() => { handleClick(item.path) }}
            >
                <item.icon className='text-xl' />
                {item.label}
            </button>
        })}
    </div>)
}

export default SideMenu