import React from 'react'
import { removeValuefromLocalStorage } from '../global/utility/utility'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../Redux/UserSlice';
import { Link } from 'react-router-dom';

const Navbar:React.FC = () => {
const dispatch=useDispatch();
const handleLogout=()=>{
removeValuefromLocalStorage("userToken");
dispatch(setAccessToken(''));
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
    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
  </div>
</nav>
  )
}

export default Navbar
