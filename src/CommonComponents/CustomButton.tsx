import React from "react";
import CustomLoader from "./CustomLoader";

type CustomButtonProps = {
  label: any;
  onClick?: () => void;
  className?:string;
  style?:any;
  isLoading?:boolean;
  color?:string;
  loaderName?:string;
  [key:string]:any;
};

const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const { label, className,style,size,isLoading,loaderName ,color}=props;
  return (
    <button 
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ${className}`}
      style={style}
      {...props}
    >
      {isLoading?<CustomLoader loading={isLoading} name={loaderName||"loaderName"} size={size||20} color={color||'black'}/>:label}
    </button>
  );
};

export default CustomButton;
