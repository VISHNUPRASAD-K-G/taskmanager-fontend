import React, { useState } from 'react'
import { loginApi } from '../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Auth() {
    const navigate = useNavigate()
    const [userData, setuserData] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async () => {
        const { email, password } = userData
        if (!email || !password) {
            toast.info('Please complete all the fields.')
        }
        else if (email.split('@').length !== 2) {
            toast.info('Please enter a valid email.')
        }
        else {
            const result = await loginApi({ email, password })
            if (result.status == 200) {
                toast.success('user login successful.')
                sessionStorage.setItem('token', result.data.token)
                sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser))
                if(result.data.existingUser.role == 'admin'){
                    navigate('/admin-dashboard')
                }
                else{
                    navigate('/user-dashboard')
                }
            }
            else if (result.status == 406 || result.status == 403) {
                toast.warn(result.response.data)
            }
            else {
                toast.error("something went wrong")
            }
            setuserData({
                email: '',
                password: ''
            })
        }
    }

    return (
        <>
            <div className='px-10'>
                <div className="flex min-h-screen items-center justify-center bg-gray-100 flex-col">
                    <div className='bg-white shadow-md rounded-xl p-6 w-full max-w-sm flex flex-col'>
                        <img src="app-logo.png" alt="app-logo" className='h-48' />
                        <form className="">
                            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                            <input type="email" placeholder="Email" value={userData.email} onChange={(e) => setuserData({ ...userData, email: e.target.value })} className="w-full border border-gray-200 px-3 py-2 mb-3 rounded-lg" />
                            <input type="password" placeholder="Password" value={userData.password} onChange={(e) => setuserData({ ...userData, password: e.target.value })} className="w-full border border-gray-200 px-3 py-2 mb-4 rounded-lg" />
                            <button type="button" onClick={handleLogin} className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 cursor-pointer">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default Auth
