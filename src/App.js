import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './landing-pages/home/home';
import AboutUs from './landing-pages/about-us/AboutUs';
import ContactUs from './landing-pages/contact-us/ContactUs';
import Login from './landing-pages/login/Login';

function App() {
  return (
      <Router>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/contact-us' element={<ContactUs />} />
              <Route path='/login' element={<Login />} />
          </Routes>
      </Router>
  );
}


export default App;
