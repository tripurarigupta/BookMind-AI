import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SearchApi from "../../api/searchApi";
import BookCard from "../../components/books/BookCard";
import { Search as SearchIcon, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import "./Search.css";

const SKELETON_COUNT = 8;

const SearchSkeleton = () => (
  <div className="search-results" aria-busy="true" aria-label="Loading search results">
    <div className="search-skeleton-grid">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div key={i} className="search-skeleton-card skeleton-pulse">
          <div className="search-skeleton-cover" />
          <div className="search-skeleton-body">
            <div className="search-skeleton-line search-skeleton-line--title" />
            <div className="search-skeleton-line search-skeleton-line--short" />
            <div className="search-skeleton-line search-skeleton-line--tiny" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [inputValue, setInputValue] = useState(query);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [pagination, setPagination] = useState({ total_books: 0, total_pages: 0 });

  const fetchBooks = useCallback(async (searchQuery, page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await SearchApi.searchBooks(searchQuery, page, 10);
      setBooks(data.books);
      setPagination({ total_books: data.total_books, total_pages: data.total_pages });
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!query) {
      setBooks([]); // eslint-disable-line react-hooks/set-state-in-effect
      setHasSearched(false);
      setPagination({ total_books: 0, total_pages: 0 });
      return;
    }
    setInputValue(query);
    fetchBooks(query, currentPage);
  }, [query, currentPage, fetchBooks]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed) return;
      setSearchParams({ query: trimmed, page: "1" });
    },
    [inputValue, setSearchParams]
  );

  const goToPage = useCallback(
    (newPage) => {
      setSearchParams({ query, page: String(newPage) });
    },
    [query, setSearchParams]
  );

  return (
    <div className="search-page page-enter">
      <form className="search-input-bar" onSubmit={handleSubmit} role="search">
        <label htmlFor="search-page-input" className="search-input-label">Search books</label>
        <div className="search-input-wrapper">
          <span className="search-input-icon" aria-hidden="true">
            <SearchIcon size={18} />
          </span>
          <input
            id="search-page-input"
            className="search-input"
            type="text"
            placeholder="Search by title, author, or description..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="search-input-btn">Search</button>
        </div>
      </form>

      {!query && !loading && (
        <div className="search-empty-prompt">
          <div className="search-empty-prompt__icon" aria-hidden="true"><SearchIcon size={48} /></div>
          <h2 className="search-empty-prompt__title">Find your next great read</h2>
          <p className="search-empty-prompt__text">Search by title, author, or description to get started.</p>
        </div>
      )}

      {loading && <SearchSkeleton />}

      {!loading && error && (
        <div className="search-error">
          <div className="search-error__icon" aria-hidden="true"><AlertTriangle size={48} /></div>
          <h2 className="search-error__title">{error}</h2>
          <p className="search-error__text">Try a different search or check your connection.</p>
        </div>
      )}

      {!loading && !error && query && hasSearched && (
        <div className="search-results">
          <div className="search-results-header">
            <h1 className="search-results-title">Results for &ldquo;{query}&rdquo;</h1>
            <p className="search-results-count" aria-live="polite">
              {pagination.total_books === 0
                ? "No books found"
                : `${pagination.total_books} ${pagination.total_books === 1 ? "book" : "books"} found`}
            </p>
          </div>

          {books.length === 0 ? (
            <div className="search-no-results">
              <div className="search-no-results__icon" aria-hidden="true"><SearchIcon size={48} /></div>
              <h2 className="search-no-results__title">No books found</h2>
              <p className="search-no-results__text">
                We couldn&apos;t find any books matching &ldquo;{query}&rdquo;. Try a different search term.
              </p>
            </div>
          ) : (
            <>
              <div className="search-grid">
                {books.map((book) => (
                  <BookCard key={book.book_id} book={book} />
                ))}
              </div>

              {pagination.total_pages > 1 && (
                <div className="search-pagination">
                  <button
                    className="search-pagination__btn"
                    disabled={currentPage <= 1}
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    <ChevronLeft size={18} /> Prev
                  </button>
                  <span className="search-pagination__info">
                    Page {currentPage} of {pagination.total_pages}
                  </span>
                  <button
                    className="search-pagination__btn"
                    disabled={currentPage >= pagination.total_pages}
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    Next <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
