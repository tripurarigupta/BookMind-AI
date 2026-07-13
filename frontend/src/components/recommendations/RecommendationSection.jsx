import "./RecommendationSection.css";
import BookCard from "../books/BookCard";

const RecommendationSection = ({ title, books }) => {
    return (
        <section className="recommendation-section">
            <h2>{title}</h2>
            <div className="book-grid">
                {books.length > 0 ? (
                    books.map((book) => (
                        <BookCard
                            key={book.book_id}
                            book={book}
                        />
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </section>
    );
};

export default RecommendationSection;