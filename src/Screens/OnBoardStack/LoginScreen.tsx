import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../../CSS/componentSpecificCSS/Login.module.css";
import myString from "../../config/utility/Mystring";
import { FaUser } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { Login_api } from "../../config/apiclient/Api";
import { useDispatch, useSelector } from "react-redux";
import {setAccessToken, setUser, UserState} from '../../Redux/UserSlice'
import { getotken, setvaluefromlocalstorage } from "../../global/utility/utility";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const LoginScreen: React.FC = () => {
  const token=useSelector<UserState>(state=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [showtitle,setshowTitle]=useState<boolean>(false);
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit:async (values) => {
      const finaldata=await Login_api(values);
      if(finaldata){
        const status=finaldata[0];
        const data=finaldata[1];
        // perform the action when api success
        if(status===200){
          if(data.token){
            setvaluefromlocalstorage("userToken",data.token);
            setvaluefromlocalstorage("user",JSON.stringify({email:values.email}));
            dispatch(setAccessToken(data.token));
            dispatch(setUser({email:values.email}))
          }
        }else{
          console.log(data);
        }
      }
    },
  });
  useEffect(()=>{
    getotken(navigate,dispatch)
  },[])
  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" theme="light"/>
      {<h4 className="text-center text-white mb-5 font-weight-bold" style={{visibility:showtitle?'visible':"hidden"}}> {myString.welcome_message}</h4>}
      <div className={styles.form_container} onMouseEnter={()=>{setshowTitle(true)}} onMouseLeave={()=>setshowTitle(false)}>
        <h2 className="text-white font-weight-bold">{myString.login}</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="w-100 justify-content-center align-items-center d-flex flex-column"
        >
          {/* Email Input */}
          <div className="mb-4 w-100">
            <div className={styles.input_container}>
              <input
                type="email"
                name="email"
                placeholder="Username"
                className={styles.input}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FaUser size={20} color="#fff" />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger font-weight-bold text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 w-100">
            <div className={styles.input_container}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.input}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <IoLockClosed size={20} color="#fff" />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger font-weight-bold text-sm">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className={`btn ${styles.submit_btn}`} disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
