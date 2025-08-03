import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Category from './pages/Category'
import BookInfo from './pages/BookInfo'

function RounterConfig({ setIsLoggedIn, showSearchbar, setSearchbar }) {
    return (
        <Routes>
            <Route path="/" element={<Dashboard setIsLoggedIn={setIsLoggedIn} showSearchbar={showSearchbar} />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element={<Dashboard setIsLoggedIn={setIsLoggedIn} showSearchbar={showSearchbar} setSearchbar={setSearchbar} />} />
            <Route path='/category/:genre' element={<Category setIsLoggedIn={setIsLoggedIn} showSearchbar={showSearchbar} setSearchbar={setSearchbar} />}></Route>
            <Route path='/category/:genre/:bookId' element={<BookInfo showSearchbar={showSearchbar} setSearchbar={setSearchbar} />}></Route>
            <Route path="*" element={<NotFound setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
    )
}

export default RounterConfig
