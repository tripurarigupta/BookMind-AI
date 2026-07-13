import api from "./axios";

const FavoriteApi = {

    async getFavorites() {
        const response = await api.get("/favorite_books/");
        return response.data;
    },

    async isFavorite(bookId) {
        const response = await api.get(`/favorite_books/${bookId}`);
        return response.data;
    },

    async addFavorite(bookId) {
        const response = await api.post(`/favorite_books/${bookId}`);
        return response.data;
    },

    async removeFavorite(bookId) {
        const response = await api.delete(`/favorite_books/${bookId}`);
        return response.data;
    }

};

export default FavoriteApi;