import { useEffect, useState, useCallback } from "react";
import FavoriteApi from "../../api/favoriteApi";
import BookCard from "../../components/books/BookCard";
import { Heart } from "lucide-react";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    try {
      const data = await FavoriteApi.getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [fetchFavorites]);

  if (loading) {
    return (
      <div className="favorites-page">
        <h1><Heart size={24} /> My Favorites</h1>
        <div className="favorites-grid">
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
    <div className="favorites-page page-enter">
      <h1><Heart size={24} /> My Favorites</h1>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>No favorite books yet ❤️</h2>
          <p>Start exploring books and add your favorites.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <BookCard key={favorite.book.book_id} book={favorite.book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
