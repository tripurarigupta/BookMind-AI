import "./BookCard.css";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/books/${book.book_id}`);
    };
    return (
        <div
            className="book-card"
            onClick={handleClick}
        >
            <div className="book-cover">
                <span>📚</span>
            </div>
            <div className="book-info">
                <h3>{book.title}</h3>
                <p className="rating">
                    ⭐ {book.average_rating.toFixed(2)}
                </p>
                <p className="ratings-count">
                    {book.ratings_count} Ratings
                </p>
            </div>
            <div className="book-actions">
                <button
                    onClick={(e) => e.stopPropagation()}
                >
                    ❤️ Favorite
                </button>

                <button
                    onClick={(e) => e.stopPropagation()}
                >
                    📚 Want To Read
                </button>

            </div>

        </div>
    );
};

export default BookCard;