import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, UserState } from "../Redux/UserSlice";
import Navbar from "../CommonComponents/Navbar";
import {getotken, getvaluefromlocalstorage } from "../global/utility/utility";

interface BypassProps {
  children: ReactNode|any;
}

const Bypass = ({ children }: BypassProps) => {
  const navigate = useNavigate()
  const dispatch=useDispatch();
  const token=useSelector<UserState>(state=>state.user.accessToken);
  useEffect(() => {
    getotken(navigate,dispatch)
    const fetchData=getvaluefromlocalstorage('user');
    if (fetchData) {
      const converittoobject = JSON.parse(fetchData);
      console.log('converittoobject', converittoobject)
      dispatch(setUser(converittoobject));
    }
    
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
