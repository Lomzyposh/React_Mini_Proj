import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotLoggedInRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login'); 
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fullscreen-container">
            <div className="message-box">
                <h1>Access Denied</h1>
                <p>You must be logged in to view this page.</p>
                <p className="redirect-text">Redirecting you to the login page<span className="dots">...</span></p>
            </div>
        </div>
    );
};

export default NotLoggedInRedirect;
