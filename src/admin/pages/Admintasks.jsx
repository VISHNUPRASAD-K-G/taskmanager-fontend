import React, { useEffect, useState } from 'react'
import Adminheader from '../components/Adminheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faCircleCheck, faGear, faSearch, faTrash, faEdit, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { allUserTasksAdminApi, allUserTasksVisibilityUpdateApi, deleteTaskApi, editTaskApi } from '../../services/allApi'

function Admintasks() {
    const [modalControl, setmodalControl] = useState(false)
    const [allUserTasks, setallUserTasks] = useState([])
    const [token, settoken] = useState("")
    const [updateStatus, setupdateStatus] = useState({})
    const [editingTasks, seteditingTasks] = useState({})
    const [tempEdit, settempEdit] = useState({})


    const allTasks = async () => {
        const result = await allUserTasksAdminApi()
        if (result.status == 200) {
            setallUserTasks(result.data)
        }
    }

    const setVisibility = async (id, visibility) => {
        const newvisibility = visibility == 'private' ? 'Shared' : 'private'
        const result = await allUserTasksVisibilityUpdateApi(id, { visibility: newvisibility })
        if (result.status == 200) {
            setupdateStatus(result)
        }
        // const result = 
    }

    const deleteTask = async (id) => {
        const result = await deleteTaskApi(id)
        if (result.status == 200) {
            setupdateStatus(result)
        }
    };

    const editTask =  (id) => {
        const editingTask = allUserTasks.find((item) => item._id === id)
        seteditingTasks(editingTask)
        settempEdit(editingTask)
        setmodalControl(true)
    }

    const handleEdit = async () => {
        const { title, description, dueDate, status, _id } = tempEdit
        console.log(title, description, dueDate, status, _id);
        console.log(tempEdit);
        
        if (!title || !description || !dueDate) {
            toast.info('Complete all the fields')
        }
        else {
            const id = _id
            const result = await editTaskApi(id, { title, description, dueDate, status, _id })
            if (result.status == 200) {
                setupdateStatus(result)
                setmodalControl(false)
                seteditingTasks({})
                settempEdit({})
            }
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            settoken(sessionStorage.getItem('token'))
            allTasks()
        }
    }, [updateStatus])

    return (
        <>
            <Adminheader />
            <div className="md:mx-20 mx-10 my-10">
                <h1 className='font-bold md:text-2xl text-xl'>Task Management</h1>
                <p>Admin! You can manage all the tasks here!!</p>

                {/* Stats Section */}
                {token ?
                    <div>
                        <div className='mt-10 grid md:grid-cols-4 gap-5'>
                            <div className='rounded border border-gray-200 shadow py-3 px-5 grid grid-cols-2'>
                                <div>
                                    <h1 className='font-bold text-xl text-center'>Total Tasks</h1>
                                    <h1 className='font-bold text-2xl text-center'>{allUserTasks.length}</h1>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p className='text-2xl text-blue-500'><FontAwesomeIcon icon={faGear} /></p>
                                </div>
                            </div>
                            <div className='rounded border border-gray-200 shadow py-3 px-5 grid grid-cols-2'>
                                <div>
                                    <h1 className='font-bold text-xl text-center'>Completed</h1>
                                    <h1 className='font-bold text-2xl text-center'>{allUserTasks.filter(t => t.status === "Done").length}</h1>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p className='text-2xl text-green-500'><FontAwesomeIcon icon={faCircleCheck} /></p>
                                </div>
                            </div>
                            <div className='rounded border border-gray-200 shadow py-3 px-5 grid grid-cols-2'>
                                <div>
                                    <h1 className='font-bold text-xl text-center'>Active</h1>
                                    <h1 className='font-bold text-2xl text-center'>{allUserTasks.filter(t => t.status === "pending" || t.status === "In-progress").length}</h1>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p className='text-2xl text-blue-500'><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></p>
                                </div>
                            </div>
                            <div className='rounded border border-gray-200 shadow py-3 px-5 grid grid-cols-2'>
                                <div>
                                    <h1 className='font-bold text-xl text-center'>Overdue</h1>
                                    <h1 className='font-bold text-2xl text-center'>{allUserTasks.filter(t => new Date(t.dueDate) < new Date()).length}</h1>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p className='text-2xl text-red-500'><FontAwesomeIcon icon={faGear} /></p>
                                </div>
                            </div>
                        </div>

                        {/* Task Table */}
                        {allUserTasks?.length > 0 ?
                            <div className="mt-10 overflow-x-auto">
                                <table className="w-full border border-gray-200 rounded-lg shadow">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 text-left">Title</th>
                                            <th className="p-2 text-left">Description</th>
                                            <th className="p-2">Status</th>
                                            <th className="p-2">Due Date</th>
                                            <th className="p-2">User</th>
                                            <th className="p-2">Visibility</th>
                                            <th className="p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUserTasks?.map((task, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="p-2">{task.title}</td>
                                                <td className="p-2 text-sm text-gray-600">{task.description}</td>
                                                <td className="p-2 text-center">
                                                    <span className={`px-2 py-1 rounded text-white text-xs 
                                                    ${task.status === "pending" ? "bg-yellow-500" :
                                                            task.status === "In-progress" ? "bg-blue-500" : "bg-green-500"}`}>
                                                        {task.status}
                                                    </span>
                                                </td>
                                                <td className="p-2 text-center">{task.dueDate}</td>
                                                <td className="p-2 text-center">{task.userMail}</td>
                                                <td className="p-2 text-center">
                                                    {task.visibility === "private"
                                                        ? <span className="text-red-500">Private</span>
                                                        : <span className="text-green-600">Shared</span>}
                                                </td>
                                                <td className="p-2 flex gap-3 justify-center">
                                                    <button type='button' onClick={() => editTask(task._id)} className="hover:text-blue-500 cursor-pointer"><FontAwesomeIcon icon={faEdit} /></button>
                                                    <button className="hover:text-red-500 cursor-pointer" onClick={() => deleteTask(task._id)}><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button type='button' className="hover:text-gray-600 cursor-pointer" onClick={() => { setVisibility(task._id, task.visibility) }}>
                                                        {task.visibility === "private" ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <p className='my-14 text-center text-xl'>No tasks...</p>
                        }
                    </div>
                    :
                    <p className='text-xl text-center mt-14'>Login to get the access😥😥</p>
                }
            </div>
            {modalControl &&
                <div className="relative z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            {/* changed min-h-full -> md:min-h-full */}
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className='bg-white p-4 '>
                                    <h3 className="text-lg font-semibold mb-3" id="dialog-title"> Edit Task</h3>
                                    <hr className='' />
                                    <form className="space-y-4 mt-3">
                                        {/* Title */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Title</label>
                                            <input type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" value={tempEdit.title} onChange={(e) => settempEdit({ ...tempEdit, title: e.target.value })} placeholder="Enter task title" />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Description</label>
                                            <textarea className="w-full border rounded px-3 py-2 h-24 resize-y focus:outline-none focus:ring" value={tempEdit.description} onChange={(e) => settempEdit({ ...tempEdit, description: e.target.value })} placeholder="Enter task description" />
                                        </div>

                                        {/* Status & Due Date */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Status</label>
                                                <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" value={tempEdit.status} onChange={(e) => settempEdit({ ...tempEdit, status: e.target.value })} >
                                                    <option value='pending'>Pending</option>
                                                    <option value='In-progress'>In-progress</option>
                                                    <option value='Done'>Done</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-1">Due Date</label>
                                                <input type="date" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" value={tempEdit.dueDate} onChange={(e) => settempEdit({ ...tempEdit, dueDate: e.target.value })} />
                                            </div>
                                        </div>
                                        <hr className='mt-3' />
                                        {/* Actions */}
                                        <div className="mt-3 bg-gray-50 px-6 -mx-6 flex justify-end gap-3">
                                            <button onClick={() => setmodalControl(false)} type="button" className="px-4 py-2 rounded border border-gray-200 hover:bg-gray-300 bg-gray-200 cursor-pointer">Cancel</button>
                                            <button onClick={handleEdit} type="button" className="px-4 py-2 rounded text-white bg-amber-500 border border-amber-500 hover:text-amber-500 hover:bg-white cursor-pointer">Edit Task</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Admintasks
