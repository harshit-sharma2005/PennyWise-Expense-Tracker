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
    return (<div className='w-64 h-[calc(100vh-61px)] bg-bg-sidebar border-r border-border-default p-5 sticky top-[61px] z-20 flex flex-col justify-between'>
        <div>
            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                <CharAvatar fullName={user?.fullName || ""} width='w-20' height='h-20' style="bg-accent-primary text-text-inverse rounded-full flex items-center justify-center font-semibold text-xl shadow-md shadow-accent-primary-glow" />
                <h5 className='text-text-primary font-medium'>
                    {user?.fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => {
                const isActive = activeMenu === item.label;
                return <button key={`menu_${index}`} className={`w-full flex items-center gap-4 text-sm py-2.5 px-4 rounded-md mb-2 transition-all duration-200 border-l-2 cursor-pointer ${isActive ? "text-accent-primary bg-accent-primary-subtle border-accent-primary" : "text-text-secondary border-transparent hover:bg-bg-elevated hover:text-text-primary"}`}
                    onClick={() => { handleClick(item.path) }}
                >
                    <item.icon className='text-lg' />
                    {item.label}
                </button>
            })}
        </div>
    </div>)
}

export default SideMenu