import { useEffect, useState, useCallback } from "react";
import ReviewApi from "../../api/reviewApi";
import "./ReviewSection.css";

const ReviewSection = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [content, setContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const data = await ReviewApi.getReviews(bookId);
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  }, [bookId]);

  const fetchMyReview = useCallback(async () => {
    try {
      const data = await ReviewApi.getMyReview(bookId);
      if (data) {
        setMyReview(data);
        setContent(data.content);
      }
    } catch (err) {
      console.error(err);
    }
  }, [bookId]);

  useEffect(() => {
    fetchReviews(); // eslint-disable-line react-hooks/set-state-in-effect
    fetchMyReview();
  }, [fetchReviews, fetchMyReview]);

  const handleSave = async () => {
    try {
      await ReviewApi.saveReview(bookId, content);
      fetchMyReview();
      fetchReviews();
      setShowEditor(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="review-section">
      <h2>Reviews</h2>
      <button className="review-btn" onClick={() => setShowEditor(true)}>
        {myReview ? "✏️ Edit Your Review" : "✍️ Write a Review"}
      </button>
      {showEditor && (
        <div className="review-editor">
          <textarea
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
          />
          <button className="save-review" onClick={handleSave}>Save Review</button>
        </div>
      )}
      <div className="review-list">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-header">
              <div className="review-avatar">
                {review.user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4>{review.user.username}</h4>
                <span className="review-date">
                  {new Date(review.updated_at).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
            <p className="review-content">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
