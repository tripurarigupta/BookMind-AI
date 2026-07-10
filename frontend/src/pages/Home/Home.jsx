import { usePopularBooks } from "../../hooks/usePopularBooks";

function Home() {

    const { data, isLoading, error } = usePopularBooks();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Something went wrong.</h1>;
    }

    return (
        <div className="p-10">

            <h1 className="mb-6 text-3xl font-bold">
                Popular Books
            </h1>
            const books = data?.books ?? [];
            {data.books.map((book) => (
                <div
                    key={book.book_id}
                    className="mb-4 rounded-lg border p-4"
                >
                    <h2 className="text-xl font-semibold">
                        {book.title}
                    </h2>

                    <p>
                        ⭐ {book.average_rating}
                    </p>

                    <p>
                        Ratings : {book.ratings_count}
                    </p>

                </div>
            ))}

        </div>
    );
}

export default Home;