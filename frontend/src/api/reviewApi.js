import api from "./axios";

const ReviewApi = {

    async getMyReview(bookId) {

        const response = await api.get(
            `/books/${bookId}/my-review`
        );

        return response.data;
    },

    async getReviews(bookId) {

        const response = await api.get(
            `/books/${bookId}/review`
        );

        return response.data;
    },

    async saveReview(bookId, content) {

        const response = await api.post(
            `/books/${bookId}/review`,
            {
                content: content
            }
        );

        return response.data;
    }

};

export default ReviewApi;