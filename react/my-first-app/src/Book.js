import React from "react";

const Book = (props) => {
    const displayTitle = () => {
        console.log(props.bookTitle);
    }
    return (
        <article className={"book"}>
            <img src={props.bookImage} alt={props.bookTitle} />
            <h2>{props.bookTitle}</h2>
            <button onClick={displayTitle}>Click Me</button>
            <h4>{props.bookAuthor}</h4>
            <span className="number">{props.number + 1}</span>
        </article>
    )
}

export default Book;