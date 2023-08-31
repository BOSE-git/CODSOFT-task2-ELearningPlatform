import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
    const disPatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const role = localStorage.getItem("role");
  return (
    <div className="navbar">
      <div className="logo">
        <h1>knowledge</h1>
      </div>
      <div className="nav-links">
        <ul>
          <Link to={"/"} className='link'><li>Courses</li></Link>
          {isLoggedIn && <Link to={"/myCourses"} className='link'><li>My Courses</li></Link>}
          {isLoggedIn && role === "Creator" && <Link to={"/addCourse"} className='link'><li>Add Course</li></Link>}
          {!isLoggedIn && <Link to={"/auth"} className='link'><li>Login?</li></Link>}
          {isLoggedIn && <Link to={"/auth"} className='link' onClick={() => disPatch(authActions.logout())}><li>Logout?</li></Link>}
        </ul>
      </div>
    </div>
  )
}

export default Header