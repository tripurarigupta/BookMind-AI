import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Sun, Moon, Search, Menu, X, Home, Heart, BookOpen, User } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const { user, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (!query.trim()) return;
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
      setMobileOpen(false);
    },
    [query, navigate]
  );

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">📚</span>
          <span className="navbar__logo-text">BookMind</span>
          <span className="navbar__logo-badge">AI</span>
        </Link>

        <form className="navbar__search" onSubmit={handleSearch}>
          <Search size={18} className="navbar__search-icon" />
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="navbar__actions">
          <Link to="/" className={`navbar__link ${isActive("/") ? "navbar__link--active" : ""}`}>
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/favorites" className={`navbar__link ${isActive("/favorites") ? "navbar__link--active" : ""}`}>
            <Heart size={18} />
            <span>Favorites</span>
          </Link>
          <Link to="/shelves" className={`navbar__link ${isActive("/shelves") ? "navbar__link--active" : ""}`}>
            <BookOpen size={18} />
            <span>Shelves</span>
          </Link>
          <Link to="/profile" className={`navbar__link ${isActive("/profile") ? "navbar__link--active" : ""}`}>
            <User size={18} />
            <span>{user?.username}</span>
          </Link>

          <button className="navbar__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="navbar__mobile">
          <form className="navbar__mobile-search" onSubmit={handleSearch}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <Link to="/" className={`navbar__mobile-link ${isActive("/") ? "active" : ""}`}>
            <Home size={20} /> Home
          </Link>
          <Link to="/favorites" className={`navbar__mobile-link ${isActive("/favorites") ? "active" : ""}`}>
            <Heart size={20} /> Favorites
          </Link>
          <Link to="/shelves" className={`navbar__mobile-link ${isActive("/shelves") ? "active" : ""}`}>
            <BookOpen size={20} /> Shelves
          </Link>
          <Link to="/profile" className={`navbar__mobile-link ${isActive("/profile") ? "active" : ""}`}>
            <User size={20} /> Profile
          </Link>
          <button className="navbar__mobile-theme" onClick={toggleTheme}>
            {theme === "light" ? <><Moon size={20} /> Dark Mode</> : <><Sun size={20} /> Light Mode</>}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
