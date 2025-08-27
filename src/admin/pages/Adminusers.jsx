import React, { useEffect, useState } from 'react'
import Adminheader from '../components/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faArrowsRotate, faCheck, faClose, faPen, faPenToSquare, faSearch, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { allUsersApi, deleteUsersApi, registerApi } from '../../services/allApi'

function Adminusers() {
    const [modalControl, setmodalControl] = useState(false)
    const [allUsers, setallUsers] = useState([])
    const [userData, setuserData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [updateStatus, setupdateStatus] = useState({})
    const [token, settoken] = useState("")

    const resetData = () => {
        setuserData({
            username: '',
            email: '',
            password: ''
        })
    }

    const handleSubmit = async () => {
        const { username, email, password } = userData
        if (!username || !email || !password) {
            toast.info('Please complete all the fields.')
        }
        else if (email.split('@').length !== 2) {
            toast.info('Please enter a valid email.')
        }
        else {
            const result = await registerApi({ username, email, password })
            if (result.status == 200) {
                toast.success('user regisered successfully.')
                resetData()
                setupdateStatus(result)
            }
            else if (result.status == 406) {
                toast.warn(result.response.data)
            }
            else {
                toast.error("something went wrong")
            }
        }
    }

    // console.log(userData);
    const getAllUsers = async () => {
        const result = await allUsersApi()
        if (result.status == 200) {
            setallUsers(result.data)
        }
    }
    const deleteUser = async (id) => {
        const result = await deleteUsersApi(id)
        if (result.status == 200) {
            setupdateStatus(result)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [updateStatus])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const tok = sessionStorage.getItem('token')
            settoken(tok)
            getAllUsers(tok)
        }
    }, [])

    return (
        <>
            <Adminheader />
            {token ?
                <div>
                    <div className='md:mx-20 mx-10 my-10'>
                        <h1 className='font-bold md:text-2xl text-xl'>User Management</h1>
                        <p>Admin! You can manage Users here!!</p>
                        <div className='mt-10 p-2 flex justify-end'>
                            {/* <div className='flex w-fit rounded-md bg-gray-200 py-1 px-4 items-center'>
                                <form>
                                    <label htmlFor="user_search"><FontAwesomeIcon icon={faSearch} /></label>
                                    <input type="text" className='p-2 focus:outline-0' id='user_search' placeholder='search by name or email' />
                                </form>
                            </div> */}
                            <div>
                                <button onClick={() => setmodalControl(true)} className='bg-amber-500 py-2 px-3 rounded text-white border border-amber-500 hover:text-amber-500 hover:bg-white cursor-pointer'><FontAwesomeIcon icon={faAdd} className='me-2' /> Add User</button>
                            </div>
                        </div>

                        {allUsers.length > 0 ?
                            <div className='mt-10'>
                                <div className='grid md:grid-cols-3 gap-3'>
                                    {allUsers?.map((item, index) => (
                                        <div key={index} className='rounded shadow p-3 border-gray-200 flex items-center relative'>
                                            <div>
                                                <div className='flex justify-center items-center overflow-hidden' style={{ width: '70px', height: '70px', borderRadius: '50%' }}>
                                                    <img src="https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c092880a6d18c31995dfd_66236531e8288ee0657ae7a7_Business%2520Professional.webp" alt="user-image" className='w-full h-full object-cover' />
                                                </div>
                                            </div>
                                            <div className='px-3'>
                                                <p className='font-semibold '>{item.username}</p>
                                                <p className='text-gray-500 text-sm'>{item.email}</p>
                                            </div>
                                            <div className='absolute top-3 right-5 flex text-gray-500'>
                                                {/* <p className='hover:text-amber-500 cursor-pointer'><FontAwesomeIcon icon={faPenToSquare} /></p> */}
                                                <button type='button' onClick={() => deleteUser(item._id)} className='ms-2 hover:text-red-600 cursor-pointer'><FontAwesomeIcon icon={faTrashCan} /></button>
                                            </div>
                                        </div>
                                    ))

                                    }
                                </div>
                            </div>
                            :
                            <p className='text-xl text-center mt-14'>You are the only user here...😅</p>
                        }
                    </div>

                    {modalControl &&
                        <div className="relative z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">

                            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    {/* changed min-h-full -> md:min-h-full */}
                                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className='bg-white py-4'>
                                            <header>
                                                <div className='flex justify-between px-4 mb-3'>
                                                    <h3 className='font-medium text-xl'>Add New User</h3>
                                                    <p className='text-xl hover:text-red-600 cursor-pointer' onClick={() => setmodalControl(false)}><FontAwesomeIcon icon={faClose} /></p>
                                                </div>
                                            </header>
                                            <hr className='text-gray-300' />
                                            <main>
                                                <div className='my-3 px-4'>
                                                    <form action="">
                                                        <div className='mb-3'>
                                                            <label htmlFor="username" className='block'>User Name</label>
                                                            <input onChange={(e) => setuserData({ ...userData, username: e.target.value })} value={userData.username} type="text" id='username' className='w-full p-2 rounded border border-gray-300 mt-1' placeholder='eg: Martin Joseph' />
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label htmlFor="email" className='block'>User Email</label>
                                                            <input onChange={(e) => setuserData({ ...userData, email: e.target.value })} value={userData.email} type="text" id='email' className='w-full p-2 rounded border border-gray-300 mt-1' placeholder='eg: martinJoseph@gmail.com' />
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label htmlFor="password" className='block'>User Password</label>
                                                            <input onChange={(e) => setuserData({ ...userData, password: e.target.value })} value={userData.password} type="text" id='password' className='w-full p-2 rounded border border-gray-300 mt-1' placeholder='eg: MartinJ123' />
                                                        </div>
                                                    </form>
                                                </div>
                                            </main>
                                            <hr className='text-gray-300' />
                                            <footer>
                                                <div className='flex mt-3 px-4 justify-end'>
                                                    <button type='button' onClick={resetData} className='py-2 px-4 bg-gray-300 rounded border border-gray-300 hover:bg-gray-400 cursor-pointer'><FontAwesomeIcon icon={faArrowsRotate} /> Reset</button>
                                                    <button onClick={handleSubmit} type='button' className='ms-3 py-2 px-4 bg-blue-300 rounded border border-blue-300 hover:bg-blue-400 cursor-pointer'><FontAwesomeIcon icon={faCheck} /> Create User</button>
                                                </div>

                                            </footer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <p className='text-xl text-center mt-14'>Login to get the access😥😥</p>
            }
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </>
    )
}

export default Adminusers