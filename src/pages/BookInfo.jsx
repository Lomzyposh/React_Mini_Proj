import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';

const BookInfo = ({ showSearchbar, setSearchbar }) => {
    const { genre, bookId } = useParams();
    const [bookInfo, setBookInfo] = useState({});
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [loaderShow, setLoaderShow] = useState(false);
    const navigate = useNavigate();

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
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
                const data = await response.json();

                setBookInfo(data || []);

                const volumeInfo = data.volumeInfo;

                setCategoryInfo(
                    {
                        id: data.id,
                        authors: volumeInfo.authors || [],
                        title: volumeInfo.title || "Untitled",
                        categories: volumeInfo.categories || ["UnCategorized"],
                        description: volumeInfo.description || "No description",
                        image: volumeInfo.imageLinks?.thumbnail || '/noImage.jpg'
                    }
                )

            } catch (err) {
                showAlert("error", "Error Showing Category");
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
                    <p className='bookAuthor'><span className='by'>By</span> -{authors}</p>
                    <hr />
                    <div className='bookDescription'>
                        {displayText}
                    </div>
                    <br />
                    {shouldTruncate && (
                        <span className="seeMoreToggle" onClick={toggleText}>
                            {showFullText ? 'See less' : 'Read More'}
                            {showFullText ? (<i class="bi bi-arrow-up"></i>) : (<i class="bi bi-arrow-down"></i>)}
                        </span>
                    )}
                    <hr />
                </div>
                <div className="buyInfo">
                    <p>But the book from: </p>
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

            {loaderShow ?
                (<Loader loaderShow={loaderShow} />)
                : categoryInfo?.id ? (
                    <div className="infoContainer">
                        <Link to={`/category/${genre}`}>
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
