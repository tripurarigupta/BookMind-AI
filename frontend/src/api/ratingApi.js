import api from "./axios";

const RatingApi = {
    async getUserRating(bookId) {
        const response = await api.get(`/books/${bookId}/rating`);
        return response.data;
    },
    async rateBook(bookId, rating) {
        const response = await api.post(`/books/${bookId}/rating`, {
            rating: rating,
        });
        return response.data;
    }
};

export default RatingApi;