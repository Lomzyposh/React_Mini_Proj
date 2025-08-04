import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import { AppContext } from '../context/AppContext';
import clsx from 'clsx';



const Category = () => {
    const { genre } = useParams();
    const [categoryInfoReq, setCategoryInfo] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [loaderShow, setLoaderShow] = useState(false);
    const [yearFilter, setYearFilter] = useState("");
    const navigate = useNavigate();
    const rowRef = useRef();

    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const {
        showSearchbar,
        setSearchbar
    } = useContext(AppContext);


    const showAlert = (type, msg) => {
        setAlert({ type, message: msg });

        setTimeout(() => {
            setAlert({ type: "", message: "" });
        }, 3000);
    };

    // const saveCategorieBooks = (books) => {
    //     const formattedObj = books.map(book => {
    //         const volumeInfo = book.volumeInfo;
    //         return {
    //             id: book.id,
    //             title: volumeInfo.title || "Untitled",
    //             categories: volumeInfo.categories || ["UnCategorized"],
    //             year: volumeInfo.publishedDate || Date.now(),
    //             image: volumeInfo.imageLinks?.thumbnail || '/noImage.jpg'
    //         }
    //     })
    //     setCategoryInfo(formattedObj);
    // }


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoaderShow(true);
                const response = await fetch(`/data/books.json`);
                const books = await response.json();

                // console.log(books);
                setAllBooks(books);

                const filterByCategory = genre
                    ? books.filter(book => book.category.toLowerCase() === genre.toLowerCase()) :
                    books;

                setCategoryInfo(filterByCategory);

            } catch (err) {
                showAlert("error", "Network Error. Try Again");
                console.log("Error Showing Category:" + err);
            } finally {
                setLoaderShow(false);
            }
        }

        fetchBooks();
    }, [genre]);



    const displayBookDiv = (book) => {

        return (
            <div key={book.id} className='bookCard'>
                <img src={book.image} alt={book.title} onClick={() => navigate(`/category/${book.category}/${book.bookId}`)} />
                <h3 className='bookTitle'>{book.title}</h3>
                <p className='bookYear'>{book.year}</p>
            </div>
        )
    }

    const capitalize = (word) => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();;
    };



    const filteredBooks = yearFilter
        ? categoryInfoReq.filter(book => book.year === parseInt(yearFilter))
        : categoryInfoReq;

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (!sortField) return 0;

        const aVal = a[sortField]?.toString().toLowerCase();
        const bVal = b[sortField]?.toString().toLowerCase();

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;

    })

    const scrollRow = (direction) => {
        if (rowRef.current) {
            rowRef.current.scrollBy(
                { left: direction === 'left' ? -200 : 200, behavior: 'smooth' }
            );
        }
    };

    const handleSortField = (e) => {
        setSortField(e.target.value);
    }

    const handleOrderChange = (e) => {
        setSortOrder(e.target.value);
    }



    return (
        <>
            <AlertMessage type={alert.type} msg={alert.message} />
            <Loader loaderShow={loaderShow} />
            <div className='categoryInfo'>
                {showSearchbar && <SearchBar setSearchbar={setSearchbar} />}
                <div className="topSide">
                    <div className="topText">
                        <div className="categoryBreadCrumb">
                            <Link to='/'>Home</Link>
                            <Link to={`/category/${genre || ''}`}>{genre || "All Books"}</Link>
                        </div>
                        <h2 className='categoryType'>{capitalize(genre) || "All Books"}</h2>
                    </div>
                    <div className="filterSection">
                        <label htmlFor="yearSelect">Filter by Year:</label>
                        <select
                            id="yearSelect"
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                        >
                            <option value="">All Years</option>
                            {
                                [...new Set(categoryInfoReq.map(book => book.year))]
                                    .sort((a, b) => b - a)
                                    .map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))
                            }
                        </select>
                    </div>
                </div>

                <div className="sortBooksDiv">
                    <label htmlFor="sortField">Sort by:</label>
                    <select id="sortField" onChange={handleSortField}>
                        <option value="">Default</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="year">Year</option>
                    </select>

                    <select id="sortOrder" onChange={handleOrderChange}>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>

                <div className="selectCategory" id="selectCategory">
                    <div className={clsx('overCatFilter', genre ? "" : "end")}>
                        {
                            genre ?
                                <button className="allCategory">
                                    <Link to='/category'><i class="bi bi-x-lg"></i> Clear Filters</Link>
                                </button> : ""
                        }
                        <div className="navCatButton">

                            <button className="scrollRightBtn" onClick={() => scrollRow('left')}>
                                <i className="bi bi-arrow-left-circle"></i>
                            </button>
                            <button className="scrollRightBtn" onClick={() => scrollRow('right')}>
                                <i className="bi bi-arrow-right-circle"></i>
                            </button>
                        </div>
                    </div>

                    <div className="rowSelect" id='rowSelect' ref={rowRef}>

                        {
                            [...new Set(allBooks.map(book => capitalize(book.category)))]
                                .sort()
                                .map(category => (
                                    <button key={category} className={clsx(category.toLowerCase() === genre?.toLowerCase() ? 'active' : '')}>
                                        <Link to={`/category/${category.toLowerCase()}`}>{category}<i className="bi bi-caret-right-fill"></i></Link>
                                    </button>
                                ))
                        }
                    </div>



                </div>
                <div className="bookList">
                    {sortedBooks.map(book => displayBookDiv(book))}
                </div>
                <div className="pagination">
                    <div className="pagebtn">1</div>
                    <div className="pagebtn">2</div>
                    <div className="pagebtn">3</div>
                    <div className="pagebtn">4</div>
                    <div className="pagebtn">5</div>
                    <div className="pagebtn">6</div>
                </div>
            </div>
        </>
    )
}

export default Category
