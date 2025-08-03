import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'

// const TopNavbar = () => {
//     <nav className="logoB" >
//         <div className="leftSide">
//             <div className="hamburger">

//             </div>
//             <div className="logo">
//                 <div className="logoImg">
//                     <img src="/transBook3.png" alt="books" />
//                 </div>
//                 <h1 className=>Read-Feed</h1>
//             </div>
//         </div>
//     </nav>

// }



const Dashboard = ({ setIsLoggedIn, showSearchbar, setSearchbar }) => {
    const [dateDiff, setDateDiff] = useState(0);

    useEffect(() => {
        fetch('')
        setDateDiff(new Date().getFullYear() - 2002);
    }, [])

    return (
        <div className="dashboard">
            {showSearchbar && <SearchBar setSearchbar={setSearchbar} />}
            <main>
                <div className="introTop">
                    <h1 className='text'>
                        Fueling curiosity, page after page_<span className="orange">since 2002</span>
                    </h1>
                    <p className='text'>
                        {dateDiff} years of stories that became memories — and memories that became us.
                    </p>

                </div>

                <div className="selectCategory" id="selectCategory">
                    <h2>What do you want to read</h2>
                    <div className="rowSelect">
                        <button>
                            <Link to='/category/fiction'>Fiction <i className="bi bi-arrow-right"></i></Link>
                        </button>
                        <button>
                            <Link to='/category/history'>History <i className="bi bi-arrow-right"></i></Link>
                        </button>
                        <button>
                            <Link to='/category/science'>Science <i className="bi bi-arrow-right"></i></Link>
                        </button>
                        <button>
                            <Link to='/category/biography'>Biography <i className="bi bi-arrow-right"></i></Link>
                        </button>
                        <button>
                            <Link to='/category/fantasy'>Fantasy <i className="bi bi-arrow-right"></i></Link>
                        </button>
                        <button>
                            <Link to='/category/romance'>Romance <i className="bi bi-arrow-right"></i></Link>
                        </button>
                        <button>
                            <Link to='/category/mystery'>Mystery <i className="bi bi-arrow-right"></i></Link>
                        </button>
                        <button>
                            <Link to='/category/horror'>Horror <i className="bi bi-arrow-right"></i></Link>
                        </button>
                        <button>
                            <Link to='/category/children'>Children <i className="bi bi-arrow-right"></i></Link>
                        </button>
                        <button>
                            <Link to='/category/self-help'>Self-Help <i className="bi bi-arrow-right"></i></Link>
                        </button>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Dashboard
