import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookApi from "../../api/bookApi";
import FavoriteButton from "../../components/favorite/FavoriteButton";
import ShelfButton from "../../components/shelf/ShelfButton";
import RatingStars from "../../components/rating/RatingStars";
import ReviewSection from "../../components/review/ReviewSection";
import BookImage from "../../components/common/BookImage";
import { BookOpen, Star } from "lucide-react";
import "./BookDetails.css";

const BookDetailsSkeleton = () => (
    <div className="book-details" aria-busy="true" aria-label="Loading book details">
        <div className="book-details__hero">
            <div className="book-details__cover-skeleton skeleton-pulse" />
            <div className="book-details__meta">
                <div className="skeleton-line skeleton-line--title skeleton-pulse" />
                <div className="skeleton-line skeleton-line--subtitle skeleton-pulse" />
                <div className="skeleton-line skeleton-line--text skeleton-pulse" />
                <div className="skeleton-line skeleton-line--text-short skeleton-pulse" />
                <div className="skeleton-actions">
                    <div className="skeleton-btn skeleton-pulse" />
                    <div className="skeleton-btn skeleton-pulse" />
                </div>
                <div className="skeleton-stars">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="skeleton-star skeleton-pulse" />
                    ))}
                </div>
            </div>
        </div>
        <div className="book-details__body">
            <div className="skeleton-line skeleton-line--heading skeleton-pulse" />
            <div className="skeleton-line skeleton-line--full skeleton-pulse" />
            <div className="skeleton-line skeleton-line--full skeleton-pulse" />
            <div className="skeleton-line skeleton-line--full skeleton-pulse" />
            <div className="skeleton-line skeleton-line--short skeleton-pulse" />
        </div>
    </div>
);

const BookDetails = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await BookApi.getBook(bookId);
                setBook(data);
            } catch (err) {
                console.error(err);
                setError(
                    err?.response?.status === 404
                        ? "Book not found"
                        : "Something went wrong loading this book"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [bookId]);

    if (loading) {
        return <BookDetailsSkeleton />;
    }

    if (error || !book) {
        return (
            <div className="book-details-error">
                <div className="book-details-error__icon" aria-hidden="true">
                    <BookOpen size={48} />
                </div>
                <h2 className="book-details-error__title">
                    {error || "Book not found"}
                </h2>
                <p className="book-details-error__text">
                    We couldn&apos;t find the book you&apos;re looking for.
                </p>
                <button
                    className="book-details-error__btn"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="book-details">
            <section className="book-details__hero" aria-label="Book information">
                <div className="book-details__cover-wrapper">
                    <BookImage
                        src={book.image_url}
                        alt={`Cover of ${book.title}`}
                        className="book-details__cover"
                    />
                </div>

                <div className="book-details__meta">
                    <h1 className="book-details__title">{book.title}</h1>

                    {book.authors && (
                        <p className="book-details__author">{book.authors}</p>
                    )}

                    <div className="book-details__rating-summary">
                        <span className="book-details__star-icon" aria-hidden="true">
                            <Star size={16} />
                        </span>
                        <span className="book-details__avg-rating">
                            {book.average_rating.toFixed(2)}
                        </span>
                        <span className="book-details__ratings-count">
                            ({book.ratings_count} {book.ratings_count === 1 ? "rating" : "ratings"})
                        </span>
                    </div>

                    {book.publisher && (
                        <p className="book-details__publisher">
                            <span className="book-details__label">Publisher</span>
                            {book.publisher}
                        </p>
                    )}

                    {(book.publication_year || book.num_pages) && (
                        <div className="book-details__info-row">
                            {book.publication_year && (
                                <div className="book-details__info-chip">
                                    <span className="book-details__label">Year</span>
                                    <span>{book.publication_year}</span>
                                </div>
                            )}
                            {book.num_pages && (
                                <div className="book-details__info-chip">
                                    <span className="book-details__label">Pages</span>
                                    <span>{book.num_pages}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="book-details__actions">
                        <FavoriteButton bookId={book.book_id} />
                        <ShelfButton bookId={book.book_id} />
                    </div>

                    <RatingStars bookId={book.book_id} />
                </div>
            </section>

            {book.description && (
                <section className="book-details__body" aria-label="Book description">
                    <h2 className="book-details__section-heading">About this book</h2>
                    <p className="book-details__description">{book.description}</p>
                </section>
            )}

            <section className="book-details__body" aria-label="Book reviews">
                <ReviewSection bookId={book.book_id} />
            </section>
        </div>
    );
};

export default BookDetails;
