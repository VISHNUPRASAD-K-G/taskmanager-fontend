import React, { useEffect, useState } from 'react'
import Adminheader from '../components/Adminheader'
import { allUsersApi, allUserTasksAdminApi } from '../../services/allApi'
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Admindashboard() {
  const [totalUsers, settotalUsers] = useState("")
  const [totalTasks, settotalTasks] = useState("")

  const allTasks = async () => {
    const result = await allUserTasksAdminApi()
    if (result.status == 200) {
      settotalTasks(result.data.length)
    }
  }

  const getAllUsers = async () => {
    const result = await allUsersApi()
    if (result.status == 200) {
      settotalUsers(result.data.length)
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      allTasks()
      getAllUsers()
    }
  }, [])
  return (
    <>
      <Adminheader />
      <div className='md:px-20 px-10'>
        <div className='mt-10 grid md:grid-cols-2 gap-5'>
          <div className='rounded border border-gray-200 shadow py-3 px-5 grid grid-cols-2'>
            <div>
              <h1 className='font-bold text-xl text-center'>Total Tasks</h1>
              <h1 className='font-bold text-2xl text-center'>{totalTasks || 0}</h1>
            </div>
            <div className='flex justify-center items-center'>
              <p className='text-2xl text-blue-500'><FontAwesomeIcon icon={faGear} /></p>
            </div>
          </div>
          <div className='rounded border border-gray-200 shadow py-3 px-5 grid grid-cols-2'>
            <div>
              <h1 className='font-bold text-xl text-center'>Total Tasks</h1>
              <h1 className='font-bold text-2xl text-center'>{totalUsers || 0}</h1>
            </div>
            <div className='flex justify-center items-center'>
              <p className='text-2xl text-green-500'><FontAwesomeIcon icon={faUsers} /></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admindashboard