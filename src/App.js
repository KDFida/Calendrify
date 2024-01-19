import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './landing-pages/home/home';
import AboutUs from './landing-pages/about-us/AboutUs';
import ContactUs from './landing-pages/contact-us/ContactUs';
import Login from './landing-pages/user-account/login/Login';
import Signup from './landing-pages/user-account/signup-page/Signup';
import ForgotPassword from './landing-pages/user-account/forgot-password/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import AppHome from './main-app/home/Home';
import AppCalendar from './main-app/calendar/Calendar';
import TaskTracking from './main-app/task-tracking/TaskTracking';
import Tasks from './main-app/tasks/Tasks';
import Notes from './main-app/notes/Notes';
import NewNote from './main-app/notes/NewNote';
import EditNote from './main-app/notes/EditNote';
import Account from './main-app/account/Account';
import Settings from './main-app/settings/Settings';
import BottomBar from './components/bottom-bar/bottomBar';
import TopBar from './components/top-bar/topBar';

function AppLayout({children}) {
  return (
    <div className="AppLayout">
      <div className="AppMainContent">
        {children}
      </div>
    </div>
  );
}

function AppContent() {
  const pagesToShow = ["/", "/home", "/about-us", "/contact-us", "/login", "/create-account", "/forgot-password"].includes(useLocation().pathname);
  return (
    <div className="App">
    {pagesToShow && <TopBar /> }
    <header className="App-content">
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-account' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/app/home" element={
          <AppLayout>
            <AppHome />
          </AppLayout>
        } />
        <Route path="/app/calendar" element={
          <AppLayout>
            <AppCalendar />
          </AppLayout>
        } />
        <Route path="/app/tasks" element={
          <AppLayout>
            <Tasks />
          </AppLayout>
        } />      
        <Route path="/app/task-tracking" element={
          <AppLayout>
            <TaskTracking />
          </AppLayout>
        } /> 
        <Route path="/app/notes" element={
          <AppLayout>
            <Notes />
          </AppLayout>
        } />
        <Route path="/app/account" element={
          <AppLayout>
            <Account />
          </AppLayout>
        } />
        <Route path="/app/settings" element={
          <AppLayout>
            <Settings />
          </AppLayout>
        } />

        <Route path="/app/notes/new-note" element={
          <AppLayout>
            <NewNote />
          </AppLayout>
        } />

        <Route path="/app/notes/edit/:noteId" element={
          <AppLayout>
            <EditNote />
          </AppLayout>
        } />

      </Routes>
    </header>
    { pagesToShow && <BottomBar /> }
    <ToastContainer />
  </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;