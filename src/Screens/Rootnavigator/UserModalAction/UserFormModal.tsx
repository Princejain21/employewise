import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import CustomModal from "../../../CommonComponents/CustomModal";
import CustomButton from "../../../CommonComponents/CustomButton";
import { UpdatUserDetailsApi } from "../../../config/apiclient/Api";
import { statusCodeENUM } from "../../../config/utility/GlobalEnum";
import { toast } from "react-toastify";
import myString from "../../../config/utility/Mystring";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  updateRefresh: () => void;
  userData?: User;
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const UserFormModal: React.FC<UserFormProps> = ({ isOpen, onClose, userData,updateRefresh }) => {
  const [isloading,setisloading]=useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Update initial values when userData changes
  useEffect(() => {
    if (userData) {
      setInitialValues({
        firstName: userData.first_name || "",
        lastName: userData.last_name || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  const popHeader = () => {
    return (
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center">
          {userData && (
            <div className="d-flex align-items-center gap-2">
              <img
                src={userData?.avatar}
                loading="lazy"
                alt="..."
                className="img-fluid img-responsive rounded-circle"
                width="50"
                height="50"
              />
              <p className="text-center m-0 px-3 rounded">
                {myString.hello} {userData?.first_name + " " + userData?.last_name} ! 😊
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };


  return (
    <CustomModal
      position={true}
      showpopup={isOpen}
      props={{ classHeader: "align-items-center d-flex justify-content-between", popHeader }}
      onClose={onClose}
    >
      <h3 className="text-center mb-3">{myString.update_your_details}</h3>
      <Formik
        enableReinitialize
        initialValues={initialValues} // ✅ Ensuring form inputs get prefilled
        validationSchema={validationSchema}
        onSubmit={async(values, { resetForm }) => {
          console.log("Form Data:", values);
          const formadata={first_name:values.firstName,last_name:values.lastName,email:values.email};
          if(userData?.id){
              setisloading(true);
              const getdata= await UpdatUserDetailsApi(`/${userData?.id}`,formadata);
              if(getdata){
                const status=getdata[0];
                if(status===statusCodeENUM.SUCCESS){
                    toast.success("Update Successfully");
                    updateRefresh();
                    resetForm();  
                    onClose(); 
                }
              }
              setisloading(false);
          }
        }}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label className="form-label">{myString.first_name}</label>
              <Field name="firstName" className="form-control" />
              <ErrorMessage name="firstName" component="p" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">{myString.last_name}</label>
              <Field name="lastName" className="form-control" />
              <ErrorMessage name="lastName" component="p" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">{myString.email}</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="p" className="text-danger" />
            </div>
            <CustomButton isLoading={isloading} className="btn btn-primary"  type="submit"  loaderName="ClipLoader" color="#fff" label={myString.submit}/>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default UserFormModal;
