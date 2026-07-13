import { useEffect, useState } from "react";
import RecommendationSection from "../../components/recommendations/RecommendationSection";
import RecommendationApi from "../../api/recommendationApi";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await RecommendationApi.getRecommendations();
                setBooks(data.books);
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
    return (
        <div>
            <RecommendationSection
                title="Recommended For You"
                books={books}
            />
        </div>
    );
};

export default Home;