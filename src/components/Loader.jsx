import React, { useState } from 'react'

const Loader = ({ loaderShow = false }) => {
    return (
        <>
            {loaderShow ?
                < div className="customLoad" >
                    <div className="book-loader">
                        <div class="book"></div>
                        <div class="book"></div>
                        <div class="book"></div>
                    </div>
                </div > : ''
            }
        </>
    )
}

export default Loader
