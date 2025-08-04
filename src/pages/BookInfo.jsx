import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';
import SearchBar from '../components/SearchBar';
import { AppContext } from '../context/AppContext';

const BookInfo = () => {
    const { genre, bookId } = useParams();
    // const [bookInfo, setBookInfo] = useState({});
    const [categoryInfo, setCategoryInfo] = useState({});
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [loaderShow, setLoaderShow] = useState(false);
    const navigate = useNavigate();

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



    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoaderShow(true);
                const response = await fetch(`/data/books.json`);
                const data = await response.json();
                // setBookInfo(data || []);

                const thisData = data.find(book => book.bookId === bookId);

                setCategoryInfo(thisData);

            } catch (err) {
                showAlert("error", "Network Error. Try Again");
                console.log("Error Showing Category:" + err);
            } finally {
                setLoaderShow(false);
            }
        }

        fetchBooks();
    }, [genre]);

    const stripHTML = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const DisplayBookDiv = ({ book }) => {


        const { id, title, authors, description, image } = book;

        const text = stripHTML(description)

        const maxLength = 200;

        const [showFullText, setShowFullText] = useState(false);

        const toggleText = () => setShowFullText(!showFullText);

        const shouldTruncate = text.length > maxLength;
        const displayText = showFullText ? text : text.slice(0, maxLength) + (shouldTruncate ? '...' : '');

        return (
            <div className='infos'>

                <div key={id} className='image'>

                    <img src={image} alt={title} />
                </div>
                <div className="text">

                    <h2 className='bookInfoTitle'>{title}</h2>
                    <p className='bookAuthor'><span className='by'>By</span> -{authors.map(author => author).join(", ")}</p>
                    <hr />
                    <div className='bookDescription'>
                        {displayText}
                    </div>
                    <br />
                    {shouldTruncate && (
                        <span className="seeMoreToggle" onClick={toggleText}>
                            {showFullText ? 'See less' : 'Read More'}
                            {showFullText ? (<i className="bi bi-arrow-up"></i>) : (<i className="bi bi-arrow-down"></i>)}
                        </span>
                    )}
                    <hr />
                </div>
                <div className="buyInfo">
                    <p>Buy the book from: </p>
                    <div className="buyInfoOptions">
                        <button title='Amazon'>
                            <Link to='https://www.amazon.com/amz-books/store'>Amazon</Link>
                        </button>
                        <button title='Apple Books'>
                            <Link to='https://www.apple.com/apple-books/'>Apple Books</Link>
                        </button>
                        <button title='ebooks.com'>
                            <Link to='https://www.ebooks.com/en-ng/'>ebooks.com</Link>
                        </button>
                        <button title='Google Play'>
                            <Link to='https://books.google.com/'>Google Play</Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    }



    return (
        <>
            <AlertMessage type={alert.type} msg={alert.message} />
            {showSearchbar && <SearchBar setSearchbar={setSearchbar} />}
            {loaderShow ?
                (<Loader loaderShow={loaderShow} />)
                : categoryInfo?.bookId ? (
                    <div className="infoContainer">
                        <Link to={`/category/`}>
                            <i className="bi bi-arrow-left-circle-fill backBtn"></i>
                        </Link>
                        {<DisplayBookDiv book={categoryInfo} />}

                    </div>
                ) : (
                    <div className='loadingScreen'>
                        Loading
                        <span>...</span>
                    </div>
                )}

        </>
    )
}

export default BookInfo
