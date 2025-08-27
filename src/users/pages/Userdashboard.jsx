import React, { useEffect, useState } from 'react'
import Userheader from '../components/Userheader'
import { allUserTasksAdminApi } from '../../services/allApi';

function Userdashboard() {
  const [allUserTasks, setallUserTasks] = useState([])
  const [userMail, setuserMail] = useState("")
  const [token, settoken] = useState("")
  const allSharedTasks = async () => {
    const result = await allUserTasksAdminApi()
    console.log(userMail);

    const allDatasShared = result.data.filter((items) => items.userMail == userMail || items.visibility == 'Shared')

    console.log(allDatasShared);

    setallUserTasks(allDatasShared)
  }

  console.log(allUserTasks);
  const fmtDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString() : "-";
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      settoken(sessionStorage.getItem('token'))
      const userdatas = JSON.parse(sessionStorage.getItem('existingUser'))
      const userMail = userdatas.email
      setuserMail(userMail)
    }
  }, [userMail])
  useEffect(() => {
    allSharedTasks()

  }, [userMail])
  return (

    <>
      <Userheader />

      {token ?
        <div className='md:mx-20 my-12 mx-10'>
          {
            allUserTasks?.length > 0 ?
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">Title</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-center">Status</th>
                      <th className="p-2 text-center">Due Date</th>
                      <th className="p-2 text-center">User</th>
                      <th className="p-2 text-center">Visibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUserTasks?.map((t) => (
                      <tr key={t._id} className="border-t">
                        <td className="p-2 font-medium">{t.title}</td>
                        <td className="p-2 text-sm text-gray-700">{t.description}</td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="p-2 text-center">{fmtDate(t.dueDate)}</td>
                        <td className="p-2 text-center">{t.userMail}</td>
                        <td className="p-2 text-center capitalize">{t.visibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              :
              <p>No data available</p>
          }
        </div>
        :
        <p className='text-xl text-center mt-14'>Login to get the access😥😥</p>
      }
    </>

  )
}

export default Userdashboard