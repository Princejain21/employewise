import React from "react";
import CustomLoader from "./CustomLoader";

type CustomButtonProps = {
  label: any;
  onClick?: () => void;
  className?:string;
  style?:any;
  isloading?:boolean;
  color?:string;
  loadername?:string;
  [key:string]:any;
};

const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const { label, className,style,size,isloading,loadername ,color}=props;
  return (
    <button 
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ${className}`}
      style={style}
      {...props}
    >
      {isloading?<CustomLoader loading={isloading} name={loadername||"loadername"} size={size||20} color={color||'black'}/>:label}
    </button>
  );
};

export default CustomButton;
