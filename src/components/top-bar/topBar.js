import logo from '../../assets/CalendrifyLogo.svg';
import './topBar.css';
import { Link } from 'react-router-dom';

function TopBar() {
    return (
        <>
        <div className='navbar'>
            <div className='navbar-content'>
                <div className='logo'>
                    <Link to="/home">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                </div>
                <div className='options'>
                    <Link to="/home" className='home-label'>Home</Link>
                    <Link to="/about-us" className='about-label'>About Us</Link>
                    <Link to="/contact-us" className='contact-label'>Contact Us</Link>
                    <Link to="/login" className='login-label'>Login</Link>
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