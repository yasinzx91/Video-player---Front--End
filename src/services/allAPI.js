import { commonAPI } from "./commomAPI"
import { serverUrl } from "./serverUrl"

//upload videos

//api to upload video
export const uploadAllVideos = async(reqBody)=>{
   return await commonAPI('POST',`${serverUrl}/videos`,reqBody)
}

//api to get video
export const getAllVideos = async()=>{
    return await commonAPI('GET',`${serverUrl}/videos`,'')
}

//api to delete video
export const deleteVideo = async(id)=>{
    return await commonAPI('DELETE',`${serverUrl}/videos/${id}`,{})
}

//api to add history
export const addToHistory = async(videoDetails)=>{
    return await commonAPI('POST',`${serverUrl}/history`,videoDetails)
}

//api to get history
export const getAllHistory = async()=>{
    return await commonAPI('GET',`${serverUrl}/history`,"")
}

//api to delete history
export const deleteHistory = async(id)=>{
    return await commonAPI('DELETE',`${serverUrl}/history/${id}`,{})
}

//api to add catagory
export const addToCatagory = async(body)=>{
    return await commonAPI('POST',`${serverUrl}/category`,body)
}


//api to get catagory
export const getAllCatagory = async()=>{
    return await commonAPI('GET',`${serverUrl}/category`,"")
}

//api to delete the catagory
export const deleteCatagory = async(id)=>{
    return await commonAPI('DELETE',`${serverUrl}/category/${id}`,{})
}

//api to get data of an specific video
export const getVideoDetails = async(id)=>{
    return await commonAPI('GET',`${serverUrl}/videos/${id}`,"")
}

//to add category
export const updateCategory = async(id,body)=>{
    return await commonAPI('PUT',`${serverUrl}/category/${id}`,body)
}
