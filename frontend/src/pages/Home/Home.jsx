import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import RecommendationSection from "../../components/recommendations/RecommendationSection";
import RecommendationApi from "../../api/recommendationApi";
import BookApi from "../../api/bookApi";
import BookCard from "../../components/books/BookCard";
import { Sparkles, TrendingUp, SlidersHorizontal, ChevronLeft, ChevronRight, X } from "lucide-react";
import "./Home.css";

const SORT_OPTIONS = [
  { value: "ratings_count", label: "Popularity" },
  { value: "average_rating", label: "Rating" },
  { value: "title", label: "Title" },
  { value: "publication_year", label: "Year" },
  { value: "num_pages", label: "Pages" },
];

const Home = () => {
  // Recommendations
  const [recBooks, setRecBooks] = useState([]);
  const [recommendationType, setRecommendationType] = useState("");
  const [recLoading, setRecLoading] = useState(true);

  // Browse All Books
  const [browseBooks, setBrowseBooks] = useState([]);
  const [browseLoading, setBrowseLoading] = useState(true);
  const [browsePagination, setBrowsePagination] = useState({ total_books: 0, total_pages: 0 });
  const [browsePage, setBrowsePage] = useState(1);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("ratings_count");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({
    author: "",
    publisher: "",
    year_from: "",
    year_to: "",
    min_rating: "",
    max_rating: "",
  });

  const BROWSE_LIMIT = 20;

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await RecommendationApi.getRecommendations();
        setRecBooks(data.books);
        setRecommendationType(data.type);
      } catch (error) {
        console.error(error);
      } finally {
        setRecLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  // Fetch browse books
  const fetchBrowseBooks = useCallback(async () => {
    setBrowseLoading(true);
    try {
      const params = {
        page: browsePage,
        limit: BROWSE_LIMIT,
        sort_by: sortBy,
        sort_order: sortOrder,
      };
      if (filters.author) params.author = filters.author;
      if (filters.publisher) params.publisher = filters.publisher;
      if (filters.year_from) params.year_from = parseInt(filters.year_from, 10);
      if (filters.year_to) params.year_to = parseInt(filters.year_to, 10);
      if (filters.min_rating) params.min_rating = parseFloat(filters.min_rating);
      if (filters.max_rating) params.max_rating = parseFloat(filters.max_rating);

      const data = await BookApi.getBooks(params);
      setBrowseBooks(data.books);
      setBrowsePagination({ total_books: data.total_books, total_pages: data.total_pages });
    } catch (error) {
      console.error(error);
    } finally {
      setBrowseLoading(false);
    }
  }, [browsePage, sortBy, sortOrder, filters]);

  useEffect(() => {
    fetchBrowseBooks(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [fetchBrowseBooks]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setBrowsePage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setBrowsePage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setBrowsePage(1);
  };

  const clearFilters = () => {
    setFilters({ author: "", publisher: "", year_from: "", year_to: "", min_rating: "", max_rating: "" });
    setSortBy("ratings_count");
    setSortOrder("desc");
    setBrowsePage(1);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "") || sortBy !== "ratings_count" || sortOrder !== "desc";

  const sectionTitleMap = {
    content_based: "Recommended For You",
    collaborative: "Because You Liked",
    hybrid: "Picked For You",
    popular: "Popular Books",
  };
  const sectionTitle = sectionTitleMap[recommendationType] || "Popular Books";

  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content">
          <div className="hero__badge">
            <Sparkles size={14} />
            AI-Powered Recommendations
          </div>
          <h1 className="hero__title">
            Discover Your Next
            <br />
            <span className="hero__title-gradient">Great Read</span>
          </h1>
          <p className="hero__subtitle">
            Personalized book recommendations powered by AI. Explore, rate, and
            build your perfect reading list.
          </p>
          <div className="hero__actions">
            <a href="#browse" className="hero__btn hero__btn--primary">
              Explore Books
            </a>
            <Link to="/shelves" className="hero__btn hero__btn--secondary">
              My Shelves
            </Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <TrendingUp size={16} />
              <span>Personalized picks based on your taste</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      {recLoading ? (
        <div className="home__loading">
          <div className="home__loading-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="home__loading-card">
                <div className="skeleton" style={{ height: 200 }} />
                <div style={{ padding: 16 }}>
                  <div className="skeleton" style={{ height: 16, width: "80%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "50%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <section className="home__section">
          <RecommendationSection title={sectionTitle} books={recBooks} />
        </section>
      )}

      {/* Browse All Books */}
      <section className="home__browse" id="browse">
        <div className="home__browse-header">
          <div>
            <h2 className="home__browse-title">Browse All Books</h2>
            <p className="home__browse-subtitle">
              {browsePagination.total_books > 0
                ? `${browsePagination.total_books.toLocaleString()} books available`
                : "Explore the full collection"}
            </p>
          </div>
          <button
            className={`home__filter-toggle ${showFilters ? "home__filter-toggle--active" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} />
            Filters
            {hasActiveFilters && <span className="home__filter-badge" />}
          </button>
        </div>

        {/* Sort Controls */}
        <div className="home__sort-bar">
          <div className="home__sort-group">
            <label className="home__sort-label">Sort by</label>
            <select className="home__sort-select" value={sortBy} onChange={handleSortChange}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button className="home__sort-order" onClick={toggleSortOrder} aria-label="Toggle sort order">
              {sortOrder === "desc" ? "↓" : "↑"}
            </button>
          </div>
          {hasActiveFilters && (
            <button className="home__clear-filters" onClick={clearFilters}>
              <X size={14} />
              Clear filters
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="home__filters-panel">
            <div className="home__filters-grid">
              <div className="home__filter-field">
                <label>Author</label>
                <input
                  type="text"
                  placeholder="e.g. Tolkien"
                  value={filters.author}
                  onChange={(e) => handleFilterChange("author", e.target.value)}
                />
              </div>
              <div className="home__filter-field">
                <label>Publisher</label>
                <input
                  type="text"
                  placeholder="e.g. Penguin"
                  value={filters.publisher}
                  onChange={(e) => handleFilterChange("publisher", e.target.value)}
                />
              </div>
              <div className="home__filter-field">
                <label>Year from</label>
                <input
                  type="number"
                  placeholder="e.g. 2000"
                  value={filters.year_from}
                  onChange={(e) => handleFilterChange("year_from", e.target.value)}
                />
              </div>
              <div className="home__filter-field">
                <label>Year to</label>
                <input
                  type="number"
                  placeholder="e.g. 2024"
                  value={filters.year_to}
                  onChange={(e) => handleFilterChange("year_to", e.target.value)}
                />
              </div>
              <div className="home__filter-field">
                <label>Min rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="0"
                  value={filters.min_rating}
                  onChange={(e) => handleFilterChange("min_rating", e.target.value)}
                />
              </div>
              <div className="home__filter-field">
                <label>Max rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="5"
                  value={filters.max_rating}
                  onChange={(e) => handleFilterChange("max_rating", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Browse Results */}
        {browseLoading ? (
          <div className="home__browse-grid">
            {Array.from({ length: BROWSE_LIMIT }).map((_, i) => (
              <div key={i} className="home__loading-card">
                <div className="skeleton" style={{ height: 200 }} />
                <div style={{ padding: 16 }}>
                  <div className="skeleton" style={{ height: 16, width: "80%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "50%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : browseBooks.length === 0 ? (
          <div className="home__browse-empty">
            <p>No books match your filters. Try adjusting them.</p>
          </div>
        ) : (
          <>
            <div className="home__browse-grid">
              {browseBooks.map((book) => (
                <BookCard key={book.book_id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            {browsePagination.total_pages > 1 && (
              <div className="home__browse-pagination">
                <button
                  className="home__page-btn"
                  disabled={browsePage <= 1}
                  onClick={() => setBrowsePage((p) => p - 1)}
                >
                  <ChevronLeft size={18} /> Prev
                </button>
                <span className="home__page-info">
                  Page {browsePage} of {browsePagination.total_pages}
                </span>
                <button
                  className="home__page-btn"
                  disabled={browsePage >= browsePagination.total_pages}
                  onClick={() => setBrowsePage((p) => p + 1)}
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
