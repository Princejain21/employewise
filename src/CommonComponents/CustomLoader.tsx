import React from "react";
import { ClipLoader, MoonLoader, PuffLoader } from "react-spinners";

type LoaderProps = {
  loading: boolean;
  size?: number;
  color?: string;
  name?:string;
  speed?:number
};

const CustomLoader: React.FC<LoaderProps> = ({ loading, size = 60, color = "#3498db",name,speed }) => {
  console.log('button par loader2',name)

 const renderLoaderBehalfonName=()=>{
    switch(name){
        case "puffloader":
            return (<PuffLoader loading={loading} size={size} color={color} />)
        case "MoonLoader":
            return (<MoonLoader color={color} size={size} speedMultiplier={speed||1}/>)
        case "ClipLoader":
            return (<ClipLoader color={color} size={size} speedMultiplier={speed||1}/>)
        default:
            return null;
    }
 }

  return (
    <div className="flex items-center justify-center h-full">
      {renderLoaderBehalfonName()}
    </div>
  );
};

export default CustomLoader;
