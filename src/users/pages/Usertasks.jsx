import React, { useEffect, useState } from 'react'
import Userheader from '../components/Userheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import Kanbanboard from '../components/Kanbanboard'
import { addTaskApi, allUserSpecficTasksApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'

function Usertasks() {
    const [refreshTick, setRefreshTick] = useState(0);
    const [updateStatus, setupdateStatus] = useState({})
    const [modalControl, setmodalControl] = useState(false)
    const [formData, setformData] = useState({
        title: "",
        description: "",
        dueDate: "",
        userMail:""
    });

    const [userMail, setuserMail] = useState("")
    const [allUserTasks, setallUserTasks] = useState([])
    const resetData = ()=>{
        setformData({...formData,
        title: "",
        description: "",
        dueDate: "",}
    )}

    const reloadTasks = () => setRefreshTick(t => t + 1);


    const handlereset = ()=>{
        resetData()
        setmodalControl(false)
    }
    

    const handleSubmit = async() => {
        const {title, description, dueDate, userMail} = formData
        if(!title || !description || !dueDate || !userMail){
            toast.info('Complete all the fields')
        }
        else{
            const result = await addTaskApi({title, description, dueDate, userMail})
            console.log(result);
            
            if(result.status == 200){
                toast.success('Task added Successfully')
                console.log(result.data);
                setupdateStatus(result)
                resetData()
                setmodalControl(false)
            }
            else if(result.status == 403){
                toast.warn(result.response.data)
            }
            else{
                toast.error('Oops! Something went wrong')
            }
        }
    };

    const getAllUserSpecfictasks = async(userMail)=>{
        const result = await allUserSpecficTasksApi(userMail)
        console.log(result);
        
        if(result.status == 200){
            setallUserTasks(result.data)
        }
    }
    console.log(allUserTasks);

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            const userdatas = JSON.parse(sessionStorage.getItem('existingUser'))
            setformData({...formData, userMail:userdatas.email})
            const userMail = userdatas.email
            getAllUserSpecfictasks(userMail)
            setuserMail(userdatas.email)
        }
    },[refreshTick, updateStatus])
    return (
        <>
            <Userheader />
            <div className='md:mx-20 mx-10 my-10'>
                <h1 className='font-bold md:text-2xl text-xl'>Your Tasks</h1>
                <div className='mt-10 p-2 md:flex justify-end'>
                    {/* <div className='flex max-w-2xl w-full rounded-md bg-gray-200 py-1 px-4 items-center'>
                        <label htmlFor="user_search"><FontAwesomeIcon icon={faSearch} /></label>
                        <input type="text" className='p-2 focus:outline-0 w-full' id='user_search' placeholder='search by name or email' />
                    </div> */}
                    <div className='md:mt-0 mt-5 md:block flex justify-center'>
                        <button onClick={() => setmodalControl(true)} className='bg-violet-500 py-2 px-3 rounded text-white border border-violet-500 hover:text-violet-500 hover:bg-white cursor-pointer'><FontAwesomeIcon icon={faAdd} className='me-2' /> Add Tasks</button>
                    </div>
                </div>
                <div className='mt-8'>
                    <Kanbanboard
                        tasks={allUserTasks}
                        onReload = {reloadTasks}
                    />
                </div>
            </div>

            {modalControl &&
                <div className="relative z-50" aria-labelledby="dialog-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            {/* changed min-h-full -> md:min-h-full */}
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className='bg-white p-4 '>
                                    <h3 className="text-lg font-semibold mb-3" id="dialog-title"> Add New Task</h3>
                                    <hr className='' />
                                    <form className="space-y-4 mt-3">
                                        {/* Title */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Title</label>
                                            <input type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" value={formData.title} onChange={(e) => setformData({...formData, title:e.target.value})} placeholder="Enter task title" />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Description</label>
                                            <textarea className="w-full border rounded px-3 py-2 h-24 resize-y focus:outline-none focus:ring" value={formData.description} onChange={(e) => setformData({...formData, description:e.target.value})} placeholder="Enter task description" />
                                        </div>

                                        {/* Status & Due Date */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* <div>
                                                <label className="block text-sm font-medium mb-1">Status</label>
                                                <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" value={form.status} onChange={(e) => update("status", e.target.value)} >
                                                    <option>Pending</option>
                                                    <option>In-progress</option>
                                                    <option>Completed</option>
                                                </select>
                                            </div> */}

                                            <div>
                                                <label className="block text-sm font-medium mb-1">Due Date</label>
                                                <input type="date" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" value={formData.dueDate} onChange={(e) => setformData({...formData, dueDate:e.target.value})} />
                                            </div>
                                        </div>
                                        <hr className='mt-3' />
                                        {/* Actions */}
                                        <div className="mt-3 bg-gray-50 px-6 -mx-6 flex justify-end gap-3">
                                            <button onClick={handlereset} type="button" className="px-4 py-2 rounded border border-gray-200 hover:bg-gray-300 bg-gray-200 cursor-pointer">Cancel</button>
                                            <button type="button" onClick={handleSubmit} className="px-4 py-2 rounded text-white bg-amber-500 border border-amber-500 hover:text-amber-500 hover:bg-white cursor-pointer">Add Task</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />


        </>
    )
}

export default Usertasks