import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken, UserState } from "../Redux/UserSlice";
import Navbar from "../CommonComponents/Navbar";
import { checkExistancy, getvaluefromlocalstorage } from "../global/utility/utility";

interface BypassProps {
  children: ReactNode|any;
}

const Bypass = ({ children }: BypassProps) => {
  const navigate = useNavigate()
  const dispatch=useDispatch();
  const token=useSelector<UserState>(state=>state.user.accessToken);
  const getotken=async()=>{
    const checkToken:any=await getvaluefromlocalstorage('userToken');
    if(checkExistancy(checkToken)){
      navigate('/');
    }else{
      dispatch(setAccessToken(checkToken));
      navigate('/home');
    }
  }
  useEffect(() => {
    getotken();
    //Here you can perform the global action like:
    // - Analytics
    // - User Authentication Check
    // - Theme Handling, etc.
  }, [token]);
  return <>
  {token?<Navbar/>:null}
  {children}
  </>;
};

export default Bypass;
