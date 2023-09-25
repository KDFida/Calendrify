import logo from '../../assets/CalendrifyLogo.svg';
import './topBar.css';

function TopBar() {
    return (
        <>
        <div className='navbar'>
            <div className='navbar-content'>
                <div className='logo'>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className='options'>
                    <p className='options-text'>Home</p>
                    <p className='options-text'>About Us</p>
                    <p className='options-text'>Contact Us</p>
                    <p className='options-text'>Log in</p>
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