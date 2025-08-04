import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Category from './pages/Category'
import BookInfo from './pages/BookInfo'

function RounterConfig() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/category/:genre' element={<Category />}></Route>
            <Route path='/category/' element={<Category />}></Route>
            <Route path='/category/:genre/:bookId' element={<BookInfo />}></Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RounterConfig
