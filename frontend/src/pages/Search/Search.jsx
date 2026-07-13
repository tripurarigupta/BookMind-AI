import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import SearchApi from "../../api/searchApi";

import BookCard from "../../components/books/BookCard";

import "./Search.css";

const Search = () => {

    const [searchParams] = useSearchParams();

    const query = searchParams.get("query");

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!query) {

            setBooks([]);

            setLoading(false);

            return;

        }

        fetchBooks();

    }, [query]);

    const fetchBooks = async () => {

        try {

            setLoading(true);

            const data = await SearchApi.searchBooks(query);

            setBooks(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Searching...</h2>;

    }

    return (

        <div className="search-page">

            <h1>

                Search Results

            </h1>

            <h3>

                "{query}"

            </h3>

            {

                books.length === 0 ?

                (

                    <div className="empty-state">

                        <h2>

                            No books found

                        </h2>

                    </div>

                )

                :

                (

                    <div className="search-grid">

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

export default Search;