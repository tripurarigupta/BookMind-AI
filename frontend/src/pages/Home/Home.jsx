import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecommendationSection from "../../components/recommendations/RecommendationSection";
import RecommendationApi from "../../api/recommendationApi";
import { Sparkles, TrendingUp } from "lucide-react";
import "./Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [recommendationType, setRecommendationType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await RecommendationApi.getRecommendations();
        setBooks(data.books);
        setRecommendationType(data.type);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const sectionTitle =
    recommendationType === "content_based"
      ? "Recommended For You"
      : "Popular Books";

  return (
    <div className="home page-enter">
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
            <Link to="/search" className="hero__btn hero__btn--primary">
              Explore Books
            </Link>
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

      {loading ? (
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
          <RecommendationSection title={sectionTitle} books={books} />
        </section>
      )}
    </div>
  );
};

export default Home;
