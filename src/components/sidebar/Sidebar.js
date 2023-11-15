import React from 'react';
import './sidebar.css'; 
import firebase from '../../firebase/firebase';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidCalendar, BiSolidTimer } from 'react-icons/bi';
import { FaTasks, FaStickyNote, FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { IoIosSettings } from 'react-icons/io';
import { toast } from 'react-toastify';

function Sidebar() {
    const logoutClicked = () => {
        firebase.authentication.signOut()
        .then(() => {
          toast.success("Logged out! ✅");
        })
        .catch(() => {
          toast.error("Something went wrong, please try again!");
        })
    }

    return (
        <div className="sidebar">
        <div className='user-account-icon'>
            <NavLink to="/app/account" className="account-icon">
            <FaRegUserCircle 
                size={32}
                color='#F6F3E4'/>
            </NavLink>
        </div>
        <div className='sidebar-container'>
            <div className='navlinks-active'>
                <NavLink to="/app/home" className="sidebar-icon" activeClassName="activePage"><AiFillHome size={24}/></NavLink>
                <NavLink to="/app/calendar" className="sidebar-icon" activeClassName="activePage"><BiSolidCalendar size={24}/></NavLink>
                <NavLink to="/app/tasks" className="sidebar-icon" activeClassName="activePage"><FaTasks size={24}/></NavLink>
                <NavLink to="/app/task-tracking" className="sidebar-icon" activeClassName="activePage"><BiSolidTimer size={30}/></NavLink>
                <NavLink to="/app/notes" className="sidebar-icon" activeClassName="activePage"><FaStickyNote size={24}/></NavLink>
            </div>
        </div>
        <div className='settings-icon'>
            <NavLink to="/app/settings" className="settings-icon">
            <IoIosSettings 
                size={36}
                color='#F6F3E4'/>
            </NavLink>
        </div>
        <div className='logout-icon' onClick={ logoutClicked }>
            <NavLink to="/home" className="logout-icon">
            <HiOutlineLogout 
                size={32}
                color='#F6F3E4'/>
            </NavLink>
        </div>
        </div>
    )
}

export default Sidebar;