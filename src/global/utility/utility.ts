import { toast } from "react-toastify";

export const getvaluefromlocalstorage=(str:string)=>{
    const getdata= localStorage.getItem(str);
    return getdata;
}
export const setvaluefromlocalstorage=(key:string,value:any)=>{
    if(checkExistancy(key)){alert("key not found");return };
    localStorage.setItem(key,value);
    return "done";
}

export const removeValuefromLocalStorage=(str:string)=>{
    if(checkExistancy(str)){return };
    localStorage.removeItem(str);
}


export const checkExistancy=(str:any)=>{
    return str===undefined||str===null||str===''||!str
}

export const showalertmessage=(type:string,message:string)=>{
    switch(type){
        case "warn":
            toast.warn(message);
            break;
        case "error":
            toast.error(message);
            break;
        case "success":
            toast.success(message);
            break;
        default: 
            return;
    }
}