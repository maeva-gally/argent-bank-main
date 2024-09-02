import { Routes, Route, Navigate  } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import ErrorPage from './pages/404/404.jsx';
import Profile from './pages/Profile/profile.jsx'
import './main.sass';
import { useSelector } from 'react-redux';

export default function App () {
  const isConnected = useSelector((state) => state.auth.isConnected);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route 
            path='profile' 
            element={isConnected ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}