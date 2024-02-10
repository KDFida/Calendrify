import React, {useState, useEffect} from 'react';
import './sidebar.css'; 
import firebase from '../../firebase/firebase';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidCalendar, BiSolidTimer } from 'react-icons/bi';
import { FaTasks, FaStickyNote, FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { IoIosSettings } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { toast } from 'react-toastify';

function Sidebar() {
    const [showMenu, setMenu] = useState(false);

    useEffect(() => {
      const resize = () => {
        if (window.innerWidth > 768) {
          setMenu(false);
        }
      };
  
      window.addEventListener('resize', resize);
  
      return () => {
        window.removeEventListener('resize', resize);
      };
    }, []);
  
    const clicked = () => {
      if (window.innerWidth <= 768) {
        setMenu(!showMenu);
      }
    }

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
            <div className='sidebar-container'>
                <div className={`navlinks-active${showMenu ? 'active' : ''}`}>
                    <div className='user-account-icon' onClick={ clicked }>
                        <NavLink to="/app/account" className="account-icon">
                        <FaRegUserCircle 
                            size={32}
                            color='#F6F3E4'/>
                        </NavLink>
                    </div>
                        <NavLink to="/app/home" className="sidebar-icon" activeClassName="activePage" onClick={ clicked } data-testid="home-link">
                          <AiFillHome size={24}/>
                        </NavLink>
                        <NavLink to="/app/calendar" className="sidebar-icon" activeClassName="activePage" onClick={ clicked } data-testid="calendar-link">
                          <BiSolidCalendar size={24}/>
                        </NavLink>
                        <NavLink to="/app/tasks" className="sidebar-icon" activeClassName="activePage" onClick={ clicked } data-testid="tasks-link">
                          <FaTasks size={24}/>
                        </NavLink>
                        <NavLink to="/app/task-tracking" className="sidebar-icon" activeClassName="activePage" onClick={ clicked } data-testid="task-tracking-link">
                          <BiSolidTimer size={30}/>
                        </NavLink>
                        <NavLink to="/app/notes" className="sidebar-icon" activeClassName="activePage" onClick={ clicked } data-testid="notes-link">
                          <FaStickyNote size={24}/>
                        </NavLink>
                    <div className='settings-icon' onClick={ clicked }>
                        <NavLink to="/app/settings" className="settings-icon" data-testid="settings-link">
                        <IoIosSettings 
                            size={36}
                            color='#F6F3E4'/>
                        </NavLink>
                    </div>
                    <div className='logout-icon' onClick={ logoutClicked }>
                        <NavLink to="/home" className="logout-icon" data-testid="logout-link">
                        <HiOutlineLogout 
                            size={32}
                            color='#F6F3E4'/>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="sidebar-hamburgerMenu" onClick={clicked}>
                {showMenu ?<GrClose size={24}/> : <GiHamburgerMenu size={30}/>}
            </div>
        </div>
    )
}

export default Sidebar;