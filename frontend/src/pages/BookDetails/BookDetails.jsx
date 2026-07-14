import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookApi from "../../api/bookApi";
import FavoriteButton from "../../components/favorite/FavoriteButton";
import ShelfButton from "../../components/shelf/ShelfButton";
import RatingStars from "../../components/rating/RatingStars";
import "./BookDetails.css";
import ReviewSection from "../../components/review/ReviewSection";

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await BookApi.getBook(bookId);
                setBook(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [bookId]);
    if (loading) {
        return <h2>Loading book...</h2>;
    }
    if (!book) {
        return <h2>Book not found.</h2>;
    }
    return (
        <div className="book-details">
            <div className="book-cover-large"> 📚 </div>
            <div className="book-content">
                <h1>{book.title}</h1>
                <p className="book-rating"> ⭐ {book.average_rating.toFixed(2)} </p>
                <p className="ratings-count"> {book.ratings_count} Ratings </p>
                <FavoriteButton bookId={book.book_id} />
                <ShelfButton bookId={book.book_id} />
                <RatingStars bookId={book.book_id} />
            
                <h2>About this book</h2>
                <p className="description"> {book.description || "No description available."} </p>
                <ReviewSection bookId={book.book_id} />
            </div>
        </div>
    );
};
export default BookDetails;