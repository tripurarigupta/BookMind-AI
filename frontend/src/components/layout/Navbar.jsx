import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user } = useAuth();
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    📚 BookMind AI
                </Link>
            </div>
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search books..."
                />
            </div>
            <div className="navbar-links">
                <Link to="/">
                    Home
                </Link>
                <Link to="/favorites">
                    Favorites
                </Link>
                <Link to="/shelves">
                    Shelves
                </Link>
                <Link to="/profile">
                    {user?.username || "Profile"}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;