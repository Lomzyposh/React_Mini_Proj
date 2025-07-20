import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <Link to="/">Login</Link>
            <br />
            <Link to="/signup">Sign Up</Link>
            <br />
            <Link to="/dashboard">Dashboard</Link>
            This page does not exist. Please check the URL or return to the home page.
            <br />
            <a href="/">Go to Home</a>
        </div>
    )
}

export default NotFound
