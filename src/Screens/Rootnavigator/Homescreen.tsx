import React,{useCallback, useEffect, useState} from 'react'
import { DeleteUserDetailsApi, getUserList } from '../../config/apiclient/Api';
import { statusCodeENUM } from '../../config/utility/GlobalEnum';
import CustomLoader from '../../CommonComponents/CustomLoader';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri"
import UserFormModal from './UserModalAction/UserFormModal';
import { ToastContainer } from 'react-toastify';
import { showalertmessage } from '../../global/utility/utility';
import CustomButton from '../../CommonComponents/CustomButton';
import myString from '../../config/utility/Mystring';
interface Homeprops{
    
}
interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar:string;
  email: string;
}

const Homescreen:React.FC<Homeprops> = () => {
  const [isloading,setisloading]=useState<boolean>(true);
  const [page,setpage]=useState<number>(1);
  const [totalpages,settotalPages]=useState<number>(0)
  const [userList,setuserList]=useState<User[]>([]);
  const [copyuserList,setcopyuserList]=useState<User[]>([]);
  const [refresh,setrefresh]=useState<boolean>(false);
  const [EditUsermodal,setEditUserModal]=useState<boolean>(false);
  const [isDeleteLoading,setisDeleteLoading]=useState<boolean>(false);
  const closeEditModal=()=>setEditUserModal(false);
  const [searchText,setsearchText]=useState<string>("");
  const [currentUser,setcurrentUser]=useState<User>();
  const updateRefresher=()=>{setrefresh(!refresh)};



  //API SECTION

  //fetch the user list
  const fetchuser=async()=>{
    setisloading(true);
    const data=await getUserList({page});
    if(data){
      const status=data[0];
      const finalData=data[1];
      if(status===statusCodeENUM.SUCCESS){
        setuserList(finalData?.data)
        setcopyuserList(finalData?.data)
        settotalPages(finalData?.total_pages);
      }
      setisloading(false);
    }
  }

  //LOGIC SECTION

  // handle pagination items.
  const handlePageClick=(currentpage:number)=>{
    if(page!==currentpage){
      setcopyuserList([]);
      setuserList([]);
      setsearchText('')
    }
    setpage(currentpage);
  }

  //handle the Update details functionality.
  const handleEdit=(user:User)=>{
    setcurrentUser(user);
    setEditUserModal(true);
  }

  const handleSearch=(str:string)=>{
    setsearchText(str);
    if(str===''){
      setcopyuserList(userList);
      return
    }
    const filteruser=userList.filter((o: User) => 
      o.first_name.toLowerCase().includes(str.toLowerCase()) ||
      o.last_name.toLowerCase().includes(str.toLowerCase()) ||
      o.email.toLowerCase().includes(str.toLowerCase())
    );
    setcopyuserList(filteruser);
  }
  //handle the Delete operation

  const handleDelete=async(user:User)=>{
    setcurrentUser(user);
    setisDeleteLoading(true);
    const data=await DeleteUserDetailsApi(`/${user.id}`);
    if(data){
      const status=data[0];
      if(status===statusCodeENUM.SUCCESS||status===statusCodeENUM.NO_CONTENT){
        showalertmessage('success','Delete Successfully');
        updateRefresher();
      }
    }
    setisDeleteLoading(false);
  }


  // UI SECTION
// Render the user list
  const renderList=useCallback(()=>{
    return (
      <div className="table-responsive" style={{minHeight:"50vh"}}>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>S.NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {copyuserList.map((user:User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={user?.avatar}
                    loading="lazy"
                    alt="..."
                    className="img-fluid img-responsive rounded-circle"
                    width="50"
                    height="50"
                  />
                  <p className=" text-center m-0  px-3 rounded">
                    {user?.first_name + " " + user?.last_name}
                  </p>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <div className='d-flex align-items-center justify-content-center'>
                  <CustomButton isLoading={false} loaderName='ClipLoader' className='border-0 pointer btn mr-2' onClick={()=>handleEdit(user)}  label={<FaRegEdit size={20} color='green'/>}/>
                  <CustomButton isLoading={isDeleteLoading} loaderName='ClipLoader' className='border-0 pointer btn' onClick={()=>handleDelete(user)}  label={<RiDeleteBin5Line size={20} color='red'/>}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  },[userList,copyuserList,totalpages])


  // LIFECYLE METHODS
  useEffect(()=>{
    fetchuser();
  },[page,refresh])
  return (
     <div className="container mt-4">
      <ToastContainer position='top-center' theme="colored"/>
      <div className='d-flex align-items-center justify-content-between flex-wrap'>
      <h3 className="text-center mb-4">User List</h3>
      <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" value={searchText} onChange={(e)=>{handleSearch(e.target.value)}} placeholder="Search" aria-label="Search"/>
    </form>
      </div>
      <div className='d-flex align-items-center justify-content-center flex-column' style={{minHeight:'30vh'}}>
        {isloading?<CustomLoader loading={isloading} name='MoonLoader' size={40} color='#000' speed={0.5} /> :copyuserList.length===0?<h2 className='text-black text-center font-weight-bolt '>{myString.no_data_found}</h2>:renderList()}
        <nav className="w-100 justify-content-end d-flex">
          <ul className="pagination">
            {Array.from({ length: totalpages }, (_, index) => (
              <li key={index + 1} className={`page-item ${page===(index+1)?'active':''}`}>
                <button className={"page-link active"} onClick={()=>{handlePageClick(index+1)}}>{index + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <UserFormModal updateRefresh={updateRefresher} userData={currentUser} isOpen={EditUsermodal} onClose={closeEditModal}/>
    </div>
  )
}

export default Homescreen
