import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
    const location = useLocation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    useEffect(() => {
    setQuery("");
    }, [location.pathname]);
    
    const handleSearch = () => {
        if (!query.trim()) return;
        navigate(`/search?query=${encodeURIComponent(query)}`);
        setQuery("");
    };
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">📚 BookMind AI</Link>
            </div>
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={query}
                    onChange={(e) =>setQuery(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/shelves"> Shelves </Link>
                <Link to="/profile">👤 {user?.username}</Link>
            </div>
        </nav>
    );
};
export default Navbar;