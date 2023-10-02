import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './landing-pages/home/home';
import AboutUs from './landing-pages/about-us/AboutUs';
import ContactUs from './landing-pages/contact-us/ContactUs';
import Login from './landing-pages/user-account/login/Login';
import TopBar from './components/top-bar/topBar';
import BottomBar from './components/bottom-bar/bottomBar';
import Signup from './landing-pages/user-account/signup-page/Signup';
import ForgotPassword from './landing-pages/user-account/forgot-password/ForgotPassword';

function App() {
  return (
      <Router>
        <div className='App'>
            <TopBar />
            <div className='App-content'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/about-us' element={<AboutUs />} />
                    <Route path='/contact-us' element={<ContactUs />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/create-account' element={<Signup />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                </Routes>
            </div>
            <BottomBar />
        </div>
      </Router>
  );
}


export default App;
