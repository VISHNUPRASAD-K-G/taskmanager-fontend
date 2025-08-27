import { faEllipsisVertical, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Userheader() {
    const navigate = useNavigate()
    const [moreOptions, setmoreOptions] = useState(false)
    const [token, settoken] = useState("")
    const handleLogout = ()=>{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('existingUser')
        navigate('/')
    }
    useState(()=>{
        if(sessionStorage.getItem('token')){
            settoken(sessionStorage.getItem('token'))
        }
    },[])
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Left: Brand */}
                <Link to={'/user-dashboard'} className="flex items-center gap-2">
                    <img src="app-logo.png" alt="no-image" className='w-20' />
                    <span className="font-semibold text-lg">teamSpirit</span>
                </Link>

                {/* Center: Nav Links */}
                <ul className="hidden md:flex gap-6 text-sm font-medium">
                    <Link to={'/user-dashboard'}><li><p className="hover:text-amber-500">Dashboard</p></li></Link>
                    <Link to={'/user-tasks'}><li><p className="hover:text-amber-500">My Tasks</p></li></Link>
                </ul>

                {/* Right: Buttons */}
                <div className="flex items-center gap-3">
                    {/* Profile */}
                    <div><button className=' cursor-pointer font-bold' type='button' onClick={() => setmoreOptions(!moreOptions)}><FontAwesomeIcon icon={faEllipsisVertical} /></button></div>
                    {moreOptions &&
                        <div className="absolute right-5 z-10 mt-36 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div className="py-1" role="none">
                                {token ? 
                                <button type='button' onClick={handleLogout} className=" cursor-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>
                                :
                                <Link to={'/'}><button type='button' className=" cursor-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">Login</button></Link>}
                            </div>
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Userheader