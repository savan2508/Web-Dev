import React from "react";
import ReactDOM from "react-dom/client";

// CSS
import "./index.css";
import { books } from "./books";
import Book from "./Book";

const BookList = () => {
    const getBooks = (id) => {
        const book = books.find((book) => book.id === id);
        console.log(book);
    }
    return (
        <>
            <h1>Book List</h1>
            <section className={"booklist"}>
                {books.map((book, index) => {
                    return (
                        <Book
                            bookTitle={book.bookTitle}
                            bookAuthor={book.bookAuthor}
                            bookImage={book.bookImage}
                            key={book.id}
                            number={index}
                            getBooks={getBooks}
                        />
                    );
                })}
            </section>
        </>

    );
};



const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<BookList />);
