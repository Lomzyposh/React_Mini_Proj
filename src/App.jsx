import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import RouterConfig from './RouterConfig'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showSearchbar, setSearchbar] = useState(false);
  const toggleSidebar = () => setSearchbar(prev => !prev);


  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onToggleSearch={toggleSidebar} />
      <RouterConfig setIsLoggedIn={setIsLoggedIn} showSearchbar={showSearchbar} setSearchbar={setSearchbar} />
      <Footer />
    </BrowserRouter>

  )
}

export default App
