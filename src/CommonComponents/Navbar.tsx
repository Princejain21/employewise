import React from 'react'
import { removeValuefromLocalStorage } from '../global/utility/utility'
import { useDispatch, useSelector } from 'react-redux'
import { setAccessToken, setUser, UserState } from '../Redux/UserSlice';
import { Link } from 'react-router-dom';

const Navbar:React.FC = () => {
const email=useSelector((state:UserState)=>state.user.user.email);
const dispatch=useDispatch();
const handleLogout=()=>{
removeValuefromLocalStorage("userToken");
removeValuefromLocalStorage("user");
dispatch(setAccessToken(''));
dispatch(setUser({}));
}

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand font-weight-bold text-primary" to='/home' >GGSL</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <span className='nav-link'>Home</span>
      </li>
    </ul>
    <p className='font-weight-bold text-success mb-0 mr-2 text-capitalize'>{email}</p>
    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
  </div>
</nav>
  )
}

export default Navbar
