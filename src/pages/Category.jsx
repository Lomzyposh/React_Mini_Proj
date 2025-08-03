import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';



const Category = ({ showSearchbar, setSearchbar }) => {
    const { genre } = useParams();
    const [categoryInfoReq, setCategoryInfo] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [loaderShow, setLoaderShow] = useState(false);
    const navigate = useNavigate();


    const showAlert = (type, msg) => {
        setAlert({ type, message: msg });

        setTimeout(() => {
            setAlert({ type: "", message: "" });
        }, 3000);
    };

    const saveCategorieBooks = (books) => {
        const formattedObj = books.map(book => {
            const volumeInfo = book.volumeInfo;
            return {
                id: book.id,
                title: volumeInfo.title || "Untitled",
                categories: volumeInfo.categories || ["UnCategorized"],
                image: volumeInfo.imageLinks?.thumbnail || '/noImage.jpg'
            }
        })
        setCategoryInfo(formattedObj);
    }


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoaderShow(true);
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=30`);
                const data = await response.json();

                const books = data.items || [];
                setAllBooks(allBooks);

                saveCategorieBooks(books);

            } catch (err) {
                showAlert("error", "Error Showing Category");
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
                <img src={book.image} alt={book.title} onClick={() => navigate(`/category/${genre}/${book.id}`)} />
                <h3 className='bookTitle'>{book.title}</h3>
            </div>
        )
    }

    const capitalize = (word) => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    return (
        <>
            <AlertMessage type={alert.type} msg={alert.message} />
            <Loader loaderShow={loaderShow} />
            <div className='categoryInfo'>
                {showSearchbar && <SearchBar setSearchbar={setSearchbar} />}
                <div className="topText">
                    <div className="categoryBreadCrumb">
                        <Link to='/'>Home</Link>
                        <Link to={`/category/${genre}`}>{genre}</Link>
                    </div>
                    <h2 className='categoryType'>{capitalize(genre)}</h2>
                </div>
                <div className="bookList">
                    {categoryInfoReq.map(book => displayBookDiv(book))}
                </div>
            </div>
        </>
    )
}

export default Category
