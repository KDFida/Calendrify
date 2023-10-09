import React, { useState, useEffect } from 'react';
import logo from '../../assets/CalendrifyLogo.svg';
import './topBar.css';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

function TopBar() {

    const [showHamburgerMenu, setHamburgerMenu] = useState(false);

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth > 768) {
                setHamburgerMenu(false);
            }
        };

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    const menuClicked = () => {
        if (window.innerWidth <= 768) {
            setHamburgerMenu(!showHamburgerMenu);
        }
    }


    return (
        <>
            <div className='navbar'>
                <div className='navbar-content'>
                    <div className='logo'>
                        <Link to="/home">
                            <img src={logo} className="App-logo" alt="logo" />
                        </Link>
                    </div>
                    <div className={`options ${showHamburgerMenu ? 'active' : ''}`}>
                        <Link to="/home" className='home-label' onClick={menuClicked}>Home</Link>
                        <Link to="/about-us" className='about-label' onClick={menuClicked}>About Us</Link>
                        <Link to="/contact-us" className='contact-label' onClick={menuClicked}>Contact Us</Link>
                        <Link to="/login" className='login-label' onClick={menuClicked}>Login</Link>
                    </div>

                    <div className='hamburger-menu' onClick={menuClicked}>
                        {showHamburgerMenu ? <i className='x-icon'><GrClose size={24}/></i> :
                            <GiHamburgerMenu 
                                size={30}
                            />
                        }
                    </div>
                </div>
            </div>
            <div className='banner'>
                <p className='banner-content'>Limited time offer: Calendrify is free to use. Don't miss out!</p>
            </div>
        </>
    )
}

export default TopBar;