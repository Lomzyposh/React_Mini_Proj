import React from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.css'

const LoginPage = () => {
    return (
        <div>
            <Link to="/signup">Go to Sign Up</Link>
            <br />
            This is the Login Page
        </div>
    )
}

export default LoginPage
