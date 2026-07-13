import api from "./axios";
const RecommendationApi = {
    async getRecommendations() {
        const response = await api.get("/recommendations");
        return response.data;
    }
};

export default RecommendationApi;