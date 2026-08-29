import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./RecommendationSection.css";
import BookCard from "../books/BookCard";

const RecommendationSection = ({ title, books }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const amount = 260;
        scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    };

    return (
        <section className="recommendation-section">
            <div className="recommendation-section__header">
                <h2>{title}</h2>
                {books.length > 0 && (
                    <div className="recommendation-section__nav">
                        <button onClick={() => scroll("left")} aria-label="Scroll left"><ChevronLeft size={20} /></button>
                        <button onClick={() => scroll("right")} aria-label="Scroll right"><ChevronRight size={20} /></button>
                    </div>
                )}
            </div>
            {books.length > 0 ? (
                <div className="book-carousel" ref={scrollRef}>
                    {books.map((book) => (
                        <div className="book-carousel__item" key={book.book_id}>
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No books found.</p>
            )}
        </section>
    );
};

export default RecommendationSection;