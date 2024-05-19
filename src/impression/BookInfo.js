import React from "react";

const BookInfo = ({ title, author, description }) => {
    return (
        <div className='I-book-text'>
            <h2>{title}</h2>
            <h4>{author}</h4>
            <p>{description}</p>
        </div>
    );
};

export default BookInfo;