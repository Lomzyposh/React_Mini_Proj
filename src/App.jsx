import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import RouterConfig from './RouterConfig'
import Navbar from './components/Navbar'
import Loader from './components/Loader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Loader />
      <Navbar />
      <RouterConfig />
    </BrowserRouter>
    
  )
}

export default App
