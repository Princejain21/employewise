import { toast } from "react-toastify";
import Axios from "./Apiclient";
import Endpoints from "./Endpoints";
import { showalertmessage } from "../../global/utility/utility";
import { statusCodeENUM } from "../utility/GlobalEnum";

export const Login_api=async(data:{email:any,password:any},headers={})=>{
    try {
        const response=await Axios.post(Endpoints.login,data,{headers});
        return [response.status,typeof(response.data)==='string'?JSON.parse(response.data):response.data]
    } catch (error:any) {
        console.log(error);
        toast.error('Authetication error with statucode: '+error?.response?.status)
    }
}
export const getUserList=async(params={},headers={})=>{
    try {
        const response=await Axios.get(Endpoints.get_user_api,{headers,params});
        return [response.status,typeof(response.data)==='string'?JSON.parse(response.data):response.data]
    } catch (error:any) {
        console.log(error);
        toast.error('Authetication error with statucode: '+error?.response?.status)
    }
}


export const UpdatUserDetailsApi=async( endpoint:any,data:any,headers={})=>{
    try {
        const response=await Axios.put(Endpoints.get_user_api+`${endpoint||""}`,data,{headers});
        return [response.status,typeof(response.data)==='string'?JSON.parse(response.data):response.data]
    } catch (error:any) {
        console.log(error);
        toast.error('Authetication error with statucode: '+error?.response?.status)
    }
}
export const DeleteUserDetailsApi=async( endpoint:any,headers={})=>{
    try {
        const response=await Axios.delete(Endpoints.get_user_api+`${endpoint||""}`,{headers});
        return [response.status,response?.data]
    } catch (error:any) {
        console.log(error,error?.response);
        if(error?.response?.status===statusCodeENUM.NO_CONTENT){
            showalertmessage('success',"Delete Successfully");
        }else{
            showalertmessage('error','Authetication error with statucode: '+error?.response?.status)
        }
    }
}