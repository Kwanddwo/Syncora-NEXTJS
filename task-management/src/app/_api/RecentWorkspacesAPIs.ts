import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const CREATE_RECENT_WORKSPACE_API = `${API_URL}/api/recentWorkspace/create`;
const GET_RECENT_WORKSPACE_API = `${API_URL}/api/recentWorkspace/recent`;
const DELETE_RECENT_WORKSPACE_API = `${API_URL}/api/recentWorkspace/delete`;
const CLEAR_RECENT_WORKSPACE_API = `${API_URL}/api/recentWorkspace/clear`;

export const createRecentWorkspaceAPI = async (workspaceId:string,userId:string) => {
    try{
        const response = await axios.post(CREATE_RECENT_WORKSPACE_API,{workspaceId,userId});
        return response;
    }catch(error){
        console.error("Error while creating recent workspace :",error);
    }
}

export const deleteRecentWorkspaceAPI = async (workspaceId:string,userId:string) => {
    try{
        const response = await axios.delete(DELETE_RECENT_WORKSPACE_API,{
            data :{workspaceId,userId}
        });
        return response.data;
    }catch(error){
        console.error("Error while creating recent workspace :",error);
    }
}
export const getRecentWorkspaceAPI = async (userId:string) => {
    try{
        const response = await axios.post(GET_RECENT_WORKSPACE_API,{userId});
        return response.data;
    }catch(error){
        console.error("Error while creating recent workspace :",error);
    }
}

export const clearRecentWorkspaceAPI = async (userId:string) => {
    try{
        const response = await axios.delete(CLEAR_RECENT_WORKSPACE_API,{
            data :{userId}
        });
        return response;
    }catch(error){
        console.error("Error while creating recent workspace :",error);
    }
}
