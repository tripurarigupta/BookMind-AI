import "./BookCard.css";

const BookCard = ({ book }) => {
    return (
        <div className="book-card">
            <div className="book-cover">
                <span>📚</span>
            </div>
            <div className="book-info">
                <h3>{book.title}</h3>
                <p className="rating">
                    ⭐ {book.average_rating.toFixed(2)}
                </p>
                <p className="ratings-count">
                    {book.ratings_count.toLocaleString()} Ratings
                </p>
            </div>
            <div className="book-actions">
                <button>♡ Favorite</button>
                <button>📚 Want To Read</button>
            </div>
        </div>
    );
};

export default BookCard;