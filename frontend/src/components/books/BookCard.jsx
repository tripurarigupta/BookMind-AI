import "./BookCard.css";
import BookImage from "../common/BookImage";
import { useNavigate } from "react-router-dom";
import { Star, Heart, BookOpen } from "lucide-react";

const BookCard = ({ book }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/books/${book.book_id}`);
    };
    return (
        <div className="book-card" onClick={handleClick} >
            
            <BookImage
                src={book.image_url}
                alt={book.title}
                className="book-cover"
            />
            <div className="book-info">
                <h3>{book.title}</h3>
                <p className="rating"><Star size={14} /> {book.average_rating.toFixed(2)}</p>
                <p className="ratings-count"> {book.ratings_count} Ratings </p>
                <p className="book-author">{book.authors}</p>
                {(book.publication_year || book.publisher) && (
                    <p className="book-meta-line">
                        {book.publication_year && <span>{book.publication_year}</span>}
                        {book.publication_year && book.publisher && <span className="book-meta-sep">·</span>}
                        {book.publisher && <span>{book.publisher}</span>}
                    </p>
                )}
            </div>
            <div className="book-actions">
                <button onClick={(e) => e.stopPropagation()}><Heart size={14} /> Favorite</button>
                <button onClick={(e) => e.stopPropagation()}><BookOpen size={14} /> Want To Read</button>
            </div>
        </div>
    );
};

export default BookCard;