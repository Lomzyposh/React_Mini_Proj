import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const {
        setSearchbar
    } = useContext(AppContext);
    const [allBooks, setAllBooks] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`/data/books.json`);
                const books = await response.json();

                setAllBooks(books);

            } catch (err) {
                showAlert("error", "Network Error. Try Again");
                console.log("Error Showing Category:" + err);
            }
        }

        fetchBooks();
    });

    const getSearchInfo = (inputValue) => {
        const options = allBooks.filter(book => {
            const { id, title, authors, description, image } = book;
            const isAuthors = authors.some(author => author.toLowerCase().includes(inputValue.toLowerCase()))
            const isTitle = title.toLowerCase().includes(inputValue.toLowerCase());
            return isAuthors || isTitle;
        })
        setFilteredList(options);
        console.log(options);
    }


    return (
        <div className='searchAndResult'>
            <form className="searchForm">
                <input type="text" onChange={(e) => getSearchInfo(e.target.value)} placeholder="Search books by author or title..." />
                <button type="submit"><i className="bi bi-search"></i></button>
                <span className="closeSearchForm" onClick={() => setSearchbar(false)}>
                    <i className="bi bi-x-circle-fill"></i>
                </span>
            </form>
            <div className="results">
                {filteredList.map((result, index) =>
                (
                    <div key={index} className='resultOption' onClick={() => navigate(`/category/${result.category}/${result.bookId}`)}>
                        <img src={result.image} alt={result.title} />
                        <p>{result.title}</p>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default SearchBar
