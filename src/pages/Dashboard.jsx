import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <Link to="/">Go To Login</Link>
            <br />
            <Link to="/signup">Go To Sign Up</Link>
            <br />
            <Link to="/dashboard">Dashboard</Link>
            <br />
            This is the dashboard
        </div>
    )
}

export default Dashboard
