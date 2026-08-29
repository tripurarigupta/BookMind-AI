import { useEffect, useState } from "react";
import FavoriteApi from "../../api/favoriteApi";
import "./FavoriteButton.css";

const FavoriteButton = ({ bookId }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const data = await FavoriteApi.isFavorite(bookId);
                setIsFavorite(data.is_favorite);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        checkFavorite();
    }, [bookId]);
    const handleFavorite = async () => {
        try {
            if (isFavorite) {
                await FavoriteApi.removeFavorite(bookId);
                setIsFavorite(false);
            } else {
                await FavoriteApi.addFavorite(bookId);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) {
        return (
            <button className="favorite-btn" disabled>
                Loading...
            </button>
        );
    }
    return (
        <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={handleFavorite}
        >
            {isFavorite ? "❤️ In Favorites" : "🤍 Add to Favorites"}
        </button>
    );
};

export default FavoriteButton;
