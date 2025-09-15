import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import CreateAccount from './Pages/CreateAccount';
import Homepage from './Pages/Homepage';
import AddPlace from './Pages/AddPlace';
import CardView from './Pages/CardView';
import Login from './Pages/Login';
import { useEffect, useState } from 'react';
import Dashboard from './Pages/Dashboard';
import Footer from './Components/Footer';


function App() {
  const [isLoggedIn, setIsloggedin] = useState(false)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKENDURL}check-login`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setIsloggedin(data.loggedIn);
      })  
      .catch(() => {
        setIsloggedin(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
    


      <Navbar isLoggedIn={isLoggedIn} setIsloggedin={setIsloggedin} />
      <Routes>
        <Route path='/' element={<Homepage isLoggedIn={isLoggedIn} />} />
        <Route path='/dashboard' element={<Dashboard isLoggedIn={isLoggedIn} setIsloggedin={setIsloggedin}/>} />
        <Route path='/create' element={<CreateAccount />} />
        <Route path='/addplace' element={isLoggedIn ? <AddPlace /> : <Navigate to="/login" replace />} />
        <Route path='/cardview/:id' element={<CardView />} />
        <Route path='/login' element={<Login setIsloggedin={setIsloggedin} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
