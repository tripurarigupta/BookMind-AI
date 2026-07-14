import { useEffect, useState } from "react";
import ProfileApi from "../../api/profileApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
    logout();
    navigate("/login");
    };

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchProfile();
    }, []);
    const fetchProfile = async () => {
        try {
            const data = await ProfileApi.getProfile();
            setProfile(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <h2>Loading Profile...</h2>;
    }
    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-avatar">👤</div>
                <h2>{profile.username}</h2>
                <p>{profile.email}</p>
                <div className="profile-stats">
                    <div className="stat-card">
                        <h3>❤️</h3>
                        <h2>{profile.favorites_count}</h2>
                        <p>Favorites</p>
                    </div>
                    <div className="stat-card">
                        <h3>📚</h3>
                        <h2>{profile.shelves_count}</h2>
                        <p>Shelved</p>
                    </div>
                    <div className="stat-card">
                        <h3>⭐</h3>
                        <h2>{profile.ratings_count}</h2>
                        <p>Ratings</p>
                    </div>
                    <div className="stat-card">
                        <h3>📝</h3>
                        <h2>{profile.reviews_count}</h2>
                        <p>Reviews</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}> 🚪 Logout </button>
            </div>
        </div>
    );
};

export default Profile;