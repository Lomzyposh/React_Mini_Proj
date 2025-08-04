import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import RouterConfig from './RouterConfig'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AppContext } from './context/AppContext'

function App() {
  const {
    isLoggedIn
  } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Navbar />
      <RouterConfig />
      <Footer />
    </BrowserRouter>

  )
}

export default App
