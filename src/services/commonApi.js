import axios from "axios"


export const commonApi = async (httpReq, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpReq,
        url,
        data: reqBody,
        headers:reqHeader
    }

    return await axios(reqConfig).then((res) => {
        return res
    }).catch((error) => {
        return error
    })
}