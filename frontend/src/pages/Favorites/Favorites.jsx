import { useEffect, useState } from "react";

import FavoriteApi from "../../api/favoriteApi";
import BookCard from "../../components/books/BookCard";
import "./Favorites.css";
const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchFavorites();
    }, []);
    const fetchFavorites = async () => {
        try {
            const data = await FavoriteApi.getFavorites();
            setFavorites(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <h2>Loading favorites...</h2>;
    }
    return (
        <div className="favorites-page">
            <h1>❤️ My Favorites</h1>
            {
                favorites.length === 0 ? (
                    <div className="empty-state">
                        <h2>No favorite books yet ❤️</h2>
                        <p>
                            Start exploring books and add your favorites.
                        </p>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {
                            favorites.map((favorite) => (
                                <BookCard key={favorite.book.book_id} book={favorite.book} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Favorites;