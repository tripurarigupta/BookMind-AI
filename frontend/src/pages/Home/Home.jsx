import { useEffect, useState } from "react";
import RecommendationSection from "../../components/recommendations/RecommendationSection";
import RecommendationApi from "../../api/recommendationApi";

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

    if (loading) {
        return <h2>Loading recommendations...</h2>;
    }
    const sectionTitle =
        recommendationType === "popular"
            ? "Popular Books"
            : "Recommended For You";
    return (
        <div>
            <RecommendationSection
                title={sectionTitle}
                books={books}
            />
        </div>
    );
};

export default Home;