import { useEffect, useState, useCallback } from "react";
import ShelfApi from "../../api/shelfApi";
import BookCard from "../../components/books/BookCard";
import { BookOpen } from "lucide-react";
import "./Shelves.css";

const Shelves = () => {
  const [status, setStatus] = useState("want_to_read");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShelf = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ShelfApi.getShelf(status);
      setBooks(data.books);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchShelf(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [fetchShelf]);

  if (loading) {
    return (
      <div className="shelves-page">
        <h1><BookOpen size={24} /> My Shelves</h1>
        <div className="tabs">
          <button className={status === "want_to_read" ? "active" : ""} disabled>Want To Read</button>
          <button className={status === "reading" ? "active" : ""} disabled>Reading</button>
          <button className={status === "completed" ? "active" : ""} disabled>Completed</button>
        </div>
        <div className="books-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="book-card">
              <div className="skeleton" style={{ height: 200 }} />
              <div style={{ padding: 16 }}>
                <div className="skeleton" style={{ height: 16, width: "80%", marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 14, width: "50%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="shelves-page page-enter">
      <h1><BookOpen size={24} /> My Shelves</h1>
      <div className="tabs">
        <button className={status === "want_to_read" ? "active" : ""} onClick={() => setStatus("want_to_read")}>Want To Read</button>
        <button className={status === "reading" ? "active" : ""} onClick={() => setStatus("reading")}>Reading</button>
        <button className={status === "completed" ? "active" : ""} onClick={() => setStatus("completed")}>Completed</button>
      </div>
      {books.length === 0 ? (
        <div className="empty-state">
          <h2>No books here yet.</h2>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book.book_id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shelves;
