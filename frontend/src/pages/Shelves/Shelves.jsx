import { useEffect, useState } from "react";

import ShelfApi from "../../api/shelfApi";
import BookCard from "../../components/books/BookCard";

import "./Shelves.css";
const Shelves = () => {
    const [status, setStatus] = useState("want_to_read");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchShelf();
    }, [status]);
    const fetchShelf = async () => {
        try {
            setLoading(true);
            const data = await ShelfApi.getShelf(status);
            setBooks(data.books);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <h2>Loading shelf...</h2>;
    }
    return (
        <div className="shelves-page">
            <h1>📚 My Shelves</h1>
            <div className="tabs">
                <button
                    className={status === "want_to_read" ? "active" : ""}
                    onClick={() => setStatus("want_to_read")}
                >
                    Want To Read
                </button>
                <button
                    className={status === "reading" ? "active" : ""}
                    onClick={() => setStatus("reading")}
                >
                    Reading
                </button>
                <button
                    className={status === "completed" ? "active" : ""}
                    onClick={() => setStatus("completed")}
                >
                    Completed
                </button>
            </div>
            {
                books.length === 0 ?
                (
                    <div className="empty-state">
                        <h2>No books here yet.</h2>
                    </div>
                )
                :
                (
                    <div className="books-grid">
                        {
                            books.map((book) => (
                                <BookCard
                                    key={book.book_id}
                                    book={book}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Shelves;