import { useEffect, useState } from "react";
import RatingApi from "../../api/ratingApi";
import { Star } from "lucide-react";

import "./RatingStars.css";
const RatingStars = ({ bookId }) => {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRating = async () => {
            try {
                const data = await RatingApi.getUserRating(bookId);
                setRating(data.rating);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRating();
    }, [bookId]);
    const handleRating = async (value) => {
        try {
            await RatingApi.rateBook(bookId, value);
            setRating(value);
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) {
        return <p className="rating-loading">Loading rating...</p>;
    }
    return (
        <div className="rating-container">
            <h3>Your Rating</h3>
            <div className="stars" role="radiogroup" aria-label="Book rating">
                {[1,2,3,4,5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={
                            star <= rating
                                ? "star active"
                                : "star"
                        }
                        onClick={() => handleRating(star)}
                        aria-label={`${star} star${star !== 1 ? "s" : ""}`}
                        aria-checked={star === rating}
                        role="radio"
                    >
                        <Star size={16} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RatingStars;
