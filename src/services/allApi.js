

// =================================================================================================================
//   ----------------------------------------  Admin  ----------------------------------------

import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const loginApi = async(reqBody) =>{
    return commonApi('POST', `${serverUrl}/login`, reqBody)
}


// =================================================================================================================
//  -----------------------------------------------  Admin  -----------------------------------------------

export const registerApi = async(reqBody)=>{
    return commonApi('POST', `${serverUrl}/register`, reqBody)
}

export const allUsersApi = async() =>{
    return commonApi('GET', `${serverUrl}/all-users-registered`)
}

export const deleteUsersApi = async(id)=>{
    return await commonApi('DELETE', `${serverUrl}/delete-user/${id}`)
}

export const allUserTasksAdminApi = async() =>{
    return commonApi('GET', `${serverUrl}/all-user-tasks-admin`)
}

export const allUserTasksVisibilityUpdateApi = async(id, reqBody) =>{
    return commonApi('PUT', `${serverUrl}/user-tasks-visibility-update/${id}`, reqBody)
}

export const deleteTaskApi = async(id)=>{
    return await commonApi('DELETE', `${serverUrl}/delete-task/${id}`)
}

export const editTaskApi = async(id, reqBody) =>{
    return commonApi('PUT', `${serverUrl}/user-tasks-edit-admin/${id}`, reqBody)
}

// =================================================================================================================
//  -----------------------------------------------  Users  -----------------------------------------------

export const addTaskApi = async(reqBody)=>{
    return commonApi('POST', `${serverUrl}/add-task-user`, reqBody)
}

export const allUserSpecficTasksApi = async(userMail, reqBody) =>{
    return commonApi('GET', `${serverUrl}/user-specfic-tasks/${userMail}`, reqBody)
}

export const allUserTasksStatusUpdateApi = async(id, reqBody) =>{
    return commonApi('PUT', `${serverUrl}/user-specfic-tasks-update/${id}`, reqBody)
}
