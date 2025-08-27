import { faArrowRightFromBracket, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Adminheader() {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);
    const [dashboardStatus, setdashboardStatus] = useState(true)
    const [userStatus, setuserStatus] = useState(false)
    const [taskstatus, settaskstatus] = useState(false)
    const [token, settoken] = useState("")

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('existingUser')
        navigate('/')
    }

    useEffect(() => {
        if(sessionStorage.getItem('token')){
            settoken(sessionStorage.getItem('token'))
        }
        if (location.pathname == '/admin-dashboard') {
            setdashboardStatus(true)
            setuserStatus(false)
            settaskstatus(false)
        }
        else if (location.pathname == '/admin-users') {
            setuserStatus(true)
            setdashboardStatus(false)
            settaskstatus(false)
        }
        else if (location.pathname == '/admin-tasks') {
            settaskstatus(true)
            setdashboardStatus(false)
            setuserStatus(false)
        }
    }, [location.pathname])
    return (
        <>
            <nav className="relative bg-emerald-300/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                    <div className="relative flex h-16 items-center justify-between">
                        {/* Mobile menu button */}
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                {/* Hamburger icon */}
                                {!menuOpen && (
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        aria-hidden="true"
                                        className="size-6"
                                    >
                                        <path
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}

                                {/* Close icon */}
                                {menuOpen && (
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        aria-hidden="true"
                                        className="size-6"
                                    >
                                        <path
                                            d="M6 18 18 6M6 6l12 12"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Logo + Links */}
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">

                                <img
                                    src="../../public/app-logo.png"
                                    alt="Your Company"
                                    className="h-20 w-auto"
                                />
                            </div>
                            <div className='flex items-center'>
                                <div className="hidden sm:ml-6 sm:block items-center">
                                    <div className="flex space-x-4 ">
                                        <Link to={'/admin-dashboard'}><button type='button' className={`rounded-md px-3 cursor-pointer py-2 text-sm font-medium hover:bg-white/5 hover:text-white ${dashboardStatus && 'bg-red-600/50'}`}>Dashboard</button></Link>
                                        <Link to={'/admin-users'}><button type='button' className={`rounded-md px-3 cursor-pointer py-2 text-sm font-medium hover:bg-white/5 hover:text-white ${userStatus && 'bg-red-600/50'}`}> Users </button></Link>
                                        <Link to={'/admin-tasks'}><button type='button' className={`rounded-md px-3 cursor-pointer py-2 text-sm font-medium hover:bg-white/5 hover:text-white ${taskstatus && 'bg-red-600/50'}`}> Tasks </button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right-side icon */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            { token ?
                                <button type="button" onClick={handleLogout} className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only text-black">View notifications</span>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        aria-hidden="true"
                                        className="size-6"
                                    >
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                    </svg>
                                </button>
                                :
                                <Link to={'/'}><button type='button' className='px-3 py-1 rounded bg-blue-300 hover:bg-blue-400 cursor-pointer'>Login</button></Link>
                            }
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            <button className={`block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white ${dashboardStatus && 'bg-gray-950/50'}`}> Dashboard </button>
                            <button className={`block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white ${userStatus && 'bg-gray-950/50'}`} > Users </button>
                            <button className={`block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white ${taskstatus && 'bg-gray-950/50'}`}> Tasks </button>

                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Adminheader