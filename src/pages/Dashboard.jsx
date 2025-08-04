import clsx from 'clsx'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import NotLoggedInRedirect from '../components/NotLoggedInRedirect'
import { AppContext } from '../context/AppContext'



const Dashboard = () => {

    const {
        isLoggedIn,
        showSearchbar,
        setSearchbar,
        toggleSearchbar
    } = useContext(AppContext);

    const [dateDiff, setDateDiff] = useState(0);

    useEffect(() => {
        setDateDiff(new Date().getFullYear() - 2002);
    }, [])

    if (isLoggedIn === null) return null;
    if (!isLoggedIn) return <NotLoggedInRedirect />;

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

                <div className="selectDashCategory" id="selectDashCategory">
                    <h2>What do you want to read</h2>
                    <div className="rowDashSelect">
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
                            <Link to='/category/self'>Self-Help <i className="bi bi-arrow-right"></i></Link>
                        </button>
                    </div>



                </div>

                <div className="filterByYear" id="filterByYear">
                    <h3>Looking for books from a specific year?</h3>
                    <p>Select a year to filter available titles:</p>
                    <div className="yearFilterOptions">
                        <button>
                            <Link>2025</Link>
                        </button>
                        <button>2024</button>
                        <button>2023</button>
                        <button>2022</button>
                        <button>2021</button>
                        <button>2020</button>
                        <button>2019</button>
                        <button>Older</button>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Dashboard
