import { useEffect, useState, useCallback } from "react";
import ProfileApi from "../../api/profileApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchProfile = useCallback(async () => {
    try {
      const data = await ProfileApi.getProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [fetchProfile]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="skeleton" style={{ width: 90, height: 90, borderRadius: "50%", margin: "0 auto 16px" }} />
          <div className="skeleton" style={{ height: 24, width: 150, margin: "0 auto 8px" }} />
          <div className="skeleton" style={{ height: 16, width: 200, margin: "0 auto" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container page-enter">
      <div className="profile-card">
        <div className="profile-avatar">
          <User size={36} />
        </div>
        <h2>{profile?.username}</h2>
        <p>{profile?.email}</p>
        <div className="profile-stats">
          <div className="stat-card">
            <h3>❤️</h3>
            <h2>{profile?.favorites_count}</h2>
            <p>Favorites</p>
          </div>
          <div className="stat-card">
            <h3>📚</h3>
            <h2>{profile?.shelves_count}</h2>
            <p>Shelved</p>
          </div>
          <div className="stat-card">
            <h3>⭐</h3>
            <h2>{profile?.ratings_count}</h2>
            <p>Ratings</p>
          </div>
          <div className="stat-card">
            <h3>📝</h3>
            <h2>{profile?.reviews_count}</h2>
            <p>Reviews</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
