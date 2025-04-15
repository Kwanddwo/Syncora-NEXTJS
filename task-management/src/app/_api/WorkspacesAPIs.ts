import axios from 'axios'
import {WorkspaceCreateRequest} from "@/types";
const CREATE_WORKSPACE_API="http://localhost:3001/api/workspace/create";

export const createWorkspaceAPI = async(workspace : WorkspaceCreateRequest) => {
    const token = localStorage.getItem("token");
        try{
            const response=await axios.post(CREATE_WORKSPACE_API,{
                name : workspace.name,
                description : workspace.description,
                isPersonal : workspace.isPersonal
            },{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        }catch(error){
            console.log("Error in the REST API :",error)
        }
}