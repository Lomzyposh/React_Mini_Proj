import React from 'react'

const SearchBar = ({setSearchbar}) => {
    return (
        <form className="searchForm">
            <input type="text" placeholder="Search books by author, title, or topic..." />
            <button type="submit"><i className="bi bi-search"></i></button>
            <span className="closeSearchForm" onClick={() => setSearchbar(false)}>
                <i class="bi bi-x-circle-fill"></i>
            </span>
        </form>
    )
}

export default SearchBar
