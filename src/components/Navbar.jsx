import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const {
        isLoggedIn,
        setIsLoggedIn,
        toggleSearchbar
    } = useContext(AppContext);


    const location = useLocation();
    const hideOnPaths = ['/signup', '/login'];
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);

    const shouldShowIcons = !hideOnPaths.includes(location.pathname);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/login')
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
                        <button className="search" id="searchBtn" title='Search' onClick={toggleSearchbar}>
                            <i className="bi bi-search"></i>
                        </button>
                        {/* <button className='libraryBtn' title='Library'>
                            <i className="bi bi-heart-fill"></i>
                            <span className="count" id='libraryCount'>3</span>
                        </button> */}
                        {isLoggedIn ?
                            (<button className='logoutBtn' title='LogOut' onClick={handleLogout}><i className="bi bi-box-arrow-in-right"></i></button>) :
                            (<button className='loginBtn' title='LogIn' onClick={() => navigate('/login')}>Login</button>)
                        }
                    </div>
                )
            }
        </nav >
    )
}

export default Navbar
