import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn, onToggleSearch }) => {
    const location = useLocation();
    const hideOnPaths = ['/signup', '/login'];
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);

    const shouldShowIcons = !hideOnPaths.includes(location.pathname);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/')
    };

    return (
        <nav>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <div className="logo">

                    <div className="logoImg">
                        <img src="/transBook3.png" alt="books" />
                    </div>
                    <h1 className='logoText'>LIB_Nova</h1>
                </div>
            </Link>
            {
                shouldShowIcons && (
                    <div className='nav-buttons'>
                        <button className="search" id="searchBtn" title='Search' onClick={onToggleSearch}>
                            <i class="bi bi-search"></i>
                        </button>
                        <button className='libraryBtn' title='Library'>
                            <i class="bi bi-heart-fill"></i>
                            <span className="count" id='libraryCount'>3</span>
                        </button>
                        {isLoggedIn ?
                            (<button className='logoutBtn' title='LogOut' onClick={handleLogout}><i class="bi bi-box-arrow-in-right"></i></button>) :
                            (<button className='loginBtn' title='LogIn' onClick={() => navigate('/login')}>Login</button>)
                        }
                    </div>
                )
            }
        </nav >
    )
}

export default Navbar
